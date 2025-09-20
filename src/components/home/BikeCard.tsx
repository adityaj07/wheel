import {BikeModel} from "@/types/home";
import React from "react";
import {Image, Text, TouchableOpacity} from "react-native";

interface BikeCardProps {
  bike: BikeModel;
  onPress?: () => void;
  width?: string;
  showShadow?: boolean;
}

export const BikeCard: React.FC<BikeCardProps> = ({
  bike,
  onPress,
  width = "w-40",
  showShadow = true,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${width} mr-4 ${showShadow ? "bg-white rounded-xl shadow-md" : "rounded-xl"}`}
    accessibilityLabel={`View details for ${bike.name}`}
    accessibilityRole="button">
    <Image
      source={{uri: bike.imageUrl}}
      className="w-full h-28 rounded-xl"
      resizeMode="contain"
    />
    <Text className="text-center font-semibold mt-2 mb-3 px-2">
      {bike.name}
    </Text>
  </TouchableOpacity>
);
