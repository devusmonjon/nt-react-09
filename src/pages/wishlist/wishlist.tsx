import { CarCard } from "@/components/shared";
import { ICar } from "@/interfaces/car";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const wishlist = useSelector(
    (state: { wishlist: { value: ICar[] } }) => state.wishlist.value
  );
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
        {wishlist.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-2xl">No items in wishlist</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
