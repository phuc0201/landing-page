import type { CategoryItem } from "../../../types/product.type";

interface CategoryTabsProps {
  categories: CategoryItem[];
  selectedCategoryId: number;
  onSelectCategory: (categoryId: number) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="hidden lg:flex flex-wrap gap-2">
      {categories.map((category) => {
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
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
