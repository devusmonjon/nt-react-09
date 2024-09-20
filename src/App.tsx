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
} from "./pages";
import Layout from "./layouts/layout";
import { Auth } from "./components/shared";
import "number-brm";

const App = (): JSX.Element => {
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

            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/products/:id" element={<SingleProduct />} />
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
