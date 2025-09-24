import {api} from "@/api";
import Icon from "@/components/common/Icon";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {Vehicle} from "@/types/vehicle";
import {cn} from "@/utils/cn";
import {formatDate, formatTime} from "@/utils/time";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import React, {useEffect, useState} from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {toast} from "sonner-native";

type RootStackParamList = {
  [ROUTES.SEARCH]: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
  };
  [ROUTES.RIDECONFIRMATION]: {
    selectedVehicle: Vehicle;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    location: string;
  };
};

type SeacrhScreenRouteProp = RouteProp<RootStackParamList, "Search">;
type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HEADER_EXPANDED_HEIGHT = 180;
const HEADER_COLLAPSED_HEIGHT = 150;

const SearchScreen = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<{
    [key: string]: string;
  }>({});
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [searchOverlayVisible, setSearchOverlayVisible] =
    useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {width, height} = Dimensions.get("window");

  const scrollY = new Animated.Value(0);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: "clamp",
  });

  const route = useRoute<SeacrhScreenRouteProp>();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const {pickupDate, pickupTime, dropoffDate, dropoffTime} = route.params;

  const {theme} = useTheme();

  const formattedPickupDate = formatDate(pickupDate);
  const formattedDropOffDate = formatDate(dropoffDate);
  const formattedPickupTime = formatTime(pickupTime);
  const formattedDropOffTime = formatTime(dropoffTime);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await api.post("/vehicles/search", {
          startDate: pickupDate,
          endDate: dropoffDate,
          startTime: pickupTime,
          endTime: dropoffTime,
        });

        const fetchedVehicles: Vehicle[] = response.data.data;
        setVehicles(fetchedVehicles);
        setFilteredVehicles(fetchedVehicles);

        const initialLocations = fetchedVehicles.reduce(
          (acc: {[key: string]: string}, vehicle: Vehicle) => {
            acc[vehicle.id] = vehicle.locations[0] || "";
            return acc;
          },
          {},
        );
        setSelectedLocations(initialLocations);
      } catch (error) {
        toast.error("Some error occured", {
          description: "Couldn't fetch the vehicles",
          style: {backgroundColor: theme.error},
        });
        console.log("Error fetching vehicles: ", error);
      }
    };

    if (pickupDate && pickupTime && dropoffDate && dropoffTime) {
      fetchVehicles();
    } else {
      toast.info("Fill in all details", {
        description:
          "Couldn't fetch the vehicles, please fill in all the details",
      });
    }
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  const handleLocationSelect = (vehicleId: string, location: string) => {
    setSelectedLocations(prev => ({
      ...prev,
      [vehicleId]: location,
    }));
    setDropdownVisible(null);
  };

  const renderDropdown = (vehicleId: string, locations: string[]) => (
    <Modal
      transparent
      visible={dropdownVisible === vehicleId}
      animationType="fade"
      onRequestClose={() => setDropdownVisible(null)}>
      <TouchableWithoutFeedback onPress={() => setDropdownVisible(null)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
          }}>
          <View
            style={{
              backgroundColor: theme.card,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 16,
              maxHeight: height * 0.4,
              ...theme.shadow,
            }}>
            <FlatList
              data={locations}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border,
                  }}
                  onPress={() => handleLocationSelect(vehicleId, item)}>
                  <Text style={{fontSize: 16, color: theme.text}}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  // Handle search input focus and selection
  const handleSearchFocus = () => {
    setFilteredVehicles(vehicles);
    setSearchQuery("");
  };

  const handleVehicleSelect = (model: string) => {
    setSearchQuery(model);
    setFilteredVehicles(
      vehicles.filter((vehicle: Vehicle) => vehicle.name === model),
    );
    setSearchOverlayVisible(false);
  };

  // We select the first 6 vehicles for the popular vehicles grid
  const popularVehicles = vehicles.slice(0, 6);

  const isSoldOut = (vehicleId: string, location: string) => {
    const vehicle = vehicles.find((v: Vehicle) => v.id === vehicleId);
    if (!vehicle || !location || !vehicle.availability) return false;
    return !vehicle.availability[location];
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bg}}>
      {/* Header */}
      <Animated.View
        className="rounded-b-3xl"
        style={{
          height: headerHeight,
          backgroundColor: theme.primary,
        }}>
        <View className={cn("flex-row items-center justify-between px-5 py-3")}>
          <Icon
            type="ion"
            name="arrow-back"
            size={24}
            color={theme.text}
            onPress={() => navigation.goBack()}
          />
          <Text style={{color: theme.text, fontSize: 18, fontWeight: "600"}}>
            Rental Bikes
          </Text>
          <Icon
            type="ion"
            name="options-outline"
            size={22}
            color={theme.text}
          />
        </View>

        <View
          style={{
            backgroundColor: theme.card,
            borderRadius: 16,
            padding: 16,
            marginHorizontal: 20,
            ...theme.shadow,
          }}>
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text style={{color: theme.subText, fontSize: 12}}>Pickup</Text>
              <Text
                style={{color: theme.text, fontWeight: "600", fontSize: 14}}>
                {formattedPickupDate} at {formattedPickupTime}
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.border,
                marginHorizontal: 12,
              }}
            />
            <View className="flex-1">
              <Text style={{color: theme.subText, fontSize: 12}}>Dropoff</Text>
              <Text
                style={{color: theme.text, fontWeight: "600", fontSize: 14}}>
                {formattedDropOffDate} at {formattedDropOffTime}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Vehicle cards */}
      <Animated.ScrollView
        contentContainerStyle={{padding: 16, paddingBottom: 120}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(item => (
            <View
              key={item.id}
              style={{
                backgroundColor: theme.card,
                borderRadius: 20,
                marginBottom: 16,
                overflow: "hidden",
                ...theme.shadow,
              }}>
              <Image
                source={{
                  uri:
                    item.imageUrl ||
                    "https://d3vp2rl7047vsp.cloudfront/businesses/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
                }}
                style={{width: "100%", height: 180}}
                resizeMode="contain"
              />

              <View style={{padding: 16}}>
                <Text
                  style={{
                    color: theme.text,
                    fontSize: 16,
                    fontWeight: "600",
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: theme.subText,
                    marginTop: 4,
                    fontSize: 13,
                  }}>
                  {item.calculatedIncludedKm} km included
                </Text>

                {/* Location dropdown */}
                <TouchableOpacity
                  onPress={() => setDropdownVisible(item.id)}
                  style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    marginTop: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Text style={{color: theme.text}}>
                    {selectedLocations[item.id] || "Select Location"}
                  </Text>
                  <Icon
                    type="ion"
                    name="chevron-down"
                    size={18}
                    color={theme.subText}
                  />
                </TouchableOpacity>
                {renderDropdown(item.id, item.locations)}
              </View>

              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: theme.border,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: theme.text,
                  }}>
                  ₹ {item.calculatedPrice}.00
                </Text>
                {selectedLocations[item.id] &&
                  isSoldOut(item.id, selectedLocations[item.id]) && (
                    <Text style={{color: theme.error, fontWeight: "600"}}>
                      Sold Out
                    </Text>
                  )}
                <TouchableOpacity
                  disabled={
                    !selectedLocations[item.id] ||
                    isSoldOut(item.id, selectedLocations[item.id])
                  }
                  style={{
                    backgroundColor: theme.primary,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                    opacity:
                      !selectedLocations[item.id] ||
                      isSoldOut(item.id, selectedLocations[item.id])
                        ? 0.5
                        : 1,
                  }}
                  onPress={() =>
                    navigation.navigate(ROUTES.RIDECONFIRMATION, {
                      selectedVehicle: item,
                      pickupDate,
                      pickupTime,
                      dropoffDate,
                      dropoffTime,
                      location: selectedLocations[item.id],
                    })
                  }>
                  <Text style={{color: theme.onPrimary, fontWeight: "600"}}>
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No vehicles available for this period</Text>
        )}
      </Animated.ScrollView>

      {/* Floating Search Button */}
      <TouchableOpacity
        onPress={() => setSearchOverlayVisible(true)}
        className="absolute bottom-5 left-5 bg-gray-700 flex-row items-center px-4 py-3 rounded-full shadow-lg">
        <Icon type="ion" name="search" size={20} color="white" />
        <Text className="text-white ml-2">Search by Model</Text>
      </TouchableOpacity>

      {/* Floating Filter Button */}
      <TouchableOpacity className="absolute bottom-5 right-5 bg-gray-700 w-12 h-12 rounded-full items-center justify-center shadow-lg">
        <Icon type="fa" name="filter" size={20} color="white" />
      </TouchableOpacity>

      {/* Search Overlay Modal */}
      <Modal
        transparent={true}
        visible={searchOverlayVisible}
        animationType="slide"
        onRequestClose={() => setSearchOverlayVisible(false)}>
        <TouchableWithoutFeedback
          onPress={() => setSearchOverlayVisible(false)}>
          <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.5)"}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  marginTop: 40,
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <View className="flex-row justify-between items-center mb-4">
                  <TextInput
                    placeholder="Search models..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    onFocus={handleSearchFocus}
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      borderRadius: 5,
                      padding: 10,
                      flex: 1,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setSearchOverlayVisible(false)}
                    className="ml-4">
                    <Icon type="ion" name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                {searchQuery.length === 0 && (
                  <View>
                    <Text className="text-lg font-semibold mb-4">
                      Popular Vehicles
                    </Text>
                    {/* First Row */}
                    <View className="flex-row justify-between mb-4">
                      {popularVehicles.map(
                        (vehicle: Vehicle, index: number) =>
                          index < 3 && (
                            <TouchableOpacity
                              key={index}
                              className="w-1/3 p-2"
                              onPress={() => handleVehicleSelect(vehicle.name)}>
                              <Image
                                source={{
                                  uri:
                                    vehicle.imageUrl ||
                                    "https://d3vp2rl7047vsp.cloudfront/businesses/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
                                }}
                                className="w-full h-24 rounded-lg object-cover"
                                resizeMode="contain"
                              />
                              <Text className="text-center mt-2 text-sm font-medium">
                                {vehicle.name}
                              </Text>
                            </TouchableOpacity>
                          ),
                      )}
                    </View>
                    {/* Second Row */}
                    <View className="flex-row justify-between">
                      {popularVehicles.map(
                        (vehicle: Vehicle, index: number) =>
                          index >= 3 &&
                          index < 6 && (
                            <TouchableOpacity
                              key={index}
                              className="w-1/3 p-2"
                              onPress={() => handleVehicleSelect(vehicle.name)}>
                              <Image
                                source={{
                                  uri:
                                    vehicle.imageUrl ||
                                    "https://d3vp2rl7047vsp.cloudfront/businesses/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
                                }}
                                className="w-full h-24 rounded-lg object-cover"
                                resizeMode="cover"
                              />
                              <Text className="text-center mt-2 text-sm font-medium">
                                {vehicle.name}
                              </Text>
                            </TouchableOpacity>
                          ),
                      )}
                    </View>
                  </View>
                )}
                {searchQuery.length > 0 && (
                  <FlatList
                    data={vehicles
                      .map((v: Vehicle) => v.name)
                      .filter((name: string) =>
                        name.toLowerCase().includes(searchQuery.toLowerCase()),
                      )}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={{
                          padding: 15,
                          borderBottomWidth: 1,
                          borderBottomColor: "#eee",
                        }}
                        onPress={() => handleVehicleSelect(item)}>
                        <Text style={{fontSize: 16, color: "#333"}}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default SearchScreen;
