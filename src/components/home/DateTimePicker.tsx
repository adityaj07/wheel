import {useTheme} from "@/contexts/ThemeContext";
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
}) => {
  const {theme} = useTheme();

  return (
    <View className="mb-4">
      <Text className="font-semibold mb-2" style={{color: theme.subText}}>
        {label}
      </Text>
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={onDatePress}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: theme.surface,
          }}
          accessibilityLabel={`Select ${label.toLowerCase()} date`}
          accessibilityRole="button"
          activeOpacity={0.8}>
          <Ionicons name="calendar-outline" size={18} color={theme.subText} />
          <Text style={{marginLeft: 8, color: theme.text, fontSize: 14}}>
            {formatDate(dateValue)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onTimePress}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: theme.surface,
          }}
          accessibilityLabel={`Select ${label.toLowerCase()} time`}
          accessibilityRole="button"
          activeOpacity={0.8}>
          <Ionicons name="time-outline" size={18} color={theme.subText} />
          <Text style={{marginLeft: 8, color: theme.text, fontSize: 14}}>
            {formatTime(timeValue)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
