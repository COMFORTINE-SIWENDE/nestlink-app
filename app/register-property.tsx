// app/register-property.tsx
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterPropertyScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      router.push("/auth-choice");
    } else if (user.isPropertyOwner && !user.profileCompleted) {
      router.push("/property-registration");
    } else if (user.isPropertyOwner) {
      router.push("/owner-dashboard");
    } else {
      // Regular user wants to become property owner
      router.push("/become-owner");
    }
  };

  const features = [
    {
      icon: icons.home,
      title: "Reach Thousands of Tenants",
      description: "Showcase your property to our growing community of renters",
    },
    {
      icon: icons.wallet,
      title: "Competitive Pricing",
      description: "Set your own rates and maximize your rental income",
    },
    {
      icon: icons.shield,
      title: "Verified Tenants",
      description: "All our tenants undergo thorough verification processes",
    },
    {
      icon: icons.calendar,
      title: "Booking Management",
      description: "Easy calendar management and booking system",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start"
          >
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>

          <View className="items-center mt-5">
            <Image
              source={images.nl}
              className="w-20 h-20"
              resizeMode="contain"
            />
            <Text className="text-3xl font-rubik-extrabold text-dark-400 mt-4 text-center">
              List Your Property with Nestlink
            </Text>
            <Text className="text-base font-rubik text-dark-300 mt-2 text-center">
              Join thousands of property owners earning rental income through
              our platform
            </Text>
            <View className="">
              <Link href="/property-registration" asChild>
                <TouchableOpacity className="bg-dark-400  py-3 px-4 rounded">
                  <Text className="text-light-400 font-rubik-bold text-center">
                    {" "}
                    Property registration
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* Features */}
        <View className="px-5 mt-8">
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-6">
              <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center">
                <Image source={feature.icon} className="w-6 h-6" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-rubik-semibold text-dark-400">
                  {feature.title}
                </Text>
                <Text className="text-sm font-rubik text-dark-300 mt-1">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View className="bg-primary-100 mx-5 p-5 rounded-2xl mt-4">
          <Text className="text-lg font-rubik-semibold text-dark-400 mb-3">
            What You'll Need
          </Text>
          <View className="space-y-2">
            <Text className="text-sm font-rubik text-dark-300">
              • Property ownership documents
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              • ID/Passport for verification
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              • Property photos (5-10 images)
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              • Property details and amenities
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              • Pricing information
            </Text>
          </View>
        </View>

        {/* Spacer */}
        <View className="h-32" />
      </ScrollView>

      {/* Sticky Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-primary-300 py-4 rounded-lg items-center"
        >
          <Text className="text-white text-lg font-rubik-semibold">
            {user ? "Continue Registration" : "Get Started"}
          </Text>
        </TouchableOpacity>

        {!user && (
          <TouchableOpacity className="mt-3">
            <Text className="text-primary-300 text-center font-rubik-semibold">
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default RegisterPropertyScreen;
