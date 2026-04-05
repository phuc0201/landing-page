import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import LogoDefault from "../assets/images/logo_default.png";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  {
    label: "Sản phẩm",
    dropdown: [
      { label: "Category 1", href: "/products" },
      { label: "Category 2", href: "/products" },
      { label: "Category 3", href: "/products" },
    ],
  },
  { label: "Quy trình", href: "/process" },
  {
    label: "Chính sách",
    dropdown: [
      { label: "Chính sách bảo mật", href: "/policy/privacy" },
      { label: "Điều khoản dịch vụ", href: "/policy/terms" },
      { label: "Chính sách hoàn trả", href: "/policy/refund" },
    ],
  },
  { label: "Liên hệ", href: "/contact" },
];

export default function Header({
  scrolled = true,
  ref,
}: {
  scrolled?: boolean;
  ref: React.Ref<HTMLDivElement>;
}) {
  const [searchQuery, setSearchQuery] = useState("");

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
            <img
              src={LogoDefault}
              alt="Medi Biotech"
              className={`lg:h-24 md:h-18 h-14 w-auto transition-transform duration-300 origin-left object-contain ${
                scrolled ? "scale-[0.6]" : "scale-100"
              }`}
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group" onMouseEnter={() => item.dropdown}>
                {/* Nav Item */}
                <Link
                  to={item.href || "#"}
                  className={`group px-3 py-2 text-[16px] font-medium hover:text-[#78070e] transition-colors flex items-center gap-1 ${scrolled ? "text-gray-700" : "text-gray-200"}`}
                >
                  {item.label}
                  {item.dropdown && (
                    <IoIosArrowDown className="h-4 w-4 group-hover:rotate-180 transition-all duration-200" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#78070e] transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className={`h-6 w-6  ${scrolled ? "text-gray-700" : "text-gray-300"}`}
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
