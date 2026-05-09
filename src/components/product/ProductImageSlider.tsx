import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteConfigImage } from "../../types/siteConfig.type";
import getImageUrl from "../../utils/getImageUrl";

interface ProductImageSliderProps {
  images: SiteConfigImage[];
  badge?: string;
}

type SlideDirection = "left" | "right" | null;

const SLIDE_STYLE = `
  @keyframes slideInLeft   { from { transform: translateX(100%);  opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideInRight  { from { transform: translateX(-100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOutLeft  { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100%); opacity: 0; } }
  @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%);  opacity: 0; } }
  .slide-in-left   { animation: slideInLeft   0.28s cubic-bezier(.4,0,.2,1) forwards; }
  .slide-in-right  { animation: slideInRight  0.28s cubic-bezier(.4,0,.2,1) forwards; }
  .slide-out-left  { animation: slideOutLeft  0.28s cubic-bezier(.4,0,.2,1) forwards; }
  .slide-out-right { animation: slideOutRight 0.28s cubic-bezier(.4,0,.2,1) forwards; }
`;

let styleInjected = false;
function injectSlideStyle() {
  if (styleInjected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = SLIDE_STYLE;
  document.head.appendChild(el);
  styleInjected = true;
}

export default function ProductImageSlider({ images, badge }: ProductImageSliderProps) {
  injectSlideStyle();

  const [current, setCurrent] = useState(0);
  // outgoing holds the index of the image sliding out; null when idle
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [direction, setDirection] = useState<SlideDirection>(null);
  const isAnimating = useRef(false);
  const thumbListRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  useEffect(() => {
    if (!images.length || !images[0]?.url) return;
    setCurrent(0);
    setOutgoing(null);
    setDirection(null);
    isAnimating.current = false;
  }, [images]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current || isAnimating.current || !images.length) return;
      isAnimating.current = true;

      const dir: SlideDirection = idx > current ? "left" : "right";
      setOutgoing(current);
      setDirection(dir);
      setCurrent(idx);

      thumbListRef.current
        ?.querySelectorAll(".thumb-item")
        [idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

      // Clear outgoing state after animation duration (280ms + small buffer)
      setTimeout(() => {
        setOutgoing(null);
        setDirection(null);
        isAnimating.current = false;
      }, 300);
    },
    [current, images],
  );

  const goPrev = () => goTo((current - 1 + images.length) % images.length);
  const goNext = () => goTo((current + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev();
  };

  // Render nothing until images are available
  if (!images.length || !images[0]?.url) return null;

  const inClass = direction === "left" ? "slide-in-left" : "slide-in-right";
  const outClass = direction === "left" ? "slide-out-left" : "slide-out-right";

  return (
    <div className="w-full select-none">
      {/* Main image */}
      <div
        className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-200 cursor-zoom-in"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-(--primary-color) text-white text-[11px] font-medium px-2 py-0.5 rounded">
            {badge}
          </span>
        )}

        {/* Outgoing image — animates out while current slides in */}
        {outgoing !== null && direction && (
          <img
            key={`out-${outgoing}`}
            src={getImageUrl(images[outgoing]?.url) ?? ""}
            alt={`Product Image ${outgoing + 1}`}
            className={`absolute inset-0 w-full h-full object-cover ${outClass}`}
          />
        )}

        {/* Current image — animates in; no class on initial render */}
        <img
          key={`in-${current}`}
          src={getImageUrl(images[current]?.url) ?? ""}
          alt={`Product Image ${current + 1}`}
          className={`absolute inset-0 w-full h-full object-cover ${direction ? inClass : ""}`}
        />

        {/* Prev / Next buttons */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-md transition-all"
        >
          <LeftOutlined style={{ fontSize: 12 }} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-md transition-all"
        >
          <RightOutlined style={{ fontSize: 12 }} />
        </button>
      </div>

      {/* Thumbnail list */}
      <div
        ref={thumbListRef}
        className="flex gap-2 mt-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300"
      >
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`thumb-item flex-none w-17 h-17 rounded-md overflow-hidden border-2 transition-all duration-200
              ${
                i === current
                  ? "border-(--primary-color) shadow-[0_0_0_1px_#EE4D2D33] -translate-y-px"
                  : "border-transparent hover:border-gray-400 hover:-translate-y-px"
              }
            `}
          >
            <img
              src={getImageUrl(img.url) ?? ""}
              alt={`Product Image ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
