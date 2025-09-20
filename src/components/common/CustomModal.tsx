import {cn} from "@/lib/utils";
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
}) => (
  <Modal
    visible={visible}
    transparent={transparent}
    animationType="fade"
    onRequestClose={onClose}>
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      activeOpacity={1}
      onPress={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={e => e.stopPropagation()}>
        <View className={cn("bg-white rounded-xl p-4 w-11/12 mx-4", className)}>
          {header &&
            (typeof header === "string" ? (
              <Text className="text-lg font-semibold mb-2">{header}</Text>
            ) : (
              header
            ))}
          {children}
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);
