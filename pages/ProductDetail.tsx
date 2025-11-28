import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, FileText, Plus, Minus, ArrowLeft, Package, Settings, Download, Box, Image as ImageIcon, Camera, ArrowRight, Loader2, Share2, CheckCircle } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useRFQ } from '../contexts/RFQContext';
import { ProductCategory } from '../types';
import GatedDownloadModal from '../components/GatedDownloadModal';

// Lazy load the heavy 3D viewer component
const ThreeProductViewer = React.lazy(() => import('../components/ThreeProductViewer'));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { addItem } = useRFQ();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'downloads'>('desc');
  const [viewMode, setViewMode] = useState<'3D' | 'IMAGE'>('3D');
  const [activeImage, setActiveImage] = useState<string>('');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [fileToDownload, setFileToDownload] = useState<{ title: string; type: string } | null>(null);

  const is3DAvailable = useMemo(() => {
    if (!product) return false;
    return [
      ProductCategory.SMART_CABIN,
      ProductCategory.ENCLOSURE,
      ProductCategory.KIOSK,
      ProductCategory.CABIN,
      ProductCategory.AUTOMOBILE
    ].includes(product.category);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }
    const others = MOCK_PRODUCTS.filter(p => p.category !== product.category && p.id !== product.id);
    return [...sameCategory, ...others].slice(0, 3);
  }, [product]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
      setViewMode(is3DAvailable ? '3D' : 'IMAGE');
      window.scrollTo(0, 0);
    }
  }, [product, is3DAvailable]);

  if (!product) {
    return <div className="p-20 text-center text-slate-800">Product not found. <Link to="/products" className="text-emphz-orange font-bold">Go back</Link></div>;
  }

  const handleAddToRFQ = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      quantity
    });
    // Add subtle visual feedback or toast here instead of alert in production
    alert(`${quantity} unit(s) added to RFQ Cart`);
  };

  const handleDownloadClick = (file: { title: string; type: string }) => {
    setFileToDownload(file);
    setIsDownloadModalOpen(true);
  };

  const get3DType = () => {
    if (product.category === ProductCategory.ENCLOSURE) return 'ENCLOSURE';
    if (product.category === ProductCategory.KIOSK) return 'KIOSK';
    if (product.category === ProductCategory.CABIN) return 'CABIN';
    if (product.category === ProductCategory.SMART_CABIN) return 'SMART_CABIN';
    if (product.category === ProductCategory.AUTOMOBILE) return 'AUTOMOBILE';
    return 'DEFAULT';
  };

  const galleryImages = (product.gallery && product.gallery.length > 0) 
    ? product.gallery 
    : [
        product.imageUrl,
        `https://picsum.photos/seed/${product.id}-detail1/800/600`,
        `https://picsum.photos/seed/${product.id}-detail2/800/600`,
        `https://picsum.photos/seed/${product.id}-detail3/800/600`,
        `https://picsum.photos/seed/${product.id}-detail4/800/600`,
      ];

  return (
    <>
      <div className="bg-white min-h-screen text-slate-900 pb-24">
        {/* Hero for Product - Keep Dark for Impact */}
        <div className="relative h-[500px] lg:h-[700px] bg-[#050A14] overflow-hidden group">
          
          {is3DAvailable && (
            <div className="absolute top-24 right-4 md:right-8 z-30 flex flex-col gap-3">
               <button 
                 onClick={() => setViewMode(prev => prev === '3D' ? 'IMAGE' : '3D')}
                 className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-emphz-orange hover:border-emphz-orange transition-all shadow-xl flex items-center justify-center gap-2 group/toggle uppercase tracking-wide"
               >
                 {viewMode === '3D' ? (
                   <>
                     <ImageIcon size={16} className="group-hover/toggle:scale-110 transition-transform"/> 
                     <span>Photos</span>
                   </>
                 ) : (
                   <>
                     <Box size={16} className="group-hover/toggle:scale-110 transition-transform"/> 
                     <span>3D Model</span>
                   </>
                 )}
               </button>
               <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white p-2.5 rounded-full hover:bg-white/20 transition-all shadow-lg">
                  <Share2 size={18} />
               </button>
            </div>
          )}

          {viewMode === 'IMAGE' ? (
            <>
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover opacity-80 animate-fade-in transition-opacity duration-500 scale-105" key={activeImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/80 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full absolute inset-0 z-10 animate-fade-in">
               <Suspense fallback={
                 <div className="w-full h-full flex flex-col items-center justify-center bg-[#050A14] relative overflow-hidden">
                    {/* Technical Grid Background */}
                    <div className="absolute inset-0 opacity-20" style={{
                       backgroundImage: 'linear-gradient(rgba(0,173,181,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,173,181,0.3) 1px, transparent 1px)',
                       backgroundSize: '40px 40px'
                    }}></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative mb-8">
                           <div className="absolute inset-0 bg-emphz-orange/20 blur-2xl rounded-full"></div>
                           <Box className="w-16 h-16 text-emphz-orange animate-bounce relative z-10" strokeWidth={1} />
                        </div>
                        <span className="text-emphz-orange font-bold text-xs tracking-[0.4em] font-display animate-pulse">INITIALIZING ENGINE</span>
                    </div>
                 </div>
               }>
                  <ThreeProductViewer productType={get3DType()} />
               </Suspense>
               <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent pointer-events-none"></div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full p-6 lg:p-16 z-20 pointer-events-none">
             <div className="max-w-7xl mx-auto pointer-events-auto">
               <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-xs font-bold uppercase tracking-[0.2em]">
                 <ArrowLeft size={14} className="mr-2" aria-hidden="true" /> Catalog
               </Link>
               <div className="flex items-center gap-3 mb-4">
                 <div className="inline-block px-3 py-1 bg-emphz-orange text-white text-[10px] font-bold rounded uppercase tracking-wider shadow-lg shadow-emphz-orange/30 font-display">
                   {product.category}
                 </div>
                 {product.features.includes('UL94 Fire Rated') && (
                    <div className="inline-block px-3 py-1 bg-red-600/80 backdrop-blur text-white text-[10px] font-bold rounded uppercase tracking-wider font-display">
                      UL 94 V-0
                    </div>
                 )}
               </div>
               <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 leading-none drop-shadow-2xl font-display">{product.name}</h1>
               <p className="text-gray-400 font-mono text-xs opacity-80 border-l border-emphz-orange pl-3">SKU: {product.id.toUpperCase()}</p>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            
            <div className="lg:col-span-2">
               {/* Gallery Carousel */}
               <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] font-display">
                      Media Gallery
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400">01 / 0{galleryImages.length}</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
                      {galleryImages.map((img, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { setActiveImage(img); setViewMode('IMAGE'); }}
                            className={`relative w-28 h-28 md:w-40 md:h-40 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start group bg-gray-100 ${
                                activeImage === img && viewMode === 'IMAGE' 
                                ? 'border-emphz-orange ring-4 ring-emphz-orange/10 scale-105 z-10' 
                                : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
                            }`}
                          >
                             <img src={img} alt={`View ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </button>
                      ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                 {product.specs.slice(0,4).map((s, i) => (
                   <div key={i} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                     <div className="text-[9px] text-gray-400 uppercase font-bold mb-2 font-display tracking-widest">{s.label}</div>
                     <div className="text-sm font-bold text-emphz-navy font-mono break-words">{s.value}</div>
                   </div>
                 ))}
               </div>
               
               <div className="flex flex-wrap gap-4 my-10 p-8 bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-blue-100 shadow-sm justify-between items-center">
                  <div>
                    <h4 className="font-bold text-emphz-navy font-display mb-1">Technical Documentation</h4>
                    <p className="text-xs text-gray-500">Official datasheets and CAD drawings.</p>
                  </div>
                  <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <button onClick={() => handleDownloadClick({ title: product.downloads[0].title, type: 'PDF' })} className="flex-1 sm:flex-none flex items-center bg-emphz-navy text-white px-5 py-3 rounded-xl font-bold text-xs hover:bg-emphz-orange transition-all duration-300 shadow-lg shadow-emphz-navy/20 font-display tracking-wide uppercase">
                        <Download size={14} className="mr-2" /> PDF
                    </button>
                    <button onClick={() => handleDownloadClick({ title: "Engineer's Pack", type: 'ZIP' })} className="flex-1 sm:flex-none flex items-center bg-white border border-gray-200 text-emphz-navy px-5 py-3 rounded-xl font-bold text-xs hover:border-emphz-navy transition-all duration-300 font-display tracking-wide uppercase">
                        <Package size={14} className="mr-2" /> ZIP
                    </button>
                  </div>
               </div>

              <div className="mb-8 border-b border-gray-100">
                <div className="flex space-x-10" role="tablist" aria-label="Product Information">
                  {['desc', 'specs', 'downloads'].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-controls={`panel-${tab}`}
                      id={`tab-${tab}`}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 text-xs font-bold uppercase tracking-[0.15em] transition-all border-b-2 focus:outline-none font-display ${
                        activeTab === tab 
                        ? 'border-emphz-orange text-emphz-navy' 
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab === 'desc' ? 'Overview' : tab === 'specs' ? 'Specifications' : 'Downloads'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'desc' && (
                  <div key="desc" role="tabpanel" id="panel-desc" aria-labelledby="tab-desc" className="space-y-8 animate-fade-in">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed font-sans font-light">{product.fullDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-emphz-navy mb-5 font-display">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-start p-4 rounded-xl bg-gray-50 border border-gray-100/50 hover:border-gray-200 transition-colors">
                            <CheckCircle className="w-5 h-5 text-emphz-orange mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {product.accessories && (
                      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emphz-orange/20 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center mb-5">
                            <Settings className="text-emphz-orange mr-3" size={20} aria-hidden="true" />
                            <h3 className="font-bold font-display uppercase tracking-widest text-sm">Compatible Accessories</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                            {product.accessories.map((acc, i) => (
                                <span key={i} className="inline-flex items-center text-xs font-bold text-white bg-white/10 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition-colors font-mono">
                                <Plus size={12} className="text-emphz-orange mr-2" aria-hidden="true" /> {acc}
                                </span>
                            ))}
                            </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div key="specs" role="tabpanel" id="panel-specs" aria-labelledby="tab-specs" className="rounded-2xl overflow-hidden border border-gray-200 animate-fade-in shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Property</th>
                            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-500 uppercase tracking-widest font-display">Value / Standard</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {product.specs.map((spec, i) => (
                          <tr key={i} className={`hover:bg-blue-50/20 transition-colors ${i % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}`}>
                            <td className="px-6 py-5 whitespace-nowrap text-xs font-bold text-slate-500 w-1/3 font-display uppercase tracking-wider border-r border-gray-100">{spec.label}</td>
                            <td className="px-6 py-5 whitespace-nowrap text-sm text-emphz-navy font-mono font-medium">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
                        <p className="text-[10px] text-gray-400 font-mono">* All specifications subject to manufacturing tolerances.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'downloads' && (
                  <div key="downloads" role="tabpanel" id="panel-downloads" aria-labelledby="tab-downloads" className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.downloads.map((dl, i) => (
                        <button key={i} onClick={() => handleDownloadClick(dl)} className="text-left border border-gray-200 bg-white rounded-2xl p-6 flex items-start hover:border-emphz-orange hover:shadow-xl hover:shadow-gray-200/50 transition-all cursor-pointer group">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emphz-orange/10 transition-colors">
                             <FileText className="text-gray-400 group-hover:text-emphz-orange w-6 h-6 transition-colors" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-bold text-emphz-navy text-sm font-display mb-1">{dl.title}</h4>
                            <p className="text-xs text-gray-400 font-mono flex items-center">{dl.type} <span className="mx-2">•</span> 2.4 MB</p>
                          </div>
                          <Download size={18} className="ml-auto text-gray-300 group-hover:text-emphz-orange transition-colors" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Sticky Panel */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="bg-white p-8 rounded-3xl sticky top-28 border border-gray-100 shadow-xl shadow-gray-200/50">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-6 tracking-[0.2em] font-display">Configure & Quote</h3>
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                   <div className="text-3xl font-black text-emphz-navy font-display tracking-tight">RFQ</div>
                   <div className="text-green-600 text-[10px] font-bold flex items-center bg-green-50 px-3 py-1.5 rounded-full border border-green-100 font-mono uppercase tracking-wide">
                     <Check size={10} className="mr-1" /> Available
                   </div>
                </div>

                <div className="space-y-6">
                  <div>
                     <label className="text-[10px] text-gray-400 font-bold uppercase mb-3 block font-display tracking-wider">Select Quantity</label>
                     <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="p-4 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} aria-hidden="true"/>
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={quantity} 
                        className="flex-1 bg-transparent text-center text-emphz-navy font-bold focus:outline-none font-mono text-lg"
                        aria-label="Quantity"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="p-4 hover:bg-white hover:shadow-sm rounded-lg text-slate-600 transition-all"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} aria-hidden="true"/>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl text-center">
                     <p className="text-[10px] text-gray-500 font-mono mb-2">Bulk pricing applies for orders &gt; 50 units.</p>
                  </div>

                  <button 
                    onClick={handleAddToRFQ}
                    className="w-full bg-emphz-navy text-white font-black py-4 rounded-xl hover:bg-emphz-orange transition-all shadow-xl shadow-emphz-navy/20 hover:shadow-emphz-orange/40 text-xs uppercase tracking-widest font-display transform hover:-translate-y-1"
                  >
                    ADD TO QUOTE LIST
                  </button>

                   <button 
                    onClick={() => handleDownloadClick({ title: product.downloads[0].title, type: product.downloads[0].type })}
                    className="w-full border-2 border-gray-100 text-gray-500 font-bold py-3.5 rounded-xl hover:border-emphz-orange hover:text-emphz-orange transition-all text-xs uppercase tracking-widest flex items-center justify-center group font-display bg-transparent hover:bg-white"
                  >
                    <Download size={14} className="mr-2 group-hover:scale-110 transition-transform" /> Datasheet
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-mono leading-relaxed">
                    Need custom specs? Use the <Link to="/technical" className="text-emphz-orange hover:underline">Technical Assistant</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Solutions Section - Cards */}
          {relatedProducts.length > 0 && (
            <div className="mt-20 md:mt-32 border-t border-gray-200 pt-16 animate-fade-in">
                <h3 className="text-2xl font-bold text-emphz-navy mb-10 font-display">Alternative Configurations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedProducts.map(rp => (
                         <Link key={rp.id} to={`/products/${rp.id}`} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-emphz-orange/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1">
                            <div className="relative h-56 overflow-hidden">
                                <img src={rp.imageUrl} alt={rp.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-4 left-4">
                                     <div className="text-[9px] font-bold text-emphz-navy bg-white/90 backdrop-blur px-2 py-1 rounded-full uppercase tracking-wider shadow-sm font-display">{rp.category}</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-emphz-navy text-lg group-hover:text-emphz-orange transition-colors mb-3 font-display">{rp.name}</h4>
                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-sans">{rp.shortDescription}</p>
                            </div>
                         </Link>
                    ))}
                </div>
            </div>
          )}

        </div>

        {/* Mobile Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:hidden z-40 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
           <div className="flex-1">
              <div className="text-emphz-navy font-bold text-sm line-clamp-1 font-display">{product.name}</div>
              <div className="text-emphz-orange text-[10px] font-bold font-mono">SKU: {product.id.toUpperCase()}</div>
           </div>
           <button 
             onClick={handleAddToRFQ}
             className="bg-emphz-navy text-white font-bold px-8 py-3.5 rounded-xl text-xs hover:bg-emphz-orange transition-colors font-display uppercase tracking-widest shadow-lg"
           >
             ADD TO QUOTE
           </button>
        </div>
      </div>
      <GatedDownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        fileToDownload={fileToDownload}
      />
    </>
  );
};

export default ProductDetail;