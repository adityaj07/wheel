import {IMAGES} from "@/assets/images";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {type FC, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {SafeAreaView} from "react-native-safe-area-context";

type RootStackParamList = {
  PhoneNumber: undefined;
  Otp: {
    sessionId: string;
    phone: string;
    isLogin?: boolean;
  };
  Home: undefined;
};

type PhoneNumberScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "PhoneNumber"
>;

const PhoneNumberScreen: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<PhoneNumberScreenNavigationProps>();

  return (
    <SafeAreaView className="flex-1 bg-white">
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
          <Text className="text-white text-2xl font-extrabold tracking-wide">
            RENTING DREAMS
          </Text>
          <Text className="text-yellow-300 text-sm font-medium mt-1">
            Since 2025
          </Text>
        </View>
        <TouchableOpacity
          className="absolute top-6 right-6"
          onPress={() => navigation.goBack()}>
          <Text className="text-white text-3xl">×</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 pt-6">
        <Text className="text-gray-700 text-3xl font-bold mb-2 text-center">
          Mobility for Everyone
        </Text>
        <Text className="text-gray-500 text-base mb-8 text-center">
          {isLogin ? "Welcome back! Please login" : "Create a new account"}
        </Text>

        <View className="w-full mb-5">
          <View className="flex-row items-center border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
            <Image
              source={{uri: "https://flagcdn.com/w20/in.png"}}
              className="w-6 h-4 mr-2"
              resizeMode="contain"
            />
            <Text className="text-gray-500 mr-2 font-medium">+91</Text>
            <TextInput
              className="flex-1 text-lg"
              placeholder="Enter phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        {error && (
          <Text className="text-red-500 text-sm mb-4 text-center">{error}</Text>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full rounded-2xl mb-6 overflow-hidden">
          <LinearGradient
            colors={["#facc15", "#f59e0b"]}
            className="py-4 rounded-2xl">
            <Text className="text-black text-center font-bold text-lg tracking-wide">
              GET OTP
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="mb-4">
          <Text className="text-blue-500 text-sm text-center font-medium">
            {isLogin
              ? "New here? Signup instead"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-400 text-xs text-center mt-2 leading-5">
          By continuing, you agree to our{" "}
          <Text className="text-blue-500">Terms & Conditions</Text> and{" "}
          <Text className="text-blue-500">Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
