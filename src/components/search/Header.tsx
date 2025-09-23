import React from "react";
import {View, Text} from "react-native";
import {formatDate, formatTime} from "@/utils/time";
import {useTheme} from "@/contexts/ThemeContext";

interface HeaderProps {
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

const Header: React.FC<HeaderProps> = ({
  pickupDate,
  pickupTime,
  dropoffDate,
  dropoffTime,
}) => {
  const {theme} = useTheme();
  return (
    <View className="rounded-b-3xl" style={{backgroundColor: theme.primary}}>
      <View className="flex-row items-center justify-between px-5 py-3">
        <Text className="text-white font-semibold text-lg">Rental Bikes</Text>
      </View>

      <View
        className="mx-5 my-2 p-4 rounded-xl"
        style={{backgroundColor: theme.card, ...theme.shadow}}>
        <View className="flex-row justify-between">
          <View className="flex-1">
            <Text className="text-xs text-gray-400">Pickup</Text>
            <Text className="text-sm font-semibold text-gray-900">
              {formatDate(pickupDate)} at {formatTime(pickupTime)}
            </Text>
          </View>
          <View className="w-px bg-gray-300 mx-3" />
          <View className="flex-1">
            <Text className="text-xs text-gray-400">Dropoff</Text>
            <Text className="text-sm font-semibold text-gray-900">
              {formatDate(dropoffDate)} at {formatTime(dropoffTime)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
