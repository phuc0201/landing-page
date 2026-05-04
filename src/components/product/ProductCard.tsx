import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../provider";
import "../../styles/wishlist-button.css";

interface ProductCardProps {
  id: number | string;
  name: string;
  price: number;
  summary: string;
  salePrice?: number;
  thumbnailUrl: string;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProductCard({
  id,
  name,
  price,
  salePrice,
  thumbnailUrl,
  summary,
}: ProductCardProps) {
  const { toggleItem, isInWishlist } = useWishlist();
  const [animating, setAnimating] = useState(false);
  const numId = typeof id === "string" ? parseInt(id, 10) : id;
  const inWishlist = isInWishlist(numId);
  const hasSale = typeof salePrice === "number" && salePrice > 0 && salePrice < price;
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0;

  const handleWishlistToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);

    toggleItem({
      id: numId,
      name,
      price,
      salePrice,
      thumbnailUrl,
      summary,
    });
  };

  return (
    <div className="relative group overflow-hidden transition duration-300 cursor-pointer">
      <label
        className={`btn-wishlist ui-bookmark absolute right-3 top-3 z-10 cursor-pointer ${animating ? "animating" : ""}`}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={inWishlist}
          onChange={handleWishlistToggle}
        />
        <div className="bookmark">
          <svg
            viewBox="0 0 16 16"
            style={{ marginTop: "4px" }}
            className="bi bi-heart-fill"
            height="25"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>

      <Link to={`/products/${id}`}>
        <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
          <span className="absolute left-0 bottom-0 right-0 py-2 flex justify-center text-white text-lg font-semibold opacity-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-100 z-10">
            Xem chi tiết
          </span>

          {hasSale && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[#78070e] px-3 py-1 text-xs font-semibold text-white shadow">
              -{discountPercent}%
            </span>
          )}

          <img
            src={thumbnailUrl}
            alt={name}
            className="h-full w-full overflow-hidden object-cover transition duration-500 group-hover:scale-101"
            loading="lazy"
          />
        </div>

        <div className="py-2">
          <h3 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-1">{name}</h3>
          <span className="text-xs text-gray-400 font-light line-clamp-1">{summary}</span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-base font-bold text-[#78070e]">
              {formatCurrency(hasSale ? (salePrice as number) : price)}
            </span>
            {hasSale && (
              <span className="text-sm text-gray-400 line-through">{formatCurrency(price)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
