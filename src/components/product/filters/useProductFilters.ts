import { useMemo } from "react";
import type { Product } from "../../../types/product.type";

export function useProductFilters(
  products: Product[],
  selectedCategoryId: number,
  searchKeyword: string,
) {
  const normalizedKeyword = searchKeyword.trim().toLowerCase();

  return useMemo(() => {
    return products.filter((product) => {
      const matchCategory = selectedCategoryId === 0 || product.categoryId === selectedCategoryId;
      const matchKeyword =
        normalizedKeyword.length === 0 ||
        product.name.toLowerCase().includes(normalizedKeyword) ||
        (product.summary ?? "").toLowerCase().includes(normalizedKeyword);

      return matchCategory && matchKeyword;
    });
  }, [products, selectedCategoryId, normalizedKeyword]);
}
