import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Download, Scale, X, Check, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCategory, Product } from '../types';

// New Component: Comparison Modal
const CompareModal: React.FC<{
  productIds: string[];
  onClose: () => void;
}> = ({ productIds, onClose }) => {
  const productsToCompare = MOCK_PRODUCTS.filter(p => productIds.includes(p.id));
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and Escape key handling for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Gather all unique spec labels from the selected products
  const allSpecLabels = [...new Set(productsToCompare.flatMap(p => p.specs.map(s => s.label)))];

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-title"
    >
      <div className="bg-emphz-dark rounded-2xl border border-white/10 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-6 border-b border-white/10 flex-shrink-0">
          <h2 id="compare-title" className="text-2xl font-bold text-white">Compare Products</h2>
          <button 
            ref={closeButtonRef}
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close comparison"
          >
            <X size={24} />
          </button>
        </header>
        
        <div className="overflow-y-auto p-6">
          <div className={`grid gap-4`} style={{ gridTemplateColumns: `1fr repeat(${productsToCompare.length}, 2fr)`}}>
            {/* Header Row: Product Images & Names */}
            <div className="font-bold text-gray-400 sticky top-0 bg-emphz-dark py-2">Feature</div>
            {productsToCompare.map(product => (
              <div key={product.id} className="text-center sticky top-0 bg-emphz-dark py-2">
                <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mx-auto rounded-lg mb-2 border border-white/10"/>
                <h3 className="font-bold text-white text-sm">{product.name}</h3>
              </div>
            ))}

            {/* Divider */}
            <div className="col-span-full border-b border-white/10 -mx-6 my-4"></div>

            {/* Spec Rows */}
            {allSpecLabels.map(label => (
              <React.Fragment key={label}>
                <div className="font-bold text-gray-300 py-3 text-sm">{label}</div>
                {productsToCompare.map(product => {
                  const spec = product.specs.find(s => s.label === label);
                  return (
                    <div key={`${product.id}-${label}`} className="text-center py-3 text-white text-sm bg-white/5 rounded-md">
                      {spec?.value || <span className="text-gray-500">-</span>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = selectedCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(prev => prev.filter(itemId => itemId !== id));
    } else {
      if (compareList.length < 3) {
        setCompareList(prev => [...prev, id]);
      } else {
        alert("You can compare up to 3 products at a time.");
      }
    }
  };

  return (
    <>
      <div className="bg-emphz-navy min-h-screen py-12 relative text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8">
            <div>
              <div className="text-emphz-orange font-bold tracking-widest text-xs uppercase mb-2">The Collection</div>
              <h1 className="text-5xl font-black text-white mb-2">PRODUCT CATALOG</h1>
              <p className="text-gray-400 max-w-xl">Engineered GRP solutions for demanding environments. Browse our range of enclosures, kiosks, and modular cabins.</p>
            </div>
            <button className="flex items-center bg-white/10 hover:bg-emphz-orange border border-white/10 px-6 py-3 rounded-full text-sm font-bold transition-colors mt-6 md:mt-0 focus:ring-2 focus:ring-white">
              <Download className="mr-2" size={18} aria-hidden="true" /> Download Price List (PDF)
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters - Glass Style */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="glass-panel p-6 rounded-2xl sticky top-24">
                <div className="flex items-center mb-6 text-white font-bold uppercase tracking-wider text-sm">
                  <Filter size={16} className="mr-2" aria-hidden="true" /> Filters
                </div>
                
                <div className="mb-8">
                  <fieldset>
                    <legend className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Category</legend>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center cursor-pointer group py-1 relative">
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only peer"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                          />
                          <span className={`w-3 h-3 rounded-full mr-3 border border-gray-500 flex-shrink-0 transition-colors ${selectedCategory === cat ? 'bg-emphz-orange border-emphz-orange' : 'group-hover:border-white'} peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-2 peer-focus:ring-offset-emphz-navy`}></span>
                          <span className={`text-sm transition-colors ${selectedCategory === cat ? 'font-bold text-white' : 'text-gray-400 group-hover:text-white'}`}>
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <fieldset>
                    <legend className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Features</legend>
                    <div className="space-y-2 text-sm text-gray-400">
                      <label className="flex items-center hover:text-white cursor-pointer relative">
                          <input type="checkbox" className="sr-only peer" /> 
                          <span className="w-4 h-4 rounded border border-white/20 mr-2 flex items-center justify-center peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-2 peer-focus:ring-offset-emphz-navy bg-white/5 peer-checked:bg-emphz-orange peer-checked:border-emphz-orange transition-colors">
                              <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                          </span>
                          IP66 / IP67
                      </label>
                      <label className="flex items-center hover:text-white cursor-pointer relative">
                          <input type="checkbox" className="sr-only peer" /> 
                          <span className="w-4 h-4 rounded border border-white/20 mr-2 flex items-center justify-center peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-2 peer-focus:ring-offset-emphz-navy bg-white/5 peer-checked:bg-emphz-orange peer-checked:border-emphz-orange transition-colors">
                              <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                          </span>
                          UL94 Fire Rated
                      </label>
                      <label className="flex items-center hover:text-white cursor-pointer relative">
                          <input type="checkbox" className="sr-only peer" /> 
                          <span className="w-4 h-4 rounded border border-white/20 mr-2 flex items-center justify-center peer-focus:ring-2 peer-focus:ring-white peer-focus:ring-offset-2 peer-focus:ring-offset-emphz-navy bg-white/5 peer-checked:bg-emphz-orange peer-checked:border-emphz-orange transition-colors">
                              <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" />
                          </span>
                          ATEX / Ex-Proof
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isComparing = compareList.includes(product.id);
                  return (
                    <article key={product.id} className="glass-panel glass-card-hover rounded-2xl overflow-hidden flex flex-col h-[450px] group relative">
                      <div className="relative h-3/5 overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-transparent to-transparent"></div>
                        
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">
                          {product.category}
                        </div>
                        
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
                          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md transition-all border border-white/10 focus:ring-2 focus:ring-white ${isComparing ? 'bg-emphz-orange text-white' : 'bg-black/30 text-gray-300 hover:bg-white hover:text-black'}`}
                          aria-label={`Compare ${product.name}`}
                          aria-pressed={isComparing}
                        >
                          {isComparing ? <Check size={14} aria-hidden="true" /> : <Scale size={14} aria-hidden="true" />}
                        </button>
                      </div>

                      <div className="p-6 flex flex-col flex-grow relative">
                        <div className="absolute -top-12 left-6 right-6 flex space-x-2">
                          {product.specs.slice(0,2).map((s, i) => (
                              <span key={i} className="bg-emphz-navy/80 backdrop-blur border border-white/10 text-xs px-2 py-1 rounded text-gray-300">
                                {s.value}
                              </span>
                          ))}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-emphz-orange transition-colors">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{product.shortDescription}</p>
                        
                        <div className="mt-auto">
                          <Link 
                            to={`/products/${product.id}`} 
                            className="w-full flex items-center justify-between bg-white/5 hover:bg-emphz-orange text-white font-bold py-3 px-4 rounded-xl transition-all group/btn border border-white/10 focus:ring-2 focus:ring-white"
                          >
                            <span>VIEW SPECS</span>
                            <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-20 glass-panel rounded-2xl">
                  <h3 className="text-xl text-gray-400">No products found.</h3>
                  <button onClick={() => setSelectedCategory('All')} className="mt-4 text-emphz-orange font-bold hover:underline focus:ring-2 focus:ring-white rounded">Clear Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison Floating Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-fade-up" role="region" aria-label="Product Comparison">
            <div className="bg-black/90 backdrop-blur-xl text-white p-4 rounded-2xl shadow-2xl border border-emphz-orange/50 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {compareList.map(id => (
                    <div key={id} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                      <img src={MOCK_PRODUCTS.find(p => p.id === id)?.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-emphz-orange">{compareList.length}</span> selected
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setCompareList([])} className="text-gray-400 hover:text-white text-xs uppercase font-bold tracking-wider focus:ring-2 focus:ring-white rounded px-2">Clear</button>
                <button 
                  onClick={() => setIsCompareModalOpen(true)}
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-emphz-orange hover:text-white transition-colors text-sm focus:ring-2 focus:ring-white"
                >
                  COMPARE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {isCompareModalOpen && (
        <CompareModal 
          productIds={compareList} 
          onClose={() => setIsCompareModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Catalog;
