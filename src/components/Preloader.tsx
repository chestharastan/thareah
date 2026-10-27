import { useEffect, useRef } from 'react';
import { animate, motion } from 'motion/react';
import { SITE } from '../data';
import { setScrollLocked } from '../lib/smoothScroll';
import { EASE_OUT } from './ui';

/** Short intro screen with a 000 → 100 counter. Shown once per browser session. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setScrollLocked(true);
    let active = true;

    const counter = animate(0, 100, {
      duration: 1.5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => {
        if (countRef.current) countRef.current.textContent = String(Math.round(value)).padStart(3, '0');
        if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
      },
    });

    // Finish when the counter is done and the fonts are ready (no flash of fallback text)
    Promise.all([counter, document.fonts?.ready]).then(() => {
      if (active) onDoneRef.current();
    });

    return () => {
      active = false;
      counter.stop();
      setScrollLocked(false);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-fg page-x py-6 text-bg md:py-8"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex justify-between type-label opacity-60">
        <span>{SITE.name} — Portfolio</span>
        <span>{SITE.location}</span>
      </div>

      <div>
        <div className="flex items-end justify-between gap-4">
          <span className="overflow-hidden">
            <motion.span
              className="block type-display text-[clamp(3rem,13vw,12rem)]"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
            >
              {SITE.name}
            </motion.span>
          </span>
          <span ref={countRef} className="type-display text-[clamp(2rem,7vw,6rem)] tabular-nums text-accent">
            000
          </span>
        </div>
        <div className="mt-5 h-px bg-bg/20">
          <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>
    </motion.div>
  );
}
