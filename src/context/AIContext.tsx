
import { createContext, useContext, useState, ReactNode } from "react";
import { AIMessage, Product } from "@/types";
import { products } from "@/data/products";
import { nanoid } from "nanoid";

interface AIContextType {
  messages: AIMessage[];
  isProcessing: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: nanoid(),
      role: "assistant",
      content: "Hi! I'm DevAI, your shopping assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = async (content: string): Promise<void> => {
    if (!content.trim()) return;

    const userMessage: AIMessage = {
      id: nanoid(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);

    // Simulate response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple AI response logic - in a real app, this would call an API
    let responseContent = "I'm sorry, I couldn't understand that. Can you try asking something else?";

    // Simple keyword matching for demo purposes
    const lowercaseContent = content.toLowerCase();
    
    if (lowercaseContent.includes("hello") || lowercaseContent.includes("hi")) {
      responseContent = "Hello! How can I help you find products today?";
    } else if (lowercaseContent.includes("help")) {
      responseContent = "I can help you find products, answer questions about items, or give recommendations. Just ask away!";
    } else if (lowercaseContent.includes("laptop") || lowercaseContent.includes("computer")) {
      const laptops = products.filter(p => 
        p.name.toLowerCase().includes("laptop") ||
        p.description.toLowerCase().includes("laptop")
      );
      if (laptops.length) {
        responseContent = `I found ${laptops.length} laptop(s) that might interest you! You can check them out in our Electronics category.`;
      } else {
        responseContent = "We have some great laptops in our Electronics section. Would you like me to show you those?";
      }
    } else if (lowercaseContent.includes("headphone") || lowercaseContent.includes("earphone") || lowercaseContent.includes("audio")) {
      responseContent = "We have some premium wireless headphones that customers love! Would you like me to show you our top audio products?";
    } else if (lowercaseContent.includes("recommend") || lowercaseContent.includes("suggestion")) {
      responseContent = "Based on popular items, I'd recommend our Premium Wireless Headphones or Ultra-Slim Laptop if you're looking for electronics. Is there a specific category you're interested in?";
    } else if (lowercaseContent.includes("price") || lowercaseContent.includes("cost") || lowercaseContent.includes("cheap") || lowercaseContent.includes("expensive")) {
      responseContent = "Our products range from ₹7,999 to ₹120,000. Can you tell me your budget, and I'll recommend products within that range?";
    } else if (lowercaseContent.includes("offer") || lowercaseContent.includes("discount") || lowercaseContent.includes("deal")) {
      responseContent = "We currently have special offers on selected Electronics and Wearables. Would you like me to show you our featured deals?";
    } else if (lowercaseContent.includes("thank")) {
      responseContent = "You're welcome! Feel free to ask if you need any more help with your shopping.";
    } else if (lowercaseContent.includes("bye") || lowercaseContent.includes("goodbye")) {
      responseContent = "Have a great day! Come back anytime if you need assistance with your shopping.";
    }

    const assistantMessage: AIMessage = {
      id: nanoid(),
      role: "assistant",
      content: responseContent,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: nanoid(),
        role: "assistant",
        content: "Hi! I'm DevAI, your shopping assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <AIContext.Provider
      value={{
        messages,
        isProcessing,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
