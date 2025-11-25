import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send, Loader2, BookOpen, PenTool, FileText, Download, ChevronRight } from 'lucide-react';
import { askTechnicalAssistant } from '../services/geminiService';
import { ChatMessage } from '../types';

const TechnicalCenter: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I am the Emphz Technical Assistant. Ask me about GRP material properties, IP ratings, or installation suitability for your specific industry." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const downloadCategories = [
    { title: 'Product Datasheets', count: 12, icon: <FileText className="w-5 h-5 text-blue-600"/> },
    { title: 'Brochures & Flyers', count: 4, icon: <BookOpen className="w-5 h-5 text-purple-600"/> },
    { title: 'Installation Manuals', count: 8, icon: <PenTool className="w-5 h-5 text-green-600"/> },
    { title: 'Certifications (ISO/IP)', count: 3, icon: <Download className="w-5 h-5 text-orange-600"/> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-emphz-navy text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl font-bold mb-4">Technical Knowledge Center</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Access detailed engineering resources, white papers, and consult with our AI Technical Specialist.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Downloads Library */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
               <h3 className="font-bold text-emphz-navy text-lg">Downloads Library</h3>
               <p className="text-xs text-gray-600">Updated: Oct 2025</p>
            </div>
            <div className="divide-y divide-gray-100">
              {downloadCategories.map((cat, i) => (
                <button key={i} className="w-full text-left p-4 hover:bg-gray-50 cursor-pointer group transition-colors focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-emphz-orange">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded-lg mr-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                        {cat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm group-hover:text-emphz-orange">{cat.title}</h4>
                        <span className="text-xs text-gray-600">{cat.count} Files</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-emphz-orange" aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 bg-emphz-beige/20">
              <button className="w-full text-center text-xs font-bold text-emphz-navy hover:underline focus:outline-none focus:text-emphz-orange focus:ring-2 focus:ring-emphz-navy rounded px-2 py-1">
                View All 27 Documents
              </button>
            </div>
          </div>

          <div className="bg-emphz-navy text-white rounded-xl shadow-lg p-6">
             <h3 className="font-bold mb-2">Need CAD Drawings?</h3>
             <p className="text-xs text-gray-400 mb-4">Access our comprehensive library of DWG/STEP files for all enclosure sizes.</p>
             <button className="w-full bg-emphz-orange py-2 rounded text-sm font-bold hover:bg-red-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-emphz-orange">
               Request Engineer Access
             </button>
          </div>
        </div>

        {/* Right: AI Chat Interface */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col h-[600px] overflow-hidden">
            <div className="bg-gradient-to-r from-emphz-navy to-gray-900 p-4 flex items-center justify-between">
              <div className="flex items-center text-white">
                 <div className="bg-white/10 p-2 rounded-lg mr-3">
                   <Cpu className="w-5 h-5 text-emphz-orange" aria-hidden="true" />
                 </div>
                 <div>
                   <h2 className="font-bold text-sm">Emphz AI Technical Consultant</h2>
                   <p className="text-[10px] text-gray-400">Powered by Gemini 2.5 Flash</p>
                 </div>
              </div>
              <div className="text-[10px] font-bold text-emphz-navy bg-emphz-beige px-2 py-1 rounded shadow-sm">BETA</div>
            </div>

            {/* Chat Window - focusable for keyboard scrolling */}
            <div 
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 focus:ring-2 focus:ring-inset focus:ring-emphz-orange focus:outline-none" 
              role="log" 
              aria-live="polite"
              aria-label="Chat History"
              tabIndex={0}
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-emphz-navy text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}>
                    {msg.role === 'model' ? (
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ 
                        __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') 
                      }} />
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-4 rounded-xl rounded-bl-none shadow-sm flex items-center">
                     <Loader2 className="animate-spin h-4 w-4 text-emphz-orange mr-2" aria-hidden="true" />
                     <span className="text-xs text-gray-500">Analyzing engineering data...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="relative">
                <label htmlFor="chat-input" className="sr-only">Ask technical question</label>
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about chemical resistance, fire ratings, or dimensions..."
                  className="w-full pl-4 pr-14 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emphz-orange focus:border-transparent outline-none transition-all text-sm placeholder-gray-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send Message"
                  className="absolute right-2 top-2 bottom-2 bg-emphz-navy text-white px-4 rounded-lg hover:bg-emphz-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center focus:ring-2 focus:ring-offset-1 focus:ring-emphz-navy"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </div>
              <p className="text-center text-[10px] text-gray-600 mt-2">AI responses are for guidance. Refer to official datasheets for critical specs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalCenter;