import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { PhotoMetadata } from "../types/photoMetadata";

type Props = {
  metadata: PhotoMetadata | null;
  containerStyle?: object;
  labelStyle?: object;
  valueStyle?: object;
  compact?: boolean;
};

export default function PhotoMetaColumn({
  metadata,
  containerStyle,
  labelStyle,
  valueStyle,
  compact = false,
}: Props) {
  if (!metadata) return null;
  const compactLabel = [
    localStyles.label,
    compact && localStyles.labelCompact,
    labelStyle,
  ];
  const compactValue = [
    localStyles.value,
    compact && localStyles.valueCompact,
    valueStyle,
  ];

  return (
    <View
      style={[
        localStyles.container,
        compact && localStyles.containerCompact,
        containerStyle,
      ]}
    >
      <Text style={compactLabel}>Coordenadas</Text>
      <Text style={compactValue}>
        {metadata.location
          ? `${metadata.location.latitude.toFixed(6)}, ${metadata.location.longitude.toFixed(6)}`
          : "Sin coordenadas"}
      </Text>

      <Text style={compactLabel}>Fecha</Text>
      <Text style={compactValue}>{metadata.day}</Text>

      <Text style={compactLabel}>Direccion</Text>
      <Text style={compactValue}>{metadata.place || "Sin direccion"}</Text>

      <Text style={compactLabel}>Hora</Text>
      <Text style={compactValue}>{metadata.time}</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    color: "#CBD5E1",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  containerCompact: {
    gap: 6,
  },
  labelCompact: {
    fontSize: 10,
  },
  valueCompact: {
    fontSize: 12,
  },
});
