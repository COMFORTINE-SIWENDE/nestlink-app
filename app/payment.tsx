// app/payment.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { usePayment } from "@/context/PaymentContext";
import icons from "@/constants/icons";

const PaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    paymentItems,
    total,
    itemCount,
    clearPaymentItems,
    processMpesaPayment,
  } = usePayment();

  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mpesaStage, setMpesaStage] = useState<
    "input" | "processing" | "success" | "error"
  >("input");

  const paymentType = (params.type as "property" | "relocation") || "property";

  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: icons.mpesa,
      description: "Pay instantly with M-Pesa",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: icons.card,
      description: "Pay with your card",
    },
    {
      id: "airtel",
      name: "Airtel Money",
      icon: icons.airtel,
      description: "Airtel Money payment",
    },
    {
      id: "cash",
      name: "Cash",
      icon: icons.cash,
      description: "Pay with cash on delivery",
    },
  ];

  const handleMpesaPayment = async () => {
    if (
      !phoneNumber ||
      phoneNumber.length !== 10 ||
      !phoneNumber.startsWith("07")
    ) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid Kenyan phone number (07XXXXXXXX)"
      );
      return;
    }

    setIsProcessing(true);
    setMpesaStage("processing");

    const success = await processMpesaPayment(phoneNumber);

    setIsProcessing(false);

    if (success) {
      setMpesaStage("success");
      Alert.alert(
        "Payment Successful!",
        `Your ${paymentType} payment of Ksh. ${total.toLocaleString()} was processed successfully.`,
        [
          {
            text: "OK",
            onPress: () => {
              clearPaymentItems();
              // Navigate based on payment type
              if (paymentType === "property") {
                router.replace("/(tabs)/procure");
              } else {
                router.replace("/(tabs)/relocate");
              }
            },
          },
        ]
      );
    } else {
      setMpesaStage("error");
      Alert.alert(
        "Payment Failed",
        "Please try again or use a different payment method."
      );
    }
  };

  const formatPhoneNumber = (text: string) => {
    // Remove non-numeric characters and limit to 10 digits
    const cleaned = text.replace(/\D/g, "").slice(0, 10);
    return cleaned;
  };

  const renderMpesaContent = () => {
    switch (mpesaStage) {
      case "input":
        return (
          <View className="space-y-4">
            <Text className="text-base font-rubik-semibold text-dark-400">
              Enter Your M-Pesa Number
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
              placeholder="07XXXXXXXX"
              keyboardType="phone-pad"
              maxLength={10}
              className="bg-white border border-primary-200 rounded-lg px-4 py-3 font-rubik text-center text-lg"
              placeholderTextColor="#9CA3AF"
            />
            <Text className="text-sm font-rubik text-dark-300 text-center">
              You will receive an M-Pesa prompt on this number
            </Text>
          </View>
        );

      case "processing":
        return (
          <View className="items-center space-y-4">
            <ActivityIndicator size="large" color="#38B6FF" />
            <Text className="text-base font-rubik-semibold text-dark-400">
              Processing M-Pesa Payment...
            </Text>
            <Text className="text-sm font-rubik text-dark-300 text-center">
              Please check your phone and enter your M-Pesa PIN when prompted
            </Text>
          </View>
        );

      case "success":
        return (
          <View className="items-center space-y-4">
            <Image source={icons.success} className="w-16 h-16" />
            <Text className="text-base font-rubik-semibold text-green-600">
              Payment Successful!
            </Text>
          </View>
        );

      case "error":
        return (
          <View className="items-center space-y-4">
            <Image source={icons.error} className="w-16 h-16" />
            <Text className="text-base font-rubik-semibold text-danger">
              Payment Failed
            </Text>
            <Text className="text-sm font-rubik text-dark-300 text-center">
              Please try again or use a different payment method
            </Text>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center mt-5">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-extrabold text-dark-400 ml-4">
            {paymentType === "property"
              ? "Property Payment"
              : "Relocation Payment"}
          </Text>
        </View>

        {/* Order Summary */}
        <View className="bg-primary-100 p-5 rounded-lg mt-6">
          <Text className="text-lg font-rubik-semibold text-dark-400 mb-3">
            Order Summary
          </Text>

          {paymentItems.map((item, index) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center mb-2"
            >
              <Text className="text-base font-rubik text-dark-300 flex-1">
                {item.description}
              </Text>
              <Text className="text-base font-rubik-semibold text-dark-400">
                Ksh. {item.amount.toLocaleString()}
              </Text>
            </View>
          ))}

          <View className="h-px bg-primary-200 my-3" />

          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-rubik-semibold text-dark-400">
              Total
            </Text>
            <Text className="text-lg font-rubik-extrabold text-primary-300">
              Ksh. {total.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View className="mt-8">
          <Text className="text-lg font-rubik-semibold text-dark-400 mb-4">
            Select Payment Method
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => {
                setSelectedMethod(method.id);
                setMpesaStage("input");
              }}
              className={`flex-row items-center p-4 rounded-lg mb-3 border ${
                selectedMethod === method.id
                  ? "border-primary-300 bg-primary-50"
                  : "border-light-200 bg-white"
              }`}
            >
              <Image source={method.icon} className="w-8 h-8" />
              <View className="ml-4 flex-1">
                <Text className="text-base font-rubik-semibold text-dark-400">
                  {method.name}
                </Text>
                <Text className="text-sm font-rubik text-dark-300">
                  {method.description}
                </Text>
              </View>
              <View
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedMethod === method.id
                    ? "bg-primary-300 border-primary-300"
                    : "border-light-300"
                }`}
              >
                {selectedMethod === method.id && (
                  <View className="w-3 h-3 rounded-full bg-white m-0.5" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method Details */}
        <View className="mt-6 bg-primary-50 p-4 rounded-lg">
          {selectedMethod === "mpesa" && renderMpesaContent()}

          {selectedMethod === "card" && (
            <View className="space-y-4">
              <Text className="text-base font-rubik-semibold text-dark-400">
                Card Details
              </Text>

              <TextInput
                placeholder="Card Number"
                className="bg-white border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik"
                placeholderTextColor="#9CA3AF"
              />

              <View className="flex-row space-x-3">
                <TextInput
                  placeholder="MM/YY"
                  className="bg-white border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik flex-1"
                  placeholderTextColor="#9CA3AF"
                />
                <TextInput
                  placeholder="CVV"
                  className="bg-white border border-primary-200 rounded-lg px-4 py-3 text-base font-rubik flex-1"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                />
              </View>
            </View>
          )}

          {selectedMethod === "cash" && (
            <Text className="text-base font-rubik text-dark-300">
              Pay with cash when the service is delivered. Our driver will
              provide a receipt.
            </Text>
          )}
        </View>

        <View className="h-32" />
      </ScrollView>

      {/* Sticky Payment Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
        {selectedMethod === "mpesa" && mpesaStage === "input" && (
          <TouchableOpacity
            onPress={handleMpesaPayment}
            disabled={!phoneNumber || phoneNumber.length !== 10}
            className={`py-4 rounded-lg items-center ${
              !phoneNumber || phoneNumber.length !== 10
                ? "bg-primary-200"
                : "bg-primary-300"
            }`}
          >
            <Text className="text-white text-lg font-rubik-semibold">
              Pay Ksh. {total.toLocaleString()} with M-Pesa
            </Text>
          </TouchableOpacity>
        )}

        {selectedMethod !== "mpesa" && (
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Coming Soon",
                "This payment method will be available soon."
              )
            }
            className="bg-primary-300 py-4 rounded-lg items-center"
          >
            <Text className="text-white text-lg font-rubik-semibold">
              Pay Ksh. {total.toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}

        {mpesaStage === "processing" && (
          <View className="bg-primary-200 py-4 rounded-lg items-center">
            <Text className="text-white text-lg font-rubik-semibold">
              Processing... Please wait
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
