import { FiFilter, FiSearch } from "react-icons/fi";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
}

export default function ProductSearch({ value, onChange, onFilterClick }: ProductSearchProps) {
  return (
    <div className="flex w-full gap-3 lg:flex-col lg:gap-0 lg:max-w-72.5">
      <div className="relative flex-1">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Tìm sản phẩm..."
          className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-gray-500"
        />
      </div>

      <button
        type="button"
        onClick={onFilterClick}
        className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-600 transition hover:border-gray-400"
        title="Lọc danh mục"
      >
        <FiFilter size={20} />
      </button>
    </div>
  );
}
