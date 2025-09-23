import {useTheme} from "@/contexts/ThemeContext";
import {BikeModel} from "@/types/home";
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

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
}) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className={`${width} mr-4 rounded-2xl`}
      accessibilityLabel={`View details for ${bike.name}`}
      accessibilityRole="button">
      <View
        style={[
          {
            backgroundColor: theme.card,
            borderRadius: 16,
          },
          showShadow ? theme.shadow : {},
        ]}>
        <Image
          source={{uri: bike.imageUrl}}
          className="w-full h-32 rounded-t-2xl"
          resizeMode="cover"
        />
        <Text
          className="text-center font-semibold mt-3 mb-4 px-2"
          style={{color: theme.text}}>
          {bike.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
