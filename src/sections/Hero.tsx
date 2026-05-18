import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Youtube, Facebook, Loader2 } from 'lucide-react';
import { SOCIAL_LINKS, CREATOR_NAME, STATS } from '../lib/data';

const StatItem = ({ value, label }: { value: string, label: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ''));
  const isK = value.includes('K') || value.includes('k');

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center sm:items-start group transition-all duration-500"
    >
      <div className="text-4xl md:text-5xl font-display font-medium text-white tracking-tighter group-hover:text-brand-purple transition-colors">
        {displayValue}{isK ? 'K' : ''}+
      </div>
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60">
        {label}
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 text-brand-offwhite">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" 
        />
        <div className="absolute inset-0 mesh-gradient opacity-30" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-purple-400">Official Media Kit</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[9rem] font-display font-light leading-[0.85] tracking-tighter mb-8"
        >
          <span className="text-gradient block">TURNING</span>
          <span className="italic font-serif text-brand-offwhite block">CONTENT</span>
          <span className="text-brand-gradient font-bold drop-shadow-[0_0_30px_rgba(147,51,234,0.3)] block">INTO ATTENTION.</span>
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-8 max-w-5xl mx-auto px-4">
          <StatItem value={STATS.totalFollowers} label="Global Social Followers" />
          <StatItem value={STATS.produced} label="Contents Produced" />
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#packages"
              className="group px-12 py-6 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-brand-purple hover:text-white transition-all duration-500 transform hover:scale-105 shadow-xl shadow-white/5"
            >
              Start Collaboration
            </a>
            <a
              href="#work"
              className="px-10 py-6 border border-white/10 text-white/50 font-bold text-xs uppercase tracking-widest rounded-sm hover:border-white hover:text-white transition-all duration-500"
            >
              View Analysis 
            </a>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};
