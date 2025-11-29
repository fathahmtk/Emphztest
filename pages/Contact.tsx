import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, CheckCircle, HelpCircle, Globe, ChevronRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const faqs = [
    { question: "Do you offer custom dimensions?", answer: "Yes, our SMC hot press process allows for modular customization, and we also offer hand-layup services for bespoke requirements." },
    { question: "What is your typical lead time?", answer: "Standard enclosures are shipped within 48 hours. Custom orders typically require 2-4 weeks depending on mold availability." },
    { question: "Do you ship internationally?", answer: "Yes, we export to the Middle East, Southeast Asia, and Africa. All shipments are palletized and ISPM-15 compliant." },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-emphz-orange selection:text-white pb-24">
      
      {/* Hero Section - Refined */}
      <div className="relative bg-[#0B1120] text-white pt-32 pb-64 overflow-hidden">
         {/* Background Elements */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emphz-orange/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4 animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/4"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emphz-orange animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 font-display">Global Engineering Support</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 font-display tracking-tight leading-tight drop-shadow-2xl">
                Start the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emphz-orange to-cyan-400">Conversation.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed font-sans">
                Whether you need technical datasheets, a custom fabrication quote, or partnership details, our team is ready to deploy solutions.
            </p>
         </div>
      </div>

      {/* Main Content Container - Overlapping Hero with Glass effect border */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-32">
         <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col lg:flex-row min-h-[800px] border border-white/20">
            
            {/* Sidebar (Dark Navy with texture) */}
            <div className="lg:w-5/12 bg-[#050A14] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
                {/* Abstract Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-emphz-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="text-xs font-bold text-emphz-orange uppercase tracking-[0.2em] mb-8 font-display flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-emphz-orange"></span> Contact Info
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display text-white">Let's build something durable.</h3>
                    <p className="text-gray-400 text-sm mb-12 font-light leading-relaxed">
                        Reach out directly to our engineering HQ. We typically respond to technical queries within 4 hours during business days.
                    </p>

                    <div className="space-y-6">
                         {/* Info Cards */}
                         <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start group p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emphz-orange/30 transition-all duration-300">
                            <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-white/10 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                                <MapPin size={20} className="text-emphz-orange" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1 font-display group-hover:text-emphz-orange transition-colors">Factory HQ</h4>
                                <p className="text-gray-400 text-xs font-mono leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    KIADB Industrial Area, Phase 2<br/>
                                    Mysore, Karnataka - 570018<br/>
                                    India
                                </p>
                            </div>
                         </a>

                         <a href="mailto:info@emphz.in" className="flex items-start group p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emphz-orange/30 transition-all duration-300">
                             <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-white/10 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                                <Mail size={20} className="text-emphz-orange" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1 font-display group-hover:text-emphz-orange transition-colors">Email Engineering</h4>
                                <p className="text-gray-400 text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity">info@emphz.in</p>
                                <p className="text-gray-500 text-[10px] font-mono mt-1">For RFQs & Datasheets</p>
                            </div>
                         </a>

                         <a href="tel:+919037874080" className="flex items-start group p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emphz-orange/30 transition-all duration-300">
                             <div className="w-12 h-12 rounded-xl bg-[#0B1120] border border-white/10 flex items-center justify-center mr-5 group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                                <Phone size={20} className="text-emphz-orange" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm mb-1 font-display group-hover:text-emphz-orange transition-colors">Direct Line</h4>
                                <p className="text-gray-400 text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity">+91 9037 874 080</p>
                                <p className="text-gray-500 text-[10px] font-mono mt-1">Mon-Sat, 9am - 6pm IST</p>
                            </div>
                         </a>
                    </div>
                </div>

                {/* Bottom Social/Links */}
                <div className="relative z-10 pt-8 mt-auto border-t border-white/10 flex justify-between items-center">
                     <span className="text-[10px] text-gray-500 uppercase tracking-widest font-display">Connect with us</span>
                     <div className="flex gap-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emphz-orange hover:text-white transition-all text-gray-400 border border-white/5">
                            <Globe size={16} />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emphz-orange hover:text-white transition-all text-gray-400 border border-white/5">
                             <MessageSquare size={16} />
                        </a>
                     </div>
                </div>
            </div>

            {/* Form Side (White) */}
            <div className="lg:w-7/12 p-10 md:p-16 bg-white relative">
                 {isSuccess ? (
                    // Success State
                     <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-20">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                             <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black text-emphz-navy mb-4 font-display">Message Received</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mb-10 text-base leading-relaxed">
                            Thanks for reaching out! Our engineering support team has received your inquiry and will review it shortly.
                        </p>
                        <button 
                            onClick={() => { setIsSuccess(false); setFormData({name: '', email: '', phone: '', subject: '', message: ''}); }}
                            className="text-white bg-emphz-navy px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emphz-orange transition-all shadow-lg"
                        >
                            Send Another Message
                        </button>
                     </div>
                 ) : (
                    // Form
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                        <div className="mb-10">
                            <h3 className="text-3xl font-bold text-emphz-navy mb-2 font-display">Send a Message</h3>
                            <p className="text-gray-400 text-sm">Fill out the form below and we'll get back to you.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-display">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emphz-orange/20 focus:border-emphz-orange transition-all font-medium text-emphz-navy placeholder-gray-400 text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-display">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emphz-orange/20 focus:border-emphz-orange transition-all font-medium text-emphz-navy placeholder-gray-400 text-sm"
                                    placeholder="john@company.com"
                                />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-6">
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-display">Phone (Optional)</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emphz-orange/20 focus:border-emphz-orange transition-all font-medium text-emphz-navy placeholder-gray-400 text-sm"
                                    placeholder="+91 ..."
                                />
                            </div>
                            <div className="group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-display">Subject</label>
                                <div className="relative">
                                    <select 
                                        name="subject" 
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emphz-orange/20 focus:border-emphz-orange transition-all font-medium text-emphz-navy cursor-pointer appearance-none text-sm"
                                    >
                                        <option value="">Select Topic...</option>
                                        <option value="Sales">Project Inquiry</option>
                                        <option value="Technical">Technical Support</option>
                                        <option value="Careers">Careers</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 w-4 h-4 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="group mb-8">
                             <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 font-display">Message</label>
                             <textarea 
                                name="message" 
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-emphz-orange/20 focus:border-emphz-orange transition-all font-medium text-emphz-navy placeholder-gray-400 resize-none text-sm"
                                placeholder="Tell us about your project requirements..."
                             ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-emphz-navy text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.15em] hover:bg-emphz-orange transition-all shadow-xl hover:shadow-emphz-orange/30 transform hover:-translate-y-1 w-full md:w-auto flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</div>
                            ) : (
                                <>
                                    Send Message <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                 )}
            </div>
         </div>

         {/* FAQ Cards - Improved */}
         <div className="mt-32 mb-16">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-8 h-[1px] bg-emphz-orange"></span>
                    <span className="text-xs font-bold text-emphz-orange uppercase tracking-[0.2em] font-display">Support Center</span>
                    <span className="w-8 h-[1px] bg-emphz-orange"></span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-emphz-navy font-display">Frequently Asked Questions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {faqs.map((faq, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-emphz-orange/30 transition-all duration-500 group cursor-default relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[60px] -mr-4 -mt-4 transition-colors group-hover:bg-emphz-orange/10"></div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emphz-orange group-hover:text-white transition-colors text-emphz-navy shadow-sm">
                                <HelpCircle size={24} />
                            </div>
                            <h4 className="font-bold text-emphz-navy text-lg font-display mb-4 group-hover:text-emphz-orange transition-colors">{faq.question}</h4>
                            <p className="text-sm text-gray-500 font-sans leading-relaxed font-light">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;