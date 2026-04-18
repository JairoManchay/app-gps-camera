import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LocationProvider } from "../context/location-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <LocationProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </LocationProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
