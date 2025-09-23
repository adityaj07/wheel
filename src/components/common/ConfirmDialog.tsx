import {useTheme} from "@/contexts/ThemeContext";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {CustomModal} from "./CustomModal";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const {theme} = useTheme();

  return (
    <CustomModal visible={visible} onClose={onCancel}>
      <View className="p-3">
        <Text
          className="text-xl font-semibold mb-2"
          style={{color: theme.text}}>
          {title}
        </Text>
        {description && (
          <Text className="text-lg mb-4" style={{color: theme.subText}}>
            {description}
          </Text>
        )}
        <View className="flex-row justify-end gap-4">
          <TouchableOpacity
            className="px-6 py-3 rounded-md"
            style={{backgroundColor: theme.border}}
            onPress={onCancel}>
            <Text style={{color: theme.text, fontWeight: "600"}}>
              {cancelText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-6 py-3 rounded-md"
            style={{backgroundColor: theme.primary}}
            onPress={onConfirm}>
            <Text style={{color: theme.text, fontWeight: "600"}}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};
