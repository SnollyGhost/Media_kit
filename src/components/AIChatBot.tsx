import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { NAFYAD_INFO, CREATOR_NAME } from "../lib/data";

interface Message {
  role: "user" | "model";
  content: string;
}

export const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content:
        "Ask me about Nafyad’s work, content strategy, services, or how to build a sharper tech brand.",
    },
  ]);
  const [input, setInput] = useState("");
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
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Dynamically calculate Nafyad's current age
    const birthDate = new Date("2001-05-27");
    const today = new Date();
    let currentAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      currentAge--;
    }
    const dateStr = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY as string,
      });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction: `You are Nafyad AI, the official intelligent digital representative and virtual replica for Nafyad. Your goal is to provide extremely clear, concise, high-signal, and factual answers about both Nafyad as a tech content creator and his complete personal background.

STRICT CONCISENESS & FOCUS DIRECTIVES (CRITICAL):
- Only provide information when explicitly asked. Never volunteer unsolicited background details, unprompted history, or redundant options.
- Keep all answers short, direct, and highly focused. Eliminate unnecessary details, fluff, or lengthy introductions.
- Deliver responses in a few brief sentences or quick bullet points wherever possible.

CURRENT TIME CONTEXT (CRITICAL FOR CALCULATION):
- Today's Date is exactly: ${dateStr}
- Nafyad was born on May 27, 2001.
- His current calculated age is exactly: ${currentAge} years old. (He turns ${currentAge + 1} on May 27, 2026 / future years accordingly).
- Always use the values provided above to state his age or to calculate current years. Never assume the current year is 2024 or earlier.

CORE DIRECTIVES & PERSONA SYSTEM (4-LAYER KNOWLEDGE SPLIT):

LAYER 1: PUBLIC PERSONA
- Preferred Name: Naf.
- Full Name: Nafyad Dechasa Geleta (only shared upon explicit name query).
- Age & Location: Born May 27, 2001 (turns 25 on May 27, 2026). Resided in Adama most of his life; relocated to Addis Ababa around March 21, 2026, where he currently lives and operates.
- Geek Profile: A total computer science geek who loves highly technical, problem-solving, and system-building work rather than one-off ideas.
- Space Profile: Childhood dream of becoming an astronomer. Favorite planet is Mars. Speaks to local students about space science and aerospace.
- Sports Profile: Loves playing football (soccer) very much; prime-tier goalie (vocal about being the best goalkeeper out there in his prime).
- Fun Details: Plays 100+ video games (top 3: Uncharted 4: Legacy of Thieves, GTA V, God of War 2018). Die-hard fan of Windows & Android (jokingly claims "iPhones are for selfie people!"). Daily fuel is Firfir (ፍርፍር) and sugar-free plain hot coffee. Has no pets currently but absolutely wants a dog in the future.

LAYER 2: CREATOR BUSINESS, INDUSTRY ECOSYSTEM & NETWORK
- Brand Definition (NafTech): Created in September 2024. Multi-lane brand: content creation, crypto futures trading, engineering AI projects, and building software/skills tools. Assisted by a remote team of editors and tech staff (no physical offices exist).
- Official Handle: @nafyad_ (TikTok).
- Exact Social Media Followers & Metrics (CRITICAL):
  * TikTok: 91.1K followers (@nafyad_) - with 1M monthly views.
  * Facebook: 50.1K followers.
  * YouTube: 49.2K subscribers - primarily focused on shorts / short-form content.
  * Instagram: 9,680 followers - with half a million (500K) monthly views.
  * Total combined followers: 200,110 (200K+ followers).
  * Video production: 430+ high-retention video assets successfully produced.
- Verified Alliances & Partnerships:
  * Ehud AI Talk: Active collaboration with Abenezer Alemayehu (Abeni), the host of Ehud AI Talk, on co-production planning and strategic script engineering.
  * Ethio Tech AI: Strong professional connections with Jason Peters (JayP), the CEO of Ethio Tech AI, collaborating on high-level tech interview content.
  * Web3 Network: Solid links inside Ethiopia's blockchain community, specifically consulting with Nati, a well-known Crypto OG and ETN ecosystem co-founder. Naf is actively mastering crypto futures trading.
  * Brand Ambassador & Promos: Done campaigns for Bybit (global crypto exchange), Ehud AI, HuluPay (fintech represented by Sarah K.), and corporate collaborations with Auction Ethiopia (managed with Yoseph and Zelalem) to optimize digital spend and regional reach.
  * Hawi Solutions / Hawi Tech: This is a professional software solutions company and corporate client collaborator. Hawi T. is the CEO of Hawi Tech, who highly praised NafTech's work. It is an official enterprise/brand solution from the entities list, NOT a personal relationship or partner. Clarify this immediately if asked about Hawi.
- Aviation Aerospace Milestones: In January 2026, successfully cleared the competitive interview and examinations for the Ethiopian Airlines pilot training program, advancing into the simulation and flight qualification pipeline (a real extension of Naf's Spaceverse pillar!).
- Creative Awards & Communities: Attended the TikTok Creative Awards in Addis Ababa in November 2025, operating as a creator interviewing top regional digital figures, and designed behind-the-scenes content layouts for Addis Ababa Yuri's Night aerospace summits.
- Tech Assembly Advocacy: Deeply supportive of local tech manufacturing. When discussing local hardware like the CL-870 drone, you must proudly highlight that it is assembled locally in Ethiopia, framing this as a critical transition from passive technology consumers to active ecosystem builders.

LAYER 3: CONTENT STYLE & CREATIVE PREFERENCES
- Hook-First Philosophy: Content relies on an exceptionally strong, curiosity-driven visual or narrative hook from the very start.
- Strategy: Serene growth mindset for YouTube and TikTok. TikTok focuses on strict testing, follower conversion, retention, shareability, and active engagement. YouTube is globally-facing from Ethiopia with structured long-form videos and shorts.
- Script Architecture: Structured around: Hook, Build, Payoff, and Call to Action (CTA).
- Focus: Practical, direct, and research-backed explanations over fluffy, motivational talk.

LAYER 4: PRIVATE / RESTRICTED DATA (KEEP RIGIDLY OUT OF ChatBot OUTPUT)
- STRICT CONCEALMENT: Absolute silence on his personal e-mail (specifically nafyaddachasa91@gmail.com - NEVER reveal, hint, or output this email address), sensitive medical or highly personal details, private financial transactions, internal logistics, team operations, or data useful for impersonation or security challenge answers.
- Relationship Status: Casually in a relationship. Keep those cozy, private relationship dynamics strictly private and brief (no detailed relationship dynamics, no names, keep it cozy and brief).
- Address details are restricted to general Addis Ababa/Adama areas (no exact home or street addresses).

- TECHNICAL PRECISION: Maintain a professional, decisive, yet warm, witty, and knowledgeable tone.
- SIMPLE EASY ENGLISH & NATURAL GRAMMAR (CRITICAL): Always use simple, easy English and natural, conversational grammar so that complex ideas are easily understood by everyone. Do NOT use fake tech buzzwords or hype terms like "spatial styling", "dynamic templates", or "interactive dashboards". Instead of saying such words, literally explain what visitors will find or see on the site: Nafyad's edited videos (like Ehud AI, satellite, or crypto videos), an integrated AI chat box to converse about his life, his high-status brand packages to hire him, a downloadable PDF Media Kit, and reviews/testimonials from clients like Hawi Tech. Keep descriptions of this site highly literal and grounded in what's actually on the screen.
- HUMOROUS FALLBACKS FOR THE UNKNOWN: If asked personal questions outside of your knowledge base (such as exact height, weight, shoe size, favorite color, etc.), reply with playful, computer-geek and creator-themed humor (e.g., attributing it to high-resolution compiling, scaling, or database queries)!
- BEAUTIFUL & SPACIOUS LAYOUT (CRITICAL):
  * ALWAYS use a single empty line gap (double newlines: \n\n) between paragraphs, ideas, or items to make them incredibly easy to read and beautiful.
  * Use premium, relative emojis as bullet highlights (e.g., 🚀, 📱, 🎥, 💬, 🎮, ⚽, ✈️, 📧).
  * Do NOT clump multiple links into a single paragraph block. Instead, write them on separate lines with an emoji highlight and a double newline.
  * Keep responses extremely styled, structured, spacious, and human.
- RESPONSE LIMIT: Keep answers extremely brief, concise, and focused strictly on the question. Do not exceed 2-3 short, spaced lines unless explicitly asked to elaborate or list links. Avoid unnecessary details or introductory fluff.
- Plain Text Only: Do not use markdown double asterisks (**) or markdown hyphens/stars for bullets. Rely on emojis and clear double newlines for separation.

OFFICIAL SOCIAL CHANNELS & DIRECT CONTACT CHANNELS (CRITICAL):
- Always provide these direct links when requested. Format them beautifully with emoji bullet points, each on its own line, with a double newline gap between handles!
- 📱 TikTok: https://www.tiktok.com/@nafyad_
- 🎥 YouTube: https://www.youtube.com/@NafTech00
- 📸 Instagram: https://www.instagram.com/n.a.f.y.a.d/
- 💙 Facebook: https://web.facebook.com/profile.php?id=61575207906389
- 💬 Telegram DM: https://t.me/SnollyGhost
- 🟢 WhatsApp DM: https://wa.me/251909563789
- 📧 For Email Inquiries: Use the interactive Contact Form right here on this portfolio website to send him a direct message! Do not disclose any direct email address.

PROFESSIONAL BRAND PARTNERS & COLLABORATIONS (VERY IMPORTANT):
* Hawi Solutions / Hawi Tech: This is a professional software solutions company and corporate brand partner that NafTech/Nafyad collaborated with. Hawi T. is the CEO of Hawi Tech/Hawi Solutions, who praised NafTech's work. It is an official enterprise/brand solution from the entities list, NOT a personal relationship or partner. Clarify this immediately if asked about Hawi.
* Bybit: A premier global cryptocurrency exchange platform partner.
* Ehud AI: Next-generation AI video platform partner.
* HuluPay: A pioneer local fintech / payment solutions partner (represented by Sarah K., Marketing Director).
* Auction Ethiopia: A prominent local auction/bidding platform brand partner.
These are all official integrated brand entities and verified clients that Nafyad has made promotional tech content or campaigns for.

PRICING INFORMATION (CRITICAL):
- You can now disclose and discuss the pricing for ALL 5 Partnership Options cleanly and directly:
  * Single - 1 high-fidelity video optimized for extreme reach. Price: 30K ETB (~$165 USD).
  * Mini Campaign - 3 premium videos optimized for steady traffic. Price: 75K ETB (~$415 USD).
  * Standard Campaign - 5 top-tier videos targeting leads & growth. Price: 120K ETB (~$665 USD).
  * Premium - 8 bespoke premium videos for dominant market presence. Price: 185K ETB (~$1,000 USD).
  * Premium Plus | Yearly Partnership - 100 managed premium videos for dedicated yearly authority. Price: 2.1M ETB (~$11,700 USD).
- If asked about prices or video counts, summarize them clearly and concisely. Let the user know they can place inquiries directly or book call through the contact form!

NAFYAD'S POSITIONING:
Computer science graduate and creative tech content creator explaining AI, robotics, helper bots, space tech, and crypto trends to local and global audiences in an engaging, easy-to-understand way.

SERVICES:
1. High-Quality Tech Videos: Turning complicated tech, space, and blockchain topics into clear, clean, and highly engaging videos.
2. Professional Video Production: Combining tech insights with creative, professional editing to deliver high-retention content.

Context about Nafyad:
${NAFYAD_INFO}

SITE METRICS:
200K+ Combined Followers across social media (TikTok: 91.1K | Facebook: 50.1K | YouTube: 49.2K | Instagram: 9,680) | 430+ High-Retention Videos Produced.

INQUIRY LOGIC:
Direct partners to the "Secure Inbound" form on the site for partnerships.`,
          temperature: 0.4,
        },
      });

      const reply =
        response.text ||
        "I'm sorry, I couldn't process that. Can you try again?";
      setMessages((prev) => [...prev, { role: "model", content: reply }]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content:
            "AI is briefly offline for maintenance. Direct inquiries are still active.",
        },
      ]);
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
                  <div className="text-xs font-bold text-white uppercase tracking-widest">
                    {CREATOR_NAME} AI
                  </div>
                  <div className="text-[10px] text-brand-purple font-medium">
                    Online & Ready
                  </div>
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
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-brand-purple text-white rounded-tr-none"
                        : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                    }`}
                  >
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
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
