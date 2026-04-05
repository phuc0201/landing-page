import BrandBg from "../../assets/images/brand-bg.jpg";

interface CompanyIntroProps {
  about?: {
    title: string;
    content: string;
  };
}

export default function CompanyIntro({ about }: CompanyIntroProps) {
  if (!about) {
    return null;
  }

  return (
    <section
      style={{
        backgroundImage: `url(${BrandBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="company-intro max-w-5xl mx-auto md:py-20 py-10">
        <div className="section-container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center text-(--primary-color)">
            {about.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            {about.content}
          </p>
        </div>
      </div>
    </section>
  );
}
