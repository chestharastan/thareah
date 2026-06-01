/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Cpu, Eye, MessageSquareText, ArrowRight, LayoutGrid, Sliders, Layers } from 'lucide-react';
import ClinicalAIDashboard from './ClinicalAIDashboard';
import KhmerOCRVision from './KhmerOCRVision';
import RAGChatConsole from './RAGChatConsole';
import { PROJECTS } from '../data';

interface AISystemsHubProps {
  initialTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function AISystemsHub({ initialTab = 'diabetes', onTabChange }: AISystemsHubProps) {
  const [activeMode, setActiveMode] = useState<'projects' | 'interactive'>('projects');
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const tabs = [
    {
      id: 'diabetes',
      label: 'CLINICAL AI CHIPS',
      desc: 'Diabetes Predictor & SHAP Triage Matrix',
      icon: Cpu,
      accent: 'border-amber-400 text-amber-500'
    },
    {
      id: 'ocr',
      label: 'KHMER OCR MODELER',
      desc: 'Deep Neural Script Boundary Transcription',
      icon: Eye,
      accent: 'border-blue-400 text-blue-500'
    },
    {
      id: 'rag',
      label: 'SECURE KNOWLEDGE RAG',
      desc: 'Enterprise Sparse Vector Retriever Console',
      icon: MessageSquareText,
      accent: 'border-emerald-400 text-emerald-500'
    }
  ];

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const aiProjects = PROJECTS.filter(p => p.projectType === 'ai');

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden">
      {/* Sub-tab bar styled in a pristine system grid */}
      <div className="border-b border-neutral-200/60 bg-neutral-50 pl-16 pr-6 md:pl-24 md:pr-12 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <Brain className="w-4.5 h-4.5 text-neutral-800 animate-pulse" />
          <div className="h-4 w-[1px] bg-neutral-300" />
          <div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase font-black tracking-widest block">
              CHAMBER_05 // INTELLIGENCE CHAMBER
            </span>
            <span className="font-display font-semibold text-xs tracking-wide text-[#252525] uppercase">
              Unified Data Science & AI Systems
            </span>
          </div>
        </div>

        {/* Tab options */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            id="tab-ai-projects-btn"
            onClick={() => setActiveMode('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'projects'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            AI Projects Index
          </button>

          <button
            id="tab-ai-simulator-btn"
            onClick={() => setActiveMode('interactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'interactive'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Operational Prototypes
          </button>
        </div>
      </div>

      {/* Body Area */}
      <div className="flex-grow overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeMode === 'projects' ? (
            <motion.div
              key="ai-projects"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full overflow-y-auto p-6 md:p-10 custom-scrollbar bg-neutral-50/50"
            >
              <div className="max-w-5xl mx-auto space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-light text-neutral-900 tracking-tight">
                    Machine Learning & Data Science Projects
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1 leading-relaxed max-w-xl">
                    Demonstrating clean clinical surrogate decision architectures, state-of-the-art optical layout parsing segmentations, and high-performance retrieval-augmented indexes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {aiProjects.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-900/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Artwork/Screenshot frame */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute top-3 left-3 font-mono text-[8.5px] font-black bg-white text-neutral-900 px-2.5 py-0.5 rounded-sm uppercase tracking-wider">
                            {p.year}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <span className="font-mono text-[8px] text-[#ffae58] block uppercase tracking-widest font-black mb-0.5">{p.subtitle}</span>
                            <h4 className="font-display font-medium text-sm leading-tight">{p.title}</h4>
                          </div>
                        </div>

                        {/* Text descriptions */}
                        <div className="p-5 space-y-4">
                          <p className="text-neutral-600 text-xs leading-relaxed line-clamp-4">
                            {p.longDescription}
                          </p>

                          {/* Tech Swatches */}
                          <div className="flex flex-wrap gap-1">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[8px] text-neutral-600 bg-neutral-50 border border-neutral-200/60 px-1.5 py-0.5 rounded-sm"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Production metrics */}
                          {p.metrics && (
                            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
                              {p.metrics.map((m, idx) => (
                                <div key={idx} className="p-1.5 bg-neutral-50/50 rounded-sm border border-neutral-100 text-center">
                                  <span className="font-mono text-[7px] text-neutral-400 block uppercase font-bold leading-none mb-1 text-ellipsis overflow-hidden whitespace-nowrap">{m.label}</span>
                                  <span className="font-mono text-[10px] font-black text-neutral-800">{m.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct Hotlink Action */}
                      <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                        <span className="font-mono text-[8px] text-neutral-400 uppercase font-bold">LIVE ENGINE DECK</span>
                        <button
                          onClick={() => {
                            setActiveTab(p.id === 'diabetes-xai' ? 'diabetes' : p.id === 'khmer-ocr' ? 'ocr' : 'rag');
                            setActiveMode('interactive');
                          }}
                          className="flex items-center gap-1 text-[9px] font-mono text-[#d56d05] hover:text-amber-600 font-extrabold uppercase bg-transparent border-0 cursor-pointer transition-colors"
                        >
                          LAUNCH INTERACTIVE RIG
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ai-interactive"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full flex flex-col justify-between"
            >
              <div className="border-b border-neutral-200/40 bg-neutral-50 px-6 py-2.5 flex items-center gap-1.5 overflow-x-auto select-none flex-shrink-0">
                <span className="font-mono text-[9px] text-neutral-400 uppercase font-bold mr-2">CHOOSE CORE:</span>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabSelect(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-sm border transition-all cursor-pointer font-mono text-[9px] uppercase font-bold whitespace-nowrap ${
                        isActive
                          ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                          : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {tab.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Primary Display Content Container */}
              <div className="flex-grow overflow-hidden relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'diabetes' && (
                    <motion.div
                      key="diabetes"
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <ClinicalAIDashboard />
                    </motion.div>
                  )}

                  {activeTab === 'ocr' && (
                    <motion.div
                      key="ocr"
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <KhmerOCRVision />
                    </motion.div>
                  )}

                  {activeTab === 'rag' && (
                    <motion.div
                      key="rag"
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <RAGChatConsole />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mini status bar tracker */}
      <div className="bg-neutral-50 border-t border-neutral-150 py-2 px-6 md:px-12 flex justify-between items-center text-[9px] font-mono text-neutral-400 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span>PORTAL COMPLIANCE APPROVED: INTEL CORE</span>
        </div>
        <span>SYSTEM LEVEL RATIO: v2.4</span>
      </div>
    </div>
  );
}
