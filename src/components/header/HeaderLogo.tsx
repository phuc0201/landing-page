import { Link } from "react-router-dom";
import LogoDefault from "../../assets/images/logo_default.png";

export default function HeaderLogo({
  logoUrl,
  scrolled,
}: {
  logoUrl: string | null | undefined;
  scrolled: boolean;
}) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div
        className={`lg:h-24 md:h-18 h-14 w-auto lg:min-w-26.5 md:min-w-20 transition-transform duration-300 origin-left ${
          scrolled ? "scale-[0.6]" : "scale-100"
        }`}
        style={{ aspectRatio: "auto" }}
      >
        <img
          src={logoUrl ?? LogoDefault}
          alt="Medi Biotech"
          className="h-full w-auto object-contain transition-opacity duration-300"
          decoding="async"
        />
      </div>
    </Link>
  );
}
