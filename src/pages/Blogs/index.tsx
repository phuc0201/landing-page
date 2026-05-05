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

    if (items.length === 0) {
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
          style={{ opacity: showSkeleton ? 1 : 0, pointerEvents: showSkeleton ? "auto" : "none" }}
          aria-hidden={!showSkeleton}
        >
          <BlogListSkeleton />
        </div>
        <div
          className="section-container py-12 col-start-1 row-start-1 transition-opacity duration-300 ease-out"
          style={{ opacity: showSkeleton ? 0 : 1, pointerEvents: showSkeleton ? "none" : "auto" }}
        >
          {!isEmpty && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => {
                const slug = `${toSlug(b.title)}-${b.id}`;

                return (
                  <Link
                    key={b.id}
                    to={`/bai-viet/${slug}`}
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
