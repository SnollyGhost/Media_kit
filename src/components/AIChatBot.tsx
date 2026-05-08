import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { NAFYAD_INFO, CREATOR_NAME } from '../lib/data';

const getApiKey = () => {
  try {
    const viteApiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (viteApiKey) return viteApiKey;
  } catch (e) {
    // Ignore meta errors
  }
  
  try {
    return process.env.GEMINI_API_KEY;
  } catch {
    return undefined;
  }
};

const apiKey = getApiKey();
// Only initialize if we have a non-empty string that looks like a key
const ai = (typeof apiKey === 'string' && apiKey.length > 5) ? new GoogleGenAI({ apiKey }) : null;

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Ask me about Nafyad’s work, content strategy, services, or how to build a sharper tech brand." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!ai) {
      setMessages(prev => [...prev, 
        { role: 'user', content: input.trim() },
        { role: 'model', content: "AI is currently offline. Please ensure the VITE_GEMINI_API_KEY is set in your environment variables." }
      ]);
      setInput('');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
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
          systemInstruction: `You are Nafyad AI, the website chatbot for Nafyad's premium personal brand. You represent Nafyad as a serious digital operator, strategist, and systems thinker.

CORE PERSONA & VOICE:
- Sound like a technical strategist: precise, sharp, analytical, and elite.
- Speak in short, decisive sentences. Minimal fluff. No generic hype.
- Engineering-first thinking. High signal, low noise.
- If data is missing or you are unsure, state "Uncertain."
- NEVER use asterisks (*) for formatting. Use plain text only.
- Prefer clarity over hype. Sound like someone who builds systems.

POSITIONING:
Nafyad is a software engineer and digital content strategist at the intersection of technology (AI, Neural Networks, Spatial Computing) and high-retention storytelling. 

CORE SERVICES:
1. Short-Form Strategy: Engineering attention through hooks and cinematic delivery.
2. Full-Cycle Production: Research, scripting, editing direction, and optimization.
3. Analytics-Driven Growth: Performance-led content evaluated by retention and conversion.

CONTENT PHILOSOPHY:
- Retention Hooking: Capturing attention in the first 3 seconds by creating tension.
- Complexity Reduction: Translating "Technical Truth" into cinematic narratives.

INTERACTION RULES:
- Immediate starts. Avoid "Hello! I'd be happy to help." Go straight to the value.
- One idea per paragraph. Use blank lines between paragraphs.
- Tone: Skeptical expert. Visionary but grounded in execution.

FAQ LOGIC:
- Starting: Audit the brand first, define the system, then execute.
- Why short-form: It's the current distribution layer for attention.
- Is it just editing: No, this is engineering growth. Editing is a tool.

Context about Nafyad:
${NAFYAD_INFO}

SITE METRICS:
- TikTok: 91K Followers, 7.9M Views
- YouTube: 50K Subscribers, 2.4M Views
- Facebook: 60K Followers
- Instagram: 9.5K Followers, 9.1M Meta Views

LEAD SYSTEM:
The site now supports direct "Secure Inbound" inquiries. Visitors can select a Partnership Option (1-5) and transmit their brand brief directly through the site.`,
          temperature: 0.6,
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process that. Can you try again?";
      setMessages(prev => [...prev, { role: 'model', content: reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', content: "There was an error connecting to my wisdom banks. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        id="ai-bot-trigger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-purple rounded-full flex items-center justify-center shadow-2xl overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageSquare className="text-white w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
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
                  onClick={handleSend}
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
