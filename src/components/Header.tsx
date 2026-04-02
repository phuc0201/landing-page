import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
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
      { label: "Category 1", href: "/products/category1" },
      { label: "Category 2", href: "/products/category2" },
      { label: "Category 3", href: "/products/category3" },
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

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleDropdownHover = () => {};

  const handleDropdownLeave = () => {};

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`flex items-center justify-between ${scrolled ? "py-1" : "py-4"} transition-all duration-300`}
        >
          {/* Logo */}
          <div>
            <img
              src={LogoDefault}
              alt="Medi Biotech"
              className={`lg:h-24 md:h-18 h-14 w-auto transition-transform duration-300 origin-left ${
                scrolled ? "scale-[0.7]" : "scale-100"
              }`}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.dropdown}
                onMouseLeave={handleDropdownLeave}
              >
                {/* Nav Item */}
                <Link
                  to={item.href || "#"}
                  className="group px-3 py-2 text-[16px] font-medium text-gray-700 hover:text-[#78070e] transition-colors flex items-center gap-1"
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

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg
                className="h-6 w-6 text-gray-700"
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
