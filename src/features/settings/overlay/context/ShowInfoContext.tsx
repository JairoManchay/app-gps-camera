import { createContext, useContext, useMemo, useState } from "react";
import {
  OverlaySettings,
  OverlaySettingsProviderProps,
} from "../types/OverlaySettings";

const OverLaySettingsContext = createContext<OverlaySettings | null>(null);

export function ShowInfoProvider({ children }: OverlaySettingsProviderProps) {
  const [showTime, setShowTime] = useState(false);

  const value = useMemo(
    () => ({
      showTime,
      setShowTime,
    }),
    [showTime],
  );

  return (
    <OverLaySettingsContext.Provider value={value}>
      {children}
    </OverLaySettingsContext.Provider>
  );
}

export function showInfo() {
  const context = useContext(OverLaySettingsContext);
  if (!context)
    throw new Error("useShowInfo must be used within a ShowInfoProvider");
  return context;
}
