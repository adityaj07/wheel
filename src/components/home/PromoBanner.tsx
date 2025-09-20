import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

interface PromoBannerProps {
  imageUrl: string;
  onPress?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  imageUrl,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="mx-4 mt-6 mb-4 rounded-2xl overflow-hidden shadow-md"
    activeOpacity={0.9}>
    <Image
      source={{uri: imageUrl}}
      className="w-full h-44"
      resizeMode="cover"
    />

    {/* Optional overlay text */}
    <View className="absolute bottom-0 left-0 right-0 bg-black/30 p-3">
      <Text className="text-white font-bold text-lg">Special Offer</Text>
      <Text className="text-white text-sm">Ride more, save more 🚲</Text>
    </View>
  </TouchableOpacity>
);
