import { useEffect, useRef, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { PROJECTS, categoryLabel } from '../data';
import type { Project } from '../types';
import { setScrollLocked } from '../lib/smoothScroll';
import ProjectImage from './ProjectImage';
import { EASE_OUT } from './ui';

/** Full-screen sheet with the details of one project */
export default function ProjectModal({
  project,
  onClose,
  onSelect,
}: {
  project: Project;
  onClose: () => void;
  onSelect: (project: Project) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const images = [project.image, ...(project.gallery ?? [])].filter((src): src is string => Boolean(src));

  // Freeze the page behind the sheet, and give focus back when it closes
  useEffect(() => {
    const lastFocused = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      setScrollLocked(false);
      lastFocused?.focus({ preventScroll: true });
    };
  }, []);

  // Esc closes, ← / → switch project
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      else if (event.key === 'ArrowRight') onSelect(next);
      else if (event.key === 'ArrowLeft') onSelect(previous);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, previous, onClose, onSelect]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [project.id]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <motion.div
        className="absolute inset-0 bg-black/55"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        ref={panelRef}
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-3 overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-bg md:inset-x-4 md:top-6 md:rounded-t-[2.5rem]"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.75, ease: EASE_OUT }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-bg/90 page-x py-3 backdrop-blur-md">
          <span className="type-label text-muted">
            {categoryLabel(project.category)} · {project.year}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-semibold text-bg"
          >
            Close
            <X className="size-4" />
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="mx-auto max-w-[1400px] page-x pb-10 pt-10 md:pt-16"
          >
            <h2 id="project-title" className="type-display text-[clamp(2.5rem,7.5vw,7rem)]">
              {project.title}
            </h2>

            <div className="mt-8 grid gap-10 md:mt-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
              <div>
                <p className="text-xl leading-snug text-pretty md:text-2xl">
                  {project.description ?? project.summary}
                </p>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-black"
                  >
                    Visit live site
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                )}
              </div>

              <dl className="grid grid-cols-2 content-start gap-6 border-t border-line pt-6 md:border-t-0 md:pt-0">
                <Detail label="Category">{categoryLabel(project.category)}</Detail>
                <Detail label="Year">{project.year}</Detail>
                {project.metrics?.map((metric) => (
                  <Detail key={metric.label} label={metric.label}>
                    {metric.value}
                  </Detail>
                ))}
                {project.tags && (
                  <div className="col-span-2">
                    <dt className="type-label text-muted">Tools & skills</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-line px-3 py-1 text-sm">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="mt-12 flex flex-col gap-4 md:mt-16 md:gap-6">
              {images.length > 0 ? (
                images.map((src) => (
                  <div key={src} className="overflow-hidden rounded-2xl bg-surface md:rounded-3xl">
                    <img
                      src={src}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="mx-auto max-h-[85svh] w-auto max-w-full"
                    />
                  </div>
                ))
              ) : (
                <ProjectImage project={project} className="aspect-[16/9] w-full rounded-2xl md:rounded-3xl" />
              )}
            </div>

            <nav aria-label="More projects" className="mt-14 grid grid-cols-2 gap-4 border-t border-line pt-6">
              <button type="button" onClick={() => onSelect(previous)} className="group text-left">
                <span className="flex items-center gap-2 type-label text-muted">
                  <ArrowLeft className="size-4" />
                  Previous
                </span>
                <span className="mt-2 block text-lg font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-accent-ink md:text-2xl">
                  {previous.title}
                </span>
              </button>
              <button type="button" onClick={() => onSelect(next)} className="group text-right">
                <span className="flex items-center justify-end gap-2 type-label text-muted">
                  Next
                  <ArrowRight className="size-4" />
                </span>
                <span className="mt-2 block text-lg font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-accent-ink md:text-2xl">
                  {next.title}
                </span>
              </button>
            </nav>
          </motion.article>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="type-label text-muted">{label}</dt>
      <dd className="mt-1.5 text-lg font-semibold">{children}</dd>
    </div>
  );
}
