// app/chat-agent.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import { ChatMessage, useChatAgent } from "@/context/ChatAgentContext";

const { width } = Dimensions.get("window");

const ChatAgentScreen = () => {
  const router = useRouter();
  const {
    messages,
    isTyping,
    sendMessage,
    editMessage,
    deleteMessage,
    clearChat,
    startEditing,
    cancelEditing,
    selectedMessages,
    toggleMessageSelection,
    clearSelection,
    deleteSelectedMessages,
  } = useChatAgent();

  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  // Typing animation
  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      await sendMessage(inputText);
      setInputText("");
    }
  };

  const handleEdit = (messageId: string, newContent: string) => {
    if (newContent.trim()) {
      editMessage(messageId, newContent);
    } else {
      cancelEditing(messageId);
    }
  };

  const confirmClearChat = () => {
    Alert.alert("Clear Chat", "Are you sure you want to clear all messages?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear All",
        style: "destructive",
        onPress: clearChat,
      },
    ]);
  };

  const confirmDeleteSelected = () => {
    if (selectedMessages.length === 0) return;

    Alert.alert(
      "Delete Messages",
      `Delete ${selectedMessages.length} selected message${
        selectedMessages.length > 1 ? "s" : ""
      }?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteSelectedMessages,
        },
      ]
    );
  };

  const MessageBubble = ({ message }: { message: ChatMessage }) => {
    const isSelected = selectedMessages.includes(message.id);
    const isUser = message.role === "user";

    if (message.isEditing) {
      return (
        <View
          className={`flex-row ${
            isUser ? "justify-end" : "justify-start"
          } mb-4 mx-4`}
        >
          <View
            className={`max-w-[80%] rounded-2xl p-4 ${
              isUser ? "bg-primary-300" : "bg-primary-100"
            }`}
          >
            <TextInput
              value={message.editedContent}
              onChangeText={(text) => editMessage(message.id, text)}
              multiline
              className="text-base font-rubik text-white"
              autoFocus
            />
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity
                onPress={() =>
                  handleEdit(message.id, message.editedContent || "")
                }
                className="bg-white px-3 py-1 rounded-lg mr-2"
              >
                <Text className="text-primary-300 text-sm font-rubik-semibold">
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => cancelEditing(message.id)}
                className="bg-light-300 px-3 py-1 rounded-lg"
              >
                <Text className="text-dark-300 text-sm font-rubik">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onLongPress={() => toggleMessageSelection(message.id)}
        onPress={() => {
          if (selectedMessages.length > 0) {
            toggleMessageSelection(message.id);
          }
        }}
        activeOpacity={0.7}
        className={`flex-row ${
          isUser ? "justify-end" : "justify-start"
        } mb-4 mx-4`}
      >
        <View
          className={`max-w-[80%] rounded-2xl p-4 relative ${
            isUser
              ? "bg-primary-300 rounded-br-none"
              : "bg-primary-100 rounded-bl-none"
          } ${isSelected ? "border-2 border-primary-400" : ""}`}
        >
          <Text
            className={`text-base font-rubik ${
              isUser ? "text-white" : "text-dark-400"
            }`}
          >
            {message.content}
          </Text>

          <Text
            className={`text-xs mt-2 ${
              isUser ? "text-primary-100" : "text-dark-300"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>

          {/* Selection indicator */}
          {isSelected && (
            <View className="absolute -top-2 -right-2 w-6 h-6 bg-primary-400 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-rubik-semibold">
                {selectedMessages.indexOf(message.id) + 1}
              </Text>
            </View>
          )}

          {/* Edit/Delete options for user messages */}
          {isUser && selectedMessages.length === 0 && (
            <View className="absolute -bottom-6 right-0 flex-row">
              <TouchableOpacity
                onPress={() => startEditing(message.id)}
                className="bg-dark-400 px-2 py-1 rounded-l-lg"
              >
                <Image source={icons.edit} className="w-3 h-3 tint-white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteMessage(message.id)}
                className="bg-danger px-2 py-1 rounded-r-lg ml-px"
              >
                <Image source={icons.delete} className="w-3 h-3 tint-white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const TypingIndicator = () => (
    <View className="flex-row justify-start mb-4 mx-4">
      <View className="bg-primary-100 rounded-2xl rounded-bl-none p-4 max-w-[60%]">
        <View className="flex-row items-center">
          <Animated.View
            style={{
              opacity: typingAnimation,
              transform: [
                {
                  translateY: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5],
                  }),
                },
              ],
            }}
            className="w-2 h-2 bg-primary-300 rounded-full mx-1"
          />
          <Animated.View
            style={{
              opacity: typingAnimation,
              transform: [
                {
                  translateY: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5],
                  }),
                },
              ],
            }}
            className="w-2 h-2 bg-primary-300 rounded-full mx-1"
          />
          <Animated.View
            style={{
              opacity: typingAnimation,
              transform: [
                {
                  translateY: typingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -5],
                  }),
                },
              ],
            }}
            className="w-2 h-2 bg-primary-300 rounded-full mx-1"
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-light-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>

          <View className="ml-3">
            <View className="flex-row items-center">
              <Image source={images.nl} className="w-8 h-8" />
              <Text className="text-xl font-rubik-extrabold text-dark-400 ml-2">
                Nestlink AI Assistant
              </Text>
            </View>
            <Text className="text-sm font-rubik text-primary-300">
              {isTyping ? "Typing..." : "Online • Ready to help"}
            </Text>
          </View>
        </View>

        <View className="flex-row">
          {selectedMessages.length > 0 ? (
            <>
              <TouchableOpacity onPress={clearSelection} className="p-2 mx-1">
                <Text className="text-primary-300 font-rubik-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDeleteSelected}
                className="p-2 mx-1"
              >
                <Text className="text-danger font-rubik-semibold">
                  Delete ({selectedMessages.length})
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={confirmClearChat} className="p-2">
              <Image source={icons.delete} className="w-5 h-5" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chat Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 && (
            <View className="flex-1 justify-center items-center mt-20 px-8">
              <Image source={images.nl} className="w-24 h-24 mb-6" />
              <Text className="text-2xl font-rubik-extrabold text-dark-400 text-center mb-3">
                Nestlink AI Assistant
              </Text>
              <Text className="text-base font-rubik text-dark-300 text-center mb-6">
                Hi! I'm your intelligent assistant. I can help you with property
                searches, pricing information, location insights, and much more!
              </Text>

              <View className="w-full">
                <Text className="text-sm font-rubik-semibold text-dark-400 mb-3">
                  Try asking me:
                </Text>

                {[
                  "Show me apartments in Westlands under Ksh 30,000",
                  "What's the average price for a 3-bedroom house?",
                  "Compare properties in Kilimani and Kileleshwa",
                  "Help me understand the booking process",
                ].map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => sendMessage(suggestion)}
                    className="bg-primary-100 p-3 rounded-lg mb-2"
                  >
                    <Text className="text-sm font-rubik text-dark-400">
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isTyping && <TypingIndicator />}

          {/* Spacer for input field */}
          <View className="h-20" />
        </ScrollView>

        {/* Input Area */}
        <View className="border-t border-light-200 bg-white px-4 py-3">
          <View className="flex-row items-center">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about properties..."
              multiline
              className="flex-1 bg-primary-100 rounded-2xl px-4 py-3 max-h-24 text-base font-rubik"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />

            <TouchableOpacity
              onPress={handleSend}
              disabled={!inputText.trim()}
              className={`ml-3 w-12 h-12 rounded-full items-center justify-center ${
                inputText.trim() ? "bg-primary-300" : "bg-primary-200"
              }`}
            >
              <Image
                source={icons.send}
                className="w-5 h-5"
                tintColor={inputText.trim() ? "#FFFFFF" : "#9BD1EF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatAgentScreen;
