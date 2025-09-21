import Logger from "@/utils/Logger";
import {NavigationContainer, NavigationState} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import {
  navigationRef,
  parseAndLogRoute,
  setIsnavigationReady,
} from "../Navigation";

import {useAuth} from "@/contexts/AuthContext";
import ROUTES from "@/routes/Routes";
import {Text} from "react-native";
import AuthStackNavigator from "./AuthStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const AppContent = () => {
  const Stack = createNativeStackNavigator();
  const {isAuthenticated, isLoading} = useAuth();

  const handleStateChange = (state: NavigationState | undefined) => {
    Logger.info("Navigation State Changed: ", {
      state,
      isAuthenticated,
    });
    parseAndLogRoute(state);
  };

  useEffect(() => {
    if (navigationRef.current?.isReady()) {
      Logger.info("Navigation is ready.");
    }
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={handleStateChange}
      onReady={setIsnavigationReady}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          <Stack.Screen
            name={ROUTES.MAIN_TABS}
            component={BottomTabNavigator}
          />
        ) : (
          <Stack.Screen name={ROUTES.ROOT} component={AuthStackNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootNavigator = () => {
  return <AppContent />;
};

export default RootNavigator;
