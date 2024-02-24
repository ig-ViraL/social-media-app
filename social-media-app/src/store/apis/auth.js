import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.baseURL }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query(data) {
        return {
          url: `/login`,
          method: "POST",
          body: {
            ...data,
          },
        };
      },
    }),
    signUp: builder.mutation({
      query(data) {
        return {
          url: `/sign-up`,
          method: "POST",
          body: {
            ...data,
          },
        };
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
