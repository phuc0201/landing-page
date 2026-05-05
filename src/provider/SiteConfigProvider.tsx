import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { SiteConfig } from "../types/siteConfig.type";

const STORAGE_KEY = "site_config";

const loadFromStorage = (): SiteConfig | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SiteConfig) : null;
  } catch {
    return null;
  }
};

const saveToStorage = (config: SiteConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // localStorage quota exceeded or unavailable — fail silently
  }
};

const isSameConfig = (a: SiteConfig | null, b: SiteConfig | null): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

type SiteConfigContextValue = {
  siteConfig: SiteConfig | null;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig | null>>;
  isConfigReady: boolean;
  setIsConfigReady: (ready: boolean) => void;
};

const SiteConfigContext = createContext<SiteConfigContextValue | undefined>(undefined);

export const SiteConfigProvider = ({
  children,
}: {
  initialConfig?: SiteConfig | null;
  children: React.ReactNode;
}) => {
  const [siteConfig, setSiteConfigRaw] = useState<SiteConfig | null>(() => loadFromStorage());

  const [isConfigReady, setIsConfigReady] = useState(false);

  const setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig | null>> = useCallback(
    (action) => {
      setSiteConfigRaw((prev) => {
        const next = typeof action === "function" ? action(prev) : action;
        if (next && !isSameConfig(prev, next)) saveToStorage(next);
        return next;
      });

      setIsConfigReady(true);
    },
    [],
  );

  useEffect(() => {
    const raw = siteConfig?.color?.primary || "";
    const color =
      raw && !raw.startsWith("#") && /^[0-9A-Fa-f]{6}$/.test(raw) ? `#${raw}` : raw || "#78070e";
    console.log("🚀 ~ SiteConfigProvider ~ color:", color);
    document.documentElement.style.setProperty("--primary-color", color);
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) meta.content = color;
  }, [siteConfig]);

  return (
    <SiteConfigContext.Provider
      value={{ siteConfig, setSiteConfig, isConfigReady, setIsConfigReady }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = (): SiteConfigContextValue => {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within a SiteConfigProvider");
  }
  return ctx;
};

export default SiteConfigProvider;
