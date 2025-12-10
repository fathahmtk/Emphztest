import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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

// Helper to get cookie by name
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

// Helper to set cookie
const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const RFQProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or Cookie to prevent data loss on refresh (B2B Best Practice)
  const [items, setItems] = useState<RFQItem[]>(() => {
    try {
      // 1. Try LocalStorage (Primary)
      const localSaved = localStorage.getItem('emphz_rfq_cart');
      if (localSaved) return JSON.parse(localSaved);

      // 2. Try Cookie (Secondary/Fallback)
      const cookieSaved = getCookie('emphz_rfq_cart');
      if (cookieSaved) return JSON.parse(decodeURIComponent(cookieSaved));

      return [];
    } catch (e) {
      console.error("Failed to load RFQ cart", e);
      return [];
    }
  });

  // Persist to BOTH LocalStorage and Cookies whenever items change
  useEffect(() => {
    try {
      const serialized = JSON.stringify(items);
      
      // Save to LocalStorage
      localStorage.setItem('emphz_rfq_cart', serialized);
      
      // Save to Cookie (valid for 30 days) - Useful for cross-subdomain or server-side checks if needed later
      setCookie('emphz_rfq_cart', encodeURIComponent(serialized), 30);
    } catch (e) {
      console.error("Failed to save RFQ cart", e);
    }
  }, [items]);

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