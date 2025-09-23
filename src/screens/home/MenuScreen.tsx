import {useNavigation} from "@react-navigation/native";
import {
  CheckCheck,
  FileText,
  HelpCircle,
  LogOut,
  MapPin,
  Shield,
  Wallet,
  X,
} from "lucide-react-native";
import React, {useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import {ConfirmDialog} from "@/components/common/ConfirmDialog";
import MenuItem from "@/components/home/MenuItem";
import {useAuth} from "@/contexts/AuthContext";
import {useTheme} from "@/contexts/ThemeContext";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

type RootStackParamList = {
  UpdateProfile: undefined;
  Bookings: undefined;
};

const MenuScreen = () => {
  const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);
  const {logout, user} = useAuth();
  const {isDark, theme} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleViewProfile = () => navigation.navigate("UpdateProfile");
  const handleMyBookings = () => navigation.navigate("Bookings");

  return (
    <SafeAreaView style={{backgroundColor: theme.bg}} className="flex-1">
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        className="flex-1"
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View
          style={{backgroundColor: theme.primary}}
          className="rounded-b-3xl px-6 pt-8 pb-10">
          <View className="flex-row items-center gap-4">
            {/* Profile Icon */}
            <View
              style={{borderColor: theme.success, backgroundColor: theme.card}}
              className="w-20 h-20 rounded-full border-4 flex items-center justify-center">
              <CheckCheck size={40} color={theme.primaryDark} />
            </View>

            {/* User Info */}
            <View className="flex-1">
              <Text style={{color: theme.text}} className="text-xl font-bold">
                {user?.name || user?.phone || "User"}
              </Text>
              <Text style={{color: theme.surfaceMuted}} className="text-sm">
                Account Status:{" "}
                <Text style={{color: theme.surfaceMuted}}>
                  {user?.name && user?.email
                    ? "Profile Updated"
                    : "Update Your Information"}
                </Text>
              </Text>
              {user?.email && (
                <Text style={{color: theme.surfaceMuted}} className="text-sm">
                  {user.email}
                </Text>
              )}
            </View>
          </View>

          {/* View Profile Button */}
          <TouchableOpacity
            onPress={handleViewProfile}
            style={{backgroundColor: theme.card, ...theme.shadow}}
            className="self-start mt-5 py-2 px-5 rounded-xl">
            <Text
              style={{color: theme.text}}
              className="font-semibold tracking-wide">
              VIEW PROFILE ➝
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View className="p-5 space-y-3">
          <MenuItem
            label="My Bookings"
            icon={<CheckCheck size={22} color={theme.text} />}
            onPress={handleMyBookings}
          />

          <MenuItem
            label="Saved Addresses"
            icon={<MapPin size={22} color={theme.text} />}
          />

          <View
            style={{backgroundColor: theme.card, ...theme.shadow}}
            className="flex-row justify-between items-center p-4 rounded-2xl mb-3">
            <Text style={{color: theme.text}} className="text-lg font-medium">
              RB Wallet
            </Text>
            <View className="flex-row items-center gap-2">
              <Text
                style={{color: theme.subText}}
                className="font-medium text-lg">
                ₹ 0.00
              </Text>
              <Wallet size={22} color={theme.text} />
            </View>
          </View>

          <MenuItem
            label="Help & Support"
            icon={<HelpCircle size={22} color={theme.text} />}
          />
        </View>

        {/* Legal Section */}
        <View className="p-5">
          <Text style={{color: theme.text}} className="text-xl font-bold mb-4">
            Legal
          </Text>

          <MenuItem
            label="Cancellation Policy"
            icon={<X size={22} color={theme.text} />}
          />
          <MenuItem
            label="Terms & Conditions"
            icon={<FileText size={22} color={theme.text} />}
          />
          <MenuItem
            label="Privacy Policy"
            icon={<Shield size={22} color={theme.text} />}
          />
          <MenuItem
            label="Logout"
            onPress={() => {
              setConfirmLogoutVisible(true);
            }}
            icon={<LogOut size={22} color={theme.error} />}
            textColor={theme.error}
          />

          <ConfirmDialog
            visible={confirmLogoutVisible}
            title="Logout"
            description="Are you sure you want to logout?"
            onCancel={() => setConfirmLogoutVisible(false)}
            onConfirm={async () => {
              setConfirmLogoutVisible(false);
              await logout();
            }}
            confirmText="Logout"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;
