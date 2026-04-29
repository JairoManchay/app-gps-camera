import { useShowInfo } from "@/features/settings/overlay/hooks/useShowInfo";
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
  const { showTime, showDate, showCoordinates, showAddress } = useShowInfo();
  const visibleRowsCount =
    (showCoordinates ? 2 : 0) +
    (showAddress ? 1 : 0) +
    (showTime ? 1 : 0) +
    (showDate ? 1 : 0);
  const hasVisibleInfo = visibleRowsCount > 0;

  const leftPaneStyle = !hasVisibleInfo
    ? styles.leftPaneFull
    : visibleRowsCount <= 2
      ? styles.leftPaneWide
      : styles.leftPaneNormal;

  return (
    <View style={styles.overlayContainer}>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {location && (
        <View style={styles.card}>
          <View style={[styles.leftPaneBase, leftPaneStyle]}>
            <MiniMap
              latitude={location.latitude}
              longitude={location.longitude}
              containerStyle={styles.mapCard}
            />
          </View>

          {hasVisibleInfo && (
            <View style={styles.rightPane}>
              <Text style={styles.title}>Ubicacion actual</Text>
              {showCoordinates && (
                <>
                  <Text style={styles.value}>
                    Lat: {location.latitude.toFixed(6)}
                  </Text>
                  <Text style={styles.value}>
                    Lng: {location.longitude.toFixed(6)}
                  </Text>
                </>
              )}
              {showAddress && (
                <Text style={styles.value}>📍 {place || "Sin direccion"}</Text>
              )}
              {showTime && <Text style={styles.value}>⏰ {time}</Text>}
              {showDate && <Text style={styles.value}>• {day}</Text>}
            </View>
          )}
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
  leftPaneBase: {
    justifyContent: "center",
  },
  leftPaneNormal: {
    flex: 0.42,
  },
  leftPaneWide: {
    flex: 0.55,
  },
  leftPaneFull: {
    flex: 1,
  },
  mapCard: {
    height: "100%",
  },
  rightPane: {
    flex: 0.58,
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
