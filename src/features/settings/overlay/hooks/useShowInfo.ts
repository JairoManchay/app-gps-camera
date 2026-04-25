import { useContext } from "react";
import { OverLaySettingsContext } from "../context/ShowInfoContext";

export function useShowInfo() {
  const context = useContext(OverLaySettingsContext);

  if (!context) {
    throw new Error("useShowInfo must be used within a ShowInfoProvider");
  }

  return context;
}
