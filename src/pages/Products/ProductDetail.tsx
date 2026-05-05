import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProductDetailSkeleton from "../../components/product/ProductDetailSkeleton";
import ProductImageSlider from "../../components/product/ProductImageSlider";
import { useSiteConfig } from "../../provider";
import { useGetProductByIdQuery } from "../../services/productService";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

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
  } = useGetProductByIdQuery(Number(id ?? 0), {
    skip: !isValidId,
  });

  if (!isValidId) {
    return (
      <div className="section-container lg:py-12 py-5">
        <h1 className="text-3xl font-bold">Sản phẩm không tồn tại</h1>
        <p className="mt-4">ID sản phẩm không hợp lệ.</p>
      </div>
    );
  }

  const product = productDetails?.data;

  useEffect(() => {
    if (isLoading || isFetching) {
      setShowSkeleton(true);
      return;
    }

    if (!product) {
      setShowSkeleton(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSkeleton(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isLoading, isFetching, product]);

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
    <div className="section-container lg:py-12 py-5">
      <div className="grid w-full">
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 1 : 0, pointerEvents: showSkeleton ? "auto" : "none" }}
          aria-hidden={!showSkeleton}
        >
          <ProductDetailSkeleton />
        </div>

        <div
          className="col-start-1 row-start-1 w-full transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
        >
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <ProductImageSlider images={product?.images || []} />
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <h1 className="text-5xl font-semibold text-gray-900">{product?.name}</h1>

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

                <div className="text-gray-700 whitespace-pre-line">{product?.summary}</div>

                <div className="pt-4">
                  <a
                    href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                    className="inline-block px-6 py-3 w-full text-center bg-(--primary-color) text-white rounded-lg font-semibold hover:bg-[#5a0509] transition-colors"
                  >
                    Liên hệ
                  </a>
                </div>

                <Link
                  to={
                    "https://www.facebook.com/sharer.php?u=" + "https://medibiotech.vn/products/1"
                  }
                  className="flex gap-3 items-center group"
                >
                  <FaFacebook className="text-gray-400 text-3xl group-hover:text-blue-800 transition-colors" />
                  <span className="text-gray-400 font-semibold group-hover:text-blue-800 transition-colors">
                    Chia sẻ lên Facebook
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="ck-content">
            <h1 className="mt-10 mb-5 text-3xl font-bold">Mô tả sản phẩm</h1>
            <div dangerouslySetInnerHTML={{ __html: product?.description || "" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
