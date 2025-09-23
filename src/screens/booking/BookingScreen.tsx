import {api} from "@/api";
import Icon from "@/components/common/Icon";

import {CustomModal} from "@/components/common/CustomModal";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {GetUserBookingsResponse} from "@/types/user";
import {formatDate} from "@/utils/time";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useEffect, useState, type FC} from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Calendar} from "react-native-calendars";
import {SafeAreaView} from "react-native-safe-area-context";
import {toast} from "sonner-native";

interface BookingScreenProps {}

type RootStackParamList = {
  [ROUTES.HOME]: undefined;
};

type BookingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type MyBookings = GetUserBookingsResponse["data"][0];

const BookingScreen: FC<BookingScreenProps> = ({}) => {
  const [bookings, setBookings] = useState<MyBookings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [modals, setModals] = useState({
    showStartDate: false,
    showEndDate: false,
  });

  const navigation = useNavigation<BookingScreenNavigationProp>();
  const {theme} = useTheme();

  const toggleModal = (key: keyof typeof modals, value: boolean) => {
    setModals(prev => ({...prev, [key]: value}));
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string> = {};
      if (status) params.status = status;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await api.get("/users/bookings", {params});
      setBookings(response.data.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Some error occurred while fetching your bookings";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [status, startDate, endDate]);

  if (loading) {
    return (
      <SafeAreaView
        className="flex-1 justify-center items-center"
        style={{backgroundColor: theme.bg}}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text className="text-lg mt-4" style={{color: theme.subText}}>
          Loading your bookings...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: theme.bg}}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-5 rounded-b-3xl"
        style={{backgroundColor: theme.primary, ...theme.shadow}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full active:opacity-70">
          <Icon
            type="ion"
            name="chevron-back"
            size={26}
            color={theme.onPrimary}
          />
        </TouchableOpacity>
        <Text
          className="text-2xl font-extrabold"
          style={{color: theme.onPrimary}}>
          My Bookings
        </Text>
        <Icon
          type="ion"
          name="checkmark-done"
          size={26}
          color={theme.onPrimary}
        />
      </View>

      {/* Filters */}
      <View className={`px-4 py-3 rounded-b-lg ${theme.surfaceMuted}`}>
        <Text
          className="text-base font-semibold mb-3"
          style={{color: theme.text}}>
          Filters
        </Text>

        <View className="flex-row flex-wrap gap-3">
          {/* Status */}
          {["CONFIRMED", "PENDING", "CANCELLED"].map(option => {
            const isSelected = status === option;
            return (
              <TouchableOpacity
                key={option}
                onPress={() => setStatus(isSelected ? null : option)}
                className="px-4 py-2 rounded-2xl border"
                style={{
                  backgroundColor: isSelected
                    ? theme.primary + "15"
                    : theme.surface,
                  borderColor: isSelected ? theme.primary : theme.border,
                }}>
                <Text
                  className="text-sm font-medium tracking-wide"
                  style={{
                    color: isSelected ? theme.primary : theme.text,
                  }}>
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Start Date */}
          <TouchableOpacity
            onPress={() => toggleModal("showStartDate", true)}
            className="px-4 py-2 rounded-2xl border"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}>
            <Text
              className="text-sm font-medium tracking-wide"
              style={{color: theme.text}}>
              {startDate ? `From: ${formatDate(startDate)}` : "Start Date"}
            </Text>
          </TouchableOpacity>

          {/* End Date */}
          <TouchableOpacity
            onPress={() => toggleModal("showEndDate", true)}
            className="px-4 py-2 rounded-2xl border"
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.border,
            }}>
            <Text
              className="text-sm font-medium tracking-wide"
              style={{color: theme.text}}>
              {endDate ? `To: ${formatDate(endDate)}` : "End Date"}
            </Text>
          </TouchableOpacity>

          {/* Clear Filters */}
          {(status || startDate || endDate) && (
            <TouchableOpacity
              onPress={() => {
                setStatus(null);
                setStartDate(null);
                setEndDate(null);
              }}
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

      {/* Content */}
      <ScrollView className="p-4">
        {error ? (
          <Text className="text-center text-lg" style={{color: theme.error}}>
            {error}
          </Text>
        ) : bookings.length === 0 ? (
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
              onPress={() => navigation.navigate("Home")}
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
          bookings.map((booking, index) => (
            <View
              key={index}
              className="rounded-3xl p-5 mb-6"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                borderWidth: 1,
                ...theme.shadow,
              }}>
              {/* Vehicle Image */}
              <Image
                source={{
                  uri:
                    booking.vehicle.imageUrl ||
                    "https://via.placeholder.com/150",
                }}
                className="w-full h-48 rounded-2xl mb-4"
                resizeMode="cover"
              />

              {/* Vehicle Name + Price */}
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

              {/* Dates */}
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

              {/* Location */}
              <Text className="text-base mt-3" style={{color: theme.text}}>
                📍 {booking.location}
              </Text>

              {/* Status Badge */}
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
            setStartDate(day.dateString);
            toggleModal("showStartDate", false);
          }}
          markedDates={
            startDate
              ? {[startDate]: {selected: true, selectedColor: theme.primary}}
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
            setEndDate(day.dateString);
            toggleModal("showEndDate", false);
          }}
          markedDates={
            endDate
              ? {[endDate]: {selected: true, selectedColor: theme.primary}}
              : {}
          }
          minDate={startDate || new Date().toISOString().split("T")[0]}
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
