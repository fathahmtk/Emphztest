import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Phone, Mail, MapPin, ChevronRight, MessageCircle, FileText } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useRFQ } from '../contexts/RFQContext';
import LiveChatWidget from './LiveChatWidget';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { items } = useRFQ();

  // Updated logic to handle sub-routes robustly
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isHome = location.pathname === '/';

  // Handle scroll effect for header transparency, dynamic theme color, and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
      
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Keep theme-color dark (#0B1120) for immersive feel in both states
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0B1120');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Dynamic Title
  useEffect(() => {
    const pageTitle = NAV_LINKS.find(l => l.path === location.pathname)?.label || 'Emphz';
    document.title = `${pageTitle} | Emphz GRP Solutions`;
  }, [location]);

  // Escape key to close menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Header State Logic - PREMIUM DARK THEME
  const isHeaderTransparent = isHome && !scrolled && !isMenuOpen;
  
  // Transition from transparent to Deep Navy with Teal Border glow
  const headerBgClass = isMenuOpen 
    ? 'bg-transparent border-transparent py-2' 
    : (isHeaderTransparent 
        ? 'bg-transparent border-transparent py-4 md:py-6' 
        : 'bg-emphz-navy/95 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]');
  
  // Navigation Links
  const navLinkClass = isHeaderTransparent 
    ? 'text-gray-100 hover:text-white font-medium drop-shadow-md' 
    : 'text-gray-300 font-medium hover:text-white';
    
  const activeLinkClass = 'text-emphz-orange font-bold drop-shadow-md';
  
  const iconColorClass = isHeaderTransparent 
    ? 'text-white hover:text-emphz-orange drop-shadow-md' 
    : 'text-gray-300 hover:text-emphz-orange';

  // Desktop Nav Pill Container
  const navPillClass = isHeaderTransparent 
    ? 'bg-black/20 border border-white/10 backdrop-blur-sm shadow-lg' 
    : 'bg-black/20 border border-white/5';

  return (
    <div className="min-h-screen flex flex-col bg-white text-emphz-navy font-sans selection:bg-emphz-orange selection:text-white relative">
      {/* Global Style Injection for Smooth Scrolling and Header Offset */}
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px; 
        }
        /* Global Noise Texture */
        .global-noise {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Noise Overlay */}
      <div className="global-noise"></div>
      
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <div 
          className="h-full bg-emphz-orange shadow-[0_0_10px_#00ADB5]" 
          style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s ease-out' }}
        />
      </div>

      {/* Main Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${headerBgClass}`}
        aria-label="Site Header"
      >
        <div className="w-full px-6 md:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="group z-50 relative" aria-label="Emphz Home" onClick={() => setIsMenuOpen(false)}>
              <Logo className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105" variant="light" />
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center space-x-8 px-10 py-3 rounded-full transition-all duration-500 ${navPillClass}`} aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs tracking-[0.15em] uppercase transition-all duration-300 font-display relative group ${
                    isActive(link.path) ? activeLinkClass : navLinkClass
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emphz-orange transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100 shadow-[0_0_10px_#00ADB5]' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-5">
              <Link to="/rfq" className={`relative p-2 transition-colors group ${iconColorClass}`} aria-label={`View RFQ Cart, ${items.length} items`}>
                <ShoppingCart size={22} aria-hidden="true" className="group-hover:scale-110 transition-transform"/>
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-emphz-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md ring-2 ring-emphz-navy animate-pulse">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link to="/rfq" className="bg-emphz-orange text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#00D4DE] transition-all shadow-[0_0_20px_rgba(0,173,181,0.3)] hover:shadow-[0_0_30px_rgba(0,173,181,0.5)] transform hover:-translate-y-0.5 font-display border border-white/10">
                GET QUOTE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-50 gap-4">
               <Link to="/rfq" onClick={() => setIsMenuOpen(false)} className={`relative p-2 transition-colors ${iconColorClass}`} aria-label={`View RFQ Cart`}>
                <ShoppingCart size={24} aria-hidden="true" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-emphz-orange text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-md ring-1 ring-emphz-navy">
                    {items.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 focus:outline-none text-white hover:text-emphz-orange rounded-full transition-all"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={32} aria-hidden="true" /> : <Menu size={32} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Full Screen Cinematic */}
        <div 
            className={`fixed inset-0 bg-[#050A14]/95 backdrop-blur-2xl z-40 flex flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
            role="dialog" 
            aria-modal="true"
        >
            <nav className="space-y-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-4xl sm:text-5xl font-black tracking-tight transition-all duration-700 transform font-display group ${
                    isActive(link.path) 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-emphz-orange to-cyan-200' 
                      : 'text-white/40 hover:text-white'
                  } ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
                  style={{ transitionDelay: `${150 + (index * 75)}ms` }}
                >
                  <span className="inline-block group-active:scale-95 transition-transform">{link.label}</span>
                </Link>
              ))}
              
              <div 
                className={`pt-12 border-t border-white/10 transition-all duration-700 delay-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                 <Link to="/rfq" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full bg-emphz-orange text-white px-8 py-5 rounded-2xl font-bold text-lg sm:text-xl font-display shadow-[0_10px_40px_-10px_rgba(0,173,181,0.5)] active:scale-95 transition-transform">
                    <span>Review RFQ Cart</span>
                    <span className="bg-black/20 px-4 py-1 rounded-full text-sm font-mono">{items.length} items</span>
                  </Link>
                  
                  <div className="mt-8 flex justify-center gap-8 text-white/50">
                    <a href="mailto:info@emphz.in" className="hover:text-emphz-orange transition-colors"><Mail size={24}/></a>
                    <a href="tel:+919037874080" className="hover:text-emphz-orange transition-colors"><Phone size={24}/></a>
                    <a href="#" className="hover:text-emphz-orange transition-colors"><MapPin size={24}/></a>
                  </div>
              </div>
            </nav>
            
            {/* Abstract Background Elements for Menu */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emphz-orange/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none"></div>
          </div>
      </header>

      {/* Main Content - Remove top padding for Home to allow full bleed hero */}
      <main id="main-content" className={`flex-grow relative min-h-[calc(100vh-400px)] ${isHome ? '' : 'pt-20 md:pt-24'}`} role="main" tabIndex={-1}>
        {children}
      </main>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-6 right-6 z-30 flex flex-col gap-3 transition-all duration-500 ${isMenuOpen ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <a 
          href="https://wa.me/919037874080" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-[#25D366]/40 hover:scale-110 transition-all flex items-center justify-center group relative border-2 border-white/20"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} fill="white" className="w-5 h-5 md:w-6 md:h-6" />
          <span className="absolute right-full mr-4 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none font-sans hidden md:block transform translate-x-2 group-hover:translate-x-0">
            Chat with Engineer
          </span>
        </a>
        <Link 
          to="/technical"
          className="bg-white border-2 border-gray-100 text-emphz-navy p-3 md:p-4 rounded-full shadow-lg hover:border-emphz-orange hover:text-emphz-orange hover:scale-110 transition-all flex items-center justify-center group relative"
          aria-label="Technical Specs"
        >
          <FileText size={24} className="w-5 h-5 md:w-6 md:h-6" />
           <span className="absolute right-full mr-4 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none font-sans hidden md:block transform translate-x-2 group-hover:translate-x-0">
            Datasheets
          </span>
        </Link>
      </div>

      <LiveChatWidget />

      {/* Footer - Immersive Midnight Slate */}
      <footer className="bg-emphz-navy text-white pt-20 pb-10 md:pt-28 md:pb-12 relative overflow-hidden" role="contentinfo">
        {/* Background Abstract */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute -right-20 top-0 w-[400px] h-[400px] bg-emphz-orange rounded-full blur-[150px] animate-pulse"></div>
           <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-blue-600 rounded-full blur-[120px]"></div>
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-20">
            <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
              <div className="mb-8">
                <Link to="/" aria-label="Emphz Home">
                  <Logo className="h-10 md:h-12 w-auto opacity-90 hover:opacity-100 transition-opacity" variant="light" />
                </Link>
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 leading-tight max-w-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Replace steel. Ignore corrosion. Build for the future.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md font-sans border-l-2 border-emphz-orange pl-4">
                India's premier GRP infrastructure manufacturer. Delivering precision-molded composites from Mysore to the harshest coastal environments.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emphz-orange uppercase tracking-[0.2em] mb-6 font-display">Products</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group py-1"><ChevronRight size={14} className="mr-2 text-emphz-orange transform group-hover:translate-x-1 transition-transform"/> Enclosures</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group py-1"><ChevronRight size={14} className="mr-2 text-emphz-orange transform group-hover:translate-x-1 transition-transform"/> Modular Kiosks</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group py-1"><ChevronRight size={14} className="mr-2 text-emphz-orange transform group-hover:translate-x-1 transition-transform"/> Security Cabins</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group py-1"><ChevronRight size={14} className="mr-2 text-emphz-orange transform group-hover:translate-x-1 transition-transform"/> Resort Villas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emphz-orange uppercase tracking-[0.2em] mb-6 font-display">Connect</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li className="flex items-start group py-1">
                  <MapPin size={18} className="mr-3 mt-0.5 text-emphz-navy bg-gray-200 rounded-full p-0.5 group-hover:bg-white transition-colors flex-shrink-0" />
                  <span>Mysore Factory <br/><span className="text-xs opacity-50">KIADB Industrial Area</span></span>
                </li>
                <li className="flex items-start group py-1">
                  <MapPin size={18} className="mr-3 mt-0.5 text-emphz-orange bg-white/10 rounded-full p-0.5 group-hover:bg-white transition-colors flex-shrink-0" />
                  <span>Kerala Ops <br/><span className="text-xs opacity-50">Vadakara HQ</span></span>
                </li>
                <li className="flex items-center group hover:text-white transition-colors py-1"><Phone size={16} className="mr-3 text-gray-500 group-hover:text-emphz-orange" /> +91 9037 874 080</li>
                <li className="flex items-center group hover:text-white transition-colors py-1"><Mail size={16} className="mr-3 text-gray-500 group-hover:text-emphz-orange" /> info@emphz.in</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-sans gap-6">
            <p>&copy; 2025 Emphz Engineering Pvt Ltd. Precision Molded in India.</p>
            <div className="flex space-x-8 font-bold uppercase tracking-widest text-[10px]">
              <Link to="#" className="hover:text-emphz-orange transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-emphz-orange transition-colors">Terms of Use</Link>
              <Link to="/sitemap" className="hover:text-emphz-orange transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
