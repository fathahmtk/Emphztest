import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Gem, Users, Anchor, Lightbulb, Zap, CheckCircle, MapPin, PenTool, Calendar, Award, Rocket, Shield, FileCheck, XCircle, AlertTriangle, Scale, BatteryCharging } from 'lucide-react';

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
      <section className="bg-emphz-navy text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://picsum.photos/1600/900?random=30')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emphz-navy via-emphz-navy/70 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 max-w-3xl">Engineering a Corrosion-Free Future.</h1>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed font-light border-l-4 border-emphz-orange pl-6">
            We are a team of material scientists and engineers dedicated to solving India's toughest infrastructure challenges with advanced GRP composites.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="pr-8">
            <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Our Mission</h2>
            <h3 className="text-4xl font-bold text-emphz-navy mb-6">To Replace Obsolete Materials.</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to systematically replace traditional materials like steel, concrete, and wood with superior, high-performance GRP solutions in critical infrastructure. We aim to eradicate the costs and dangers associated with corrosion and degradation, ensuring longevity and safety for a modern India.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
            <div className="flex items-start">
              <div className="bg-emphz-orange/10 p-3 rounded-full mr-4"><Target className="w-6 h-6 text-emphz-orange" /></div>
              <div>
                <h4 className="font-bold text-lg">Engineer for Environment</h4>
                <p className="text-gray-500 text-sm">Create products perfectly suited for their intended environment, from saline coasts to harsh industrial zones.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emphz-orange/10 p-3 rounded-full mr-4"><Gem className="w-6 h-6 text-emphz-orange" /></div>
              <div>
                <h4 className="font-bold text-lg">Deliver Unmatched Quality</h4>
                <p className="text-gray-500 text-sm">Utilize precision manufacturing and the highest-grade materials to deliver products that exceed international standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
       <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Our Core Values</h2>
            <h3 className="text-4xl font-bold text-emphz-navy mb-12">The Principles That Guide Us.</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, i) => (
                    <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        {value.icon}
                        <h4 className="text-xl font-bold my-4">{value.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
       </section>

      {/* Why Choose GRP? Comparison Section (NEW) */}
      <section className="py-24 bg-emphz-navy text-white relative overflow-hidden">
         {/* Background Abstract */}
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emphz-orange rounded-full blur-[120px] opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] opacity-10 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
                 <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4 font-display">Material Science</h2>
                 <h3 className="text-4xl md:text-5xl font-black text-white font-display mb-6">Why Choose GRP?</h3>
                 <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed">
                   When compared to traditional infrastructure materials, Glass Reinforced Plastic (GRP) offers a superior balance of strength, safety, and longevity.
                 </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Advantage Card 1 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 bg-emphz-orange rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Shield className="text-white w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 font-display">Chemical Resistance</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-sans">
                        Unlike steel which oxidizes and concrete which spalls, GRP is chemically inert. It withstands acids, salts, and sulfates found in coastal and industrial zones.
                    </p>
                </div>
                 {/* Advantage Card 2 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <BatteryCharging className="text-white w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 font-display">Electrical Insulation</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-sans">
                        GRP is a natural insulator with high dielectric strength. It eliminates the risk of electrical shock and removes the need for costly earthing straps required for metal boxes.
                    </p>
                </div>
                 {/* Advantage Card 3 */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Scale className="text-white w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 font-display">Weight-to-Strength</h4>
                    <p className="text-gray-400 text-sm leading-relaxed font-sans">
                        At 25% the weight of steel, GRP is easier to transport and install, reducing labor costs while maintaining an impact rating of IK10 (similar to metal).
                    </p>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-black/20">
                      <th className="p-6 text-gray-400 font-display text-xs uppercase tracking-wider w-1/4">Feature Analysis</th>
                      <th className="p-6 bg-emphz-orange/20 text-emphz-orange font-bold font-display text-base w-1/4 border-t-4 border-emphz-orange">EMPHZ GRP</th>
                      <th className="p-6 text-white font-bold font-display text-base w-1/4">Stainless Steel (316)</th>
                      <th className="p-6 text-white font-bold font-display text-base w-1/4">Mild Steel / CRCA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-sm">
                    <tr>
                      <td className="p-6 font-bold text-white">Corrosion Resistance</td>
                      <td className="p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={16}/> Unaffected</td>
                      <td className="p-6 text-gray-300">High (Pits over time)</td>
                      <td className="p-6 text-red-400 flex items-center gap-2"><XCircle size={16}/> Low (Rusts quickly)</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-bold text-white">Maintenance Cost</td>
                      <td className="p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={16}/> Zero</td>
                      <td className="p-6 text-gray-300">Low</td>
                      <td className="p-6 text-red-400 flex items-center gap-2"><XCircle size={16}/> High (Painting req.)</td>
                    </tr>
                     <tr>
                      <td className="p-6 font-bold text-white">Electrical Conductivity</td>
                      <td className="p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={16}/> Non-Conductive</td>
                      <td className="p-6 text-yellow-500 flex items-center gap-2"><AlertTriangle size={16}/> Conductive</td>
                      <td className="p-6 text-yellow-500 flex items-center gap-2"><AlertTriangle size={16}/> Conductive</td>
                    </tr>
                     <tr>
                      <td className="p-6 font-bold text-white">Weight Ratio</td>
                      <td className="p-6 bg-emphz-orange/5 text-emphz-orange font-bold">1.0x (Lightweight)</td>
                      <td className="p-6 text-gray-300">4.0x (Heavy)</td>
                      <td className="p-6 text-gray-300">4.0x (Heavy)</td>
                    </tr>
                     <tr>
                      <td className="p-6 font-bold text-white">Radio Transparency</td>
                      <td className="p-6 bg-emphz-orange/5 text-emphz-orange font-bold flex items-center gap-2"><CheckCircle size={16}/> Transparent (WiFi/4G)</td>
                      <td className="p-6 text-red-400 flex items-center gap-2"><XCircle size={16}/> Blocks Signals</td>
                      <td className="p-6 text-red-400 flex items-center gap-2"><XCircle size={16}/> Blocks Signals</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
         </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 bg-emphz-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                 <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Our Journey</h2>
                 <h3 className="text-4xl font-bold text-emphz-navy">From Concept to Coastline.</h3>
            </div>
            <div className="relative">
                 {/* The vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-emphz-orange/20 hidden md:block"></div>
                {timelineEvents.map((event, i) => (
                    <div key={i} className={`mb-12 flex items-center w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className="hidden md:block w-5/12"></div>
                        <div className="z-10 relative">
                             <div className="w-12 h-12 bg-emphz-navy rounded-full shadow-lg flex items-center justify-center text-white">
                                {event.icon}
                             </div>
                        </div>
                        <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                            <p className="text-emphz-orange font-black text-2xl mb-2">{event.year}</p>
                            <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                            <p className="text-sm text-gray-500">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Our Experts</h2>
            <h3 className="text-4xl font-bold text-emphz-navy mb-6">The Minds Behind the Material.</h3>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
                Emphz is powered by a dedicated team of material scientists, process engineers, and project managers. We bring decades of combined experience in industrial composites and a shared passion for solving complex engineering problems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Team Member Card */}
                <div className="text-center group">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-emphz-orange transition-colors">
                        <img src="https://picsum.photos/200/200?random=40" alt="Team member" className="w-full h-full object-cover"/>
                    </div>
                    <h4 className="font-bold text-lg mt-4">Rajesh Nair</h4>
                    <p className="text-emphz-orange text-sm font-medium">Founder & Chief Engineer</p>
                </div>
                <div className="text-center group">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-emphz-orange transition-colors">
                        <img src="https://picsum.photos/200/200?random=41" alt="Team member" className="w-full h-full object-cover"/>
                    </div>
                    <h4 className="font-bold text-lg mt-4">Anjali Kumar</h4>
                    <p className="text-emphz-orange text-sm font-medium">Head of Operations</p>
                </div>
                <div className="text-center group">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-emphz-orange transition-colors">
                        <img src="https://picsum.photos/200/200?random=42" alt="Team member" className="w-full h-full object-cover"/>
                    </div>
                    <h4 className="font-bold text-lg mt-4">Vikram Singh</h4>
                    <p className="text-emphz-orange text-sm font-medium">Lead, Material Science</p>
                </div>
                <div className="text-center group">
                    <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-emphz-orange transition-colors">
                        <img src="https://picsum.photos/200/200?random=43" alt="Team member" className="w-full h-full object-cover"/>
                    </div>
                    <h4 className="font-bold text-lg mt-4">Priya Menon</h4>
                    <p className="text-emphz-orange text-sm font-medium">Project Management</p>
                </div>
            </div>
        </div>
      </section>

      {/* Warranty Section (NEW) */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                 <h2 className="text-sm font-bold text-emphz-orange tracking-widest uppercase mb-4">Peace of Mind</h2>
                 <h3 className="text-4xl font-bold text-emphz-navy">Industry-Leading Warranty.</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 bg-emphz-navy text-white rounded-full flex items-center justify-center font-black text-3xl mb-6 shadow-lg shadow-emphz-navy/20">10</div>
                    <h4 className="font-bold text-lg mb-3">10-Year Structural Warranty</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        We guarantee our GRP molded components against structural failure, chemical corrosion, and UV-induced degradation for a full decade from installation.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                    <div className="w-20 h-20 bg-emphz-orange/10 text-emphz-orange rounded-full flex items-center justify-center mb-6">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-lg mb-3">Coverage Details</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Includes protection against manufacturing defects, IP rating failures (water ingress), and hardware mechanical faults. Excludes damage from vandalism or natural disasters.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:-translate-y-1 transition-transform">
                     <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                        <FileCheck className="w-10 h-10" />
                    </div>
                    <h4 className="font-bold text-lg mb-3">Seamless Claims</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Experiencing an issue? Simply submit your invoice and photos to our support team. We commit to a 48-hour assessment turnaround and expedited replacement parts.
                    </p>
                </div>
            </div>
            
             <div className="mt-12 text-center bg-white border border-gray-200 p-4 rounded-lg inline-block mx-auto w-full max-w-2xl">
                <p className="text-xs text-gray-500 italic">
                    * Terms and conditions apply. Warranty is valid only when installation guidelines are followed. For full documentation, please visit our <Link to="/technical" className="text-emphz-orange font-bold hover:underline">Technical Center</Link>.
                </p>
            </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="bg-emphz-navy">
            <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Build with Confidence?</h2>
                <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                    Partner with us to leverage the power of GRP for your next project. Let's create infrastructure that lasts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/rfq" className="bg-emphz-orange text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl hover:scale-105 transition-transform">
                        Request a Consultation
                    </Link>
                    <Link to="/case-studies" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-white/20 transition-all">
                        See Our Work
                    </Link>
                </div>
            </div>
       </section>
    </div>
  );
};

export default About;