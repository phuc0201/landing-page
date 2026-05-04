import type { ApiResponse } from "../types/apiResponse";
import type { Product } from "../types/product.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const productService = createBaseApiFactory<Product, "Product">({
  resource: "products",
  tag: "Product",
});

const productExtraService = productService.injectEndpoints({
  endpoints: (build) => ({
    getPopularProducts: build.query<Product[], void>({
      query: () => ({
        url: "/popular-products",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Product[]>) => response?.data || [],
    }),
  }),
});

export const { useGetListQuery: useGetProductsQuery, useGetPopularProductsQuery } =
  productExtraService;
