import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import LogoDefault from "./assets/images/logo_default.png";
import { useSiteConfig } from "./provider";
import { router } from "./routes/router";
import { useGetSiteConfigQuery } from "./services/siteConfigService";

export default function App() {
  const { data: siteConfigResult } = useGetSiteConfigQuery();
  const { setSiteConfig, setIsConfigReady } = useSiteConfig();

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
        setFavicon(LogoDefault);
      } catch (error) {
        console.error("Failed to set favicon:", error);
        setFavicon();
      }
    })();
  }, []);
  return <RouterProvider router={router} />;
}
