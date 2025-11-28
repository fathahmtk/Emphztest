import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, FileText, Plus, Minus, ArrowLeft, Package, Settings, Download, Box, Image as ImageIcon, Camera, ArrowRight, Loader2 } from 'lucide-react';
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
    alert(`${quantity} unit(s) added to RFQ Cart`);
  };

  const handleDownloadClick = (file: { title: string; type: string }) => {
    setFileToDownload(file);
    setIsDownloadModalOpen(true);
  };

  const get3DType = () => {
    if (product.category === ProductCategory.ENCLOSURE) return 'ENCLOSURE';
    if (product.category === ProductCategory.KIOSK) return 'KIOSK';
    if (product.category === ProductCategory.CABIN) return 'KIOSK';
    if (product.category === ProductCategory.SMART_CABIN) return 'SMART_CABIN';
    if (product.category === ProductCategory.AUTOMOBILE) return 'AUTOMOBILE';
    return 'DEFAULT';
  };

  const galleryImages = [
    product.imageUrl,
    `https://picsum.photos/seed/${product.id}-detail1/800/600`,
    `https://picsum.photos/seed/${product.id}-detail2/800/600`,
    `https://picsum.photos/seed/${product.id}-detail3/800/600`,
    `https://picsum.photos/seed/${product.id}-detail4/800/600`,
  ];

  return (
    <>
      <div className="bg-slate-50 min-h-screen text-slate-900 pb-24">
        {/* Hero for Product - Keep Dark for Impact */}
        <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-b from-slate-900 to-emphz-navy overflow-hidden">
          
          {is3DAvailable && (
            <div className="absolute top-24 right-4 md:right-8 z-30">
               <button 
                 onClick={() => setViewMode(prev => prev === '3D' ? 'IMAGE' : '3D')}
                 className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-emphz-orange hover:border-emphz-orange transition-all shadow-xl flex items-center gap-2 group"
               >
                 {viewMode === '3D' ? (
                   <>
                     <ImageIcon size={16} className="group-hover:scale-110 transition-transform"/> 
                     <span>View Photos</span>
                   </>
                 ) : (
                   <>
                     <Box size={16} className="group-hover:scale-110 transition-transform"/> 
                     <span>View 3D Model</span>
                   </>
                 )}
               </button>
            </div>
          )}

          {viewMode === 'IMAGE' ? (
            <>
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover opacity-60 animate-fade-in transition-opacity duration-500" key={activeImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full absolute inset-0 z-10 animate-fade-in">
               <Suspense fallback={
                 <div className="w-full h-full flex items-center justify-center text-white bg-slate-900/50">
                    <Loader2 className="animate-spin mr-2" /> Loading 3D Engine...
                 </div>
               }>
                  <ThreeProductViewer productType={get3DType()} />
               </Suspense>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20 pointer-events-none">
             <div className="max-w-7xl mx-auto pointer-events-auto">
               <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
                 <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Back to Catalog
               </Link>
               <div className="inline-block px-3 py-1 bg-emphz-orange text-white text-xs font-bold rounded mb-4 uppercase tracking-wide shadow-lg font-display">
                 {product.category}
               </div>
               <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-4 leading-tight drop-shadow-xl font-display">{product.name}</h1>
               <p className="text-gray-300 font-mono text-xs opacity-70">SKU: {product.id.toUpperCase()}</p>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2">
               {/* Gallery Carousel */}
               <div className="mb-10">
                  <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest flex items-center font-display">
                    <Camera size={14} className="mr-2" /> Gallery
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                      {galleryImages.map((img, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { setActiveImage(img); setViewMode('IMAGE'); }}
                            className={`relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-center group bg-white shadow-sm ${
                                activeImage === img && viewMode === 'IMAGE' 
                                ? 'border-emphz-orange shadow-md scale-105 z-10' 
                                : 'border-gray-200 hover:border-emphz-orange/50 hover:scale-105'
                            }`}
                          >
                             <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          </button>
                      ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 {product.specs.slice(0,4).map((s, i) => (
                   <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                     <div className="text-[10px] text-gray-500 uppercase font-bold mb-1 font-display">{s.label}</div>
                     <div className="text-sm font-bold text-emphz-navy font-mono">{s.value}</div>
                   </div>
                 ))}
               </div>
               
               <div className="flex flex-wrap gap-4 my-8 p-6 bg-white rounded-2xl border border-blue-100 shadow-sm justify-center sm:justify-start">
                  <button onClick={() => handleDownloadClick({ title: product.downloads[0].title, type: 'PDF' })} className="flex items-center bg-emphz-orange text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-sky-600 transition-all duration-300 shadow-lg hover:shadow-emphz-orange/40 transform hover:-translate-y-1 font-display tracking-wide">
                     <Download size={16} className="mr-2" />
                     Download Datasheet (PDF)
                  </button>
                  <button onClick={() => handleDownloadClick({ title: "Engineer's Pack", type: 'ZIP' })} className="flex items-center bg-white border border-gray-300 text-emphz-navy px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 font-display tracking-wide">
                     <Package size={16} className="mr-2" />
                     Engineer's Pack (.zip)
                  </button>
               </div>

              <div className="border-b border-gray-200 mb-8">
                <div className="flex space-x-8" role="tablist" aria-label="Product Information">
                  {['desc', 'specs', 'downloads'].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-controls={`panel-${tab}`}
                      id={`tab-${tab}`}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors border-b-2 focus:outline-none font-display ${
                        activeTab === tab 
                        ? 'border-emphz-orange text-emphz-navy' 
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specs' : 'Downloads'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'desc' && (
                  <div key="desc" role="tabpanel" id="panel-desc" aria-labelledby="tab-desc" className="space-y-8 animate-fade-in">
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-600 leading-relaxed font-sans">{product.fullDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-emphz-navy mb-4 font-display">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-center p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
                            <span className="w-2 h-2 bg-emphz-orange rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-sm text-slate-700 font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {product.accessories && (
                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className="flex items-center mb-4">
                           <Settings className="text-emphz-orange mr-2" size={20} aria-hidden="true" />
                           <h3 className="font-bold text-emphz-navy font-display">Compatible Accessories</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.accessories.map((acc, i) => (
                            <span key={i} className="inline-flex items-center text-xs font-bold text-slate-600 bg-white px-3 py-2 rounded border border-gray-200 shadow-sm font-mono">
                              <Plus size={12} className="text-emphz-orange mr-2" aria-hidden="true" /> {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div key="specs" role="tabpanel" id="panel-specs" aria-labelledby="tab-specs" className="rounded-xl overflow-hidden border border-gray-200 animate-fade-in">
                    <table className="min-w-full divide-y divide-gray-200 border-collapse">
                      <tbody className="divide-y divide-gray-200">
                        {product.specs.map((spec, i) => (
                          <tr key={i} className={`hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-500 w-1/3 font-display uppercase tracking-wider border-r border-gray-100">{spec.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-emphz-navy font-mono font-medium">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'downloads' && (
                  <div key="downloads" role="tabpanel" id="panel-downloads" aria-labelledby="tab-downloads" className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.downloads.map((dl, i) => (
                        <button key={i} onClick={() => handleDownloadClick(dl)} className="text-left border border-gray-200 bg-white rounded-lg p-4 flex items-start hover:border-emphz-orange hover:shadow-md transition-all cursor-pointer group">
                          <FileText className="text-gray-400 group-hover:text-emphz-orange w-8 h-8 mr-4 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <h4 className="font-bold text-emphz-navy text-sm font-display">{dl.title}</h4>
                            <p className="text-xs text-gray-500 mt-1 font-mono">{dl.type} • 2.4 MB</p>
                          </div>
                          <Download size={16} className="ml-auto text-emphz-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 hidden lg:block">
              <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-blue-100 shadow-xl bg-white">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider font-display">Configure Quote</h3>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                   <div className="text-3xl font-black text-emphz-navy font-display">RFQ</div>
                   <div className="text-green-600 text-xs font-bold flex items-center bg-green-50 px-2 py-1 rounded border border-green-100 font-mono">
                     <Check size={12} className="mr-1" /> IN STOCK
                   </div>
                </div>

                <div className="space-y-4">
                  <div>
                     <label className="text-xs text-gray-500 font-bold uppercase mb-2 block font-display">Quantity</label>
                     <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="p-3 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} aria-hidden="true"/>
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={quantity} 
                        className="flex-1 bg-transparent text-center text-emphz-navy font-bold focus:outline-none font-mono"
                        aria-label="Quantity"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="p-3 hover:bg-white hover:shadow-sm rounded-md text-slate-600 transition-all"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} aria-hidden="true"/>
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddToRFQ}
                    className="w-full bg-emphz-navy text-white font-black py-4 rounded-lg hover:bg-emphz-orange transition-all shadow-lg text-sm uppercase tracking-wide font-display group"
                  >
                    ADD TO QUOTE LIST
                  </button>

                   <button 
                    onClick={() => handleDownloadClick({ title: product.downloads[0].title, type: product.downloads[0].type })}
                    className="w-full mt-3 border border-gray-300 text-slate-600 font-bold py-3 rounded-lg hover:border-emphz-orange hover:text-emphz-orange transition-all text-xs uppercase tracking-wide flex items-center justify-center group font-display"
                  >
                    <Download size={14} className="mr-2 group-hover:scale-110 transition-transform" /> Download Datasheet
                  </button>

                  <p className="text-[10px] text-gray-500 text-center mt-4 font-mono">
                    Bulk pricing applies for orders &gt; 50 units.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Solutions Section - Light */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 border-t border-gray-200 pt-12 animate-fade-in">
                <h3 className="text-2xl font-bold text-emphz-navy mb-8 font-display">Related Solutions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedProducts.map(rp => (
                         <Link key={rp.id} to={`/products/${rp.id}`} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emphz-orange transition-all duration-300 hover:shadow-lg">
                            <div className="relative h-48 overflow-hidden">
                                <img src={rp.imageUrl} alt={rp.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-4 left-4">
                                     <div className="text-[10px] font-bold text-emphz-orange uppercase tracking-wider mb-1 bg-white/90 backdrop-blur px-2 py-1 rounded inline-block shadow-sm font-display">{rp.category}</div>
                                </div>
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-emphz-navy text-lg group-hover:text-emphz-orange transition-colors mb-2 font-display">{rp.name}</h4>
                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed font-sans">{rp.shortDescription}</p>
                                <div className="mt-4 flex items-center text-xs font-bold text-emphz-navy group-hover:underline decoration-emphz-orange underline-offset-4 font-display">
                                    View Specs <ArrowRight size={12} className="ml-1" />
                                </div>
                            </div>
                         </Link>
                    ))}
                </div>
            </div>
          )}

        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-200 p-4 lg:hidden z-40 flex items-center gap-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
           <div className="flex-1">
              <div className="text-emphz-navy font-bold text-sm line-clamp-1 font-display">{product.name}</div>
              <div className="text-emphz-orange text-xs font-bold font-mono">SKU: {product.id.toUpperCase()}</div>
           </div>
           <button 
             onClick={handleAddToRFQ}
             className="bg-emphz-navy text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-emphz-orange transition-colors font-display"
           >
             ADD TO RFQ
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