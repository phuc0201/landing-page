import { Drawer } from "antd";
import type { CategoryItem } from "../../../types/product.type";

interface CategoryDrawerProps {
  categories: CategoryItem[];
  selectedCategoryId: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: number) => void;
}

export default function CategoryDrawer({
  categories,
  selectedCategoryId,
  isOpen,
  onClose,
  onSelectCategory,
}: CategoryDrawerProps) {
  return (
    <Drawer
      title="Lọc theo danh mục"
      placement="bottom"
      onClose={onClose}
      open={isOpen}
      classNames={{ body: "!p-0" }}
      className="lg:hidden"
    >
      <div className="flex flex-col">
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`w-full px-6 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? "border-(--primary-color) bg-(--primary-color) text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}
