import Ionicons from "@react-native-vector-icons/ionicons";
import React, {type FC} from "react";
import {Text, TouchableOpacity, View} from "react-native";

const BottomNavigation: FC = () => {
  return (
    <View className="border-t border-gray-200 flex-row justify-around py-2 bg-white">
      <TouchableOpacity className="items-center">
        <Ionicons name="home-outline" size={20} color="gray" />
        <Text className="text-xs text-gray-600">HOME</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Ionicons name="pricetags-outline" size={20} color="gray" />
        <Text className="text-xs text-gray-600">TARIFFS</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Ionicons name="card-outline" size={20} color="#facc15" />
        <Text className="text-xs font-bold text-yellow-500">SUBSCRIPTION</Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Ionicons name="menu-outline" size={20} color="gray" />
        <Text className="text-xs text-gray-600">MENU</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
