import { Carousel } from "antd";

import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useGetBlogsQuery } from "../../services/blogService";
import getImageUrl from "../../utils/getImageUrl";
import BlogCard from "./BlogCard";

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
  const { data: blogResult } = useGetBlogsQuery({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () =>
      setSlidesToShow(getSlidesToShow(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const blogs = blogResult?.data || [];

  if (blogs.length === 0) {
    return null;
  }

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
          {
            breakpoint: 1280,
            settings: { slidesToShow: 2, slidesToScroll: 1 },
          },
          { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
      >
        {(blogResult?.data || []).map((b) => (
          <div key={b.id} className="px-2">
            <BlogCard
              id={b.id}
              title={b.title}
              thumbnailUrl={b.thumbnailUrl ? getImageUrl(b.thumbnailUrl) : ""}
              createdAt={b.createdAt}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
