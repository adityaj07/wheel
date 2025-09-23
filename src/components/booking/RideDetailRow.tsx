import {useTheme} from "@/contexts/ThemeContext";
import React from "react";
import {Text, View} from "react-native";

interface RideDetailRowProps {
  label: string;
  value: string | number;
  valueStyle?: object;
}

const RideDetailRow: React.FC<RideDetailRowProps> = ({
  label,
  value,
  valueStyle,
}) => {
  const {theme} = useTheme();
  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className="text-gray-500">{label}</Text>
      <Text style={valueStyle} className={`${theme.text} font-medium`}>
        {value}
      </Text>
    </View>
  );
};

export default RideDetailRow;
