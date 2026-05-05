import type { SiteConfigImage } from "./siteConfig.type";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  summary?: string;
  thumbnailUrl?: string;
  salePrice?: number;
  images?: SiteConfigImage[];
} & Record<string, unknown>;

export type CategoryItem = {
  id: number;
  label: string;
};
