import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Sparkles, CheckCircle, Video, Layers, Users, Zap, Compass, Phone, Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { CREATOR_NAME, BUSINESS_EMAIL, WEBSITE, STATS } from '../lib/portfolio-data';

export const FurnitureMediaKitPage = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const response = await fetch('/api/furniture-mediakit.pdf');
      if (!response.ok) throw new Error('Failed to generate furniture PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'NafTech_Furniture_MediaKit.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Error rendering furniture PDF strategy sheet. Please check your network and try again.');
    } finally {
      setDownloading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="relative min-h-screen text-white bg-[#030303] flex flex-col justify-between overflow-hidden selection:bg-brand-purple/30 selection:text-brand-purple">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-brand-purple/10 to-transparent blur-[160px]" />
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-blue-900/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 noise mix-blend-overlay opacity-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-24 w-full">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Main Portfolio
          </a>
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded-full text-brand-purple text-xs font-semibold tracking-widest uppercase self-start">
              <Sparkles className="w-3.5 h-3.5" />
              Specialization Pitch
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-white leading-tight">
              Furniture SMM & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-purple-400">Content Strategy</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-white/60 text-sm md:text-base leading-relaxed">
              Crafted specifically for the position at <strong className="text-white">Bole Atlas Platinum Plaza (3rd Floor)</strong>, Addis Ababa. Combining Computer Science analysis, luxury aesthetic storytelling, and elite editing platforms to elevate furniture models into aspirational digital assets.
            </motion.p>

            {/* Downloader Trigger Card */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center justify-center gap-3 px-10 py-6 bg-brand-purple hover:bg-brand-purple-dark text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-500 hover:scale-105 shadow-xl shadow-brand-purple/20 text-center w-full sm:w-auto"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Compiling Master PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download Media Kit (PDF)
                  </>
                )}
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-2xl font-bold text-brand-purple">{STATS.totalFollowers}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mt-1">SMM Reach</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{STATS.produced}+</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mt-1">Productions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">96%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mt-1">Retention</p>
              </div>
            </motion.div>
          </div>

          {/* Interactive Document Mockup Box */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 p-px bg-gradient-to-b from-white/10 to-transparent rounded-sm shadow-2xl"
          >
            <div className="bg-[#0b0b0f] p-8 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/20 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-purple" />
                  <span className="text-xs font-bold font-mono tracking-widest text-white/40">NAFTECH DOC_02</span>
                </div>
                <span className="text-[10px] bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded-full font-bold">PDF Ready</span>
              </div>

              {/* Strategy Outline Mock */}
              <h2 className="text-lg font-bold mb-4 font-sans text-white">Furniture Roadmap Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">No Price Listings</h3>
                    <p className="text-[11px] text-white/50">Removed commercial package rates for clean corporate application.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Video className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Advanced Video Workflow</h3>
                    <p className="text-[11px] text-white/50">Highlighting Adobe Premiere Pro, Canva, and CapCut integration.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-white">Content Quality Focus</h3>
                    <p className="text-[11px] text-white/50">Presenting high-end woodwork macro textures and aesthetic home lifestyle setups.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
              >
                <FileText className="w-4 h-4 text-brand-purple" />
                Trigger Live Compile
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Highlight details mapping */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
            <div className="w-10 h-10 rounded bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Cinematic Short-Form</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Showcasing furniture grain textures, space-saving layouts, and luxury home setups using high-tempo TikToks and Reels with acoustic music rhythms.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
            <div className="w-10 h-10 rounded bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Community Dynamics</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Converting views directly into local Addis Ababa buyers. Active moderation, immediate direct-message scripts, and Telegram group strategy.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
            <div className="w-10 h-10 rounded bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Aesthetic Consistency</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Using cohesive Premiere Pro video templates, Canva catalog design banners, and pristine color grading that guarantees brand loyalty.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer info */}
      <footer className="relative z-10 border-t border-white/5 py-8 w-full">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/40">
            © {new Date().getFullYear()} {CREATOR_NAME} | Created for Furniture Content Creator Partnership
          </p>
          <div className="flex gap-6 text-white/50 text-[11px]">
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {BUSINESS_EMAIL}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> 0909563789</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
