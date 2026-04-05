import React from "react";
import { Link } from "react-router-dom";
import LogoDefault from "../assets/images/logo_default.png";
const products = [
  { name: "New Arrivals", href: "#" },
  { name: "Best Sellers", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Support", href: "#" },
];

const posts = [
  { title: "How we build quality", href: "#" },
  { title: "Sustainable materials", href: "#" },
  { title: "Factory tour", href: "#" },
];

const policies = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms of Service", href: "#" },
  { name: "Return Policy", href: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-700 border-t-2 border-gray-100" role="contentinfo">
      <div className="section-container mx-auto lg:py-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-13 gap-8">
          {/* Company */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center mb-10" aria-label="Homepage">
              <img src={LogoDefault} alt="" className="w-30 mx-auto" />
            </Link>

            <div className="mt-4 text-center md:text-left text-sm text-gray-500">
              <p className="font-medium text-gray-700 text-lg">
                CÔNG TY TNHH NẤM DƯỢC LIỆU MEDIBIOTECH VIỆT NAM
              </p>
              <p className="mt-1">123 Industrial Rd, District 1, Ho Chi Minh City</p>
              <p className="mt-1">
                <a href="tel:+84123456789" className="hover:text-gray-700">
                  +84 123 456 789
                </a>
              </p>
              <p>
                <a href="mailto:info@nodtech.com" className="hover:text-gray-700">
                  info@nodtech.com
                </a>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center md:justify-start space-x-3">
              <Link
                to="#"
                className="p-2 rounded-md focus:outline-none"
                aria-label="Follow us on Twitter"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 5.92c-.63.28-1.3.47-2 .55a3.48 3.48 0 0 0 1.53-1.92 6.93 6.93 0 0 1-2.21.85 3.46 3.46 0 0 0-5.9 3.15A9.82 9.82 0 0 1 3.16 4.6a3.46 3.46 0 0 0 1.07 4.62 3.4 3.4 0 0 1-1.57-.43v.04a3.46 3.46 0 0 0 2.78 3.39c-.48.13-.98.16-1.49.06a3.47 3.47 0 0 0 3.24 2.4A6.94 6.94 0 0 1 2 18.58a9.8 9.8 0 0 0 5.3 1.56c6.36 0 9.85-5.27 9.85-9.85v-.45A7.05 7.05 0 0 0 22 5.92z" />
                </svg>
              </Link>

              <Link to="#" aria-label="Follow us on Facebook">
                <span className="sr-only">Facebook</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.92v-7.02H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.61 3.5-3.61.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.71h2.5l-.4 2.9h-2.1v7.02C18.34 21.2 22 17.06 22 12.07z" />
                </svg>
              </Link>

              <Link to="#" aria-label="Follow us on LinkedIn">
                <span className="sr-only">LinkedIn</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86v5.49H9.42V9h3.42v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55v6.69zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            <h3 className="text-center md:text-left text-lg font-semibold text-gray-700 mb-4">
              Products
            </h3>
            <ul className="space-y-2">
              {products.map((p) => (
                <li key={p.name} className="text-center md:text-left">
                  <Link to={p.href} className="text-gray-500 text-sm focus:outline-none ">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular posts */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
              Popular posts
            </h3>
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.title} className="text-center md:text-left">
                  <Link to={post.href} className="text-gray-500 text-sm focus:outline-none ">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
              Policies
            </h3>
            <ul className="space-y-2">
              {policies.map((pol) => (
                <li key={pol.name} className="text-center md:text-left">
                  <Link to={pol.href} className="text-gray-500 text-sm focus:outline-none ">
                    {pol.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-center py-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} NodTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
