import { forwardRef } from "react";
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type MiniMapProps = {
  latitude: number;
  longitude: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const MiniMap = forwardRef<any, MiniMapProps>(function MiniMap(
  { latitude, longitude, containerStyle },
  ref,
) {
  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <MapView
        ref={ref}
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
});

export default MiniMap;

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
