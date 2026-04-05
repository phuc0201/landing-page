import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { aboutMiddleware, aboutReducer, aboutReducerPath } from "./services/aboutService";
import { productMiddleware, productReducer, productReducerPath } from "./services/productService";

export const store = configureStore({
  reducer: { [aboutReducerPath]: aboutReducer, [productReducerPath]: productReducer } as Record<
    string,
    any
  >,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aboutMiddleware as any, productMiddleware as any),
});
setupListeners(store.dispatch);
