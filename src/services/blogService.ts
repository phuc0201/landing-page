import type { Blog } from "../types/blog.type";
import { createBaseApiFactory } from "./base/baseFactory";

export const blogService = createBaseApiFactory<Blog, "blogs">({
  resource: "blogs",
  tag: "blogs",
});

// Export both list and getById hooks
export const { useGetListQuery: useGetBlogsQuery, useGetByIdQuery: useGetBlogByIdQuery } =
  blogService;
