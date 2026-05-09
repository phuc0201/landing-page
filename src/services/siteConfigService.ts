import type { ApiResponse } from "../types/apiResponse";
import type { SiteConfig } from "../types/siteConfig.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const siteConfigService = createBaseApiFactory<SiteConfig, "SiteConfig">({
  resource: "/site-configs",
  tag: "SiteConfig",
});

export const siteConfigExtra = siteConfigService.injectEndpoints({
  endpoints: (builder) => ({
    getSiteConfig: builder.query<ApiResponse<SiteConfig>, void>({
      query: () => ({
        url: "/site-configs",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSiteConfigQuery } = siteConfigExtra;
