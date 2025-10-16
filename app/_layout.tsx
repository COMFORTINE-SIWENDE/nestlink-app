// app/_layout.tsx
import { FontAwesome5, Foundation, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import { ListingsProvider } from "../context/ListingsContext";
import { PaymentProvider } from "../context/PaymentContext";
import { ProcurementProvider } from "../context/ProcurementContext";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [rubikFontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  const [iconsLoaded, setIconsLoaded] = useState(false);

  useEffect(() => {
    async function loadIcons() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          ...FontAwesome5.font,
          ...Foundation.font,
        });
        setIconsLoaded(true);
      } catch (e) {
        console.warn("Error loading icon fonts", e);
      }
    }
    loadIcons();
  }, []);

  useEffect(() => {
    if (rubikFontsLoaded && iconsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [rubikFontsLoaded, iconsLoaded]);

  if (!rubikFontsLoaded || !iconsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ListingsProvider>
            <ProcurementProvider>
              <PaymentProvider>
                <StatusBar style="auto" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: "#fff" },
                  }}
                >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="property-details" />
                  <Stack.Screen name="register-property" />
                  <Stack.Screen name="property-registration" />
                  <Stack.Screen name="owner-dashboard" />
                  <Stack.Screen name="auth-choice" />
                  <Stack.Screen name="become-owner" />
                  <Stack.Screen name="sign-in" />
                  <Stack.Screen name="payment" />
                  <Stack.Screen name="edit-property/[id]" />
                </Stack>
              </PaymentProvider>
            </ProcurementProvider>
          </ListingsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
