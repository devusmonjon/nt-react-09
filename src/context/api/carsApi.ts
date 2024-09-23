import { IUser } from "@/interfaces/user";
import { api } from "./index"; // Example: You can define and import `User` type from a types file if necessary.
import { ICar, ICarRes, ICategoriesRes } from "@/interfaces/car";

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
    getCategories: build.query<ICategoriesRes, void>({
      query: () => ({
        url: "/categories",
      }),
      providesTags: ["Car"],
    }),
    createCar: build.mutation<ICarRes, ICar>({
      query: (body) => ({
        url: "/cars",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Car"],
    }),
    updateCar: build.mutation<ICarRes, ICar>({
      query: (body) => ({
        url: "/cars",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetSingleCarQuery,
  useGetCategoriesQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
} = userApi;
