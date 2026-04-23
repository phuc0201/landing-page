import type { Product } from "../types/product.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const productService = createBaseApiFactory<Product, "Product">({
  resource: "products",
  tag: "Product",
});

export const { useGetListQuery: useGetProductsQuery } = productService;
