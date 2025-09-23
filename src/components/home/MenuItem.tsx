import {useTheme} from "@/contexts/ThemeContext";
import {Text, TouchableOpacity} from "react-native";

type MenuItemProps = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
  textColor?: string;
};

const MenuItem = ({label, icon, onPress, textColor}: MenuItemProps) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{backgroundColor: theme.card, ...theme.shadow}}
      className="flex-row justify-between items-center p-4 rounded-2xl mb-3">
      <Text
        style={{color: textColor || theme.text}}
        className="text-lg font-medium">
        {label}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

export default MenuItem;
