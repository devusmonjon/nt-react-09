import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useResendOtpMutation,
  useSendOtpMutation,
} from "@/context/api/userApi";
import { Label } from "@radix-ui/react-label";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ConfirmEmail = () => {
  const { token: email } = useParams();
  const [countdown, setCountdown] = useState<number>(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 0) clearInterval(timer);
    return () => clearInterval(timer);
  }, [countdown]);

  // ches email regex
  if (email && email.length > 4) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(atob(email))) return "not valid email";
  } else return "not valid email";

  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [resendOtp, { isLoading: isLoadingResend }] = useResendOtpMutation();

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full max-w-[30vw] pt-[10vh]">
        <div className="space-y-8">
          <div className="space-y-8">
            <Label>Enter code</Label>
            <div>
              <InputOTP
                disabled={isLoading}
                maxLength={6}
                onComplete={(code) => {
                  const loading = toast.loading("Verifying...", {
                    position: "top-center",
                  });
                  sendOtp({ email: atob(email), otp: code })
                    .unwrap()
                    .then((data) => {
                      toast.success(data.message, {
                        id: loading,
                      });
                      window.location.href = "/auth/sign-in";
                      console.log(data);
                    })
                    .catch((error) => {
                      toast.error(error.data.message, {
                        id: loading,
                      });
                    });
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="flex items-center">
              {countdown > 0
                ? `Code expired in ${countdown}s`
                : "Code experid - "}{" "}
              {countdown <= 0 && (
                <Button
                  variant={"link"}
                  className="flex items-center gap-2"
                  disabled={isLoadingResend}
                  onClick={() => {
                    const loading = toast.loading("Resending...", {
                      position: "top-center",
                    });
                    resendOtp({ email: atob(email) })
                      .unwrap()
                      .then((data) => {
                        toast.success(data.message, {
                          id: loading,
                        });
                        setCountdown(60);
                      });
                  }}
                >
                  <RotateCw /> Resent OTP
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
