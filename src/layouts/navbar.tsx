import { ModeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="py-4">
      <div className="container flex items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          Logo
        </Link>
        <ul className="flex gap-4">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <div className="space-x-4 flex items-center">
          <ModeToggle />
          <Button onClick={() => navigate("/auth/sign-in")}>Login</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
