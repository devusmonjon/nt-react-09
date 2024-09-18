import { IUser } from "@/interfaces/user";
import { api } from "./index"; // Example: You can define and import `User` type from a types file if necessary.

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], Record<string, any>>({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: ["User"],
    }),
    signIn: build.mutation<
      { message: string; payload: { user: IUser; accessToken: string } },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    signUp: build.mutation<
      { message: string; payload: IUser },
      { first_name: string; email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    sendOtp: build.mutation<
      { message: string; payload: { user: IUser; accessToken: string } },
      { email: string; otp: string }
    >({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getUserProfile: build.query<{ message: string; payload: IUser }, void>({
      query: () => ({
        url: "/auth/profile",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useSignUpMutation,
  useSignInMutation,
  useGetUserProfileQuery,
  useSendOtpMutation,
} = userApi;
