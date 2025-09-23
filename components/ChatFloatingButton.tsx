// components/ChatFloatingButton.tsx
import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import icons from "@/constants/icons";

const ChatFloatingButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/chat-agent")}
      className="absolute bottom-6 right-5 w-14 h-14 bg-primary-300 rounded-full items-center justify-center shadow-lg shadow-black/30 z-50"
    >
      <Image source={icons.chat} className="w-6 h-6 tint-white" />
    </TouchableOpacity>
  );
};

export default ChatFloatingButton;
