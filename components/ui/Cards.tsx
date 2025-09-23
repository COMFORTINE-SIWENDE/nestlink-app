// components/ui/Cards.tsx
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
  property?: any; // Add property data prop
}

export const FeatureCard = ({ onPress, property }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to property details with the property data
      router.push({
        pathname: "/properties/property",
        params: {
          id: property?.id || "1",
          title: property?.title || "Modern Home",
          location: property?.location || "25 N 4th St, Nairobi, NBI 0004002",
          price: property?.price || "12,000",
          rating: property?.rating || 4.4,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex flex-col items-center w-60 h-80 relative"
    >
      <Image source={images.japan} className="w-full h-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="w-full h-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 absolute top-3 right-3 rounded-2xl">
        <Image source={icons.star} className="" />
        <Text className="text-xs font-rubik-semibold text-primary-300 ml-1">
          {property?.rating || 4.4}
        </Text>
      </View>
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text className="text-xl font-rubik-extrabold text-white">
          {property?.title || "Modern Home"}
        </Text>
        <Text className="text-base font-rubik text-primary-400">
          {property?.location || "25 N 4th St, Nairobi, NBI 0004002"}
        </Text>
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-light-400">
            Ksh.{property?.price || "12,000"}
          </Text>
          <Image source={icons.heart} className="w-6 h-6" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress, property }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Navigate to property details with the property data
      router.push({
        pathname: "/properties/property",
        params: {
          id: property?.id || "1",
          title: property?.title || "Nesty Studio",
          location: property?.location || "25 N 4th St, Nairobi, NBI 0004002",
          price: property?.price || "12,000",
          rating: property?.rating || 4.4,
        },
      });
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="w-4 h-4" />
        <Text className="text-xs font-rubik-semibold text-primary-300 ml-0.5">
          {property?.rating || 4.4}
        </Text>
      </View>
      <Image source={images.newYork} className="w-full h-40 rounded-lg" />
      <View className="flex flex-col mt-2">
        <Text className="text-base font-rubik-semibold text-dark-400">
          {property?.title || "Nesty Studio"}
        </Text>
        <Text className="text-base font-rubik text-dark-300">
          {property?.location || "25 N 4th St, Nairobi, NBI 0004002"}
        </Text>
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-semibold text-primary-300">
            Ksh.{property?.price || "12,000"}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
