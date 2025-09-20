import React from "react";
import {Image, TouchableOpacity, View} from "react-native";

interface PromoBannerProps {
  imageUrl: string;
  onPress?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  imageUrl,
  onPress,
}) => (
  <View className="mt-6 px-4">
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl shadow-md overflow-hidden"
      disabled={!onPress}>
      <Image
        source={{uri: imageUrl}}
        className="w-full h-52"
        resizeMode="contain"
      />
    </TouchableOpacity>
  </View>
);
