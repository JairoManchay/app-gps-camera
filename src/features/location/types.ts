import type { Coordinates } from "../../types/common";

export type LocationContextValue = {
  location: Coordinates | null;
  place: string;
  errorMsg: string | null;
};
