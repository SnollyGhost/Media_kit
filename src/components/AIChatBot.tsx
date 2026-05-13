import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { NAFYAD_INFO, CREATOR_NAME } from '../lib/data';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Ask me about Nafyad’s work, content strategy, services, or how to build a sharper tech brand." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show greeting bubble after 3 seconds if not open
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowGreeting(false);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ 
            role: m.role, 
            parts: [{ text: m.content }] 
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: `You are Nafyad AI, a high-performance digital strategist for Nafyad's brand. Your goal is to provide extreme utility with minimum words.

CORE DIRECTIVES:
- MAXIMUM CONCISENESS: Never use 10 words when 5 will do.
- NO FILLER: No "I'd be happy to help," "In summary," or "Let me know if you need more."
- TECHNICAL PRECISION: Sound like a senior engineer or elite strategist.decisive, sharp, and factual.
- RESPONSE LIMIT: Most answers should be 1-3 short sentences. 

VOICE & TONE:
- Elite Operator: High signal, zero noise.
- Decisive: No "maybe" or "generally."
- Plain Text Only: No asterisks (*), bolding, or markdown formatting.

NAFYAD'S POSITIONING:
Software engineer and content strategist at the intersection of AI, Space Tech, and high-retention cinematic storytelling.

SERVICES:
1. Short-Form Strategy: Distribution-first thinking.
2. Full-Cycle Production: Research to optimization.
3. Growth Systems: Retention-led conversion.

Context about Nafyad:
${NAFYAD_INFO}

SITE METRICS:
200K+ Followers across social media | 430+ Contents Produced.

INQUIRY LOGIC:
Direct partners to the "Secure Inbound" form on the site for partnerships.`,
          temperature: 0.4,
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process that. Can you try again?";
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "AI is briefly offline for maintenance. Direct inquiries are still active." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const QUICK_REPLIES = [
    "What services do you offer?",
    "How to partner with you?",
    "Tell me about NafTech",
  ];

  return (
    <>
      {/* Greeting Bubble */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 bg-brand-purple text-white px-4 py-2 rounded-2xl rounded-br-none shadow-xl text-xs font-medium cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            How can I help you?
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        id="ai-bot-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-purple rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X className="text-white w-6 h-6" />
        ) : (
          <MessageSquare className="text-white w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/40">
                  <Bot className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-widest">{CREATOR_NAME} AI</div>
                  <div className="text-[10px] text-brand-purple font-medium">Online & Ready</div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
                id="close-chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
            >
              {messages.map((m, idx) => (
                <div 
                  key={idx}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    m.role === 'user' 
                      ? 'bg-brand-purple text-white rounded-tr-none' 
                      : 'bg-white/5 text-white/80 border border-white/10 rounded-tl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 text-brand-purple animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    className="text-[10px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/50 hover:text-white hover:border-white/30 transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <div className="relative">
                <input 
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-3 pr-12 text-sm text-white focus:outline-none focus:border-brand-purple transition-colors"
                />
                <button 
                  id="send-message"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
