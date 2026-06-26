/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Cpu, MapPin, Briefcase, Sparkles, LayoutGrid, Code, Palette, BrainCircuit, X } from 'lucide-react';
import { HERO_INFO, SKILL_CATEGORIES, PROJECTS } from '../data';
import { Project } from '../types';
import ProjectDetailsModal from './ProjectDetailsModal';

interface AboutMeSectionProps {
  onExploreProjects?: (targetRoom?: string, subTab?: string) => void;
}

export default function AboutMeSection({ onExploreProjects }: AboutMeSectionProps) {
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'design' | 'webdev' | 'ai'>('all');
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  const getSimDetails = (id: string): { room: string; subTab?: string } | null => {
    switch (id) {
      case 'diabetes-xai': return { room: 'ai', subTab: 'diabetes' };
      case 'khmer-ocr': return { room: 'ai', subTab: 'ocr' };
      case 'kb-rag': return { room: 'ai', subTab: 'rag' };
      case 'design-sandbox': return { room: 'design' };
      case 'pearl-editorial': return { room: 'design' };
      case 'banking-dwh': return { room: 'webdev' };
      case 'nlp-model-dashboard': return { room: 'webdev' };
      default: return null;
    }
  };

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.projectType === activeCategory);

  return (
    <div className="w-full h-full bg-white p-6 lg:p-10 select-none grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 relative overflow-y-auto lg:overflow-hidden">
      {/* Decorative vertical blueprint lines inside Card */}
      <div className="absolute inset-y-0 left-[41.6%] w-[1px] bg-neutral-900/[0.04] hidden lg:block"></div>
      <span className="absolute top-4 right-4 font-mono text-[8px] text-neutral-400">
        ROOM://CHAMBER_1B // BIO_INTELLIGENCE // INDEX: ABOUT_ME
      </span>

      {/* LEFT COLUMN */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[9px] text-neutral-400 tracking-wider uppercase font-semibold">
              EXHIBIT // CREATIVE PROFILE
            </span>
          </div>

          <span className="font-mono text-xs text-amber-600 uppercase font-bold tracking-widest block mb-1">
            MEET THE BUILDER
          </span>
          <h2 className="font-display text-5.5xl font-light text-neutral-950 tracking-tight leading-none mb-6">
            {HERO_INFO.name}
          </h2>

          {/* Editorial quote badge */}
          <div className="p-5 bg-neutral-50 border-l-2 border-amber-500 rounded-r-xs space-y-2">
            <p className="text-neutral-700 text-xs italic leading-relaxed font-sans font-medium">
              &ldquo;I design beautiful digital experiences and build intelligent software that helps businesses work smarter.&rdquo;
            </p>
          </div>

          <div className="mt-6 space-y-4 text-xs text-neutral-600 font-sans leading-relaxed">
            <p>
              I'm <strong className="text-neutral-900">Thareah</strong>, a full-stack developer, AI engineer, and graphic designer based in <strong className="text-neutral-900">Phnom Penh, Cambodia</strong>.
            </p>
            <p>
              I enjoy transforming ideas into modern digital products — from visually engaging websites and business management systems to AI-powered applications and Telegram automation. My goal is always the same: build solutions that are clean, intuitive, and genuinely useful.
            </p>
            <p>
              With experience spanning design, software engineering, and machine learning, I combine creativity with technical thinking to create products that not only look good but solve real problems.
            </p>
          </div>
        </div>

        {/* Status HUD */}
        <div className="space-y-3 font-mono text-[10px] text-neutral-500 border-t border-neutral-100 pt-6">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>HQ STATUS: PHNOM PENH, KH</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-neutral-700 font-semibold">OPEN FOR FREELANCE PROJECTS</span>
          </div>
          <button
            onClick={() => setIsCabinetOpen(true)}
            className="w-full mt-4 bg-neutral-950 hover:bg-neutral-850 text-white rounded-sm font-mono text-[9.5px] py-2.5 uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs group"
          >
            <LayoutGrid className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            DISCOVER PROJECT PORTFOLIO ↓
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
        {/* Core Pillars Grid */}
        <div>
          <span className="font-mono text-[8px] text-neutral-400 block uppercase font-extrabold tracking-widest pl-1 mb-3">
            TECHNICAL PILLARS & EXPERTISE
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-neutral-150 bg-neutral-50 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs font-mono">
                <Cpu className="w-4 h-4 text-[#C5BCA5]" />
                AI & AUTOMATION
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal font-sans">
                Building AI agents, OCR systems, Retrieval-Augmented Generation (RAG),
                Telegram bots, and intelligent workflow automation using modern
                machine learning technologies.
              </p>
            </div>

            <div className="p-4 border border-neutral-150 bg-neutral-50 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs font-mono">
                <Shield className="w-4 h-4 text-[#C5BCA5]" />
                WEB APPLICATIONS
              </div>
              <p className="text-[11px] text-neutral-500 leading-normal font-sans">
                Developing responsive websites, business dashboards, inventory systems,
                REST APIs, and scalable full-stack applications focused on performance
                and user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Skill Matrix */}
        <div>
          <span className="font-mono text-[8px] text-neutral-400 block uppercase font-extrabold tracking-widest pl-1 mb-4">
            WHAT I CAN DO
          </span>
          <div className="space-y-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-2 rounded-xs border border-neutral-100 bg-neutral-50/70 p-4">
                <div className="font-mono text-[10px] font-bold text-neutral-800 uppercase">
                  {cat.title}
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans text-neutral-600">
                  {cat.skills.slice(0, 4).map((skill) => (
                    <li key={skill.name} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-400 shrink-0" />
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-baseline text-[8px] font-mono text-neutral-400 pt-4 border-t border-neutral-100 mt-2">
          <span>THAREAH // DESIGN • DEVELOPMENT • AI</span>
          <span>AVAILABLE WORLDWIDE</span>
        </div>
      </div>

      {/* PORTFOLIO CABINET SLIDE-OVER */}
      <AnimatePresence>
        {isCabinetOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950/40 backdrop-blur-md flex justify-end"
          >
            <div className="absolute inset-0" onClick={() => setIsCabinetOpen(false)} />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 160 }}
              className="relative w-full max-w-4xl h-full bg-[#faf9f6] shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-neutral-200/60 bg-white flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-neutral-400 uppercase font-semibold block tracking-wider mb-1">
                    EXHIBITER SYSTEM // ACTIVE CURATIONS
                  </span>
                  <h3 className="font-display text-2xl font-light text-neutral-950 tracking-tight">
                    Project Portfolio Curation
                  </h3>
                </div>
                <button
                  onClick={() => setIsCabinetOpen(false)}
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Menu */}
              <div className="px-6 md:px-8 py-3 bg-neutral-50/80 border-b border-neutral-200/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-neutral-500 uppercase font-bold pr-2 border-r border-neutral-200">
                    FILTER
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    {[
                      { id: 'all', label: 'ALL', icon: LayoutGrid },
                      { id: 'design', label: '01 / DESIGN', icon: Palette },
                      { id: 'webdev', label: '02 / WEB', icon: Code },
                      { id: 'ai', label: '03 / AI', icon: BrainCircuit }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveCategory(tab.id as any)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-sm border transition-all cursor-pointer font-semibold ${
                            isActive
                              ? 'bg-neutral-950 text-white border-neutral-950'
                              : 'bg-white hover:bg-neutral-100 text-neutral-600 border-neutral-250/70'
                          }`}
                        >
                          <Icon className="w-3 h-3" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="font-mono text-[9px] text-neutral-400 font-semibold uppercase">
                  {filteredProjects.length} PROJECTS
                </div>
              </div>

              {/* Grid */}
              <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                  {filteredProjects.map((project) => {
                    const simDetails = getSimDetails(project.id);
                    return (
                      <div
                        key={project.id}
                        className="bg-white border border-neutral-200 rounded-sm overflow-hidden flex flex-col justify-between group shadow-xs hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative h-44 bg-neutral-100 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 flex items-center gap-1">
                            <span className="bg-neutral-950/80 backdrop-blur-xs text-[8px] font-mono font-semibold text-white uppercase px-2 py-0.5 rounded-sm tracking-wider">
                              {project.category}
                            </span>
                            <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm border ${
                              project.projectType === 'ai'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : project.projectType === 'webdev'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {project.projectType}
                            </span>
                          </div>
                          <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold bg-white/90 px-2 py-0.5 rounded-xs">
                            {project.year}
                          </span>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div className="space-y-1">
                            <h4 className="font-display font-medium text-[16px] text-neutral-950 group-hover:text-amber-500 transition-colors leading-tight">
                              {project.title}
                            </h4>
                            <p className="font-sans text-[11.5px] text-neutral-500 leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          {project.metrics && project.metrics.length > 0 && (
                            <div className="grid grid-cols-3 gap-1.5 bg-neutral-50 border border-neutral-100/70 p-2 rounded-xs mt-3.5">
                              {project.metrics.slice(0, 3).map((m, mIdx) => (
                                <div key={mIdx} className="text-center">
                                  <span className="font-mono text-[7px] text-neutral-400 block uppercase font-bold leading-none">{m.label}</span>
                                  <span className="font-display font-bold text-[11px] text-neutral-800 leading-none mt-1 inline-block">{m.value}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex gap-2 mt-4 pt-3 border-t border-neutral-100">
                            <button
                              onClick={() => setViewingProject(project)}
                              className="flex-grow py-1.5 px-3 bg-neutral-100 hover:bg-neutral-250 border border-neutral-200 text-neutral-700 hover:text-neutral-900 font-mono text-[9px] font-bold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
                            >
                              VIEW DETAILS
                            </button>

                            {simDetails && (
                              <button
                                onClick={() => {
                                  setIsCabinetOpen(false);
                                  if (onExploreProjects) {
                                    onExploreProjects(simDetails.room, simDetails.subTab);
                                  }
                                }}
                                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-mono text-[9px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-xs transition-colors cursor-pointer min-w-max"
                              >
                                <Sparkles className="w-3 h-3" />
                                SIMULATOR →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cabinet Footer */}
              <div className="p-4 border-t border-neutral-200 bg-white text-center font-mono text-[9px] text-neutral-400 flex justify-between items-center px-6">
                <span>THAREAH // DESIGN • DEVELOPMENT • AI</span>
                <span>BUILDING DIGITAL PRODUCTS THAT MATTER</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {viewingProject && (
          <ProjectDetailsModal
            project={viewingProject}
            onClose={() => setViewingProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}