// app/edit-property/[id].tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import icons from "@/constants/icons";
import images from "@/constants/images";

const EditPropertyScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Mock property data - in real app, this would be fetched from backend
  const [formData, setFormData] = useState({
    title: "Modern Apartment in Westlands",
    type: "apartment",
    category: "2-bedroom",
    price: 25000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    location: "Westlands, Nairobi",
    overview: "A beautiful modern apartment with stunning views...",
    facilities: ["WiFi", "Parking", "Gym"],
    status: "active",
  });

  useEffect(() => {
    // Simulate loading property data
    const loadProperty = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadProperty();
  }, [id]);

  const handleSave = () => {
    Alert.alert("Success", "Property updated successfully!");
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Property",
      "Are you sure you want to delete this property? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "Property deleted successfully!");
            router.replace("/owner-dashboard");
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg font-rubik text-dark-300">
          Loading property...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between mt-5">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-extrabold text-dark-400">
            Edit Property
          </Text>
          <View style={{ width: 40 }} /> {/* Spacer for balance */}
        </View>

        {/* Property Details Form */}
        <View className="mt-6 space-y-6">
          {/* Basic Information */}
          <View>
            <Text className="text-lg font-rubik-semibold text-dark-400 mb-4">
              Basic Information
            </Text>

            <View className="space-y-4">
              <View>
                <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                  Property Title
                </Text>
                <TextInput
                  value={formData.title}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, title: text }))
                  }
                  className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                    Type
                  </Text>
                  <View className="bg-primary-100 border border-primary-200 rounded-lg">
                    <Picker
                      selectedValue={formData.type}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <Picker.Item label="Apartment" value="apartment" />
                      <Picker.Item label="House" value="house" />
                      <Picker.Item label="Villa" value="villa" />
                      <Picker.Item label="Studio" value="studio" />
                    </Picker>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                    Category
                  </Text>
                  <View className="bg-primary-100 border border-primary-200 rounded-lg">
                    <Picker
                      selectedValue={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <Picker.Item label="1-bedroom" value="1-bedroom" />
                      <Picker.Item label="2-bedroom" value="2-bedroom" />
                      <Picker.Item label="3-bedroom" value="3-bedroom" />
                      <Picker.Item label="Bedsitter" value="bedsitter" />
                    </Picker>
                  </View>
                </View>
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                    Bedrooms
                  </Text>
                  <TextInput
                    value={formData.bedrooms.toString()}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        bedrooms: parseInt(text) || 0,
                      }))
                    }
                    keyboardType="number-pad"
                    className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                    Bathrooms
                  </Text>
                  <TextInput
                    value={formData.bathrooms.toString()}
                    onChangeText={(text) =>
                      setFormData((prev) => ({
                        ...prev,
                        bathrooms: parseInt(text) || 0,
                      }))
                    }
                    keyboardType="number-pad"
                    className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                  Price (Ksh)
                </Text>
                <TextInput
                  value={formData.price.toString()}
                  onChangeText={(text) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: parseInt(text) || 0,
                    }))
                  }
                  keyboardType="number-pad"
                  className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                />
              </View>

              <View>
                <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
                  Location
                </Text>
                <TextInput
                  value={formData.location}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, location: text }))
                  }
                  className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                />
              </View>
            </View>
          </View>

          {/* Description */}
          <View>
            <Text className="text-lg font-rubik-semibold text-dark-400 mb-4">
              Description
            </Text>
            <TextInput
              value={formData.overview}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, overview: text }))
              }
              multiline
              numberOfLines={6}
              className="bg-primary-100 border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
            />
          </View>

          {/* Status */}
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-rubik-semibold text-dark-400">
              Property Status
            </Text>
            <View
              className={`px-3 py-1 rounded-full ${
                formData.status === "active" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <Text
                className={`font-rubik-semibold ${
                  formData.status === "active"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {formData.status.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3 mt-8">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-primary-300 py-4 rounded-lg items-center"
            >
              <Text className="text-white text-lg font-rubik-semibold">
                Save Changes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDelete}
              className="bg-danger py-4 rounded-lg items-center"
            >
              <Text className="text-white text-lg font-rubik-semibold">
                Delete Property
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              className="border border-primary-300 py-4 rounded-lg items-center"
            >
              <Text className="text-primary-300 text-lg font-rubik-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer */}
        <View className="h-32" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPropertyScreen;
