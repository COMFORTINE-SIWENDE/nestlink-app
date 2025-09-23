// app/sign-in.tsx
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      Alert.alert("Success", "Signed in successfully!");
      router.push("/explore"); // Go to explore screen
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center mt-8">
          <Image
            source={images.nl}
            className="w-20 h-20"
            resizeMode="contain"
          />
          <Text className="text-2xl font-rubik-extrabold text-dark-400 mt-4">
            Welcome Back
          </Text>
          <Text className="text-base font-rubik text-dark-300 mt-2 text-center">
            Sign in to continue with your checkout
          </Text>
        </View>

        {/* Form */}
        <View className="mt-10">
          <View className="mb-5">
            <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
            />
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isLoading}
            className="bg-primary-300 py-4 rounded-lg items-center"
          >
            <Text className="text-white text-lg font-rubik-semibold">
              {isLoading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-5">
            <Text className="text-primary-300 text-center font-rubik-semibold">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-light-200" />
          <Text className="mx-4 text-dark-300 font-rubik">
            Or continue with
          </Text>
          <View className="flex-1 h-px bg-light-200" />
        </View>

        {/* Social Sign In */}
        <TouchableOpacity className="flex-row items-center justify-center border border-light-200 py-3 rounded-lg">
          <Image source={icons.google} className="w-6 h-6" />
          <Text className="text-dark-400 font-rubik-semibold ml-3">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View className="flex-row justify-center mt-8 mb-10">
          <Text className="text-dark-300 font-rubik">
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity>
            <Text className="text-primary-300 font-rubik-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
