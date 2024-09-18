import { ModeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

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
          {token ? (
            <Button
              onClick={() => {
                localStorage.removeItem("x-auth-token");
                window.location.reload();
              }}
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/auth/sign-in")}>Login</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
