import { CarCard, Search } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useGetCarsQuery, useGetCategoriesQuery } from "@/context/api/carsApi";
import { ICar } from "@/interfaces/car";
import { useEffect, useState } from "react";

const Home = (): JSX.Element => {
  const { data } = useGetCarsQuery({});
  const { data: categories } = useGetCategoriesQuery();
  const [cars, setCars] = useState<ICar[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    setCars(data?.payload || []);
  }, [data]);

  useEffect(() => {
    if (activeCategory === "all") {
      setCars(data?.payload || []);
    } else {
      setCars(
        data?.payload?.filter((car) => car.category === activeCategory) || []
      );
    }
  }, [activeCategory, data]);

  return (
    <div className="container">
      {/* <Search /> */}
      <div className={`flex overflow-x-auto scroll-hide gap-6 py-5`}>
        <Button
          onClick={() => setActiveCategory("all")}
          variant={activeCategory === "all" ? "default" : "outline"}
        >
          All
        </Button>
        {categories?.payload?.map((car) => (
          <Button
            variant={activeCategory === car._id ? "default" : "outline"}
            key={car._id}
            data-id={car._id}
            onClick={() => {
              setActiveCategory(car._id);
            }}
            className="w-min whitespace-nowrap"
          >
            {car.name}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
          /*@ts-ignore*/
          data?.payload?.length < 1 && <div>No cars found</div>
        }
        {cars.length === 0 && <div>No cars found in this category</div>}
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;
