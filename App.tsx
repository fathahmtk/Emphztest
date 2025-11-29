import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RFQProvider } from './contexts/RFQContext';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const TechnicalCenter = lazy(() => import('./pages/TechnicalCenter'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const About = lazy(() => import('./pages/About'));
const RFQ = lazy(() => import('./pages/RFQ'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center text-emphz-navy w-full">
    <div className="flex flex-col items-center">
      <Loader2 className="w-8 h-8 animate-spin text-emphz-orange mb-2" />
      <span className="text-xs font-bold uppercase tracking-widest opacity-50">Loading Assets...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <RFQProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Catalog />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/technical" element={<TechnicalCenter />} />
              <Route path="/about" element={<About />} />
              <Route path="/rfq" element={<RFQ />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </RFQProvider>
  );
};

export default App;