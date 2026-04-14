import { Text, View } from "react-native";

export default function SettingsScreen() {
  return (
    <View
      className="bg-gray-800 h-full"
    >
      <Text
        className="text-white text-2xl border-b border-gray-100/40 p-5"
      >Configuración</Text>

      <View className="px-5 py-3">
        <Text
          className="text-gray-100 text-xl uppercase"
        >Configuración de overlay</Text>
        <View
          className="bg-gray-900 p-5 rounded-xl gap-5 mt-3"
        >
          <Text className="text-white text-xl">Mostrar Mapa</Text>
          <Text className="text-white text-xl">Mostrar Mapa</Text>
          <Text className="text-white text-xl">Mostrar Mapa</Text>
        </View>
      </View>

      <View className="px-5 py-3">
        <Text
          className="text-gray-100 text-xl uppercase"
        >Equipo</Text>
        <View
          className="bg-gray-900 p-5 rounded-xl gap-5 mt-3"
        >
          <Text className="text-white text-xl">Mostrar Mapa</Text>
          <Text className="text-white text-xl">Mostrar Mapa</Text>
          <Text className="text-white text-xl">Mostrar Mapa</Text>
        </View>
      </View>
    </View>
  );
}