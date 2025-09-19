import ROUTES from '@/routes/Routes';
import HomeScreen from '@/screens/HomeScreen';
import MenuScreen from '@/screens/MenuScreen';
import SubscriptionScreen from '@/screens/SubscriptionScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

export type BottomStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SUBSCRIPTION]: undefined;
  [ROUTES.MENU]: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          textDecorationLine: 'none',
        },
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName: string = '';

          if (route.name === ROUTES.HOME) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ROUTES.SUBSCRIPTION) {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === ROUTES.MENU) {
            iconName = focused ? 'menu' : 'menu-outline';
          }

          return (
            <Ionicons
              name={iconName as any}
              size={size}
              color={focused ? '#FEBE10' : 'gray'}
            />
          );
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Tab.Screen name={ROUTES.SUBSCRIPTION} component={SubscriptionScreen} />
      <Tab.Screen name={ROUTES.MENU} component={MenuScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
