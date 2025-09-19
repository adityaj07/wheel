import Ionicons from '@react-native-vector-icons/ionicons';
import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [pickupDate, setPickupDate] = useState();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-lg font-semibold">Mira-Bhayandar</Text>
          <Ionicons name="chevron-down" size={18} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="pricetag-outline" size={18} />
          <Text className="text-lg font-semibold ml-1">Offers</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 py-3">
        <View>
          <Text className="text-2xl font-bold mb-3">
            Book now, Ride Anywhere
          </Text>

          <View>
            <TouchableOpacity>
              <Ionicons name="calendar-outline" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
