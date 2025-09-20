import React, {useState} from "react";
import {SafeAreaView, ScrollView} from "react-native";
import Header from "@/components/subscription/Header";
import Banner from "@/components/subscription/Banner";
import SubscriptionForm from "@/components/subscription/SubscriptionForm";
import BottomNavigation from "@/components/subscription/BottomNavigation";

const SubscriptionScreen = () => {
  const [duration, setDuration] = useState(3);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Banner />
        <SubscriptionForm duration={duration} setDuration={setDuration} />
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
