import {useTheme} from "@/contexts/ThemeContext";
import React, {FC} from "react";
import {Image, Text, View} from "react-native";

const Header: FC = () => {
  const {theme} = useTheme();

  return (
    <View
      className="p-4 border-b"
      style={{backgroundColor: theme.card, borderBottomColor: theme.border}}>
      <View className="flex-row items-center justify-between">
        {/* Logo */}
        <Image
          source={{uri: "https://dummyimage.com/100x40/000/fff&text=Wheel"}}
          className="w-24 h-10"
          resizeMode="contain"
        />

        {/* Subtitle / Info */}
        <Text className="text-xs font-semibold" style={{color: theme.subText}}>
          MONTHLY RENTAL SUBSCRIPTION
        </Text>
      </View>
    </View>
  );
};

export default Header;
