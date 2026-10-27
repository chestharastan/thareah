import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue, type Variants } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PILLARS, SITE, projectsInPillar } from '../data';
import type { Pillar, PillarId, Project } from '../types';
import ProjectImage from './ProjectImage';
import { EASE_OUT, SectionLabel } from './ui';

export default function About({ onSelectPillar }: { onSelectPillar: (id: PillarId) => void }) {
  return (
    <section id="about" className="page-x py-24 md:py-40">
      <SectionLabel index="01">About</SectionLabel>
      <Statement text={SITE.statement} />

      <div className="mt-16 grid gap-3 md:mt-24 md:grid-cols-3 md:gap-4">
        {PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.id} pillar={pillar} index={i} onSelect={onSelectPillar} />
        ))}
      </div>
    </section>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  shown: (index: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT, delay: index * 0.1 } }),
};

// The thumbnails fan out when the card scrolls into view, and further on hover
const thumbVariants: Variants = {
  hidden: { x: '0%', y: 0, rotate: 0, scale: 0.8 },
  shown: (offset: number) => ({
    x: `${offset * 58}%`,
    y: 0,
    rotate: offset * 8,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  }),
  hover: (offset: number) => ({
    x: `${offset * 74}%`,
    y: offset === 0 ? -12 : 6,
    rotate: offset * 13,
    scale: offset === 0 ? 1.06 : 1,
    transition: { duration: 0.6, ease: EASE_OUT },
  }),
};

/** A Design / Web / AI card. Clicking it shows those projects in the "All projects" list. */
function PillarCard({ pillar, index, onSelect }: { pillar: Pillar; index: number; onSelect: (id: PillarId) => void }) {
  const projects = projectsInPillar(pillar.id);
  const hasPicture = (project: Project) => Number(Boolean(project.cover ?? project.image));
  // The pillar's showcase projects, otherwise the first ones with a picture (featured first)
  const thumbs = pillar.showcase
    ? pillar.showcase.flatMap((id) => projects.filter((project) => project.id === id))
    : [...projects]
        .sort((a, b) => hasPicture(b) - hasPicture(a) || Number(!!b.featured) - Number(!!a.featured))
        .slice(0, 3);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(pillar.id)}
      aria-label={`See ${projects.length} ${pillar.title} projects`}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="shown"
      whileHover="hover"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      className="group relative flex min-h-[25rem] flex-col justify-between overflow-hidden rounded-3xl bg-surface p-6 text-left md:min-h-[30rem] md:p-8"
    >
      {/* Dark fill that rises on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:scale-y-100"
      />

      <span className="relative flex items-center justify-between type-label text-muted transition-colors duration-500 group-hover:text-bg/60">
        <span>0{index + 1}</span>
        <span>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </span>

      <span aria-hidden="true" className="relative my-6 block h-36 md:h-44">
        {thumbs.map((project, i) => {
          const offset = i - (thumbs.length - 1) / 2; // -1, 0, 1
          return (
            <motion.span
              key={project.id}
              custom={offset}
              variants={thumbVariants}
              style={{ zIndex: offset === 0 ? 2 : 1 }}
              className="absolute left-1/2 top-1/2 block aspect-[4/3] w-[46%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-bg shadow-lg"
            >
              <ProjectImage project={project} className="size-full object-cover" />
            </motion.span>
          );
        })}
      </span>

      <span className="relative block">
        <span className="flex items-end justify-between gap-4">
          <span className="type-display text-[clamp(2.5rem,4.6vw,4.5rem)] transition-colors duration-500 group-hover:text-bg">
            {pillar.title}
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fg text-bg transition-colors duration-500 group-hover:bg-accent group-hover:text-black md:size-12">
            <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
          </span>
        </span>
        <span className="mt-3 block max-w-xs text-muted transition-colors duration-500 group-hover:text-bg/70">
          {pillar.text}
        </span>
      </span>
    </motion.button>
  );
}

/** Big statement whose words light up one by one as you scroll */
function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className="mt-10 max-w-6xl text-[clamp(1.9rem,4.8vw,5rem)] font-semibold leading-[1.04] tracking-[-0.035em] md:mt-16"
    >
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          highlight={word.startsWith('*')}
        >
          {word.replaceAll('*', '')}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={highlight ? 'text-accent-ink' : undefined}>
        {children}
      </motion.span>{' '}
    </>
  );
}
