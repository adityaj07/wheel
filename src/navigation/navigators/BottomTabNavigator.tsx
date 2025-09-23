import TabBarButton from "@/components/common/CustomTabBarButton";
import Icon from "@/components/common/Icon";
import {useTheme} from "@/contexts/ThemeContext";
import ROUTES from "@/routes/Routes";
import HomeScreen from "@/screens/home/HomeScreen";
import MenuScreen from "@/screens/home/MenuScreen";
import SubscriptionScreen from "@/screens/home/SubscriptionScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React from "react";
import {View} from "react-native";

export type BottomStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SUBSCRIPTION]: undefined;
  [ROUTES.MENU]: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

const ICONS: Record<string, {focused: string; unfocused: string}> = {
  [ROUTES.HOME]: {focused: "home", unfocused: "home-outline"},
  [ROUTES.SUBSCRIPTION]: {focused: "card", unfocused: "card-outline"},
  [ROUTES.MENU]: {focused: "menu", unfocused: "menu-outline"},
};

const BottomTabNavigator = () => {
  const {theme} = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.bg}}>
      <Tab.Navigator
        screenOptions={({route}) => {
          const iconInfo = ICONS[route.name] || {
            focused: "ellipse",
            unfocused: "ellipse",
          };

          return {
            headerShown: false,
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,
            animation: "none",
            cardStyle: {backgroundColor: theme.bg},
            tabBarStyle: {
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              height: 72,
              borderRadius: 18,
              backgroundColor: "transparent",
              paddingTop: 6,
              borderTopWidth: 0,
              elevation: 0,
            },
            tabBarBackground: () => (
              <View
                style={{
                  marginHorizontal: 16,
                  borderRadius: 18,
                  backgroundColor: theme.card,
                  height: 72,
                  ...(theme.shadow || {}),
                }}
              />
            ),
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
              marginTop: 2,
            },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.subText,
            tabBarButton: props => <TabBarButton {...props} />,
            tabBarIcon: ({focused}) => {
              const iconName = focused ? iconInfo.focused : iconInfo.unfocused;

              return (
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Icon
                    type="ion"
                    name={iconName as any}
                    size={focused ? 22 : 20}
                    color={focused ? theme.primary : theme.subText}
                  />
                </View>
              );
            },
          };
        }}>
        <Tab.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{tabBarLabel: "Home"}}
        />
        <Tab.Screen
          name={ROUTES.SUBSCRIPTION}
          component={SubscriptionScreen}
          options={{tabBarLabel: "Subscription"}}
        />
        <Tab.Screen
          name={ROUTES.MENU}
          component={MenuScreen}
          options={{tabBarLabel: "Menu"}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
