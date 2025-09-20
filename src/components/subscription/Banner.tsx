import React, {FC} from "react";
import {Image, Text, View} from "react-native";

const Banner: FC = () => {
  return (
    <View className="relative mt-6 rounded-2xl overflow-hidden shadow-lg">
      <Image
        source={{
          uri: "https://dummyimage.com/600x300/000/fff&text=Your+Bike+Awaits",
        }}
        className="w-full h-48"
        resizeMode="cover"
      />
      {/* Overlay Gradient */}
      <View className="absolute inset-0 bg-black/30" />
      {/* Text Badge */}
      <Text className="absolute bottom-3 left-4 bg-yellow-400 px-3 py-1 rounded-full text-black font-bold text-sm shadow-md">
        🚴 Doorstep Delivery
      </Text>
    </View>
  );
};

export default Banner;
