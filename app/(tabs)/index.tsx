import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MiniMap from "../../components/MiniMap";
import { useLocationContext } from "../../context/location-context";
import { formatDate } from "../../helper/date-formattet.helper";

export default function CameraScreen() {
  const [cameraFacing, setCameraFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const { location, place, errorMsg } = useLocationContext();
  const { time, day } = formatDate(new Date());

  const cameraRef = useRef<CameraView>(null);

  const toogleCameraFacing = () => {
    cameraFacing === "back"
      ? setCameraFacing("front")
      : setCameraFacing("back");
  };

  const toggleFlash = () => {
    setFlash((state) => (state === "off" ? "on" : "off"));
  };

  const takePhoto = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    console.log(photo);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={cameraFacing}
        flash={flash}
        ref={cameraRef}
      ></CameraView>

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
              <Text style={styles.value}>🕒 {time}</Text>
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

      <View className="absolute bottom-8 w-full flex-row justify-around items-center">
        <Pressable
          onPress={toggleFlash}
          className="bg-gray-800/50 p-3.5 rounded-full"
        >
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={33}
            color="#fff"
          />
        </Pressable>

        <Pressable onPress={takePhoto} className="justify-center items-center">
          <View className="absolute w-[80px] h-[80px] rounded-full border-4 border-white " />
          <View className="w-[63] h-[63] rounded-full bg-white" />
        </Pressable>

        <Pressable
          className="bg-gray-800/50 p-3.5 rounded-full"
          onPress={toogleCameraFacing}
        >
          <Ionicons name="camera-reverse" size={36} color={"#fff"} />
        </Pressable>
      </View>
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
