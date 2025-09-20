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
  return (
    <View className="bg-white p-6 rounded-2xl mt-4 shadow-md">
      <Text className="text-xl font-bold text-center mb-6 text-gray-800">
        Start your subscription now!
      </Text>

      {/* Start Date and Time */}
      <View className="flex-row gap-4 mb-6">
        <TouchableOpacity className="flex-1 flex-row items-center border border-gray-300 rounded-xl px-3 py-4 bg-gray-50">
          <Ionicons name="calendar-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600">Select Date</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row items-center border border-gray-300 rounded-xl px-3 py-4 bg-gray-50">
          <Ionicons name="time-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-600">Select Time</Text>
        </TouchableOpacity>
      </View>

      {/* Duration */}
      <Text className="text-base font-semibold mb-3 text-gray-800">
        Duration
      </Text>
      <View className="border border-gray-200 rounded-xl p-4 mb-6 bg-gray-50">
        <Text className="text-lg text-center font-bold mb-2 text-gray-700">
          {duration} {duration === 1 ? "month" : "months"}
        </Text>

        <Slider
          style={{width: "100%", height: 40}}
          minimumValue={1}
          maximumValue={12}
          step={1}
          value={duration}
          minimumTrackTintColor="#facc15"
          maximumTrackTintColor="#d1d5db"
          thumbTintColor="#facc15"
          onValueChange={setDuration}
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.9}
        className="bg-yellow-400 py-4 rounded-xl items-center shadow-md">
        <Text className="font-extrabold text-black text-lg tracking-wide">
          Start Subscription
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionForm;
