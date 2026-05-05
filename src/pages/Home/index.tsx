import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import BannerSliderSkeleton from "../../components/common/BannerSliderSkeleton";
import HeroSection from "../../components/common/HeroSection";
import Map from "../../components/common/Map";
import CompanyIntro from "../../components/home/CompanyIntro";
import { useSiteConfig } from "../../provider";
import { useGetAboutQuery } from "../../services/aboutService";
import { useGetPopularProductsQuery } from "../../services/productService";
import getImageUrl from "../../utils/getImageUrl";

const BlogCarousel = lazy(() => import("../../components/blog/BlogCarousel"));
const BannerSlider = lazy(() => import("../../components/common/BannerSlider"));
const ContactForm = lazy(() => import("../../components/contact/ContactForm"));
const WhyNot = lazy(() => import("../../components/home/WhyNot"));
const PopularProduct = lazy(() => import("../../components/product/PopularProduct"));

function SectionFallback() {
  return <div className="w-full h-40 animate-pulse bg-gray-100 rounded">Loading.......</div>;
}

export default function Home() {
  const { siteConfig } = useSiteConfig();
  console.log("🚀 ~ Home ~ siteConfig:", siteConfig);
  const { data: aboutResult } = useGetAboutQuery();
  const { data: popularProducts } = useGetPopularProductsQuery();

  const homeSectionConfig = siteConfig?.heroSection?.["home"];
  const whyNotConfig = siteConfig?.whyNot || [];
  const bannersConfig = siteConfig?.bannerHome || [];
  const contactInfor = siteConfig?.contactInfor;

  return (
    <div className="flex flex-col">
      <HeroSection
        title={homeSectionConfig?.title || "Chào mừng đến với MediBiotech"}
        content="Khám phá các sản phẩm và dịch vụ tuyệt vời của chúng tôi."
        imgUrl={homeSectionConfig?.image?.url ? getImageUrl(homeSectionConfig.image.url) : ""}
        actions={
          <Link
            to="/contact"
            className="inline-block lg:px-20 px-10 py-3 bg-(--primary-color) text-white md:text-lg text-xs font-medium rounded-full hover:bg-[#a50b0b] hover:text-white transition-colors"
          >
            Khám phá ngay
          </Link>
        }
      />

      <CompanyIntro
        about={{
          title: "Về chúng tôi",
          content:
            aboutResult?.intro ||
            "Chúng tôi là công ty hàng đầu trong lĩnh vực dược phẩm sinh học.",
        }}
      />

      <Suspense fallback={<BannerSliderSkeleton itemsToShow={1} />}>
        <BannerSlider items={bannersConfig.length > 0 ? bannersConfig : []} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PopularProduct products={popularProducts} />
      </Suspense>

      <Suspense fallback={<BannerSliderSkeleton itemsToShow={3} />}>
        <BlogCarousel />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyNot reasons={whyNotConfig} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <div className="grid xl:grid-cols-2">
          <Map
            latitude={contactInfor?.lat || undefined}
            longitude={contactInfor?.lng || undefined}
          />
          <ContactForm />
        </div>
      </Suspense>
    </div>
  );
}
