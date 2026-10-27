import {
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  NeutralToneMapping,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

export interface LogoScene {
  /** How far the hero has scrolled away, 0 → 1 */
  setScroll(progress: number): void;
  /** Grow the logo into view */
  reveal(): void;
  dispose(): void;
}

// The Thareah logo (same paths as Logo.tsx): an orange blob with a dark "t" mark
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 792.53 791.42">
<path d="m5.74,347.98c2.95-32.15,5.25-64.36,6.35-96.63C18.74,55.04,169.58,48.29,378.34,7.01c221.05-43.71,381.76,124.54,408.37,292.23,24.98,157.35-28.72,457.08-197.32,488.3-167.89,31.09-510.61-133.44-561.98-187.33C-8.02,563.05-1.58,427.75,5.74,347.98Z"/>
<path d="m318.8,452.55c0,41.06,31.32,76.2,72.29,78.87,23.42,1.52,44.78-7.4,59.92-22.54,14.02-14.02,22.71-33.37,22.71-54.76v-77.46h0c-15.43,0-27.94-12.51-27.94-27.94h0c0-15.43,12.51-27.94,27.94-27.94h55.87v131.22c0,71.24-55.06,131.56-126.21,135.27-76.86,4-140.47-57.16-140.47-133.15v-245.08h210.8v-55.87s55.87,0,55.87,0v111.75h-210.8v187.64Z"/>
</svg>`;
const SVG_CENTER = { x: 396.27, y: 395.71 };
const LOGO_WIDTH = 2.2; // in scene units

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

/**
 * A glossy 3D version of the Thareah logo inside two orbiting rings.
 * It only renders while it is on screen, and follows the mouse and the page scroll.
 */
export function createLogoScene(canvas: HTMLCanvasElement, reducedMotion: boolean): LogoScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  // Cap the resolution: sharp on retina screens, still light on phones
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 1.75));
  renderer.toneMapping = NeutralToneMapping;

  const scene = new Scene();
  // Soft studio reflections, generated in code (no image to download)
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 7;

  // ── Logo geometry (built in SVG units, then scaled down) ─────────────
  const { paths } = new SVGLoader().parse(LOGO_SVG);
  // SVG's y axis points down: turn the shapes over so the logo reads upright
  const toScene = (geometry: ExtrudeGeometry, z: number) =>
    geometry.translate(-SVG_CENTER.x, -SVG_CENTER.y, 0).rotateX(Math.PI).translate(0, 0, z);

  const blobGeometry = toScene(
    new ExtrudeGeometry(SVGLoader.createShapes(paths[0]), {
      depth: 110,
      bevelEnabled: true,
      bevelThickness: 34,
      bevelSize: 22,
      bevelSegments: 8,
      curveSegments: 32,
    }),
    55, // centre the blob's thickness on z = 0
  );
  // The "t" sits raised on the front, and again (mirrored) on the back like a coin
  const markGeometry = toScene(
    new ExtrudeGeometry(SVGLoader.createShapes(paths[1]), {
      depth: 24,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 4,
      bevelSegments: 3,
      curveSegments: 16,
    }),
    117,
  );
  const backMarkGeometry = markGeometry.clone().rotateY(Math.PI);

  const blobMaterial = new MeshPhysicalMaterial({ roughness: 0.24, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12 });
  const markMaterial = new MeshPhysicalMaterial({
    color: '#111110',
    roughness: 0.32,
    metalness: 0.1,
    clearcoat: 0.6,
  });

  const logo = new Group();
  logo.add(
    new Mesh(blobGeometry, blobMaterial),
    new Mesh(markGeometry, markMaterial),
    new Mesh(backMarkGeometry, markMaterial),
  );
  logo.scale.setScalar(LOGO_WIDTH / 792.53);

  const ringGeometry = new TorusGeometry(1.55, 0.026, 16, 180);
  const ringMaterial = new MeshPhysicalMaterial({ roughness: 0.25, metalness: 0.8, clearcoat: 1 });
  const innerRing = new Mesh(ringGeometry, ringMaterial);
  const outerRing = new Mesh(ringGeometry, ringMaterial);
  outerRing.scale.setScalar(1.12);

  const spinner = new Group(); // the logo's own spin and sway
  spinner.add(logo);
  const group = new Group(); // overall tilt and intro scale
  group.add(spinner, innerRing, outerRing);
  scene.add(group);

  // ── State ─────────────────────────────────────────────────────────
  let frameId = 0;
  let running = false;
  let onScreen = true;
  let lastFrame = 0;
  let time = 0;
  let revealedAt = -1;
  let scroll = 0;
  const pointer = { x: 0, y: 0 };
  const tilt = { x: 0, y: 0 };

  const draw = (delta = 0) => {
    const intro = revealedAt < 0 ? 0 : reducedMotion ? 1 : Math.min((time - revealedAt) / 1.6, 1);
    group.scale.setScalar(Math.max(0.0001, easeOutBack(intro)));

    // Ease towards the mouse position
    const follow = 1 - Math.exp(-delta * 4);
    tilt.x += (pointer.y * 0.35 - tilt.x) * follow;
    tilt.y += (pointer.x * 0.55 - tilt.y) * follow;
    group.rotation.set(tilt.x + scroll * 0.6, tilt.y, 0);

    // Gentle sway so the logo stays readable; spins in on reveal and turns once while you scroll
    const spinIn = (1 - easeOutCubic(intro)) * Math.PI * 3;
    spinner.rotation.set(
      Math.sin(time * 0.7) * 0.12,
      Math.sin(time * 0.5) * 0.45 + spinIn + scroll * Math.PI * 2,
      Math.sin(time * 0.4) * 0.05,
    );
    spinner.position.y = Math.sin(time * 1.2) * 0.06;
    innerRing.rotation.set(Math.PI / 2.3 + time * 0.25, time * 0.35, 0);
    outerRing.rotation.set(time * 0.2, Math.PI / 2.6 - time * 0.3, 0);

    renderer.render(scene, camera);
  };

  const tick = (now: number) => {
    const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 1 / 20) : 0;
    lastFrame = now;
    time += delta;
    draw(delta);
    frameId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || reducedMotion || !onScreen || document.hidden) return;
    running = true;
    lastFrame = 0;
    frameId = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frameId);
  };
  const redrawIfIdle = () => {
    if (!running) draw();
  };

  // ── Listeners ─────────────────────────────────────────────────────
  const applyTheme = () => {
    const css = getComputedStyle(document.documentElement);
    blobMaterial.color.set(css.getPropertyValue('--accent').trim());
    ringMaterial.color.set(css.getPropertyValue('--fg').trim());
    redrawIfIdle();
  };
  const themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    redrawIfIdle();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // Only animate while the canvas is visible and the tab is open
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) start();
    else stop();
  });
  visibilityObserver.observe(canvas);
  const onTabChange = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onTabChange);

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || reducedMotion) return;
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  applyTheme();
  resize();
  start();

  return {
    setScroll(progress) {
      if (reducedMotion) return;
      scroll = progress;
      redrawIfIdle();
    },
    reveal() {
      if (revealedAt < 0) revealedAt = time;
      redrawIfIdle();
    },
    dispose() {
      stop();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onTabChange);
      window.removeEventListener('pointermove', onPointerMove);
      blobGeometry.dispose();
      markGeometry.dispose();
      backMarkGeometry.dispose();
      ringGeometry.dispose();
      blobMaterial.dispose();
      markMaterial.dispose();
      ringMaterial.dispose();
      environment.dispose();
      renderer.dispose();
    },
  };
}
