import React, {type FC} from "react";
import {View, Text, Image} from "react-native";

const Header: FC = () => {
  return (
    <View className="p-4 bg-white border-b border-gray-200">
      <View className="flex-row items-center justify-between">
        <Image
          source={{uri: "https://dummyimage.com/100x40/000/fff&text=Wheel"}}
          className="w-24 h-10"
          resizeMode="contain"
        />
        <Text className="text-xs font-semibold text-gray-600">
          MONTHLY RENTAL SUBSCRIPTION
        </Text>
      </View>
    </View>
  );
};

export default Header;
