import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../services/categoryService";
import { toSlug } from "../../../utils/slugify";

interface CategoryDrawerProps {
  selectedCategoryId: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryDrawer({
  selectedCategoryId,
  isOpen,
  onClose,
}: CategoryDrawerProps) {
  const navigate = useNavigate();
  const { data: categoriesData } = useGetCategoriesQuery({});

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
        {categoriesData?.data?.map((category) => {
          const isActive = selectedCategoryId === category.id;

          return (
            <button
              type="button"
              key={category.id}
              onClick={() => navigate(`?danh-muc=${toSlug(category.name)}-${category.id}`)}
              className={`w-full px-6 py-3 text-left text-sm font-medium transition ${
                isActive
                  ? "border-(--primary-color) bg-(--primary-color) text-white"
                  : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}
