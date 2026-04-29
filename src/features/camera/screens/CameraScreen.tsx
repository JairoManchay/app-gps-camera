import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatDate } from "../../../shared/utils/formatDate";
import { useLocationContext } from "../../location/context/LocationContext";
import LocationInfoCard from "../../location/screens/LocationInfoCard";
import { useShowInfo } from "../../settings/overlay/hooks/useShowInfo";
import CapturedPhotoPreview from "../components/CapturedPhotoPreview";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { usePhotoCapture } from "../hooks/usePhotoCapture";

export default function CameraScreen() {
  const [cameraFacing, setCameraFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { location, place, errorMsg } = useLocationContext();

  const { showTime, showDate, showCoordinates, showAddress } = useShowInfo();

  const currentTime = useCurrentTime();
  const { time, day } = formatDate(currentTime);

  const cameraRef = useRef<CameraView>(null);

  const {
    photo,
    photoMetadata,
    isSaving,
    isSavingToLibrary,
    saveMessage,
    setSaveMessage,
    takePhoto,
    savePhotoWithMetadata,
    resetCapturedPhoto,
  } = usePhotoCapture({
    location,
    place,
    errorMsg,
    showCoordinates,
    showAddress,
    showTime,
    showDate,
  });

  const toogleCameraFacing = () => {
    if (cameraFacing === "back") {
      setCameraFacing("front");
      return;
    }

    setCameraFacing("back");
  };

  const toggleFlash = () => {
    setFlash((state) => (state === "off" ? "on" : "off"));
  };

  if (!cameraPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>
          Solicitando acceso a camara...
        </Text>
      </View>
    );
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionTitle}>No hay acceso a la camara</Text>
        <Text style={styles.permissionText}>
          Permite el acceso para mostrar la vista previa.
        </Text>

        <Pressable
          onPress={requestCameraPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Permitir camara</Text>
        </Pressable>
      </View>
    );
  }

  if (photo) {
    return (
      <CapturedPhotoPreview
        photoUri={photo}
        photoMetadata={photoMetadata}
        isSavingToLibrary={isSavingToLibrary}
        saveMessage={saveMessage}
        setSaveMessage={setSaveMessage}
        onSave={savePhotoWithMetadata}
        onRetake={resetCapturedPhoto}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={cameraFacing}
        flash={flash}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <LocationInfoCard
        location={location}
        place={place}
        errorMsg={errorMsg}
        time={time}
        day={day}
      />
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

        <Pressable
          onPress={() => takePhoto(cameraRef, isCameraReady)}
          disabled={!isCameraReady || isSaving}
          className="justify-center items-center"
        >
          <View className="absolute w-[80px] h-[80px] rounded-full border-4 border-white" />
          <View className="w-[63] h-[63] rounded-full bg-white" />
        </Pressable>

        <Pressable
          className="bg-gray-800/50 p-3.5 rounded-full"
          onPress={toogleCameraFacing}
        >
          <Ionicons name="camera-reverse" size={36} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#0F172A",
  },
  permissionTitle: {
    color: "#F8FAFC",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  permissionText: {
    color: "#CBD5E1",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  permissionButton: {
    marginTop: 16,
    backgroundColor: "#0EA5E9",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
