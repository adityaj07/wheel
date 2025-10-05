import {BookingListResponse} from "@/types/booking";
import type {NativeStackScreenProps} from "@react-navigation/native-stack";
import ROUTES from "./Routes";

export type RootStackParamList = {
  [ROUTES.ROOT]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.SIGNUP]: undefined;
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.SUBSCRIPTION]: undefined;
  [ROUTES.MENU]: undefined;
  [ROUTES.SEARCH]: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
  };
  [ROUTES.OTP]: undefined;
  [ROUTES.PHONE_NUMBER]: undefined;
  [ROUTES.RIDECONFIRMATION]: undefined;
  [ROUTES.CHOOSE_LOGIN_SIGNUP]: undefined;
  [ROUTES.BOOKCONFIRMATION]: {
    booking: BookingListResponse;
  };
  [ROUTES.SPLASH]: undefined;
  [ROUTES.UPDATEPROFILE]: undefined;
  [ROUTES.BOOKINGS]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
