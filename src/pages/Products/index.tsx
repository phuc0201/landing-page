import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryDrawer from "../../components/product/filters/CategoryDrawer";
import CategoryTabs from "../../components/product/filters/CategoryTabs";
import ProductGrid from "../../components/product/ProductGrid";
import ProductGridSkeleton from "../../components/product/ProductGridSkeleton";
import { useGetProductsQuery } from "../../services/productService";

export default function Products() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const [searchParams] = useSearchParams();
  const rawCategory = searchParams.get("danh-muc");
  const parsedCategory = rawCategory?.split("-").slice(-1)[0];
  const hasValidCategory = parsedCategory !== undefined && !Number.isNaN(Number(parsedCategory));

  const queryArgs = {
    ...(hasValidCategory && { filters: { categoryId: Number(parsedCategory) } }),
    page: 1,
    pageSize: 8,
  };

  const { data: productRes, isLoading, isFetching } = useGetProductsQuery(queryArgs);

  const products = productRes?.data ?? [];

  useEffect(() => {
    if (isLoading || isFetching) {
      setShowSkeleton(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSkeleton(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isLoading, isFetching, products.length]);

  return (
    <section className="section-container lg:py-12 py-5 mx-auto lg:min-h-100">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">Bộ sưu tập</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
          </div>
        </div>

        <CategoryTabs
          selectedCategoryId={hasValidCategory ? Number(parsedCategory) : 0}
          onOpenFilter={() => setIsFilterDrawerOpen(true)}
        />

        <CategoryDrawer
          selectedCategoryId={hasValidCategory ? Number(parsedCategory) : 0}
          isOpen={isFilterDrawerOpen}
          onClose={() => setIsFilterDrawerOpen(false)}
        />

        <p className="text-sm text-gray-400">{products.length} sản phẩm</p>

        <div className="grid">
          <div
            className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            style={{ opacity: showSkeleton ? 1 : 0, pointerEvents: showSkeleton ? "auto" : "none" }}
            aria-hidden={!showSkeleton}
          >
            {isLoading || isFetching ? <ProductGridSkeleton /> : null}
          </div>

          <div
            className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
          >
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
