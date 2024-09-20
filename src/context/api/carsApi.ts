import { IUser } from "@/interfaces/user";
import { api } from "./index"; // Example: You can define and import `User` type from a types file if necessary.
import { ICar, ICarRes } from "@/interfaces/car";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query<ICarRes, { limit?: number }>({
      query: (params) => ({
        url: "/cars",
        params,
      }),
      providesTags: ["Car"],
    }),
    getSingleCar: build.query<{ message: string; payload: ICar }, string>({
      query: (id) => ({
        url: `/cars/${id}`,
      }),
      providesTags: ["Car"],
    }),
  }),
});

export const { useGetCarsQuery, useGetSingleCarQuery } = userApi;
