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
    className={`${width} mr-4 bg-white rounded-2xl shadow-md`}
    accessibilityLabel={`View details for ${bike.name}`}
    accessibilityRole="button">
    <Image
      source={{uri: bike.imageUrl}}
      className="w-full h-32 rounded-t-2xl"
      resizeMode="cover"
    />
    <Text className="text-center font-semibold mt-3 mb-4 text-gray-800 px-2">
      {bike.name}
    </Text>
  </TouchableOpacity>
);
