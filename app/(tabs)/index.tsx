import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Pressable, View } from "react-native";

export default function CameraScreen() {

  const [cameraFacing, setCameraFacing] = useState<CameraType>("back")
  const [flash, setFlash] = useState<"off" | "on">("off");

  const cameraRef = useRef<CameraView>(null)

  const toogleCameraFacing = () => {
    cameraFacing === "back" ? setCameraFacing("front") : setCameraFacing("back")
  }

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
        style={{ flex: 1, }}
        facing={cameraFacing}
        flash={flash}
        ref={cameraRef}
      ></CameraView>

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
          onPress={takePhoto}
          className="justify-center items-center">
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