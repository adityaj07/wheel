import {IMAGES} from "@/assets/images";
import Icon from "@/components/common/Icon";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {FC, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

type RootStackParamList = {
  [ROUTES.PHONE_NUMBER]: undefined;
  [ROUTES.OTP]: {
    sessionId: string;
    phone: string;
    isLogin?: boolean;
  };
  [ROUTES.HOME]: undefined;
};

type PhoneNumberScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Phone"
>;

const PhoneNumberScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {theme} = useTheme();
  const navigation = useNavigation<PhoneNumberScreenNavigationProps>();

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: theme.bg}}>
      {/* Header Section */}
      <View className="items-center">
        <Image
          source={IMAGES.phoneNumberScreenHeader}
          className="w-full h-64 rounded-b-3xl mb-16"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent"]}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View className="absolute top-8 left-6">
          <Text
            className="text-2xl font-extrabold tracking-wide"
            style={{color: theme.text}}>
            RENTING DREAMS
          </Text>
          <Text
            className="text-sm font-medium mt-1"
            style={{color: theme.primary}}>
            Since 2025
          </Text>
        </View>
        <TouchableOpacity
          className="absolute top-6 right-6"
          onPress={() => navigation.goBack()}>
          <Text style={{color: theme.text, fontSize: 28}}>
            <Icon type="ion" name="close" color={theme.text} />
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body Section */}
      <View className="flex-1 px-6 pt-6">
        <Text
          className="text-3xl font-bold mb-2 text-center"
          style={{color: theme.text}}>
          Mobility for Everyone
        </Text>
        <Text
          className="text-base mb-8 text-center"
          style={{color: theme.subText}}>
          {isLogin ? "Welcome back! Please login" : "Create a new account"}
        </Text>

        {/* Phone Input */}
        <View className="w-full mb-5">
          <View
            className="flex-row items-center rounded-2xl p-4 shadow-sm"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
              borderWidth: 1,
            }}>
            <Image
              source={{uri: "https://flagcdn.com/w20/in.png"}}
              className="w-6 h-4 mr-2"
              resizeMode="contain"
            />
            <Text
              style={{color: theme.subText, marginRight: 8, fontWeight: "500"}}>
              +91
            </Text>
            <TextInput
              className="flex-1 text-lg"
              placeholder="Enter phone number"
              placeholderTextColor={theme.placeholder}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{color: theme.text}}
            />
          </View>
        </View>

        {error && (
          <Text
            className="text-sm mb-4 text-center"
            style={{color: theme.error}}>
            {error}
          </Text>
        )}

        {/* Get OTP Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full rounded-2xl mb-6 overflow-hidden">
          <LinearGradient
            colors={[theme.primary, theme.primaryDark || theme.primary]}
            className="py-4 rounded-2xl">
            <Text
              className="text-center font-bold text-lg tracking-wide"
              style={{color: theme.onPrimary}}>
              GET OTP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Toggle Login/Signup */}
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mb-4">
          <Text
            className="text-sm text-center font-medium"
            style={{color: theme.primary}}>
            {isLogin
              ? "New here? Signup instead"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text
          className="text-xs text-center mt-2 leading-5"
          style={{color: theme.subText}}>
          By continuing, you agree to our{" "}
          <Text style={{color: theme.primary}}>Terms & Conditions</Text> and{" "}
          <Text style={{color: theme.primary}}>Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
