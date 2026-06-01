/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Layers, Tag, Eye, ArrowRight, Sparkles, Sliders, Layout, Compass } from 'lucide-react';

interface Artwork {
  id: string;
  title: string;
  category: 'logo' | 'poster';
  subtitle: string;
  year: string;
  image: string;
  client: string;
  description: string;
  concept: string;
  colors: string[];
  typography: string[];
  dimensions?: string;
  gridStyle?: string;
}

export default function ArtworkExhibition() {
  const [filter, setFilter] = useState<'all' | 'logo' | 'poster'>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // NOTE: Titles, clients and descriptions below are placeholders derived from the
  // folder names in src/assets/design/. Replace with the real project copy.
  const artworks: Artwork[] = [
    {
      id: 'art-logo-cafe',
      title: 'Cafe',
      category: 'logo',
      subtitle: 'Coffee Brand Identity',
      year: '2026',
      image: '/src/assets/design/logo/cafe/image.png',
      client: 'Cafe',
      description: 'Brand identity and logo design for a specialty coffee concept.',
      concept: 'A warm, crafted brandmark built around coffee culture and inviting hospitality.',
      colors: ['#221f20', '#bfa795', '#3d3d3d', '#fdfbf7'],
      typography: ['Display Serif', 'Inter (SemiBold)'],
      gridStyle: 'Centered Emblem Grid'
    },
    {
      id: 'art-logo-bespire',
      title: 'Bespire',
      category: 'logo',
      subtitle: 'Brand Identity Mark',
      year: '2025',
      image: '/src/assets/design/logo/bespire/image.png',
      client: 'Bespire',
      description: 'Logo and identity system for the Bespire brand.',
      concept: 'A clean, modern wordmark with a distinctive, memorable symbol.',
      colors: ['#0a0a0a', '#fafafa', '#d97706', '#71717a'],
      typography: ['Space Grotesk (Bold)', 'Inter (Medium)'],
      gridStyle: 'Golden Section Symmetry'
    },
    {
      id: 'art-logo-rumdol',
      title: 'Rumduol',
      category: 'logo',
      subtitle: 'Floral Heritage Mark',
      year: '2024',
      image: '/src/assets/design/logo/rumdol/image.png',
      client: 'Rumduol',
      description: 'Identity design inspired by the Rumduol, Cambodia’s national flower.',
      concept: 'Soft botanical curves paired with refined typography for an elegant, cultural identity.',
      colors: ['#1c1917', '#eae6db', '#b45309', '#f5f5f4'],
      typography: ['Custom Display', 'Inter (Regular)'],
      gridStyle: 'Botanical Symmetry Grid'
    },
    {
      id: 'art-logo-archwave',
      title: 'Archwave',
      category: 'logo',
      subtitle: 'Architecture Studio Mark',
      year: '2025',
      image: '/src/assets/design/logo/archwave/image.png',
      client: 'Archwave',
      description: 'Brandmark for an architecture and design studio.',
      concept: 'Structural geometry and flowing lines suggesting built form and movement.',
      colors: ['#09090b', '#f4f4f5', '#059669', '#3f3f46'],
      typography: ['Outfit (Bold)', 'JetBrains Mono (Regular)'],
      gridStyle: 'Isometric Projection Matrix'
    },
    {
      id: 'art-poster-cofe',
      title: 'Coffee',
      category: 'poster',
      subtitle: 'Cafe Promotional Poster',
      year: '2025',
      image: '/src/assets/design/poster/cofe/image.png',
      client: 'Cafe',
      description: 'Promotional poster artwork for a coffee brand.',
      concept: 'Bold typography and rich tones built around coffee imagery.',
      colors: ['#0f0f11', '#fed7aa', '#ea580c', '#ffffff'],
      typography: ['Display Bold', 'Inter (Medium)'],
      dimensions: '500 x 700 mm'
    },
    {
      id: 'art-poster-woman',
      title: 'Women’s Day',
      category: 'poster',
      subtitle: 'International Women’s Day Poster',
      year: '2025',
      image: '/src/assets/design/poster/woman/image.png',
      client: 'Campaign',
      description: 'Celebratory poster artwork for International Women’s Day.',
      concept: 'A warm, empowering composition honouring women.',
      colors: ['#2e1005', '#fef3c7', '#d97706', '#fdfbf7'],
      typography: ['Display Serif', 'Inter (SemiBold)'],
      dimensions: '594 x 841 mm'
    },
    {
      id: 'art-poster-kingday',
      title: 'King’s Birthday',
      category: 'poster',
      subtitle: 'National Celebration Poster',
      year: '2024',
      image: '/src/assets/design/poster/kingday/image.png',
      client: 'Campaign',
      description: 'Commemorative poster artwork for the King’s Birthday celebration.',
      concept: 'Regal palette and formal typography befitting a national occasion.',
      colors: ['#18181b', '#e4e4e7', '#f97316', '#ffffff'],
      typography: ['Display Bold', 'Inter (SemiBold)'],
      dimensions: '500 x 700 mm'
    },
    {
      id: 'art-poster-pchum',
      title: 'Pchum Ben',
      category: 'poster',
      subtitle: 'Khmer Festival Poster',
      year: '2024',
      image: '/src/assets/design/poster/pchum/image.png',
      client: 'Campaign',
      description: 'Poster artwork for the Pchum Ben ancestral festival.',
      concept: 'Traditional Khmer motifs and warm tones honouring heritage and remembrance.',
      colors: ['#2e1005', '#fef3c7', '#d97706', '#fdfbf7'],
      typography: ['Khmer Display', 'Inter (Regular)'],
      dimensions: '594 x 841 mm'
    },
    {
      id: 'art-poster-depen',
      title: 'Independence Day',
      category: 'poster',
      subtitle: 'National Day Poster',
      year: '2024',
      image: '/src/assets/design/poster/depen/image.png',
      client: 'Campaign',
      description: 'Poster artwork commemorating Independence Day.',
      concept: 'Patriotic palette and strong typographic hierarchy for a national celebration.',
      colors: ['#18181b', '#e4e4e7', '#f97316', '#ffffff'],
      typography: ['Display Bold', 'Inter (Medium)'],
      dimensions: '500 x 700 mm'
    }
  ];

  const filteredArtworks = artworks.filter(art => filter === 'all' || art.category === filter);

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden">
      {/* Scrollable Gallery Wall */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pl-16 pr-6 py-6 md:pl-24 md:pr-12 md:py-10">
        
        {/* Subtle Section Tag */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-neutral-100">
          <div>
            <span className="font-mono text-[9px] text-[#d56d05] font-black uppercase tracking-widest block mb-1">
              CHAMBER_01 // CREATIVE LABS
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-light text-neutral-950 tracking-tight">
              Selected Works & Exhibition Posters
            </h3>
            <p className="text-neutral-500 text-xs mt-1 max-w-xl leading-relaxed">
              Elegant Swiss typesetting grids, handcrafted corporate logotypes, and minimalist architectural exhibition posters designed with perfect volumetric grid discipline.
            </p>
          </div>

          {/* Interactive Filters pill box */}
          <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200/60 p-1 rounded-sm select-none shrink-0">
            {(['all', 'logo', 'poster'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xs font-mono text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100/50'
                }`}
              >
                {cat === 'all' ? 'All Works' : cat === 'logo' ? 'Logo Designs' : 'Exhibition Posters'}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art) => (
              <motion.div
                layout
                key={art.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedArtwork(art)}
                className="group relative bg-neutral-50 border border-neutral-200/50 hover:border-neutral-900 rounded-xs overflow-hidden cursor-pointer"
              >
                {/* Visual Image frame */}
                <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[3/4] overflow-hidden bg-neutral-900">
                  <img
                    src={art.image}
                    alt={art.title}
                    className={`w-full h-full group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none ${
                      art.category === 'logo' ? 'object-contain p-6 bg-white' : 'object-cover grayscale'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Category Flag badge */}
                  <div className="absolute top-3 left-3">
                    <span className="font-mono text-[8px] font-black bg-white/95 text-neutral-950 py-1 px-2.5 rounded-sm uppercase tracking-widest border border-neutral-900/10 leading-none">
                      {art.category === 'logo' ? 'WORDMARK' : 'EXHIBITION'}
                    </span>
                  </div>

                  {/* Artwork quick indicators */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[9px] text-[#ffae58] block uppercase tracking-wider font-extrabold mb-1">
                      {art.subtitle}
                    </span>
                    <h4 className="font-display text-base font-semibold leading-tight flex items-center justify-between">
                      {art.title}
                      <span className="font-mono text-[9.5px] opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all font-normal">
                        VIEW DETAIL →
                      </span>
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX SIDEBAR / DETAIL MODAL CABINET */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-55 flex justify-end">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            />

            {/* Cabinet Sliding Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md md:max-w-lg h-full bg-white shadow-3xl flex flex-col justify-between z-10 border-l border-neutral-200"
            >
              {/* Sliding header info */}
              <div className="p-6 md:p-8 flex items-center justify-between border-b border-neutral-100">
                <div>
                  <span className="font-mono text-[8px] font-bold text-neutral-400 block uppercase tracking-widest">
                    ARTWORK SPEC SHEET // #{selectedArtwork.id.toUpperCase()}
                  </span>
                  <h4 className="font-display font-medium text-lg text-neutral-900 mt-0.5">{selectedArtwork.title}</h4>
                </div>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="p-1 px-3 border border-neutral-200/80 hover:border-neutral-900 text-neutral-505 hover:text-neutral-950 text-xs font-mono rounded-xs bg-neutral-50 hover:bg-neutral-100/50 cursor-pointer transition-colors"
                >
                  [ ESC ] CLOSE
                </button>
              </div>

              {/* Sliding details core content area */}
              <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
                
                {/* Artwork high aesthetic banner representation */}
                <div className="w-full aspect-video md:aspect-[4/3] rounded-sm overflow-hidden bg-neutral-100 border border-neutral-200/40 shadow-sm relative">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className={`w-full h-full ${
                      selectedArtwork.category === 'logo' ? 'object-contain p-8 bg-white' : 'object-cover'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Case parameters section list */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-neutral-100 py-4 font-mono text-[10px]">
                  <div>
                    <span className="text-neutral-400 block font-bold uppercase mb-0.5">CATEGORY</span>
                    <span className="text-neutral-800 font-extrabold uppercase">
                      {selectedArtwork.category === 'logo' ? 'Logo Design & Identity' : 'Post-Digital Art Poster'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-bold uppercase mb-0.5">METRIC / CLIENT</span>
                    <span className="text-neutral-800 font-extrabold">{selectedArtwork.client}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-bold uppercase mb-0.5">YEAR RELEASED</span>
                    <span className="text-neutral-800 font-extrabold">{selectedArtwork.year} // COMMITTED</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block font-bold uppercase mb-0.5">
                      {selectedArtwork.category === 'logo' ? 'GRID CONFIG' : 'DIMENSIONS'}
                    </span>
                    <span className="text-neutral-800 font-extrabold">
                      {selectedArtwork.category === 'logo' ? selectedArtwork.gridStyle : selectedArtwork.dimensions}
                    </span>
                  </div>
                </div>

                {/* Concept breakdown descriptions */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#d56d05] font-black uppercase tracking-wider">
                      <Layout className="w-3.5 h-3.5" />
                      Client Problem Statement
                    </span>
                    <p className="text-neutral-600 text-xs leading-relaxed">
                      {selectedArtwork.description}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#d56d05] font-black uppercase tracking-wider">
                      <Compass className="w-3.5 h-3.5" />
                      Design Concept & Curation Grid
                    </span>
                    <p className="text-neutral-600 text-xs leading-relaxed font-sans">
                      {selectedArtwork.concept}
                    </p>
                  </div>
                </div>

                {/* Brand asset sheets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                  {/* Typography Pairing */}
                  <div className="p-3.5 bg-neutral-50 rounded-sm border border-neutral-200/50 space-y-2">
                    <span className="font-mono text-[7.5px] text-neutral-400 block uppercase font-bold">FONTS IN USE</span>
                    <div className="space-y-1">
                      {selectedArtwork.typography.map((font, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-neutral-800">
                          <span className="font-mono text-xs text-[#d56d05]">⌨</span>
                          <span className="font-mono text-[10px] font-semibold">{font}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brand Color Swatches */}
                  <div className="p-3.5 bg-neutral-50 rounded-sm border border-neutral-200/50 space-y-2">
                    <span className="font-mono text-[7.5px] text-neutral-400 block uppercase font-bold">SWISS COLOR PALETTE</span>
                    <div className="flex gap-2">
                      {selectedArtwork.colors.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1">
                          <div
                            className="w-5 h-5 rounded-full border border-neutral-200"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                          <span className="font-mono text-[8px] text-neutral-500 uppercase">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Cabinet footer action anchor */}
              <div className="bg-neutral-50 p-6 md:p-8 border-t border-neutral-100 text-center flex flex-col items-center select-none">
                <span className="font-mono text-[8.5px] text-neutral-400 tracking-wider">
                  ALL RECRUIT ARTWORK COPYRIGHTED SYSTEMS © 2026 // ESTABLISHED THAREAH
                </span>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="mt-3 flex items-center gap-1.5 text-[9px] font-mono text-neutral-950 hover:text-amber-500 font-extrabold uppercase"
                >
                  DISMISS DETAIL CO-PILOT
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
