export type SiteConfig = {
  bannerHome?: SiteConfigImage[];
  color?: { primary?: string | null; secondary?: string | null };
  contact?: SiteConfigItem[];
  contactInfor?: ContactInfo | null;
  heroSection?: Record<string, SiteConfigItem> | null;
  icon?: Record<"favicon" | "mainLogo" | "subLogo", SiteConfigImage> | null;
  topBar?: SiteConfigItem[];
  whyNot?: SiteConfigItem[];
};

export type ContactInfo = {
  name?: string | null;
  address?: string | null;
  taxCode?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  lng?: number | null;
  lat?: number | null;
};

export type SiteConfigItem = {
  id: string;
  type: string;
  text?: string | null;
  title?: string | null;
  content?: string | null;
  link?: string | null;
  active?: boolean;
  index?: number | null;
  images?: SiteConfigImage[];
  image?: SiteConfigImage;
};

export type UpsertSiteConfigBody = {
  id?: string;
  text?: string;
  title?: string;
  content?: string;
  link?: string;
  index?: number;
};

export interface SiteConfigImage {
  id?: string;
  url?: string;
  filePath?: string;
  scope?: string;
  productId?: number;
  blogId?: number | null;
  policyId?: number | null;
  siteConfigId?: number | null;
  alt?: string | null;
  index?: number;
  active?: boolean;
  deleted?: boolean;
}
