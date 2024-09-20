import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/context/api/carsApi";
import {
  addToCart,
  decrementCartITem,
  incrementCartITem,
  removeFromCart,
} from "@/context/slices/cartSlice";
import { toggleWishlist } from "@/context/slices/wishlistSlice";
import { ICar } from "@/interfaces/car";
import { CheckIcon, ChevronDown, ChevronUp, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: car } = useGetSingleCarQuery(id ?? "");
  const [image, setImage] = useState(car?.payload?.images[0]);
  const [currentColor, setCurrentColor] = useState<string>(
    // @ts-ignore
    car?.payload?.colors[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(car?.payload?.price as number);

  const dispatch = useDispatch();
  const cart = useSelector(
    (state: { cart: { value: ICar[] } }) => state.cart.value
  );
  const wishlist = useSelector(
    (state: { wishlist: { value: ICar[] } }) => state.wishlist.value
  );
  useEffect(() => {
    setPrice(car?.payload?.price as number);
    setCurrentColor(car?.payload?.colors[0] as string);
    setQuantity(1);
    setImage(car?.payload?.images[0]);
  }, [car]);
  useEffect(() => {
    setPrice((car?.payload?.price as number) * quantity);
  }, [quantity]);
  return (
    <div>
      <div className="container">
        <div className="flex gap-4">
          <div className="flex w-[518px] h-[400px] gap-[10px]">
            <div className="flex flex-col h-[400px] w-[118px] scroll-hide overflow-y-auto border-2 rounded-lg gap-4 py-[4px]">
              {car?.payload?.images.map((image) => (
                <Button
                  variant={"link"}
                  className="w-[100px] h-[100px] py-0 mx-[5px] bg-primary-foreground"
                  key={image}
                  onClick={() => setImage(image)}
                >
                  <img
                    src={
                      image ??
                      "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png"
                    }
                    alt={car?.payload?.name}
                    title={car?.payload?.name}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src =
                        "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png";
                    }}
                    className="min-w-[100px] min-h-[100px] object-contain object-center"
                  />
                </Button>
              ))}
            </div>
            <div className="w-[400px] h-[400px] border-2 rounded-lg">
              <img
                src={image ?? car?.payload?.images[0]}
                alt={car?.payload?.name}
                title={car?.payload?.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src =
                    "https://www.nicepng.com/png/full/777-7772737_car-placeholder-image-lamborghini-gallardo.png";
                }}
                className="w-[400px] h-[400px] object-contain object-center"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">{car?.payload?.name}</h1>
              <p
                className="text-lg text-gray-500"
                dangerouslySetInnerHTML={
                  // @ts-ignore
                  { __html: car?.payload?.description }
                }
              ></p>
              <p className="text-lg">
                Price: ${" "}
                {
                  // @ts-ignore
                  price ? price.brm("") : 0
                }
              </p>
              <div className="colors flex gap-4">
                {car?.payload?.colors.map((color) => (
                  <Button
                    onClick={() => setCurrentColor(color)}
                    key={color}
                    className={`w-[30px] h-[30px] rounded-full py-0 px-0`}
                    style={{ backgroundColor: color }}
                  >
                    {currentColor === color && <CheckIcon color="white" />}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between w-full">
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => dispatch(toggleWishlist(car?.payload as ICar))}
              >
                <Heart
                  className={`duration-300 ${
                    wishlist.some((item) => item._id === car?.payload._id)
                      ? "fill-red-600 text-red-600"
                      : ""
                  }`}
                />
              </Button>
              <div className="flex flex-col justify-center items-center -rotate-90">
                <Button
                  variant={"link"}
                  className="py-0 px-0"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((prev) => prev - 1)}
                >
                  <ChevronUp />
                </Button>
                <span className="rotate-90">{quantity}</span>
                <Button
                  variant={"link"}
                  className="py-0 px-0"
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                >
                  <ChevronDown />
                </Button>
              </div>
              {cart.some((item) => item._id === car?.payload._id) ? (
                <Button
                  onClick={() => dispatch(removeFromCart(car?.payload as ICar))}
                >
                  Remove from cart
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    dispatch(addToCart({ ...car?.payload, quantity } as ICar))
                  }
                >
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
