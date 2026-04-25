import { ReactNode } from "react";

export type OverlaySettings = {
  showTime: boolean;
  setShowTime: (value: boolean) => void;
};

export type OverlaySettingsProviderProps = {
  children: ReactNode;
};
