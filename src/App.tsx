import { Route, Routes } from "react-router-dom";
import {
  Profile,
  SingIn,
  SignUp,
  ConfirmEmail,
  Home,
  Cart,
  Wishlist,
  SingleProduct,
  Admin,
} from "./pages";
import Layout from "./layouts/layout";
import { Auth } from "./components/shared";
import "number-brm";
import { useSelector } from "react-redux";
import { IUser } from "./interfaces/user";

const App = (): JSX.Element => {
  const user = useSelector((state: { user: IUser }) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Auth />}>
            <Route
              path="*"
              element={
                <>
                  <div className="container">
                    <h1 className="text-center font-bold text-2xl py-5">
                      404 - page not found
                    </h1>
                  </div>
                </>
              }
            />

            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="products/:id" element={<SingleProduct />} />
            <Route
              path="admin"
              element={
                user?.role === "admin" ? (
                  <div className="container">
                    <h1 className="text-center font-bold text-2xl py-5">
                      404 - page not found
                    </h1>
                  </div>
                ) : (
                  <Admin />
                )
              }
            />
          </Route>
          <Route path="auth">
            <Route path="sign-in" element={<SingIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="confirm-email/:token" element={<ConfirmEmail />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
