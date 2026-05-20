import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryDrawer from "../../components/product/filters/CategoryDrawer";
import CategoryTabs from "../../components/product/filters/CategoryTabs";
import ProductGrid from "../../components/product/ProductGrid";
import ProductGridSkeleton from "../../components/product/ProductGridSkeleton";
import { useGetProductsQuery } from "../../services/productService";
import type { Product } from "../../types/product.type";

export default function Products() {
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const [searchParams] = useSearchParams();
  const rawCategory = searchParams.get("danh-muc");
  const parsedCategory = rawCategory?.split("-").slice(-1)[0];
  const hasValidCategory =
    parsedCategory !== undefined && !Number.isNaN(Number(parsedCategory));

  const queryArgs = {
    ...(hasValidCategory && {
      filters: { categoryId: Number(parsedCategory) },
    }),
    pagination: { current: page, pageSize: PAGE_SIZE },
  };

  const {
    data: productRes,
    isLoading,
    isFetching,
  } = useGetProductsQuery(queryArgs);

  const pagination = productRes?.meta?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  // merge pages into items
  useEffect(() => {
    if (!productRes?.data) return;

    if (page === 1) {
      setItems(productRes.data);
      return;
    }

    setItems((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const next = [...prev];
      for (const it of productRes.data || []) {
        if (!existingIds.has(it.id)) next.push(it);
      }
      return next;
    });
  }, [productRes, page, resetKey]);

  useEffect(() => {
    if (isLoading && items.length === 0) {
      setShowSkeleton(true);
      return;
    }

    if (!isLoading && !isFetching) {
      const timer = window.setTimeout(() => setShowSkeleton(false), 120);
      return () => window.clearTimeout(timer);
    }
  }, [isLoading, items.length]);

  // infinite scroll: observe sentinel at list end, fallback to scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (page >= totalPages) return;

    const sentinel = sentinelRef.current;

    if (
      typeof window !== "undefined" &&
      "IntersectionObserver" in window &&
      sentinel
    ) {
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setPage((p) => Math.min(p + 1, totalPages));
            }
          }
        },
        { root: null, rootMargin: "200px", threshold: 0 },
      );

      obs.observe(sentinel);
      return () => obs.disconnect();
    }

    // fallback for older browsers: use scroll listener with robust measurements
    const onScroll = () => {
      if (isLoading || isFetching) return;
      if (page >= totalPages) return;

      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const scrollHeight =
        document.documentElement.scrollHeight ||
        document.body.scrollHeight ||
        0;
      const scrollPos = window.innerHeight + scrollTop;
      const threshold = scrollHeight - 200;
      if (scrollPos >= threshold) {
        setPage((p) => Math.min(p + 1, totalPages));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading, isFetching, page, totalPages]);

  // reset page when category changes
  useEffect(() => {
    setPage(1);
    setResetKey((k) => k + 1);
  }, [parsedCategory]);

  return (
    <section className="section-container py-5 mx-auto lg:min-h-100">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-gray-400 uppercase">
              Bộ sưu tập
            </p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900">
              Sản phẩm
            </h1>
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

        <p className="text-sm text-gray-400">
          {productRes?.meta?.pagination?.totalItems ?? 0} sản phẩm
        </p>

        <div className="grid">
          {showSkeleton && (
            <div
              className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
              style={{
                opacity: showSkeleton ? 1 : 0,
                pointerEvents: showSkeleton ? "auto" : "none",
              }}
              aria-hidden={!showSkeleton}
            >
              <ProductGridSkeleton />
            </div>
          )}

          <div
            className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
            style={{
              opacity: showSkeleton ? 0 : isFetching && page === 1 ? 0.4 : 1,
              pointerEvents:
                showSkeleton || (isFetching && page === 1) ? "none" : "auto",
            }}
          >
            <ProductGrid products={items} />
          </div>
        </div>
      </div>

      {/* sentinel for IntersectionObserver */}
      <div ref={sentinelRef} aria-hidden style={{ width: "100%", height: 1 }} />

      {/* loader indicator */}
      <div className="mt-8 text-center text-sm text-gray-500">
        {isFetching && page > 1
          ? "Đang tải thêm..."
          : page >= totalPages
            ? ""
            : "Kéo xuống để tải thêm"}
      </div>
    </section>
  );
}
