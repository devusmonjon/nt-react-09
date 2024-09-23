import { Input } from "@/components/ui/input";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState<boolean>(false);
  return (
    <form action="" className="w-full py-4 relative">
      <Input name="search" placeholder="Search..." />
      <div className="absolute w-full h-[30vh] bg-black top-[70px]"></div>
    </form>
  );
};

export default Search;
