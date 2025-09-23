import {useTheme} from "@/contexts/ThemeContext";
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

interface PromoBannerProps {
  imageUrl: string;
  onPress?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  imageUrl,
  onPress,
}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mx-4 mt-6 mb-4 rounded-2xl overflow-hidden"
      activeOpacity={0.9}
      style={theme.shadow}>
      <Image
        source={{uri: imageUrl}}
        className="w-full h-44"
        resizeMode="cover"
      />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          padding: 12,
        }}>
        <Text style={{color: theme.text, fontWeight: "700", fontSize: 18}}>
          Special Offer
        </Text>
        <Text style={{color: theme.text, fontSize: 14}}>
          Ride more, save more 🚲
        </Text>
      </View>
    </TouchableOpacity>
  );
};
