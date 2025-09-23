import React from "react";
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import {useTheme} from "@/contexts/ThemeContext";

interface LocationDropdownProps {
  visible: boolean;
  locations: string[];
  onSelect: (location: string) => void;
  onClose: () => void;
}

const {height} = Dimensions.get("window");

const LocationDropdown: React.FC<LocationDropdownProps> = ({
  visible,
  locations,
  onSelect,
  onClose,
}) => {
  const {theme} = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <View
            className="bg-card rounded-t-xl p-4"
            style={{maxHeight: height * 0.4, ...theme.shadow}}>
            <FlatList
              data={locations}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  className="py-3 border-b"
                  style={{borderBottomColor: theme.border}}
                  onPress={() => onSelect(item)}>
                  <Text className="text-base" style={{color: theme.text}}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default LocationDropdown;
