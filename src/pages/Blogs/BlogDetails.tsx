import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import BlogDetailsSkeleton from "../../components/blog/BlogDetailsSkeleton";
import { useGetBlogByIdQuery } from "../../services/blogService";

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [showSkeleton, setShowSkeleton] = useState(true);

  if (!slug) return <Navigate to="/tin-tuc" replace />;

  const m = slug.match(/-(\d+)$/);
  if (!m) return <div className="section-container py-12">Đường dẫn không hợp lệ.</div>;

  const id = Number(m[1]);
  if (!Number.isFinite(id) || Number.isNaN(id)) {
    return <div className="section-container py-12">ID bài viết không hợp lệ.</div>;
  }

  const { data: blogResp, isLoading } = useGetBlogByIdQuery(id);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      return;
    }

    // if data available, fade out skeleton shortly to make transition smooth
    if (blogResp?.data) {
      const t = window.setTimeout(() => setShowSkeleton(false), 120);
      return () => window.clearTimeout(t);
    }

    // no data & not loading => show content (error) immediately
    setShowSkeleton(false);
  }, [isLoading, blogResp]);

  const blog = blogResp?.data;

  return (
    <div className="mx-auto min-h-150">
      <div className="grid">
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 1 : 0 }}
          aria-hidden={!showSkeleton}
        >
          <BlogDetailsSkeleton />
        </div>

        <div
          className="section-container md:py-12 py-5 col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
        >
          {!blog ? (
            <div className="">Bài viết không tìm thấy.</div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
              <div className="text-sm text-gray-400 mb-6">
                {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
              </div>

              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
