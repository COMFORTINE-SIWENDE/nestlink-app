// app/(tabs)/relocate.tsx
import icons from "@/constants/icons";
import images from "@/constants/images";
import { usePayment } from "@/context/PaymentContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface Vehicle {
  id: string;
  type: "pickup" | "truck" | "van";
  name: string;
  capacity: string;
  price: number;
  image: any;
  eta: string;
  rating: number;
  reviews: number;
}

const Relocate = () => {
  const router = useRouter();
  const { addPaymentItem } = usePayment();

  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const vehicles: Vehicle[] = [
    {
      id: "1",
      type: "pickup",
      name: "Small Pickup",
      capacity: "Up to 1 room",
      price: 1500,
      image: images.pickup,
      eta: "15 min",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "2",
      type: "van",
      name: "Medium Van",
      capacity: "Up to 2 rooms",
      price: 2500,
      image: images.van,
      eta: "20 min",
      rating: 4.6,
      reviews: 89,
    },
    {
      id: "3",
      type: "truck",
      name: "Large Truck",
      capacity: "3+ rooms",
      price: 4000,
      image: images.truck,
      eta: "25 min",
      rating: 4.9,
      reviews: 156,
    },
  ];

  const handleBookVehicle = () => {
    if (!selectedVehicle) {
      Alert.alert("Select Vehicle", "Please select a vehicle type first");
      return;
    }

    if (!pickupLocation || !destination) {
      Alert.alert(
        "Enter Locations",
        "Please enter both pickup and destination locations"
      );
      return;
    }

    // Add to payment context
    addPaymentItem({
      id: selectedVehicle.id,
      type: "relocation",
      amount: selectedVehicle.price,
      description: `${selectedVehicle.name} - ${pickupLocation} to ${destination}`,
      metadata: {
        vehicle: selectedVehicle,
        pickup: pickupLocation,
        destination: destination,
        timestamp: new Date().toISOString(),
      },
    });

    // Navigate to payment
    router.push({
      pathname: "/payment",
      params: { type: "relocation" },
    });
  };

  const VehicleCard = ({
    vehicle,
    isSelected,
  }: {
    vehicle: Vehicle;
    isSelected: boolean;
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedVehicle(vehicle)}
      className={`p-4 rounded-2xl border-2 ${
        isSelected
          ? "border-primary-300 bg-primary-50"
          : "border-light-200 bg-white"
      } mr-4`}
      style={{ width: width * 0.7 }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-rubik-semibold text-dark-400">
            {vehicle.name}
          </Text>
          <Text className="text-sm font-rubik text-dark-300 mt-1">
            {vehicle.capacity}
          </Text>
          <Text className="text-xl font-rubik-extrabold text-primary-300 mt-2">
            Ksh. {vehicle.price.toLocaleString()}
          </Text>
          <View className="flex-row items-center mt-2">
            <Image source={icons.star} className="w-4 h-4" />
            <Text className="text-sm font-rubik text-dark-300 ml-1">
              {vehicle.rating} ({vehicle.reviews})
            </Text>
            <Text className="text-sm font-rubik text-primary-300 ml-3">
              ETA: {vehicle.eta}
            </Text>
          </View>
        </View>
        <Image
          source={vehicle.image}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-5 pt-5">
          <Text className="text-2xl font-rubik-extrabold text-dark-400">
            Relocation Service
          </Text>
          <Text className="text-base font-rubik text-dark-300 mt-1">
            Book a truck or pickup to help you relocate
          </Text>
        </View>

        {/* Simple Map Placeholder */}
        <View className="h-48 mt-4 mx-5 bg-primary-100 rounded-2xl items-center justify-center">
          <Image source={icons.location} className="w-16 h-16 mb-3" />
          <Text className="text-lg font-rubik-semibold text-dark-400">
            Location Services
          </Text>
          <Text className="text-sm font-rubik text-dark-300 text-center mt-1">
            Enter your pickup and destination locations below
          </Text>
        </View>

        {/* Location Inputs */}
        <View className="px-5 mt-4 space-y-3">
          <View className="bg-primary-100 p-4 rounded-2xl">
            <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
              Pickup Location
            </Text>
            <TextInput
              value={pickupLocation}
              onChangeText={setPickupLocation}
              placeholder="Enter pickup address"
              className="bg-white p-3 rounded-lg text-base font-rubik"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="bg-primary-100 p-4 rounded-2xl">
            <Text className="text-sm font-rubik-semibold text-dark-400 mb-2">
              Destination
            </Text>
            <TextInput
              value={destination}
              onChangeText={setDestination}
              placeholder="Enter destination address"
              className="bg-white p-3 rounded-lg text-base font-rubik"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Vehicle Selection */}
        <View className="mt-6 px-5">
          <Text className="text-xl font-rubik-semibold text-dark-400 mb-4">
            Select Vehicle Type
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          >
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicle?.id === vehicle.id}
              />
            ))}
          </ScrollView>
        </View>

        {/* Features */}
        <View className="px-5 mt-6 mb-8">
          <Text className="text-lg font-rubik-semibold text-dark-400 mb-3">
            Why Choose Nestlink Relocation?
          </Text>

          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%] bg-primary-50 p-3 rounded-lg mb-3">
              <Image source={icons.shield} className="w-8 h-8 mb-2" />
              <Text className="font-rubik-semibold text-dark-400">
                Verified Drivers
              </Text>
              <Text className="text-xs font-rubik text-dark-300">
                Background checked
              </Text>
            </View>

            <View className="w-[48%] bg-primary-50 p-3 rounded-lg mb-3">
              <Image source={icons.clock} className="w-8 h-8 mb-2" />
              <Text className="font-rubik-semibold text-dark-400">
                Quick Response
              </Text>
              <Text className="text-xs font-rubik text-dark-300">
                15 min average ETA
              </Text>
            </View>

            <View className="w-[48%] bg-primary-50 p-3 rounded-lg">
              <Image source={icons.wallet} className="w-8 h-8 mb-2" />
              <Text className="font-rubik-semibold text-dark-400">
                Fair Pricing
              </Text>
              <Text className="text-xs font-rubik text-dark-300">
                No hidden charges
              </Text>
            </View>

            <View className="w-[48%] bg-primary-50 p-3 rounded-lg">
              <Image source={icons.support} className="w-8 h-8 mb-2" />
              <Text className="font-rubik-semibold text-dark-400">
                24/7 Support
              </Text>
              <Text className="text-xs font-rubik text-dark-300">
                Always available
              </Text>
            </View>
          </View>
        </View>

        {/* Spacer for sticky button */}
        <View className="h-32" />
      </ScrollView>

      {/* Sticky Book Button */}
      {selectedVehicle && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
          <TouchableOpacity
            onPress={handleBookVehicle}
            className="bg-primary-300 py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-lg font-rubik-semibold">
              Book {selectedVehicle.name} - Ksh.{" "}
              {selectedVehicle.price.toLocaleString()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Relocate;
