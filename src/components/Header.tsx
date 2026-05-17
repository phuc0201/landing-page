import { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import LogoDefault from "../assets/images/logo_default.png";
import { useSiteConfig, useWishlist, useHeroSection } from "../provider";
import { useGetCategoriesQuery } from "../services/categoryService";
import { useGetPoliciesQuery } from "../services/policyService";
import getImageUrl from "../utils/getImageUrl";
import toSlug from "../utils/slugify";
import HeaderLogo from "./header/HeaderLogo";
import HeaderMobileDrawer from "./header/HeaderMobileDrawer";
import HeaderNav from "./header/HeaderNav";
import HeaderSearchDropdown from "./search/HeaderSearchDropdown";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export default function Header({
  scrolled = true,
  ref,
}: {
  scrolled?: boolean;
  ref: React.Ref<HTMLDivElement>;
}) {
  const { siteConfig } = useSiteConfig();
  const { items: wishlistItems } = useWishlist();
  const { hasHeroTitle } = useHeroSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [mobileSubmenus, setMobileSubmenus] = useState<Record<string, boolean>>(
    {},
  );
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categoryResult } = useGetCategoriesQuery({});
  const { data: policiesResult } = useGetPoliciesQuery({});

  const mainLogoUrl = siteConfig?.icon?.mainLogo?.url
    ? getImageUrl(siteConfig.icon.mainLogo.url)
    : null;
  const subLogoUrl = siteConfig?.icon?.subLogo?.url
    ? getImageUrl(siteConfig.icon.subLogo.url)
    : null;
  const logoUrl = isDesktop ? mainLogoUrl : subLogoUrl || mainLogoUrl;

  const navItems: NavItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    {
      label: "Sản phẩm",
      dropdown:
        (categoryResult?.data || []).map((cat) => ({
          label: cat.name,
          href: `/san-pham?danh-muc=${toSlug(cat.name) + "-" + cat.id}`,
        })) || [],
    },
    { label: "Quy trình", href: "/quy-trinh-san-xuat" },
    {
      label: "Chính sách",
      dropdown: (policiesResult?.data || []).map((policy) => ({
        label: policy.title,
        href: `/chinh-sach/${toSlug(policy.title) + "-" + policy.id}`,
      })),
    },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return location.pathname === "/";
    const cur = location.pathname + location.search;
    return cur === href || cur.startsWith(href);
  };

  const toggleSubmenu = (label: string) =>
    setOpenSubmenus((s) => ({ ...s, [label]: !s[label] }));
  const toggleMobileSubmenu = (label: string) =>
    setMobileSubmenus((s) => ({ ...s, [label]: !s[label] }));

  return (
    <header
      ref={ref}
      className={`z-40 ${scrolled || !hasHeroTitle ? "bg-white shadow" : "bg-transparent"} transition-colors duration-300`}
    >
      <div className="section-container mx-auto px-4">
        <div
          className={`flex items-center justify-between ${scrolled || !hasHeroTitle ? "py-1" : "py-4"} transition-all duration-300`}
        >
          {/* Logo */}
          <HeaderLogo logoUrl={logoUrl} scrolled={scrolled || !hasHeroTitle} />

          {/* Navigation */}
          <HeaderNav
            navItems={navItems}
            isDesktop={isDesktop}
            scrolled={scrolled || !hasHeroTitle}
            isActive={isActive}
            openSubmenus={openSubmenus}
            toggleSubmenu={toggleSubmenu}
          />

          {/* Search Box + Wishlist + Mobile Button */}
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block w-72">
              <HeaderSearchDropdown
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <button className="header-wishlist hidden sm:flex w-11 h-11 rounded-full bg-primary text-white items-center justify-center hover:bg-[#5a0509] transition-colors text-lg relative">
              <Link
                to="/yeu-thich"
                className="flex items-center justify-center w-full h-full"
              >
                <GoHeart />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg
                className={`h-6 w-6 group-hover:text-gray-700 ${scrolled || !hasHeroTitle ? "text-gray-700" : "text-gray-300"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer - truyền HeaderSearchDropdown vào nếu cần */}
      <HeaderMobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        logoUrl={logoUrl ?? LogoDefault}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        navItems={navItems}
        isActive={isActive}
        mobileSubmenus={mobileSubmenus}
        toggleMobileSubmenu={toggleMobileSubmenu}
      />
    </header>
  );
}
