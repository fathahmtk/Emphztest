import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Droplet, Zap, Box, Anchor, PenTool, Layers, Maximize, FileText } from 'lucide-react';
import { INDUSTRIES, MOCK_PRODUCTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col bg-emphz-navy text-white overflow-x-hidden motion-safe:scroll-smooth">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
           <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
           >
             <source src="https://cdn.pixabay.com/video/2024/05/05/210747_large.mp4" type="video/mp4" />
             {/* Fallback image if video fails to load */}
             <img 
              src="https://lh3.googleusercontent.com/pw/AP1GczO1hJQxalyxfSiUQD0Co6FyBl4at4jQbtoB5T0iOeOeUi112a4SbR1tk_s2zWjJvOeAIVTf-yU1vM_e-rFFCArb6KZpbArxSR3skWuBDM9tznEyxLQ59jc-h5zaCkL-UVeoUwYtDr7Oo6R8654X6D4Htw=w1563-h879-s-no-gm?authuser=0"
              alt="Emphz Industrial GRP Manufacturing"
              className="w-full h-full object-cover"
             />
           </video>
           
           {/* Brand Gradient Overlay for text readability - Enhanced for Video */}
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-emphz-navy via-emphz-navy/60 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-transparent to-transparent"></div>
        </div>

        {/* Animated Background Elements - Reduced opacity to not clash with image */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emphz-orange rounded-full blur-[200px] opacity-5 motion-safe:animate-pulse z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[180px] opacity-5 z-0"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-1 gap-12 items-center">
          
          {/* Text Content - Centered/Focal for Video */}
          <div className="space-y-8 motion-safe:animate-fade-up max-w-4xl">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 bg-emphz-orange rounded-full mr-3 motion-safe:animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest uppercase text-emphz-beige">Molded in Mysore. Built for Kerala.</span>
              </div>
              <div className="inline-flex items-center px-3 py-1.5 rounded border border-emphz-orange/60 bg-emphz-orange/10 text-emphz-orange text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
                Now Featuring: Smart Living Pods
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 drop-shadow-2xl">
              INFRA <br/>
              STRUCTURE <br/>
              <span className="text-emphz-orange">REIMAGINED.</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-xl leading-relaxed border-l-2 border-emphz-orange pl-6 bg-black/40 p-2 rounded-r-lg backdrop-blur-sm">
              Advanced GRP composites that replace steel and concrete. 
              Engineered for zero corrosion, rapid deployment, and 25+ year lifespan.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="group bg-white text-emphz-navy px-8 py-4 rounded-full font-bold text-sm hover:bg-emphz-orange hover:text-white transition-all duration-300 flex items-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(190,34,34,0.4)] focus:ring-2 focus:ring-white">
                VIEW PRODUCTS <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} aria-hidden="true" />
              </Link>
              
              <Link to="/technical" className="group px-8 py-4 rounded-full border border-emphz-orange text-emphz-orange font-bold text-sm hover:bg-emphz-orange hover:text-white transition-all duration-300 flex items-center backdrop-blur-md bg-black/20 focus:ring-2 focus:ring-emphz-orange shadow-[0_0_20px_rgba(190,34,34,0.1)] hover:shadow-[0_0_30px_rgba(190,34,34,0.3)]">
                TECHNICAL CENTER <FileText className="ml-2 opacity-80 group-hover:scale-110 transition-transform" size={18} aria-hidden="true" />
              </Link>

              <Link to="/case-studies" className="group px-8 py-4 rounded-full border border-white/20 font-bold text-sm hover:bg-white/10 transition-all flex items-center backdrop-blur-md bg-black/30 focus:ring-2 focus:ring-white">
                CASE STUDIES
              </Link>
            </div>
          </div>

        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-50 motion-safe:animate-bounce z-20">
          <span className="text-[10px] tracking-[0.2em] uppercase mb-2 text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* 2. Infinite Marquee - Trust Signals */}
      <div className="py-8 bg-black border-y border-white/5 overflow-hidden" aria-hidden="true">
        <div className="flex space-x-16 motion-safe:animate-scroll whitespace-nowrap w-max hover:pause">
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <div key={i} className="flex items-center space-x-4 text-gray-500 hover:text-white transition-colors cursor-default">
              <Link to="/products" className="flex items-center gap-4 group focus:outline-none focus:text-white">
                <Box size={20} className="group-focus:text-emphz-orange" />
                <span className="text-xl font-black uppercase tracking-tighter group-focus:underline decoration-emphz-orange decoration-2">{ind.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Key Features Grid */}
      <section className="py-32 relative bg-emphz-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-20 text-center md:text-left">
             <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">The Emphz Advantage</h2>
             <h3 className="text-4xl md:text-5xl font-bold text-white">Why Engineers Choose GRP.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Feature 1: Corrosion Immunity */}
             <div className="glass-panel p-10 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/5">
                <div className="absolute -right-8 -bottom-8 text-gray-700 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                   <Droplet size={180} strokeWidth={1} />
                </div>
                <div className="w-16 h-16 bg-emphz-orange/20 rounded-2xl flex items-center justify-center mb-8 text-emphz-orange group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emphz-orange/10">
                   <Droplet size={36} />
                </div>
                <h4 className="text-2xl font-black mb-4 text-white">Corrosion Immunity</h4>
                <p className="text-gray-400 leading-relaxed text-sm font-medium">
                   Engineered specifically for high-salinity coastal environments. Our GRP composites are chemically inert, offering a 25+ year lifespan where traditional steel enclosures fail within months.
                </p>
             </div>

             {/* Feature 2: Electrical Safety */}
             <div className="glass-panel p-10 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/5">
                <div className="absolute -right-8 -bottom-8 text-gray-700 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                   <Zap size={180} strokeWidth={1} />
                </div>
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mb-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/10">
                   <Zap size={36} />
                </div>
                <h4 className="text-2xl font-black mb-4 text-white">Electrical Safety</h4>
                <p className="text-gray-400 leading-relaxed text-sm font-medium">
                   Naturally non-conductive and electrically insulating material. It completely eliminates shock hazards for personnel and often removes the need for expensive additional earthing systems.
                </p>
             </div>

             {/* Feature 3: Modular Design */}
             <div className="glass-panel p-10 rounded-3xl relative overflow-hidden group hover:bg-white/5 transition-colors border border-white/5">
                <div className="absolute -right-8 -bottom-8 text-gray-700 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                   <Layers size={180} strokeWidth={1} />
                </div>
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 text-blue-400 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10">
                   <Layers size={36} />
                </div>
                <h4 className="text-2xl font-black mb-4 text-white">Modular Design</h4>
                <p className="text-gray-400 leading-relaxed text-sm font-medium">
                   Smart flat-pack capability allows for rapid deployment in difficult terrain. Our precision modular connections ensure IP66/67 ratings are rigorously maintained after assembly.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Product Showcase Slider (Concept) */}
      <section className="py-20 bg-gradient-to-b from-emphz-navy to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-4xl font-bold">Our Collection</h2>
             <Link to="/products" className="text-emphz-orange font-bold text-sm hover:underline focus:ring-2 focus:ring-white rounded px-1">VIEW ALL SKUS</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((product, i) => (
              <Link to={`/products/${product.id}`} key={i} className="group relative h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 focus:ring-2 focus:ring-white">
                <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <span className="text-xs font-bold text-emphz-orange bg-emphz-orange/10 px-2 py-1 rounded uppercase">{product.category}</span>
                     <Maximize size={16} className="text-white opacity-0 group-hover:opacity-100" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{product.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. Company Overview / Mission Section */}
      <section className="py-24 bg-emphz-navy relative overflow-hidden">
         {/* Decorative Background */}
         <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] transform -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
               <div className="lg:w-1/2">
                  <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Engineering Excellence</h2>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                     Pioneering the Future of <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Industrial Infrastructure.</span>
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                     Emphz GRP Solutions is dedicated to solving India's toughest engineering challenges. By systematically replacing corrosion-prone steel with advanced Glass Reinforced Plastic composites, we deliver infrastructure that withstands the harshest coastal and industrial environments for decades.
                  </p>
                  <Link to="/about" className="inline-flex items-center text-white font-bold text-sm tracking-wide border-b-2 border-emphz-orange pb-1 hover:text-emphz-orange transition-colors group">
                     LEARN MORE ABOUT OUR MISSION <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
               </div>
               
               {/* Stats Grid */}
               <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl font-black text-white mb-2">25+</div>
                     <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Years Lifespan</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl font-black text-white mb-2">0%</div>
                     <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Corrosion</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl font-black text-white mb-2">IP66</div>
                     <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Certified</div>
                  </div>
                  <div className="bg-emphz-orange p-8 rounded-2xl border border-emphz-orange shadow-[0_0_30px_rgba(190,34,34,0.3)] flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl font-black text-white mb-2">100%</div>
                     <div className="text-xs text-white/90 uppercase tracking-widest font-bold">Maintenance Free</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. CTA Section */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-emphz-orange transform -skew-y-3 origin-bottom-left scale-110"></div>
         <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-8">READY TO UPGRADE?</h2>
           <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
             Join the leading architects and engineers in Kerala who have switched to Emphz GRP for a lifetime of maintenance-free performance.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/rfq" className="bg-white text-emphz-orange px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform focus:ring-2 focus:ring-black">
               GET A QUOTE NOW
             </Link>
             <Link to="/technical" className="bg-emphz-navy border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emphz-navy/80 transition-all focus:ring-2 focus:ring-white">
               ENGINEER RESOURCES
             </Link>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;