import { Button } from "@/components/ui/button";
import {
  clearCart,
  decrementCartITem,
  incrementCartITem,
  removeFromCart,
} from "@/context/slices/cartSlice";
import { ICar } from "@/interfaces/car";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector(
    (state: { cart: { value: ICar[] } }) => state.cart.value
  );

  const dispatch = useDispatch();

  return (
    <div className="container py-[24px]">
      <ul className="flex flex-col gap-4">
        {cart.map((car) => (
          <li
            key={car._id}
            className="w-full h-[200px] flex items-start gap-4 rounded-lg shadow-sm bg-gray-300 dark:bg-gray-800 px-2 py-4"
          >
            <img
              src={car.thumbnail}
              alt={car.name}
              title={car.name}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src =
                  "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png";
              }}
              className="h-[165px] w-[247px] object-contain object-center"
            />
            <div className="flex justify-between gap-10 w-full">
              <div className="">
                <div className="space-y-2">
                  <h2 className="scroll-m-20 border-b text-3xl font-semibold tracking-tight first:mt-0">
                    {car.name}
                  </h2>
                  <ScrollArea className="h-[90px] overflow-y-auto scroll-hide">
                    <p
                      dangerouslySetInnerHTML={{ __html: car.description }}
                      className="leading-7 [&:not(:first-child)]:mt-6"
                    ></p>
                  </ScrollArea>
                  <p className="text-2xl font-semibold">${car.price}</p>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-3 px-4 items-center justify-center h-full">
                  <Button
                    className="py-2"
                    variant={"destructive"}
                    onClick={() => dispatch(removeFromCart(car))}
                  >
                    <Trash2 />
                  </Button>
                  <div className="flex flex-col justify-center items-center -rotate-90">
                    <Button
                      variant={"link"}
                      className="py-0 px-0"
                      disabled={
                        // @ts-ignore
                        car.quantity <= 1
                      }
                      onClick={() => dispatch(decrementCartITem(car))}
                    >
                      <ChevronUp />
                    </Button>
                    <span className="rotate-90">{car.quantity}</span>
                    <Button
                      variant={"link"}
                      className="py-0 px-0"
                      onClick={() => dispatch(incrementCartITem(car))}
                    >
                      <ChevronDown />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-end">
        <div className="w-min h-[200px] flex items-start gap-4 rounded-lg shadow-sm bg-gray-300 dark:bg-gray-800 px-[60px] py-[40px] mt-4">
          <div className="flex justify-between gap-10">
            <div className="">
              <div className="space-y-2 whitespace-nowrap">
                <h2 className="scroll-m-20 border-b text-3xl font-semibold tracking-tight first:mt-0">
                  Total
                </h2>
                <p className="text-2xl font-semibold">
                  ${" "}
                  {cart
                    // @ts-ignore
                    .reduce((a, b) => a + b.quantity * b.price, 0)
                    // @ts-ignore
                    .brm("int")}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-3 px-4 items-center justify-center h-full">
                <Button
                  variant={"secondary"}
                  onClick={() => console.log("checkout")}
                >
                  Checkout
                </Button>
                <Button
                  variant={"link"}
                  className="py-0 px-0"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
