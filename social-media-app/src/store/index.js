import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth";
import { postApi } from "./apis/post";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleWares = [authApi.middleware, postApi.middleware];
    return getDefaultMiddleware().concat(middleWares);
  },
});
