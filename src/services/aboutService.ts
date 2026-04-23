import type { About } from "../types/about.type";
import type { ApiResponse } from "../types/apiResponse";
import type { AxiosBaseQueryError } from "./base/axiosBaseQuery";
import { createBaseApiFactory } from "./base/baseFactory";

export const aboutService = createBaseApiFactory<About, "About">({
  resource: "abouts",
  tag: "About",
});

const aboutExtraApi = aboutService.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<About, void>({
      query: () => ({
        url: "site-configs/about",
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

export const { useGetAboutQuery } = aboutExtraApi;
