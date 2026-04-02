import { Link } from "react-router-dom";
import HeroSection from "../../components/common/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection
        title="Đông Trùng Hạ Thảo Tinh Hoa Cho Sức Khỏe"
        content="Khám phá các sản phẩm và dịch vụ tuyệt vời của chúng tôi."
        imgUrl="https://solsticemed.com/cdn/shop/files/home-hero-1_1857x914_crop_center.jpg?v=1641528783"
        actions={
          <Link
            to="/contact"
            className="inline-block px-20 py-3 bg-[#78070e] text-white md:text-xl text-xs font-medium rounded-full hover:bg-[#a50b0b] transition-colors"
          >
            Mua ngay
          </Link>
        }
      />
    </div>
  );
}
