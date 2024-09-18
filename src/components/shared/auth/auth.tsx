import { useGetUserProfileQuery } from "@/context/api/userApi";
import { setUser } from "@/context/slices/authSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Auth = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const dispatch = useDispatch();

  if (!isLoading) {
    dispatch(setUser(data?.payload));
  }
  return (
    <>
      {/* Autheticated */}
      <Outlet />
    </>
  );
};

export default Auth;
