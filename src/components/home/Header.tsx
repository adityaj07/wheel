import {useAuth} from "@/contexts/AuthContext";
import {useTheme} from "@/contexts/ThemeContext";

import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Menu, MenuDivider, MenuItem} from "react-native-material-menu";
import {ConfirmDialog} from "../common/ConfirmDialog";
import Icon from "../common/Icon";

interface HeaderProps {
  location: string;
  onLocationPress: () => void;
  onOffersPress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  location,
  onLocationPress,
  onOffersPress,
}) => {
  const {theme} = useTheme();
  const {user, logout} = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmLogoutVisible, setConfirmLogoutVisible] = useState(false);

  // Compute initials from user name
  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <>
      <View
        className="flex-row items-center justify-between px-5 py-3"
        style={{
          backgroundColor: theme.card,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
          ...theme.shadow,
        }}>
        {/* Left: Location */}
        <TouchableOpacity
          className="flex-row items-center px-3 py-1 rounded-lg"
          onPress={onLocationPress}
          accessibilityLabel={`Current location: ${location}`}
          accessibilityRole="button">
          <Text
            className="text-base font-semibold"
            style={{color: theme.text}}
            numberOfLines={1}>
            {location}
          </Text>
          <Icon
            type="ion"
            name="chevron-down"
            size={18}
            color={theme.subText}
          />
        </TouchableOpacity>

        {/* Right: Offers + User Menu */}
        <View className="flex-row items-center gap-4">
          {/* Offers Button */}
          <TouchableOpacity
            className="flex-row items-center px-3 py-1 rounded-full"
            style={{backgroundColor: theme.primary + "22"}}
            onPress={onOffersPress}
            accessibilityLabel="View offers"
            accessibilityRole="button">
            <Icon
              type="ion"
              name="pricetag-outline"
              size={18}
              color={theme.primary}
            />
            <Text
              className="ml-2 text-sm font-semibold"
              style={{color: theme.primary}}>
              Offers
            </Text>
          </TouchableOpacity>

          {/* User Menu */}
          <Menu
            visible={menuVisible}
            onRequestClose={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <View
                  className="w-10 h-10 rounded-full items-center justify-center"
                  style={{backgroundColor: theme.primary + "33"}}>
                  <Text className="text-white font-semibold">
                    {getInitials(user?.name)}
                  </Text>
                </View>
              </TouchableOpacity>
            }
            style={{
              backgroundColor: theme.card,
              borderRadius: 12,
              paddingVertical: 4,
              elevation: 4,
            }}>
            <MenuItem
              onPress={() => setMenuVisible(false)}
              textStyle={{color: theme.text}}>
              Profile
            </MenuItem>
            <MenuItem
              onPress={() => setMenuVisible(false)}
              textStyle={{color: theme.text}}>
              Settings
            </MenuItem>
            <MenuDivider />
            <MenuItem
              onPress={() => {
                setMenuVisible(false);
                setConfirmLogoutVisible(true);
              }}
              textStyle={{color: "red"}}>
              Logout
            </MenuItem>
          </Menu>
        </View>
      </View>

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
    </>
  );
};
