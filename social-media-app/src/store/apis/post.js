import { baseQuery, queryParamsBuilder } from "./utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getFeedPost: builder.query({
      query: (query) => {
        return {
          url: `posts/get-feed-posts${queryParamsBuilder(query)}`,
          method: "GET",
        };
      },
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `posts/create-post`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    getFeedImage: builder.query({
      query: (query) => ({
        url: `posts/get-feed-image${queryParamsBuilder(query)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetFeedPostQuery,
  useCreatePostMutation,
  useGetFeedImageQuery,
  useLazyGetFeedPostQuery,
} = postApi;
