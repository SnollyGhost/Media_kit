import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Rocket, Coins, ArrowUpRight } from 'lucide-react';
import { NICHES } from '../lib/data';
import { cn } from '../lib/utils';

export const ExpertisePillars = () => {
  return (
    <section className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
          >
            Core Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-light text-gradient leading-[0.9]"
          >
            The <span className="italic font-serif text-brand-offwhite">Three Universes</span> of Impact
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NICHES.map((niche, idx) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden border border-white/10 transition-all duration-700 hover:border-white/20"
            >
              {/* Spotlight Effect */}
              <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className={cn("absolute inset-0 bg-gradient-to-b opacity-20 transition-opacity group-hover:opacity-40", niche.color)} />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                   <motion.div 
                     animate={{ rotate: [0, 5, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 transition-transform duration-500"
                   >
                      {getIcon(niche.id)}
                   </motion.div>
                   <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                      Universe 0{idx + 1}
                   </div>
                </div>

                <div>
                   <div className="text-brand-purple text-[11px] font-bold uppercase tracking-[0.3em] mb-2">{niche.subtitle}</div>
                   <h3 className="text-4xl font-display font-bold mb-4 tracking-tighter">{niche.title}</h3>
                   <p className="text-white/60 text-sm font-medium leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                     {niche.description}
                   </p>
                   
                   <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div>
                         <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Key Performance</div>
                         <div className="text-xl font-display font-bold">{niche.metric}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4">
                         <ArrowUpRight className="w-4 h-4" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Graphic Element */}
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 {getLargeIcon(niche.id)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const getIcon = (id: string) => {
  switch (id) {
    case 'tech': return <Cpu className="w-8 h-8 text-blue-400" />;
    case 'space': return <Rocket className="w-8 h-8 text-purple-400" />;
    case 'crypto': return <Coins className="w-8 h-8 text-amber-400" />;
    default: return <Cpu className="w-8 h-8" />;
  }
};

const getLargeIcon = (id: string) => {
  const props = { className: "w-64 h-64 text-white" };
  switch (id) {
    case 'tech': return <Cpu {...props} />;
    case 'space': return <Rocket {...props} />;
    case 'crypto': return <Coins {...props} />;
    default: return <Cpu {...props} />;
  }
};
