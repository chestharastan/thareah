import { useEffect, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NAV_LINKS, SITE } from '../data';
import { scrollToSection, setScrollLocked } from '../lib/smoothScroll';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { EASE_OUT } from './ui';

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide the header while scrolling down, bring it back when scrolling up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > previous && y > 300);
  });

  const goTo = (href: string) => (event: MouseEvent) => {
    event.preventDefault();
    if (menuOpen) {
      setScrollLocked(false);
      setMenuOpen(false);
    }
    scrollToSection(href);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? '-130%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 page-x pt-3 md:pt-4"
      >
        <div
          className={`flex items-center justify-between gap-3 rounded-full border p-1.5 transition-[background-color,border-color] duration-500 ${
            scrolled || menuOpen ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={goTo('#top')}
            aria-label={`${SITE.name}, back to top`}
            className="flex items-center gap-2.5 rounded-full pr-2"
          >
            <Logo className="size-9 md:size-10" />
            <span className="text-sm font-extrabold uppercase tracking-tight">
              {SITE.name}
              <sup className="ml-0.5 text-[0.6em]">©</sup>
            </span>
          </a>

          <nav aria-label="Main" className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={goTo(link.href)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-fg/[0.07]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href="#contact"
              onClick={goTo('#contact')}
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.04] sm:inline-flex"
            >
              Let's talk
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="h-10 rounded-full bg-fg px-4 text-sm font-semibold text-bg md:hidden"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu goTo={goTo} />}</AnimatePresence>
    </>
  );
}

function MobileMenu({ goTo }: { goTo: (href: string) => (event: MouseEvent) => void }) {
  useEffect(() => {
    setScrollLocked(true);
    return () => setScrollLocked(false);
  }, []);

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-40 flex flex-col justify-between bg-bg page-x pb-8 pt-28 md:hidden"
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      <nav aria-label="Mobile" className="flex flex-col">
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={goTo(link.href)}
            className="flex items-end justify-between border-b border-line py-3"
          >
            <span className="overflow-hidden">
              <motion.span
                className="block type-display text-[clamp(3rem,15vw,6rem)]"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
              >
                {link.label}
              </motion.span>
            </span>
            <span className="type-label pb-2 text-muted">0{i + 1}</span>
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-1 text-sm text-muted">
        <a href={`mailto:${SITE.email}`} className="text-base font-semibold text-fg">
          {SITE.email}
        </a>
        <span>{SITE.location}</span>
      </div>
    </motion.div>
  );
}
