import { useGetUserProfileQuery } from "@/context/api/userApi";
import { setUser } from "@/context/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();

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
        <Navigate replace to="/auth/sign-in" />
      )}
    </>
  );
};

export default Auth;
