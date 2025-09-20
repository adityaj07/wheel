import React from "react";
import {ScrollView} from "react-native";
import {BikeCard} from "./BikeCard";
import {BikeModel} from "@/types/home";

interface HorizontalBikeListProps {
  bikes: BikeModel[];
  onBikePress?: (bike: BikeModel) => void;
  cardWidth?: string;
  showShadow?: boolean;
}

export const HorizontalBikeList: React.FC<HorizontalBikeListProps> = ({
  bikes,
  onBikePress,
  cardWidth,
  showShadow,
}) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal: 16}}>
    {bikes.map(bike => (
      <BikeCard
        key={bike.id}
        bike={bike}
        onPress={onBikePress ? () => onBikePress(bike) : undefined}
        width={cardWidth}
        showShadow={showShadow}
      />
    ))}
  </ScrollView>
);
