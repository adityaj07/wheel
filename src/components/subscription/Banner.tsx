import {useTheme} from "@/contexts/ThemeContext";
import React, {FC} from "react";
import {Image, Text, View} from "react-native";

const Banner: FC = () => {
  const {theme} = useTheme();

  return (
    <View className="relative mt-6 rounded-2xl overflow-hidden shadow-md">
      <Image
        source={{
          uri: "https://dummyimage.com/600x300/000/fff&text=Your+Bike+Awaits",
        }}
        className="w-full h-48"
        resizeMode="cover"
      />
      {/* Overlay */}
      <View
        className="absolute inset-0"
        style={{backgroundColor: "rgba(0,0,0,0.25)"}}
      />
      {/* Badge */}
      <Text
        className="absolute bottom-4 left-4 px-3 py-1 rounded-full font-bold text-sm shadow-md"
        style={{
          backgroundColor: theme.primary,
          color: theme.onPrimary,
        }}>
        🚴 Doorstep Delivery
      </Text>
    </View>
  );
};

export default Banner;
