import { CiFilter } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../services/categoryService";
import toSlug from "../../../utils/slugify";

interface CategoryTabsProps {
  selectedCategoryId: number;
  onOpenFilter?: () => void;
}

export default function CategoryTabs({ selectedCategoryId, onOpenFilter }: CategoryTabsProps) {
  const navigate = useNavigate();
  const { data: categoriesData } = useGetCategoriesQuery({});

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
      <button
        type="button"
        onClick={onOpenFilter}
        className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-600 transition hover:border-gray-400 lg:hidden"
        aria-label="Mở bộ lọc danh mục"
      >
        <CiFilter className="text-lg" />
      </button>

      <div className="lg:flex flex-wrap hidden items-center gap-2 overflow-x-auto">
        <button
          type="button"
          key={0}
          onClick={() => navigate("?danh-muc=all")}
          className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition ${
            selectedCategoryId === 0
              ? "border-black bg-black text-white"
              : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
          }`}
        >
          Tất cả
        </button>

        {categoriesData?.data?.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => navigate(`?danh-muc=${toSlug(category.name)}-${category.id}`)}
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
