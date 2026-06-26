/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TimelineEvent } from '../types';
import { CheckCircle2, Compass, Cpu } from 'lucide-react';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export default function TimelineSection({ events }: TimelineSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } }
  };

  return (
    <div className="relative pl-6 md:pl-10">
      {/* Tall vertical architectural column guide line resembling display wires */}
      <div className="absolute left-[12px] md:left-[20px] top-0 bottom-0 w-[1px] bg-neutral-200"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-12"
      >
        {events.map((event, idx) => (
          <motion.div
            id={`timeline-event-${idx}`}
            key={idx}
            variants={itemVariants}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8"
          >
            {/* Visual display node resembling horizontal supports */}
            <div className="absolute -left-[18px] md:-left-[26px] top-1 w-3 h-3 rounded-full bg-white border-2 border-neutral-800 z-10 transition-colors group-hover:bg-amber-500"></div>

            {/* YEAR COLLAR */}
            <div className="md:col-span-2">
              <span
                id={`timeline-year-${idx}`}
                className={`font-display font-extrabold tracking-tighter text-neutral-900 block leading-none ${
                  event.year.length > 4 ? 'text-2xl lg:text-3xl' : 'text-4xl'
                }`}
              >
                {event.year}
              </span>
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mt-1">
                EXHIBIT // CHRONO
              </span>
            </div>

            {/* EVENT REPORT PANEL */}
            <div className="md:col-span-10 bg-white border border-neutral-200/60 group-hover:border-neutral-900 rounded-sm p-5 md:p-6 shadow-xs transition-colors duration-300 relative">
              {/* Fine blueprint coordinate details */}
              <div className="absolute top-3 right-3 font-mono text-[8px] text-neutral-400 select-none">
                LOC: [PP_CAM_0{idx}]
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2 pr-20">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-amber-600 font-semibold">{event.role}</span>
                <span className="text-neutral-300">•</span>
                <span className="font-display font-medium text-xs text-neutral-500">{event.organization}</span>
                {event.year === '2026' && (
                  <span className="rounded-sm border border-amber-200 bg-amber-50 px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest text-amber-700">
                    Current Focus
                  </span>
                )}
              </div>

              <h4 id={`timeline-title-${idx}`} className="font-display text-lg font-medium text-neutral-900 mb-3 tracking-tight">
                {event.title}
              </h4>

              <p id={`timeline-desc-${idx}`} className="text-neutral-500 text-sm leading-relaxed max-w-3xl">
                {event.description}
              </p>

              <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
                {event.highlights.map((highlight) => (
                  <div key={highlight.label} className="rounded-xs border border-neutral-100 bg-neutral-50/70 p-3">
                    <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[8px] font-extrabold uppercase tracking-widest text-neutral-500">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {highlight.label}
                    </div>
                    <p className="text-[11px] leading-snug text-neutral-650">
                      {highlight.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                    Client-ready proof: problem, build, measurable value
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {event.tech.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 rounded-sm border border-neutral-200 bg-white px-2 py-1 font-mono text-[8px] font-semibold uppercase tracking-wider text-neutral-500">
                      <Cpu className="h-3 w-3 text-amber-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
