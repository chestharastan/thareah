import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { NAV_LINKS, SITE } from '../data';
import { scrollToSection } from '../lib/smoothScroll';
import { EASE_OUT } from './ui';

function useLocalTime(timeZone: string) {
  const read = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(read);
  useEffect(() => {
    const timer = setInterval(() => setTime(read()), 15_000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function Footer() {
  const time = useLocalTime(SITE.timeZone);
  const socials = SITE.socials.filter((social) => social.url);

  return (
    <footer className="overflow-x-clip page-x pb-6 pt-16 md:pt-24">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:grid-cols-4">
        <Column title="Menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(link.href);
              }}
              className="w-fit transition-colors hover:text-accent-ink"
            >
              {link.label}
            </a>
          ))}
        </Column>
        <Column title="Contact">
          <a href={`mailto:${SITE.email}`} className="w-fit break-all transition-colors hover:text-accent-ink">
            {SITE.email}
          </a>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="w-fit transition-colors hover:text-accent-ink"
            >
              {social.label}
            </a>
          ))}
        </Column>
        <Column title="Local time">
          <span className="tabular-nums">{time}</span>
          <span className="text-muted">{SITE.location}</span>
        </Column>
        <div className="flex items-start md:justify-end">
          <button
            type="button"
            onClick={() => scrollToSection(0)}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-semibold transition-colors hover:border-fg"
          >
            Back to top
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Giant name whose letters rise into place */}
      <motion.p
        aria-hidden="true"
        className="mt-16 flex justify-between type-display text-[18vw] leading-[0.82] md:mt-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {SITE.name.split('').map((letter, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              variants={{
                hidden: { y: '100%' },
                show: { y: '0%', transition: { duration: 1, ease: EASE_OUT, delay: i * 0.05 } },
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </motion.p>

      <div className="mt-6 flex flex-col justify-between gap-2 type-label text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span>Designed &amp; built by {SITE.name}</span>
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 type-label text-muted">{title}</p>
      {children}
    </div>
  );
}
