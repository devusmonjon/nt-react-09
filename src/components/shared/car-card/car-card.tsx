import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { addToCart, removeFromCart } from "@/context/slices/cartSlice";
import { toggleWishlist } from "@/context/slices/wishlistSlice";
import { ICar } from "@/interfaces/car";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Heart } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CarCard = ({ car }: { car: ICar }) => {
  const dispatch = useDispatch();
  const cart = useSelector(
    (state: { cart: { value: ICar[] } }) => state.cart.value
  );
  const wishlist = useSelector(
    (state: { wishlist: { value: ICar[] } }) => state.wishlist.value
  );

  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Create project</CardTitle> */}
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        <img
          src={
            car.thumbnail ??
            "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png"
          }
          alt={car.name}
          title={car.name}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src =
              "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png";
          }}
          className="h-[165px] object-contain object-center"
        />
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <h3
              className="scroll-m-20 text-2xl font-semibold tracking-tight"
              title={car.name}
            >
              {car.name}
            </h3>
            <div className="space-y-3">
              <div className="flex gap-4 items-center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Model:
                </h4>
                <p className="leading-7">{car.model}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Price:
                </h4>
                <p className="leading-7">${car.price}</p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="ghost"
          className="px-2"
          onClick={() => dispatch(toggleWishlist(car))}
        >
          <Heart
            className={`duration-300 ${
              wishlist.some((item) => item._id === car._id)
                ? "fill-red-600 text-red-600"
                : ""
            }`}
          />
        </Button>
        {cart.some((item) => item._id === car._id) ? (
          <Button onClick={() => dispatch(removeFromCart(car))}>
            Remove from cart
          </Button>
        ) : (
          <Button onClick={() => dispatch(addToCart({ ...car, quantity: 1 }))}>
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CarCard;
