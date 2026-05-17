import { Link } from "react-router-dom";
import { useWishlist } from "../../provider";
import getImageUrl from "../../utils/getImageUrl";
import toSlug from "../../utils/slugify";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

export default function Wishlist() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="">
      <section className="section-container mx-auto px-4 py-10 md:py-16">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-(--primary-color)">
            Yêu thích
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Sản phẩm yêu thích của bạn
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-600">
            Bạn có {items.length} sản phẩm trong danh sách yêu thích
          </p>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-6 text-6xl text-gray-300">♡</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Danh sách yêu thích trống</h2>
            <p className="text-gray-600 mb-8">
              Hãy thêm những sản phẩm yêu thích của bạn để tìm kiếm dễ dàng hơn
            </p>
            <Link
              to="/san-pham?danh-muc=all"
              className="inline-block px-8 py-3 bg-(--primary-color) text-white font-semibold hover:bg-(--primary-color)/90"
            >
              Xem sản phẩm
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <div key={product.id} className="bg-white overflow-hidden">
                  <Link to={`/san-pham/${toSlug(product.name)}-${product.id}`}>
                    <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                      {product.thumbnailUrl && (
                        <img
                          src={getImageUrl(product.thumbnailUrl)}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      )}
                    </div>
                  </Link>

                  <div className="pt-4">
                    <Link to={`/san-pham/${toSlug(product.name)}-${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 hover:text-(--primary-color) transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* {product.summary && (
                      <p className="text-xs text-gray-400 font-light line-clamp-1 mt-1">
                        {product.summary}
                      </p>
                    )} */}

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-lg font-bold text-(--primary-color)">
                        {formatCurrency(
                          product.salePrice && product.salePrice < product.price
                            ? product.salePrice
                            : product.price,
                        )}
                      </span>
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatCurrency(product.price)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      Xóa khỏi yêu thích
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
