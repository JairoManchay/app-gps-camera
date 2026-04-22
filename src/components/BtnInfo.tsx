import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"

type BtnInfoProps = {
    text: string
    icon: keyof typeof Ionicons.glyphMap
    info: string
}

const BtnInfo = ({ text, icon, info }: BtnInfoProps) => {

    return (
        <View className="flex-row items-center justify-between">

            <View className="flex-row items-center gap-3 max-w-40">
                <Ionicons
                    name={icon}
                    size={25}
                    color="#22d3ee"
                    className="bg-cyan-900 p-2 rounded-xl"
                />
                <Text className="text-white text-xl">{text}</Text>
            </View>

            <Text className="text-gray-400 text-xl">{info}</Text>

        </View>
    )
}

export default BtnInfo