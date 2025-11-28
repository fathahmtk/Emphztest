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
  const location = useLocation();
  const { items } = useRFQ();

  // Updated logic to handle sub-routes robustly
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isHome = location.pathname === '/';

  // Handle scroll effect for header transparency and dynamic theme color
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      
      // Keep theme-color dark (#0B1120) for immersive feel in both states
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#0B1120');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
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

  // Header State Logic - PREMIUM DARK THEME
  const isHeaderTransparent = isHome && !scrolled;
  
  // Transition from transparent to Deep Navy with Teal Border glow
  const headerBgClass = isHeaderTransparent 
    ? 'bg-transparent py-6' 
    : 'bg-emphz-navy/95 backdrop-blur-md border-b border-emphz-orange/30 shadow-lg shadow-emphz-orange/5 py-3';
  
  // Links are always light based now since header is always dark (transparent-on-dark or navy)
  const navLinkClass = isHeaderTransparent 
    ? 'text-gray-100 hover:text-white font-medium shadow-black/50 drop-shadow-md' 
    : 'text-gray-300 font-medium hover:text-emphz-orange';
    
  const activeLinkClass = 'text-emphz-orange font-bold drop-shadow-md';
  
  // Logo is always light variant
  const logoVariant = 'light';
  
  const iconColorClass = isHeaderTransparent 
    ? 'text-gray-100 hover:text-emphz-orange drop-shadow-md' 
    : 'text-gray-300 hover:text-emphz-orange';

  // Inner Nav Pill container
  const navPillClass = isHeaderTransparent 
    ? 'bg-white/5 border border-white/10 backdrop-blur-md shadow-xl' 
    : 'bg-black/20 border border-white/5';

  return (
    <div className="min-h-screen flex flex-col bg-white text-emphz-navy font-sans selection:bg-emphz-orange selection:text-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Main Header */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}
        aria-label="Site Header"
      >
        <div className="w-full px-6 md:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="group z-50" aria-label="Emphz Home">
              <Logo className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" variant={logoVariant} />
            </Link>

            {/* Desktop Nav */}
            <nav className={`hidden md:flex items-center space-x-8 px-8 py-3 rounded-full transition-all duration-300 ${navPillClass}`} aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs tracking-widest uppercase transition-all duration-300 font-display ${
                    isActive(link.path) ? activeLinkClass : navLinkClass
                  }`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/rfq" className={`relative p-2 transition-colors ${iconColorClass}`} aria-label={`View RFQ Cart, ${items.length} items`}>
                <ShoppingCart size={24} aria-hidden="true" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-emphz-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md ring-2 ring-emphz-navy">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link to="/rfq" className="bg-emphz-orange text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-sky-500 transition-all shadow-lg shadow-emphz-orange/20 hover:shadow-emphz-orange/40 font-display tracking-wide">
                GET QUOTE
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 focus:outline-none text-white hover:text-emphz-orange transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-emphz-navy/95 backdrop-blur-xl z-40 flex flex-col justify-center px-6" role="dialog" aria-modal="true">
            <nav className="space-y-6" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-3xl font-black tracking-tight transition-colors font-display ${
                    isActive(link.path) ? 'text-emphz-orange' : 'text-white hover:text-gray-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-8 border-t border-white/10">
                 <Link to="/rfq" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between w-full bg-emphz-orange text-white px-6 py-4 rounded-xl font-bold text-lg font-display shadow-lg shadow-emphz-orange/20">
                    <span>Review Quote Cart</span>
                    <span className="bg-black/20 px-3 py-1 rounded-full text-sm">{items.length}</span>
                  </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content - Remove top padding for Home to allow full bleed hero */}
      <main id="main-content" className={`flex-grow relative min-h-[calc(100vh-400px)] ${isHome ? '' : 'pt-24'}`} role="main" tabIndex={-1}>
        {children}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a 
          href="https://wa.me/919037874080" 
          target="_blank" 
          rel="noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} fill="white" />
          <span className="absolute right-full mr-3 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-sans">
            Chat with Expert
          </span>
        </a>
        <Link 
          to="/technical"
          className="bg-white border border-gray-200 text-emphz-navy p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative"
          aria-label="Technical Specs"
        >
          <FileText size={24} />
           <span className="absolute right-full mr-3 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-sans">
            Datasheets
          </span>
        </Link>
      </div>

      <LiveChatWidget />

      {/* Footer - Immersive Midnight Slate */}
      <footer className="bg-emphz-navy text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden" role="contentinfo">
        {/* Background Abstract */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-emphz-orange rounded-full blur-[150px] animate-float" style={{ animationDuration: '10s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-8">
                <Link to="/" aria-label="Emphz Home">
                  <Logo className="h-12 w-auto" variant="light" />
                </Link>
              </div>
              <h3 className="text-3xl font-display font-bold mb-6 leading-tight max-w-md">
                Replace steel. <br/>
                <span className="text-gray-500">Ignore corrosion.</span><br/>
                Build for the future.
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-8 font-sans">
                Manufacturing India's most durable GRP infrastructure solutions. From Mysore's precision molding to Kerala's coastal resilience.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emphz-orange uppercase tracking-widest mb-8 font-display">Products</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-emphz-orange"/> Enclosures</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-emphz-orange"/> Modular Kiosks</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-emphz-orange"/> Security Cabins</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors flex items-center group"><ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-emphz-orange"/> Resort Villas</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-emphz-orange uppercase tracking-widest mb-8 font-display">Connect</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li className="flex items-start group">
                  <MapPin size={16} className="mr-3 mt-0.5 text-emphz-navy bg-white rounded-full p-0.5 group-hover:scale-110 transition-transform" />
                  <span>Mysore Factory <br/><span className="text-xs opacity-50">KIADB Industrial Area</span></span>
                </li>
                <li className="flex items-start group">
                  <MapPin size={16} className="mr-3 mt-0.5 text-emphz-orange bg-white rounded-full p-0.5 group-hover:scale-110 transition-transform" />
                  <span>Kerala Ops <br/><span className="text-xs opacity-50">Vadakara HQ</span></span>
                </li>
                <li className="flex items-center"><Phone size={16} className="mr-3" /> +91 9037 874 080</li>
                <li className="flex items-center"><Mail size={16} className="mr-3" /> info@emphz.in</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-sans">
            <p>&copy; 2025 Emphz Engineering Pvt Ltd. Precision Molded in India.</p>
            <div className="flex space-x-8 mt-4 md:mt-0 font-bold uppercase tracking-wider">
              <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">Legal</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;