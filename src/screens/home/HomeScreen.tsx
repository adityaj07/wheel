import {CustomModal} from "@/components/common/CustomModal";
import {BookingForm} from "@/components/home/BookingForm";
import {Header} from "@/components/home/Header";
import {HorizontalBikeList} from "@/components/home/HorizontalBikeList";
import {PromoBanner} from "@/components/home/PromoBanner";
import {SectionHeader} from "@/components/home/SectionHeader";
import {BIKE_CATEGORIES, TOP_PICKS} from "@/constants/home";
import {useAuth} from "@/contexts/AuthContext";
import {useTheme} from "@/contexts/ThemeContext";
import {useBooking} from "@/hooks/useBooking";
import ROUTES from "@/routes/Routes";
import type {RootStackParamList} from "@/routes/types";
import {BikeModel} from "@/types/home";
import Ionicons from "@react-native-vector-icons/ionicons";
import {useNavigation} from "@react-navigation/native";
import type {NativeStackNavigationProp} from "@react-navigation/native-stack";
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
import {toast} from "sonner-native";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {
    bookingData,
    modals,
    updateBookingData,
    toggleModal,
    isSearchDisabled,
    pickupTimeSlots,
    dropoffTimeSlots,
  } = useBooking();
  const {logout} = useAuth();
  const {isDark, theme} = useTheme();

  const handleLocationPress = useCallback(() => {
    Alert.alert("Location", "Location selection coming soon!");
  }, []);

  const handleOffersPress = useCallback(() => {
    Alert.alert("Offers", "Offers screen coming soon!");
  }, []);

  const handleSearch = useCallback(() => {
    if (isSearchDisabled) return;

    if (
      bookingData.pickupDate &&
      bookingData.pickupTime &&
      bookingData.dropoffDate &&
      bookingData.dropoffTime
    ) {
      navigation.navigate(ROUTES.SEARCH, {
        pickupDate: bookingData.pickupDate,
        pickupTime: bookingData.pickupTime,
        dropoffDate: bookingData.dropoffDate,
        dropoffTime: bookingData.dropoffTime,
      });
    } else {
      toast.error("Please select all dates and times");
    }
  }, [bookingData, isSearchDisabled]);

  const handleBikePress = useCallback((bike: BikeModel) => {
    Alert.alert("Bike Selected", `You selected ${bike.name}`);
  }, []);

  const handleCategoryPress = useCallback((category: any) => {
    Alert.alert("Category", `You selected ${category.name}`);
  }, []);

  const handleViewAllPress = useCallback(() => {
    Alert.alert("View All", "View all bikes coming soon!");
  }, []);

  const handlePromoPress = useCallback(() => {
    Alert.alert("Promo", "Promo details coming soon!");
  }, []);

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: theme.bg}}>
      {/* Header */}
      <Header
        location="Mira-Bhayandar"
        onLocationPress={handleLocationPress}
        onOffersPress={handleOffersPress}
      />

      {/* Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32}}>
        {/* Booking Form */}
        <View
          className="px-4 mt-4 rounded-2xl"
          style={[{backgroundColor: theme.card}, theme.shadow]}>
          <BookingForm
            bookingData={bookingData}
            onPickupDatePress={() => toggleModal("showPickupDate", true)}
            onPickupTimePress={() => toggleModal("showPickupTime", true)}
            onDropoffDatePress={() => toggleModal("showDropoffDate", true)}
            onDropoffTimePress={() => toggleModal("showDropoffTime", true)}
            onSearch={handleSearch}
            isSearchDisabled={isSearchDisabled}
          />
        </View>

        {/* Categories */}
        <View className="mt-8">
          <HorizontalBikeList
            bikes={BIKE_CATEGORIES}
            onBikePress={handleCategoryPress}
            cardWidth="w-48"
            showShadow={true}
          />
        </View>

        {/* Promo Banner */}
        <View className="mt-8 px-4">
          <PromoBanner
            imageUrl="https://d36g7qg6pk2cm7.cloudfront.net/assets/RBX-offer-194940429645abdee50c6e6711844bb4c8554a72c9c46a339ce202888c57e5d9.jpg"
            onPress={handlePromoPress}
          />
        </View>

        {/* Top Picks */}
        <View className="mt-10 px-4">
          <SectionHeader
            title="User's Top Picks"
            actionText="VIEW ALL"
            onActionPress={handleViewAllPress}
          />
        </View>
        <View className="mt-3">
          <HorizontalBikeList
            bikes={TOP_PICKS}
            onBikePress={handleBikePress}
            cardWidth="w-44"
            showShadow={true}
          />
        </View>
      </ScrollView>

      {/* Pickup Date Modal */}
      <CustomModal
        visible={modals.showPickupDate}
        onClose={() => toggleModal("showPickupDate", false)}
        header={
          <View
            className="flex-row justify-between items-center pb-3 border-b"
            style={{borderBottomColor: theme.border}}>
            <Text className="text-lg font-semibold" style={{color: theme.text}}>
              Select Pick up date
            </Text>
            <TouchableOpacity
              onPress={() => toggleModal("showPickupDate", false)}>
              <Ionicons name="close" size={22} color={theme.subText} />
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
              selectedColor: theme.primary,
            },
          }}
          minDate={new Date().toISOString().split("T")[0]}
          theme={{
            calendarBackground: theme.bg,
            dayTextColor: theme.text,
            monthTextColor: theme.text,
            textDisabledColor: theme.subText,
            selectedDayBackgroundColor: theme.primary,
            selectedDayTextColor: theme.onPrimary,
          }}
        />
      </CustomModal>

      {/* Dropoff Date Modal */}
      <CustomModal
        visible={modals.showDropoffDate}
        onClose={() => toggleModal("showDropoffDate", false)}
        header={
          <View
            className="flex-row justify-between items-center pb-3 border-b"
            style={{borderBottomColor: theme.border}}>
            <Text className="text-lg font-semibold" style={{color: theme.text}}>
              Select Drop off date
            </Text>
            <TouchableOpacity
              onPress={() => toggleModal("showDropoffDate", false)}>
              <Ionicons name="close" size={22} color={theme.subText} />
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
              selectedColor: theme.primary,
            },
          }}
          minDate={
            bookingData.pickupDate || new Date().toISOString().split("T")[0]
          }
          theme={{
            calendarBackground: theme.bg,
            dayTextColor: theme.text,
            monthTextColor: theme.text,
            textDisabledColor: theme.subText,
            selectedDayBackgroundColor: theme.primary,
            selectedDayTextColor: theme.onPrimary,
          }}
        />
      </CustomModal>

      {/* Pickup Time Modal */}
      <CustomModal
        visible={modals.showPickupTime}
        onClose={() => toggleModal("showPickupTime", false)}
        className="max-h-80 min-w-[85%]"
        header={
          <View
            className="flex-row justify-between items-center pb-3 border-b"
            style={{borderBottomColor: theme.border}}>
            <Text className="text-lg font-semibold" style={{color: theme.text}}>
              Select Pick up time
            </Text>
            <TouchableOpacity
              onPress={() => toggleModal("showPickupTime", false)}>
              <Ionicons name="close" size={22} color={theme.subText} />
            </TouchableOpacity>
          </View>
        }>
        <FlatList
          data={pickupTimeSlots}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              className="px-4 py-3 border-b"
              style={{
                borderBottomColor: theme.border,
                backgroundColor: item.disabled ? theme.bg : theme.card,
              }}
              disabled={item.disabled}
              onPress={() => {
                updateBookingData({pickupTime: item.value});
                toggleModal("showPickupTime", false);
              }}>
              <Text
                className="text-base"
                style={{color: item.disabled ? theme.subText : theme.text}}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View className="p-6 items-center justify-center">
              <Text style={{color: theme.subText}}>
                Select the pick up date to see times slots
              </Text>
            </View>
          )}
        />
      </CustomModal>

      {/* Dropoff Time Modal */}
      <CustomModal
        visible={modals.showDropoffTime}
        onClose={() => toggleModal("showDropoffTime", false)}
        className="max-h-80 min-w-[85%]"
        header={
          <View
            className="flex-row justify-between items-center pb-3 border-b"
            style={{borderBottomColor: theme.border}}>
            <Text className="text-lg font-semibold" style={{color: theme.text}}>
              Select Drop off time
            </Text>
            <TouchableOpacity
              onPress={() => toggleModal("showDropoffTime", false)}>
              <Ionicons name="close" size={22} color={theme.subText} />
            </TouchableOpacity>
          </View>
        }>
        <FlatList
          data={dropoffTimeSlots}
          keyExtractor={item => item.value}
          renderItem={({item}) => (
            <TouchableOpacity
              className="px-4 py-3 border-b"
              style={{
                borderBottomColor: theme.border,
                backgroundColor: item.disabled ? theme.bg : theme.card,
              }}
              disabled={item.disabled}
              onPress={() => {
                if (item.disabled) return;
                updateBookingData({dropoffTime: item.value});
                toggleModal("showDropoffTime", false);
              }}>
              <Text
                className="text-base"
                style={{color: item.disabled ? theme.subText : theme.text}}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View className="p-6 items-center justify-center">
              <Text style={{color: theme.subText}}>
                Select the drop off date to see times slots
              </Text>
            </View>
          )}
        />
      </CustomModal>
    </SafeAreaView>
  );
};

export default HomeScreen;
