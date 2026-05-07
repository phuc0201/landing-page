import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import LogoDefault from "./assets/images/logo_default.png";
import { useSiteConfig, WishlistProvider } from "./provider";
import { router } from "./routes/router";
import { useGetSiteConfigQuery } from "./services/siteConfigService";

function AppContent() {
  const { data: siteConfigResult } = useGetSiteConfigQuery();
  const { siteConfig, setSiteConfig, setIsConfigReady } = useSiteConfig();
  const [isDesktop, setIsDesktop] = useState(false);

  const faviconUrl = import.meta.env.VITE_BASE_URL + siteConfigResult?.data?.icon?.favicon?.url;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const size = isDesktop ? 56 : 48;

  useEffect(() => {
    if (siteConfigResult?.data) {
      setSiteConfig(siteConfigResult.data);
      setIsConfigReady(true);
    }
  }, [siteConfigResult, setSiteConfig, setIsConfigReady]);

  function setFavicon(url?: string) {
    const id = "app-favicon";
    let link = document.getElementById(`favicon`) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const fallback = "/favicon.svg";
    if (!url) link.href = fallback;
    else link.href = `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;
  }

  useEffect(() => {
    (async () => {
      try {
        setFavicon(faviconUrl || LogoDefault);
      } catch (error) {
        console.error("Failed to set favicon:", error);
        setFavicon();
      }
    })();
  }, [siteConfig, faviconUrl]);

  const primaryColor = siteConfig?.color?.primary || "#78070e";
  const formattedColor = primaryColor.startsWith("#") ? primaryColor : `#${primaryColor}`;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: formattedColor,
          fontSize: 14,
        },
        components: {
          Button: {
            controlHeight: 40,
          },
          FloatButton: {
            controlHeightLG: size,
            controlHeight: size,
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <AppContent />
    </WishlistProvider>
  );
}
