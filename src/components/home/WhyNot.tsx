import { useEffect, useRef, useState } from "react";
import type { SiteConfigItem } from "../../types/siteConfig.type";

export default function WhyNot({ reasons }: { reasons: SiteConfigItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setVisibleItems(new Array(reasons.length).fill(false));

    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 120);
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <section className="max-w-5xl mx-auto py-16 md:py-20 px-4">
      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">
          Tại sao chọn chúng tôi
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Chúng tôi không chỉ <em className="italic text-gray-400 font-bold">cung cấp dịch vụ</em>
        </h2>
        <div className="w-10 h-px bg-gray-300 my-5" />
        <p className="text-sm font-light text-gray-500 leading-relaxed">
          Những lý do để bạn tự tin lựa chọn — từ chất lượng đến tận tâm.
        </p>
      </div>

      {/* Cards */}
      <div className="divide-y divide-gray-100">
        {reasons.map((reason, index) => (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative grid grid-cols-[72px_1fr] gap-0 py-8 cursor-default overflow-hidden transition-all duration-300"
            style={{
              opacity: visibleItems[index] ? 1 : 0,
              transform: visibleItems[index] ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            {/* Hover background */}
            <div
              className="absolute inset-0 bg-gray-50 transition-all duration-500 ease-out"
              style={{
                width: hoveredIndex === index ? "100%" : "0%",
              }}
            />

            {/* Number */}
            <div
              className="relative z-10 pt-1 font-bold leading-none select-none transition-colors duration-300"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "3rem",
                color: hoveredIndex === index ? "#9ca3af" : "#e5e7eb",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="relative z-10 pr-4">
              <h3 className="text-base font-medium text-gray-900 mb-2 tracking-tight">
                {reason.title}
              </h3>
              <p className="text-sm font-light text-gray-500 leading-relaxed max-w-lg">
                {reason.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
