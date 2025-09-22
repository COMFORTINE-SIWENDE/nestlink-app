// app/(tabs)/_layout.tsx
import { useProcurement } from "@/context/ProcurementContext"; // Add this
import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

// If you have your own icons in @constants/icons
import icons from "@/constants/icons";

// Reusable Tab Icon
const TabIcon = ({
  focused,
  icon,
  title,
  badgeCount = 0, // Add badgeCount prop
}: {
  focused: boolean;
  icon: any;
  title: string;
  badgeCount?: number;
}) => {
  return (
    <View className="flex flex-col items-center mt-1">
      <View className="relative">
        <Image
          source={icon}
          tintColor={focused ? "#38B6FF" : "#666876"}
          resizeMode="contain"
          className="w-6 h-6"
        />
        {badgeCount > 0 && (
          <View className="absolute -top-2 -right-2 bg-danger w-5 h-5 rounded-full items-center justify-center">
            <Text className="text-white text-xs font-rubik-semibold">
              {badgeCount > 9 ? "9+" : badgeCount}
            </Text>
          </View>
        )}
      </View>
      <Text
        className={`${
          focused
            ? "text-[#050505] font-rubik-medium"
            : "text-[#666876] font-rubik"
        } text-xs mt-1`}
      >
        {title}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { itemCount } = useProcurement(); // Get procurement count

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0061ff",
        tabBarInactiveTintColor: "#666876",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopColor: "#0061FF1A",
          position: "absolute",
          borderTopWidth: 1,
          minHeight: 70,
        },
        headerShown: false,
      }}
    >
      {/* EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />

      {/* PROCURE */}
      <Tabs.Screen
        name="procure"
        options={{
          title: "Procure",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.procurement}
              focused={focused}
              title="Procure"
              badgeCount={itemCount} // Add badge count
            />
          ),
        }}
      />

      {/* MESSAGES */}
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.chat} focused={focused} title="Messages" />
          ),
        }}
      />

      {/* PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
