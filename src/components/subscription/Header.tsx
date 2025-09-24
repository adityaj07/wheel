import {IMAGES} from "@/assets/images";
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
        <View className="flex flex-row justify-between items-center max-w-16">
          <Image
            source={IMAGES.wheelLogo}
            className="w-12 h-10"
            resizeMode="contain"
          />
          <Text className="text-lg" style={{color: theme.text}}>
            Wheel
          </Text>
        </View>

        {/* Subtitle / Info */}
        <Text className="text-xs font-semibold" style={{color: theme.subText}}>
          MONTHLY RENTAL SUBSCRIPTION
        </Text>
      </View>
    </View>
  );
};

export default Header;
