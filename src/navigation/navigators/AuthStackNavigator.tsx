import ROUTES from "@/routes/Routes";
import ChooseLoginSignupScreen from "@/screens/auth/ChooseLoginSignupScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import PhoneNumberScreen from "@/screens/auth/PhoneNumberScreen";
import SignupScreen from "@/screens/auth/SignupScreen";
import SplashScreen from "@/screens/auth/SplashScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {lazy, Suspense} from "react";

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  PhoneNumber: undefined;
  Otp: {
    sessionId: string;
    phone: string;
    isLogin?: boolean;
  };
  Home: undefined;
};

const otpScreen = lazy(() => import("@/screens/auth/OtpScreen"));

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Suspense fallback={null}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.LOGIN}>
        <Stack.Screen
          name={ROUTES.SPLASH}
          component={SplashScreen}
          options={{
            animation: "default",
          }}
        />

        <Stack.Screen
          name={ROUTES.CHOOSE_LOGIN_SIGNUP}
          component={ChooseLoginSignupScreen}
        />

        <Stack.Screen
          name={ROUTES.PHONE_NUMBER}
          component={PhoneNumberScreen}
        />
        <Stack.Screen name={ROUTES.OTP} component={otpScreen} />

        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name={ROUTES.SIGNUP}
          component={SignupScreen}
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </Suspense>
  );
};

export default AuthStackNavigator;
