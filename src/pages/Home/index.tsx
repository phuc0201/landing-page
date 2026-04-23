import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import BannerDefault from "../../assets/banners/banner2.webp";
import BannerSliderSkeleton from "../../components/common/BannerSliderSkeleton";
import HeroSection from "../../components/common/HeroSection";
import CompanyIntro from "../../components/home/CompanyIntro";

const BlogCarousel = lazy(() => import("../../components/blog/BlogCarousel"));
const BannerSlider = lazy(() => import("../../components/common/BannerSlider"));
const ContactForm = lazy(() => import("../../components/contact/ContactForm"));
const WhyNot = lazy(() => import("../../components/home/WhyNot"));
const PopularProduct = lazy(() => import("../../components/product/PopularProduct"));

const banners = [
  { id: 1, imgUrl: BannerDefault },
  { id: 2, imgUrl: BannerDefault },
  { id: 3, imgUrl: BannerDefault },
  { id: 4, imgUrl: BannerDefault },
  { id: 5, imgUrl: BannerDefault },
  { id: 6, imgUrl: BannerDefault },
];

function SectionFallback() {
  return <div className="w-full h-40 animate-pulse bg-gray-100 rounded">Loading.......</div>;
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Đông Trùng Hạ Thảo Tinh Hoa Cho Sức Khỏe"
        content="Khám phá các sản phẩm và dịch vụ tuyệt vời của chúng tôi."
        imgUrl="https://solsticemed.com/cdn/shop/files/home-hero-1_1857x914_crop_center.jpg?v=1641528783"
        actions={
          <Link
            to="/contact"
            className="inline-block lg:px-20 px-10 py-3 bg-[#78070e] text-white md:text-lg text-xs font-medium rounded-full hover:bg-[#a50b0b] hover:text-white transition-colors"
          >
            Khám phá ngay
          </Link>
        }
      />

      <CompanyIntro
        about={{
          title: "Về chúng tôi",
          content: `MediBiotech là thương hiệu của CÔNG TY CỔ PHẦN DƯỢC THẢO VIỆT NAM. Chúng tôi ra đời trong bối cảnh ngành DƯỢC LIỆU nước nhà đứng trước sự phát triển ồ ạt của các loại dược liệu và thực phẩm bẩn, thực phẩm nhái, hàng giả, kém chất lượngảnh hưởng đến sức khỏe người tiêu dùng. Với tiêu chí "Vì sức khỏe cộng đồng" chúng tôi luôn không ngừng nghiên cứu, nâng cao chất lượng sản phẩm nhằm mang đến cho người tiêu dùng sử dụng các sản phẩm an toàn cho sức khỏe.`,
        }}
      />

      <Suspense fallback={<BannerSliderSkeleton itemsToShow={1} />}>
        <BannerSlider items={banners} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PopularProduct />
      </Suspense>

      <Suspense fallback={<BannerSliderSkeleton itemsToShow={3} />}>
        <BlogCarousel />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyNot />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
