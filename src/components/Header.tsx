import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import LogoDefault from "../assets/images/logo_default.png";
import { useSiteConfig } from "../provider";
import { useGetCategoriesQuery } from "../services/categoryService";
import { useGetPoliciesQuery } from "../services/policyService";
import toSlug from "../utils/slugify";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categoryResult } = useGetCategoriesQuery({});
  const { data: policiesResult } = useGetPoliciesQuery({});

  const logoUrl = siteConfig?.icon?.mainLogo.url
    ? import.meta.env.VITE_BASE_URL + siteConfig.icon.mainLogo.url
    : null;

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
    { label: "Bài viết", href: "/bai-viet" },
    { label: "Liên hệ", href: "/lien-he" },
  ];

  return (
    <header
      ref={ref}
      className={`z-40 ${scrolled ? "bg-white shadow" : "bg-transparent"} transition-colors duration-300`}
    >
      <div className="section-container mx-auto px-4">
        <div
          className={`flex items-center justify-between ${scrolled ? "py-1" : "py-4"} transition-all duration-300`}
        >
          {/* Logo */}
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

          {/* Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                // Chuyển dropdown items sang format MenuProps của Ant Design
                const menuItems: MenuProps["items"] = item.dropdown.map((d) => ({
                  key: d.href,
                  label: (
                    <Link
                      to={d.href}
                      className="text-sm text-gray-700 hover:text-[#78070e] transition-colors"
                    >
                      {d.label}
                    </Link>
                  ),
                }));

                return (
                  <Dropdown
                    key={item.label}
                    menu={{ items: menuItems }}
                    placement="bottomLeft"
                    arrow={false}
                    classNames="header-dropdown"
                  >
                    <span
                      className={`group cursor-pointer px-3 py-2 text-[16px] font-medium hover:text-[#78070e] transition-colors flex items-center gap-1 ${
                        scrolled ? "text-gray-700" : "text-gray-200"
                      }`}
                    >
                      {item.label}
                      <IoIosArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </span>
                  </Dropdown>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href || "#"}
                  className={`px-3 py-2 text-[16px] font-medium hover:text-[#78070e] transition-colors flex items-center gap-1 ${
                    scrolled ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:flex items-center bg-gray-100 rounded-full px-5 py-3">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700 w-56 placeholder-gray-500"
              />
              <button className="text-gray-500 hover:text-[#78070e] transition-colors">
                <CiSearch className="h-4 w-4" />
              </button>
            </div>
            <button className="hidden sm:flex w-11 h-11 rounded-full bg-[#78070e] text-white items-center justify-center hover:bg-[#5a0509] transition-colors text-lg">
              <GoHeart />
            </button>

            {/* Mobile Menu Button */}
            <button className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className={`h-6 w-6 ${scrolled ? "text-gray-700" : "text-gray-300"}`}
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
    </header>
  );
}
