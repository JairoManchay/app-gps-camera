import type { Coordinates } from "../../../types/common";

export type PhotoMetadata = {
  location: Coordinates | null;
  place: string;
  day: string;
  time: string;
  errorMsg: string | null;
  overlay: {
    showCoordinates: boolean;
    showAddress: boolean;
    showTime: boolean;
    showDate: boolean;
  };
  miniMap: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    markerTitle: string;
    provider: "google" | "default";
    liteMode: boolean;
  } | null;
};
