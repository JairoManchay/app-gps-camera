import { createContext, type ReactNode, useContext } from "react";
import { useLocation } from "../hooks/useLocation";
import type { LocationContextValue } from "../types";

const LocationContext = createContext<LocationContextValue | undefined>(
  undefined,
);

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const locationData = useLocation();

  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }

  return context;
};
