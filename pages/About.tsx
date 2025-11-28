
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Gem, Users, Anchor, Lightbulb, Zap, CheckCircle, MapPin, PenTool, Calendar, Award, Rocket, Shield, FileCheck, XCircle, AlertTriangle, Scale, BatteryCharging, Clock, Truck, Droplet, Hammer, Feather, Factory, Recycle, Leaf, Microscope, Sun, Quote } from 'lucide-react';

const About: React.FC = () => {

  const values = [
    { icon: <Anchor className="w-8 h-8 text-emphz-orange" />, title: "Uncompromising Durability", description: "We build solutions engineered to last for a generation, not just a season. Every product is a testament to our commitment to long-term performance." },
    { icon: <Lightbulb className="w-8 h-8 text-emphz-orange" />, title: "Material Innovation", description: "We are relentless in our pursuit of the most advanced GRP composites, constantly pushing the boundaries of what's possible in strength, resilience, and design." },
    { icon: <Users className="w-8 h-8 text-emphz-orange" />, title: "Collaborative Partnership", description: "Your project is our project. We function as an extension of your engineering team, providing expert consultation and bespoke solutions from start to finish." },
  ];

  const timelineEvents = [
    { year: "2018", title: "The Spark", description: "Observing the rapid corrosion of steel in Kerala's coastal infrastructure, our founders identified a critical need for a superior material solution.", icon: <Zap /> },
    { year: "2020", title: "The Foundation", description: "Emphz was born. We established our state-of-the-art manufacturing hub in Mysore, investing in advanced Hot Press Molding technology.", icon: <PenTool /> },
    { year: "2023", title: "Major Project Milestone", description: "Successfully deployed over 200 custom IP66 enclosures for a major coastal resort, proving our GRP's performance in high-salinity environments.", icon: <Award /> },
    { year: "2025", title: "The Future", description: "Expanding our product line into renewable energy sectors, designing specialized enclosures for solar and wind farm infrastructure.", icon: <Rocket /> },
  ];

  return (
    <div className="bg-white text-emphz-navy">
      {/* Hero Section */}
      <section className="bg-emphz-navy text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/1600/900?random=30')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emphz-navy via-emphz-navy/70 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 max-w-3xl leading-tight font-display">Engineering a Corrosion-Free Future.</h1>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed font-light border-l-4 border-emphz-orange pl-4 md:pl-6 font-sans">
            We are a team of material scientists and engineers dedicated to solving India's toughest infrastructure challenges with advanced GRP composites.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="pr-0 md:pr-8">
            <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Our Mission</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy mb-4 md:mb-6 font-display">To Replace Obsolete Materials.</h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-sans">
              Our mission is to systematically replace traditional materials like steel, concrete, and wood with superior, high-performance GRP solutions in critical infrastructure. We aim to eradicate the costs and dangers associated with corrosion and degradation, ensuring longevity and safety for a modern India.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
            <div className="flex items-start">
              <div className="bg-emphz-orange/10 p-3 rounded-full mr-4"><Target className="w-5 h-5 md:w-6 md:h-6 text-emphz-orange" /></div>
              <div>
                <h4 className="font-bold text-base md:text-lg font-display">Engineer for Environment</h4>
                <p className="text-gray-500 text-xs md:text-sm font-sans">Create products perfectly suited for their intended environment, from saline coasts to harsh industrial zones.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emphz-orange/10 p-3 rounded-full mr-4"><Gem className="w-5 h-5 md:w-6 md:h-6 text-emphz-orange" /></div>
              <div>
                <h4 className="font-bold text-base md:text-lg font-display">Deliver Unmatched Quality</h4>
                <p className="text-gray-500 text-xs md:text-sm font-sans">Utilize precision manufacturing and the highest-grade materials to deliver products that exceed international standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
       <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Our Core Values</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy mb-8 md:mb-12 font-display">The Principles That Guide Us.</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {values.map((value, i) => (
                    <div key={i} className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        {value.icon}
                        <h4 className="text-lg md:text-xl font-bold my-3 md:my-4 font-display">{value.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed font-sans">{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
       </section>

      {/* Why Choose GRP? Comparison Section */}
      <section className="py-16 md:py-24 bg-emphz-navy text-white relative overflow-hidden">
         {/* Background Abstract */}
         <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-emphz-orange rounded-full blur-[100px] md:blur-[120px] opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-600 rounded-full blur-[80px] md:blur-[100px] opacity-10 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-10 md:mb-16">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Material Science</h2>
                 <h3 className="text-3xl md:text-5xl font-black text-white font-display mb-4 md:mb-6">Why Choose GRP?</h3>
                 <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed">
                   When compared to traditional infrastructure materials, Glass Reinforced Plastic (GRP) offers a superior balance of strength, safety, and longevity.
                 </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
                {/* Advantage Card 1 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emphz-orange rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                        <Shield className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-display">Chemical Resistance</h4>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">
                        Unlike steel which oxidizes and concrete which spalls, GRP is chemically inert. It withstands acids, salts, and sulfates found in coastal and industrial zones.
                    </p>
                </div>
                 {/* Advantage Card 2 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                        <BatteryCharging className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-display">Electrical Insulation</h4>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">
                        GRP is a natural insulator with high dielectric strength. It eliminates the risk of electrical shock and removes the need for costly earthing straps required for metal boxes.
                    </p>
                </div>
                 {/* Advantage Card 3 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                        <Scale className="text-white w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 font-display">Weight-to-Strength</h4>
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">
                        At 25% the weight of steel, GRP is easier to transport and install, reducing labor costs while maintaining an impact rating of IK10 (similar to metal).
                    </p>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px] md:min-w-[800px]">
                  <thead>
                    <tr className="bg-black/20">
                      <th className="p-4 md:p-6 text-gray-400 font-display text-[10px] md:text-xs uppercase tracking-wider w-1/4">Feature Analysis</th>
                      <th className="p-4 md:p-6 bg-emphz-orange/20 text-emphz-orange font-bold font-display text-xs md:text-base w-1/4 border-t-4 border-emphz-orange">EMPHZ GRP</th>
                      <th className="p-4 md:p-6 text-white font-bold font-display text-xs md:text-base w-1/4">Stainless Steel</th>
                      <th className="p-4 md:p-6 text-white font-bold font-display text-xs md:text-base w-1/4">Concrete / Civil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-xs md:text-sm">
                    <tr>
                      <td className="p-4 md:p-6 font-bold text-white">Corrosion Resistance</td>
                      <td className="p-4 md:p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={14} className="md:w-4 md:h-4"/> Unaffected</td>
                      <td className="p-4 md:p-6 text-yellow-500 flex items-center gap-2"><AlertTriangle size={14} className="md:w-4 md:h-4"/> Pits over time</td>
                      <td className="p-4 md:p-6 text-red-400 flex items-center gap-2"><XCircle size={14} className="md:w-4 md:h-4"/> Spalls / Cracks</td>
                    </tr>
                    <tr>
                      <td className="p-4 md:p-6 font-bold text-white">Maintenance Cost</td>
                      <td className="p-4 md:p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={14} className="md:w-4 md:h-4"/> Zero</td>
                      <td className="p-4 md:p-6 text-gray-300">Low to Medium</td>
                      <td className="p-4 md:p-6 text-red-400 flex items-center gap-2"><XCircle size={14} className="md:w-4 md:h-4"/> High (Painting/Patching)</td>
                    </tr>
                     <tr>
                      <td className="p-4 md:p-6 font-bold text-white">Electrical Conductivity</td>
                      <td className="p-4 md:p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={14} className="md:w-4 md:h-4"/> Non-Conductive</td>
                      <td className="p-4 md:p-6 text-red-400 flex items-center gap-2"><AlertTriangle size={14} className="md:w-4 md:h-4"/> Conductive</td>
                      <td className="p-4 md:p-6 text-gray-300">Semi-Conductive (Damp)</td>
                    </tr>
                     <tr>
                      <td className="p-4 md:p-6 font-bold text-white">Installation Speed</td>
                      <td className="p-4 md:p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={14} className="md:w-4 md:h-4"/> Days (Modular)</td>
                      <td className="p-4 md:p-6 text-gray-300">Weeks (Welding)</td>
                      <td className="p-4 md:p-6 text-red-400 flex items-center gap-2"><XCircle size={14} className="md:w-4 md:h-4"/> Months (Curing)</td>
                    </tr>
                     <tr>
                      <td className="p-4 md:p-6 font-bold text-white">Weight Ratio</td>
                      <td className="p-4 md:p-6 bg-emphz-orange/5 text-emphz-orange font-bold">1.0x (Lightweight)</td>
                      <td className="p-4 md:p-6 text-gray-300">4.0x (Heavy)</td>
                      <td className="p-4 md:p-6 text-red-400">10.0x (Very Heavy)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </section>

      {/* GRP vs Traditional Deep Dive */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Comparative Analysis</h2>
                 <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy mb-4 md:mb-6 font-display">GRP vs. Traditional Materials: A Deeper Dive</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Card 1: Corrosion */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="bg-blue-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Droplet className="text-blue-600 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg text-emphz-navy mb-3 md:mb-4 font-display">Corrosion</h4>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">GRP:</span> Chemically inert. 100% rust-proof in saline air.</p>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">Steel:</span> Requires galvanizing or painting. Rusts inevitably.</p>
                        </div>
                    </div>
                </div>

                {/* Card 2: Insulation */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="bg-yellow-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <BatteryCharging className="text-yellow-600 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg text-emphz-navy mb-3 md:mb-4 font-display">Electrical Safety</h4>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">GRP:</span> Natural insulator. Zero shock hazard.</p>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">Metal:</span> Highly conductive. Dangerous if earthing fails.</p>
                        </div>
                    </div>
                </div>

                {/* Card 3: Weight */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="bg-purple-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Feather className="text-purple-600 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg text-emphz-navy mb-3 md:mb-4 font-display">Weight & Install</h4>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">GRP:</span> Lightweight. Man-portable. Rapid assembly.</p>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">Concrete:</span> Heavy. Requires cranes and heavy machinery.</p>
                        </div>
                    </div>
                </div>

                {/* Card 4: Maintenance */}
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
                    <div className="bg-orange-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Hammer className="text-orange-600 w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg text-emphz-navy mb-3 md:mb-4 font-display">Maintenance</h4>
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">GRP:</span> Fit and forget. UV stable. No painting needed.</p>
                        </div>
                        <div className="flex items-start">
                            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-400 mr-2 flex-shrink-0" />
                            <p className="text-xs md:text-sm text-gray-600 font-sans"><span className="font-bold text-emphz-navy">Others:</span> Regular re-painting and anti-rust treatments.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW: Manufacturing Excellence Section */}
      <section className="py-16 md:py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
               <div className="lg:w-1/2">
                   <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">How We Build</h2>
                   <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy mb-4 md:mb-6 font-display">Manufacturing Excellence.</h3>
                   <p className="text-base md:text-lg text-gray-600 mb-6 font-light font-sans">
                      At our Mysore facility, we employ multiple advanced composite manufacturing techniques to ensure every product meets specific structural and aesthetic requirements.
                   </p>
                   
                   <div className="space-y-6 md:space-y-8 mt-6 md:mt-8">
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-emphz-navy text-white rounded-lg flex items-center justify-center font-bold font-mono text-sm md:text-base">01</div>
                         <div>
                            <h4 className="font-bold text-lg md:text-xl text-emphz-navy mb-1 md:mb-2 font-display">SMC Hot Press Molding</h4>
                            <p className="text-xs md:text-sm text-gray-600 font-sans">
                               Used for our high-volume enclosures and junction boxes. Sheet Molding Compound (SMC) is placed in heated steel molds and pressed under 1000+ tons of pressure. Result: Consistent wall thickness, smooth finish on both sides, and extreme strength.
                            </p>
                         </div>
                      </div>
                      <div className="flex gap-4">
                         <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-emphz-navy text-white rounded-lg flex items-center justify-center font-bold font-mono text-sm md:text-base">02</div>
                         <div>
                            <h4 className="font-bold text-lg md:text-xl text-emphz-navy mb-1 md:mb-2 font-display">Pultrusion</h4>
                            <p className="text-xs md:text-sm text-gray-600 font-sans">
                               A continuous process used for creating our structural profiles, cable trays, and handrails. Fibers are pulled through a resin bath and heated die, creating infinite lengths of constant cross-section with immense longitudinal strength.
                            </p>
                         </div>
                      </div>
                       <div className="flex gap-4">
                         <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-emphz-navy text-white rounded-lg flex items-center justify-center font-bold font-mono text-sm md:text-base">03</div>
                         <div>
                            <h4 className="font-bold text-lg md:text-xl text-emphz-navy mb-1 md:mb-2 font-display">Vacuum Infusion (RTM)</h4>
                            <p className="text-xs md:text-sm text-gray-600 font-sans">
                               Used for large, complex structures like our Smart Cabins and Kiosks. This closed-mold process ensures zero void content and superior fiber-to-resin ratios compared to traditional hand lay-up.
                            </p>
                         </div>
                      </div>
                   </div>
               </div>
               
               <div className="lg:w-1/2 w-full">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                     <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <Factory className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mb-3 md:mb-4" />
                        <div className="font-bold text-xl md:text-2xl text-emphz-navy font-display">50,000+</div>
                        <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 font-display">Sq. Ft. Factory</div>
                     </div>
                     <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <Users className="w-8 h-8 md:w-12 md:h-12 text-gray-400 mb-3 md:mb-4" />
                        <div className="font-bold text-xl md:text-2xl text-emphz-navy font-display">120+</div>
                        <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 font-display">Skilled Technicians</div>
                     </div>
                     <div className="col-span-2 bg-emphz-navy text-white p-6 md:p-8 rounded-xl flex items-center justify-between">
                        <div>
                           <div className="font-bold text-xl md:text-2xl font-display">ISO 9001:2015</div>
                           <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 font-display">Certified Facility</div>
                        </div>
                        <Award className="w-10 h-10 md:w-12 md:h-12 text-emphz-orange" />
                     </div>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* NEW: Quality Assurance Section */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="md:w-1/3 text-center md:text-left">
                    <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Strict Standards</h2>
                    <h3 className="text-3xl font-bold text-emphz-navy mb-3 md:mb-4 font-display">In-House QA Lab</h3>
                    <p className="text-gray-600 text-sm md:text-base font-sans">
                        We don't just manufacture; we test. Our Mysore facility includes a dedicated Quality Assurance lab where batches are rigorously tested against international standards.
                    </p>
                </div>
                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 w-full">
                     <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-100">
                        <Microscope className="w-6 h-6 md:w-8 md:h-8 text-emphz-navy mb-2 md:mb-3" />
                        <h4 className="font-bold text-emphz-navy text-sm mb-1 md:mb-2 font-display">Hydrostatic Pressure</h4>
                        <p className="text-[10px] md:text-xs text-gray-500 font-sans">Testing water tanks and enclosures for leaks under high pressure loads.</p>
                     </div>
                     <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-100">
                        <Sun className="w-6 h-6 md:w-8 md:h-8 text-emphz-navy mb-2 md:mb-3" />
                        <h4 className="font-bold text-emphz-navy text-sm mb-1 md:mb-2 font-display">UV Aging Chamber</h4>
                        <p className="text-[10px] md:text-xs text-gray-500 font-sans">Simulating years of solar exposure to ensure color stability and structural integrity.</p>
                     </div>
                     <div className="bg-gray-50 p-4 md:p-6 rounded-lg border border-gray-100">
                        <Hammer className="w-6 h-6 md:w-8 md:h-8 text-emphz-navy mb-2 md:mb-3" />
                        <h4 className="font-bold text-emphz-navy text-sm mb-1 md:mb-2 font-display">Impact Testing</h4>
                        <p className="text-[10px] md:text-xs text-gray-500 font-sans">Drop tests to verify IK10 impact resistance ratings for heavy-duty enclosures.</p>
                     </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW: Sustainability Section */}
       <section className="py-16 md:py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <Leaf className="w-10 h-10 md:w-12 md:h-12 text-green-600 mx-auto mb-3 md:mb-4" />
            <h2 className="text-3xl font-bold text-emphz-navy mb-3 md:mb-4 font-display">Sustainable Infrastructure</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 font-light font-sans">
               Sustainability isn't just about recycling—it's about longevity. By installing an Emphz GRP product that lasts 40 years instead of a steel one that needs replacement every 5 years, you reduce manufacturing carbon footprint by up to 600% over the asset lifecycle.
            </p>
            <div className="inline-flex items-center bg-white px-5 py-2 md:px-6 md:py-3 rounded-full shadow-sm border border-green-200 text-green-700 font-bold text-xs md:text-sm font-display">
               <Recycle className="mr-2 w-4 h-4" /> 100% Recyclable via Cement Kiln Processing
            </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-emphz-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Our Journey</h2>
                 <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy font-display">From Concept to Coastline.</h3>
            </div>
            <div className="relative">
                 {/* The vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emphz-orange/10 via-emphz-orange/50 to-emphz-orange/10 hidden md:block"></div>
                {timelineEvents.map((event, i) => (
                    <div key={i} className={`mb-12 md:mb-20 flex items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className="hidden md:block w-5/12"></div>
                        <div className="z-10 relative hidden md:flex items-center justify-center">
                             <div className="w-16 h-16 bg-white rounded-full shadow-lg border-4 border-emphz-orange flex items-center justify-center text-emphz-navy z-20">
                                {event.icon}
                             </div>
                             {/* Connector Pulse */}
                             <div className="absolute w-20 h-20 bg-emphz-orange/20 rounded-full animate-pulse z-0"></div>
                        </div>
                        <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full md:w-5/12 transform hover:scale-105 transition-transform duration-300 ${i % 2 === 0 ? 'md:text-right md:mr-10' : 'md:text-left md:ml-10'}`}>
                            <div className="md:hidden w-12 h-12 bg-emphz-orange rounded-full shadow-lg flex items-center justify-center text-white mb-4">
                                {event.icon}
                            </div>
                            <p className="text-emphz-orange font-black text-2xl md:text-3xl mb-1 md:mb-2 font-display">{event.year}</p>
                            <h4 className="font-bold text-lg md:text-xl mb-2 font-display text-emphz-navy">{event.title}</h4>
                            <p className="text-sm text-gray-500 font-sans leading-relaxed">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-50/50 skew-y-3 transform origin-top-left -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-emphz-orange/20 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://lh3.googleusercontent.com/pw/AP1GczPXd3SB3ha5w7wQYPCYln2z7mHwS2GWu0AiuUXj7QzLOpT54vA9BriS2YorAIZu9Qm0ppfMXMU6tBiJ4dyG4yhafK5leMobYiQCD8pWPWynVssz2_ueIQwbCl2XYIagOoycgZH5wk512mzKaUCSYsAXtQ=w1280-h720-s-no-gm?authuser=0" 
                   alt="Muhammed Rashik P - Managing Director" 
                   className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-emphz-navy/80 via-transparent to-transparent opacity-60"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-display font-bold text-xl">Muhammed Rashik P</p>
                    <p className="font-sans text-xs uppercase tracking-widest opacity-80">Managing Director</p>
                 </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2">
              <Quote className="text-emphz-orange w-12 h-12 md:w-16 md:h-16 mb-6 opacity-20" />
              <h2 className="text-3xl md:text-5xl font-black text-emphz-navy mb-8 font-display leading-tight">
                Building Resilience for a Changing World.
              </h2>
              <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-light font-sans">
                <p>
                  "At Emphz, we realized early on that the infrastructure of tomorrow cannot be built with the materials of yesterday. In a country with such diverse and harsh climates—from the humid coasts of Kerala to the industrial belts of the interior—traditional steel and concrete often fail sooner than expected."
                </p>
                <p>
                  "Our mission was to create a solution that essentially pauses time for your assets. By leveraging advanced GRP composites, we aren't just selling enclosures; we are selling peace of mind. We are selling the guarantee that ten years from now, your critical electrical infrastructure will look and perform exactly as it does today."
                </p>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-200 flex items-center justify-between">
                 <div>
                    <div className="font-display text-xl text-emphz-navy italic font-bold">Muhammed Rashik P</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-bold text-emphz-orange uppercase tracking-widest">Emphz Engineering</div>
                    <div className="text-[10px] text-gray-400 font-mono">EST. 2020</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Our Experts</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy mb-6 font-display">The Minds Behind the Material.</h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-10 md:mb-12 text-sm md:text-base font-sans">
                Emphz is powered by a dedicated team of material scientists, process engineers, and project managers. We bring decades of combined experience in industrial composites and a shared passion for solving complex engineering problems.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {/* Team Member Card */}
                {[
                  { name: "Muhammed Rashik P", role: "Managing Director", image: "https://lh3.googleusercontent.com/pw/AP1GczPXd3SB3ha5w7wQYPCYln2z7mHwS2GWu0AiuUXj7QzLOpT54vA9BriS2YorAIZu9Qm0ppfMXMU6tBiJ4dyG4yhafK5leMobYiQCD8pWPWynVssz2_ueIQwbCl2XYIagOoycgZH5wk512mzKaUCSYsAXtQ=w1280-h720-s-no-gm?authuser=0" },
                  { name: "Anjali Kumar", role: "Head of Operations", image: "https://picsum.photos/200/200?random=41" },
                  { name: "Vikram Singh", role: "Lead, Material Science", image: "https://picsum.photos/200/200?random=42" },
                  { name: "Priya Menon", role: "Project Management", image: "https://picsum.photos/200/200?random=43" }
                ].map((member, i) => (
                  <div key={i} className="text-center group">
                      <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-emphz-orange transition-all duration-500 shadow-xl">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"/>
                          <div className="absolute inset-0 bg-emphz-orange/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h4 className="font-bold text-lg md:text-xl mt-4 md:mt-5 font-display text-emphz-navy">{member.name}</h4>
                      <p className="text-emphz-orange text-xs md:text-sm font-medium font-sans uppercase tracking-wide">{member.role}</p>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* Warranty Section (NEW) */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 md:mb-12 text-center">
                 <h2 className="text-xs md:text-sm font-bold text-emphz-orange tracking-widest uppercase mb-3 md:mb-4 font-display">Peace of Mind</h2>
                 <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy font-display">Industry-Leading Warranty.</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emphz-navy text-white rounded-full flex items-center justify-center font-black text-2xl md:text-3xl mb-4 md:mb-6 shadow-lg shadow-emphz-navy/20">10</div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 font-display">10-Year Structural Warranty</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans">
                        We guarantee our GRP molded components against structural failure, chemical corrosion, and UV-induced degradation for a full decade from installation.
                    </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-emphz-orange/10 text-emphz-orange rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <Shield className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 font-display">Coverage Details</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans">
                        Includes protection against manufacturing defects, IP rating failures (water ingress), and hardware mechanical faults. Excludes damage from vandalism or natural disasters.
                    </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                        <FileCheck className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3 font-display">Seamless Claims</h4>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans">
                        Experiencing an issue? Simply submit your invoice and photos to our support team. We commit to a 48-hour assessment turnaround and expedited replacement parts.
                    </p>
                </div>
            </div>
            
             <div className="mt-8 md:mt-12 text-center bg-white border border-gray-200 p-4 rounded-lg inline-block mx-auto w-full max-w-2xl">
                <p className="text-[10px] md:text-xs text-gray-500 italic font-sans">
                    * Terms and conditions apply. Warranty is valid only when installation guidelines are followed. For full documentation, please visit our <Link to="/technical" className="text-emphz-orange font-bold hover:underline">Technical Center</Link>.
                </p>
            </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="bg-emphz-navy">
            <div className="max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 md:mb-6 font-display">Ready to Build with Confidence?</h2>
                <p className="text-base md:text-lg text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto font-sans">
                    Partner with us to leverage the power of GRP for your next project. Let's create infrastructure that lasts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/rfq" className="bg-emphz-orange text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:scale-105 transition-transform font-display uppercase tracking-wider">
                        Request a Consultation
                    </Link>
                    <Link to="/case-studies" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all font-display uppercase tracking-wider">
                        See Our Work
                    </Link>
                </div>
            </div>
       </section>
    </div>
  );
};

export default About;
