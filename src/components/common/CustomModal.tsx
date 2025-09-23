import {useTheme} from "@/contexts/ThemeContext";
import {cn} from "@/utils/cn";
import React from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  transparent?: boolean;
  className?: string;
  header?: string | React.ReactNode | null;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  transparent = true,
  className,
  header = null,
}) => {
  const {theme} = useTheme();

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType="fade"
      onRequestClose={onClose}>
      {/* Overlay */}
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        activeOpacity={1}
        onPress={onClose}>
        {/* Modal container */}
        <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
          <View
            className={cn("rounded-xl p-4 w-11/12 mx-4", className)}
            style={{
              backgroundColor: theme.surface,
              ...(theme.shadow || {}),
            }}>
            {header &&
              (typeof header === "string" ? (
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 18,
                    fontWeight: "600",
                    marginBottom: 8,
                  }}>
                  {header}
                </Text>
              ) : (
                header
              ))}

            {children}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
