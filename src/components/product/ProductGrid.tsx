import ProductThumbnail from "../../assets/products/prod1.jpg";
import type { Product } from "../../types/product.type";
import getImageUrl from "../../utils/getImageUrl";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center text-sm text-gray-500">
        Không có sản phẩm phù hợp.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard
            id={product.id}
            name={product.name}
            summary={product.summary ?? "Đang cập nhật mô tả sản phẩm."}
            price={product.price}
            salePrice={product.salePrice}
            thumbnailUrl={
              product.thumbnailUrl ? getImageUrl(product.thumbnailUrl) : ProductThumbnail
            }
          />
        </div>
      ))}
    </div>
  );
}
