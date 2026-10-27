import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PILLARS, PROJECTS, categoryLabel, projectsInPillar } from '../data';
import type { PillarId, Project } from '../types';
import { useMediaQuery } from '../lib/useMediaQuery';
import ProjectImage from './ProjectImage';
import { EASE_OUT, H2, MaskLines, SectionLabel } from './ui';

type Filter = 'all' | PillarId;

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: PROJECTS.length },
  ...PILLARS.map((pillar) => ({ id: pillar.id, label: pillar.title, count: projectsInPillar(pillar.id).length })),
];

/** "All projects": every project in a list, filtered by Design / Web / AI */
export default function ProjectIndex({
  filter,
  onFilterChange,
  onOpen,
}: {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onOpen: (project: Project) => void;
}) {
  const [hovered, setHovered] = useState<Project | null>(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Image preview that follows the mouse (desktop only)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const previewX = useSpring(pointerX, { stiffness: 260, damping: 28, mass: 0.6 });
  const previewY = useSpring(pointerY, { stiffness: 260, damping: 28, mass: 0.6 });

  const visible = filter === 'all' ? PROJECTS : projectsInPillar(filter);

  return (
    <section id="projects" className="page-x py-24 md:py-36">
      <SectionLabel index="03">Index</SectionLabel>
      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 className={H2}>
          <MaskLines lines={['All projects']} />
        </h2>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onFilterChange(option.id)}
              aria-pressed={filter === option.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                filter === option.id ? 'border-fg bg-fg text-bg' : 'border-line hover:border-fg'
              }`}
            >
              {option.label}
              <span className="ml-1.5 text-xs opacity-60">{option.count}</span>
            </button>
          ))}
        </div>
      </div>

      <ul
        className="mt-10 border-t border-line md:mt-14"
        onPointerMove={(event) => {
          pointerX.set(event.clientX);
          pointerY.set(event.clientY);
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {visible.map((project, i) => (
          <motion.li
            key={`${filter}-${project.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -5% 0px' }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: Math.min(i, 8) * 0.04 }}
            className="border-b border-line"
          >
            <button
              type="button"
              onClick={() => onOpen(project)}
              onPointerEnter={() => setHovered(project)}
              className="group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-4 text-left md:grid-cols-[3rem_1fr_9rem_4rem_2rem] md:gap-x-6 md:py-6"
            >
              <span className="row-span-2 block size-14 overflow-hidden rounded-xl bg-surface md:hidden">
                <ProjectImage project={project} className="size-full object-cover" />
              </span>
              <span className="hidden type-label text-muted md:block">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[clamp(1.2rem,3.2vw,2.75rem)] font-bold uppercase leading-none tracking-tight transition-[color,translate] duration-500 group-hover:translate-x-2 group-hover:text-accent-ink">
                {project.title}
              </span>
              <span className="col-start-2 text-sm text-muted md:hidden">
                {categoryLabel(project.category)} · {project.year}
              </span>
              <span className="hidden text-muted md:block">{categoryLabel(project.category)}</span>
              <span className="hidden tabular-nums text-muted md:block">{project.year}</span>
              <ArrowUpRight className="col-start-3 row-span-2 row-start-1 size-5 transition-transform duration-300 group-hover:rotate-45 md:col-start-auto md:row-span-1 md:row-start-auto md:size-6" />
            </button>
          </motion.li>
        ))}
      </ul>

      {canHover && (
        <motion.div
          aria-hidden="true"
          style={{ x: previewX, y: previewY }}
          className="pointer-events-none fixed left-0 top-0 z-30"
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="absolute -top-28 left-8 h-56 w-80 overflow-hidden rounded-2xl bg-surface shadow-2xl"
              >
                <ProjectImage project={hovered} className="size-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
