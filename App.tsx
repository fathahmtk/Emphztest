import React, { createContext, useState, useContext, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import TechnicalCenter from './pages/TechnicalCenter';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import RFQ from './pages/RFQ';
import Sitemap from './pages/Sitemap';
import { RFQItem } from './types';

// RFQ Context Setup
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

const RFQProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

const App: React.FC = () => {
  return (
    <RFQProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Catalog />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/technical" element={<TechnicalCenter />} />
            <Route path="/about" element={<About />} />
            <Route path="/rfq" element={<RFQ />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </RFQProvider>
  );
};

export default App;