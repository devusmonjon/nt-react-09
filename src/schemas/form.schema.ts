import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(5).max(50).email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8)
    .max(50)
    .regex(/^(?=.*[a-z])/, {
      message: "Password must have at least 1 lowercase letter",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must have at least 1 uppercase letter",
    })
    .regex(/^(?=.*[0-9])/, {
      message: "Password must have at least 1 number",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must have at least 1 special character",
    }),
});

export const registerSchema = loginSchema.extend({
  first_name: z.string().min(2).max(50),
});
