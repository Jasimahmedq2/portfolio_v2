'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { Message } from './ChatMessage';
import ChatSuggestions from './ChatSuggestions';

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi there! 👋 I'm **Jasim Ahmed's AI Assistant**. Ask me anything about Jasim's backend engineering skills, RAG & AI automation projects, work experience, or contact details!",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

// Premium AI Bot Sparkle SVG Icon Component
function BotSparkleIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.5h.01M15.5 10.5h.01"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14.5c.83.67 1.67 1 2.5 1s1.67-.33 2.5-1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M19 3l.8 1.7L21.5 5.5l-1.7.8L19 8l-.8-1.7L16.5 5.5l1.7-.8L19 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading || isTyping) return;

    const userMsg: Message = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const apiMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      const fullReply =
        data.reply ||
        "I'm having a little trouble connecting right now. Feel free to reach Jasim directly at **jasim.dev48@gmail.com**!\n\n[NAVIGATE: Go to Contact Section | #contact]";

      setIsLoading(false);
      setIsTyping(true);

      // Create empty assistant message
      const assistantId = `${Date.now()}-assistant`;
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp,
        },
      ]);

      // Professional, deliberate character-by-character typewriter streaming effect
      let charIdx = 0;

      typingTimerRef.current = setInterval(() => {
        charIdx += 1;
        const currentText = fullReply.slice(0, charIdx);

        setMessages((prev) =>
          prev.map((msg) => (msg.id === assistantId ? { ...msg, content: currentText } : msg))
        );

        if (charIdx >= fullReply.length) {
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
          setIsTyping(false);
        }
      }, 22);
    } catch (error) {
      console.error('Failed to send chat message:', error);
      setIsLoading(false);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content:
            'Connection issue encountered. Feel free to contact Jasim directly at **jasim.dev48@gmail.com**!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleClearChat = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setIsTyping(false);
    setIsLoading(false);
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99] select-none flex flex-col items-end pointer-events-none">
      {/* Expandable Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-[calc(100vw-40px)] sm:w-[400px] h-[540px] max-h-[82vh] bg-[#0a192f]/95 backdrop-blur-xl border border-[#64ffda]/25 rounded-2xl shadow-[0_20px_50px_rgba(2,12,27,0.85)] flex flex-col overflow-hidden mb-4 pointer-events-auto"
          >
            {/* Chat Drawer Header */}
            <header className="px-4 py-3 bg-[#020c1b]/90 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#64ffda]/10 border border-[#64ffda]/40 flex items-center justify-center text-[#64ffda] shadow-[0_0_10px_rgba(100,255,218,0.2)]">
                    <BotSparkleIcon className="w-5 h-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#020c1b]" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-100 leading-none">
                    Jasim AI Assistant
                  </h3>
                  <span className="text-[10px] font-mono text-[#64ffda]">Online • Portfolio AI</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear Conversation"
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#64ffda] text-[11px] font-mono transition-colors cursor-pointer border border-white/5"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs font-mono transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* Chat Messages Scroll Container */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-2 scrollbar-thin scrollbar-thumb-[#64ffda]/20">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

              {/* Thinking Loader Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2.5 my-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#64ffda]/10 border border-[#64ffda]/30 flex items-center justify-center text-[#64ffda] text-xs font-mono font-bold shrink-0">
                    <BotSparkleIcon className="w-4 h-4" />
                  </div>
                  <div className="bg-[#020c1b]/90 border border-[#64ffda]/20 px-3.5 py-2.5 rounded-2xl rounded-tl-none text-xs font-mono text-[#64ffda] flex items-center gap-2 shadow-md">
                    <span>Jasim AI is thinking</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64ffda] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64ffda] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#64ffda] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length < 4 && !isLoading && !isTyping && (
                <ChatSuggestions onSelectSuggestion={(q) => handleSendMessage(q)} />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <footer className="p-3 bg-[#020c1b]/90 border-t border-white/10 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Jasim's skills or projects..."
                  disabled={isLoading || isTyping}
                  className="flex-1 bg-[#0a192f] border border-white/10 focus:border-[#64ffda]/50 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading || isTyping}
                  className="bg-[#64ffda]/10 hover:bg-[#64ffda]/25 text-[#64ffda] border border-[#64ffda]/30 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-3 py-2 text-xs font-mono font-bold transition-all cursor-pointer shrink-0"
                >
                  Send
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Floating Trigger Button (Fixed position, pointer-events-auto) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Jasim AI Assistant"
        className="w-14 h-14 rounded-full bg-[#0a192f] hover:bg-[#020c1b] border-2 border-[#64ffda] text-[#64ffda] shadow-[0_0_20px_rgba(100,255,218,0.35)] hover:shadow-[0_0_28px_rgba(100,255,218,0.55)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative group pointer-events-auto shrink-0"
      >
        <BotSparkleIcon className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12" />
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a192f] animate-pulse shadow-[0_0_8px_#34d399]" />
        )}
      </button>
    </div>
  );
}
export default ChatbotWidget;
