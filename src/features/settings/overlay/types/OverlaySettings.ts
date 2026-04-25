import { ReactNode } from "react";

export type OverlaySettings = {
  showTime: boolean;
  showDate: boolean;
  showCoordinates: boolean;
  showAddress: boolean;
  setShowTime: (value: boolean) => void;
  setShowDate: (value: boolean) => void;
  setShowCoordinates: (value: boolean) => void;
  setShowAddress: (value: boolean) => void;
};

export type OverlaySettingsProviderProps = {
  children: ReactNode;
};
