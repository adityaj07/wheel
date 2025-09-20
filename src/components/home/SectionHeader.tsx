import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionPress,
}) => (
  <View className="flex-row items-center justify-between px-4 mt-8 mb-6">
    <Text className="text-lg font-bold">{title}</Text>
    {actionText && onActionPress && (
      <TouchableOpacity onPress={onActionPress}>
        <Text className="text-sm font-semibold text-blue-600">
          {actionText}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);
