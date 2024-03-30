import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./utils";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "users/get-user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
