/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface IntroCollageProps {
  zoom: number;
  onNavigateToRoom?: (roomName: string) => void;
}

const SLOT_POOLS = [
  // Slot 0: Top left-ish, About/Team theme
  [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
      alt: "Engineering Desk Teamwork",
      label: "ABOUT // THAREAH",
      targetRoom: "about"
    },
    {
      url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      alt: "Engineering Workspace",
      label: "ABOUT // OUR ETHOS",
      targetRoom: "about"
    },
    {
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      alt: "Developing clean layouts",
      label: "ABOUT // CRAFTSMANSHIP",
      targetRoom: "about"
    }
  ],
  // Slot 1: Center-top, large vertical, Automation & Bots theme
  [
    {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
      alt: "Robot arm assembly line",
      label: "PROJECT // AUTOMATION ENGINE",
      targetRoom: "automation"
    },
    {
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80",
      alt: "AI robot face glowing lines",
      label: "BOT CORE // INTELLIGENCE",
      targetRoom: "automation"
    },
    {
      url: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=600&q=80",
      alt: "Automated terminal code interface",
      label: "DEV LAB // WEB SCRAPER",
      targetRoom: "automation"
    }
  ],
  // Slot 2: Bottom-left, wide aspect, OCR / Deep learning theme
  [
    {
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
      alt: "Historical Archive Research Desk",
      label: "PROJECT // KHMER OCR",
      targetRoom: "ocr"
    },
    {
      url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
      alt: "Handwriting segmentations",
      label: "GEOMETRICS // SCAN DELTA",
      targetRoom: "ocr"
    },
    {
      url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80",
      alt: "Libraries of ancient texts",
      label: "ARCHIVIST // KHMER SCRIPT",
      targetRoom: "ocr"
    }
  ],
  // Slot 3: Bottom-center, tall layout, Brutalist sandbox theme
  [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      alt: "Brutalist Space Architectural Plan",
      label: "PROJECT // DESIGN SANDBOX",
      targetRoom: "sandbox"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
      alt: "Concrete brutalist display gallery",
      label: "SPATIAL // DIALECTIC CUBE",
      targetRoom: "sandbox"
    },
    {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
      alt: "Curator structural grid lighting",
      label: "MERCHANDISING // MATRIX",
      targetRoom: "sandbox"
    }
  ],
  // Slot 4: Top-right, square layout, Decision support / Charts theme
  [
    {
      url: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80",
      alt: "Advanced Decision Systems Console",
      label: "PROJECT // HEALTH DECISION",
      targetRoom: "diabetes"
    },
    {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      alt: "Clinical charts display",
      label: "INTEGRATIONS // MULTI-STAT",
      targetRoom: "diabetes"
    },
    {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      alt: "Data dashboards and stats",
      label: "CONVERGENCE // METRIC LAB",
      targetRoom: "diabetes"
    }
  ],
  // Slot 5: Bottom-right, wide aspect, RAG / Data warehouse theme
  [
    {
      url: "https://images.unsplash.com/photo-1554941068-a252680d25d9?auto=format&fit=crop&w=600&q=80",
      alt: "Data Ingestion Grid Showcase",
      label: "PROJECT // ENTERPRISE RAG",
      targetRoom: "rag"
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      alt: "Server computer architecture",
      label: "TECHNICAL // VEC SEARCH",
      targetRoom: "rag"
    },
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
      alt: "Digital communication network routing",
      label: "KNOWLEDGE // RETRIEVER",
      targetRoom: "rag"
    }
  ]
];

interface CollageImageProps {
  url: string;
  alt: string;
  label: string;
  shakeClass: string;
  isMobile?: boolean;
}

