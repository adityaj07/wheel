import React, {type FC} from "react";
import {View, Text, Image} from "react-native";

const Banner: FC = () => {
  return (
    <View className="relative items-center mt-4">
      <Image
        source={{
          uri: "https://dummyimage.com/400x200/ffc107/000&text=Bike+Delivery",
        }}
        className="w-full h-48 rounded-lg"
        resizeMode="cover"
      />
      <Text className="absolute bottom-2 right-4 bg-yellow-400 px-2 py-1 rounded-md text-black font-bold text-sm">
        DOORSTEP DELIVERY
      </Text>
    </View>
  );
};

export default Banner;
