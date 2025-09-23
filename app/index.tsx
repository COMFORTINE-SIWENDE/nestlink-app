// Alternative version with smaller, outlined button
import { GradientText } from "@/components/ui/GradientText";
import images from "@/constants/images";
import { Link, Stack } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-primary-100 px-6 justify-center">
        <StatusBar backgroundColor="#D6EBF6" barStyle="dark-content" />

        {/* Logo / Branding */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800 }}
          className="items-center mb-10"
        >
          <View className="w-40 h-40 mb-6 items-center justify-center">
            <Image
              source={images.nl}
              className="w-full h-full rounded-full"
              resizeMode="contain"
            />
          </View>

          <MotiView
            from={{ translateX: -300, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 300, opacity: 0 }}
            transition={{
              type: "timing",
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              loop: true,
            }}
          >
            <GradientText
              colors={["#34d399", "#3b82f6", "#9333ea"]}
              style={{
                fontSize: 36,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Nestlink 🏡
            </GradientText>
          </MotiView>

          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 600 }}
            className="text-lg text-dark-100 font-rubik-medium text-center"
          >
            Find your perfect stay in Kenya
          </MotiText>
        </MotiView>

        {/* Main Buttons */}
        <View className="w-full space-y-4 mb-6">
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 900 }}
          >
            <Link href="/login" asChild>
              <TouchableOpacity className="bg-primary-400 p-5 rounded-2xl shadow-lg">
                <Text className="text-white text-lg font-rubik-semibold text-center">
                  Get Started
                </Text>
              </TouchableOpacity>
            </Link>
          </MotiView>

          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 1200 }}
          >
            <Link href="/reach-us" asChild>
              <TouchableOpacity className="border-2 border-primary-400 p-5 rounded-2xl">
                <Text className="text-primary-400 text-lg font-rubik-semibold text-center">
                  Learn More
                </Text>
              </TouchableOpacity>
            </Link>
          </MotiView>
        </View>

        {/* Property Registration Button - More Subtle */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1400 }}
          className="mb-6"
        >
          <Link href="/register-property" asChild>
            <TouchableOpacity className="bg-white p-4 rounded-2xl shadow-sm border border-primary-200">
              <Text className="text-primary-400 text-base font-rubik-semibold text-center">
                🏠 Register Your Property with Nestlink
              </Text>
              <Text className="text-dark-300 text-xs font-rubik text-center mt-1">
                List your property and start earning today
              </Text>
            </TouchableOpacity>
          </Link>
        </MotiView>

        {/* Secondary Logo */}
        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 1500 }}
          className="items-center"
        >
          <View className="w-24 h-24 mb-4">
            <Image
              source={require("@/assets/images/nestlink.png")}
              className="w-full h-[40%]"
              resizeMode="contain"
            />
          </View>

          <MotiText
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1700 }}
            className="text-dark-100 font-rubik-medium text-center"
          >
            Connecting Kenyans to their perfect residence ✨
          </MotiText>
        </MotiView>
      </SafeAreaView>
    </>
  );
}
