import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

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
  <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
    <TouchableOpacity
      className="flex-row items-center"
      onPress={onLocationPress}
      accessibilityLabel={`Current location: ${location}`}
      accessibilityRole="button">
      <Text className="text-lg font-semibold">{location}</Text>
      <Ionicons name="chevron-down" size={18} />
    </TouchableOpacity>

    <TouchableOpacity
      className="flex-row items-center"
      onPress={onOffersPress}
      accessibilityLabel="View offers"
      accessibilityRole="button">
      <Ionicons name="pricetag-outline" size={18} />
      <Text className="text-lg font-semibold ml-1">Offers</Text>
    </TouchableOpacity>
  </View>
);
