import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Download, Scale, X, Check, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
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
      <div className="bg-emphz-dark rounded-2xl border border-white/10 shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <header className="flex justify-between items-center p-6 border-b border-white/10 flex-shrink-0 bg-emphz-navy/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
             <div className="bg-emphz-orange/20 p-2 rounded-lg">
               <Scale className="text-emphz-orange" size={24} />
             </div>
             <div>
                <h2 id="compare-title" className="text-2xl font-bold text-white">Compare Products</h2>
                <p className="text-xs text-gray-400">Side-by-side technical specification review</p>
             </div>
          </div>
          <button 
            ref={closeButtonRef}
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close comparison"
          >
            <X size={24} />
          </button>
        </header>
        
        <div className="overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-emphz-slate scrollbar-track-transparent">
          <div className={`grid gap-4`} style={{ gridTemplateColumns: `180px repeat(${productsToCompare.length}, 1fr)`}}>
            
            {/* Header Row: Product Images & Names */}
            <div className="font-bold text-gray-400 sticky top-0 bg-emphz-dark py-4 z-10 border-b border-white/10 flex items-end pb-4">
               Product Details
            </div>
            {productsToCompare.map(product => (
              <div key={product.id} className="text-center sticky top-0 bg-emphz-dark py-4 z-10 border-b border-white/10">
                <div className="relative inline-block">
                  <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mx-auto rounded-lg mb-3 border border-white/10 shadow-lg"/>
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-emphz-navy text-xs font-bold px-2 py-0.5 rounded border border-white/10">{product.id.split('-')[2] || 'V1'}</div>
                </div>
                <h3 className="font-bold text-white text-sm px-2 leading-tight min-h-[2.5em] flex items-center justify-center">{product.name}</h3>
              </div>
            ))}

            {/* Category Row */}
            <div className="font-bold text-gray-300 py-3 text-sm flex items-center border-b border-white/5">Category</div>
            {productsToCompare.map(p => (
              <div key={`cat-${p.id}`} className="text-center py-3 text-emphz-orange font-bold text-xs uppercase tracking-wide border-b border-white/5 bg-white/5 rounded-lg my-1 flex items-center justify-center">
                {p.category}
              </div>
            ))}

            {/* Divider */}
            <div className="col-span-full h-4"></div>

            {/* Spec Rows */}
            {allSpecLabels.map(label => (
              <React.Fragment key={label}>
                <div className="font-bold text-gray-400 py-3 text-sm flex items-center">{label}</div>
                {productsToCompare.map(product => {
                  const spec = product.specs.find(s => s.label === label);
                  return (
                    <div key={`${product.id}-${label}`} className="text-center py-3 text-white text-sm bg-white/5 rounded-lg my-1 flex items-center justify-center border border-white/5 hover:border-white/20 transition-colors">
                      {spec?.value || <span className="text-gray-600">-</span>}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* Divider */}
            <div className="col-span-full h-4 border-b border-white/10 mb-4"></div>

            {/* Features Row */}
            <div className="font-bold text-gray-300 py-3 text-sm">Key Highlights</div>
            {productsToCompare.map(p => (
               <div key={`feat-${p.id}`} className="py-3 text-left text-xs text-gray-300 bg-black/20 rounded-lg px-4 border border-white/5">
                  <ul className="space-y-2">
                    {p.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={12} className="text-emphz-orange mr-2 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-white/10 bg-emphz-navy/30 rounded-b-2xl flex justify-end">
             <button onClick={onClose} className="bg-white text-emphz-navy font-bold px-6 py-3 rounded-lg hover:bg-emphz-orange hover:text-white transition-colors">Close Comparison</button>
        </div>
      </div>
    </div>
  );
};

// New Component: Collapsible Filter Section
const FilterSection: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-white/10 last:border-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-4 text-left group focus:outline-none"
    >
      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      ) : (
        <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
      )}
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100 mb-4' : 'max-h-0 opacity-0'
      }`}
    >
      {children}
    </div>
  </div>
);


const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  // Accordion State
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    features: true
  });

  const categories = ['All', ...Object.values(ProductCategory)];
  const availableFeatures = ['IP66 / IP67', 'UL94 Fire Rated', 'ATEX / Ex-Proof'];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    let matchesFeatures = true;
    if (selectedFeatures.length > 0) {
      const productSearchString = (
        p.features.join(' ') + 
        p.specs.map(s => s.value).join(' ') + 
        p.name + 
        p.shortDescription
      ).toLowerCase();

      matchesFeatures = selectedFeatures.every(feature => {
        const f = feature.toLowerCase();
        if (f.includes('ip66')) return productSearchString.includes('ip66') || productSearchString.includes('ip67');
        if (f.includes('fire')) return productSearchString.includes('ul94') || productSearchString.includes('fire') || productSearchString.includes('v-0');
        if (f.includes('atex')) return productSearchString.includes('atex') || productSearchString.includes('proof') || productSearchString.includes('explosion') || productSearchString.includes('zone');
        return false;
      });
    }

    return matchesCategory && matchesFeatures;
  });

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

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };
  
  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return MOCK_PRODUCTS.length;
    return MOCK_PRODUCTS.filter(p => p.category === cat).length;
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
              <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-white/5">
                <div className="flex items-center mb-2 text-white font-bold uppercase tracking-wider text-sm pb-4 border-b border-white/10">
                  <Filter size={16} className="mr-2" aria-hidden="true" /> Filters
                </div>
                
                {/* Category Accordion */}
                <FilterSection 
                  title="Category" 
                  isOpen={openSections.category} 
                  onToggle={() => toggleSection('category')}
                >
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <label key={cat} className={`flex items-center justify-between cursor-pointer group py-2 pl-3 pr-2 rounded-lg transition-colors relative ${selectedCategory === cat ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                         <div className="flex items-center relative z-10">
                            <input 
                              type="radio" 
                              name="category" 
                              className="sr-only peer"
                              checked={selectedCategory === cat}
                              onChange={() => setSelectedCategory(cat)}
                            />
                            {/* Indicator */}
                            <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${selectedCategory === cat ? 'bg-emphz-orange scale-125' : 'bg-gray-600 group-hover:bg-gray-400'}`}></div>
                            
                            <span className={`text-sm transition-all duration-300 ${selectedCategory === cat ? 'font-bold text-white' : 'text-gray-400 group-hover:text-white'}`}>
                              {cat}
                            </span>
                         </div>
                         <span className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${selectedCategory === cat ? 'bg-emphz-orange text-white' : 'bg-black/30 text-gray-500 group-hover:text-gray-300'}`}>
                           {getCategoryCount(cat)}
                         </span>
                         
                         {/* Selection Highlight Bar */}
                         {selectedCategory === cat && (
                           <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-emphz-orange rounded-r-full"></div>
                         )}
                      </label>
                    ))}
                  </div>
                </FilterSection>

                {/* Features Accordion */}
                <FilterSection 
                  title="Key Specs" 
                  isOpen={openSections.features} 
                  onToggle={() => toggleSection('features')}
                >
                  <div className="space-y-2 mt-2">
                    {availableFeatures.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature);
                      return (
                        <label key={feature} className="flex items-center justify-between hover:bg-white/5 p-2 rounded-lg cursor-pointer relative group select-none transition-colors">
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                className="sr-only" 
                                checked={isSelected}
                                onChange={() => toggleFeature(feature)}
                              /> 
                              <span className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-all duration-200 ${
                                isSelected 
                                  ? 'bg-emphz-orange border-emphz-orange text-white' 
                                  : 'border-white/20 bg-white/5 group-hover:border-white/40'
                              }`}>
                                  <Check size={12} className={`transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                              </span>
                              <span className={`text-sm transition-colors ${isSelected ? 'text-white font-medium' : 'text-gray-400'}`}>
                                {feature}
                              </span>
                            </div>
                        </label>
                      );
                    })}
                  </div>
                </FilterSection>

                {/* Reset Filters */}
                {(selectedCategory !== 'All' || selectedFeatures.length > 0) && (
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSelectedFeatures([]); }}
                    className="w-full mt-6 py-2 text-xs font-bold text-gray-500 hover:text-white border border-dashed border-gray-600 hover:border-white rounded transition-colors uppercase tracking-wide"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => {
                  const isComparing = compareList.includes(product.id);
                  return (
                    <article key={product.id} className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[450px] group relative transition-all duration-300 hover:scale-[1.02] hover:border-emphz-orange/50 hover:shadow-2xl hover:bg-white/10">
                      <div className="relative h-3/5 overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-transparent to-transparent"></div>
                        
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 shadow-lg">
                          {product.category}
                        </div>
                        
                        <button 
                          onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
                          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md transition-all border border-white/10 focus:ring-2 focus:ring-white shadow-lg z-20 ${isComparing ? 'bg-emphz-orange text-white scale-110' : 'bg-black/40 text-gray-300 hover:bg-white hover:text-black hover:scale-110'}`}
                          aria-label={isComparing ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
                          aria-pressed={isComparing}
                        >
                          {isComparing ? <Check size={16} aria-hidden="true" /> : <Scale size={16} aria-hidden="true" />}
                        </button>
                      </div>

                      <div className="p-6 flex flex-col flex-grow relative">
                        <div className="absolute -top-12 left-6 right-6 flex space-x-2">
                          {product.specs.slice(0,2).map((s, i) => (
                              <span key={i} className="bg-emphz-navy/90 backdrop-blur border border-white/10 text-xs px-2 py-1 rounded text-gray-300 shadow-sm">
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
                  <h3 className="text-xl text-gray-400">No products match your filters.</h3>
                  <button onClick={() => { setSelectedCategory('All'); setSelectedFeatures([]); }} className="mt-4 text-emphz-orange font-bold hover:underline focus:ring-2 focus:ring-white rounded">Clear Filters</button>
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
                    <div key={id} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden relative group/thumb cursor-pointer" onClick={() => toggleCompare(id)} title="Click to remove">
                      <img src={MOCK_PRODUCTS.find(p => p.id === id)?.imageUrl} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                        <X size={14} />
                      </div>
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
                  className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-emphz-orange hover:text-white transition-colors text-sm focus:ring-2 focus:ring-white shadow-lg"
                >
                  COMPARE NOW
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