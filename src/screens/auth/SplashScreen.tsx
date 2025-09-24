import {IMAGES} from "@/assets/images";
import ROUTES from "@/routes/Routes";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import {Image, StatusBar, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

type RootStackParamList = {
  [ROUTES.CHOOSE_LOGIN_SIGNUP]: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof ROUTES.CHOOSE_LOGIN_SIGNUP
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.CHOOSE_LOGIN_SIGNUP);
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 bg-white relative">
      <StatusBar barStyle="light-content" />

      {/* Background Gradient */}
      <LinearGradient
        colors={["#facc15", "#f59e0b"]}
        className="absolute inset-0"
      />

      {/* Centered Logo */}
      <View className="flex-1 justify-center items-center">
        <View className="bg-white rounded-full p-6 shadow-lg">
          <Image
            source={IMAGES.wheelLogo}
            className="w-36 h-36"
            resizeMode="contain"
          />
        </View>

        <Text className="mt-6 text-2xl font-bold text-white tracking-widest">
          WHEEL
        </Text>
        <Text className="mt-2 text-sm text-white opacity-80">
          Renting Dreams Since 2025
        </Text>
      </View>

      <View className="absolute bottom-12 left-0 right-0 flex-row justify-center">
        <Text className="text-white/80 text-xs">
          Powered by Otterr Studios 🦦
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
