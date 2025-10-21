import { configureStore } from "@reduxjs/toolkit";
import rootApi from "../services/root.API";

export const store = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([rootApi.middleware]),
})