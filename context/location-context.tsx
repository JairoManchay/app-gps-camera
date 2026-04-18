import { createContext, useContext } from "react";
import { useLocation } from "../hooks/ubication/use-location";

const LocationContext = createContext<any>(null);

export const LocationProvider = ({ children }: any) => {
    const locationData = useLocation();
    return (
        <LocationContext.Provider value={locationData}>
        {children}
        </LocationContext.Provider>
    );
}

export const useLocationContext = () => useContext(LocationContext);

