import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearchQuery } from "../../services/searchService";
import getImageUrl from "../../utils/getImageUrl";
import toSlug from "../../utils/slugify";

interface HeaderSearchDropdownProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onClose?: () => void; // optional: dùng cho mobile drawer
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function HeaderSearchDropdown({
  searchQuery,
  setSearchQuery,
  onClose,
}: HeaderSearchDropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(searchQuery.trim(), 400);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const shouldFetch = debouncedQuery.length >= 2;

  const { data, isFetching } = useSearchQuery(debouncedQuery, {
    skip: !shouldFetch,
  });

  const products = data?.products?.items ?? [];
  const blogs = data?.blogs?.items ?? [];
  const hasResults = products.length > 0 || blogs.length > 0;
  const showDropdown = isFocused && shouldFetch;

  // Close dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown khi nhấn Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsFocused(false);
    setSearchQuery("");
    onClose?.();
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Search Input */}
      <div className="flex items-center bg-gray-100 rounded-full px-5 py-3 gap-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/40">
        <CiSearch className="h-4 w-4 text-gray-500 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Tìm kiếm sản phẩm, bài viết..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="bg-transparent outline-none text-sm text-gray-700 flex-1 placeholder-gray-400 min-w-0"
          autoComplete="off"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            aria-label="Xóa tìm kiếm"
          >
            <IoCloseOutline className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-120 overflow-y-auto">
          {isFetching ? (
            <SearchSkeleton />
          ) : hasResults ? (
            <div>
              {/* Products */}
              {products.length > 0 && (
                <section>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Sản phẩm
                    </span>
                  </div>
                  <ul>
                    {products.slice(0, 5).map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/san-pham/${toSlug(product.name)}-${product.id}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                        >
                          {product?.thumbnailUrl ? (
                            <img
                              src={getImageUrl(product.thumbnailUrl) ?? ""}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg shrink-0 border border-gray-100"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                              <CiSearch className="w-5 h-5 text-gray-300" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                              {highlightMatch(product.name, debouncedQuery)}
                            </p>
                            {product.price != null && (
                              <p className="text-xs text-primary font-semibold mt-0.5">
                                {product.price.toLocaleString("vi-VN")}₫
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {products.length > 5 && (
                    <div className="px-4 py-2 border-t border-gray-50">
                      <Link
                        to={`/san-pham?q=${encodeURIComponent(debouncedQuery)}`}
                        onClick={handleResultClick}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        Xem thêm {products.length - 5} sản phẩm →
                      </Link>
                    </div>
                  )}
                </section>
              )}

              {/* Blogs */}
              {blogs.length > 0 && (
                <section className={products.length > 0 ? "border-t border-gray-100" : ""}>
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Bài viết
                    </span>
                  </div>
                  <ul>
                    {blogs.slice(0, 3).map((blog) => (
                      <li key={blog.id}>
                        <Link
                          to={`/tin-tuc/${toSlug(blog.title)}-${blog.id}`}
                          onClick={handleResultClick}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors group"
                        >
                          {blog.thumbnailUrl ? (
                            <img
                              src={getImageUrl(blog.thumbnailUrl)}
                              alt={blog.title}
                              className="w-12 h-12 object-cover rounded-lg shrink-0 border border-gray-100"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                              <CiSearch className="w-5 h-5 text-gray-300" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                              {highlightMatch(blog.title, debouncedQuery)}
                            </p>
                            {blog.createdAt && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          ) : (
            <div className="px-6 py-8 text-center">
              <CiSearch className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                Không tìm thấy kết quả cho{" "}
                <span className="font-semibold text-gray-700">"{debouncedQuery}"</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Highlight từ khóa trong chuỗi kết quả */
function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5 not-italic">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Skeleton loading */
function SearchSkeleton() {
  return (
    <div className="p-4 space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
