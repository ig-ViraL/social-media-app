import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./utils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery(),
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
