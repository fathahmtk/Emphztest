import React from 'react';
import { MOCK_CASE_STUDIES } from '../constants';
import { MapPin, ArrowRight } from 'lucide-react';

const CaseStudies: React.FC = () => {
  return (
    <div className="bg-emphz-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-emphz-orange font-bold uppercase tracking-wider text-sm">Proven Performance</span>
          <h1 className="text-4xl font-bold text-emphz-navy mt-2 mb-4">Project Case Studies</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Emphz GRP solutions solve critical infrastructure challenges in real-world environments across Kerala and Karnataka.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {MOCK_CASE_STUDIES.map((study, idx) => (
            <div key={study.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-2/5 relative overflow-hidden group">
                <img 
                  src={study.imageUrl} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-emphz-navy uppercase tracking-wide">
                  {study.category}
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center text-emphz-orange font-bold text-sm mb-2">
                  <MapPin size={16} className="mr-2" /> {study.location}
                </div>
                <h2 className="text-3xl font-bold text-emphz-navy mb-6">{study.title}</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-red-200 pl-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">The Challenge</h4>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  <div className="border-l-4 border-green-200 pl-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-1">The Solution</h4>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>
                  <div className="bg-emphz-beige/20 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-emphz-navy uppercase mb-1">Key Outcome</h4>
                    <p className="text-emphz-navy font-medium">{study.outcome}</p>
                  </div>
                </div>

                <button className="self-start flex items-center text-emphz-navy font-bold hover:text-emphz-orange transition-colors">
                  View Full Report <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;