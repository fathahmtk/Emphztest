import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RFQItem } from '../types';

interface RFQContextType {
  items: RFQItem[];
  addItem: (item: RFQItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const RFQContext = createContext<RFQContextType | undefined>(undefined);

export const useRFQ = () => {
  const context = useContext(RFQContext);
  if (!context) {
    throw new Error('useRFQ must be used within an RFQProvider');
  }
  return context;
};

export const RFQProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<RFQItem[]>([]);

  const addItem = (newItem: RFQItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === newItem.productId);
      if (existing) {
        return prev.map(i => i.productId === newItem.productId ? { ...i, quantity: i.quantity + newItem.quantity } : i);
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.productId !== id));
  };

  const clearCart = () => setItems([]);

  return (
    <RFQContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </RFQContext.Provider>
  );
};
