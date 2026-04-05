import BlogThumbnailDefault from "../../assets/blogs/blog1.jpg";
import BlogCard from "./BlogCard";

export type PopularBlogItem = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt?: string;
};

interface PopularBlogProps {
  blogs?: PopularBlogItem[];
}

const DEFAULT_BLOGS: PopularBlogItem[] = [
  {
    id: 1,
    title: "Bài viết A - Khám phá sức khỏe từ thiên nhiên",
    thumbnailUrl: BlogThumbnailDefault,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Bài viết B - Lợi ích của dược liệu truyền thống",
    thumbnailUrl: BlogThumbnailDefault,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Bài viết C - Hướng dẫn chọn sản phẩm phù hợp",
    thumbnailUrl: BlogThumbnailDefault,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function PopularBlog({ blogs = DEFAULT_BLOGS }: PopularBlogProps) {
  const displayBlogs = blogs.slice(0, 6);

  return (
    <section className="lg:py-20 py-10">
      <div className="mx-auto w-full px-4 sm:px-0">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {displayBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              thumbnailUrl={blog.thumbnailUrl}
              createdAt={blog.createdAt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
