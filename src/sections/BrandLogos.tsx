import React from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../lib/data';

export const BrandLogos = () => {
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

            return (
              <div 
                key={idx} 
                className="mx-12 flex items-center justify-center opacity-95 md:opacity-85 hover:opacity-100 transition-all duration-500 cursor-pointer hover:scale-105"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className={`h-8 md:h-10 object-contain transition-all duration-500 ${
                    isHawi 
                      ? 'invert brightness-200 contrast-125' 
                      : ''
                  }`}
                  referrerPolicy="no-referrer"
                />
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
