import { useGetCategoriesQuery } from "../../../services/categoryService";

interface CategoryTabsProps {
  selectedCategoryId: number;
  onSelectCategory: (categoryId: number) => void;
}

export default function CategoryTabs({ selectedCategoryId, onSelectCategory }: CategoryTabsProps) {
  const { data: categoriesData } = useGetCategoriesQuery({});

  return (
    <div className="hidden lg:flex flex-wrap gap-2">
      <button
        type="button"
        key={0}
        onClick={() => onSelectCategory(0)}
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
            onClick={() => onSelectCategory(category.id)}
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
