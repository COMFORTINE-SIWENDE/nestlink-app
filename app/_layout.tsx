import { AuthProvider } from "@/context/AuthContext";
import { ListingsProvider } from "@/context/ListingsContext";
import { ProcurementProvider } from "@/context/ProcurementContext";
import { FontAwesome5, Foundation, Ionicons } from "@expo/vector-icons"; // 👈 import your icons here
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load your custom fonts
  const [rubikFontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // Track if vector icon fonts are also loaded
  const [iconsLoaded, setIconsLoaded] = useState(false);

  // Preload vector icon fonts
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

  // Hide splash once everything is loaded
  useEffect(() => {
    if (rubikFontsLoaded && iconsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [rubikFontsLoaded, iconsLoaded]);

  if (!rubikFontsLoaded || !iconsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {" "}
      {/* ✅ Added */}
      <SafeAreaProvider>
        <AuthProvider>
          <ListingsProvider>
            <ProcurementProvider>
              <StatusBar style="auto" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#000" },
                }}
              />
            </ProcurementProvider>
          </ListingsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
