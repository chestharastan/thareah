/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MoveRight, Layers, HelpCircle, Eye, RefreshCw, Box, Palette, LayoutGrid } from 'lucide-react';
import { VMDLayout, VMDElement } from '../types';
import ArtworkExhibition from './ArtworkExhibition';

interface ExhibitionSandboxProps {
  onLayoutGenerated?: (layout: VMDLayout) => void;
}

export default function ExhibitionSandbox({ onLayoutGenerated }: ExhibitionSandboxProps) {
  const [activeMode, setActiveMode] = useState<'gallery' | 'sandbox'>('gallery');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeElement, setActiveElement] = useState<VMDElement | null>(null);
  
  // High-fidelity pre-curated default layout matching Pearl Idea aesthetic
  const [layout, setLayout] = useState<VMDLayout>({
    theme: "ARCH-AI SYNERGY EXPO",
    inspiration: "A balanced intersection of natural physical materials and fluid artificial intelligence algorithms, framed inside a structured boutique display window.",
    lightingMood: "Soft Warm Spotlight at 30° paired with high-contrast cybernetic neon borders",
    colorScheme: ["#18181b", "#d97706", "#047857", "#1e40af", "#fafafa"],
    elements: [
      {
        id: "e1",
        name: "Concrete Bio-Pedestal",
        type: "pedestal",
        x: 30,
        y: 45,
        color: "#71717a",
        size: "large",
        description: "Raw hollow concrete cylinder supporting the medical AI biometric projection."
      },
      {
        id: "e2",
        name: "Khmer Script Glass Case",
        type: "prop",
        x: 70,
        y: 35,
        color: "#d97706",
        size: "medium",
        description: "Museum-grade non-reflective glass displaying gold-leaf Khmer segmentation bounds."
      },
      {
        id: "e3",
        name: "Neural Interface Screen",
        type: "screen",
        x: 50,
        y: 70,
        color: "#2563eb",
        size: "medium",
        description: "Translucent curved OLED running live RAG knowledge retriever threads."
      },
      {
        id: "e4",
        name: "Cybernetic Mannequin",
        type: "mannequin",
        x: 18,
        y: 65,
        color: "#18181b",
        size: "large",
        description: "Stylized matte-black mannequin displaying structural data pleating."
      },
      {
        id: "e5",
        name: "Narrow Spotlight Beam",
        type: "lighting",
        x: 82,
        y: 15,
        color: "#fef08a",
        size: "small",
        description: "Concealed light fixture casting dramatic angle shadows onto regional research items."
      }
    ],
    curatorsNotes: "To truly communicate Data & AI, one must treat information as a material: weighted, contoured, and illuminated under calculated guidelines."
  });

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setActiveElement(null);

    try {
      const response = await fetch('/api/gemini/generate-vmd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() })
      });

      if (!response.ok) {
        throw new Error('Network response error');
      }

      const data: VMDLayout = await response.json();
      setLayout(data);
      if (onLayoutGenerated) {
        onLayoutGenerated(data);
      }
    } catch (error) {
      console.error("VMD generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomSample = (sample: string) => {
    setPrompt(sample);
  };

  const sampleIdeas = [
    "Biometric botanical glass greenhouse",
    "Futuristic cybernetic mannequin with glowing paper pleats",
    "An interactive data bank vault wrapped in neon thread",
    "A floating stone garden representing model training"
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden">
      {/* Dynamic Sub-tab bar styled in a pristine, low-contrast system grid */}
      <div className="border-b border-neutral-200/60 bg-neutral-50 px-6 md:px-12 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <Palette className="w-4.5 h-4.5 text-neutral-800 animate-pulse" />
          <div className="h-4 w-[1px] bg-neutral-300" />
          <div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase font-black tracking-widest block">
              CHAMBER_01 // CREATIVE COCKPIT
            </span>
            <span className="font-display font-semibold text-xs tracking-wide text-neutral-800 uppercase">
              Brand Identity & Spatial Exhibition
            </span>
          </div>
        </div>

        {/* Tab options */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            id="tab-gallery-btn"
            onClick={() => setActiveMode('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'gallery'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Featured Artwork
          </button>

          <button
            id="tab-sandbox-btn"
            onClick={() => setActiveMode('sandbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'sandbox'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            AI VMD Space Director
          </button>
        </div>
      </div>

      {/* Body Area */}
      <div className="flex-grow overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeMode === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <ArtworkExhibition />
            </motion.div>
          ) : (
            <motion.div
              key="sandbox"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <div id="vmd-sandbox-section" className="w-full h-full bg-white overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                {/* LEFT PANEL: CONSOLE CONTROLS */}
                <div className="p-6 lg:p-8 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-neutral-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider uppercase">[ DESIGN STUDIO ]</span>
                    </div>
                    
                    <h3 className="font-display text-2xl lg:text-3xl font-medium tracking-tight mb-4 text-neutral-900">
                      Co-Creative Display Director
                    </h3>
                    
                    <p className="text-neutral-500 text-sm leading-relaxed mb-6">
                      Input a concept below. Our AI Director will output a modern spatial display window blueprint plan, arranging geometric pedestals, structural props, custom projection cases, and narrow spotlight columns.
                    </p>

                    <form onSubmit={handleGenerate} className="space-y-4">
                      <div className="relative">
                        <input
                          id="prompt-input"
                          type="text"
                          placeholder="E.g., A minimalist zero-leak medical glass observatory..."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors pr-10"
                          disabled={loading}
                        />
                        <button
                          id="submit-prompt-btn"
                          type="submit"
                          disabled={loading || !prompt.trim()}
                          className="absolute right-2 top-2 p-1.5 rounded-sm bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-100 disabled:text-neutral-400 transition-colors"
                        >
                          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4.5 h-4.5" />}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {sampleIdeas.map((idea, idx) => (
                          <button
                            id={`sample-idea-${idx}`}
                            key={idx}
                            type="button"
                            onClick={() => getRandomSample(idea)}
                            className="font-mono text-[10px] text-neutral-500 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-2 py-1 rounded-full transition-colors text-left truncate max-w-full"
                          >
                            + {idea}
                          </button>
                        ))}
                      </div>
                    </form>
                  </div>

                  {/* CURATOR REPORT */}
                  <div className="mt-8 pt-6 border-t border-neutral-100">
                    <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-neutral-700" />
                        <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-800">Curation Logic</h4>
                      </div>
                      <p id="curators-notes" className="text-neutral-600 text-xs leading-relaxed italic">
                        &ldquo;{layout.curatorsNotes}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase font-semibold">Lighting Setup:</span>
                        <span id="lighting-mood-text" className="font-mono text-[9px] text-neutral-600 font-medium">{layout.lightingMood}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="font-mono text-[9px] text-neutral-400 uppercase font-semibold">Color Palette:</span>
                        <div className="flex gap-1">
                          {layout.colorScheme.map((color, i) => (
                            <span
                              id={`palette-color-${i}`}
                              key={i}
                              className="w-3 h-3 rounded-full border border-neutral-200"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL: INTERACTIVE GRAPHICAL CANVAS */}
                <div className="lg:col-span-7 bg-neutral-50/70 p-6 lg:p-8 flex flex-col justify-between relative min-h-[400px] lg:min-h-[500px]">
                  {/* Fine background details to reinforce Swiss Engineering layout */}
                  <div className="absolute inset-0 bg-blueprint opacity-60 pointer-events-none"></div>
                  <div className="absolute top-4 left-4 font-mono text-[9px] text-neutral-400 pointer-events-none select-none">
                    SYSTEM: VMD-RENDERER-V2 // GRID: 100x100
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-400 pointer-events-none select-none">
                    THEME: {layout.theme}
                  </div>

                  {/* Dynamic Display Envelope Frame */}
                  <div className="relative w-full h-full bg-white border border-neutral-200/50 rounded-sm shadow-inner p-4 flex-grow flex items-center justify-center min-h-[300px]">
                    {loading ? (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="mb-3 text-neutral-700"
                        >
                          <RefreshCw className="w-8 h-8" />
                        </motion.div>
                        <p className="font-display font-medium text-neutral-800">Drafting Floor Plan...</p>
                        <p className="font-mono text-[10px] text-neutral-400 mt-1">Calibrating spotlight paths & balance offsets</p>
                      </div>
                    ) : null}

                    {/* Canvas Space Grid Representation */}
                    <div className="relative w-full aspect-video max-w-lg bg-neutral-50 border border-neutral-100 rounded-sm overflow-hidden flex-grow self-stretch flex items-center justify-center">
                      {/* Spotlight Projection Ray Overlays */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {layout.elements
                          .filter(el => el.type === 'lighting')
                          .map((light, idx) => (
                            <defs key={`def-${idx}`}>
                              <radialGradient id={`grad-${idx}`} cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={light.color || '#fef08a'} stopOpacity="0.25" />
                                <stop offset="100%" stopColor={light.color || '#fef08a'} stopOpacity="0" />
                              </radialGradient>
                            </defs>
                          ))}
                        {layout.elements
                          .filter(el => el.type === 'lighting')
                          .map((light, idx) => (
                            <circle
                              key={`lighting-ring-${idx}`}
                              cx={`${light.x}%`}
                              cy={`${light.y}%`}
                              r="80"
                              fill={`url(#grad-${idx})`}
                            />
                          ))}
                      </svg>

                      {/* Interactive Elements plotted visually */}
                      {layout.elements.map((el) => {
                        const isSelected = activeElement?.id === el.id;

                        return (
                          <motion.button
                            id={`vmd-element-${el.id}`}
                            key={el.id}
                            style={{ left: `${el.x}%`, top: `${el.y}%`, transform: 'translate(-50%, -50%)' }}
                            className="absolute z-10 p-0 rounded-full border border-neutral-300 shadow-md flex items-center justify-center cursor-pointer transition-all focus:outline-none"
                            whileHover={{ scale: 1.15, zIndex: 20 }}
                            onClick={() => setActiveElement(el)}
                            animate={{
                              borderColor: isSelected ? '#171717' : '#d4d4d8',
                              scale: isSelected ? 1.15 : 1,
                              backgroundColor: isSelected ? '#ffffff' : '#fcfcfc',
                              boxShadow: isSelected ? '0 10px 15px -3px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)'
                            }}
                          >
                            <div className="relative w-full h-full flex items-center justify-center p-1">
                              {/* Visual indicators based on element type */}
                              <div
                                className="absolute inset-1.5 rounded-full opacity-20"
                                style={{ backgroundColor: el.color || '#a3a3a3' }}
                              ></div>
                              
                              {el.type === 'pedestal' && <div className="w-3.5 h-3.5 border-1.5 border-neutral-800 rounded bg-neutral-200"></div>}
                              {el.type === 'mannequin' && <div className="w-3 h-4 border-1.5 border-neutral-800 rounded-full"></div>}
                              {el.type === 'screen' && <div className="w-4 h-3 border-1.5 border-neutral-800 rounded-sm"></div>}
                              {el.type === 'lighting' && <div className="w-2 h-2 rounded-full border-1.5 border-neutral-800 bg-yellow-300"></div>}
                              {el.type === 'prop' && <div className="w-3 h-3 rotate-45 border-1.5 border-neutral-800 bg-neutral-400"></div>}
                              {el.type === 'sculpture' && <div className="w-3.5 h-3.5 border-1.5 border-neutral-800 rounded-tl-full bg-neutral-500"></div>}
                              {el.type === 'text-panel' && <span className="font-mono text-[8px] font-bold text-neutral-800">T</span>}
                            </div>
                          </motion.button>
                        );
                      })}

                      {/* Empty state canvas assistance */}
                      <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none z-10">
                        <span className="bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[9px] text-white tracking-widest uppercase">
                          Interactive spatial floorplan // click elements
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ELEMENT DETAIL CARD */}
                  <div id="vmd-element-detail-card" className="mt-4 h-24 relative bg-white border border-neutral-200/50 rounded-sm p-4 flex items-center justify-between">
                    <AnimatePresence mode="wait">
                      {activeElement ? (
                        <motion.div
                          key={activeElement.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-4 w-full"
                        >
                          <div
                            className="w-12 h-12 rounded-sm border border-neutral-200 flex flex-col items-center justify-center font-mono text-[10px] uppercase font-bold"
                            style={{ borderLeftColor: activeElement.color, borderLeftWidth: '4px' }}
                          >
                            {activeElement.type.slice(0, 4)}
                          </div>
                          <div className="flex-grow">
                            <h5 id="element-title" className="font-display text-sm font-semibold text-neutral-900">{activeElement.name}</h5>
                            <p id="element-desc" className="text-neutral-500 text-xs leading-relaxed line-clamp-2 mt-0.5">{activeElement.description}</p>
                          </div>
                          <div className="text-right">
                            <span id="element-coords" className="font-mono text-[10px] text-neutral-400 block">COORDS: {activeElement.x}, {activeElement.y}</span>
                            <span id="element-size" className="font-mono text-[9px] text-neutral-600 uppercase bg-neutral-50 border border-neutral-200 px-1.5 py-0.5 rounded-sm inline-block mt-1">SIZE: {activeElement.size}</span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex items-center gap-3 text-neutral-400">
                          <Box className="w-5 h-5 text-neutral-300" />
                          <div>
                            <span className="font-display text-sm font-medium">Select an item on the blueprint</span>
                            <p className="text-xs">Click any visual point plotted above to isolate its coordinates, metrics, and curation report.</p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
