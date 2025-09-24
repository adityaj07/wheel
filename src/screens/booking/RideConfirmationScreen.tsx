import {api} from "@/api";
import RideDetailRow from "@/components/booking/RideDetailRow";
import SectionCard from "@/components/booking/SectionCard";
import Icon from "@/components/common/Icon";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import {BookingListResponse} from "@/types/booking";
import {Vehicle} from "@/types/vehicle";
import {formatDate, formatTime} from "@/utils/time";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {FC, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
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
  [ROUTES.BOOKCONFIRMATION]: {
    booking: BookingListResponse;
  };
};

type RideConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  "RideConfirmation"
>;
type RideConfirmationScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const RideConfirmationScreen: FC = () => {
  const route = useRoute<RideConfirmationScreenRouteProp>();
  const navigation = useNavigation<RideConfirmationScreenNavigationProp>();
  const {theme} = useTheme();

  const {
    selectedVehicle,
    pickupDate,
    pickupTime,
    dropoffDate,
    dropoffTime,
    location,
  } = route.params;
  const [loading, setLoading] = useState(false);

  const handleProceedToPay = async () => {
    try {
      setLoading(true);
      const response = await api.post("/bookings/create", {
        vehicleId: selectedVehicle.id,
        startDate: pickupDate,
        startTime: pickupTime,
        endDate: dropoffDate,
        endTime: dropoffTime,
        location,
      });

      console.log("Handle Proceed to pay api response", response);

      toast.success("Booking Successful");
      console.log("Toast should appear now");
      navigation.navigate(ROUTES.BOOKCONFIRMATION, {
        booking: response.data.data,
      });
      console.log("Navigating to confirmation screen");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Some error occurred while booking";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = (selectedVehicle?.calculatedPrice || 0) * 1.28;
  const formattedPickupDate = formatDate(pickupDate);
  const formattedDropOffDate = formatDate(dropoffDate);
  const formattedPickupTime = formatTime(pickupTime);
  const formattedDropOffTime = formatTime(dropoffTime);

  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: theme.bg}}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          className="rounded-b-3xl px-5 pt-4 pb-6 mb-6"
          style={{backgroundColor: theme.primary}}>
          <View className="flex flex-row items-center justify-between mb-6">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon type="ion" name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>

            <Text className="text-lg font-semibold" style={{color: theme.text}}>
              SUMMARY
            </Text>

            {/* Spacer for symmetry */}
            <View style={{width: 24}} />
          </View>
          {/* Vehicle Image & Name */}
          <View className="items-center px-5 py-4">
            <Image
              source={{
                uri:
                  selectedVehicle?.imageUrl ||
                  "https://www.honda2wheelersindia.com/assets/images/activa-125/Activa-125-Main-Image.png",
              }}
              className="w-full h-40"
              resizeMode="contain"
            />
            <Text
              className="text-lg font-semibold mt-4"
              style={{color: theme.text}}>
              {selectedVehicle?.name || "Honda Activa 125 (BS6)"}
            </Text>
          </View>
        </View>

        {/* Booking Details */}
        <SectionCard style={{backgroundColor: theme.card}}>
          <Text
            className="text-base font-semibold mb-3"
            style={{color: theme.text}}>
            Booking Details
          </Text>

          <SectionCard style={{backgroundColor: theme.surface}}>
            <RideDetailRow
              label="Pickup"
              value={`On ${formattedPickupDate} at ${formattedPickupTime}`}
              valueStyle={{
                color: theme.text,
              }}
            />
            <RideDetailRow
              label="Dropoff"
              value={`On ${formattedDropOffDate} at ${formattedDropOffTime}`}
              valueStyle={{
                color: theme.text,
              }}
            />
          </SectionCard>

          <SectionCard style={{backgroundColor: theme.surface}}>
            <RideDetailRow
              label="Location"
              value={location}
              valueStyle={{
                color: theme.text,
              }}
            />
          </SectionCard>

          <SectionCard style={{backgroundColor: theme.surface}}>
            <RideDetailRow
              label="km Included"
              value={`${selectedVehicle?.calculatedIncludedKm || "690"} km`}
              valueStyle={{
                color: theme.text,
              }}
            />
          </SectionCard>

          <SectionCard style={{backgroundColor: theme.surfaceMuted}}>
            <Text style={{color: theme.subText, fontWeight: "500"}}>
              Excludes:
            </Text>
            <Text style={{color: theme.error, marginTop: 4, fontSize: 12}}>
              Exceeding KM limit is chargeable at ₹4/km.
            </Text>
            <Text style={{color: theme.error, fontSize: 12}}>
              Fuel is not included as part of the booking.
            </Text>
          </SectionCard>
        </SectionCard>

        {/* Offers & Addons */}
        <SectionCard style={{backgroundColor: theme.card}}>
          <Text
            className="text-lg font-semibold mb-2"
            style={{color: theme.text}}>
            Offers/Coupons
          </Text>
          <TouchableOpacity
            className="flex-row justify-between items-center rounded-lg px-3 py-2"
            style={{borderWidth: 1, borderColor: theme.border}}>
            <Text style={{color: theme.subText, fontSize: 14}}>
              Apply Coupon
            </Text>
            <Text style={{color: theme.text}}>›</Text>
          </TouchableOpacity>

          <Text
            className="text-lg font-semibold mt-4 mb-2"
            style={{color: theme.text}}>
            Addons
          </Text>
          <TouchableOpacity
            className="flex-row justify-between items-center rounded-lg px-3 py-2"
            style={{borderWidth: 1, borderColor: theme.border}}>
            <Text style={{color: theme.text}}>Customize your ride</Text>
            <Text style={{color: theme.text}}>+</Text>
          </TouchableOpacity>

          <Text
            className="text-lg font-semibold mt-4 mb-2"
            style={{color: theme.text}}>
            Wallet
          </Text>
          <TouchableOpacity
            className="flex-row justify-between items-center rounded-lg px-3 py-2"
            style={{borderWidth: 1, borderColor: theme.border}}>
            <Text style={{color: theme.subText}}>RB WALLET (₹0.00)</Text>
            <Text style={{color: theme.text}}>Apply</Text>
          </TouchableOpacity>
        </SectionCard>

        {/* Charges */}
        <SectionCard style={{backgroundColor: theme.card}}>
          <RideDetailRow
            label="Vehicle Rental Charges"
            value={`₹${selectedVehicle?.calculatedPrice || 2819}`}
            valueStyle={{
              color: theme.text,
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: theme.border,
              marginVertical: 8,
            }}
          />
          <RideDetailRow
            label="Taxes"
            value={`₹${((selectedVehicle?.calculatedPrice || 2819) * 0.28).toFixed(2)}`}
            valueStyle={{
              color: theme.text,
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: theme.border,
              marginVertical: 8,
            }}
          />
          <RideDetailRow
            label="Subtotal"
            value={`₹${totalPrice.toFixed(2)}`}
            valueStyle={{fontWeight: "600", color: theme.text}}
          />
        </SectionCard>

        {/* Total */}
        <SectionCard style={{backgroundColor: theme.card}}>
          <RideDetailRow
            label="Total Payable Amount"
            value={`₹${totalPrice.toFixed(2)}`}
            valueStyle={{fontWeight: "600", color: theme.text}}
          />
        </SectionCard>
      </ScrollView>

      {/* Floating Proceed Button */}
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          zIndex: 10,
        }}>
        <TouchableOpacity
          disabled={loading}
          onPress={handleProceedToPay}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 16,
            paddingHorizontal: 24,
            borderRadius: 30,
            backgroundColor: theme.primary,
            shadowColor: "#000",
            shadowOffset: {width: 0, height: 6},
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
          }}>
          {/* Amount */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: theme.text,
            }}>
            ₹{totalPrice.toFixed(2)}
          </Text>
          {/* Button Text */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.text,
              textAlign: "center",
              flex: 1,
              marginHorizontal: 12,
            }}>
            {loading ? "Processing..." : "Proceed to Pay"}
          </Text>
          {/* Arrow */}
          <Icon type="ion" name="arrow-forward" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideConfirmationScreen;
