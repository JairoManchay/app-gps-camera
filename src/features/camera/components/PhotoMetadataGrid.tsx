import { StyleSheet, Text, View } from "react-native";
import type { PhotoMetadata } from "../types/photoMetadata";

type PhotoMetadataGridProps = {
  metadata: PhotoMetadata | null;
  styles?: {
    row?: object;
    column?: object;
    columnFull?: object;
    label?: object;
    value?: object;
  };
  showCoordinates?: boolean;
};

export default function PhotoMetadataGrid({
  metadata,
  styles: customStyles,
  showCoordinates = true,
}: PhotoMetadataGridProps) {
  if (!metadata) {
    return null;
  }

  return (
    <View style={localStyles.container}>
      <View style={[localStyles.row, customStyles?.row]}>
        <View style={[localStyles.column, customStyles?.column]}>
          <Text style={[localStyles.label, customStyles?.label]}>Fecha</Text>
          <Text style={[localStyles.value, customStyles?.value]}>
            {metadata.day}
          </Text>
        </View>
        <View style={[localStyles.column, customStyles?.column]}>
          <Text style={[localStyles.label, customStyles?.label]}>Hora</Text>
          <Text style={[localStyles.value, customStyles?.value]}>
            {metadata.time}
          </Text>
        </View>
      </View>

      {showCoordinates ? (
        <View style={[localStyles.row, customStyles?.row]}>
          <View style={[localStyles.column, customStyles?.column]}>
            <Text style={[localStyles.label, customStyles?.label]}>
              Coordenadas
            </Text>
            <Text style={[localStyles.value, customStyles?.value]}>
              {metadata.location
                ? `${metadata.location.latitude.toFixed(6)}, ${metadata.location.longitude.toFixed(6)}`
                : "Sin coordenadas"}
            </Text>
          </View>
          <View style={[localStyles.column, customStyles?.column]}>
            <Text style={[localStyles.label, customStyles?.label]}>
              Direccion
            </Text>
            <Text style={[localStyles.value, customStyles?.value]}>
              {metadata.place || "Sin direccion"}
            </Text>
          </View>
        </View>
      ) : (
        <View style={[localStyles.columnFull, customStyles?.columnFull]}>
          <Text style={[localStyles.label, customStyles?.label]}>
            Direccion
          </Text>
          <Text style={[localStyles.value, customStyles?.value]}>
            {metadata.place || "Sin direccion"}
          </Text>
        </View>
      )}

      {metadata.errorMsg ? (
        <View style={[localStyles.columnFull, customStyles?.columnFull]}>
          <Text style={[localStyles.label, customStyles?.label]}>Estado</Text>
          <Text style={[localStyles.value, customStyles?.value]}>
            {metadata.errorMsg}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flex: 1,
    gap: 4,
  },
  columnFull: {
    gap: 4,
  },
  label: {
    color: "#94A3B8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    color: "#E2E8F0",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },
});
