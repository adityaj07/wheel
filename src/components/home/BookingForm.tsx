import {useTheme} from "@/contexts/ThemeContext";
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
}) => {
  const {theme} = useTheme();

  return (
    <View className="mt-6">
      <Text
        className="text-2xl font-extrabold mb-4"
        style={{color: theme.text}}>
        Book now, Ride Anywhere
      </Text>

      <View
        style={[
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            borderRadius: 20,
            padding: 16,
          },
          theme.shadow,
        ]}>
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
          style={{
            marginTop: 16,
            paddingVertical: 14,
            borderRadius: 999,
            backgroundColor: isSearchDisabled
              ? theme.primaryDark + "66"
              : theme.primary,
          }}
          accessibilityLabel="Search for available bikes"
          accessibilityRole="button"
          activeOpacity={0.8}>
          <Text
            className="text-center font-bold text-lg tracking-wide"
            style={{color: theme.onPrimary}}>
            SEARCH
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
