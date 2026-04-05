import type { Product } from "../types/product.type";
import { createBaseApiFactory } from "./base/baseFactory";

const productFactory = createBaseApiFactory<Product, "Product">({
  resource: "products",
  tag: "Product",
});

export const productReducer = productFactory.reducer;
export const productReducerPath = productFactory.reducerPath;
export const productMiddleware = productFactory.middleware;

export const { useGetListQuery: useGetProductsQuery } = productFactory;
