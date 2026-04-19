import { type ReactNode } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "../features/location/context/LocationContext";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <LocationProvider>{children}</LocationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
