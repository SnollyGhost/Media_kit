import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Crown, Target } from 'lucide-react';
import { PACKAGES } from '../lib/data';
import { cn } from '../lib/utils';

interface PackagesProps {
  onSelectPackage: (pkgName: string) => void;
}

export const Packages = ({ onSelectPackage }: PackagesProps) => {
  return (
    <section id="packages" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-purple/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-purple font-display font-medium tracking-[0.3em] uppercase text-[10px] mb-4"
          >
            Campaign Select
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display font-light text-gradient mb-6 !leading-[0.9]"
          >
            Partnership <span className="italic font-serif text-brand-offwhite">Options</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-white/40 max-w-xl mx-auto text-sm font-light leading-relaxed"
          >
            Tailored visual strategies designed for high-end conversion and brand retention.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "relative group flex flex-col p-6 rounded-2xl transition-all duration-500 border",
                pkg.isHighlighted 
                  ? "bg-brand-purple/15 border-brand-purple/40 scale-105 z-10 shadow-2xl shadow-brand-purple/20 ring-1 ring-brand-purple/30 group-hover:bg-brand-purple/20" 
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20 hover:shadow-xl hover:shadow-white/5"
               )}
             >
              <div className="absolute top-2 right-3 text-[12px] font-serif italic text-white/5 group-hover:text-white/15 transition-colors">
                0{idx + 1}
              </div>

              {pkg.isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-brand-purple text-white text-[8px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg whitespace-nowrap">
                  Recommended Partnership
                </div>
              )}

              <div className="mb-6">
                <div className={cn("text-[9px] font-bold uppercase tracking-[0.2em] mb-2 opacity-50", pkg.isHighlighted && "text-brand-purple opacity-100")}>
                  {pkg.name}
                </div>
                <div className={cn("text-2xl font-bold tracking-tighter mb-2", pkg.price === 'Custom' && "font-serif italic font-normal")}>
                  {pkg.price}
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-light">
                  {pkg.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="h-px bg-white/5 w-full" />
                {pkg.features.map(feature => (
                  <div key={feature} className="flex items-start gap-2">
                    <div className={cn("w-1 h-1 rounded-full mt-1.5 shrink-0", pkg.isHighlighted ? "bg-brand-purple" : "bg-white/20")} />
                    <span className="text-[10px] font-medium text-white/70 leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
                <div className="text-[8px] uppercase tracking-widest text-white/20 block">Ideal for: {pkg.idealFor}</div>
                <button
                  onClick={() => onSelectPackage(pkg.name)}
                  className={cn(
                    "w-full py-3 rounded-lg font-bold text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all",
                    pkg.isHighlighted 
                      ? "bg-brand-purple text-white hover:bg-white hover:text-black shadow-lg shadow-brand-purple/20" 
                      : "border border-white/10 text-white/60 hover:bg-white hover:text-black hover:border-white"
                  )}
                >
                  Inquire Now
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
