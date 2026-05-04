import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryDrawer from "../../components/product/filters/CategoryDrawer";
import CategoryTabs from "../../components/product/filters/CategoryTabs";
import ProductGrid from "../../components/product/ProductGrid";
import ProductSearch from "../../components/product/ProductSearch";
import { useGetProductsQuery } from "../../services/productService";

export default function Products() {
  const [searchParams] = useSearchParams();
  const rawCategory = searchParams.get("danh-muc");
  const parsedCategory = rawCategory?.split("-").slice(-1)[0];
  const hasValidCategory = parsedCategory !== undefined && !Number.isNaN(Number(parsedCategory));

  // const [currentPage, setCurrentPage] = useState(1);

  const queryArgs = {
    ...(hasValidCategory && { filters: { categoryId: Number(parsedCategory) } }),
    page: 1,
    pageSize: 8,
  };

  const { data: productRes } = useGetProductsQuery(queryArgs);

  const products = productRes?.data ?? [];

  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

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

        <CategoryTabs selectedCategoryId={hasValidCategory ? Number(parsedCategory) : 0} />

        <CategoryDrawer
          selectedCategoryId={hasValidCategory ? Number(parsedCategory) : 0}
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
        />

        <p className="text-sm text-gray-400">{products.length} sản phẩm</p>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
