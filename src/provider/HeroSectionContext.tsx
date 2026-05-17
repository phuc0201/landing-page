import { createContext, useContext, useState } from "react";

interface HeroSectionContextType {
  hasHeroTitle: boolean;
  setHasHeroTitle: (has: boolean) => void;
}

const HeroSectionContext = createContext<HeroSectionContextType | undefined>(
  undefined,
);

export function HeroSectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasHeroTitle, setHasHeroTitle] = useState(false);

  return (
    <HeroSectionContext.Provider value={{ hasHeroTitle, setHasHeroTitle }}>
      {children}
    </HeroSectionContext.Provider>
  );
}

export function useHeroSection() {
  const context = useContext(HeroSectionContext);
  if (!context) {
    throw new Error("useHeroSection must be used within HeroSectionProvider");
  }
  return context;
}
