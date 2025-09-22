// app/property-details.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Share,
  Linking,
  useWindowDimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import icons from "@/constants/icons";
import images from "@/constants/images";
import { facilities } from "@/constants/data";
import { Listing } from "@/types";
import { useProcurement } from "@/context/ProcurementContext";

// Helper function to get image source
const getImageSource = (imageName: string) => {
  // Map your image strings to actual image imports
  const imageMap: { [key: string]: any } = {
    newYork: images.newYork,
    japan: images.japan,
    avatar: images.avatar,
    // Add other image mappings as needed
  };

  return imageMap[imageName] || images.noResult;
};

// Mock property data - in a real app this would come from your data source
const mockProperty: Listing = {
  id: "1",
  title: "Modern Luxury Villa",
  description:
    "A beautiful modern villa with stunning views, located in the heart of the city. Features include a swimming pool, gym, and spacious rooms with modern amenities.",
  price: 25000,
  location: "Westlands, Nairobi",
  coordinates: {
    latitude: -1.26231,
    longitude: 36.80463,
  },
  type: "house",
  bedrooms: 4,
  bathrooms: 3,
  area: 320,
  amenities: [
    "Laundry",
    "Car Parking",
    "Sports Center",
    "Gym",
    "Swimming pool",
    "Wifi",
  ],
  images: ["newYork", "japan", "newYork", "japan"], // Keep as strings
  host: {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isHost: true,
    avatar: "avatar",
  },
  rating: 4.8,
  reviewCount: 42,
  isAvailable: true,
  createdAt: "2023-10-15T00:00:00.000Z",
  updatedAt: "2023-10-15T00:00:00.000Z",
};

const PropertyDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToProcurement } = useProcurement();

  // In a real app, you would fetch the property data based on the ID from params
  const property = mockProperty;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing property: ${property.title} - ${property.location}`,
        url: "https://nestlink.com/properties/" + property.id,
        title: property.title,
      });
    } catch (error) {
      console.error("Error sharing property:", error);
    }
  };

  const handleContactAgent = () => {
    Linking.openURL("tel:+254712345678");
  };

  const handleBookNow = () => {
    addToProcurement(property);
    alert("Property added to procurement!");
  };

  const daysSinceUpload = Math.floor(
    (new Date().getTime() - new Date(property.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Simple map view as fallback
  const SimpleMapView = () => (
    <View className="h-64 bg-primary-100 rounded-lg items-center justify-center">
      <Image source={icons.location} className="w-12 h-12 mb-2" />
      <Text className="text-lg font-rubik-semibold">Property Location</Text>
      <Text className="text-base font-rubik text-center mt-2">
        {property.location}
      </Text>
      <Text className="text-sm font-rubik text-dark-300 mt-2">
        Latitude: {property.coordinates.latitude.toFixed(6)}
        {"\n"}
        Longitude: {property.coordinates.longitude.toFixed(6)}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back button and share icon */}
        <View className="absolute top-0 left-0 right-0 z-10 pt-4 px-5 flex-row justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/80 items-center justify-center"
          >
            <Image source={icons.backArrow} className="w-5 h-5" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 rounded-full bg-white/80 items-center justify-center"
          >
            <Image source={icons.send} className="w-5 h-5" />
          </TouchableOpacity>
        </View>

        {/* Property Images */}
        <View className="relative">
          <Image
            source={getImageSource(property.images[currentImageIndex])}
            className="w-full h-80"
            resizeMode="cover"
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            className="absolute bottom-0 left-0 right-0 h-32"
          />

          <View className="absolute bottom-5 right-5 bg-white/90 px-3 py-1.5 rounded-2xl flex-row items-center">
            <Image source={icons.star} className="w-4 h-4" />
            <Text className="text-sm font-rubik-semibold text-primary-300 ml-1">
              {property.rating} ({property.reviewCount} reviews)
            </Text>
          </View>

          {/* Image indicators */}
          <View className="absolute bottom-5 left-5 flex-row">
            {property.images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </View>
        </View>

        {/* Property Details */}
        <View className="px-5 pt-5">
          <Text className="text-2xl font-rubik-semibold text-dark-400">
            {property.title}
          </Text>

          <View className="flex-row items-center mt-1">
            <Image source={icons.location} className="w-4 h-4" />
            <Text className="text-base font-rubik text-dark-300 ml-1">
              {property.location}
            </Text>
          </View>

          {/* Property Attributes */}
          <View className="flex-row justify-between mt-5 bg-primary-100 p-4 rounded-lg">
            <View className="items-center">
              <Image source={icons.bed} className="w-6 h-6" />
              <Text className="text-sm font-rubik-semibold mt-1">
                {property.bedrooms} Beds
              </Text>
            </View>

            <View className="items-center">
              <Image source={icons.bath} className="w-6 h-6" />
              <Text className="text-sm font-rubik-semibold mt-1">
                {property.bathrooms} Baths
              </Text>
            </View>

            <View className="items-center">
              <Image source={icons.area} className="w-6 h-6" />
              <Text className="text-sm font-rubik-semibold mt-1">
                {property.area} sq.ft
              </Text>
            </View>

            <View className="items-center">
              <Image source={icons.home} className="w-6 h-6" />
              <Text className="text-sm font-rubik-semibold mt-1 capitalize">
                {property.type}
              </Text>
            </View>
          </View>

          {/* Property Agent */}
          <View className="mt-6">
            <Text className="text-xl font-rubik-semibold text-dark-400">
              Property Agent
            </Text>

            <View className="flex-row items-center mt-3 bg-light-300 p-4 rounded-lg">
              <Image
                source={getImageSource(property.host.avatar || "avatar")}
                className="w-14 h-14 rounded-full"
              />

              <View className="ml-4 flex-1">
                <Text className="text-lg font-rubik-semibold">
                  {property.host.name}
                </Text>
                <Text className="text-sm font-rubik text-dark-300">
                  Property Agent
                </Text>

                <View className="flex-row mt-2">
                  <TouchableOpacity className="bg-primary-300 px-4 py-2 rounded-lg mr-3">
                    <Text className="text-white font-rubik-semibold">
                      Message
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleContactAgent}
                    className="border border-primary-300 px-4 py-2 rounded-lg"
                  >
                    <Text className="text-primary-300 font-rubik-semibold">
                      Call
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Overview */}
          <View className="mt-6">
            <Text className="text-xl font-rubik-semibold text-dark-400">
              Overview
            </Text>
            <Text className="text-base font-rubik text-dark-300 mt-2 leading-6">
              {property.description}
            </Text>
          </View>

          {/* Facilities */}
          <View className="mt-6">
            <Text className="text-xl font-rubik-semibold text-dark-400">
              Facilities
            </Text>

            <View className="flex-row flex-wrap mt-3">
              {facilities.map((facility, index) => (
                <View key={index} className="w-1/4 items-center mb-4">
                  <View className="w-14 h-14 bg-primary-100 rounded-full items-center justify-center">
                    <Image source={facility.icon} className="w-6 h-6" />
                  </View>
                  <Text className="text-xs font-rubik text-center mt-2">
                    {facility.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery */}
          <View className="mt-6">
            <Text className="text-xl font-rubik-semibold text-dark-400">
              Gallery
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-3"
            >
              {property.images.map((image, index) => (
                <Image
                  key={index}
                  source={getImageSource(image)}
                  className="w-32 h-32 rounded-lg mr-3"
                  resizeMode="cover"
                />
              ))}

              {/* Video thumbnail */}
              <TouchableOpacity className="w-32 h-32 rounded-lg bg-dark-400 mr-3 items-center justify-center">
                <View className="w-16 h-16 bg-white/30 rounded-full items-center justify-center">
                  <View className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                </View>
                <Text className="text-white font-rubik-semibold mt-2">
                  1 min
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Location */}
          <View className="mt-6">
            <Text className="text-xl font-rubik-semibold text-dark-400">
              Location
            </Text>

            <SimpleMapView />

            <Text className="text-base font-rubik text-dark-300 mt-2">
              {property.location}
            </Text>
          </View>

          {/* Posted date */}
          <View className="mt-6 pb-10">
            <Text className="text-base font-rubik text-dark-300">
              Posted {daysSinceUpload} {daysSinceUpload === 1 ? "day" : "days"}{" "}
              ago
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar with Price and Book Now Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-base font-rubik text-dark-300">Price</Text>
            <Text className="text-2xl font-rubik-extrabold text-primary-300">
              Ksh. {property.price.toLocaleString()}
              <Text className="text-base font-rubik text-dark-300">/month</Text>
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleBookNow}
            className="bg-primary-300 px-8 py-4 rounded-lg"
          >
            <Text className="text-white text-lg font-rubik-semibold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PropertyDetails;
