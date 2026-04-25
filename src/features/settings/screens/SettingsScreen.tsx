import BtnInfo from "@/shared/components/BtnInfo";
import BtnSwitch from "@/shared/components/BtnSwitch";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useShowInfo } from "../overlay/hooks/useShowInfo";

export default function SettingsScreen() {
  const {
    showTime,
    showDate,
    showCoordinates,
    showAddress,
    setShowTime,
    setShowDate,
    setShowCoordinates,
    setShowAddress,
  } = useShowInfo();

  return (
    <ScrollView className="bg-gray-800 flex-1">
      <Text className="text-white text-2xl border-b border-gray-100/40 p-5">
        Configuración
      </Text>

      <View className="p-5 gap-5">
        <View>
          <Text className="text-gray-300/70 text-xl uppercase">
            Mostrar en Foto
          </Text>
          <View className="bg-gray-900 p-5 rounded-xl gap-5 mt-3">
            <BtnSwitch
              text="Hora"
              icon="time"
              value={showTime}
              onChange={setShowTime}
            />

            <BtnSwitch
              text="Fecha"
              icon="calendar"
              value={showDate}
              onChange={setShowDate}
            />

            <BtnSwitch
              text="Latitud / Longitud"
              icon="navigate"
              value={showCoordinates}
              onChange={setShowCoordinates}
            />

            <BtnSwitch
              text="Dirección"
              icon="map"
              value={showAddress}
              onChange={setShowAddress}
            />

            <BtnSwitch text="Guardar en galería" icon="images" value={true} />
          </View>
        </View>

        <View>
          <Text className="text-gray-300/70 text-xl uppercase">
            Información
          </Text>
          <View className="bg-gray-900 p-5 rounded-xl gap-5 mt-3">
            <BtnInfo text="Versión" icon="information-circle" info="1.0.0" />

            <BtnInfo text="Desarrollado" icon="person" info="Evolutra" />

            <BtnInfo
              text="Última actualización"
              icon="refresh"
              info="Abr 2026"
            />
          </View>
        </View>

        <View className="p-7 bg-orange-400/20 border border-orange-400/50 rounded-xl gap-1">
          <Text className="text-center text-4xl">🎨</Text>
          <Text className="text-white text-2xl text-center font-semibold">
            Perzonaliza tu Overlay
          </Text>
          <Text className="text-white/70 text-center">
            Colores, fuentes, posición y más en PRO
          </Text>
          <Pressable className="mt-2 bg-orange-400 p-2 rounded-xl">
            <Text className="text-center text-xl font-semibold">
              Próximamente
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
