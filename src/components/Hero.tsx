import { useEffect, useRef, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { SITE } from '../data';
import { useMediaQuery } from '../lib/useMediaQuery';
import Hero3D from './Hero3D';
import { ButtonLink, EASE_OUT } from './ui';

const TILT_SPRING = { stiffness: 120, damping: 20, mass: 0.6 };

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const isDesktop = useMediaQuery('(min-width: 48rem)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Each headline line drifts left or right and tips back in 3D as you scroll down
  const line1X = useTransform(scrollYProgress, [0, 1], ['0%', still ? '0%' : '-26%']);
  const line2X = useTransform(scrollYProgress, [0, 1], ['0%', still ? '0%' : '20%']);
  const line3X = useTransform(scrollYProgress, [0, 1], ['0%', still ? '0%' : '-14%']);
  const fold = useTransform(scrollYProgress, [0, 1], [0, still ? 0 : 60]);

  // On desktop the headline also tilts towards the mouse
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltY = useSpring(useTransform(pointerX, [-1, 1], [-5, 5]), TILT_SPRING);
  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [4, -4]), TILT_SPRING);
  const rotateX = useTransform(() => fold.get() + tiltX.get());

  useEffect(() => {
    if (!canHover || still) return;
    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [canHover, still, pointerX, pointerY]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh flex-col justify-between gap-10 page-x pb-6 pt-24 md:pb-10 md:pt-28"
    >
      <FadeIn ready={ready} delay={0.6} className="flex justify-end type-label text-muted">
        <span>{SITE.location}</span>
      </FadeIn>

      <h1 className="type-display text-[min(20vw,22svh)] md:text-[clamp(3.4rem,min(14.5vw,22svh),15rem)]">
        <HeadlineRow x={line1X} rotateX={rotateX} rotateY={tiltY}>
          <Line ready={ready} delay={0}>
            Design
          </Line>
          <Pill ready={ready} delay={0.45} src="/images/work/poster-coffee.webp" className="max-md:hidden" />
        </HeadlineRow>
        <HeadlineRow x={line2X} rotateX={rotateX} rotateY={tiltY} className="justify-end">
          <Line ready={ready} delay={0.08}>
            Code &amp;
          </Line>
        </HeadlineRow>
        <HeadlineRow x={line3X} rotateX={rotateX} rotateY={tiltY} className="pl-[4vw] md:pl-[12vw]">
          <Pill ready={ready} delay={0.55} src="/images/work/khmer-ocr.webp" />
          <Line ready={ready} delay={0.16}>
            AI
          </Line>
          {/* 3D logo: next to "AI" on desktop, under the headline on phones */}
          {isDesktop && (
            <Hero3D ready={ready} progress={scrollYProgress} className="-my-[0.6em] -ml-[0.1em] size-[2em]" />
          )}
        </HeadlineRow>
      </h1>
      {!isDesktop && (
        <Hero3D ready={ready} progress={scrollYProgress} className="mx-auto -my-4 size-[min(60vw,17rem)]" />
      )}

      <FadeIn ready={ready} delay={0.7} className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-[30rem] text-lg leading-snug text-pretty md:text-xl">{SITE.intro}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#work">See my work</ButtonLink>
          <ButtonLink href="#contact" variant="outline">
            Let's talk
          </ButtonLink>
        </div>
      </FadeIn>
    </section>
  );
}

function HeadlineRow({
  children,
  x,
  rotateX,
  rotateY,
  className = '',
}: {
  children: ReactNode;
  x: MotionValue<string>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  className?: string;
}) {
  return (
    <motion.span
      style={{ x, rotateX, rotateY, transformPerspective: 1400 }}
      className={`flex origin-bottom items-center gap-[0.14em] ${className}`}
    >
      {children}
    </motion.span>
  );
}

/** A headline line that slides up from a mask once the page is ready */
function Line({ children, ready, delay }: { children: ReactNode; ready: boolean; delay: number }) {
  return (
    <span className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={ready ? { y: '0%' } : undefined}
        transition={{ duration: 1.2, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Small rounded image that sits inside the headline */
function Pill({ src, ready, delay, className = '' }: { src: string; ready: boolean; delay: number; className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`relative block h-[0.74em] w-[1.5em] shrink-0 overflow-hidden rounded-full bg-surface ${className}`}
      initial={{ scale: 0 }}
      animate={ready ? { scale: 1 } : undefined}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      <img src={src} alt="" fetchPriority="high" draggable={false} className="size-full object-cover" />
    </motion.span>
  );
}

function FadeIn({
  children,
  ready,
  delay,
  className,
}: {
  children: ReactNode;
  ready: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
