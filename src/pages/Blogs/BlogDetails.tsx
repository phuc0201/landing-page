import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import BlogDetailsSkeleton from "../../components/blog/BlogDetailsSkeleton";
import { useGetBlogByIdQuery, useGetBlogsQuery } from "../../services/blogService";
import getImageUrl from "../../utils/getImageUrl";
import toSlug from "../../utils/slugify";

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
  const { data: blogsResp } = useGetBlogsQuery({ pagination: { current: 1, pageSize: 8 } });

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      return;
    }
    if (blogResp?.data) {
      const t = window.setTimeout(() => setShowSkeleton(false), 120);
      return () => window.clearTimeout(t);
    }
    setShowSkeleton(false);
  }, [isLoading, blogResp]);

  const blog = blogResp?.data;

  // Lấy danh sách blog, lọc bỏ bài hiện tại
  const otherBlogs = (blogsResp?.data ?? []).filter((b) => b.id !== id).slice(0, 6);

  const shareUrl =
    "https://www.facebook.com/sharer.php?u=" +
    encodeURIComponent(
      "https://medibiotech.vn/tin-tuc/" + toSlug(blog?.title ?? "") + "-" + blog?.id,
    );

  return (
    <div className="mx-auto min-h-150">
      {/* skeleton overlay */}
      <div className="grid">
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{
            opacity: showSkeleton ? 1 : 0,
            pointerEvents: showSkeleton ? "auto" : "none",
            zIndex: showSkeleton ? 20 : 0,
          }}
          aria-hidden={!showSkeleton}
        >
          <BlogDetailsSkeleton />
        </div>

        {/* main layout: article + sidebar */}
        <div
          className="section-container py-5 col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
        >
          {!blog ? (
            <div>Bài viết không tìm thấy.</div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* ── Article content ── */}
              <article className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-400">
                    {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("vi-VN") : ""}
                  </span>

                  {/* Share Facebook button */}
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg cursor-pointer bg-[#1877F2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#166FE5] active:scale-95"
                  >
                    {/* Facebook icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Chia sẻ
                  </a>
                </div>

                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </article>

              {/* ── Sidebar: danh sách bài viết ── */}
              {otherBlogs.length > 0 && (
                <aside className="w-full lg:w-72 shrink-0 self-start">
                  <div className="">
                    <h2 className="mb-4 text-base font-semibold text-gray-800">
                      Bài viết liên quan
                    </h2>
                    <ul className="space-y-4">
                      {otherBlogs.map((b) => (
                        <li key={b.id}>
                          <Link
                            to={`/tin-tuc/${toSlug(b.title)}-${b.id}`}
                            className="group flex gap-3"
                          >
                            {/* thumbnail */}
                            {b.thumbnailUrl && (
                              <img
                                src={getImageUrl(b.thumbnailUrl)}
                                alt={b.title}
                                className="h-14 w-14 shrink-0 rounded-md object-cover"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="line-clamp-2 text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                {b.title}
                              </p>
                              {b.createdAt && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {new Date(b.createdAt).toLocaleDateString("vi-VN")}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/tin-tuc"
                      className="mt-5 block text-center text-sm font-medium text-primary hover:underline"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                </aside>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
