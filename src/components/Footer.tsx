import React from "react";
import { Link } from "react-router-dom";
import LogoDefault from "../assets/images/logo_default.png";
import { useSiteConfig } from "../provider";
import { useGetPoliciesQuery } from "../services/policyService";
import { useGetPopularProductsQuery } from "../services/productService";
import getImageUrl from "../utils/getImageUrl";
import toSlug from "../utils/slugify";

const Footer: React.FC = () => {
  const { data: popularProducts, isLoading: loadingProducts } = useGetPopularProductsQuery();
  const { data: policiesData } = useGetPoliciesQuery({});
  const { siteConfig } = useSiteConfig();

  const contactIcon = siteConfig?.contact;
  const contact = siteConfig?.contactInfor;
  const logoUrl = siteConfig?.icon?.mainLogo?.url
    ? getImageUrl(siteConfig.icon.mainLogo.url)
    : LogoDefault;

  const products = (popularProducts || []).slice(0, 6);

  return (
    <footer className="text-gray-700 border-t-2 border-gray-100" role="contentinfo">
      <div className="section-container mx-auto lg:py-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-13 gap-8">
          {/* Company */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center mb-6" aria-label="Homepage">
              <img src={logoUrl} alt="" className="w-30 mx-auto" />
            </Link>

            <div className="mt-4 text-center md:text-left text-sm text-gray-500">
              <p className="font-medium text-gray-700 text-lg">{contact?.name || "MediBiotech"}</p>
              {contact?.address ? <p className="mt-1">{contact.address}</p> : null}
              {contact?.phoneNumber ? (
                <p className="mt-1">
                  <a href={`tel:${contact.phoneNumber}`} className="hover:text-gray-700">
                    {contact.phoneNumber}
                  </a>
                </p>
              ) : null}
              {contact?.email ? (
                <p>
                  <a href={`mailto:${contact.email}`} className="hover:text-gray-700">
                    {contact.email}
                  </a>
                </p>
              ) : null}
            </div>
          </div>

          {/* Popular products */}
          <div className="md:col-span-3">
            <h3 className="text-center md:text-left text-lg font-semibold text-gray-700 mb-4">
              Sản phẩm phổ biến
            </h3>
            <ul className="space-y-2">
              {loadingProducts
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="text-center md:text-left text-gray-400 text-sm">
                      <span className="block h-3 w-32 bg-gray-200 rounded animate-pulse mx-auto md:mx-0" />
                    </li>
                  ))
                : products.map((p) => (
                    <li key={p.id} className="text-center md:text-left">
                      <Link
                        to={`/san-pham/${toSlug(p.name)}-${p.id}`}
                        className="text-gray-500 text-sm focus:outline-none "
                      >
                        {p.name}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
              Chính sách
            </h3>
            <ul className="space-y-2">
              {policiesData?.data?.map((pol) => (
                <li key={pol.id} className="text-center md:text-left">
                  <Link
                    to={`/policies/${toSlug(pol.title)}-${pol.id}`}
                    className="text-gray-500 text-sm focus:outline-none "
                  >
                    {pol.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social icons from site config */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center md:text-left">
              Mạng xã hội
            </h3>
            <ul className="space-y-2 flex md:flex-col flex-row justify-center gap-10 md:gap-0 items-center md:items-start">
              {contactIcon && contactIcon.length > 0 ? (
                contactIcon.map((c) => (
                  <li key={c.id} className="text-center md:text-left md:mb-2 mb-0">
                    <a
                      href={c.link || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-gray-500 text-sm hover:text-gray-700"
                    >
                      {c.image?.url ? (
                        <img
                          src={getImageUrl(c.image.url)}
                          alt={c.title || ""}
                          className="w-6 h-6 rounded"
                        />
                      ) : (
                        <span className="inline-block w-6 h-6 bg-gray-200 rounded" />
                      )}
                      <span className="capitalize">{c.title}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">Không có thông tin</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex justify-center py-4 px-4 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} {contact?.name || "MediBiotech"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
