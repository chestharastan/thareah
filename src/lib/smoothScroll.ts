import Lenis from 'lenis';

let lenis: Lenis | null = null;

/** Smooth mouse-wheel scrolling for the whole page. Touch scrolling stays native. */
export function startSmoothScroll() {
  if (lenis) return;
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
}

/** Smoothly scroll to a selector like '#work', or to a pixel position */
export function scrollToSection(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4 });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

/** Freeze the page while a popup or the mobile menu is open */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
