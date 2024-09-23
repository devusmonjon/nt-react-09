import { ModeToggle } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// dropdown
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, ShoppingCart } from "lucide-react";
import { IUser } from "@/interfaces/user";

const Navbar = () => {
  const navigate = useNavigate();
  let { auth: token, cart, wishlist } = useSelector((state: any) => state);
  let user = token.user as IUser;
  token = token.token;
  cart = cart.value;
  wishlist = wishlist.value;

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
          <Link to={"/wishlist"} className="relative">
            {wishlist.length > 0 && (
              <span className="absolute -top-3 -right-3 inline-flex items-center justify-center rounded-full bg-red-500 w-[20px] h-[20px] text-sm font-bold text-white">
                {wishlist.length}
              </span>
            )}
            <Heart />
          </Link>
          <Link to={"/cart"} className="relative">
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 inline-flex items-center justify-center rounded-full bg-red-500 w-[20px] h-[20px] text-sm font-bold text-white">
                {cart.length}
              </span>
            )}
            <ShoppingCart />
          </Link>
          <ModeToggle />
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger type="button">
                <Button>Profile</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("x-auth-token");
                    window.location.reload();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/auth/sign-in")}>Login</Button>
          )}
          {user?.role === "admin" && (
            <Button onClick={() => navigate("/admin")}>Admin</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
