import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isLoading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register({ name, email, password });
      router.replace("/(tabs)/explore");
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  return (
    <View className="flex-1 bg-dark-400 p-6 justify-center">
      <Text className="text-3xl font-bold text-light-400 mb-8 text-center">
        Create Account
      </Text>

      <View className="mb-6">
        <TextInput
          className="bg-dark-200 text-light-100 p-4 rounded-2xl mb-4"
          placeholder="Full Name"
          placeholderTextColor="#bdbdc0"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="bg-dark-200 text-light-100 p-4 rounded-2xl mb-4"
          placeholder="Email"
          placeholderTextColor="#bdbdc0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="bg-dark-200 text-light-100 p-4 rounded-2xl mb-4"
          placeholder="Password"
          placeholderTextColor="#bdbdc0"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          className="bg-dark-200 text-light-100 p-4 rounded-2xl mb-6"
          placeholder="Confirm Password"
          placeholderTextColor="#bdbdc0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-primary-400 p-4 rounded-2xl"
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text className="text-white text-center font-bold text-lg">
            {isLoading ? "Creating account..." : "Create Account"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center">
        <Text className="text-light-100">Already have an account? </Text>
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity>
            <Text className="text-primary-400 font-bold">Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
