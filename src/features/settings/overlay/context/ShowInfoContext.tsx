import { createContext, useMemo, useState } from "react";
import {
  OverlaySettings,
  OverlaySettingsProviderProps,
} from "../types/OverlaySettings";

export const OverLaySettingsContext = createContext<OverlaySettings | null>(
  null,
);

export function ShowInfoProvider({ children }: OverlaySettingsProviderProps) {
  const [showTime, setShowTime] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [showAddress, setShowAddress] = useState(true);

  const value = useMemo(
    () => ({
      showTime,
      showDate,
      showCoordinates,
      showAddress,
      setShowTime,
      setShowDate,
      setShowCoordinates,
      setShowAddress,
    }),
    [showTime, showDate, showCoordinates, showAddress],
  );

  return (
    <OverLaySettingsContext.Provider value={value}>
      {children}
    </OverLaySettingsContext.Provider>
  );
}
