import React from 'react';
import { motion } from 'motion/react';
import { SOCIAL_LINKS, CREATOR_NAME } from '../lib/data';
import { Github, Twitter, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-display font-black tracking-tighter uppercase text-white hover:text-brand-purple transition-colors">
              {CREATOR_NAME}
            </span>
            <div className="h-4 w-px bg-white/10 hidden md:block" />
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium hidden md:block">
              Tech Content Studio
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">TikTok</span>
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">YouTube</span>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {CREATOR_NAME} STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] flex gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
