// app/owner-dashboard.tsx - Fix the navigation
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OwnerDashboardScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Mock property data
  const mockProperties = [
    {
      id: "1",
      title: "Modern Apartment in Westlands",
      status: "active",
      image: images.newYork,
      price: 25000,
      bookings: 12,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Luxury Villa in Karen",
      status: "pending",
      image: images.japan,
      price: 120000,
      bookings: 0,
      rating: 0,
    },
  ];

  const stats = {
    totalProperties: 2,
    activeProperties: 1,
    totalBookings: 12,
    totalEarnings: 300000,
  };
  const handleEditProperty = (propertyId: string) => {
    const path = `/properties/${propertyId}` as Href; // type-safe
    router.push(path);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mt-5">
          <View>
            <Text className="text-2xl font-rubik-extrabold text-dark-400">
              Dashboard
            </Text>
            <Text className="text-base font-rubik text-dark-300">
              Welcome back, {user?.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/property-registration")}
            className="bg-primary-300 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-rubik-semibold">Add Property</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="flex-row flex-wrap justify-between mt-6">
          <View className="bg-primary-100 p-4 rounded-lg w-[48%] mb-4">
            <Text className="text-2xl font-rubik-extrabold text-primary-300">
              {stats.totalProperties}
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              Total Properties
            </Text>
          </View>

          <View className="bg-primary-100 p-4 rounded-lg w-[48%] mb-4">
            <Text className="text-2xl font-rubik-extrabold text-primary-300">
              {stats.activeProperties}
            </Text>
            <Text className="text-sm font-rubik text-dark-300">Active</Text>
          </View>

          <View className="bg-primary-100 p-4 rounded-lg w-[48%]">
            <Text className="text-2xl font-rubik-extrabold text-primary-300">
              {stats.totalBookings}
            </Text>
            <Text className="text-sm font-rubik text-dark-300">Bookings</Text>
          </View>

          <View className="bg-primary-100 p-4 rounded-lg w-[48%]">
            <Text className="text-2xl font-rubik-extrabold text-primary-300">
              Ksh. {stats.totalEarnings.toLocaleString()}
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              Total Earnings
            </Text>
          </View>
        </View>

        {/* Properties List */}
        <View className="mt-8">
          <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
            Your Properties
          </Text>

          {mockProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() => handleEditProperty(property.id)}
              className="bg-white rounded-lg shadow-sm shadow-black-100/30 p-4 mb-4 flex-row"
            >
              <Image source={property.image} className="w-20 h-20 rounded-lg" />

              <View className="ml-4 flex-1">
                <View className="flex-row justify-between items-start">
                  <Text className="text-base font-rubik-semibold text-dark-400 flex-1">
                    {property.title}
                  </Text>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      property.status === "active"
                        ? "bg-green-100"
                        : "bg-yellow-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-rubik-semibold ${
                        property.status === "active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {property.status.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text className="text-lg font-rubik-extrabold text-primary-300 mt-1">
                  Ksh. {property.price.toLocaleString()}
                </Text>

                <View className="flex-row items-center mt-2">
                  <Image source={icons.star} className="w-4 h-4" />
                  <Text className="text-sm font-rubik text-dark-300 ml-1">
                    {property.rating} • {property.bookings} bookings
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerDashboardScreen;
