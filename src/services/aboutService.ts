import type { About } from "../types/about.type";
import type { ApiResponse } from "../types/product.type";
import type { AxiosBaseQueryError } from "./base/axiosBaseQuery";
import { createBaseApiFactory } from "./base/baseFactory";

const aboutBaseFactory = createBaseApiFactory<About, "About">({
  resource: "abouts",
  tag: "About",
});

const aboutApi = aboutBaseFactory.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<About, void>({
      query: () => ({
        url: "abouts",
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<About>) => {
        return response.data as About;
      },
      transformErrorResponse: (response: AxiosBaseQueryError) => {
        console.error("Fetch about failed:", response);
        return response;
      },
    }),
  }),
});

export const aboutReducer = aboutBaseFactory.reducer;
export const aboutReducerPath = aboutBaseFactory.reducerPath;
export const aboutMiddleware = aboutBaseFactory.middleware;

export const { useGetAboutQuery } = aboutApi;
