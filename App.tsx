import React from 'react';
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
import { RFQProvider } from './contexts/RFQContext';

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
