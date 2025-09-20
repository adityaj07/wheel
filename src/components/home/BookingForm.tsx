import {BookingData} from "@/types/home";
import {formatDate, formatTime} from "@/utils/time";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {DateTimePicker} from "./DateTimePicker";

interface BookingFormProps {
  bookingData: BookingData;
  onPickupDatePress: () => void;
  onPickupTimePress: () => void;
  onDropoffDatePress: () => void;
  onDropoffTimePress: () => void;
  onSearch: () => void;
  isSearchDisabled?: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  bookingData,
  onPickupDatePress,
  onPickupTimePress,
  onDropoffDatePress,
  onDropoffTimePress,
  onSearch,
  isSearchDisabled = false,
}) => (
  <View className="px-4 mt-6">
    <Text className="text-2xl font-extrabold mb-4 text-gray-900">
      Book now, Ride Anywhere
    </Text>

    <View className="bg-white rounded-2xl shadow-lg border border-yellow-300 p-4">
      <DateTimePicker
        label="Pick up"
        dateValue={bookingData.pickupDate}
        timeValue={bookingData.pickupTime}
        onDatePress={onPickupDatePress}
        onTimePress={onPickupTimePress}
        formatDate={formatDate}
        formatTime={formatTime}
      />

      <DateTimePicker
        label="Drop Off"
        dateValue={bookingData.dropoffDate}
        timeValue={bookingData.dropoffTime}
        onDatePress={onDropoffDatePress}
        onTimePress={onDropoffTimePress}
        formatDate={formatDate}
        formatTime={formatTime}
      />

      <TouchableOpacity
        onPress={onSearch}
        disabled={isSearchDisabled}
        className={`mt-4 py-4 rounded-full ${
          isSearchDisabled ? "bg-yellow-200" : "bg-yellow-400"
        }`}
        accessibilityLabel="Search for available bikes"
        accessibilityRole="button">
        <Text className="text-center text-black font-bold text-lg tracking-wide">
          SEARCH
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);
