import { useState } from "react";
import { PRODUCT_CATEGORIES } from "../../components/product/constants";
import CategoryDrawer from "../../components/product/filters/CategoryDrawer";
import CategoryTabs from "../../components/product/filters/CategoryTabs";
import { useProductFilters } from "../../components/product/filters/useProductFilters";
import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import { useGetProductsQuery } from "../../services/productService";

export default function Products() {
  const { data: productRes } = useGetProductsQuery({});
  const products = productRes?.data ?? [];

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const filteredProducts = useProductFilters(products, selectedCategoryId, searchKeyword);

  return (
    <section className="section-container mx-auto min-h-250 py-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">Bộ sưu tập</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
          </div>

          <ProductSearch
            value={searchKeyword}
            onChange={setSearchKeyword}
            onFilterClick={() => setIsFilterDrawerOpen(true)}
          />
        </div>

        <CategoryTabs
          categories={PRODUCT_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <CategoryDrawer
          categories={PRODUCT_CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
          onSelectCategory={(categoryId) => {
            setSelectedCategoryId(categoryId);
            setIsFilterDrawerOpen(false);
          }}
        />

        <p className="text-sm text-gray-400">{filteredProducts.length} sản phẩm</p>

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}
