/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

interface RecruitmentBannerProps {
  onEnterPortals: () => void;
  isStickyMode?: boolean;
}

export default function RecruitmentBanner({ onEnterPortals, isStickyMode = false }: RecruitmentBannerProps) {
  // We'll use beautiful free-use Unsplash pictures styled with warm retro filters to replicate the Pearl-Idea layout
  const imgCollab = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
  const imgMeeting = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";

  return (
    <div id="recruitment-banner-anchor" className={`relative w-full overflow-hidden ${isStickyMode ? 'h-full flex items-center' : 'mt-16 md:mt-24 border-t border-neutral-200'}`}>
      {/* 
        AESTHETIC VINTAGE PAPER CANVAS
        Off-white/cream textured background matching pearl-idea.co.jp screenshot
      */}
      <div className="absolute inset-0 bg-[#f4f1e6] pointer-events-none z-0"></div>
      
      {/* Fine-line newspaper layout grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>

      {/* Subtle warm lighting wash */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-50/20 via-transparent to-transparent opacity-80 pointer-events-none z-0"></div>

      <div className={`relative max-w-6xl mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${isStickyMode ? 'py-4 md:py-8' : 'py-20 md:py-28'}`}>
        
        {/* LEFT COLUMN: Editorial Text & Copy */}
        <div className="lg:col-span-7 space-y-8 select-text">
          
          {/* Header Subtitle with Left Horizontal Line Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-neutral-400"></div>
            <span className="font-mono text-[10px] md:text-xs text-neutral-500 font-bold tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
              HIRE ME // JOIN THE JOURNEY
            </span>
          </div>

          {/* MAIN SERIF ITALIC DISPLAY HEADLINES (Better with you. More with you.) */}
          <div className="space-y-1">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl italic font-light tracking-tight text-[#22211e]"
            >
              Better with you.
            </motion.h1>
            
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl italic font-light tracking-tight text-[#22211e] pl-10 md:pl-24"
            >
              More with you.
            </motion.h1>
          </div>

          {/* POETIC BILINGUAL TEXT */}
          <div className="space-y-4 max-w-lg">
            <p className="font-sans text-xs md:text-sm text-neutral-600 leading-relaxed font-medium">
              Every outstanding release, elegant blueprint, and robust code system thrives on collaborative alignment. By bringing your challenges and missions, we build something stronger, faster, and infinitely more refined.
            </p>
            <p className="font-sans text-[11px] md:text-xs text-neutral-400 leading-loose tracking-wider line-clamp-2 md:line-clamp-none">
              あなたが加わることで、このプロジェクトはもっと強くなる。
              <span className="block text-[10px] font-mono mt-1 text-amber-600/80 uppercase tracking-widest">
                // PARTNERSHIP // CO-CREATION
              </span>
            </p>
          </div>

          {/* BIG INTERACTIVE CALL-TO-ACTION PORTAL BUTTON */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnterPortals}
              className="group flex items-center gap-4 bg-neutral-900 text-white pl-6 pr-5 py-3.5 rounded-none font-mono text-[10px] md:text-xs font-black tracking-widest uppercase hover:bg-neutral-800 transition-all cursor-pointer shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-amber-600/0 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                ENTER INTERACTIVE PORTALS
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </motion.button>
            <span className="block font-mono text-[9px] text-neutral-400 uppercase mt-2.5 tracking-wider font-semibold animate-pulse pl-1">
              * or scroll downwards past chronology to auto-enter
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Offset Asymmetric Collage (Pearl-Idea Style) */}
        <div className="lg:col-span-5 relative min-h-[400px] md:min-h-[520px] flex items-center justify-center">
          
          {/* Top-Right Offset Photo with Warm Vintage/Sepia Tint */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            whileHover={{ scale: 1.02, rotate: -1 }}
            className="absolute right-0 top-0 w-[68%] aspect-4/3 bg-neutral-200 shadow-xl overflow-hidden border-4 border-white transform rotate-1 transition-all duration-500 cursor-zoom-in"
          >
            <div className="absolute inset-0 bg-[#d97706]/15 mix-blend-color z-10 pointer-events-none"></div>
            <img 
              src={imgCollab} 
              alt="Creative meeting" 
              className="w-full h-full object-cover filter grayscale sepia contrast-110 brightness-95"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Bottom-Left Offset Photo */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="absolute left-0 bottom-4 w-[75%] aspect-4/3 bg-neutral-200 shadow-2xl overflow-hidden border-4 border-white transform -rotate-2 transition-all duration-500 cursor-zoom-in"
          >
            <div className="absolute inset-0 bg-[#d97706]/15 mix-blend-color z-10 pointer-events-none"></div>
            <img 
              src={imgMeeting} 
              alt="Collaborative workspace" 
              className="w-full h-full object-cover filter grayscale sepia contrast-115 brightness-90 animate-subtle-drift"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Decorative stamp/coordinates resembling editorial magazines */}
          <div className="absolute right-2 bottom-0 text-right opacity-40 font-mono text-[9px] uppercase tracking-widest text-neutral-500 select-none">
            <p>CHAMBER 05 // HIRED_INDEX</p>
            <p>SYNERGY COEFF: 0.99A</p>
            <p className="font-serif italic capitalize normal-case text-neutral-800 text-xs mt-1 font-semibold">Tokyo / Kyoto Inspired</p>
          </div>

        </div>

      </div>
    </div>
  );
}
