import { useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { Moon, Sun } from 'lucide-react';

const BROWSER_BAR_COLOR = { light: '#f2f1ec', dark: '#0f0f0e' };

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next = !isDark;
    const apply = () => {
      document.documentElement.classList.toggle('dark', next);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next ? BROWSER_BAR_COLOR.dark : BROWSER_BAR_COLOR.light);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Storage can be blocked (private mode); the theme still switches.
      }
      flushSync(() => setIsDark(next));
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('startViewTransition' in document) || reduceMotion) {
      apply();
      return;
    }

    // Reveal the new theme in a circle that grows from the button
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 700,
          easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-300 hover:bg-fg hover:text-bg"
    >
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
