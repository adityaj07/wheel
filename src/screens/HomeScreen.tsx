import {CustomModal} from "@/components/common/CustomModal";
import {BookingForm} from "@/components/home/BookingForm";
import {Header} from "@/components/home/Header";
import {HorizontalBikeList} from "@/components/home/HorizontalBikeList";
import {PromoBanner} from "@/components/home/PromoBanner";
import {SectionHeader} from "@/components/home/SectionHeader";
import {BIKE_CATEGORIES, TOP_PICKS} from "@/constants/home";
import {useBooking} from "@/hooks/useBooking";
import {BikeModel} from "@/types/home";
import Ionicons from "@react-native-vector-icons/ionicons";
import {useNavigation} from "@react-navigation/native";
import React, {useCallback} from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Calendar} from "react-native-calendars";
import {SafeAreaView} from "react-native-safe-area-context";

const HomeScreen = () => {
  const navigation = useNavigation();
  const {
    bookingData,
    modals,
    updateBookingData,
    toggleModal,
    isSearchDisabled,
    pickupTimeSlots,
    dropoffTimeSlots,
  } = useBooking();

  const handleLocationPress = useCallback(() => {
    // Navigate to location selection screen
    Alert.alert("Location", "Location selection coming soon!");
  }, []);

  const handleOffersPress = useCallback(() => {
    // Navigate to offers screen
    Alert.alert("Offers", "Offers screen coming soon!");
  }, []);

  const handleSearch = useCallback(() => {
    if (isSearchDisabled) return;

    // Navigate to search results or perform search
    console.log("Searching with data:", bookingData);
    Alert.alert("Search", "Searching for available bikes...");
  }, [bookingData, isSearchDisabled]);

  const handleBikePress = useCallback((bike: BikeModel) => {
    console.log("Bike selected:", bike);
    Alert.alert("Bike Selected", `You selected ${bike.name}`);
  }, []);

  const handleCategoryPress = useCallback((category: any) => {
    console.log("Category selected:", category);
    Alert.alert("Category", `You selected ${category.name}`);
  }, []);

  const handleViewAllPress = useCallback(() => {
    Alert.alert("View All", "View all bikes coming soon!");
  }, []);

  const handlePromoPress = useCallback(() => {
    Alert.alert("Promo", "Promo details coming soon!");
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        location="Mira-Bhayandar"
        onLocationPress={handleLocationPress}
        onOffersPress={handleOffersPress}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <BookingForm
          bookingData={bookingData}
          onPickupDatePress={() => toggleModal("showPickupDate", true)}
          onPickupTimePress={() => toggleModal("showPickupTime", true)}
          onDropoffDatePress={() => toggleModal("showDropoffDate", true)}
          onDropoffTimePress={() => toggleModal("showDropoffTime", true)}
          onSearch={handleSearch}
          isSearchDisabled={isSearchDisabled}
        />

        <HorizontalBikeList
          bikes={BIKE_CATEGORIES}
          onBikePress={handleCategoryPress}
          cardWidth="w-48 mt-8"
          showShadow={false}
        />

        <PromoBanner
          imageUrl="https://d36g7qg6pk2cm7.cloudfront.net/assets/RBX-offer-194940429645abdee50c6e6711844bb4c8554a72c9c46a339ce202888c57e5d9.jpg"
          onPress={handlePromoPress}
        />

        <SectionHeader
          title="User's Top Picks"
          actionText="VIEW ALL"
          onActionPress={handleViewAllPress}
        />

        <HorizontalBikeList
          bikes={TOP_PICKS}
          onBikePress={handleBikePress}
          cardWidth="w-40"
          showShadow={true}
        />
      </ScrollView>

      {/* Modals */}
      {/* Pickup Date Modal */}
      <CustomModal
        visible={modals.showPickupDate}
        onClose={() => toggleModal("showPickupDate", false)}
        header={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Pick up date</Text>
            <TouchableOpacity
              onPress={() => toggleModal("showPickupDate", false)}>
              <Ionicons name="close" size={20} />
            </TouchableOpacity>
          </View>
        }>
        <Calendar
          onDayPress={day => {
            updateBookingData({pickupDate: day.dateString});
            toggleModal("showPickupDate", false);
          }}
          markedDates={{
            [bookingData.pickupDate || ""]: {
              selected: true,
              selectedColor: "#FFD700",
            },
          }}
          minDate={new Date().toISOString().split("T")[0]}
        />
      </CustomModal>

      {/* Drop off date Modal */}
      <CustomModal
        visible={modals.showDropoffDate}
        onClose={() => toggleModal("showDropoffDate", false)}
        header={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Drop off date</Text>
            <TouchableOpacity
              onPress={() => toggleModal("showDropoffDate", false)}>
              <Ionicons name="close" size={20} />
            </TouchableOpacity>
          </View>
        }>
        <Calendar
          onDayPress={day => {
            updateBookingData({dropoffDate: day.dateString});
            toggleModal("showDropoffDate", false);
          }}
          markedDates={{
            [bookingData.dropoffDate || ""]: {
              selected: true,
              selectedColor: "#FFD700",
            },
          }}
          minDate={
            bookingData.pickupDate || new Date().toISOString().split("T")[0]
          }
        />
      </CustomModal>

      {/* Pick up Time Modal */}
      <CustomModal
        visible={modals.showPickupTime}
        onClose={() => toggleModal("showPickupTime", false)}
        className="max-h-80 min-w-[80%]"
        header={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Pick up time</Text>
            <TouchableOpacity
              onPress={() => toggleModal("showPickupTime", false)}>
              <Ionicons name="close" size={20} />
            </TouchableOpacity>
          </View>
        }>
        <FlatList
          data={pickupTimeSlots}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              className="px-4 py-3 border-b border-gray-100"
              onPress={() => {
                updateBookingData({pickupTime: item.value});
                toggleModal("showPickupTime", false);
              }}>
              <Text
                className={`text-base ${item.disabled ? "text-gray-400" : "text-black"}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </CustomModal>

      {/* Drop off time modal */}
      <CustomModal
        visible={modals.showDropoffTime}
        onClose={() => toggleModal("showDropoffTime", false)}
        className="max-h-80 min-w-[80%]"
        header={
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Select Drop off time</Text>
            <TouchableOpacity
              onPress={() => toggleModal("showDropoffTime", false)}>
              <Ionicons name="close" size={20} />
            </TouchableOpacity>
          </View>
        }>
        <FlatList
          data={dropoffTimeSlots}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              className="px-4 py-3 border-b border-gray-100"
              disabled={item.disabled}
              onPress={() => {
                if (item.disabled) return;
                updateBookingData({dropoffTime: item.value});
                toggleModal("showDropoffTime", false);
              }}>
              <Text
                className={`text-base ${item.disabled ? "text-gray-400" : "text-black"}`}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </CustomModal>
    </SafeAreaView>
  );
};

export default HomeScreen;
