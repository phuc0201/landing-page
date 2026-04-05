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
  products?: PopularProductItem[];
}

const DEFAULT_PRODUCTS: PopularProductItem[] = [
  {
    id: 1,
    name: "Sản phẩm A",
    price: 100000,
    salePrice: 90000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm A, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 2,
    name: "Sản phẩm B",
    price: 150000,
    salePrice: 120000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm B, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 3,
    name: "Sản phẩm C",
    price: 200000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm C, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 4,
    name: "Sản phẩm D",
    price: 180000,
    salePrice: 150000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm D, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 5,
    name: "Sản phẩm A",
    price: 100000,
    salePrice: 90000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm A, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 6,
    name: "Sản phẩm B",
    price: 150000,
    salePrice: 120000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm B, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 7,
    name: "Sản phẩm C",
    price: 200000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm C, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
  {
    id: 8,
    name: "Sản phẩm D",
    price: 180000,
    salePrice: 150000,
    thumbnailUrl: "https://vnherbs.vn/wp-content/uploads/2023/05/yen-6-768x768.png",
    summary:
      "Mô tả ngắn gọn về sản phẩm D, nêu bật các lợi ích chính và thành phần tự nhiên của nó.",
  },
];

export default function PopularProduct({
  title = "Sản phẩm nổi bật",
  subtitle = "Khám phá các dòng sản phẩm tiêu biểu với lợi ích rõ ràng cho sức khỏe và chất lượng sống.",
  products = DEFAULT_PRODUCTS,
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
              summary={product.summary}
              price={product.price}
              salePrice={product.salePrice}
              thumbnailUrl={product.thumbnailUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
