import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

type DropdownItem = { label: string; href: string };
type NavItem = { label: string; href?: string; dropdown?: DropdownItem[] };

export default function HeaderNav({
  navItems,
  isDesktop,
  scrolled,
  isActive,
  openSubmenus,
  toggleSubmenu,
}: {
  navItems: NavItem[];
  isDesktop: boolean;
  scrolled: boolean;
  isActive: (href?: string) => boolean;
  openSubmenus: Record<string, boolean>;
  toggleSubmenu: (label: string) => void;
}) {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        if (item.dropdown) {
          if (isDesktop) {
            const menuItems: MenuProps["items"] = item.dropdown.map((d) => ({
              key: d.href,
              label: (
                <Link
                  to={d.href}
                  className={`text-sm ${isActive(d.href) ? "text-primary font-semibold" : "text-gray-700"} hover:text-primary transition-colors`}
                >
                  {d.label}
                </Link>
              ),
            }));

            const activeParent = item.dropdown.some((d) => isActive(d.href));

            return (
              <Dropdown
                key={item.label}
                menu={{ items: menuItems }}
                placement="bottomLeft"
                arrow={false}
                classNames="header-dropdown"
              >
                <div className={`relative`}>
                  <span
                    className={`group cursor-pointer px-3 py-2 text-[16px] font-medium transition-colors flex items-center gap-1 ${
                      activeParent
                        ? "text-primary font-semibold"
                        : scrolled
                          ? "text-gray-700"
                          : "text-gray-200"
                    }`}
                  >
                    {item.label}
                    <IoIosArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </span>
                </div>
              </Dropdown>
            );
          }

          return (
            <div key={item.label} className="relative">
              <button
                onClick={() => toggleSubmenu(item.label)}
                className={`px-3 py-2 text-[16px] font-medium transition-colors flex items-center gap-1 ${
                  openSubmenus[item.label] || item.dropdown.some((d) => isActive(d.href))
                    ? "text-primary font-semibold"
                    : scrolled
                      ? "text-gray-700"
                      : "text-gray-200"
                }`}
              >
                {item.label}
                <IoIosArrowDown
                  className={`h-4 w-4 transition-transform duration-200 ${openSubmenus[item.label] ? "rotate-180" : ""}`}
                />
              </button>

              {openSubmenus[item.label] && (
                <div className="absolute left-0 mt-2 bg-white shadow rounded z-50 w-48">
                  {item.dropdown.map((d) => (
                    <Link
                      key={d.href}
                      to={d.href}
                      className={`block px-4 py-2 text-sm ${isActive(d.href) ? "text-primary font-semibold" : "text-gray-700"}`}
                    >
                      {d.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            to={item.href || "#"}
            className={`px-3 py-2 text-[16px] font-medium transition-colors flex items-center gap-1 ${
              isActive(item.href)
                ? "text-primary font-semibold"
                : scrolled
                  ? "text-gray-700"
                  : "text-gray-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
