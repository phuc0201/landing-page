import React from "react";
import HeroSection from "../../components/common/HeroSection";
import { useSiteConfig } from "../../provider";

type Image = {
  url: string;
  alt?: string | null;
};

type Step = {
  id: string;
  title: string;
  content: string;
  index: number;
  image?: Image;
};

type Data = {
  title: string;
  intro: string;
  steps: Step[];
};

const data: Data = {
  title: "Quy trình sản xuất",
  intro:
    "MEDI BIOTECH Việt Nam cam kết mang đến Đông trùng hạ thảo đạt chuẩn khoa học, góp phần nâng cao giá trị nấm dược liệu Việt Nam và phục vụ sức khỏe cộng đồng.",
  steps: [
    {
      id: "1",
      title: "Tuyển chọn & nhân giống chủng nấm",
      content:
        "Quy trình sản xuất bắt đầu từ việc tuyển chọn chủng Cordyceps militaris thuần khiết...",
      index: 1,
      image: {
        url: "/public/manu-process/0fd7ee4a-028e-4db3-936a-074f382031be/ea731a29-cbff-4a58-b67b-afa288e90c4d",
      },
    },
    {
      id: "2",
      title: "Chuẩn bị giá thể nuôi trồng",
      content: "Giá thể được phối trộn từ các thành phần tự nhiên như gạo lứt...",
      index: 2,
      image: {
        url: "/public/manu-process/0fd7ee4a-028e-4db3-936a-074f382031be/ea731a29-cbff-4a58-b67b-afa288e90c4d",
      },
    },
  ],
};

const StepItem: React.FC<{ step: Step; reverse?: boolean }> = ({ step, reverse }) => {
  return (
    <div
      className={`grid md:grid-cols-2 gap-8 items-center py-12 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="w-full h-70 md:h-90 overflow-hidden rounded-2xl">
        <img
          src={import.meta.env.VITE_BASE_URL + step.image?.url}
          alt={step.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </div>

      <div>
        <div className="text-sm text-red-700 font-semibold mb-2">Bước {step.index}</div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{step.content}</p>
      </div>
    </div>
  );
};

export default function ManufacturingProcess() {
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
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{data.title}</h1>
            <p className="text-gray-600 leading-relaxed">{data.intro}</p>
          </div>

          {/* Steps */}
          <div>
            {data.steps.map((step, index) => (
              <StepItem key={step.id} step={step} reverse={index % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
