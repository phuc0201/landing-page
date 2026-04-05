import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useMatches } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Topbar from "../components/Topbar";

type HeaderMode = "sticky" | "fixed";

type LayoutHandle = {
  title?: string;
  layout?: {
    headerMode?: HeaderMode;
  };
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerMode: HeaderMode = useMemo(() => {
    const matchedRoute = [...matches]
      .reverse()
      .find((match) => (match.handle as LayoutHandle | undefined)?.layout?.headerMode);

    return (matchedRoute?.handle as LayoutHandle | undefined)?.layout?.headerMode ?? "sticky";
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

    const scrollEl =
      document.documentElement.scrollHeight > document.documentElement.clientHeight
        ? document.documentElement
        : document.body;

    const handleScroll = () => {
      setIsScrolled((scrollEl.scrollTop ?? window.scrollY) >= 10);
    };

    handleScroll();
    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const scrollTarget = document.scrollingElement ?? document.documentElement;

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

      <main style={isSticky ? {} : { marginTop: `${-headerHeight}px` }} className="relative">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
