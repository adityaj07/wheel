import {IMAGES} from "@/assets/images";
import {useTheme} from "@/contexts/ThemeContext";
import React from "react";
import {Image, StatusBar, Text, View} from "react-native";

const SplashScreen = () => {
  const {theme} = useTheme();

  return (
    <View className="flex-1 relative" style={{backgroundColor: theme.bg}}>
      <StatusBar barStyle="light-content" />

      {/* Center Logo */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={IMAGES.wheelLogo}
          className="w-40 h-40"
          resizeMode="contain"
        />

        {/* Brand Text */}
        <Text
          className="mt-8 text-4xl font-extrabold tracking-[0.25em]"
          style={{color: theme.text}}>
          WHEEL
        </Text>
        <Text className="mt-3 text-base" style={{color: theme.subText}}>
          Renting Dreams Since 2025
        </Text>
      </View>

      {/* Footer */}
      <View className="absolute bottom-12 left-0 right-0 items-center">
        <Text
          className="text-xs tracking-widest"
          style={{color: theme.subText}}>
          Powered by Otterr Studios 🦦
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
