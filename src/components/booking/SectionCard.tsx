import React from "react";
import {View} from "react-native";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  style?: object;
}

const SectionCard: React.FC<SectionCardProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <View
      className={`rounded-2xl shadow p-4 my-2 mx-4 ${className}`}
      style={style}>
      {children}
    </View>
  );
};

export default SectionCard;
