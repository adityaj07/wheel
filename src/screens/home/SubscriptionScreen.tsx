import Banner from "@/components/subscription/Banner";
import Header from "@/components/subscription/Header";
import SubscriptionForm from "@/components/subscription/SubscriptionForm";
import {useTheme} from "@/contexts/ThemeContext";
import React, {useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";

const SubscriptionScreen = () => {
  const {theme} = useTheme();
  const [duration, setDuration] = useState(3);

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: theme.bg}} // theme aware background
    >
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}>
        {/* Banner */}
        <Banner />

        {/* Section Title */}
        <View className="mt-6 mb-2">
          <Text className="text-2xl font-extrabold" style={{color: theme.text}}>
            Flexible Bike Subscriptions
          </Text>
          <Text className="mt-1 text-base" style={{color: theme.subText}}>
            Choose your plan and enjoy hassle-free rides.
          </Text>
        </View>

        {/* Subscription Form */}
        <SubscriptionForm duration={duration} setDuration={setDuration} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
