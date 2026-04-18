import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type MiniMapProps = {
  latitude: number;
  longitude: number;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function MiniMap({
  latitude,
  longitude,
  containerStyle,
}: MiniMapProps) {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <MapView
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        liteMode={Platform.OS === "android"}
        loadingEnabled
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        <Marker coordinate={{ latitude, longitude }} title="Tu ubicacion" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  map: {
    flex: 1,
    borderRadius: 12,
  },
});
