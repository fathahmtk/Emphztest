import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BookOpen, PenTool, FileText, Download, ChevronRight, Terminal, Cpu } from 'lucide-react';
import { askTechnicalAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';
import GatedDownloadModal from '../components/GatedDownloadModal';

// Typewriter Effect Component for added realism
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= text.length) {
          clearInterval(intervalId);
          return prev;
        }
        const nextChar = text.charAt(index);
        index++;
        return prev + nextChar;
      });
    }, 15); // Speed of typing
    
    return () => clearInterval(intervalId);
  }, [text]);

  return <span dangerouslySetInnerHTML={{ 
    __html: displayedText.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b class="text-white">$1</b>') 
  }} />;
};

const TechnicalCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "System initialized. Emphz Technical Assistant v2.5 online. \nQuery database for material specs, IP ratings, or installation guidelines." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [fileToDownload, setFileToDownload] = useState<{ title: string; type: string } | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askTechnicalAssistant(input);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleDownloadClick = (file: { title: string; type: string }) => {
    setFileToDownload(file);
    setIsDownloadModalOpen(true);
  };

  const downloadCategories = [
    { title: 'Product Datasheets', count: 12, icon: <FileText className="w-5 h-5"/>, type: 'PDF' },
    { title: 'Brochures & Flyers', count: 4, icon: <BookOpen className="w-5 h-5"/>, type: 'PDF' },
    { title: 'Installation Manuals', count: 8, icon: <PenTool className="w-5 h-5"/>, type: 'PDF' },
    { title: 'Certifications (ISO/IP)', count: 3, icon: <Download className="w-5 h-5"/>, type: 'ZIP' },
  ];

  return (
    <>
      <div className="bg-[#050A14] min-h-screen text-gray-300">
        <style>{`
          .scanline {
            width: 100%;
            height: 100px;
            z-index: 10;
            background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0, 173, 181, 0.05) 50%, rgba(0,0,0,0) 100%);
            opacity: 0.1;
            position: absolute;
            bottom: 100%;
            animation: scanline 10s linear infinite;
            pointer-events: none;
          }
          @keyframes scanline {
            0% { bottom: 100%; }
            100% { bottom: -100%; }
          }
          .crt-flicker {
            animation: flicker 0.15s infinite;
          }
          @keyframes flicker {
            0% { opacity: 0.97; }
            50% { opacity: 1; }
            100% { opacity: 0.98; }
          }
        `}</style>

        <div className="bg-emphz-navy py-16 relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10">
               <Cpu className="text-emphz-orange animate-pulse" size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 font-display text-white tracking-tight">TECHNICAL KNOWLEDGE CORE</h1>
            <p className="text-emphz-orange max-w-2xl mx-auto font-mono text-sm tracking-wide">
              // ENGINEERING_RESOURCES // AI_CONSULTANT // DATASHEETS
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - File Explorer Style */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0B1120] rounded-lg shadow-2xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between">
                 <h3 className="font-bold text-gray-400 text-xs font-mono uppercase tracking-widest">/ROOT/DOWNLOADS</h3>
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
              </div>
              <div className="divide-y divide-gray-800/50">
                {downloadCategories.map((cat, i) => (
                  <button key={i} onClick={() => handleDownloadClick({ title: cat.title, type: cat.type })} className="w-full text-left p-4 hover:bg-white/5 cursor-pointer group transition-colors focus:outline-none border-l-2 border-transparent hover:border-emphz-orange">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-gray-600 mr-3 group-hover:text-emphz-orange transition-colors">
                          {cat.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-300 text-sm group-hover:text-white font-mono">{cat.title}</h4>
                          <span className="text-[10px] text-gray-600 font-mono group-hover:text-gray-500 transition-colors">DIR • {cat.count} FILES</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-700 group-hover:text-emphz-orange" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-black/20 border-t border-gray-800 text-right">
                <button onClick={() => handleDownloadClick({ title: 'Full Document Library', type: 'ZIP' })} className="text-[10px] font-bold text-emphz-orange hover:text-white hover:underline font-mono uppercase tracking-wide">
                  DOWNLOAD_ALL_ASSETS.ZIP
                </button>
              </div>
            </div>

            <div className="bg-emphz-orange/5 border border-emphz-orange/20 rounded-lg p-6 relative overflow-hidden group">
               <div className="absolute -right-4 -top-4 w-16 h-16 bg-emphz-orange/20 rounded-full blur-xl group-hover:bg-emphz-orange/30 transition-colors"></div>
               <h3 className="font-bold text-emphz-orange mb-2 font-mono text-sm uppercase flex items-center gap-2">
                 <Terminal size={14}/> CAD Request
               </h3>
               <p className="text-xs text-gray-400 mb-4 font-mono leading-relaxed">
                 Access restricted manufacturing files (DWG/STEP) for architectural integration.
               </p>
               <button onClick={() => handleDownloadClick({ title: 'CAD Library Access Request', type: 'CAD' })} className="w-full bg-emphz-orange/10 border border-emphz-orange/50 text-emphz-orange py-2 rounded text-xs font-bold hover:bg-emphz-orange hover:text-white transition-all font-mono uppercase tracking-wider shadow-[0_0_15px_rgba(0,173,181,0.15)] hover:shadow-[0_0_20px_rgba(0,173,181,0.4)]">
                 Initialize_Request()
               </button>
            </div>
          </div>

          {/* Main Terminal Window */}
          <div className="lg:col-span-8">
            <div className="bg-black rounded-lg shadow-2xl border border-gray-800 flex flex-col h-[650px] overflow-hidden font-mono relative">
              {/* CRT Overlay Effects */}
              <div className="scanline"></div>
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(0,173,181,0.03)_0%,rgba(0,0,0,0.2)_100%)]"></div>

              {/* Terminal Header */}
              <div className="bg-gray-900 p-3 flex items-center justify-between border-b border-gray-800 relative z-20">
                <div className="flex items-center space-x-2">
                   <div className="flex space-x-1.5 opacity-50 grayscale hover:grayscale-0 transition-all">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="ml-4 text-xs text-gray-500 flex items-center font-bold tracking-wider">
                     <Terminal size={12} className="mr-2 text-emphz-orange" />
                     EMPHZ-AI@GEMINI-NODE-2.5:~
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] text-gray-600 font-bold">LATENCY: 12ms</span>
                   <div className="text-[10px] font-bold text-green-500 tracking-wider animate-pulse bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">ONLINE</div>
                </div>
              </div>

              <div 
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-black text-sm relative z-10 crt-flicker scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent" 
                role="log" 
                aria-live="polite"
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'text-right' 
                        : 'text-left'
                    }`}>
                      <span className={`text-[10px] uppercase font-bold mb-1 block tracking-widest ${msg.role === 'user' ? 'text-emphz-orange' : 'text-green-500'}`}>
                        {msg.role === 'user' ? 'USER_INPUT' : 'SYSTEM_RESPONSE'}
                      </span>
                      <div className={`inline-block p-4 rounded-lg text-xs leading-relaxed border shadow-lg ${
                         msg.role === 'user'
                         ? 'bg-emphz-orange/5 border-emphz-orange/30 text-gray-300'
                         : 'bg-gray-900/80 border-gray-700 text-green-400 font-medium'
                      }`}>
                         {msg.role === 'model' && idx > 0 ? (
                           <TypewriterText text={msg.text} />
                         ) : (
                           msg.text
                         )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div>
                        <span className="text-[10px] uppercase font-bold mb-1 block text-green-500 tracking-widest">SYSTEM</span>
                        <div className="bg-gray-900 border border-gray-800 p-3 rounded-md flex items-center text-green-500 text-xs shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                           <Loader2 className="animate-spin h-3 w-3 mr-2" />
                           <span className="animate-pulse">PROCESSING_QUERY...</span>
                        </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-gray-900 border-t border-gray-800 relative z-20">
                <div className="relative flex items-center bg-black border border-gray-700 rounded-md px-3 py-1 focus-within:border-emphz-orange focus-within:shadow-[0_0_10px_rgba(0,173,181,0.2)] transition-all">
                  <span className="text-green-500 font-bold mr-2 text-sm animate-pulse">$</span>
                  <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter command or query (e.g., 'What is the fire rating of GRP?')"
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 outline-none text-sm h-10 font-mono"
                    autoComplete="off"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    aria-label="Execute"
                    className="text-gray-500 hover:text-emphz-orange disabled:opacity-30 transition-colors p-2"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between text-[10px] text-gray-600 font-mono uppercase">
               <span>Secure_Connection: TLS 1.3</span>
               <span>Emphz Engineering Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>
      <GatedDownloadModal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        fileToDownload={fileToDownload}
      />
    </>
  );
};

export default TechnicalCenter;
