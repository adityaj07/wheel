import {useTheme} from "@/contexts/ThemeContext";
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
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
      }}>
      <Text style={{fontSize: 20, fontWeight: "700", color: theme.text}}>
        {title}
      </Text>
      {actionText && onActionPress && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text style={{fontSize: 14, fontWeight: "600", color: theme.primary}}>
            {actionText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
