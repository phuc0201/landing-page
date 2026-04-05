export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error?: {
    code?: string;
    message?: string;
  };
  meta: {
    timestamp: string;
    path: string;
    pagination?: {
      page: number;
      totalPages: number;
      pageSize: number;
      totalItems: number;
    };
  };
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  categoryId: number;
  summary?: string;
  thumbnailUrl?: string;
  salePrice?: number;
} & Record<string, unknown>;

export type CategoryItem = {
  id: number;
  label: string;
};
