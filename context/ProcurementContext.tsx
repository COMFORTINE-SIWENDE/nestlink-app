// contexts/ProcurementContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Listing } from "@/types";

interface ProcurementItem {
  property: Listing;
  addedAt: Date;
}

interface ProcurementContextType {
  items: ProcurementItem[];
  addToProcurement: (property: Listing) => void;
  removeFromProcurement: (propertyId: string) => void;
  clearProcurement: () => void;
  total: number;
  itemCount: number;
}

const ProcurementContext = createContext<ProcurementContextType | undefined>(
  undefined
);

export const ProcurementProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<ProcurementItem[]>([]);

  const addToProcurement = (property: Listing) => {
    setItems((prev) => {
      // Check if item already exists
      if (prev.some((item) => item.property.id === property.id)) {
        return prev;
      }
      return [...prev, { property, addedAt: new Date() }];
    });
  };

  const removeFromProcurement = (propertyId: string) => {
    setItems((prev) => prev.filter((item) => item.property.id !== propertyId));
  };

  const clearProcurement = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.property.price, 0);
  const itemCount = items.length;

  return (
    <ProcurementContext.Provider
      value={{
        items,
        addToProcurement,
        removeFromProcurement,
        clearProcurement,
        total,
        itemCount,
      }}
    >
      {children}
    </ProcurementContext.Provider>
  );
};

export const useProcurement = () => {
  const context = useContext(ProcurementContext);
  if (context === undefined) {
    throw new Error("useProcurement must be used within a ProcurementProvider");
  }
  return context;
};
