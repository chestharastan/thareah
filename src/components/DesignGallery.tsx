import { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { PROJECTS, categoryLabel } from '../data';
import type { Project } from '../types';
import { H2, MaskLines, SectionLabel } from './ui';

interface Tile {
  project: Project;
  src: string;
}

// Every image of the branding & poster projects, spread over two rows
const tiles: Tile[] = PROJECTS.filter((p) => p.category === 'branding' || p.category === 'poster').flatMap(
  (project) =>
    [project.image, ...(project.gallery ?? [])]
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ project, src })),
);
const rows = [tiles.filter((_, i) => i % 2 === 0), tiles.filter((_, i) => i % 2 === 1)];

/** "Branding & posters": two rows of images that slide in opposite directions while you scroll */
export default function DesignGallery({ onOpen }: { onOpen: (project: Project) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section id="design" ref={ref} className="overflow-x-clip py-24 md:py-36">
      <div className="page-x">
        <SectionLabel index="04">Design</SectionLabel>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className={H2}>
            <MaskLines lines={['Branding', '& posters']} />
          </h2>
          <p className="max-w-sm text-muted md:pb-2">
            Logos, brand identities and posters. Tap any image to see the full project.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 md:mt-16 md:gap-6">
        <GalleryRow tiles={rows[0]} progress={scrollYProgress} direction="left" onOpen={onOpen} />
        <GalleryRow tiles={rows[1]} progress={scrollYProgress} direction="right" onOpen={onOpen} />
      </div>
    </section>
  );
}

function GalleryRow({
  tiles,
  progress,
  direction,
  onOpen,
}: {
  tiles: Tile[];
  progress: MotionValue<number>;
  direction: 'left' | 'right';
  onOpen: (project: Project) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const overflow = useMotionValue(0); // how much wider the row is than the screen
  const still = useReducedMotion();

  useLayoutEffect(() => {
    const row = rowRef.current!;
    const measure = () => overflow.set(Math.max(0, row.scrollWidth - document.documentElement.clientWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [overflow]);

  const x = useTransform(() => {
    if (still) return 0;
    const travelled = overflow.get() * progress.get();
    return direction === 'left' ? -travelled : travelled - overflow.get();
  });

  return (
    <motion.div ref={rowRef} style={{ x }} className="flex w-max gap-3 page-x will-change-transform md:gap-5">
      {tiles.map((tile) => (
        <button
          key={tile.src}
          type="button"
          onClick={() => onOpen(tile.project)}
          className="group w-[44vw] shrink-0 text-left sm:w-[30vw] lg:w-[21vw]"
        >
          <span className="block aspect-square overflow-hidden rounded-2xl bg-surface md:rounded-3xl">
            <img
              src={tile.src}
              alt={tile.project.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </span>
          <span className="mt-2.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate font-semibold">{tile.project.title}</span>
            <span className="shrink-0 text-muted">{categoryLabel(tile.project.category)}</span>
          </span>
        </button>
      ))}
    </motion.div>
  );
}
