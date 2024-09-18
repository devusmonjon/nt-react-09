import { useGetUserProfileQuery } from "@/context/api/userApi";
import { setUser } from "@/context/slices/authSlice";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  if (!isLoading) {
    dispatch(setUser(data?.payload));
  }
  return (
    <>
      {/* Autheticated */}
      {data?.payload ? <Outlet /> : <Navigate replace to="/auth/sign-in" />}
    </>
  );
};

export default Auth;
