import Icon from "@/components/common/Icon";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {COLORS} from "@/theme/colors";
import {BookingResponse} from "@/types/booking";
import {Vehicle} from "@/types/vehicle";
import {formatDate, formatTime} from "@/utils/time";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {type FC} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import {SafeAreaView} from "react-native-safe-area-context";

interface BookingConfirmationScreenProps {}

type RootStackParamList = {
  Search: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
  };
  RideConfirmation: {
    selectedVehicle: Vehicle;
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
    location: string;
  };
  BookConfirmation: {
    booking: BookingResponse;
  };
  MainTabs: undefined;
};

type BookConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  "BookConfirmation"
>;
type BookConfirmationScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const BookingConfirmationScreen: FC<BookingConfirmationScreenProps> = () => {
  const route = useRoute<BookConfirmationScreenRouteProp>();
  const navigation = useNavigation<BookConfirmationScreenNavigationProp>();
  const {booking} = route.params || {};

  const {theme} = useTheme();

  const safeBooking = booking || {};
  const vehicle = safeBooking.vehicle || {};
  const createdAt = safeBooking.createdAt
    ? new Date(safeBooking.createdAt)
    : new Date();
  const startDate = safeBooking.startDate
    ? new Date(safeBooking.startDate)
    : new Date();
  const endDate = safeBooking.endDate
    ? new Date(safeBooking.endDate)
    : new Date();

  const formattedPickupDate = formatDate(safeBooking.startDate);
  const formattedDropOffDate = formatDate(safeBooking.endDate);
  const formattedPickupTime = formatTime(safeBooking.startTime);
  const formattedDropOffTime = formatTime(safeBooking.endTime);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.bg}}>
      <ConfettiCannon
        count={200}
        origin={{x: -10, y: 0}}
        autoStart={true}
        fadeOut={true}
      />

      <ScrollView contentContainerClassName="px-5 py-6">
        {/* Header */}
        <View className="items-center mb-8">
          <Icon
            type="ion"
            name="checkmark-circle"
            size={80}
            color={theme.success}
          />
          <Text
            className="text-2xl font-bold mt-3"
            style={{color: theme.primary}}>
            Booking Confirmed!
          </Text>
          <Text className="text-base mt-1" style={{color: theme.subText}}>
            Your ride is ready to roll 🚗
          </Text>
        </View>

        {/* Booking Info Card */}
        <View
          className="rounded-2xl p-4 mb-4"
          style={{backgroundColor: theme.card, ...theme.shadow}}>
          <Text
            className="text-lg font-semibold mb-1"
            style={{color: theme.text}}>
            Booking ID: {safeBooking.id || "N/A"}
          </Text>
          <Text className="text-sm" style={{color: theme.subText}}>
            Booked on: {formatDate(createdAt.toDateString())}
          </Text>
        </View>

        {/* Vehicle Card */}
        <View
          className="rounded-2xl p-4 mb-4"
          style={{backgroundColor: theme.card, ...theme.shadow}}>
          <Text
            className="text-lg font-semibold mb-3"
            style={{color: theme.text}}>
            Vehicle Details
          </Text>
          <Image
            source={{
              uri: vehicle.imageUrl || "https://via.placeholder.com/150",
            }}
            className="w-full h-40 rounded-xl mb-3"
            resizeMode="contain"
          />
          <Text className="text-base font-bold" style={{color: theme.text}}>
            {vehicle.name || "Unknown Vehicle"}
          </Text>
          <Text className="text-sm mt-1" style={{color: theme.subText}}>
            Price: ₹{(safeBooking.totalPrice || 0).toFixed(2)}
          </Text>
        </View>

        {/* Booking Details Card */}
        <View
          className="rounded-2xl p-4 mb-4"
          style={{backgroundColor: theme.card, ...theme.shadow}}>
          <Text
            className="text-lg font-semibold mb-3"
            style={{color: theme.text}}>
            Booking Details
          </Text>

          {[
            {
              label: "Pickup",
              value: `${formattedPickupDate} at ${
                formattedPickupTime || "N/A"
              }`,
            },
            {
              label: "Dropoff",
              value: `${formattedDropOffDate} at ${
                formattedDropOffTime || "N/A"
              }`,
            },
            {label: "Location", value: safeBooking.location || "N/A"},
            {
              label: "Status",
              value: (safeBooking.status || "PENDING").toUpperCase(),
              isStatus: true,
            },
          ].map((item, idx) => (
            <View
              key={idx}
              className="flex-row justify-between"
              style={{marginBottom: idx === 3 ? 0 : 12}}>
              <Text className="text-sm" style={{color: theme.subText}}>
                {item.label}:
              </Text>
              <Text
                className="text-sm font-medium"
                style={{
                  color: item.isStatus ? theme.success : theme.text,
                  fontWeight: item.isStatus ? "700" : "500",
                }}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          className="rounded-2xl py-3.5 mb-4"
          style={{backgroundColor: theme.primary, ...theme.shadow}}>
          <Text
            className="text-center font-bold text-base"
            style={{color: theme.onPrimary}}>
            View Invoice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace(ROUTES.MAIN_TABS)}
          className="rounded-2xl py-3.5"
          style={{backgroundColor: COLORS.secondary, ...theme.shadow}}>
          <Text
            className="text-center font-bold text-base"
            style={{color: COLORS.onPrimary}}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingConfirmationScreen;
