import React, { useState, useEffect, useRef } from 'react';
import { Download, X, Loader2, Building, User, Mail } from 'lucide-react';

interface GatedDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileToDownload: { title: string; type: string } | null;
}

const GatedDownloadModal: React.FC<GatedDownloadModalProps> = ({ isOpen, onClose, fileToDownload }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      firstInputRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for lead capture
    console.log('--- LEAD CAPTURED (Gated Download) ---');
    console.log('User:', formData);
    console.log('Downloaded:', fileToDownload?.title);
    console.log('------------------------------------');

    setTimeout(() => {
      // Simulate download trigger
      alert(`Thank you! Your download for "${fileToDownload?.title}" is starting.`);
      
      // In a real app, you would trigger the download here, e.g.:
      // window.location.href = fileToDownload.url;
      
      setIsSubmitting(false);
      onClose();
      setFormData({ name: '', company: '', email: '' });
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div className="bg-emphz-dark rounded-2xl border border-white/10 shadow-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="mx-auto bg-emphz-teal/10 w-16 h-16 rounded-full flex items-center justify-center border-4 border-emphz-teal/20">
               <Download className="w-8 h-8 text-emphz-teal" />
            </div>
            <h2 id="download-modal-title" className="text-2xl font-bold text-white mt-4">Unlock Your Download</h2>
            <p className="text-gray-400 text-sm mt-1">
              Provide your details to access: <br/>
              <span className="font-bold text-emphz-beige">{fileToDownload?.title}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                ref={firstInputRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emphz-teal focus:border-emphz-teal outline-none"
              />
            </div>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emphz-teal focus:border-emphz-teal outline-none"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Business Email"
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emphz-teal focus:border-emphz-teal outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-emphz-navy font-black py-4 rounded-lg hover:bg-emphz-teal hover:text-white transition-all shadow-lg text-sm uppercase tracking-wide flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Processing...
                </>
              ) : (
                'SUBMIT & DOWNLOAD'
              )}
            </button>
            <p className="text-[10px] text-gray-600 text-center pt-2">
              By submitting, you agree to receive occasional marketing updates from Emphz.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GatedDownloadModal;