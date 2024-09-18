import { useGetUserProfileQuery } from "@/context/api/userApi";
import { setUser } from "@/context/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser(data?.payload));
    }
  }, [data]);
  return (
    <>
      {/* Autheticated */}
      {isLoading ? (
        "Loading..."
      ) : data?.payload ? (
        <Outlet />
      ) : (
        <Navigate
          replace
          to={`/auth/sign-in?redirect=${location.pathname}${location.search}`}
        />
      )}
    </>
  );
};

export default Auth;
