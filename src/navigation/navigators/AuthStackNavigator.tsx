import ROUTES from "@/routes/Routes";
import OtpScreen from "@/screens/auth/OtpScreen";
import PhoneNumberScreen from "@/screens/auth/PhoneNumberScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {lazy, Suspense} from "react";

const otpScreen = lazy(() => import("@/screens/auth/OtpScreen"));

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Suspense fallback={null}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={ROUTES.PHONE_NUMBER}
          component={PhoneNumberScreen}
        />
        <Stack.Screen name={ROUTES.OTP} component={OtpScreen} />
      </Stack.Navigator>
    </Suspense>
  );
};

export default AuthStackNavigator;
