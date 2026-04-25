import { showInfo } from "@/features/settings/overlay/context/ShowInfoContext";
import type { Coordinates } from "@/types/common";
import { StyleSheet, Text, View } from "react-native";
import MiniMap from "../components/MiniMap";

type LocationInfoCardProps = {
  location: Coordinates | null;
  place: string;
  errorMsg: string | null;
  time: string;
  day: string;
};

export default function LocationInfoCard({
  location,
  place,
  errorMsg,
  time,
  day,
}: LocationInfoCardProps) {
  const { showTime } = showInfo();

  console.log("showTime", showTime);
  return (
    <View style={styles.overlayContainer}>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {location && (
        <View style={styles.card}>
          <View style={styles.leftPane}>
            <MiniMap
              latitude={location.latitude}
              longitude={location.longitude}
              containerStyle={styles.mapCard}
            />
          </View>

          <View style={styles.rightPane}>
            <Text style={styles.title}>Ubicacion actual</Text>
            <Text style={styles.value}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.value}>
              Lng: {location.longitude.toFixed(6)}
            </Text>
            <Text style={styles.value}>📍 {place || "Sin direccion"}</Text>
            {showTime && <Text style={styles.value}>⏰ {time}</Text>}
            <Text style={styles.value}>• {day}</Text>
          </View>
        </View>
      )}

      {!location && !errorMsg && (
        <View style={styles.loadingBox}>
          <Text style={styles.loadingText}>Obteniendo ubicacion...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    bottom: 110,
    left: 16,
    right: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 6,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  leftPane: {
    width: "42%",
    justifyContent: "center",
  },
  mapCard: {
    height: "100%",
  },
  rightPane: {
    width: "58%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: "#334155",
    marginBottom: 0,
  },
  error: {
    color: "#FEE2E2",
    backgroundColor: "rgba(127, 29, 29, 0.85)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontWeight: "600",
  },
  loadingBox: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  loadingText: {
    color: "#E2E8F0",
    fontSize: 12,
    fontWeight: "600",
  },
});
