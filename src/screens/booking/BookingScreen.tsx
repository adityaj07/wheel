import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {FC, useState} from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Calendar} from "react-native-calendars";
import {SafeAreaView} from "react-native-safe-area-context";

import {CustomModal} from "@/components/common/CustomModal";
import Icon from "@/components/common/Icon";
import {useBookings} from "@/contexts/BookingsContext";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {formatDate} from "@/utils/time";

type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.MAIN_TABS]: undefined;
};

type BookingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const BookingScreen: FC = () => {
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const {theme} = useTheme();
  const {filteredBookings, loading, filters, setFilters, refreshBookings} =
    useBookings();

  const [modals, setModals] = useState({
    showStartDate: false,
    showEndDate: false,
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshBookings();
    setRefreshing(false);
  };

  const toggleModal = (key: keyof typeof modals, value: boolean) => {
    setModals(prev => ({...prev, [key]: value}));
  };

  const clearFilters = () =>
    setFilters({status: null, startDate: null, endDate: null});

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: theme.bg}}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-5 rounded-b-3xl"
        style={{backgroundColor: theme.primary, ...theme.shadow}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full active:opacity-70">
          <Icon type="ion" name="chevron-back" size={26} color={theme.text} />
        </TouchableOpacity>
        <Text className="text-2xl font-extrabold" style={{color: theme.text}}>
          My Bookings
        </Text>
        <Icon type="ion" name="checkmark-done" size={26} color={theme.text} />
      </View>

      {/* Filters */}
      <View
        className={`px-4 py-3 rounded-lg mx-2 mt-3`}
        style={{backgroundColor: theme.surfaceMuted}}>
        <Text
          className="text-base font-semibold mb-3"
          style={{color: theme.text}}>
          Filters
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {/* Status */}
          {["CONFIRMED", "PENDING", "CANCELLED"].map(option => {
            const isSelected = filters.status === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => setFilters({status: isSelected ? null : option})}
                className="px-4 py-2 rounded-2xl border"
                style={{
                  backgroundColor: isSelected
                    ? theme.primary + "15"
                    : theme.surface,
                  borderColor: isSelected ? theme.primary : theme.border,
                }}>
                <Text
                  className="text-sm font-medium tracking-wide"
                  style={{color: isSelected ? theme.primary : theme.text}}>
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Start Date */}
          <TouchableOpacity
            onPress={() => toggleModal("showStartDate", true)}
            className="px-4 py-2 rounded-2xl border"
            style={{backgroundColor: theme.surface, borderColor: theme.border}}>
            <Text
              className="text-sm font-medium tracking-wide"
              style={{color: theme.text}}>
              {filters.startDate
                ? `From: ${formatDate(filters.startDate)}`
                : "Start Date"}
            </Text>
          </TouchableOpacity>

          {/* End Date */}
          <TouchableOpacity
            onPress={() => toggleModal("showEndDate", true)}
            className="px-4 py-2 rounded-2xl border"
            style={{backgroundColor: theme.surface, borderColor: theme.border}}>
            <Text
              className="text-sm font-medium tracking-wide"
              style={{color: theme.text}}>
              {filters.endDate
                ? `To: ${formatDate(filters.endDate)}`
                : "End Date"}
            </Text>
          </TouchableOpacity>

          {/* Clear Filters */}
          {(filters.status || filters.startDate || filters.endDate) && (
            <TouchableOpacity
              onPress={clearFilters}
              className="px-4 py-2 rounded-2xl border flex-row items-center"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.border,
              }}>
              <Text
                className="text-sm font-medium tracking-wide"
                style={{color: theme.text}}>
                ✕ Clear
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Bookings Content */}
      <ScrollView
        className="p-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }>
        {loading ? (
          <View className="flex-1 justify-center items-center py-12">
            <ActivityIndicator size="large" color={theme.primary} />
            <Text className="text-lg mt-4" style={{color: theme.subText}}>
              Loading your bookings...
            </Text>
          </View>
        ) : filteredBookings.length === 0 ? (
          <View className="flex-1 items-center justify-center py-12">
            <Image
              source={{
                uri: "https://via.placeholder.com/200x200.png?text=No+Bookings",
              }}
              className="w-40 h-40 mb-6 opacity-80"
              resizeMode="contain"
            />
            <Text
              className="text-2xl font-bold text-center mb-2"
              style={{color: theme.text}}>
              No Bookings Yet
            </Text>
            <Text
              className="text-center mb-6 px-6"
              style={{color: theme.subText}}>
              Looks like you haven’t booked a ride yet. Start your journey now!
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.MAIN_TABS)}
              className="py-3 px-10 rounded-full shadow-lg active:opacity-80"
              style={{backgroundColor: theme.primary}}>
              <Text
                className="font-semibold text-lg"
                style={{color: theme.onPrimary}}>
                Book a Ride
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredBookings.map((booking, index) => (
            <View
              key={index}
              className="rounded-3xl p-5 mb-6"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
                ...theme.shadow,
              }}>
              <Image
                source={{
                  uri:
                    booking.vehicle.imageUrl ||
                    "https://via.placeholder.com/150",
                }}
                className="w-full h-48 rounded-2xl mb-4"
                resizeMode="cover"
              />
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold" style={{color: theme.text}}>
                  {booking.vehicle.name || "Unknown Vehicle"}
                </Text>
                <Text
                  className="text-lg font-bold"
                  style={{color: theme.success}}>
                  ₹{Number(booking.totalPrice).toFixed(2)}
                </Text>
              </View>
              <View
                className="mt-3 p-3 rounded-xl"
                style={{backgroundColor: theme.surfaceMuted}}>
                <Text className="text-sm" style={{color: theme.subText}}>
                  📅 From: {formatDate(booking.startDate)} {booking.startTime}
                </Text>
                <Text className="text-sm mt-1" style={{color: theme.subText}}>
                  📅 To: {formatDate(booking.endDate)} {booking.endTime}
                </Text>
              </View>
              <Text className="text-base mt-3" style={{color: theme.text}}>
                📍 {booking.location}
              </Text>
              <View className="mt-4 flex-row">
                <Text
                  className="px-4 py-1 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor:
                      booking.status.toLowerCase() === "confirmed"
                        ? theme.success
                        : booking.status.toLowerCase() === "pending"
                          ? theme.warning
                          : theme.error,
                    color: theme.onPrimary,
                  }}>
                  {booking.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Start Date Modal */}
      <CustomModal
        visible={modals.showStartDate}
        onClose={() => toggleModal("showStartDate", false)}
        header={
          <Text className="text-lg font-semibold" style={{color: theme.text}}>
            Select Start Date
          </Text>
        }>
        <Calendar
          onDayPress={day => {
            setFilters({startDate: day.dateString});
            toggleModal("showStartDate", false);
          }}
          markedDates={
            filters.startDate
              ? {
                  [filters.startDate]: {
                    selected: true,
                    selectedColor: theme.primary,
                  },
                }
              : {}
          }
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

      {/* End Date Modal */}
      <CustomModal
        visible={modals.showEndDate}
        onClose={() => toggleModal("showEndDate", false)}
        header={
          <Text className="text-lg font-semibold" style={{color: theme.text}}>
            Select End Date
          </Text>
        }>
        <Calendar
          onDayPress={day => {
            setFilters({endDate: day.dateString});
            toggleModal("showEndDate", false);
          }}
          markedDates={
            filters.endDate
              ? {
                  [filters.endDate]: {
                    selected: true,
                    selectedColor: theme.primary,
                  },
                }
              : {}
          }
          minDate={filters.startDate || new Date().toISOString().split("T")[0]}
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
    </SafeAreaView>
  );
};

export default BookingScreen;
