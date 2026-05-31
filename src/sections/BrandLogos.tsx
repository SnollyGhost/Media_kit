import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../lib/data';

const renderSvgFallback = (brandName: string) => {
  const name = brandName.toLowerCase();
  
  if (name.includes('bybit')) {
    return (
      <svg className="h-8 md:h-10 w-8 md:w-10 text-[#f7941d] drop-shadow-[0_0_8px_rgba(247,148,29,0.4)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M35 25 C55 25, 75 35, 75 50 C75 65, 55 75, 35 75 C22 75, 15 65, 15 55 C15 45, 25 40, 35 40 M55 25 C70 25, 80 32, 80 40 C80 48, 70 55, 55 55" stroke="#f7941d" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  
  if (name.includes('ehud')) {
    return (
      <svg className="h-8 md:h-10 w-8 md:w-10 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
         <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" />
         <path d="M30 50 Q50 20 70 50" />
         <path d="M30 60 Q50 90 70 60" />
         <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
    );
  }
  
  if (name.includes('auction')) {
    return (
      <svg className="h-8 md:h-10 w-8 md:w-10" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0, 3)">
          <path d="M 45,5 L 80,35 L 30,35 Z" fill="#0c4da2" opacity="0.95" />
          <path d="M 30,35 L 48,23 L 45,5 Z" fill="#003366" opacity="0.4" />
          <path d="M 55,35 L 90,35 L 65,78 Z" fill="#f7941d" opacity="0.95" />
          <path d="M 65,78 L 70,51 L 55,35 Z" fill="#d9531e" opacity="0.4" />
          <path d="M 10,25 L 35,68 L 15,78 Z" fill="#22b14c" opacity="0.95" />
          <path d="M 15,78 L 27,46 L 10,25 Z" fill="#1b8a3c" opacity="0.5" />
          <polygon points="45,35 55,35 50,43" fill="#8dc63f" opacity="0.9" />
        </g>
      </svg>
    );
  }
  
  if (name.includes('hawi')) {
    return (
      <svg className="h-8 md:h-10 w-8 md:w-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  }
  
  if (name.includes('hulu')) {
    return (
      <svg className="h-8 md:h-10 w-8 md:w-10 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    );
  }
  
  return null;
};

export const BrandLogos = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="py-24 bg-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
         <div className="text-[10px] font-display font-medium tracking-[0.3em] uppercase opacity-30">
            Trusted by Global Tech & Web3 Entities
         </div>
      </div>
      
      <div className="flex relative items-center">
        {/* Infinite Scroll Effect - Tripled for seamlessness with fewer items */}
        <div className="flex animate-scroll whitespace-nowrap">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => {
            const isHawi = brand.name.toLowerCase().includes('hawi');
            const hasFailed = failedImages[brand.name];

            return (
              <div 
                key={idx} 
                className="mx-12 flex items-center justify-center opacity-95 md:opacity-85 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-105"
              >
                {!hasFailed ? (
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className={`h-8 md:h-10 object-contain transition-all duration-500 ${
                      isHawi 
                        ? 'invert brightness-200 contrast-125' 
                        : ''
                    }`}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      setFailedImages(prev => ({ ...prev, [brand.name]: true }));
                    }}
                  />
                ) : (
                  renderSvgFallback(brand.name)
                )}
                <span className="ml-3 text-sm font-display font-medium tracking-widest uppercase text-white/80 transition-colors duration-500">{brand.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}} />
    </section>
  );
};
