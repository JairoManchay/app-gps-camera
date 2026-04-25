import { ShowInfoProvider } from "@/features/settings/overlay/context/ShowInfoContext";
import { type ReactNode } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "../features/location/context/LocationContext";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = ({ children }: AppProvidersProps) => {
  console.log("Renderizando AppProviders");
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ShowInfoProvider>
          <LocationProvider>{children}</LocationProvider>
        </ShowInfoProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
