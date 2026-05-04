import BannerDefault from "../../assets/banners/banner2.webp";
import HeroSection from "../../components/common/HeroSection";
import { useSiteConfig } from "../../provider";
import { useGetAboutQuery } from "../../services/aboutService";
import getImageUrl from "../../utils/getImageUrl";

type CoreValueItem = {
  title: string;
  index: number;
};

export default function About() {
  const { data: aboutData } = useGetAboutQuery();
  const { siteConfig } = useSiteConfig();

  const heroConfig = siteConfig?.heroSection?.["about"];
  const coreValues: CoreValueItem[] =
    aboutData?.coreValue?.map((item, index) => ({
      title: item.title,
      index: item.index ?? index + 1,
    })) ??
    aboutData?.core_values?.map((title, index) => ({
      title,
      index: index + 1,
    })) ??
    [];

  const sectionCards = [
    {
      label: "Tầm nhìn",
      title: "Định vị thương hiệu công nghệ cao",
      content:
        aboutData?.vision ||
        "MEDI BIOTECH Việt Nam hướng tới trở thành đơn vị hàng đầu trong lĩnh vực nghiên cứu, nuôi trồng và sản xuất nấm dược liệu công nghệ cao tại Việt Nam, từng bước khẳng định thương hiệu trên thị trường trong nước và quốc tế.",
      accent: "from-rose-50 via-white to-amber-50",
    },
    {
      label: "Sứ mệnh",
      title: "Tạo ra giá trị sức khỏe bền vững",
      content:
        aboutData?.mission ||
        "Ứng dụng công nghệ sinh học hiện đại để phát triển nấm dược liệu chất lượng cao. Mang đến các sản phẩm an toàn – hiệu quả – có giá trị sức khỏe bền vững. Góp phần nâng tầm giá trị nấm dược liệu Việt, phục vụ chăm sóc sức khỏe cộng đồng.",
      accent: "from-amber-50 via-white to-rose-50",
    },
  ];

  return (
    <div className="bg-[radial-gradient(circle at top,rgba(120,7,14,0.08),transparent 28%),linear-gradient(180deg,#fff 0%,#fffaf8 100%)]">
      <HeroSection
        title={heroConfig?.title || "Giới thiệu về MediBiotech"}
        imgUrl={heroConfig?.image?.url ? getImageUrl(heroConfig.image.url) : BannerDefault}
      />

      <section className="section-container py-14 md:py-20">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-14">
          <div className="grid gap-6 items-stretch">
            <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-[0_20px_60px_rgba(120,7,14,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#78070e] mb-3">
                Giới thiệu
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
                MEDI BIOTECH Việt Nam phát triển nấm dược liệu bằng nền tảng công nghệ sinh học
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-8 md:leading-9">
                {aboutData?.intro ||
                  "MEDI BIOTECH Việt Nam là đơn vị chuyên nghiên cứu, nuôi trồng và phát triển nấm dược liệu ứng dụng công nghệ sinh học hiện đại, tiêu biểu là Đông trùng hạ thảo và nấm linh chi. Chúng tôi cam kết mang đến những sản phẩm an toàn – chất lượng – giá trị cao, góp phần nâng cao sức khỏe cộng đồng và phát triển bền vững ngành nấm dược liệu Việt Nam."}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {sectionCards.map((card) => (
              <article
                key={card.label}
                className={`rounded-3xl border border-white/80 bg-linear-to-br ${card.accent} p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#78070e] mb-3">
                  {card.label}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{card.title}</h3>
                <p className="text-sm md:text-base leading-8 text-gray-600">{card.content}</p>
              </article>
            ))}
          </div>

          <section className="rounded-32 border border-white/80 bg-white/90 p-6 md:p-8 shadow-[0_20px_60px_rgba(120,7,14,0.06)]">
            <div className="flex flex-col gap-3 md:gap-4 mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#78070e]">
                Giá trị cốt lõi
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                Các nguyên tắc định hướng toàn bộ hoạt động
              </h3>
              <p className="max-w-3xl text-sm md:text-base leading-7 text-gray-600">
                Những giá trị này tạo nên bản sắc vận hành, từ nghiên cứu đến nuôi trồng và chăm sóc
                khách hàng.
              </p>
            </div>

            <div className="grid gap-4 md:gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {coreValues.length > 0 ? (
                coreValues.map((value) => (
                  <div
                    key={`${value.index}-${value.title}`}
                    className="group rounded-2xl border border-gray-100 bg-[#fffaf8] p-5 md:p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(120,7,14,0.08)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#78070e] text-lg font-bold text-white">
                      {String(value.index).padStart(2, "0")}
                    </div>
                    <p className="text-sm md:text-base font-medium leading-7 text-gray-700">
                      {value.title}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-sm text-gray-500">
                  Chưa có dữ liệu giá trị cốt lõi.
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
