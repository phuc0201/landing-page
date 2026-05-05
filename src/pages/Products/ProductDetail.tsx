import { FaFacebook } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
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
  if (!id || Number.isNaN(Number(id))) {
    return (
      <div className="section-container py-12">
        <h1 className="text-3xl font-bold">Sản phẩm không tồn tại</h1>
        <p className="mt-4">ID sản phẩm không hợp lệ.</p>
      </div>
    );
  }

  const { data: productDetails } = useGetProductByIdQuery(Number(id));

  return (
    <div className="section-container py-12">
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <ProductImageSlider images={productDetails?.data?.images || []} />
        </div>
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold text-gray-900">{productDetails?.data?.name}</h1>

            <div className="flex items-center gap-4">
              <div className="text-2xl font-semibold text-(--primary-color)">
                {productDetails?.data?.salePrice &&
                productDetails.data.salePrice < productDetails.data.price
                  ? formatCurrency(productDetails.data.salePrice)
                  : productDetails?.data?.price
                    ? formatCurrency(productDetails.data.price)
                    : ""}
              </div>
              {productDetails?.data?.salePrice &&
                productDetails.data.salePrice < productDetails.data.price && (
                  <div className="text-sm text-gray-400 line-through">
                    {formatCurrency(productDetails.data.price)}
                  </div>
                )}
            </div>

            <div className="text-gray-700 whitespace-pre-line">{productDetails?.data?.summary}</div>

            <div className="pt-4">
              <a
                href={`tel:${(useSiteConfig().siteConfig?.contactInfor?.phoneNumber || "0398653281").replace(/\s+/g, "")}`}
                className="inline-block px-6 py-3 w-full text-center bg-(--primary-color) text-white rounded-lg font-semibold hover:bg-[#5a0509] transition-colors"
              >
                Liên hệ
              </a>
            </div>

            <Link
              to={"https://www.facebook.com/sharer.php?u=" + "https://medibiotech.vn/products/1"}
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
        <div dangerouslySetInnerHTML={{ __html: productDetails?.data?.description || "" }} />
      </div>
    </div>
  );
}
