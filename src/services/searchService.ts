import { createApi } from "@reduxjs/toolkit/query/react";
import type { Blog } from "../types/blog.type";
import type { Product } from "../types/product.type";
import { axiosBaseQuery } from "./base/axiosBaseQuery";

interface SearchResponse {
  products: {
    items: Product[];
  };
  blogs: {
    items: Blog[];
  };
}

export const searchService = createApi({
  reducerPath: "searchApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    search: builder.query<SearchResponse, string>({
      query: (q) => ({
        url: `/search`,
        params: { q },
      }),
      transformResponse: (response: { data: SearchResponse }) =>
        response.data || { products: { items: [] }, blogs: { items: [] } },
    }),
  }),
});

export const { useSearchQuery } = searchService;
