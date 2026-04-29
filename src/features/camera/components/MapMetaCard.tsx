import infoCardStyles from "@/features/shared/styles/infoCardStyles";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MiniMap from "../../location/components/MiniMap";
import type { PhotoMetadata } from "../types/photoMetadata";

type Props = {
  metadata: PhotoMetadata | null;
  mapSnapshotUri?: string | null;
  compact?: boolean;
  mapRef?: any;
  containerStyle?: object;
  mapColumnStyle?: object;
  metaColumnStyle?: object;
};

export default function MapMetaCard({
  metadata,
  mapSnapshotUri,
  compact = false,
  mapRef,
  containerStyle,
  mapColumnStyle,
  metaColumnStyle,
}: Props) {
  if (!metadata) return null;
  // Use the same visual language as LocationInfoCard: light card with left map and right info
  return (
    <View style={[infoCardStyles.card, containerStyle]}>
      <View
        style={[
          infoCardStyles.leftPaneBase,
          compact ? infoCardStyles.leftPaneWide : infoCardStyles.leftPaneNormal,
          mapColumnStyle,
        ]}
      >
        {metadata.location ? (
          mapSnapshotUri ? (
            <Image
              source={{ uri: mapSnapshotUri }}
              style={infoCardStyles.mapCard}
            />
          ) : (
            <MiniMap
              ref={mapRef}
              latitude={metadata.location.latitude}
              longitude={metadata.location.longitude}
              containerStyle={infoCardStyles.mapCard}
            />
          )
        ) : (
          <Text style={styles.cardText}>Sin ubicacion para minimapa</Text>
        )}
      </View>

      <View style={[infoCardStyles.rightPane, metaColumnStyle]}>
        <Text style={infoCardStyles.title}>Ubicación</Text>
        <View>
          <Text style={infoCardStyles.value}>
            Lat:{" "}
            {metadata.location ? metadata.location.latitude.toFixed(6) : "-"}
          </Text>
          <Text style={infoCardStyles.value}>
            Lng:{" "}
            {metadata.location ? metadata.location.longitude.toFixed(6) : "-"}
          </Text>
        </View>
        <View>
          <Text style={infoCardStyles.value}>
            📍 {metadata.place || "Sin direccion"}
          </Text>
        </View>
        <View>
          <Text style={infoCardStyles.value}>⏰ {metadata.time}</Text>
          <Text style={infoCardStyles.value}>• {metadata.day}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  mapColumn: {
    borderRadius: 8,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: 96,
    borderRadius: 8,
    backgroundColor: "#1F2937",
  },
  mapFallback: {
    height: 96,
    borderRadius: 8,
  },
  metaColumn: {
    flex: 1,
    gap: 8,
  },
  cardText: {
    color: "#E2E8F0",
    fontSize: 13,
  },
});

const lightStyles = StyleSheet.create({
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
  mapCard: {
    height: "100%",
    borderRadius: 12,
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
});
