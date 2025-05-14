"use client";
import { createContext, useContext, useState } from "react";

type HeroVisibilityContextType = {
  isHeroVisible: boolean;
  setHeroVisible: (visible: boolean) => void;
};

const HeroVisibilityContext = createContext<HeroVisibilityContextType>({
  isHeroVisible: true,
  setHeroVisible: () => {},
});

export const useHeroVisibility = () => useContext(HeroVisibilityContext);

export function HeroVisibilityProvider({ children }: { children: React.ReactNode }) {
  const [isHeroVisible, setHeroVisible] = useState(true);

  return (
    <HeroVisibilityContext.Provider value={{ isHeroVisible, setHeroVisible }}>
      {children}
    </HeroVisibilityContext.Provider>
  );
}
