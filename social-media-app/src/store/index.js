import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./apis/auth";
import { postApi } from "./apis/post";
import { userApi } from "./apis/user";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleWares = [
      authApi.middleware,
      postApi.middleware,
      userApi.middleware,
    ];
    return getDefaultMiddleware().concat(middleWares);
  },
});
