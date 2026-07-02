import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import ProductDetailSkeleton from "../../components/product/ProductDetailSkeleton";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import ProductReviewForm from "../../components/product/ProductReviewForm";
import { useSiteConfig } from "../../provider";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../../services/productService";
import type { Product } from "../../types/product.type";
import getImageUrl from "../../utils/getImageUrl";
import toSlug from "../../utils/slugify";
import { CiFacebook } from "react-icons/ci";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: number;
  currentProductId: number;
}) {
  const { data: productRes, isLoading } = useGetProductsQuery(
    { filters: { categoryId }, pagination: { current: 1, pageSize: 4 } },
    { skip: !categoryId },
  );

  const related =
    productRes?.data?.filter((p) => p.id !== currentProductId).slice(0, 8) ??
    [];

  if (isLoading) {
    return (
      <div className="mt-12">
        <h2 className="md:text-3xl text-xl font-bold mb-6">
          Sản phẩm tương tự
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden border border-gray-100"
            >
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!related.length) return null;

  return (
    <div className="mt-12">
      <h2 className="md:text-3xl text-xl font-bold mb-6">Sản phẩm tương tự</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {related.map((product: Product) => (
          <div key={product.id}>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              summary=""
              thumbnailUrl={
                product.thumbnailUrl
                  ? getImageUrl(product.thumbnailUrl)
                  : "https://via.placeholder.com/300?text=No+Image"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const id = slug?.split("-").slice(-1)[0];
  const isValidId = Boolean(id) && !Number.isNaN(Number(id));
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { siteConfig } = useSiteConfig();
  const contactPhone = siteConfig?.contactInfor?.phoneNumber || "0398653281";

  const {
    data: productDetails,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdQuery(Number(id ?? 0), { skip: !isValidId });

  const product = productDetails?.data;

  const handleShareFacebook = () => {
    const url =
      "https://medibiotech.vn/san-pham/" +
      toSlug(product?.name || "") +
      "-" +
      product?.id;

    const shareUrl =
      "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);

    window.open(shareUrl, "_blank", "width=600,height=500");
  };

  useEffect(() => {
    if (isLoading || isFetching) {
      setShowSkeleton(true);
      return;
    }
    if (!product) {
      setShowSkeleton(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSkeleton(false), 120);
    return () => window.clearTimeout(timer);
  }, [isLoading, isFetching, product]);

  if (!isValidId) {
    return (
      <div className="section-container lg:py-12 py-5">
        <h1 className="text-3xl font-bold">Sản phẩm không tồn tại</h1>
        <p className="mt-4">ID sản phẩm không hợp lệ.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="section-container lg:py-12 py-5">
        <h1 className="text-3xl font-bold">Sản phẩm không tồn tại</h1>
        <p className="mt-4">Không thể tải thông tin sản phẩm.</p>
      </div>
    );
  }

  if (!product && !isLoading && !isFetching) {
    return (
      <div className="section-container lg:py-12 py-5">
        <h1 className="text-3xl font-bold">Sản phẩm không tồn tại</h1>
        <p className="mt-4">Không tìm thấy dữ liệu sản phẩm.</p>
      </div>
    );
  }

  return (
    <div className="section-container py-5">
      <div className="grid w-full">
        {/* SKELETON */}
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{
            opacity: showSkeleton ? 1 : 0,
            pointerEvents: showSkeleton ? "auto" : "none",
          }}
          aria-hidden={!showSkeleton}
        >
          <ProductDetailSkeleton />
        </div>

        {/* CONTENT */}
        <div
          className="col-start-1 row-start-1 w-full transition-opacity duration-300 ease-out"
          style={{
            opacity: showSkeleton ? 0 : 1,
            pointerEvents: showSkeleton ? "none" : "auto",
          }}
        >
          {/* PRODUCT INFO */}
          <div className="grid lg:grid-cols-5 md:gap-10 gap-4">
            <div className="lg:col-span-2">
              <ProductImageSlider
                images={
                  product?.images?.filter((p) => p?.scope === "product") || []
                }
              />
            </div>
            <div className="lg:col-span-3">
              <div className="md:space-y-6 space-y-1">
                <h1 className="md:text-5xl text-xl font-semibold text-gray-900">
                  {product?.name}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="text-2xl font-semibold text-(--primary-color)">
                    {product?.salePrice && product.salePrice < product.price
                      ? formatCurrency(product.salePrice)
                      : product?.price
                        ? formatCurrency(product.price)
                        : ""}
                  </div>
                  {product?.salePrice && product.salePrice < product.price && (
                    <div className="text-sm text-gray-400 line-through">
                      {formatCurrency(product.price)}
                    </div>
                  )}
                </div>

                {product?.summary && (
                  <div className="text-gray-700 whitespace-pre-line">
                    {product.summary}
                  </div>
                )}

                <div className="pt-4">
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="inline-block px-6 py-3 w-full text-center bg-(--primary-color) text-white rounded-lg font-semibold hover:bg-(--primary-color)/90 transition-colors"
                  >
                    Liên hệ
                  </a>
                </div>

                <button
                  onClick={handleShareFacebook}
                  className="flex gap-3 items-center group mt-2"
                >
                  <CiFacebook className="text-gray-400 group-hover:text-blue-800 transition-colors text-4xl" />
                </button>
              </div>
            </div>
          </div>

          <Tabs
            className="mt-10 product-detail-tabs"
            size="large"
            defaultActiveKey="description"
            items={[
              {
                key: "description",
                label: <span className="text-base font-semibold">Mô tả</span>,
                children: (
                  <div className="ck-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product?.description || "",
                      }}
                    />
                  </div>
                ),
              },
              {
                key: "review",
                label: (
                  <span className="text-base font-semibold">Đánh giá</span>
                ),
                children: (
                  <ProductReviewForm
                    productName={product?.name || "Sản phẩm"}
                  />
                ),
              },
            ]}
          />

          {/* RELATED PRODUCTS */}
          {product?.categoryId && (
            <RelatedProducts
              categoryId={product.categoryId}
              currentProductId={product.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
