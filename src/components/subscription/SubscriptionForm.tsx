import {useTheme} from "@/contexts/ThemeContext";
import Slider from "@react-native-community/slider";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, {FC} from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface SubscriptionFormProps {
  duration: number;
  setDuration: (value: number) => void;
}

const SubscriptionForm: FC<SubscriptionFormProps> = ({
  duration,
  setDuration,
}) => {
  const {theme} = useTheme();

  return (
    <View
      className="rounded-2xl p-6 mt-4 shadow-md"
      style={{backgroundColor: theme.card}}>
      <Text
        className="text-xl font-bold text-center mb-6"
        style={{color: theme.text}}>
        Start your subscription now!
      </Text>

      {/* Start Date & Time */}
      <View className="flex-row gap-4 mb-6">
        {["Select Date", "Select Time"].map((label, idx) => (
          <TouchableOpacity
            key={label}
            className="flex-1 flex-row items-center px-3 py-4 rounded-xl"
            style={{
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
            }}>
            <Ionicons
              name={idx === 0 ? "calendar-outline" : "time-outline"}
              size={20}
              color={theme.subText}
            />
            <Text className="ml-2" style={{color: theme.subText}}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Duration */}
      <Text
        className="text-base font-semibold mb-3"
        style={{color: theme.text}}>
        Duration
      </Text>
      <View
        className="rounded-xl p-4 mb-6"
        style={{
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
        }}>
        <Text
          className="text-lg text-center font-bold mb-2"
          style={{color: theme.text}}>
          {duration} {duration === 1 ? "month" : "months"}
        </Text>
        <Slider
          style={{width: "100%", height: 40}}
          minimumValue={1}
          maximumValue={12}
          step={1}
          value={duration}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.subText}
          thumbTintColor={theme.primary}
          onValueChange={setDuration}
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        className="py-4 rounded-xl items-center shadow-md"
        style={{backgroundColor: theme.primary}}>
        <Text
          className="font-extrabold text-lg tracking-wide"
          style={{color: theme.onPrimary}}>
          Start Subscription
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionForm;
