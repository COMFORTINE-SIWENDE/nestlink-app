// contexts/ChatAgentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isEditing?: boolean;
  editedContent?: string;
}

interface ChatAgentContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
  clearChat: () => void;
  startEditing: (messageId: string) => void;
  cancelEditing: (messageId: string) => void;
  selectedMessages: string[];
  toggleMessageSelection: (messageId: string) => void;
  clearSelection: () => void;
  deleteSelectedMessages: () => void;
}

const ChatAgentContext = createContext<ChatAgentContextType | undefined>(
  undefined
);

export const ChatAgentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const sendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with different capabilities based on content
    setTimeout(() => {
      const response = generateAIResponse(content);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay for realism
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Property-related queries
    if (
      lowerMessage.includes("property") ||
      lowerMessage.includes("house") ||
      lowerMessage.includes("apartment")
    ) {
      return `I can help you with property information! Based on your query about "${userMessage}", I found several relevant properties in our database. Would you like me to:
      
• Show available properties matching your criteria?
• Provide pricing trends in specific areas?
• Explain the booking process?
• Compare different property types?

What specific information are you looking for?`;
    }

    // Pricing queries
    if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("expensive")
    ) {
      return `I can analyze pricing information for you! Current market trends show:
      
🏠 Average rental prices in Nairobi:
• Apartments: Ksh 15,000 - 45,000/month
• Houses: Ksh 30,000 - 120,000/month
• Studios: Ksh 10,000 - 25,000/month

I can provide more specific pricing if you tell me your preferred location and property type.`;
    }

    // Location queries
    if (
      lowerMessage.includes("location") ||
      lowerMessage.includes("area") ||
      lowerMessage.includes("where")
    ) {
      return `I have access to comprehensive location data! Popular areas in Nairobi include:

📍 **Westlands** - Commercial hub, great amenities
📍 **Kilimani** - Central location, modern apartments
📍 **Karen** - Quiet, spacious homes
📍 **Runda** - Premium residential area

I can show you available properties in any of these areas or help you compare locations.`;
    }

    // General real estate advice
    if (
      lowerMessage.includes("advice") ||
      lowerMessage.includes("tip") ||
      lowerMessage.includes("help")
    ) {
      return `As your Nestlink assistant, here are some expert tips:

💡 **Property Selection Tips:**
• Consider proximity to work/amenities
• Check security and neighborhood
• Verify property condition thoroughly
• Review all contract terms carefully

💡 **Booking Process:**
1. View properties and shortlist favorites
2. Schedule physical/virtual tours
3. Review and sign agreement
4. Make secure payment through our platform

Is there a specific aspect you'd like more detailed advice on?`;
    }

    // Default intelligent response
    return `Thank you for your message! As the Nestlink AI assistant, I can help you with:

🔍 **Property Search & Recommendations**
💰 **Pricing Analysis & Comparisons**
📍 **Location Insights & Area Guides**
📊 **Market Trends & Data Visualization**
🤝 **Booking Process Assistance**
❓ **General Real Estate Advice**

Based on your query "${userMessage}", I'd be happy to provide specific information. Could you tell me more about what you're looking for?`;
  };

  const editMessage = (messageId: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, content: newContent, isEditing: false }
          : msg
      )
    );
  };

  const deleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    setSelectedMessages((prev) => prev.filter((id) => id !== messageId));
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedMessages([]);
  };

  const startEditing = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, isEditing: true, editedContent: msg.content }
          : { ...msg, isEditing: false }
      )
    );
  };

  const cancelEditing = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isEditing: false } : msg
      )
    );
  };

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId)
        ? prev.filter((id) => id !== messageId)
        : [...prev, messageId]
    );
  };

  const clearSelection = () => {
    setSelectedMessages([]);
  };

  const deleteSelectedMessages = () => {
    setMessages((prev) =>
      prev.filter((msg) => !selectedMessages.includes(msg.id))
    );
    setSelectedMessages([]);
  };

  return (
    <ChatAgentContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatAgentContext.Provider>
  );
};

export const useChatAgent = () => {
  const context = useContext(ChatAgentContext);
  if (context === undefined) {
    throw new Error("useChatAgent must be used within a ChatAgentProvider");
  }
  return context;
};
