import type { Product } from "../../types/product.type";
import getImageUrl from "../../utils/getImageUrl";
import ProductCard from "./ProductCard";

export type PopularProductItem = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  thumbnailUrl: string;
  summary: string;
};

interface PopularProductProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
}

export default function PopularProduct({
  title = "Sản phẩm nổi bật",
  subtitle = "Khám phá các dòng sản phẩm tiêu biểu với lợi ích rõ ràng cho sức khỏe và chất lượng sống.",
  products = [],
}: PopularProductProps) {
  const displayProducts = products.slice(0, 8);

  return (
    <section className="lg:py-20 py-4">
      <div className="mx-auto section-container px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              summary={product.summary || ""}
              price={product.price}
              salePrice={product.salePrice}
              thumbnailUrl={product.thumbnailUrl ? getImageUrl(product.thumbnailUrl) : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
