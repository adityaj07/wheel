import {IMAGES} from "@/assets/images";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React from "react";
import {Image, StatusBar, Text, TouchableOpacity, View} from "react-native";

type RootStackParamList = {
  Phone: undefined;
  Login: undefined;
};

type ChooseLoginSignupScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "Phone"
>;

const ChooseLoginSignupScreen = () => {
  const navigation = useNavigation<ChooseLoginSignupScreenProp>();
  const {theme} = useTheme();

  return (
    <View className="flex-1 px-6" style={{backgroundColor: theme.bg}}>
      <StatusBar
        barStyle={theme.text === "#111" ? "dark-content" : "light-content"}
      />

      {/* Logo */}
      <View className="flex-row justify-center mt-20 mb-12 bg-white p-4 rounded-full w-32 h-32 mx-auto shadow-lg">
        <Image
          source={IMAGES.wheelLogo}
          className="w-24 h-24"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text
        className="text-3xl font-bold text-center mb-2"
        style={{color: theme.text}}>
        Welcome to Wheel
      </Text>

      {/* Subtitle */}
      <Text
        className="text-center mb-10 text-base leading-relaxed"
        style={{color: theme.subText}}>
        Choose how you want to continue
      </Text>

      {/* Buttons */}
      <View className="flex flex-col gap-4">
        {/* Phone Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.PHONE_NUMBER)}
          className="w-full py-4 rounded-xl flex-row justify-center items-center"
          style={{backgroundColor: theme.primary}}>
          <Text className="text-white font-medium text-lg">
            Continue with Phone Number
          </Text>
        </TouchableOpacity>

        {/* Email Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.LOGIN)}
          className="w-full py-4 rounded-xl flex-row justify-center items-center border"
          style={{
            borderColor: theme.border,
            backgroundColor: theme.card,
          }}>
          <Text className="font-medium text-lg" style={{color: theme.text}}>
            Continue with Email
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="absolute bottom-12 left-0 right-0 items-center">
        <Text className="text-xs" style={{color: theme.subText}}>
          Powered by Otterr Studios
        </Text>
      </View>
    </View>
  );
};

export default ChooseLoginSignupScreen;
