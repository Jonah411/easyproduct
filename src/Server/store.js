import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./Reducer/authApi";
import authReducer from "./Reducer/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
