import { Drawer } from "antd";
import { GoHeart } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import HeaderSearchDropdown from "../search/HeaderSearchDropdown";

type DropdownItem = { label: string; href: string };
type NavItem = { label: string; href?: string; dropdown?: DropdownItem[] };

export default function HeaderMobileDrawer({
  open,
  onClose,
  logoUrl,
  searchQuery,
  setSearchQuery,
  navItems,
  isActive,
  mobileSubmenus,
  toggleMobileSubmenu,
}: {
  open: boolean;
  onClose: () => void;
  logoUrl?: string | null;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  navItems: NavItem[];
  isActive: (href?: string) => boolean;
  mobileSubmenus: Record<string, boolean>;
  toggleMobileSubmenu: (label: string) => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} placement="right">
      <div className="">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/" onClick={onClose}>
            <img src={logoUrl ?? ""} alt="Medi Biotech" className="h-16 object-contain" />
          </Link>
          <Link
            to="/yeu-thich"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-white!"
          >
            <GoHeart />
            <span>Yêu thích</span>
          </Link>
        </div>

        <div className="mb-4">
          <HeaderSearchDropdown
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClose={onClose}
          />
        </div>

        <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleMobileSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-2 py-3 text-base font-medium text-gray-700!"
                  >
                    <span>{item.label}</span>
                    <IoIosArrowDown
                      className={`h-5 w-5 transition-transform ${mobileSubmenus[item.label] ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileSubmenus[item.label] && (
                    <div className="pl-4">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.href}
                          to={d.href}
                          onClick={onClose}
                          className={`block px-2 py-2 text-sm ${isActive(d.href) ? "text-primary font-semibold" : "text-gray-600!"}`}
                        >
                          {d.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href || "#"}
                  onClick={onClose}
                  className={`block px-2 py-3 text-base font-medium ${isActive(item.href) ? "text-primary font-semibold" : "text-gray-700!"}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </Drawer>
  );
}
