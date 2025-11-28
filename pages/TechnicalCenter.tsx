import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Loader2, BookOpen, PenTool, FileText, Download, ChevronRight, Terminal } from 'lucide-react';
import { askTechnicalAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';
import GatedDownloadModal from '../components/GatedDownloadModal';

const TechnicalCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I am the Emphz Technical Assistant. Ask me about GRP material properties, IP ratings, or installation suitability for your specific industry." }
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
      <div className="bg-slate-900 min-h-screen">
        <div className="bg-emphz-navy text-white py-16 relative overflow-hidden border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl font-bold mb-4 font-display">Technical Knowledge Center</h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm">
              // Access engineering resources, white papers, and AI consultant.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - File Explorer Style */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700 overflow-hidden">
              <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between">
                 <h3 className="font-bold text-white text-sm font-mono uppercase tracking-wider">/root/downloads</h3>
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div className="divide-y divide-slate-700/50">
                {downloadCategories.map((cat, i) => (
                  <button key={i} onClick={() => handleDownloadClick({ title: cat.title, type: cat.type })} className="w-full text-left p-4 hover:bg-slate-700 cursor-pointer group transition-colors focus:outline-none focus:bg-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-slate-400 mr-3 group-hover:text-emphz-orange transition-colors">
                          {cat.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-200 text-sm group-hover:text-white font-mono">{cat.title}</h4>
                          <span className="text-[10px] text-gray-500 font-mono">dir • {cat.count} files</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-emphz-orange" aria-hidden="true" />
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-900/50 border-t border-slate-700 text-right">
                <button onClick={() => handleDownloadClick({ title: 'Full Document Library', type: 'ZIP' })} className="text-[10px] font-bold text-emphz-orange hover:text-white hover:underline font-mono uppercase tracking-wide">
                  Download All (.zip)
                </button>
              </div>
            </div>

            <div className="bg-emphz-orange/10 border border-emphz-orange/20 rounded-lg p-6">
               <h3 className="font-bold text-emphz-orange mb-2 font-mono text-sm uppercase">&gt; CAD Request</h3>
               <p className="text-xs text-gray-400 mb-4 font-mono">Access restricted DWG/STEP files for integration.</p>
               <button onClick={() => handleDownloadClick({ title: 'CAD Library Access Request', type: 'CAD' })} className="w-full bg-emphz-orange/20 border border-emphz-orange text-emphz-orange py-2 rounded text-xs font-bold hover:bg-emphz-orange hover:text-white transition-colors font-mono uppercase tracking-wider">
                 Initialize Request
               </button>
            </div>
          </div>

          {/* Main Terminal Window */}
          <div className="lg:col-span-8">
            <div className="bg-black rounded-lg shadow-2xl border border-slate-700 flex flex-col h-[600px] overflow-hidden font-mono">
              {/* Terminal Header */}
              <div className="bg-slate-800 p-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center space-x-2">
                   <div className="flex space-x-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   </div>
                   <div className="ml-4 text-xs text-gray-400 flex items-center">
                     <Terminal size={12} className="mr-2" />
                     emphz-assistant@gemini-2.5:~
                   </div>
                </div>
                <div className="text-[10px] font-bold text-green-500 tracking-wider animate-pulse">ONLINE</div>
              </div>

              <div 
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-black text-sm" 
                role="log" 
                aria-live="polite"
                aria-label="Chat History"
                tabIndex={0}
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'text-right' 
                        : 'text-left'
                    }`}>
                      <span className={`text-[10px] uppercase font-bold mb-1 block ${msg.role === 'user' ? 'text-emphz-orange' : 'text-green-500'}`}>
                        {msg.role === 'user' ? 'USER' : 'SYSTEM'}
                      </span>
                      <div className={`inline-block p-4 rounded-md text-xs leading-relaxed border ${
                         msg.role === 'user'
                         ? 'bg-emphz-orange/10 border-emphz-orange/30 text-gray-200'
                         : 'bg-slate-900 border-slate-700 text-gray-300'
                      }`}>
                         {msg.role === 'model' ? (
                          <div dangerouslySetInnerHTML={{ 
                            __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b class="text-white">$1</b>') 
                          }} />
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
                        <span className="text-[10px] uppercase font-bold mb-1 block text-green-500">SYSTEM</span>
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-md flex items-center text-green-500 text-xs">
                           <Loader2 className="animate-spin h-3 w-3 mr-2" />
                           Processing query...
                        </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-700">
                <div className="relative flex items-center">
                  <span className="text-green-500 font-bold mr-2 text-sm">$</span>
                  <input
                    id="chat-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter command or query..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-600 outline-none text-sm h-10"
                    autoComplete="off"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    aria-label="Execute"
                    className="text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
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