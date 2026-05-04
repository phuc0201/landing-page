import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../services/categoryService";
import toSlug from "../../../utils/slugify";

interface CategoryTabsProps {
  selectedCategoryId: number;
}

export default function CategoryTabs({ selectedCategoryId }: CategoryTabsProps) {
  const navigate = useNavigate();
  const { data: categoriesData } = useGetCategoriesQuery({});

  return (
    <div className="hidden lg:flex flex-wrap gap-2">
      <button
        type="button"
        key={0}
        onClick={() => navigate("?danh-muc=all")}
        className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
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
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
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
  );
}
