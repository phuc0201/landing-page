import type { SiteConfigItem } from "../types/siteConfig.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const siteConfigService = createBaseApiFactory<SiteConfigItem, "SiteConfig">({
  resource: "site-configs",
  tag: "SiteConfig",
});

export const { useGetListQuery: useGetSiteConfigQuery } = siteConfigService;
