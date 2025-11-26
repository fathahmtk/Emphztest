import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, MOCK_PRODUCTS, MOCK_CASE_STUDIES } from '../constants';
import { ProductCategory, Product } from '../types';
import { Box, BookOpen, ChevronRight, FileText, Info, Send, Map } from 'lucide-react';

const Sitemap: React.FC = () => {
  const productsByCategory = Object.values(ProductCategory).reduce((acc, category) => {
    acc[category] = MOCK_PRODUCTS.filter(p => p.category === category);
    return acc;
  }, {} as Record<ProductCategory, Product[]>);

  return (
    <div className="bg-emphz-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Map size={40} className="text-emphz-orange mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-emphz-navy mt-2 mb-4">Site Map</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find everything you need in one place. Explore our full range of products, resources, and company information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Navigation */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-emphz-navy mb-6">Main Pages</h2>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="flex items-center text-gray-700 hover:text-emphz-orange font-medium transition-colors group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-emphz-orange transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Case Studies */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="flex items-center mb-6">
                <BookOpen size={20} className="mr-3 text-emphz-orange"/>
                <h2 className="text-xl font-bold text-emphz-navy">Case Studies</h2>
            </div>
            <ul className="space-y-4">
              {MOCK_CASE_STUDIES.map(study => (
                <li key={study.id}>
                  <Link to="/case-studies" className="flex items-center text-gray-700 hover:text-emphz-orange font-medium transition-colors group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-emphz-orange transition-colors" />
                    {study.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Resources */}
           <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-emphz-navy mb-6">Resources & Contact</h2>
             <ul className="space-y-4">
               <li><Link to="/technical" className="flex items-center text-gray-700 hover:text-emphz-orange font-medium transition-colors group"><FileText size={16} className="mr-2 text-gray-400 group-hover:text-emphz-orange" /> Technical Center</Link></li>
               <li><Link to="/about" className="flex items-center text-gray-700 hover:text-emphz-orange font-medium transition-colors group"><Info size={16} className="mr-2 text-gray-400 group-hover:text-emphz-orange" /> About Us</Link></li>
               <li><Link to="/rfq" className="flex items-center text-gray-700 hover:text-emphz-orange font-medium transition-colors group"><Send size={16} className="mr-2 text-gray-400 group-hover:text-emphz-orange" /> Request a Quote</Link></li>
             </ul>
          </div>

          {/* Products Section */}
          <div className="md:col-span-2 lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
             <div className="flex items-center mb-6">
                <Box size={20} className="mr-3 text-emphz-orange"/>
                <h2 className="text-xl font-bold text-emphz-navy">Product Catalog</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
              {Object.entries(productsByCategory).map(([category, products]) => (
                <div key={category}>
                  <h3 className="font-bold text-emphz-navy border-b-2 border-emphz-orange/50 pb-2 mb-4">{category}</h3>
                  <ul className="space-y-3">
                    {products.map(product => (
                      <li key={product.id}>
                        <Link to={`/products/${product.id}`} className="flex items-start text-sm text-gray-600 hover:text-emphz-orange font-medium transition-colors group">
                           <ChevronRight size={14} className="mr-2 mt-0.5 text-gray-400 group-hover:text-emphz-orange transition-colors flex-shrink-0" />
                           {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;