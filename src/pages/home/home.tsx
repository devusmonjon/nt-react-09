import { CarCard } from "@/components/shared";
import { useGetCarsQuery } from "@/context/api/carsApi";

const Home = () => {
  const { data } = useGetCarsQuery({});
  console.log(data?.payload);

  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.payload?.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Home;
