import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'agent';
  text: string;
}

const LiveChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'agent', text: "Thanks for reaching out! I'm Priya, a GRP specialist. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: ChatMessage = { sender: 'agent', text: "That's a great question. Let me check the technical specifications for you. One moment..." };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-emphz-orange text-white w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group animate-fade-up"
          aria-label="Open live chat"
        >
          <MessageSquare size={32} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] flex flex-col bg-emphz-dark rounded-2xl shadow-2xl border border-white/10 animate-slide-up-fade"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-heading"
        >
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0 bg-emphz-navy/50 rounded-t-2xl">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emphz-beige flex items-center justify-center">
                   <User className="text-emphz-navy" size={20}/>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-emphz-dark"></span>
              </div>
              <div className="ml-3">
                <h2 id="chat-heading" className="font-bold text-white">Priya S.</h2>
                <p className="text-xs text-gray-400">GRP Specialist | Emphz</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'agent' && <div className="w-6 h-6 rounded-full bg-emphz-beige flex-shrink-0"></div>}
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-emphz-orange text-white rounded-br-none'
                    : 'bg-emphz-slate text-white rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                 <div className="w-6 h-6 rounded-full bg-emphz-beige flex-shrink-0"></div>
                 <div className="p-3 bg-emphz-slate rounded-2xl rounded-bl-none">
                    <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></span>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex-shrink-0">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="w-full bg-black/40 border border-white/10 rounded-full pl-4 pr-12 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-emphz-orange focus:border-emphz-orange outline-none text-sm"
                aria-label="Your message"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emphz-orange text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50 disabled:scale-100"
                disabled={!inputValue.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;