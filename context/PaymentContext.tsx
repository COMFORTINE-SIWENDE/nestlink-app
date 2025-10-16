// contexts/PaymentContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export type PaymentType = "property" | "relocation";

interface PaymentItem {
  id: string;
  type: PaymentType;
  amount: number;
  description: string;
  metadata: any; // Additional data specific to the payment type
}

interface PaymentContextType {
  paymentItems: PaymentItem[];
  addPaymentItem: (item: PaymentItem) => void;
  clearPaymentItems: () => void;
  total: number;
  itemCount: number;
  processMpesaPayment: (phoneNumber: string) => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paymentItems, setPaymentItems] = useState<PaymentItem[]>([]);

  const addPaymentItem = (item: PaymentItem) => {
    setPaymentItems((prev) => [...prev, item]);
  };

  const clearPaymentItems = () => {
    setPaymentItems([]);
  };

  const total = paymentItems.reduce((sum, item) => sum + item.amount, 0);
  const itemCount = paymentItems.length;

  const processMpesaPayment = async (phoneNumber: string): Promise<boolean> => {
    // Simulate M-Pesa Daraja API integration
    try {
      // In a real app, this would call your backend which integrates with M-Pesa Daraja API
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate successful payment
      return true;
    } catch (error) {
      console.error("Payment error:", error);
      return false;
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentItems,
        addPaymentItem,
        clearPaymentItems,
        total,
        itemCount,
        processMpesaPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
