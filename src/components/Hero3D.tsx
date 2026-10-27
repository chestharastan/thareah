import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import type { LogoScene } from '../three/logoScene';

/**
 * The 3D logo in the hero. Three.js is downloaded in the background, so the
 * page appears first and the logo spins in when it's ready.
 */
export default function Hero3D({
  ready,
  progress,
  className = '',
}: {
  ready: boolean;
  progress: MotionValue<number>;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<LogoScene | null>(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const still = useReducedMotion() ?? false;

  useEffect(() => {
    let cancelled = false;
    import('../three/logoScene')
      .then(({ createLogoScene }) => {
        if (cancelled || !canvasRef.current) return;
        const scene = createLogoScene(canvasRef.current, still);
        scene.setScroll(progress.get());
        if (readyRef.current) scene.reveal();
        sceneRef.current = scene;
      })
      .catch(() => {
        // No WebGL or the download failed: the hero simply shows without the 3D logo.
      });
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [still, progress]);

  useEffect(() => {
    if (ready) sceneRef.current?.reveal();
  }, [ready]);

  useMotionValueEvent(progress, 'change', (value) => sceneRef.current?.setScroll(value));

  // The canvas also floats up and shrinks a little while you scroll
  const y = useTransform(progress, [0, 1], ['0%', still ? '0%' : '-30%']);
  const scale = useTransform(progress, [0, 1], [1, still ? 1 : 0.75]);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ y, scale }}
      className={`pointer-events-none shrink-0 ${className}`}
    />
  );
}
