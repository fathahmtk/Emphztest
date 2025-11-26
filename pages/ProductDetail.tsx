import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, FileText, Shield, Plus, Minus, ArrowLeft, Package, Settings, Download, Box, Image as ImageIcon, Camera } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useRFQ } from '../contexts/RFQContext';
import ThreeProductViewer from '../components/ThreeProductViewer';
import { ProductCategory } from '../types';
import GatedDownloadModal from '../components/GatedDownloadModal';

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

  useEffect(() => {
    if (product) {
      setActiveImage(product.imageUrl);
    }
  }, [product]);

  if (!product) {
    return <div className="p-20 text-center text-white">Product not found. <Link to="/products" className="text-emphz-orange">Go back</Link></div>;
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
    if (product.category === ProductCategory.CABIN) return 'KIOSK'; // Fallback similar shape
    if (product.category === ProductCategory.SMART_CABIN) return 'SMART_CABIN';
    if (product.category === ProductCategory.AUTOMOBILE) return 'AUTOMOBILE';
    return 'DEFAULT';
  };

  // Generate placeholder gallery images
  const galleryImages = [
    product.imageUrl,
    `https://picsum.photos/seed/${product.id}-detail1/800/600`,
    `https://picsum.photos/seed/${product.id}-detail2/800/600`,
    `https://picsum.photos/seed/${product.id}-detail3/800/600`,
    `https://picsum.photos/seed/${product.id}-detail4/800/600`,
  ];

  return (
    <>
      <div className="bg-emphz-navy min-h-screen text-white pb-24">
        {/* Header / Hero for Product */}
        <div className="relative h-[500px] lg:h-[600px] bg-gradient-to-b from-gray-900 to-emphz-navy overflow-hidden">
          
          <div className="absolute top-24 right-8 z-30 flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
             <button 
               onClick={() => setViewMode('3D')}
               className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${viewMode === '3D' ? 'bg-emphz-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <Box size={14} /> 3D View
             </button>
             <button 
               onClick={() => setViewMode('IMAGE')}
               className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'IMAGE' ? 'bg-emphz-orange text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
             >
               <ImageIcon size={14} /> Photos
             </button>
          </div>

          {viewMode === 'IMAGE' ? (
            <>
              <img src={activeImage} alt={product.name} className="w-full h-full object-cover opacity-50 animate-fade-in transition-opacity duration-500" key={activeImage} />
              <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-transparent to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full absolute inset-0 z-10 animate-fade-in">
               <ThreeProductViewer productType={get3DType()} />
               <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-transparent to-transparent pointer-events-none"></div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20 pointer-events-none">
             <div className="max-w-7xl mx-auto pointer-events-auto">
               <Link to="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
                 <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Back to Catalog
               </Link>
               <div className="inline-block px-3 py-1 bg-emphz-orange text-white text-xs font-bold rounded mb-4 uppercase tracking-wide shadow-lg">
                 {product.category}
               </div>
               <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight drop-shadow-xl">{product.name}</h1>
             </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2">
               {/* Gallery Carousel */}
               <div className="mb-10">
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest flex items-center">
                    <Camera size={14} className="mr-2" /> Gallery
                  </h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x scrollbar-hide">
                      {galleryImages.map((img, idx) => (
                          <button 
                            key={idx}
                            onClick={() => { setActiveImage(img); setViewMode('IMAGE'); }}
                            className={`relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 snap-start group ${
                                activeImage === img && viewMode === 'IMAGE' 
                                ? 'border-emphz-orange shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105 z-10' 
                                : 'border-white/10 hover:border-white/30 hover:scale-105'
                            }`}
                          >
                             <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             {/* Overlay for inactive state */}
                             {!(activeImage === img && viewMode === 'IMAGE') && (
                                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300"></div>
                             )}
                             {/* Active Indicator */}
                             {activeImage === img && viewMode === 'IMAGE' && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-emphz-orange"></div>
                             )}
                          </button>
                      ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                 {product.specs.slice(0,4).map((s, i) => (
                   <div key={i} className="glass-panel p-4 rounded-xl">
                     <div className="text-xs text-gray-400 uppercase font-bold mb-1">{s.label}</div>
                     <div className="text-sm font-bold text-white">{s.value}</div>
                   </div>
                 ))}
               </div>
               
               <div className="flex flex-wrap gap-4 my-8 p-6 glass-panel rounded-2xl border-emphz-orange/20 border justify-center sm:justify-start">
                  <button onClick={() => handleDownloadClick({ title: product.downloads[0].title, type: 'PDF' })} className="flex items-center bg-emphz-orange text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white hover:text-emphz-orange transition-all duration-300 shadow-lg hover:shadow-emphz-orange/40 transform hover:-translate-y-1">
                     <Download size={16} className="mr-2" />
                     Download Datasheet (PDF)
                  </button>
                  <button onClick={() => handleDownloadClick({ title: "Engineer's Pack", type: 'ZIP' })} className="flex items-center bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-white hover:text-emphz-navy transition-all duration-300 transform hover:-translate-y-1">
                     <Package size={16} className="mr-2" />
                     Engineer's Pack (.zip)
                  </button>
               </div>

              <div className="border-b border-white/10 mb-8">
                <div className="flex space-x-8" role="tablist" aria-label="Product Information">
                  {['desc', 'specs', 'downloads'].map((tab) => (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-controls={`panel-${tab}`}
                      id={`tab-${tab}`}
                      onClick={() => setActiveTab(tab as any)}
                      className={`pb-4 text-sm font-bold uppercase tracking-wide transition-colors border-b-2 focus:outline-none ${
                        activeTab === tab 
                        ? 'border-emphz-orange text-white' 
                        : 'border-transparent text-gray-500 hover:text-gray-300'
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
                    <div className="prose prose-invert max-w-none">
                      <p className="text-lg text-gray-300 leading-relaxed">{product.fullDescription}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.features.map((feat, i) => (
                          <div key={i} className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5">
                            <span className="w-2 h-2 bg-emphz-orange rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                            <span className="text-sm text-gray-300">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {product.accessories && (
                      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <div className="flex items-center mb-4">
                           <Settings className="text-emphz-orange mr-2" size={20} aria-hidden="true" />
                           <h3 className="font-bold text-white">Compatible Accessories</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.accessories.map((acc, i) => (
                            <span key={i} className="inline-flex items-center text-xs font-bold text-gray-300 bg-black/30 px-3 py-2 rounded border border-white/10">
                              <Plus size={12} className="text-emphz-orange mr-2" aria-hidden="true" /> {acc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div key="specs" role="tabpanel" id="panel-specs" aria-labelledby="tab-specs" className="rounded-xl overflow-hidden border border-white/10 animate-fade-in">
                    <table className="min-w-full divide-y divide-white/10">
                      <caption className="sr-only">Technical Specifications for {product.name}</caption>
                      <tbody className="divide-y divide-white/10">
                        {product.specs.map((spec, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-400 w-1/3">{spec.label}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{spec.value}</td>
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
                        <button key={i} onClick={() => handleDownloadClick(dl)} className="text-left border border-white/10 bg-white/5 rounded-lg p-4 flex items-start hover:bg-white/10 transition-colors cursor-pointer group">
                          <FileText className="text-gray-400 group-hover:text-white w-8 h-8 mr-4 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <h4 className="font-bold text-white text-sm">{dl.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">{dl.type} • 2.4 MB</p>
                          </div>
                          <Download size={16} className="ml-auto text-emphz-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-2xl sticky top-24 border border-emphz-orange/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">Configure Quote</h3>
                
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                   <div className="text-3xl font-black text-white">RFQ</div>
                   <div className="text-green-400 text-xs font-bold flex items-center bg-green-400/10 px-2 py-1 rounded">
                     <Check size={12} className="mr-1" /> In Stock (Mysore)
                   </div>
                </div>

                <div className="space-y-4">
                  <div>
                     <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Quantity</label>
                     <div className="flex items-center bg-black/40 rounded-lg border border-white/10 p-1">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                        className="p-3 hover:bg-white/10 rounded-md text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} aria-hidden="true"/>
                      </button>
                      <input 
                        type="text" 
                        readOnly 
                        value={quantity} 
                        className="flex-1 bg-transparent text-center text-white font-bold focus:outline-none"
                        aria-label="Quantity"
                      />
                      <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className="p-3 hover:bg-white/10 rounded-md text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} aria-hidden="true"/>
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddToRFQ}
                    className="w-full bg-white text-emphz-navy font-black py-4 rounded-lg hover:bg-emphz-orange hover:text-white transition-all shadow-lg text-sm uppercase tracking-wide"
                  >
                    ADD TO QUOTE LIST
                  </button>

                  <p className="text-[10px] text-gray-500 text-center mt-4">
                    Bulk pricing applied automatically for orders &gt; 50 units.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-emphz-navy/90 backdrop-blur-xl border-t border-white/10 p-4 lg:hidden z-40 flex items-center gap-4">
           <div className="flex-1">
              <div className="text-white font-bold text-sm line-clamp-1">{product.name}</div>
              <div className="text-emphz-orange text-xs font-bold">Molded GRP</div>
           </div>
           <button 
             onClick={handleAddToRFQ}
             className="bg-white text-emphz-navy font-bold px-6 py-3 rounded-lg text-sm hover:bg-emphz-orange hover:text-white transition-colors"
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