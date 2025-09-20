import {BikeModel} from "@/types/home";
import React from "react";
import {FlatList} from "react-native";
import {BikeCard} from "./BikeCard";

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
  <FlatList
    data={bikes}
    horizontal
    keyExtractor={item => item.id}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 12}}
    ItemSeparatorComponent={() => <></>}
    renderItem={({item}) => (
      <BikeCard
        bike={item}
        onPress={() => onBikePress?.(item)}
        width={cardWidth}
        showShadow={showShadow}
      />
    )}
  />
);
