import {useTheme} from "@/contexts/ThemeContext";
import {Vehicle} from "@/types/vehicle";
import {useState, type FC} from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "../common/Icon";

interface SearchOverlayProps {
  visible: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  onSelect: (model: string) => void;
}

const SearchOverlay: FC<SearchOverlayProps> = ({
  visible,
  onClose,
  onSelect,
  vehicles,
}) => {
  const {theme} = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const popularVehicles = vehicles.slice(0, 6);

  const filteredVehicles = vehicles
    .map(v => v.name)
    .filter(name => name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback>
        <View className="flex-1 bg-white mt-10 p-5 rounded-t-2xl">
          <View className="flex-row justify-between items-center mb-4">
            <TextInput
              placeholder="Search models..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 border border-gray-300 rounded p-3"
            />
            <TouchableOpacity onPress={onClose} className="ml-4">
              <Icon type="ion" name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {searchQuery.length === 0 && (
            <View>
              <Text className="text-lg font-semibold mb-4">
                Popular Vehicles
              </Text>
              <View className="flex-row justify-between mb-4">
                {popularVehicles.slice(0, 3).map((v, i) => (
                  <TouchableOpacity
                    key={i}
                    className="w-1/3 p-2"
                    onPress={() => onSelect(v.name)}>
                    <Image
                      source={{uri: v.imageUrl}}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                    <Text className="text-center mt-2 text-sm font-medium">
                      {v.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View className="flex-row justify-between">
                {popularVehicles.slice(3, 6).map((v, i) => (
                  <TouchableOpacity
                    key={i}
                    className="w-1/3 p-2"
                    onPress={() => onSelect(v.name)}>
                    <Image
                      source={{uri: v.imageUrl}}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                    <Text className="text-center mt-2 text-sm font-medium">
                      {v.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {searchQuery.length > 0 && (
            <FlatList
              data={filteredVehicles}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-200"
                  onPress={() => onSelect(item)}>
                  <Text className="text-gray-900 text-base">{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SearchOverlay;
