import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MiniMap from "../../location/components/MiniMap";
import type { PhotoMetadata } from "../types/photoMetadata";
import PhotoMetaColumn from "./PhotoMetaColumn";

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

  const mapWidth = compact ? 120 : 160;

  return (
    <View style={[styles.row, containerStyle]}>
      <View style={[styles.mapColumn, { width: mapWidth }, mapColumnStyle]}>
        {metadata.location ? (
          mapSnapshotUri ? (
            <Image source={{ uri: mapSnapshotUri }} style={styles.mapImage} />
          ) : (
            <MiniMap
              ref={mapRef}
              latitude={metadata.location.latitude}
              longitude={metadata.location.longitude}
              containerStyle={[
                styles.mapFallback,
                { height: compact ? 80 : 96 },
              ]}
            />
          )
        ) : (
          <Text style={styles.cardText}>Sin ubicacion para minimapa</Text>
        )}
      </View>

      <View style={[styles.metaColumn, metaColumnStyle]}>
        <PhotoMetaColumn metadata={metadata} compact={compact} />
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
