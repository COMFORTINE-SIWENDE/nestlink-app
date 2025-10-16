// app/(tabs)/procure.tsx
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { useProcurement } from "@/context/ProcurementContext";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProcureScreen = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, removeFromProcurement, total, itemCount, clearProcurement } =
    useProcurement();

  const handleCheckout = () => {
    if (!user) {
      // Navigate to sign in screen if not authenticated
      router.push("/login");
      return;
    }

    // Navigate to payment screen if authenticated
    router.push("./payment");
  };

  const handleRemoveItem = (propertyId: string, propertyTitle: string) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${propertyTitle} from your procurement?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeFromProcurement(propertyId);
            Alert.alert("Success", "Item removed from procurement");
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    if (items.length === 0) return;

    Alert.alert(
      "Clear All",
      "Are you sure you want to remove all items from your procurement?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearProcurement();
            Alert.alert("Success", "All items removed from procurement");
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white px-5">
        <View className="flex-1 justify-center items-center">
          <Image
            source={images.noResult}
            className="w-48 h-48"
            resizeMode="contain"
          />
          <Text className="text-xl font-rubik-semibold text-dark-300 mt-5">
            Your procurement is empty
          </Text>
          <Text className="text-base font-rubik text-dark-200 text-center mt-2">
            Properties you add for checkout will appear here
          </Text>
          <TouchableOpacity
            onPress={() => router.push("./explore")}
            className="bg-primary-300 px-6 py-3 rounded-lg mt-6"
          >
            <Text className="text-white font-rubik-semibold">
              Browse Properties
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center mt-5">
          <Text className="text-2xl font-rubik-extrabold text-dark-400">
            Procurement
          </Text>
          {items.length > 0 && (
            <TouchableOpacity onPress={handleClearAll}>
              <Text className="text-primary-300 font-rubik-semibold">
                Clear All
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Summary */}
        <View className="bg-primary-100 p-4 rounded-lg mt-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-rubik text-dark-300">Items</Text>
            <Text className="text-base font-rubik-semibold text-dark-400">
              {itemCount}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-base font-rubik text-dark-300">Subtotal</Text>
            <Text className="text-base font-rubik-semibold text-dark-400">
              Ksh. {total.toLocaleString()}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <Text className="text-base font-rubik text-dark-300">
              Service Fee
            </Text>
            <Text className="text-base font-rubik-semibold text-dark-400">
              Ksh. {(total * 0.05).toLocaleString()} {/* 5% service fee */}
            </Text>
          </View>
          <View className="h-px bg-primary-200 my-3" />
          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-rubik-semibold text-dark-400">
              Total
            </Text>
            <Text className="text-lg font-rubik-extrabold text-primary-300">
              Ksh. {(total * 1.05).toLocaleString()} {/* Total + 5% fee */}
            </Text>
          </View>
        </View>

        {/* Properties List */}
        <View className="mt-6">
          <Text className="text-xl font-rubik-semibold text-dark-400 mb-3">
            Properties ({itemCount})
          </Text>

          {items.map((item, index) => (
            <View
              key={item.property.id}
              className="bg-white rounded-lg shadow-sm shadow-black-100/30 p-4 mb-4"
            >
              <View className="flex-row">
                <Image
                  source={
                    images[item.property.images[0] as keyof typeof images]
                  }
                  className="w-24 h-24 rounded-lg"
                  resizeMode="cover"
                />

                <View className="ml-4 flex-1">
                  <Text
                    className="text-base font-rubik-semibold text-dark-400"
                    numberOfLines={1}
                  >
                    {item.property.title}
                  </Text>
                  <Text
                    className="text-sm font-rubik text-dark-300 mt-1"
                    numberOfLines={1}
                  >
                    {item.property.location}
                  </Text>

                  <View className="flex-row items-center mt-2">
                    <Image source={icons.bed} className="w-4 h-4" />
                    <Text className="text-xs font-rubik text-dark-300 ml-1 mr-3">
                      {item.property.bedrooms}
                    </Text>

                    <Image source={icons.bath} className="w-4 h-4" />
                    <Text className="text-xs font-rubik text-dark-300 ml-1 mr-3">
                      {item.property.bathrooms}
                    </Text>

                    <Image source={icons.area} className="w-4 h-4" />
                    <Text className="text-xs font-rubik text-dark-300 ml-1">
                      {item.property.area} sq.ft
                    </Text>
                  </View>

                  <View className="flex-row justify-between items-center mt-3">
                    <Text className="text-lg font-rubik-extrabold text-primary-300">
                      Ksh. {item.property.price.toLocaleString()}
                    </Text>

                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveItem(item.property.id, item.property.title)
                      }
                      className="p-2"
                    >
                      <Image
                        source={icons.delete}
                        className="w-5 h-5"
                        tintColor="#F75555"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Spacer for sticky button */}
        <View className="h-24" />
      </ScrollView>

      {/* Sticky Checkout Button */}
      <View className="absolute bottom-11 left-0 right-0 bg-white border-t border-light-200 px-5 py-8">
        <Link href="/payment" asChild>
          <TouchableOpacity
            onPress={handleCheckout}
            className="bg-primary-300 py-4 rounded-lg items-center"
          >
            <Text className="text-white text-lg font-rubik-semibold">
              {user ? "Proceed to Payment" : "Sign In to Checkout"}
            </Text>
            <Text className="text-light-400 font-rubik-semibold mt-1">
              Ksh. {(total * 1.05).toLocaleString()} • {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default ProcureScreen;
