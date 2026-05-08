import React from 'react';
import { motion } from 'motion/react';
import { CREATOR_NAME, NAFYAD_INFO } from '../lib/data';

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 relative z-10">
              <img 
                src="/src/assets/creator.jpg" 
                alt={`${CREATOR_NAME} - Creator & Strategist`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1519389950473-47ba0277781c";
                }}
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            
            <div className="absolute bottom-10 -right-10 glass p-6 rounded-2xl border-white/10 z-20 hidden md:block">
               <div className="text-[10px] font-bold text-brand-purple uppercase tracking-widest mb-1">Current Focus</div>
               <div className="text-sm font-display font-medium">Technology, Web3, and Space</div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
            >
              The Visionary
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-light text-gradient mb-8 !leading-[0.9]"
            >
              Beyond the <span className="italic font-serif text-brand-offwhite">Algorithm</span>.
            </motion.h2>
            
            <div className="space-y-6 text-white/50 font-light leading-relaxed text-lg text-justify">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p>
                  Nafyad is a <span className="text-white font-medium">Computer Science graduate</span> and <span className="text-white font-medium">research-driven strategist</span> building a new digital identity for the <span className="text-white font-medium">Ethiopian tech landscape</span>. As the founder of <span className="text-white font-medium underline decoration-brand-purple/30 underline-offset-4">NafTech</span>, he specializes in dismantling the <span className="text-white font-medium italic">Black Box</span> of modern innovation. He makes complex topics like <span className="text-white font-medium">AI, blockchain, and space technology</span> accessible through <span className="text-white font-medium italic">high-fidelity storytelling</span> and skeptical, <span className="text-white font-medium">evidence-based insights</span>.
                </p>

                <p>
                  By merging a background in <span className="text-white font-medium">software development</span> with high-end <span className="text-white font-medium">media production</span>, Nafyad bridges the gap between global innovation and local context. His approach cuts through the noise, providing <span className="text-white font-medium">technical clarity</span> without the fluff. From analyzing <span className="text-white font-medium">crypto futures</span> to exploring the latest in <span className="text-white font-medium italic">neural technology</span>, he delivers <span className="text-white font-medium">high-retention content</span> and strategic reviews for a tech-savvy, curiosity-driven audience.
                </p>

                <div className="pt-4">
                  <div className="text-brand-purple font-display font-bold uppercase tracking-widest text-xs mb-4">Core Pillars</div>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-brand-purple font-bold">•</span>
                      <span><span className="text-white font-bold">TechTruth:</span> Focused on software development and the mechanics of AI.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-purple font-bold">•</span>
                      <span><span className="text-white font-bold">Cryptospace:</span> Strategic analysis of blockchain and digital market dynamics.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-brand-purple font-bold">•</span>
                      <span><span className="text-white font-bold">Spaceverse:</span> Research into aerospace and the future of global space exploration.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-8 grid grid-cols-2 gap-8"
              >
                <div>
                   <div className="text-3xl font-display text-white mb-1">200K+</div>
                   <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Total Community</div>
                </div>
                <div>
                   <div className="text-3xl font-display text-white mb-1">5+</div>
                   <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Brand Partnerships</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
