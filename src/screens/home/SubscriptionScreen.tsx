import Banner from "@/components/subscription/Banner";
import BottomNavigation from "@/components/subscription/BottomNavigation";
import Header from "@/components/subscription/Header";
import SubscriptionForm from "@/components/subscription/SubscriptionForm";
import React, {useState} from "react";
import {SafeAreaView, ScrollView, Text, View} from "react-native";

const SubscriptionScreen = () => {
  const [duration, setDuration] = useState(3);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <Header />

      {/* Content */}
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Banner */}
        <Banner />

        {/* Section Title */}
        <View className="mt-6 mb-2">
          <Text className="text-2xl font-extrabold text-gray-800">
            Flexible Bike Subscriptions
          </Text>
          <Text className="text-gray-500 mt-1">
            Choose your plan and enjoy hassle-free rides.
          </Text>
        </View>

        {/* Subscription Form */}
        <SubscriptionForm duration={duration} setDuration={setDuration} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
