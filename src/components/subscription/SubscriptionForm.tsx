import Slider from "@react-native-community/slider";
import Ionicons from "@react-native-vector-icons/ionicons";
import React, {type FC} from "react";
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
    <View className="p-4 flex-1">
      <Text className="text-lg font-bold text-center mb-6">
        Start your subscription now!
      </Text>

      {/* Start Date and Time */}
      <View className="flex-row gap-4 mb-6">
        <TouchableOpacity className="flex-1 flex-row items-center border border-gray-300 rounded-lg px-3 py-3">
          <Ionicons name="calendar-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-500">Select Date</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 flex-row items-center border border-gray-300 rounded-lg px-3 py-3">
          <Ionicons name="time-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-500">Select Time</Text>
        </TouchableOpacity>
      </View>

      {/* Duration */}
      <Text className="text-base font-semibold mb-3">Duration</Text>
      <View className="border border-gray-300 rounded-lg p-4 mb-6">
        <Text className="text-lg text-center font-semibold mb-2">
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

      {/* Start Subscription Button */}
      <TouchableOpacity className="bg-yellow-400 py-3 rounded-lg items-center">
        <Text className="font-bold text-black text-lg">START SUBSCRIPTION</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubscriptionForm;
