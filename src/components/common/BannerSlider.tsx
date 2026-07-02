import { Carousel } from "antd";
import { useMemo } from "react";
import getImageUrl from "../../utils/getImageUrl";

interface BannerSliderProps {
  itemsToShow?: number;
  items: any[];
  aspectRatio?: string; // e.g. "16/9", "4/3", "21/9"
}

function getInitialSlides(itemsToShow: number): number {
  if (typeof window === "undefined") return itemsToShow;
  const width = window.innerWidth;
  if (width < 480) return 1;
  if (width < 768) return Math.min(2, itemsToShow);
  if (width < 1024) return Math.max(1, Math.floor(itemsToShow * 0.5));
  if (width < 1280) return Math.max(1, Math.floor(itemsToShow * 0.75));
  return itemsToShow;
}

export default function BannerSlider({
  items,
  itemsToShow = 1,
  aspectRatio = "16/9",
}: BannerSliderProps) {
  const isMultiple = itemsToShow > 1;
  const initialSlides = useMemo(
    () => getInitialSlides(itemsToShow),
    [itemsToShow],
  );
  const getResponsiveCount = (ratio: number) =>
    Math.max(1, Math.floor(itemsToShow * ratio));

  const responsiveSettings = isMultiple
    ? [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: getResponsiveCount(0.75),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: getResponsiveCount(0.5),
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(2, itemsToShow),
            slidesToScroll: 1,
          },
        },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ]
    : undefined;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={isMultiple ? "-mx-1" : ""}>
      <Carousel
        arrows
        autoplay
        speed={1000}
        slidesToShow={initialSlides}
        slidesToScroll={1}
        infinite
        dots={false}
        responsive={responsiveSettings}
      >
        {items.map((banner: any) => (
          <div key={banner?.id} className={isMultiple ? "px-1" : ""}>
            <div className="w-full overflow-hidden" style={{ aspectRatio }}>
              <img
                loading="lazy"
                src={getImageUrl(banner?.url)}
                alt={`Banner ${banner?.id}`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
