import Feather from "@react-native-vector-icons/feather";
import FontAwesome from "@react-native-vector-icons/fontawesome";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React from "react";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type FeatherName = React.ComponentProps<typeof Feather>["name"];
type FAName = React.ComponentProps<typeof FontAwesome>["name"];
type MaterialName = React.ComponentProps<typeof MaterialIcons>["name"];

type IconProps =
  | {
      type: "ion";
      name: IoniconName;
      size?: number;
      color?: string;
      onPress?: () => void;
    }
  | {
      type: "feather";
      name: FeatherName;
      size?: number;
      color?: string;
      onPress?: () => void;
    }
  | {
      type: "fa";
      name: FAName;
      size?: number;
      color?: string;
      onPress?: () => void;
    }
  | {
      type: "material";
      name: MaterialName;
      size?: number;
      color?: string;
      onPress?: () => void;
    };

const Icon = ({type, name, size = 24, color = "#000", onPress}: IconProps) => {
  switch (type) {
    case "material":
      return (
        <MaterialIcons
          name={name}
          size={size}
          color={color}
          onPress={onPress}
        />
      );
    case "feather":
      return (
        <Feather name={name} size={size} color={color} onPress={onPress} />
      );
    case "fa":
      return (
        <FontAwesome name={name} size={size} color={color} onPress={onPress} />
      );
    case "ion":
    default:
      return (
        <Ionicons name={name} size={size} color={color} onPress={onPress} />
      );
  }
};

export default Icon;
