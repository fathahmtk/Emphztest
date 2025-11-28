import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Zap, Box, Layers, Maximize, FileText } from 'lucide-react';
import { INDUSTRIES, MOCK_PRODUCTS } from '../constants';

const ScrollRevealIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75'
      }`}
    >
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col bg-white text-emphz-navy overflow-x-hidden motion-safe:scroll-smooth">
      
      {/* 1. Immersive Hero Section - FULL WIDE & FULL SCREEN */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-emphz-navy">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
           {/* 
              Video/Image Description: 
              Focus on EMPHZ GRP/FRP enclosure product line. Multiple units with doors opening dynamically 
              to show interior versatility. Each open door reveals a stylized micro-environment — 
              domestic, commercial, or office — represented by mini characters. 3D realism, glossy 
              composite textures, wide hero frame, premium lighting, futuristic industrial mood.
           */}
           <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover scale-105"
            // Updated poster to match "Glossy 3D Industrial" mood
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
           >
             {/* Using existing video as base, overlaid with new aesthetic context */}
             <source src="https://photos.app.goo.gl/cjnhX613fug9KF8W7" type="video/mp4" />
             <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
              alt="Futuristic GRP Enclosures - Glossy Industrial Texture"
              className="w-full h-full object-cover"
             />
           </video>
           
           {/* Dark Overlays for Text Readability - Enhanced for "Futuristic Mood" */}
           <div className="absolute inset-0 bg-emphz-navy/30 mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-emphz-navy via-emphz-navy/60 to-transparent"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        {/* Content Container - Expanded for Full Wide Effect */}
        <div className="w-full px-6 md:px-12 lg:px-24 relative z-10 grid lg:grid-cols-12 gap-12 items-center h-full">
          
          <div className="lg:col-span-9 space-y-6 md:space-y-8 motion-safe:animate-fade-up pt-16 md:pt-0">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl ring-1 ring-white/10">
                <span className="w-2 h-2 bg-emphz-orange rounded-full mr-3 motion-safe:animate-pulse shadow-[0_0_10px_#00ADB5]"></span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white font-display">Next-Gen Composites</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display leading-[1.1] md:leading-[0.85] tracking-tighter text-white drop-shadow-2xl">
              ONE ENCLOSURE. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emphz-orange to-cyan-300 filter drop-shadow-[0_0_20px_rgba(0,173,181,0.5)]">
                INFINITE WORLDS.
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 border-l-4 border-emphz-orange pl-6 md:pl-8 bg-black/20 backdrop-blur-sm p-4 md:p-6 rounded-r-2xl max-w-3xl border-t border-r border-b border-white/5">
               <p className="text-base md:text-xl text-gray-100 leading-relaxed font-sans font-light">
                Domestic. Commercial. Industrial. <br/>
                <span className="text-gray-400 text-sm md:text-base">
                  Experience the dynamic versatility of Emphz GRP. Glossy, high-impact shells protecting stylized micro-environments across every sector.
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 md:pt-8 pb-8 md:pb-0">
              <Link to="/products" className="group bg-white text-emphz-navy px-6 py-3 md:px-10 md:py-5 rounded-full font-black text-xs md:text-sm tracking-widest uppercase font-display hover:bg-emphz-orange hover:text-white transition-all duration-300 flex items-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,173,181,0.6)] hover:scale-105">
                EXPLORE PRODUCT LINE <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} aria-hidden="true" />
              </Link>
              
              <Link to="/technical" className="group px-6 py-3 md:px-10 md:py-5 rounded-full border border-emphz-orange text-emphz-orange font-black text-xs md:text-sm tracking-widest uppercase font-display hover:bg-emphz-orange hover:text-white transition-all duration-300 flex items-center backdrop-blur-md bg-black/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,173,181,0.3)]">
                VIEW 3D SPECS <Box className="ml-2 opacity-80 group-hover:scale-110 transition-transform" size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
        
        {/* Scroll Indicator - Adjusted for mobile position */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 motion-safe:animate-bounce z-20 pointer-events-none">
          <span className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase mb-2 text-white font-display">Scroll to Explore</span>
          <div className="w-[1px] h-8 md:h-16 bg-gradient-to-b from-emphz-orange to-transparent"></div>
        </div>
      </section>

      {/* 2. Infinite Marquee - Trust Signals (Light Theme) */}
      <div className="py-8 bg-white border-y border-gray-100 overflow-hidden" aria-hidden="true">
        <div className="flex space-x-16 motion-safe:animate-scroll whitespace-nowrap w-max hover:pause">
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <div key={i} className="flex items-center space-x-4 text-gray-400 hover:text-emphz-navy transition-colors cursor-default">
              <Link to="/products" className="flex items-center gap-4 group focus:outline-none focus:text-emphz-orange">
                <Box size={20} className="group-focus:text-emphz-orange" />
                <span className="text-xl font-black uppercase tracking-tighter group-focus:underline decoration-emphz-orange decoration-2 font-display">{ind.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Key Features Grid - Enhanced with Tech Grid */}
      <section className="py-24 md:py-32 relative bg-emphz-beige bg-tech-grid">
        <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4 font-display">The Emphz Advantage</h2>
             <h3 className="text-4xl md:text-6xl font-black text-emphz-navy font-display tracking-tight">Why Engineers Choose GRP.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Feature 1 - Tabbed Card Style */}
             <div className="bg-white p-10 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-gray-200 hover:border-emphz-orange hover:shadow-xl hover:shadow-emphz-orange/10 border-l-4">
                <div className="absolute -right-8 -bottom-8 text-slate-100 opacity-50 group-hover:opacity-80 transition-opacity transform rotate-12">
                   <Droplet size={180} strokeWidth={1} />
                </div>
                <ScrollRevealIcon>
                  <div className="w-16 h-16 bg-emphz-orange/10 rounded-xl flex items-center justify-center mb-8 text-emphz-orange group-hover:scale-110 transition-transform duration-300">
                    <Droplet size={32} />
                  </div>
                </ScrollRevealIcon>
                <h4 className="text-2xl font-black mb-4 text-emphz-navy font-display">Corrosion Immunity</h4>
                <p className="text-slate-600 leading-relaxed text-sm font-medium font-sans">
                   Engineered specifically for high-salinity coastal environments. Our GRP composites are chemically inert, offering a 25+ year lifespan where traditional steel enclosures fail within months.
                </p>
             </div>

             {/* Feature 2 */}
             <div className="bg-white p-10 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-gray-200 hover:border-yellow-500 hover:shadow-xl hover:shadow-yellow-500/10 border-l-4">
                <div className="absolute -right-8 -bottom-8 text-slate-100 opacity-50 group-hover:opacity-80 transition-opacity transform rotate-12">
                   <Zap size={180} strokeWidth={1} />
                </div>
                <ScrollRevealIcon>
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                    <Zap size={32} />
                  </div>
                </ScrollRevealIcon>
                <h4 className="text-2xl font-black mb-4 text-emphz-navy font-display">Electrical Safety</h4>
                <p className="text-slate-600 leading-relaxed text-sm font-medium font-sans">
                   Naturally non-conductive and electrically insulating material. It completely eliminates shock hazards for personnel and often removes the need for expensive additional earthing systems.
                </p>
             </div>

             {/* Feature 3 */}
             <div className="bg-white p-10 rounded-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 border-l-4">
                <div className="absolute -right-8 -bottom-8 text-slate-100 opacity-50 group-hover:opacity-80 transition-opacity transform rotate-12">
                   <Layers size={180} strokeWidth={1} />
                </div>
                <ScrollRevealIcon>
                  <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center mb-8 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Layers size={32} />
                  </div>
                </ScrollRevealIcon>
                <h4 className="text-2xl font-black mb-4 text-emphz-navy font-display">Modular Design</h4>
                <p className="text-slate-600 leading-relaxed text-sm font-medium font-sans">
                   Smart flat-pack capability allows for rapid deployment in difficult terrain. Our precision modular connections ensure IP66/67 ratings are rigorously maintained after assembly.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Product Showcase Slider - Light Theme */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-4xl font-bold text-emphz-navy font-display tracking-tight">Our Collection</h2>
             <Link to="/products" className="text-emphz-orange font-bold text-sm hover:underline focus:ring-2 focus:ring-emphz-navy rounded px-1 font-display tracking-wide">VIEW ALL SKUS</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((product, i) => (
              <Link to={`/products/${product.id}`} key={i} className="group relative h-[400px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emphz-orange shadow-lg hover:shadow-xl transition-all">
                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <span className="text-xs font-bold text-emphz-orange bg-white px-2 py-1 rounded uppercase shadow-sm font-display tracking-wide">{product.category}</span>
                     <Maximize size={16} className="text-white opacity-0 group-hover:opacity-100" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 font-display tracking-tight">{product.name}</h3>
                  <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100 font-sans">{product.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Company Overview / Mission Section - Light */}
      <section className="py-24 bg-emphz-beige relative overflow-hidden bg-tech-grid">
         <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] transform -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4 font-display">Who We Are</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-emphz-navy mb-6 leading-tight font-display tracking-tighter">
                     Emphz GRP Solutions: <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emphz-navy to-slate-500">Built to Last.</span>
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 font-sans font-light">
                     Our mission is simple: to provide the most durable, corrosion-resistant infrastructure solutions for India's demanding environments. By leveraging advanced Glass Reinforced Plastic technology, we eliminate maintenance costs and extend asset lifecycles by decades.
                  </p>
                  <Link to="/about" className="inline-flex items-center text-emphz-navy font-bold text-sm tracking-wide border-b-2 border-emphz-orange pb-1 hover:text-emphz-orange transition-colors group font-display">
                     LEARN MORE <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
               </div>
               
               {/* Stats Grid */}
               <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 shadow-sm">
                     <div className="text-4xl font-black text-emphz-navy mb-2 font-display">25+</div>
                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold font-display">Years Lifespan</div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300 shadow-sm">
                     <div className="text-4xl font-black text-emphz-navy mb-2 font-display">0%</div>
                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold font-display">Corrosion</div>
                  </div>
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 shadow-sm">
                     <div className="text-4xl font-black text-emphz-navy mb-2 font-display">IP66</div>
                     <div className="text-xs text-slate-500 uppercase tracking-widest font-bold font-display">Certified</div>
                  </div>
                  <div className="bg-emphz-orange p-8 rounded-2xl border border-emphz-orange shadow-lg shadow-emphz-orange/20 flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl font-black text-white mb-2 font-display">100%</div>
                     <div className="text-xs text-white/90 uppercase tracking-widest font-bold font-display">Maintenance Free</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. CTA Section - Light */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-white">
         <div className="absolute inset-0 bg-emphz-orange transform -skew-y-3 origin-bottom-left scale-110 opacity-[0.03]"></div>
         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-emphz-navy mb-8 font-display tracking-tighter">READY TO UPGRADE?</h2>
           <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-sans font-light">
             Join the leading architects and engineers in Kerala who have switched to Emphz GRP for a lifetime of maintenance-free performance.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/rfq" className="bg-emphz-orange text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform focus:ring-2 focus:ring-emphz-navy font-display tracking-wide">
               GET A QUOTE NOW
             </Link>
             <Link to="/technical" className="bg-white border border-gray-200 text-emphz-navy px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all focus:ring-2 focus:ring-emphz-navy shadow-lg font-display tracking-wide">
               ENGINEER RESOURCES
             </Link>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;