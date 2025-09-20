import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface DateTimePickerProps {
  label: string;
  dateValue: string | null;
  timeValue: string | null;
  onDatePress: () => void;
  onTimePress: () => void;
  formatDate: (date: string | null) => string;
  formatTime: (time: string | null) => string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  dateValue,
  timeValue,
  onDatePress,
  onTimePress,
  formatDate,
  formatTime,
}) => (
  <View className="mb-4">
    <Text className="font-semibold mb-2">{label}</Text>
    <View className="flex-row gap-2">
      <TouchableOpacity
        onPress={onDatePress}
        className="flex-1 flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white"
        accessibilityLabel={`Select ${label.toLowerCase()} date`}
        accessibilityRole="button">
        <Ionicons name="calendar-outline" size={18} color="gray" />
        <Text className="ml-2 text-sm text-gray-700">
          {formatDate(dateValue)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTimePress}
        className="flex-1 flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white"
        accessibilityLabel={`Select ${label.toLowerCase()} time`}
        accessibilityRole="button">
        <Ionicons name="time-outline" size={18} color="gray" />
        <Text className="ml-2 text-sm text-gray-700">
          {formatTime(timeValue)}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
