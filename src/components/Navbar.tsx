import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_LINKS = [
  { name: 'Strategy', href: '#process' },
  { name: 'Work', href: '#work' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Packages', href: '#packages' },
  { name: 'About', href: '#about' },
];

import { CREATOR_NAME } from '../lib/data';
import logoImg from '../assets/logo.webp';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'glass-dark py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          {!logoError ? (
            <img 
              src={logoImg} 
              alt="Nafyad Logo" 
              className="w-11 h-11 object-contain group-hover:rotate-[360deg] transition-transform duration-700"
              onError={() => setLogoError(true)}
            />
          ) : (
            <svg 
              className="w-11 h-11 transition-all duration-700 group-hover:rotate-[360deg]" 
              viewBox="0 0 100 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              id="nafyad-svg-logo"
            >
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="logo-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" stroke="url(#logo-glow)" strokeWidth="3" fill="rgba(10,10,12,0.8)" />
              <line x1="50" y1="5" x2="50" y2="25" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
              <line x1="90" y1="28" x2="73" y2="38" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
              <line x1="90" y1="72" x2="73" y2="62" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
              <line x1="50" y1="95" x2="50" y2="75" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="72" x2="27" y2="62" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="28" x2="27" y2="38" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
              <path d="M35 30 V70 L50 50 L65 70 V30" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <span className="text-3xl font-display font-black tracking-tighter uppercase group-hover:text-brand-purple transition-colors drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            {CREATOR_NAME}
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-purple transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 border border-white/20 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            Work With Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 glass-dark border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/80"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="w-full py-3 rounded-xl bg-brand-purple text-white text-center font-bold"
              >
                Work With Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
