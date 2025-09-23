import React, {type FC} from "react";
import {Text, TouchableOpacity} from "react-native";

interface FloatingButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  label?: string;
  style?: object;
}

const FloatingButton: FC<FloatingButtonProps> = ({
  onPress,
  icon,
  label,
  style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="absolute bottom-5 bg-gray-700 flex-row items-center px-4 py-3 rounded-full shadow-lg"
    style={style}>
    {icon}
    {label && <Text className="text-white ml-2">{label}</Text>}
  </TouchableOpacity>
);

export default FloatingButton;
