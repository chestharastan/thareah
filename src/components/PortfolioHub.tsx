/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Eye, Terminal, Cpu, Sparkles, MoveRight } from 'lucide-react';

interface PortfolioHubProps {
  onZoomIn: (chamber: 'design' | 'webdev' | 'ai') => void;
}

export default function PortfolioHub({ onZoomIn }: PortfolioHubProps) {
  const pillars = [
    {
      id: 'design' as const,
      num: '01',
      title: 'GRAPHIC DESIGN & ARCH-LAYOUT',
      subtitle: 'SWISS TYPOGRAPHY & SPATIAL SANDBOX',
      desc: 'Interactive visual merchandising cockpit adjusting parametric font sizes, tracking metrics, margins, and layout geometry inspired by brutalist minimalism.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      icon: Eye,
      tag: 'VISUAL COMPLIANCE',
      accent: 'border-amber-400/50 text-amber-500 bg-amber-50/20'
    },
    {
      id: 'webdev' as const,
      num: '02',
      title: 'PERFORMANCE WEB DEV DECK',
      subtitle: 'TRANS-REGIONAL DATA PIPELINES',
      desc: 'Active transactional ledger synchronizers modeling Data Vault 2.0 architectures, zero-replication Snowflake streams, and live PyTorch weight loaders.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      icon: Terminal,
      tag: 'BACKEND ARCHITECTURE',
      accent: 'border-blue-400/50 text-blue-500 bg-blue-50/20'
    },
    // {
    //   id: 'ai' as const,
    //   num: '03',
    //   title: 'INTELLIGENT AI SYSTEMS',
    //   subtitle: 'HEALTH XAI CERTIFICATE MATRIX',
    //   desc: 'Suite containing clinical health predictor charts, SHAP interpretability lattices, deep Khmer script OCR transcription bounds, and dense vector RAG consoles.',
    //   image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    //   icon: Cpu,
    //   tag: 'NEURAL NETWORKS',
    //   accent: 'border-emerald-400/50 text-emerald-500 bg-emerald-50/20'
    // }
  ];

  return (
    <div className="w-full h-full bg-[#fcfbf9] p-6 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between">
      {/* Upper sub-header bar info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/55 pb-6 mb-8 select-none">
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-amber-600 font-extrabold uppercase tracking-widest block">
            CHAMBER_04 // DECISION STUDIO
          </span>
          <h2 className="font-display text-4xl font-light text-neutral-950 tracking-tight leading-none">
            Interactive Portfolio Hub
          </h2>
        </div>
        <p className="text-neutral-505 text-xs max-w-md leading-relaxed">
          Overviewing and hot-linking three structural performance labs. Hover to zoom-out background lenses, and click to enter full interface consoles.
        </p>
      </div>

      {/* Grid of 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 flex-grow items-stretch">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="bg-white border border-neutral-200/80 rounded-xs overflow-hidden flex flex-col justify-between shadow-xs hover:border-neutral-900 group cursor-pointer"
              onClick={() => onZoomIn(p.id)}
            >
              {/* Card visual header */}
              <div className="relative h-44 lg:h-52 overflow-hidden bg-neutral-900">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                {/* Floating tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="font-mono text-[7.5px] font-extrabold bg-neutral-950/80 border border-neutral-800 text-neutral-400 py-1 px-2 uppercase tracking-wider rounded-xs leading-none">
                    CHAMBER {p.num}
                  </span>
                  <span className={`font-mono text-[7.5px] font-extrabold border py-1 px-2 uppercase tracking-wider rounded-xs leading-none ${p.accent}`}>
                    {p.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="font-mono text-[9px] text-neutral-350 block font-semibold uppercase leading-none">
                    {p.subtitle}
                  </span>
                  <h3 className="font-display font-semibold text-sm lg:text-base tracking-wide mt-2 text-white">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Textual Description panel */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <p className="text-neutral-500 text-xs leading-relaxed">
                  {p.desc}
                </p>

                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between text-[10px] font-mono select-none">
                  <div className="flex items-center gap-1 text-neutral-400 group-hover:text-neutral-950 transition-colors">
                    <Icon className="w-4 h-4" />
                    <span>DESIGN DISPATCH</span>
                  </div>
                  <span className="flex items-center gap-1 font-extrabold text-neutral-950 group-hover:text-amber-500 transition-colors">
                    ZOOM IN
                    <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative summary footer line */}
      <div className="mt-8 border-t border-neutral-150 pt-4 flex flex-col sm:flex-row justify-between items-center text-[9px] font-mono text-neutral-400 select-none gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span>PORTAL MATRIX GRID OPTIMIZED: ONLINE S-RANK</span>
        </div>
        <span>CRAFTED THAREAH // EXPO DESIGN PATTERNS</span>
      </div>
    </div>
  );
}
