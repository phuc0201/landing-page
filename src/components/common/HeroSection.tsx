interface HeroSectionProps {
  title: string;
  content: string;
  imgUrl: string;
  actions?: React.ReactNode;
}

export default function HeroSection({ title, content, imgUrl, actions }: HeroSectionProps) {
  return (
    <section className="relative w-full h-[60vh] md:h-200 lg:h-230 overflow-hidden">
      <img src={imgUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-6xl leading-tight font-bold text-white mb-4 md:mb-6">
            {title}
          </h1>

          <p className="text-[10px] md:text-lg lg:text-xl text-white/90 text-balance mb-4 md:mb-6">
            {content}
          </p>

          <div className="w-16 h-1 bg-[#78070e] mx-auto" />

          {actions && <div className="mt-6 flex flex-wrap justify-center gap-4">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