function CollageImage({ url, alt, label, shakeClass, isMobile = false }: CollageImageProps) {
  const [prevUrl, setPrevUrl] = useState(url);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [displayLabel, setDisplayLabel] = useState(label);
  const [displayAlt, setDisplayAlt] = useState(alt);

  useEffect(() => {
    if (url !== currentUrl) {
      setPrevUrl(currentUrl);
      setCurrentUrl(url);
      setDisplayLabel(label);
      setDisplayAlt(alt);
    }
  }, [url, label, alt, currentUrl]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
      {/* Background Layer: the previous image remains fully visible underneath during the transition */}
      {prevUrl && (
        <img
          src={prevUrl}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover grayscale-15 contrast-105 group-hover:grayscale-0 ${shakeClass}`}
          referrerPolicy="no-referrer"
        />
      )}

      {/* Foreground Layer: the new image crops in over the top with absolutely no visual gap/flash */}
      <motion.img
        key={currentUrl}
        src={currentUrl}
        alt={displayAlt}
        initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className={`absolute inset-0 w-full h-full object-cover grayscale-15 contrast-105 group-hover:grayscale-0 ${shakeClass}`}
        referrerPolicy="no-referrer"
      />

      {isMobile ? (
        <span className="absolute top-0.5 left-0.5 px-1 py-0.5 bg-neutral-950/80 text-[5px] tracking-widest text-white font-mono rounded-xs leading-none z-20 select-none uppercase">
          {displayLabel}
        </span>
      ) : (
        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-neutral-950/85 text-[6.5px] tracking-widest text-white font-mono rounded-xs leading-none z-20 select-none uppercase group-hover:bg-amber-600 transition-colors">
          {displayLabel}
        </span>
      )}

      {!isMobile && (
        <div className="absolute inset-x-0 bottom-0 bg-neutral-950/75 p-1 font-mono text-[6px] text-center text-neutral-300 capitalize opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
          Click to Auto-Move target
        </div>
      )}
    </div>
  );
}

export default function IntroCollage({ zoom, onNavigateToRoom }: IntroCollageProps) {
  // We can exaggerate the separation of images as zoom factors increase, creating an ultra-premium "3D depth parallax" look!
  const depthFactor = Math.max(0, (zoom - 0.7) * 45);

  const [activeIndices, setActiveIndices] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track cursor movement on desktop screens for interactive 3D parallax drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Rotates the projects in all slots every 8 seconds matching user request
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndices(prev => prev.map((curr, idx) => (curr + 1) % SLOT_POOLS[idx].length));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const images = [
    {
      url: SLOT_POOLS[0][activeIndices[0]].url,
      alt: SLOT_POOLS[0][activeIndices[0]].alt,
      style: {
        top: "135px",
        left: "220px",
        width: "210px",
        height: "165px",
        zIndex: 10,
        transform: `translate(${-depthFactor * 0.4 + mousePos.x * -25}px, ${-depthFactor * 0.5 + mousePos.y * -25}px)`
      },
      label: SLOT_POOLS[0][activeIndices[0]].label,
      targetRoom: SLOT_POOLS[0][activeIndices[0]].targetRoom,
      shakeClass: "tremble-active-1"
    },
    {
      url: SLOT_POOLS[1][activeIndices[1]].url,
      alt: SLOT_POOLS[1][activeIndices[1]].alt,
      style: {
        top: "60px",
        left: "410px",
        width: "310px",
        height: "400px",
        zIndex: 20,
        transform: `translate(${depthFactor * 0.2 + mousePos.x * 15}px, ${-depthFactor * 0.8 + mousePos.y * 15}px)`
      },
      label: SLOT_POOLS[1][activeIndices[1]].label,
      targetRoom: SLOT_POOLS[1][activeIndices[1]].targetRoom,
      shakeClass: "tremble-active-2"
    },
    {
      url: SLOT_POOLS[2][activeIndices[2]].url,
      alt: SLOT_POOLS[2][activeIndices[2]].alt,
      style: {
        top: "335px",
        left: "100px",
        width: "295px",
        height: "215px",
        zIndex: 15,
        transform: `translate(${-depthFactor * 1.1 + mousePos.x * -40}px, ${depthFactor * 0.4 + mousePos.y * -40}px)`
      },
      label: SLOT_POOLS[2][activeIndices[2]].label,
      targetRoom: SLOT_POOLS[2][activeIndices[2]].targetRoom,
      shakeClass: "tremble-active-3"
    },
    {
      url: SLOT_POOLS[3][activeIndices[3]].url,
      alt: SLOT_POOLS[3][activeIndices[3]].alt,
      style: {
        top: "395px",
        left: "440px",
        width: "270px",
        height: "345px",
        zIndex: 25,
        transform: `translate(${depthFactor * 0.5 + mousePos.x * 25}px, ${depthFactor * 1.2 + mousePos.y * 25}px)`
      },
      label: SLOT_POOLS[3][activeIndices[3]].label,
      targetRoom: SLOT_POOLS[3][activeIndices[3]].targetRoom,
      shakeClass: "tremble-active-4"
    },
    {
      url: SLOT_POOLS[4][activeIndices[4]].url,
      alt: SLOT_POOLS[4][activeIndices[4]].alt,
      style: {
        top: "130px",
        left: "725px",
        width: "225px",
        height: "225px",
        zIndex: 30,
        transform: `translate(${depthFactor * 1.1 + mousePos.x * 35}px, ${-depthFactor * 0.4 + mousePos.y * -15}px)`
      },
      label: SLOT_POOLS[4][activeIndices[4]].label,
      targetRoom: SLOT_POOLS[4][activeIndices[4]].targetRoom,
      shakeClass: "tremble-active-5"
    },
    {
      url: SLOT_POOLS[5][activeIndices[5]].url,
      alt: SLOT_POOLS[5][activeIndices[5]].alt,
      style: {
        top: "425px",
        left: "675px",
        width: "295px",
        height: "205px",
        zIndex: 5,
        transform: `translate(${depthFactor * 1.3 + mousePos.x * 45}px, ${-depthFactor * 0.3 + mousePos.y * 45}px)`
      },
      label: SLOT_POOLS[5][activeIndices[5]].label,
      targetRoom: SLOT_POOLS[5][activeIndices[5]].targetRoom,
      shakeClass: "tremble-active-6"
    }
  ];

  return (
    <div className="w-full h-full bg-[#f8f5f0] flex items-center justify-center overflow-hidden relative select-none p-0 md:p-8">
      {/* DESKTOP COLLAGE SCREEN */}
      <div className="hidden md:block relative w-[1100px] h-[780px] shrink-0 scale-[0.55] xs:scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 flex-none transition-transform origin-center">
        {/* Dynamic Watermark grid lines inside Card */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-900/[0.04]"></div>
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-900/[0.04]"></div>

        {/* Top Header Labeling identical to screenshot */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <Logo size={30} />
          <span className="font-display font-black text-xl tracking-wider text-neutral-900 uppercase">
            THAREAH
          </span>
          <span className="font-mono text-[9px] text-neutral-400 font-medium">RECRUIT PORTFOLIO SITE</span>
        </div>

        <div className="absolute top-8 right-8 flex items-center gap-5 lg:gap-6 text-[10px] font-mono text-neutral-500 z-25">
          <button 
            onClick={() => onNavigateToRoom?.('service')}
            className="hover:text-[#d56d05] transition-colors cursor-pointer bg-transparent border-none p-0 text-[10px]"
          >
            SERVICE
          </button>
          <button 
            onClick={() => onNavigateToRoom?.('portfolio')}
            className="hover:text-[#d56d05] transition-colors cursor-pointer bg-transparent border-none p-0 text-[10px]"
          >
            EXPERTISE
          </button>
          <button 
            onClick={() => onNavigateToRoom?.('contact')}
            className="hover:text-[#d56d05] transition-colors cursor-pointer bg-transparent border-none p-0 text-[10px]"
          >
            CONTACT
          </button>
          <button 
            onClick={() => onNavigateToRoom?.('design')}
            className="border border-neutral-900 bg-neutral-950 text-white rounded-full px-4 py-1 hover:bg-amber-500 hover:text-neutral-950 transition-colors cursor-pointer text-[10px] font-mono"
          >
            ENTRY GUIDE
          </button>
        </div>

        {/* Floating Collage Showcase */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {images.map((img, i) => (
            <motion.div
              key={i}
              style={img.style}
              onClick={() => {
                if (img.targetRoom && onNavigateToRoom) {
                  onNavigateToRoom(img.targetRoom);
                }
              }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 50,
                borderColor: '#d97706',
                boxShadow: '0 25px 40px -10px rgba(0, 0, 0, 0.25), 0 10px 15px -5px rgba(0, 0, 0, 0.1)'
              }}
              whileTap={{ scale: 0.98 }}
              className="absolute bg-white p-2.5 pb-10 border border-neutral-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer group-card pointer-events-auto rounded-xs overflow-hidden flex flex-col"
            >
              {/* Inner wrapper for image to grow within frames */}
              <div className="flex-grow w-full overflow-hidden relative rounded-xs">
                <CollageImage
                  url={img.url}
                  alt={img.alt}
                  label={img.label}
                  shakeClass={img.shakeClass || ''}
                />
              </div>
              
              {/* Decorative premium captions on the card border matching Pearl-Idea layout */}
              <div className="h-4 flex items-center justify-between mt-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500 select-none">
                <span className="font-extrabold text-neutral-800 text-[8.5px] truncate max-w-[170px]">
                  {img.label.split(' // ')[1] || img.label}
                </span>
                <span className="font-serif italic text-neutral-400 capitalize normal-case text-[10px] pr-0.5">
                  chamber 0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Typography matching user photo - scaled nicely to avoid clipping/overlapping */}
        <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="font-display text-5xl md:text-6.5xl font-light tracking-tight text-neutral-950 relative leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            My stories.
            <span className="block font-sans text-3xl md:text-4.5xl font-bold tracking-tight text-[#c4bbb0] uppercase pl-1 mt-3">
              Build.
            </span>
          </motion.h1>
        </div>

        {/* Japanese vertical text on the right */}
        <div className="absolute right-6 top-1/3 z-20 flex flex-col items-center pointer-events-none">
          <div 
            className="font-display text-lg font-light text-neutral-500 leading-relaxed writing-mode-vertical"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            一緒につくるから、一緒に強くなる。
          </div>
          <div className="h-12 w-[1px] bg-neutral-300 mt-6 animate-pulse"></div>
          <span className="font-mono text-[8px] text-neutral-400 mt-2 uppercase tracking-widest block transform rotate-90 origin-center whitespace-nowrap">
            Scroll down
          </span>
        </div>

        {/* Instructions Overlay on top */}
        <div className="absolute bottom-6 right-8 text-right font-mono text-[9px] text-neutral-400">
          <span>SYSTEM CALIBRATION // STATUS : OPTIMAL ACTIVE</span>
          <p className="mt-1">SCROLL DOWN OR SWIPE TO TRAVEL ACROSS CHAMBERS</p>
        </div>
      </div>

      {/* MOBILE OPTIMIZED LAYOUT (md:hidden) */}
      <div className="md:hidden flex flex-col justify-between w-full h-full p-6 text-neutral-900 select-text z-10 relative">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full pt-1">
          <div className="flex items-center gap-1.5">
            <Logo size={24} />
            <span className="font-display font-black text-sm tracking-wider text-neutral-900 uppercase">
              THAREAH
            </span>
          </div>
          <button 
            onClick={() => onNavigateToRoom?.('design')}
            className="border border-neutral-900 bg-neutral-950 text-white rounded-full px-3.5 py-1 hover:bg-neutral-800 transition-colors cursor-pointer text-[9px] font-mono"
          >
            ENTRY GUIDE
          </button>
        </div>

        {/* Center: Overlapping mobile collage to preserve "Pearl Idea Recruit" theme but fully responsive */}
        <div className="relative flex-1 w-full flex items-center justify-center my-4 overflow-hidden min-h-[250px] max-h-[350px]">
          {/* Overlapping images centered */}
          <div className="relative w-[310px] h-[280px]">
            {/* Image 1: Clinical AI */}
            <motion.div 
              onClick={() => onNavigateToRoom?.(images[1].targetRoom || 'diabetes')}
              whileTap={{ scale: 0.95 }}
              className="absolute w-[155px] h-[210px] left-0 top-1 bg-white p-1.5 pb-7 border border-neutral-200/60 shadow-lg rounded-xs rotate-[-5deg] z-20 cursor-pointer flex flex-col"
            >
              <div className="flex-grow w-full overflow-hidden relative rounded-xs bg-neutral-900">
                <CollageImage
                  url={images[1].url}
                  alt={images[1].alt}
                  label={images[1].label}
                  shakeClass={images[1].shakeClass || ''}
                  isMobile={true}
                />
              </div>
              <div className="h-4 flex items-center justify-between mt-1 pt-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-500 select-none">
                <span className="font-extrabold text-neutral-800 truncate max-w-[75px]">
                  {images[1].label.split(' // ')[1] || images[1].label}
                </span>
                <span className="font-serif italic text-neutral-400 capitalize normal-case text-[8px]">
                  chamber 02
                </span>
              </div>
            </motion.div>

            {/* Image 3: Brutalist / Sandbox */}
            <motion.div 
              onClick={() => onNavigateToRoom?.(images[3].targetRoom || 'design')}
              whileTap={{ scale: 0.95 }}
              className="absolute w-[145px] h-[175px] right-0 top-2 bg-white p-1.5 pb-7 border border-neutral-200/60 shadow-lg rounded-xs rotate-[6deg] z-10 cursor-pointer flex flex-col"
            >
              <div className="flex-grow w-full overflow-hidden relative rounded-xs bg-neutral-900">
                <CollageImage
                  url={images[3].url}
                  alt={images[3].alt}
                  label={images[3].label}
                  shakeClass={images[3].shakeClass || ''}
                  isMobile={true}
                />
              </div>
              <div className="h-4 flex items-center justify-between mt-1 pt-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-500 select-none">
                <span className="font-extrabold text-neutral-800 truncate max-w-[65px]">
                  {images[3].label.split(' // ')[1] || images[3].label}
                </span>
                <span className="font-serif italic text-neutral-400 capitalize normal-case text-[8px]">
                  chamber 04
                </span>
              </div>
            </motion.div>

            {/* Image 2: Khmer OCR */}
            <motion.div 
              onClick={() => onNavigateToRoom?.(images[2].targetRoom || 'ocr')}
              whileTap={{ scale: 0.95 }}
              className="absolute w-[135px] h-[130px] left-16 bottom-1 bg-white p-1.5 pb-7 border border-neutral-200/60 shadow-xl rounded-xs rotate-[2deg] z-30 cursor-pointer flex flex-col"
            >
              <div className="flex-grow w-full overflow-hidden relative rounded-xs bg-neutral-900">
                <CollageImage
                  url={images[2].url}
                  alt={images[2].alt}
                  label={images[2].label}
                  shakeClass={images[2].shakeClass || ''}
                  isMobile={true}
                />
              </div>
              <div className="h-4 flex items-center justify-between mt-1 pt-0.5 font-mono text-[7px] uppercase tracking-wider text-neutral-500 select-none">
                <span className="font-extrabold text-neutral-800 truncate max-w-[70px]">
                  {images[2].label.split(' // ')[1] || images[2].label}
                </span>
                <span className="font-serif italic text-neutral-400 capitalize normal-case text-[8px]">
                  chamber 03
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Headline & Japanese quote & Scroll indicator */}
        <div className="space-y-4 pb-2">
          <div className="flex justify-between items-end">
            <div>
              <h1 
                className="font-display text-4xl font-light tracking-tight text-neutral-950 relative leading-none"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                My stories.
                <span className="block font-sans text-2xl font-bold tracking-tight text-[#c4bbb0] uppercase pl-0.5 mt-1">
                  Build.
                </span>
              </h1>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span 
                className="text-[11px] font-light text-neutral-500 leading-relaxed max-w-[155px]"
                style={{ writingMode: 'horizontal-tb' }}
              >
                一緒につくるから、一緒に強くなる。
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-neutral-200 text-neutral-400 text-[8px] font-mono">
            <span>SCROLL DOWN TO REVEAL PORTALS</span>
            <div className="flex items-center gap-1.5">
              <span className="animate-bounce text-amber-600 text-[10px]">↓</span>
              <span className="tracking-widest">SCROLL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
