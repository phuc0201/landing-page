import { Link } from "react-router-dom";
import toSlug from "../../utils/slugify";

interface BlogCardProps {
  id: number | string;
  title: string;
  thumbnailUrl: string;
  createdAt: string;
}

const formatDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return dateStr;
  }
};

export default function BlogCard({ id, title, thumbnailUrl, createdAt }: BlogCardProps) {
  return (
    <Link to={`/bai-viet/${toSlug(title) + "-" + id}`}>
      <div
        className="relative group aspect-video overflow-hidden h-full"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        {/* Bottom content - will slide up on desktop hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white transform transition-transform duration-300">
          <p className="text-xs md:text-sm text-gray-200 mb-2 font-medium transition-transform duration-300">
            {formatDate(createdAt)}
          </p>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-snug line-clamp-3 mb-3 transition-transform duration-300">
            {title}
          </h3>
          {/* <span className="inline-block px-4 py-2 bg-[#78070e] text-white text-xs md:text-sm font-medium rounded hover:bg-[#a50b0b] transition-all duration-300 transform lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
            Đọc bài viết
          </span> */}
        </div>
      </div>
    </Link>
  );
}
