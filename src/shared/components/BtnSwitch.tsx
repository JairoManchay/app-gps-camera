import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type BtnSwitchProps = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: boolean;
  onChange?: (value: boolean) => void;
};

const BtnSwitch = ({ text, icon, value, onChange }: BtnSwitchProps) => {
  const [active, setActive] = useState(value);

  const translateX = useSharedValue(value ? 31 : 1.5);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const toggle = () => {
    setActive(!active);
    translateX.value = withTiming(active ? 1.5 : 31, { duration: 300 });
    onChange && onChange(!active);
  };

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3 max-w-40">
        <Ionicons
          name={icon}
          size={25}
          color="#4ade80"
          className="bg-green-900 p-2 rounded-xl"
        />
        <Text className="text-white text-xl">{text}</Text>
      </View>

      <Pressable
        onPress={toggle}
        className={`w-[75px] h-12 rounded-full px-1 justify-center ${active ? "bg-green-400" : "bg-gray-400"}`}
      >
        <Animated.View
          style={animatedStyle}
          className="w-10 h-10 bg-white rounded-full absolute left-1"
        />
      </Pressable>
    </View>
  );
};

export default BtnSwitch;
