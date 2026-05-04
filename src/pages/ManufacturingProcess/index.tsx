import React, { useEffect, useRef } from "react";
import HeroSection from "../../components/common/HeroSection";
import { useSiteConfig } from "../../provider";
import { useGetManufacturingProcessQuery } from "../../services/manuService";
import type { SiteConfigItem } from "../../types/siteConfig.type";

const StepItem: React.FC<{ step: SiteConfigItem; reverse?: boolean }> = ({ step, reverse }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        grid md:grid-cols-2 gap-8 items-center py-12
        opacity-0 translate-y-8 transition-all duration-700 ease-out
        [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0
        ${reverse ? "md:[&>*:first-child]:order-2" : ""}
      `}
    >
      <div
        className={`
          w-full h-70 md:h-90 overflow-hidden rounded-2xl
          opacity-0 transition-all duration-700 ease-out delay-150
          ${reverse ? "-translate-x-6" : "translate-x-6"}
          in-[.animate-in]:opacity-100 in-[.animate-in]:translate-x-0
        `}
      >
        <img
          src={import.meta.env.VITE_BASE_URL + step.image?.url}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div
        className={`
          opacity-0 transition-all duration-700 ease-out delay-300
          ${reverse ? "translate-x-6" : "-translate-x-6"}
          in-[.animate-in]:opacity-100 in-[.animate-in]:translate-x-0
        `}
      >
        <div className="text-sm text-red-700 font-semibold mb-2">Bước {step.index}</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{step.content}</p>
      </div>
    </div>
  );
};

export default function ManufacturingProcess() {
  const { data: manuProcessData } = useGetManufacturingProcessQuery();
  const { siteConfig } = useSiteConfig();
  const manuProcessConfig = siteConfig?.heroSection?.["manuProcess"];

  return (
    <div>
      <HeroSection
        title={manuProcessConfig?.title || "Quy trình sản xuất"}
        imgUrl={
          manuProcessConfig?.image?.url
            ? import.meta.env.VITE_BASE_URL + manuProcessConfig.image.url
            : ""
        }
      />

      <div className="bg-[radial-gradient(circle_at_top,rgba(120,7,14,0.08),transparent_28%),linear-gradient(180deg,#fff_0%,#fffaf8_100%)]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{manuProcessData?.title}</h1>
            <p className="text-gray-600 leading-relaxed">{manuProcessData?.intro}</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-red-100" />

            {manuProcessData?.steps.map((step, index) => (
              <StepItem key={step.id} step={step} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
