import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogListSkeleton from "../../components/blog/BlogListSkeleton";
import { useGetBlogsQuery } from "../../services/blogService";
import type { Blog } from "../../types/blog.type";
import getImageUrl from "../../utils/getImageUrl";
import toSlug from "../../utils/slugify";

export default function Blogs() {
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Blog[]>([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const {
    data: blogResults,
    isLoading,
    isFetching,
  } = useGetBlogsQuery({
    pagination: { current: page, pageSize: PAGE_SIZE },
  });

  const pagination = blogResults?.meta?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  // merge pages into items
  useEffect(() => {
    if (!blogResults?.data) return;

    if (page === 1) {
      setItems(blogResults.data);
      return;
    }

    setItems((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const next = [...prev];
      for (const it of blogResults.data || []) {
        if (!existingIds.has(it.id)) next.push(it);
      }
      return next;
    });
  }, [blogResults]);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSkeleton(false);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isLoading, items.length]);

  // infinite scroll: load next page when near bottom
  useEffect(() => {
    const onScroll = () => {
      if (isLoading || isFetching) return;
      if (page >= totalPages) return;

      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.body.offsetHeight - 300;
      if (scrollPos >= threshold) {
        setPage((p) => Math.min(p + 1, totalPages));
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLoading, isFetching, page, totalPages]);

  // reset when user navigates back to page 1 scenario handled by router mount

  const isEmpty = !items || items.length === 0;

  return (
    <div className="">
      <div className="grid">
        <div
          className="col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{
            opacity: showSkeleton ? 1 : 0,
            pointerEvents: showSkeleton ? "auto" : "none",
          }}
          aria-hidden={!showSkeleton}
        >
          <BlogListSkeleton />
        </div>
        <div
          className="section-container py-5 col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{
            opacity: showSkeleton ? 0 : 1,
            pointerEvents: showSkeleton ? "none" : "auto",
          }}
        >
          {isEmpty && !showSkeleton && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-500 mb-1">
                Chưa có tin tức nào
              </h3>
              <p className="text-sm text-gray-400">
                Vui lòng quay lại sau để xem các bài viết mới nhất.
              </p>
            </div>
          )}
          {!isEmpty && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => {
                const slug = `${toSlug(b.title)}-${b.id}`;

                return (
                  <Link
                    key={b.id}
                    to={`/tin-tuc/${slug}`}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    {b.thumbnailUrl ? (
                      <img
                        src={getImageUrl(b.thumbnailUrl)}
                        alt={b.title}
                        loading="lazy"
                        className="w-full h-44 md:h-40 lg:h-44 object-cover"
                      />
                    ) : null}

                    <div className="p-4">
                      <h2 className="text-lg font-semibold mb-2">
                        <span className="text-gray-900 hover:text-(--primary-color)">
                          {b.title}
                        </span>
                      </h2>
                      <div className="text-xs text-gray-400">
                        {new Date(b.createdAt).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* loader indicator */}
      <div className="mt-8 text-center text-sm text-gray-500">
        {isFetching && page > 1
          ? "Đang tải thêm..."
          : page >= totalPages
            ? ""
            : "Kéo xuống để tải thêm"}
      </div>
    </div>
  );
}
