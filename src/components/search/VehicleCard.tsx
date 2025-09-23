import {useTheme} from "@/contexts/ThemeContext";
import {Vehicle} from "@/types/vehicle";
import React, {useState} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import LocationDropdown from "./LocationDropdown";

interface Props {
  vehicle: Vehicle;
  onBook: (vehicle: Vehicle, location: string) => void;
}

const VehicleCard: React.FC<Props> = ({vehicle, onBook}) => {
  const {theme} = useTheme();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(
    vehicle.locations[0] || "",
  );

  const isSoldOut = () =>
    !selectedLocation || !vehicle.availability[selectedLocation];

  return (
    <View
      className="mb-4 rounded-2xl overflow-hidden"
      style={{backgroundColor: theme.card, ...theme.shadow}}>
      <Image
        source={{
          uri:
            vehicle.imageUrl ||
            "https://d3vp2rl7047vsp.cloudfront/businesses/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
        }}
        className="w-full h-44"
        resizeMode="contain"
      />
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-900">
          {vehicle.name}
        </Text>
        <Text className="text-xs text-gray-500 mt-1">
          {vehicle.calculatedIncludedKm} km included
        </Text>

        <TouchableOpacity
          className="mt-3 px-3 py-2 border rounded-xl flex-row justify-between items-center"
          style={{borderColor: theme.border}}
          onPress={() => setDropdownVisible(true)}>
          <Text className="text-gray-900">
            {selectedLocation || "Select Location"}
          </Text>
          <Text className="text-gray-400">▼</Text>
        </TouchableOpacity>

        <LocationDropdown
          visible={dropdownVisible}
          locations={vehicle.locations}
          onSelect={location => {
            setSelectedLocation(location);
            setDropdownVisible(false);
          }}
          onClose={() => setDropdownVisible(false)}
        />
      </View>

      <View
        className="flex-row justify-between items-center p-4 border-t"
        style={{borderColor: theme.border}}>
        <Text className="text-base font-bold text-gray-900">
          ₹ {vehicle.calculatedPrice}.00
        </Text>
        {isSoldOut() && (
          <Text className="text-red-500 font-semibold">Sold Out</Text>
        )}
        <TouchableOpacity
          disabled={isSoldOut()}
          className="px-5 py-2 rounded-full"
          style={{
            backgroundColor: theme.primary,
            opacity: isSoldOut() ? 0.5 : 1,
          }}
          onPress={() => onBook(vehicle, selectedLocation)}>
          <Text className="text-white font-semibold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleCard;
