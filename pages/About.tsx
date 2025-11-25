import React from 'react';
import { MapPin, Shield, PenTool, Truck } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-emphz-navy text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-emphz-orange font-bold uppercase tracking-widest text-sm mb-4 block">The Emphz Standard</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Unapologetically <br/>High Quality</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            We apologize for raising the bar. By engineering GRP solutions that don't rust, don't fade, and don't fail, we've made "standard" quality obsolete.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manufacturing */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-emphz-orange hover:transform hover:-translate-y-1 transition-all">
               <div className="flex items-center mb-6">
                 <div className="bg-emphz-navy p-3 rounded-full mr-4">
                   <PenTool className="text-white w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Manufacturing Hub</h3>
                   <h2 className="text-2xl font-bold text-emphz-navy">Mysore Factory</h2>
                 </div>
               </div>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 Our state-of-the-art facility in KIADB Industrial Area, Mysore, is equipped with advanced hot-press molding and RTM technology. This is where raw glass fiber and resin are transformed into the toughest enclosures in the market.
               </p>
               <div className="bg-gray-100 p-4 rounded text-sm text-gray-700">
                 <strong>Capabilities:</strong> <br/>
                 • SMC / DMC Molding<br/>
                 • Custom Fabrication<br/>
                 • IP Testing Lab
               </div>
            </div>

            {/* Operations */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-emphz-navy hover:transform hover:-translate-y-1 transition-all">
               <div className="flex items-center mb-6">
                 <div className="bg-emphz-orange p-3 rounded-full mr-4">
                   <MapPin className="text-white w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Operations & Sales</h3>
                   <h2 className="text-2xl font-bold text-emphz-navy">Kerala Headquarters</h2>
                 </div>
               </div>
               <p className="text-gray-600 mb-6 leading-relaxed">
                 Based in Vadakara, our operations team understands the unique challenges of the coastal climate. We provide rapid support, site consultations, and logistics management for the entire Kerala and Karnataka region.
               </p>
               <div className="bg-gray-100 p-4 rounded text-sm text-gray-700">
                 <strong>Services:</strong> <br/>
                 • Site Feasibility Studies<br/>
                 • Rapid Logistics<br/>
                 • Installation Support
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-24 bg-emphz-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Emphz GRP?</h2>
            <p className="text-gray-400">Engineered to replace steel, wood, and concrete.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <Shield className="w-16 h-16 text-emphz-orange mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Zero Corrosion</h3>
              <p className="text-gray-400 leading-relaxed">
                Salt spray, humidity, and industrial chemicals have no effect on our GRP composites. Guaranteed for 25+ years.
              </p>
            </div>
            <div>
              <Truck className="w-16 h-16 text-emphz-orange mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Rapid Deployment</h3>
              <p className="text-gray-400 leading-relaxed">
                Modular designs mean we can install a security cabin or villa in days, not weeks. No heavy cranes required.
              </p>
            </div>
            <div>
              <PenTool className="w-16 h-16 text-emphz-orange mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Custom Engineering</h3>
              <p className="text-gray-400 leading-relaxed">
                We don't just sell boxes. We design bespoke enclosures with precise cutouts, mounting plates, and ventilation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;