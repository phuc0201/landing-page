import { Breadcrumb } from "antd";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, Outlet, useLocation, useMatches } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Topbar from "../components/Topbar";
import FloatBtn from "../components/common/FloatBtn";
import { useHeroSection } from "../provider/HeroSectionContext";

type HeaderMode = "sticky" | "fixed";

type LayoutHandle = {
  title?: string;
  layout?: {
    headerMode?: HeaderMode;
  };
};

type RouteHandle = {
  title?: string;
  breadcrumb?:
    | string
    | ((ctx: {
        params: Record<string, string | undefined>;
        data?: unknown;
      }) => string);
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const { hasHeroTitle } = useHeroSection();

  const breadcrumbMatches = useMatches() as Array<{
    pathname: string;
    params: Record<string, string | undefined>;
    data?: unknown;
    handle?: RouteHandle;
  }>;

  const breadcrumbItems = breadcrumbMatches
    .filter((m) => !!m.handle?.breadcrumb)
    .map((m) => {
      const bc = m.handle?.breadcrumb;
      const label =
        typeof bc === "function" ? bc({ params: m.params, data: m.data }) : bc;
      return { title: <Link to={m.pathname}>{label}</Link> };
    });
  const hasBreadcrumb = breadcrumbItems.length > 0;

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerMode: HeaderMode = useMemo(() => {
    const matchedRoute = [...matches]
      .reverse()
      .find(
        (match) =>
          (match.handle as LayoutHandle | undefined)?.layout?.headerMode,
      );

    return (
      (matchedRoute?.handle as LayoutHandle | undefined)?.layout?.headerMode ??
      "sticky"
    );
  }, [matches]);

  const isSticky = headerMode === "sticky";
  const scrolled = isSticky ? true : isScrolled;

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(headerEl.offsetHeight);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerEl);

    return () => resizeObserver.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (isSticky) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        document.scrollingElement?.scrollTop ||
        0;
      setIsScrolled(scrollTop >= 10);
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const scrollTarget =
      document.scrollingElement ?? document.documentElement ?? document.body;

    window.scrollTo(0, 0);
    scrollTarget.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <>
      <div
        className={`sticky header_container top-0 z-1000 w-full transition-transform duration-300`}
      >
        <Topbar />
        <Header ref={headerRef} scrolled={scrolled} />
      </div>

      <main
        style={
          isSticky || !hasHeroTitle ? {} : { marginTop: `${-headerHeight}px` }
        }
        className="relative"
      >
        {hasBreadcrumb && (
          <div className="section-container pt-5">
            <Breadcrumb
              className="layout-breadcrumb"
              items={[
                {
                  href: "/",
                  title: "Trang chủ",
                },
                ...breadcrumbItems,
              ]}
            />
          </div>
        )}
        <Outlet />
      </main>
      <FloatBtn />
      <Footer />
    </>
  );
}
