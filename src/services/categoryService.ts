import type { Category } from "../types/category.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const cateService = createBaseApiFactory<Category, "Category">({
  resource: "categories",
  tag: "Category",
});

export const { useGetListQuery: useGetCategoriesQuery } = cateService;
