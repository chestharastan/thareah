import type { MouseEvent, ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../lib/smoothScroll';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Size of the big section headings */
export const H2 = 'type-display text-[clamp(2.75rem,8.5vw,8.5rem)]';

export function SectionLabel({
  index,
  children,
  onAccent = false,
}: {
  index: string;
  children: ReactNode;
  onAccent?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 type-label ${onAccent ? 'text-black/70' : 'text-muted'}`}>
      <span className={onAccent ? 'text-black' : 'text-accent-ink'}>({index})</span>
      <span>{children}</span>
      <span className={`h-px flex-1 ${onAccent ? 'bg-black/20' : 'bg-line'}`} />
    </div>
  );
}

const lineVariants: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1, ease: EASE_OUT, delay: i * 0.08 } }),
};

/** Lines of text that slide up out of a mask when scrolled into view */
export function MaskLines({ lines }: { lines: string[] }) {
  return (
    <motion.span
      className="block"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span className="block" custom={i} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Fades and slides its content up when scrolled into view */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'solid',
}: {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
}) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    scrollToSection(href);
  };
  const look =
    variant === 'solid'
      ? 'bg-fg text-bg hover:bg-accent hover:text-black'
      : 'border border-line hover:border-fg';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${look}`}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
    </a>
  );
}

export function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M50 0l6 38 29-23-23 29 38 6-38 6 23 29-29-23-6 38-6-38-29 23 23-29-38-6 38-6-23-29 29 23z"
      />
    </svg>
  );
}
