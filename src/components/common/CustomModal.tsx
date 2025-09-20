import React from "react";
import {Modal, View, TouchableOpacity} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  transparent?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  transparent = true,
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
        <View className="bg-white rounded-xl p-4 w-11/12 mx-4">{children}</View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);
