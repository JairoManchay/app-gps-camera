import { useShowInfo } from "@/features/settings/overlay/hooks/useShowInfo";
import infoCardStyles from "@/features/shared/styles/infoCardStyles";
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
    ? infoCardStyles.leftPaneFull
    : visibleRowsCount <= 2
      ? infoCardStyles.leftPaneWide
      : infoCardStyles.leftPaneNormal;

  return (
    <View style={styles.overlayContainer}>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

      {location && (
        <View style={infoCardStyles.card}>
          <View style={[infoCardStyles.leftPaneBase, leftPaneStyle]}>
            <MiniMap
              latitude={location.latitude}
              longitude={location.longitude}
              containerStyle={infoCardStyles.mapCard}
            />
          </View>

          {hasVisibleInfo && (
            <View style={infoCardStyles.rightPane}>
              <Text style={infoCardStyles.title}>Ubicacion actual</Text>
              {showCoordinates && (
                <>
                  <Text style={infoCardStyles.value}>
                    Lat: {location.latitude.toFixed(6)}
                  </Text>
                  <Text style={infoCardStyles.value}>
                    Lng: {location.longitude.toFixed(6)}
                  </Text>
                </>
              )}
              {showAddress && (
                <Text style={infoCardStyles.value}>
                  📍 {place || "Sin direccion"}
                </Text>
              )}
              {showTime && <Text style={infoCardStyles.value}>⏰ {time}</Text>}
              {showDate && <Text style={infoCardStyles.value}>• {day}</Text>}
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
  leftPaneFull: {
    flex: 1,
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
