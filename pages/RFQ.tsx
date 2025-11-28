import React, { useState } from 'react';
import { Trash2, Send, CheckCircle, MapPin, AlertCircle, Briefcase, Clock } from 'lucide-react';
import { useRFQ } from '../contexts/RFQContext';
import { Link } from 'react-router-dom';

const RFQ: React.FC = () => {
  const { items, removeItem, clearCart } = useRFQ();
  const [submitted, setSubmitted] = useState(false);
  const [routingMessage, setRoutingMessage] = useState('');
  const [leadScore, setLeadScore] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    region: 'Kerala',
    industry: 'Construction',
    urgency: 'Standard',
    project: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Regional Routing Logic
    const isKerala = formData.region === 'Kerala';
    const assignedTeam = isKerala ? 'Kerala Operations (Vadakara)' : 'Mysore Factory HQ';
    setRoutingMessage(`Your request has been routed to our ${assignedTeam} team.`);

    // Lead Scoring Logic
    let score = 10; // Base score
    if (formData.urgency === 'Immediate') score += 40;
    if (formData.urgency === 'OneMonth') score += 20;
    if (formData.industry === 'Utilities' || formData.industry === 'Telecom') score += 30;
    if (formData.email.includes('.com') && !formData.email.includes('gmail')) score += 10; // Corporate email heuristic
    
    setLeadScore(score);

    // Simulate API Call
    setTimeout(() => {
      setSubmitted(true);
      clearCart();
    }, 1000);
  };

  if (submitted) {
    const priorityLevel = leadScore > 50 ? "HIGH PRIORITY" : "STANDARD";
    const priorityColor = leadScore > 50 ? "text-red-600 bg-red-50 border-red-200" : "text-blue-600 bg-blue-50 border-blue-200";

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-emphz-cream px-4" role="alert">
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center max-w-lg border-t-4 border-green-500">
          <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-green-500 mx-auto mb-6" aria-hidden="true" />
          <h2 className="text-2xl md:text-3xl font-bold text-emphz-navy mb-2">Quote Request Received</h2>
          <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold border mb-6 ${priorityColor}`}>
             STATUS: {priorityLevel} LEAD
          </div>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Thank you for choosing Emphz. <br/>
            <span className="font-bold text-emphz-navy">{routingMessage}</span>
          </p>
          <p className="text-xs md:text-sm text-gray-500 mb-8 bg-gray-50 p-4 rounded">
            An automated confirmation email with our latest product brochure has been sent to {formData.email}.
          </p>
          <Link to="/" className="inline-block bg-emphz-navy text-white px-8 py-3 rounded-md font-bold hover:bg-emphz-orange transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-emphz-navy text-sm uppercase tracking-wide">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emphz-navy mb-2">Request for Quotation</h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">Get factory-direct pricing from Mysore with local support in Kerala.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 md:mb-8">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="font-bold text-gray-700 text-sm md:text-base">Selected Products ({items.length})</h2>
                <Link to="/products" className="text-xs font-bold text-emphz-orange hover:underline">Add More +</Link>
              </div>
              
              {items.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <div className="mb-4 text-sm">Your quote list is empty.</div>
                  <Link to="/products" className="bg-gray-100 text-emphz-navy px-4 py-2 rounded font-bold hover:bg-emphz-navy hover:text-white transition-colors text-xs uppercase tracking-wide">
                    Browse Catalog
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-emphz-navy text-base md:text-lg">{item.productName}</h3>
                        <p className="text-xs text-gray-400 font-mono">ID: {item.productId}</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-8">
                        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                          Qty: <span className="font-bold">{item.quantity}</span>
                        </div>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:text-red-600"
                          aria-label={`Remove ${item.productName} from quote`}
                        >
                          <Trash2 size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center shadow-sm">
                 <div className="bg-blue-50 p-2 rounded mr-3"><MapPin className="text-blue-600 w-5 h-5" aria-hidden="true"/></div>
                 <div><h4 className="font-bold text-xs text-emphz-navy">Factory Direct</h4><p className="text-[10px] text-gray-500">Mysore Mfg. Hub</p></div>
               </div>
               <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center shadow-sm">
                 <div className="bg-green-50 p-2 rounded mr-3"><CheckCircle className="text-green-600 w-5 h-5" aria-hidden="true"/></div>
                 <div><h4 className="font-bold text-xs text-emphz-navy">ISO 9001:2015</h4><p className="text-[10px] text-gray-500">Certified Quality</p></div>
               </div>
               <div className="bg-white p-4 rounded-lg border border-gray-100 flex items-center shadow-sm">
                 <div className="bg-orange-50 p-2 rounded mr-3"><Send className="text-orange-600 w-5 h-5" aria-hidden="true"/></div>
                 <div><h4 className="font-bold text-xs text-emphz-navy">Fast Response</h4><p className="text-[10px] text-gray-500">24h Turnaround</p></div>
               </div>
            </div>
          </div>

          {/* RFQ Form */}
          <div>
            <div className="bg-white rounded-xl shadow-lg border-t-4 border-emphz-orange p-6 sticky top-24">
              <h2 className="text-xl font-bold text-emphz-navy mb-6">Project Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-emphz-cream p-4 rounded border border-emphz-beige">
                  <h3 className="text-xs font-bold text-emphz-navy mb-3 flex items-center"><Briefcase size={12} className="mr-1" aria-hidden="true"/> PROJECT CONTEXT</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="industry" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Industry</label>
                      <select 
                        id="industry"
                        name="industry" 
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full rounded border-gray-300 text-base md:text-sm p-2 border bg-white"
                      >
                        <option value="Construction">Construction</option>
                        <option value="Utilities">Utilities / Power</option>
                        <option value="Telecom">Telecom</option>
                        <option value="OilGas">Oil & Gas</option>
                        <option value="Hospitality">Hospitality</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="urgency" className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Urgency</label>
                      <select 
                        id="urgency"
                        name="urgency" 
                        value={formData.urgency}
                        onChange={handleChange}
                        className="w-full rounded border-gray-300 text-base md:text-sm p-2 border bg-white"
                      >
                        <option value="Standard">Standard (4 wks)</option>
                        <option value="Immediate">Immediate / Rush</option>
                        <option value="OneMonth">1-2 Months</option>
                        <option value="Planning">Budget Planning</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="region" className="block text-xs font-bold text-gray-500 uppercase mb-1">Region / State</label>
                  <select 
                    id="region"
                    name="region" 
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-2 border bg-gray-50 font-medium"
                  >
                    <option value="Kerala">Kerala (Vadakara Ops)</option>
                    <option value="Karnataka">Karnataka (Mysore Ops)</option>
                    <option value="TamilNadu">Tamil Nadu</option>
                    <option value="RestOfIndia">Rest of India</option>
                    <option value="International">International / Export</option>
                  </select>
                  <p className="text-[10px] text-emphz-orange mt-1 flex items-center">
                    <MapPin size={10} className="mr-1" aria-hidden="true" />
                    {formData.region === 'Kerala' ? 'Direct routing to Vadakara Office' : 'Direct routing to Mysore Factory HQ'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input id="name" required aria-required="true" name="name" onChange={handleChange} type="text" autoComplete="name" className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-3 md:p-2 border" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-gray-500 uppercase mb-1">Company</label>
                    <input id="company" required aria-required="true" name="company" onChange={handleChange} type="text" autoComplete="organization" className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-3 md:p-2 border" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input id="email" required aria-required="true" name="email" onChange={handleChange} type="email" autoComplete="email" className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-3 md:p-2 border" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone / WhatsApp</label>
                  <input id="phone" required aria-required="true" name="phone" onChange={handleChange} type="tel" autoComplete="tel" inputMode="tel" className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-3 md:p-2 border" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase mb-1">Specific Requirements</label>
                  <textarea id="message" name="message" onChange={handleChange} rows={3} placeholder="Dimensions, IP rating, delivery location..." className="w-full rounded border-gray-300 focus:ring-emphz-orange focus:border-emphz-orange text-base md:text-sm p-3 md:p-2 border"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-emphz-navy text-white font-bold py-4 rounded-lg hover:bg-emphz-orange transition-colors flex justify-center items-center shadow-lg transform active:scale-95 focus:ring-2 focus:ring-offset-2 focus:ring-emphz-navy text-sm uppercase tracking-wide"
                >
                  <Send size={18} className="mr-2" aria-hidden="true" /> SUBMIT QUOTE REQUEST
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-2 leading-tight flex items-center justify-center">
                  <AlertCircle size={10} className="mr-1" aria-hidden="true" /> High-priority requests are answered within 4 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQ;