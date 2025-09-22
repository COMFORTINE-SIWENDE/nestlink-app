// app/payment.tsx
import icons from "@/constants/icons";
import { useProcurement } from "@/context/ProcurementContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentScreen = () => {
  const router = useRouter();
  const { total, itemCount, clearProcurement } = useProcurement();
  const [selectedMethod, setSelectedMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: "mpesa", name: "M-Pesa", icon: icons.mpesa },
    { id: "airtel", name: "Airtel Money", icon: icons.airtel },
    { id: "card", name: "Credit/Debit Card", icon: icons.card },
    { id: "bank", name: "Bank Transfer", icon: icons.bank },
    { id: "cash", name: "Cash on Delivery", icon: icons.cash },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        "Payment Successful!",
        "Your payment has been processed successfully. You will receive a confirmation shortly.",
        [
          {
            text: "OK",
            onPress: () => {
              clearProcurement();
              router.replace("./procure");
            },
          },
        ]
      );
    }, 3000);
  };

  const totalAmount = total * 1.05; // Including 5% service fee

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center mt-5">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-2xl font-rubik-extrabold text-dark-400 ml-4">
            Payment
          </Text>
        </View>

        {/* Order Summary */}
        <View className="bg-primary-100 p-5 rounded-lg mt-6">
          <Text className="text-lg font-rubik-semibold text-dark-400 mb-3">
            Order Summary
          </Text>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-rubik text-dark-300">
              Items ({itemCount})
            </Text>
            <Text className="text-base font-rubik-semibold text-dark-400">
              Ksh. {total.toLocaleString()}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base font-rubik text-dark-300">
              Service Fee
            </Text>
            <Text className="text-base font-rubik-semibold text-dark-400">
              Ksh. {(total * 0.05).toLocaleString()}
            </Text>
          </View>

          <View className="h-px bg-primary-200 my-3" />

          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-rubik-semibold text-dark-400">
              Total
            </Text>
            <Text className="text-lg font-rubik-extrabold text-primary-300">
              Ksh. {totalAmount.toLocaleString()}
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
              onPress={() => setSelectedMethod(method.id)}
              className={`flex-row items-center p-4 rounded-lg mb-3 border ${
                selectedMethod === method.id
                  ? "border-primary-300 bg-primary-50"
                  : "border-light-200 bg-white"
              }`}
            >
              <Image source={method.icon} className="w-8 h-8" />
              <Text className="text-base font-rubik-semibold text-dark-400 ml-4 flex-1">
                {method.name}
              </Text>
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

        {/* Payment Details based on selection */}
        {selectedMethod === "mpesa" && (
          <View className="mt-6 bg-primary-50 p-4 rounded-lg">
            <Text className="text-base font-rubik-semibold text-dark-400 mb-2">
              M-Pesa Instructions
            </Text>
            <Text className="text-sm font-rubik text-dark-300">
              1. Go to M-Pesa on your phone{"\n"}
              2. Select Lipa Na M-Pesa{"\n"}
              3. Enter till number 123456{"\n"}
              4. Enter amount: Ksh. {totalAmount.toLocaleString()}
              {"\n"}
              5. Enter your M-Pesa PIN{"\n"}
              6. Confirm payment
            </Text>
          </View>
        )}

        {selectedMethod === "card" && (
          <View className="mt-6 bg-primary-50 p-4 rounded-lg">
            <Text className="text-base font-rubik-semibold text-dark-400 mb-4">
              Enter Card Details
            </Text>

            <View className="bg-white p-3 rounded-lg mb-3">
              <Text className="text-sm font-rubik text-dark-300 mb-1">
                Card Number
              </Text>
              <Text className="text-base font-rubik-semibold text-dark-400">
                **** **** **** 1234
              </Text>
            </View>

            <View className="flex-row">
              <View className="bg-white p-3 rounded-lg flex-1 mr-2">
                <Text className="text-sm font-rubik text-dark-300 mb-1">
                  Expiry Date
                </Text>
                <Text className="text-base font-rubik-semibold text-dark-400">
                  12/25
                </Text>
              </View>

              <View className="bg-white p-3 rounded-lg flex-1 ml-2">
                <Text className="text-sm font-rubik text-dark-300 mb-1">
                  CVV
                </Text>
                <Text className="text-base font-rubik-semibold text-dark-400">
                  ***
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Spacer for sticky button */}
        <View className="h-32" />
      </ScrollView>

      {/* Sticky Payment Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-light-200 px-5 py-4">
        <TouchableOpacity
          onPress={handlePayment}
          disabled={isProcessing}
          className={`py-4 rounded-lg items-center ${
            isProcessing ? "bg-primary-200" : "bg-primary-300"
          }`}
        >
          <Text className="text-white text-lg font-rubik-semibold">
            {isProcessing
              ? "Processing Payment..."
              : `Pay Ksh. ${totalAmount.toLocaleString()}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentScreen;
