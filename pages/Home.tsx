import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Zap, Box, Layers, Maximize, FileText, Sun, Train, Wifi, Flame, CloudRain, Factory, Shield, CheckCircle, Award, Play, ShieldCheck, Cpu, Globe, ChevronRight } from 'lucide-react';
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
      { threshold: 0.1 }
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const WORDS = ["EXTREME", "FUTURE", "COAST", "INDUSTRY"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const INDUSTRY_IMAGES = [
    { title: "Solar & Renewables", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80", desc: "UV-stable combiner boxes for harsh solar parks." },
    { title: "Rail & Metro", image: "https://images.unsplash.com/photo-1474487548417-781cb714c2f3?auto=format&fit=crop&w=600&q=80", desc: "Fire-retardant trackside signaling cabinets." },
    { title: "Telecom / 5G", image: "https://images.unsplash.com/photo-1587575494201-11fe74d90d38?auto=format&fit=crop&w=600&q=80", desc: "Radio-transparent shrouds for rooftop antennae." },
    { title: "Water Treatment", image: "https://images.unsplash.com/photo-1523365063870-827e85c138f2?auto=format&fit=crop&w=600&q=80", desc: "Corrosion-proof walkways for pump stations." },
    { title: "Smart City", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=600&q=80", desc: "Vandal-resistant modular utility kiosks." },
    { title: "Oil & Gas", image: "https://images.unsplash.com/photo-1516937941348-c09e554b96d8?auto=format&fit=crop&w=600&q=80", desc: "Anti-static explosion-proof junction boxes." },
  ];

  return (
    <div className="flex flex-col bg-white text-emphz-navy overflow-x-hidden motion-safe:scroll-smooth">
      
      {/* 1. Enhanced Hero Section - Full Wide Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050A14] group">
        
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
            alt="Modern Industrial Architecture"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
           />
           {/* Cinematic Overlays */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/80 via-[#0B1120]/40 to-[#0B1120] mix-blend-multiply"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-20">
            
            <div className="animate-fade-up space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-emphz-orange/30 bg-emphz-navy/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,173,181,0.2)]">
                <span className="w-2 h-2 bg-emphz-orange rounded-full mr-3 animate-pulse shadow-[0_0_10px_#00ADB5]"></span>
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-white font-display">Advanced Material Science</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-display leading-[0.9] tracking-tighter text-white drop-shadow-2xl">
                BUILT FOR THE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emphz-orange via-cyan-300 to-white filter drop-shadow-[0_0_30px_rgba(0,173,181,0.3)] inline-block min-w-[300px]">
                   {WORDS[currentWordIndex]}.
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans font-light tracking-wide">
                Next-generation GRP enclosures and modular structures. <br className="hidden md:block" />
                Engineered to outperform steel in the world's harshest environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                <Link to="/products" className="group bg-emphz-orange text-white px-10 py-4 rounded-full font-black text-sm tracking-[0.15em] uppercase font-display hover:bg-[#00D4DE] transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(0,173,181,0.4)] hover:shadow-[0_0_50px_rgba(0,173,181,0.6)] hover:-translate-y-1">
                  VIEW CATALOG <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                
                <Link to="/rfq" className="group px-10 py-4 rounded-full border border-white/20 text-white font-black text-sm tracking-[0.15em] uppercase font-display hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center backdrop-blur-md bg-black/20 hover:-translate-y-1">
                  REQUEST QUOTE
                </Link>
              </div>
            </div>

            {/* Floating Features - Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 mt-20 md:mt-32 w-full max-w-4xl opacity-80 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                 <div className="flex flex-col items-center gap-3">
                    <ShieldCheck size={32} className="text-emphz-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Corrosion Proof</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <Cpu size={32} className="text-emphz-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Smart Ready</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <Globe size={32} className="text-emphz-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Global Std.</span>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <Factory size={32} className="text-emphz-orange" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Made in India</span>
                 </div>
            </div>
        </div>
      </section>

      {/* 2. Infinite Marquee */}
      <div className="py-8 md:py-10 bg-white border-y border-gray-100 overflow-hidden" aria-hidden="true">
        <div className="flex space-x-16 md:space-x-24 motion-safe:animate-scroll whitespace-nowrap w-max hover:pause will-change-transform">
          {[...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES].map((ind, i) => (
            <div key={i} className="flex items-center space-x-4 text-gray-300 hover:text-emphz-navy transition-colors cursor-default group">
              <Link to="/products" className="flex items-center gap-4 focus:outline-none">
                <Box size={20} className="text-gray-300 group-hover:text-emphz-orange transition-colors" />
                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-emphz-navy transition-colors font-display">{ind.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 2.5 Certified Excellence Section - Improved Trust Strip */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex-1 text-center md:text-left">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-[0.2em] uppercase mb-3 font-display">Certified Excellence</h2>
                 <p className="text-emphz-navy font-bold text-2xl md:text-3xl leading-tight">Meeting Global Standards <br/>for Safety & Quality.</p>
              </div>
              <div className="flex flex-wrap gap-8 md:gap-12 justify-center md:justify-end">
                  {[
                    { icon: Award, label: "ISO 9001", sub: "Quality Mgmt" },
                    { icon: Shield, label: "UL 94 V-0", sub: "Fire Safety" },
                    { icon: Droplet, label: "IP 66/67", sub: "Waterproof" },
                    { icon: Sun, label: "ASTM UV", sub: "Weatherability" }
                  ].map((cert, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-default">
                       <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-3 group-hover:border-emphz-orange group-hover:scale-110 transition-all duration-300">
                          <cert.icon size={28} className="text-gray-400 group-hover:text-emphz-orange transition-colors" />
                       </div>
                       <span className="text-xs font-black text-emphz-navy uppercase tracking-wider">{cert.label}</span>
                       <span className="text-[10px] text-gray-400 font-mono mt-1">{cert.sub}</span>
                    </div>
                  ))}
              </div>
           </div>
        </div>
      </section>

      {/* 3. Key Features Grid - Modern Bento Style */}
      <section className="py-20 md:py-32 relative bg-white overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-[100px] opacity-60 -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16 md:mb-24 text-center">
             <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-[0.2em] uppercase mb-4 font-display">The Emphz Advantage</h2>
             <h3 className="text-4xl md:text-6xl font-black text-emphz-navy font-display tracking-tight leading-none">Why Engineers <br/>Choose GRP.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <ScrollRevealIcon>
               <div className="bg-white p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-transform duration-500 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-emphz-orange h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emphz-orange/5 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-emphz-orange/10"></div>
                  
                  <div className="w-16 h-16 bg-emphz-orange text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-emphz-orange/30 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Droplet size={32} />
                  </div>
                  
                  <h4 className="text-2xl font-black mb-4 text-emphz-navy font-display">Corrosion Immunity</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium font-sans mb-6 flex-grow">
                     Engineered specifically for high-salinity coastal environments. Our GRP composites are chemically inert, offering a 25+ year lifespan where traditional steel enclosures fail within months.
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <span className="text-xs font-bold text-emphz-orange uppercase tracking-wider flex items-center">
                      Learn More <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                    </span>
                  </div>
               </div>
             </ScrollRevealIcon>

             <ScrollRevealIcon>
               <div className="bg-emphz-navy p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-transform duration-500 shadow-2xl shadow-emphz-navy/30 h-full flex flex-col text-white">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500/20 rounded-full blur-2xl group-hover:bg-yellow-500/30 transition-colors"></div>
                  
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-yellow-400 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Zap size={32} />
                  </div>
                  
                  <h4 className="text-2xl font-black mb-4 text-white font-display">Electrical Safety</h4>
                  <p className="text-gray-400 leading-relaxed text-sm font-medium font-sans mb-6 flex-grow">
                     Naturally non-conductive and electrically insulating material. It completely eliminates shock hazards for personnel and often removes the need for expensive additional earthing systems.
                  </p>
                  
                   <div className="border-t border-white/10 pt-6">
                    <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center">
                      View Certifications <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                    </span>
                  </div>
               </div>
             </ScrollRevealIcon>

             <ScrollRevealIcon>
               <div className="bg-white p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:-translate-y-3 transition-transform duration-500 shadow-xl shadow-gray-200/50 border border-gray-100 hover:border-blue-500 h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-8 -mt-8 transition-all group-hover:bg-blue-100"></div>

                  <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500 relative z-10">
                    <Layers size={32} />
                  </div>
                  
                  <h4 className="text-2xl font-black mb-4 text-emphz-navy font-display">Modular Design</h4>
                  <p className="text-slate-500 leading-relaxed text-sm font-medium font-sans mb-6 flex-grow">
                     Smart flat-pack capability allows for rapid deployment in difficult terrain. Our precision modular connections ensure IP66/67 ratings are rigorously maintained after assembly.
                  </p>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center">
                      See Specs <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform"/>
                    </span>
                  </div>
               </div>
             </ScrollRevealIcon>
          </div>
        </div>
      </section>

      {/* 4. Product Showcase Slider - Sleeker Cards */}
      <section className="py-20 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
             <div>
                <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-[0.2em] uppercase mb-3 font-display">The Collection</h2>
                <h3 className="text-3xl md:text-4xl font-black text-emphz-navy font-display tracking-tight">Featured Products</h3>
             </div>
             <Link to="/products" className="group mt-4 md:mt-0 text-emphz-navy font-bold text-sm border-b-2 border-emphz-orange pb-1 hover:text-emphz-orange transition-colors flex items-center font-display tracking-wide">
                VIEW FULL CATALOG <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.slice(0, 4).map((product, i) => (
              <Link to={`/products/${product.id}`} key={i} className="group relative h-[400px] rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gray-200">
                    <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold text-emphz-navy bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm font-display">{product.category}</span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-2 font-display leading-tight">{product.name}</h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-sans">{product.shortDescription}</p>
                  <div className="flex items-center text-emphz-orange text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                     View Details <ArrowRight size={12} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 NEW: Industries Served Grid - Immersive Image Cards */}
      <section className="py-20 md:py-32 bg-emphz-navy relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-[0.2em] uppercase mb-4 font-display">Applications</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white font-display">Industries Powering India</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {INDUSTRY_IMAGES.map((item, idx) => (
                  <div key={idx} className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                     <img src={item.image} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy via-emphz-navy/60 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500"></div>
                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <h4 className="text-2xl font-bold text-white font-display mb-2 group-hover:text-emphz-orange transition-colors">{item.title}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Company Overview / Mission Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
         <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-gray-50 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
               <div className="lg:w-1/2">
                  <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-[0.2em] uppercase mb-4 font-display">Who We Are</h2>
                  <h3 className="text-4xl md:text-6xl font-black text-emphz-navy mb-8 leading-none font-display tracking-tight">
                     Built to Last. <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-emphz-orange to-cyan-500">Engineered to Protect.</span>
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 font-sans font-light">
                     Our mission is simple: to provide the most durable, corrosion-resistant infrastructure solutions for India's demanding environments. By leveraging advanced Glass Reinforced Plastic technology, we eliminate maintenance costs and extend asset lifecycles by decades.
                  </p>
                  <Link to="/about" className="inline-flex items-center text-white bg-emphz-navy px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-emphz-orange transition-colors group font-display shadow-xl hover:shadow-2xl hover:-translate-y-1">
                     LEARN MORE <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
                  </Link>
               </div>
               
               <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 shadow-xl shadow-gray-200/50">
                     <div className="text-4xl md:text-5xl font-black text-emphz-navy mb-2 font-display">25+</div>
                     <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold font-display">Years Lifespan</div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300 shadow-xl shadow-gray-200/50">
                     <div className="text-4xl md:text-5xl font-black text-emphz-navy mb-2 font-display">0%</div>
                     <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold font-display">Corrosion</div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 shadow-xl shadow-gray-200/50">
                     <div className="text-4xl md:text-5xl font-black text-emphz-navy mb-2 font-display">IP66</div>
                     <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold font-display">Certified</div>
                  </div>
                  <div className="bg-emphz-orange p-8 rounded-3xl border border-emphz-orange shadow-2xl shadow-emphz-orange/30 flex flex-col items-center text-center mt-8 transform hover:scale-105 transition-transform duration-300">
                     <div className="text-4xl md:text-5xl font-black text-white mb-2 font-display">100%</div>
                     <div className="text-[10px] md:text-xs text-white/90 uppercase tracking-[0.2em] font-bold font-display">Maintenance Free</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-white">
         <div className="absolute inset-0 bg-emphz-navy transform -skew-y-3 origin-bottom-left scale-110 translate-y-20 z-0"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0 mix-blend-overlay pointer-events-none"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
           <h2 className="text-4xl md:text-7xl font-black text-white mb-8 font-display tracking-tighter drop-shadow-lg">READY TO UPGRADE?</h2>
           <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-sans font-light leading-relaxed">
             Join the leading architects and engineers in Kerala who have switched to Emphz GRP for a lifetime of maintenance-free performance.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-5">
             <Link to="/rfq" className="bg-emphz-orange text-white px-10 py-5 rounded-full font-bold text-sm md:text-base shadow-[0_0_30px_rgba(0,173,181,0.4)] hover:shadow-[0_0_50px_rgba(0,173,181,0.6)] hover:-translate-y-1 transition-all focus:ring-2 focus:ring-white font-display uppercase tracking-widest">
               GET A QUOTE NOW
             </Link>
             <Link to="/technical" className="bg-transparent border border-white/30 text-white px-10 py-5 rounded-full font-bold text-sm md:text-base hover:bg-white/10 transition-all focus:ring-2 focus:ring-white font-display uppercase tracking-widest backdrop-blur-sm">
               ENGINEER RESOURCES
             </Link>
           </div>
         </div>
      </section>
    </div>
  );
};

export default Home;