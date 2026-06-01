/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Calendar, Target, Link as LinkIcon, Database } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <div id={`project-modal-${project.id}`} className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs"
      />

      {/* Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        className="relative w-full max-w-lg md:max-w-xl h-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
      >
        <div>
          {/* Header & Hero */}
          <div className="relative h-64 bg-neutral-100 border-b border-neutral-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent p-6 pt-12">
              <span className="font-mono text-xs text-amber-500 font-semibold tracking-widest uppercase mb-1 block">
                {project.category}
              </span>
              <h2 id="modal-project-title" className="font-display text-2xl md:text-3xl font-medium tracking-tight text-white">
                {project.title}
              </h2>
            </div>
            
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/80 backdrop-blur-sm text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500 pb-4 border-b border-neutral-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                YEAR: {project.year}
              </span>
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                ACCENT: {project.accentColor.toUpperCase()}
              </span>
            </div>

            {/* Core Metrics Grid */}
            {project.metrics && project.metrics.length > 0 && (
              <div id="modal-metrics-grid" className="grid grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div key={idx} className="bg-neutral-50 border border-neutral-100 rounded-sm p-4 text-center">
                    <span className="font-mono text-[9px] text-neutral-400 block uppercase tracking-wider">{metric.label}</span>
                    <span className="font-display text-xl font-bold text-neutral-950 block mt-1">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Description Segment */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Architectural Summary</h4>
              <p id="modal-project-long-desc" className="text-neutral-700 text-sm md:text-base leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Stack Tags */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Systems Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span
                    id={`modal-tag-${i}`}
                    key={i}
                    className="font-mono text-[11px] text-neutral-800 bg-neutral-50 border border-neutral-200 px-2.5 py-1 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Architectural Blueprint Concept */}
            <div className="border border-neutral-100 rounded-sm p-4 bg-amber-500/5">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-display text-xs font-semibold text-neutral-900 uppercase tracking-wide">Japanese Spatial Design Alignment</h5>
                  <p className="text-neutral-600 text-xs leading-relaxed mt-1">
                    This project represents modular component logic. Just like Pearl Idea’s physical display partitions, each subsystem (Retrieval engine, U-net model, clinical surrogate trees) is crafted with strict modular proportions so they lock securely into complex business environments without data drift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50 flex gap-3">
          <button
            id="modal-request-btn"
            onClick={onClose}
            className="flex-grow bg-neutral-950 hover:bg-neutral-850 text-white font-mono text-xs uppercase tracking-wider py-3 rounded-sm flex items-center justify-center gap-2 transition-colors"
          >
            CONFIRM EXHIBITION LAYOUT
          </button>
        </div>
      </motion.div>
    </div>
  );
}
