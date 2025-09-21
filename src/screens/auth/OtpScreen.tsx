import {OtpInput} from "@/components/auth/OtpInput";
import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const OtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-white px-6 items-center justify-center">
      <Text className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</Text>
      <Text className="text-gray-500 text-center mb-10">
        Enter the 6-digit code sent to your phone number
      </Text>

      <OtpInput value={otp} onChange={setOtp} />

      {error && <Text className="text-red-500 mt-4">{error}</Text>}

      <TouchableOpacity
        className="mt-10 w-full max-w-xs"
        activeOpacity={0.8}
        onPress={() => {}}>
        <LinearGradient
          colors={["#facc15", "#f59e0b"]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
          }}>
          <Text className="text-white text-lg font-semibold">Verify</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Resend OTP */}
      <TouchableOpacity className="mt-6">
        <Text className="text-blue-500 text-sm font-medium">
          Didn’t receive OTP? Resend
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpScreen;
