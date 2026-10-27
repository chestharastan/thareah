import { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PROJECTS, categoryLabel } from '../data';
import type { Project } from '../types';
import { scrollToSection } from '../lib/smoothScroll';
import ProjectImage from './ProjectImage';
import { MaskLines, SectionLabel } from './ui';

const featured = PROJECTS.filter((project) => project.featured);

/**
 * "Selected work": the section pins to the screen and scrolling down
 * moves the row of cards sideways.
 */
export default function FeaturedWork({ onOpen }: { onOpen: (project: Project) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0); // how far the row has to travel
  const height = useMotionValue(0); // section height: 1px of vertical scroll = 1px of sideways movement

  useLayoutEffect(() => {
    const track = trackRef.current!;
    const sticky = stickyRef.current!;
    const measure = () => {
      const travel = Math.max(0, track.scrollWidth - sticky.clientWidth);
      distance.set(travel);
      height.set(travel + sticky.clientHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(sticky);
    return () => observer.disconnect();
  }, [distance, height]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  const imageX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <motion.section id="work" ref={sectionRef} style={{ height }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-svh flex-col justify-center gap-7 overflow-clip pt-16 md:gap-10"
      >
        <div className="flex items-end justify-between gap-6 page-x">
          <div className="flex-1">
            <SectionLabel index="02">Selected work</SectionLabel>
            <h2 className="mt-5 type-display text-[clamp(2.5rem,6.5vw,6.5rem)]">
              <MaskLines lines={['Selected work']} />
            </h2>
          </div>
          <p className="hidden max-w-[15rem] pb-1 text-sm text-muted lg:block">
            Keep scrolling to move through the projects. Click one for the details.
          </p>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-start gap-4 page-x will-change-transform md:gap-6">
          {featured.map((project, i) => (
            <FeaturedCard key={project.id} project={project} index={i} imageX={imageX} onOpen={onOpen} />
          ))}
          <AllProjectsCard />
        </motion.div>

        <div className="page-x">
          <div className="h-px bg-line">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-fg" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FeaturedCard({
  project,
  index,
  imageX,
  onOpen,
}: {
  project: Project;
  index: number;
  imageX: MotionValue<string>;
  onOpen: (project: Project) => void;
}) {
  return (
    <button type="button" onClick={() => onOpen(project)} className="featured-card group shrink-0 text-left">
      <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-surface md:rounded-3xl">
        {/* The image drifts slightly inside its frame for a parallax effect */}
        <motion.span style={{ x: imageX }} className="absolute inset-y-0 -left-[6%] -right-[6%] block">
          <ProjectImage
            project={project}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.span>
        <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-1.5 type-label text-fg md:left-4 md:top-4">
          {categoryLabel(project.category)} · {project.year}
        </span>
        <span className="absolute bottom-3 right-3 grid size-12 place-items-center rounded-full bg-accent text-black transition-transform duration-500 md:bottom-4 md:right-4 md:size-14 md:scale-0 md:group-hover:scale-100">
          <ArrowUpRight className="size-5" />
        </span>
      </span>
      <span className="mt-4 flex items-start gap-4">
        <span className="type-label pt-1 text-muted">{String(index + 1).padStart(2, '0')}</span>
        <span className="min-w-0">
          <span className="block text-xl font-bold uppercase leading-none tracking-tight md:text-3xl">
            {project.title}
          </span>
          <span className="mt-2 line-clamp-2 block text-sm text-muted md:text-base">{project.summary}</span>
        </span>
      </span>
    </button>
  );
}

function AllProjectsCard() {
  return (
    <button type="button" onClick={() => scrollToSection('#projects')} className="featured-card group shrink-0 text-left">
      <span className="flex aspect-[4/3] flex-col justify-between rounded-2xl bg-accent p-6 text-black md:rounded-3xl md:p-8">
        <span className="type-label">({PROJECTS.length}) projects in total</span>
        <span className="flex items-end justify-between gap-4">
          <span className="type-display text-[clamp(2.5rem,5vw,5rem)]">
            See all
            <br />
            projects
          </span>
          <ArrowDown className="size-10 transition-transform duration-500 group-hover:translate-y-2 md:size-14" />
        </span>
      </span>
    </button>
  );
}
