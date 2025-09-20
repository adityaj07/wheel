import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface HeaderProps {
  location: string;
  onLocationPress: () => void;
  onOffersPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  onLocationPress,
  onOffersPress,
}) => (
  <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shaodw-sm">
    <TouchableOpacity
      className="flex-row items-center px-2 py-1 rounded-lg active:bg-gray-100"
      onPress={onLocationPress}
      accessibilityLabel={`Current location: ${location}`}
      accessibilityRole="button">
      <Text className="text-lg font-semibold">{location}</Text>
      <Ionicons name="chevron-down" size={18} color="#4B5563" />
    </TouchableOpacity>

    <TouchableOpacity
      className="flex-row items-center px-3 py-1 rounded-full bg-emerald-50 active:bg-emerald-100"
      onPress={onOffersPress}
      accessibilityLabel="View offers"
      accessibilityRole="button">
      <Ionicons name="pricetag-outline" size={18} />
      <Text className="text-lg font-semibold ml-1">Offers</Text>
    </TouchableOpacity>
  </View>
);
