import { Carousel } from "antd";
import Blog1 from "../../assets/blogs/blog1.jpg";
import Blog2 from "../../assets/blogs/blog2.jpg";
import Blog3 from "../../assets/blogs/blog3.jpg";
import Blog4 from "../../assets/blogs/blog4.jpg";

import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import BlogCard from "./BlogCard";

const blogs = [
  {
    id: 1,
    title: "Đông Trùng Hạ Thảo – Báu Vật Của Thiên Nhiên",
    thumbnailUrl: Blog1,
    createdAt: "2026-03-25",
  },
  {
    id: 2,
    title: "Tác Dụng Của Đông Trùng Hạ Thảo Với Sức Khỏe",
    thumbnailUrl: Blog2,
    createdAt: "2026-03-10",
  },
  {
    id: 3,
    title: "Đông Trùng Hạ Thảo Tây Tạng – Loại Thượng Hạng",
    thumbnailUrl: Blog3,
    createdAt: "2026-02-18",
  },
  {
    id: 4,
    title: "Cách Phân Biệt Đông Trùng Hạ Thảo Thật Và Giả",
    thumbnailUrl: Blog4,
    createdAt: "2026-02-05",
  },
  {
    id: 5,
    title: "Đông Trùng Hạ Thảo Nuôi Cấy Và Tự Nhiên Khác Nhau Thế Nào?",
    thumbnailUrl: Blog1,
    createdAt: "2026-01-20",
  },
  {
    id: 6,
    title: "Uống Đông Trùng Hạ Thảo Đúng Cách Để Đạt Hiệu Quả Tối Ưu",
    thumbnailUrl: Blog2,
    createdAt: "2026-01-10",
  },
  {
    id: 7,
    title: "Đông Trùng Hạ Thảo Hỗ Trợ Tăng Cường Miễn Dịch",
    thumbnailUrl: Blog3,
    createdAt: "2025-12-28",
  },
  {
    id: 8,
    title: "Đông Trùng Hạ Thảo Và Công Dụng Với Người Bệnh Tiểu Đường",
    thumbnailUrl: Blog4,
    createdAt: "2025-12-15",
  },
  {
    id: 9,
    title: "Giá Đông Trùng Hạ Thảo Trên Thị Trường Hiện Nay",
    thumbnailUrl: Blog2,
    createdAt: "2025-12-05",
  },
  {
    id: 10,
    title: "Đông Trùng Hạ Thảo – Liều Dùng Và Lưu Ý Khi Sử Dụng",
    thumbnailUrl: Blog1,
    createdAt: "2025-11-20",
  },
];

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/20 text-gray-200 transition-all duration-200"
  >
    <BiChevronLeft size={20} />
  </button>
);

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/20 text-gray-200 transition-all duration-200"
  >
    <BiChevronRight size={20} />
  </button>
);
const getSlidesToShow = (width: number) => {
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
};

export default function BlogCarousel() {
  const [slidesToShow, setSlidesToShow] = useState(() => getSlidesToShow(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="-mx-2">
      <Carousel
        className="blog-carousel"
        prevArrow={<PrevArrow />}
        nextArrow={<NextArrow />}
        arrows
        dots={false}
        infinite={true}
        draggable
        autoplay
        autoplaySpeed={3000}
        speed={500}
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1280, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
      >
        {blogs.map((b) => (
          <div key={b.id} className="px-2">
            <BlogCard
              id={b.id}
              title={b.title}
              thumbnailUrl={b.thumbnailUrl}
              createdAt={b.createdAt}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
