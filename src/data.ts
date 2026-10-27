import type { Experience, Pillar, PillarId, Project, ProjectCategory, Service } from './types';

/* ──────────────────────────────────────────────────────────────────────
 *  All the text and projects on the site live in this file.
 *
 *  ➜ Add a new project
 *    1. Put its image in  public/images/work/
 *       (WebP or JPG, about 1400px wide, ideally under 300 KB)
 *    2. Copy one of the entries in PROJECTS below and edit it.
 *       - category:  'web' | 'ai' | 'branding' | 'poster'
 *       - featured:  true  → also shows in the "Selected work" scroller
 *       - cover:     optional 4:3 picture for cards (e.g. a mockup);
 *                    the project page still shows `image` and `gallery`
 *       - no image yet?    → leave `image` out and a cover is generated
 *    The project lists, filters and counters update automatically.
 * ────────────────────────────────────────────────────────────────────── */

export const SITE = {
  name: 'Thareah',
  location: 'Phnom Penh, Cambodia',
  timeZone: 'Asia/Phnom_Penh',
  email: 'dohloot@gmail.com',
  intro:
    "Hi, I'm Thareah, a freelance designer and full-stack developer. I build brands, websites and AI tools that look sharp and work smart.",
  // Words wrapped in *stars* are highlighted.
  statement:
    "I'm a designer who codes and a developer who designs. I help businesses turn ideas into *brands,* *websites* and *AI* *tools* that are clean, fast and genuinely useful.",
  // Paste your profile links here. Entries with an empty url are hidden.
  socials: [
    { label: 'Telegram', url: '' },
    { label: 'LinkedIn', url: '' },
    { label: 'GitHub', url: '' },
    { label: 'Behance', url: '' },
  ],
};

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'branding', label: 'Branding' },
  { id: 'poster', label: 'Poster' },
];

export const categoryLabel = (id: ProjectCategory) =>
  CATEGORIES.find((category) => category.id === id)?.label ?? id;

export const PILLARS: Pillar[] = [
  {
    id: 'design',
    title: 'Design',
    text: 'Logos, brand identities, posters and social media graphics.',
    categories: ['branding', 'poster'],
    showcase: ['poster-coffee', 'arcwave', 'poster-pchum-ben'],
  },
  {
    id: 'web',
    title: 'Web',
    text: 'Responsive websites, dashboards and full-stack web apps.',
    categories: ['web'],
  },
  {
    id: 'ai',
    title: 'AI',
    text: 'AI agents, RAG chatbots, OCR and workflow automation.',
    categories: ['ai'],
    showcase: ['khmer-ocr', 'diabetes-xai', 'knowledge-base-chatbot'],
  },
];

export const projectsInPillar = (id: PillarId) => {
  const pillar = PILLARS.find((p) => p.id === id);
  return PROJECTS.filter((project) => pillar?.categories.includes(project.category));
};

export const SERVICES: Service[] = [
  {
    title: 'Graphic Design',
    description:
      'Modern visual identities for businesses: logos, brand assets, marketing materials and social media graphics that communicate clearly.',
    deliverables: ['Logo & brand identity', 'Social media graphics', 'Posters, flyers & print'],
  },
  {
    title: 'Website Design',
    description:
      'Responsive, user-focused websites with clean layouts and engaging interactions that strengthen your brand.',
    deliverables: ['UI/UX design', 'Responsive layouts', 'Interactive prototypes'],
  },
  {
    title: 'Web App Development',
    description:
      'Scalable web apps with React, Next.js, Node.js and FastAPI, from dashboards to internal management systems.',
    deliverables: ['Admin dashboards', 'Business management systems', 'REST API integration'],
  },
  {
    title: 'AI Agent Development',
    description:
      'AI agents that automate workflows, answer customer questions and search your knowledge base with RAG, on Telegram or the web.',
    deliverables: ['Telegram AI bots', 'Web AI assistants', 'RAG & knowledge bases'],
  },
  {
    title: 'Telegram E-Commerce',
    description:
      'Sell directly inside Telegram: show products, take orders, handle customer requests and automate your sales workflow.',
    deliverables: ['Product catalog', 'Order management', 'Payments & notifications'],
  },
];

export const EXPERIENCE: Experience[] = [
  {
    year: '2026',
    title: 'Khmer OCR Research Pipeline',
    role: 'Computer Vision Research Assistant / Lead Developer',
    organization: 'Academic NLP Laboratories',
    description:
      'Leading deep learning experiments for Khmer layout analysis and for handwritten and printed text recognition on complex, degraded scans.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'OCR'],
  },
  {
    year: '2024 – 2025',
    title: 'Web Application Development',
    role: 'Full-Stack Developer',
    organization: 'Independent projects & client builds',
    description:
      'Built responsive front-ends, dashboards, REST APIs and full-stack platforms for business-facing web apps.',
    tech: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
  },
  {
    year: '2023',
    title: 'Face Recognition System',
    role: 'Computer Vision Engineer / Researcher',
    organization: 'Computer vision research projects',
    description:
      'Built a face recognition pipeline (detection, feature extraction and embedding comparison), the foundation for later OCR work.',
    tech: ['Python', 'OpenCV', 'Embeddings', 'Face detection'],
  },
];

export const PROJECTS: Project[] = [
  // ── Web ──────────────────────────────────────────────────────────────
  {
    id: 'solara-sands-resort',
    title: 'Solara Sands Resort',
    category: 'web',
    year: '2025',
    summary: 'Luxury resort website with a cinematic hero, suites, amenities and a booking-first layout.',
    description:
      'A polished, fully responsive marketing website for a luxury resort. A cinematic hero, room and amenity showcases and a booking-focused structure, with smooth scroll animations and fast delivery on Vercel.',
    image: '/images/work/solara-sands-resort.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vercel'],
    liveUrl: 'https://solara-sands-resort.vercel.app/',
    featured: true,
  },
  {
    id: 'novahq',
    title: 'NovaHQ',
    category: 'web',
    year: '2025',
    summary: 'Premium website for a business-center development, with editorial type and cinematic imagery.',
    description:
      'An immersive marketing website for NovaHQ, a Class A business center. Elegant editorial typography, cinematic photography and layered scroll reveals present the towers, offices and amenities. Fully responsive and deployed on Vercel.',
    image: '/images/work/novahq.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vercel'],
    liveUrl: 'https://novahq-livid.vercel.app/',
    featured: true,
  },
  {
    id: 'oceanhire',
    title: 'OceanHire',
    category: 'web',
    year: '2025',
    summary: 'Recruitment website for maritime and cruise careers.',
    description:
      'A recruitment website that connects skilled professionals with cruise lines and shipping companies. Clear calls to action, department overviews, an application section, FAQ and contact. Fully responsive and deployed on Vercel.',
    image: '/images/work/oceanhire.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://novahq-fzwo.vercel.app/',
  },
  {
    id: 'exhibition-sandbox',
    title: 'Exhibition Sandbox',
    category: 'web',
    year: '2025',
    summary: 'Interactive tool for planning retail and museum displays, with AI-generated layouts.',
    description:
      'A visual-merchandising playground inspired by Japanese minimalist display design. Curators arrange pedestals, lights and screens on a floor plan, and Gemini can suggest a complete exhibition layout, including lighting mood, colour palette and curator notes.',
    image: '/images/work/exhibition-sandbox.webp',
    tags: ['React', 'Motion', 'Tailwind CSS', 'Gemini API'],
  },

  // ── AI ───────────────────────────────────────────────────────────────
  {
    id: 'diabetes-xai',
    title: 'Explainable AI for Diabetes Risk',
    category: 'ai',
    year: '2025',
    summary: 'Interpretable machine learning that predicts diabetes risk and shows doctors why.',
    description:
      'A clinical decision-support prototype for community clinics. It predicts diabetes risk and uses SHAP explanations to turn each prediction into clear, visual insights about the patient’s biometrics, so doctors can see exactly why a risk score is high.',
    image: '/images/work/diabetes-xai-app.webp',
    tags: ['Python', 'SHAP / XAI', 'Scikit-learn', 'FastAPI', 'React', 'D3.js'],
    metrics: [
      { label: 'Accuracy', value: '96.4%' },
      { label: 'SHAP latency', value: '<15 ms' },
    ],
    featured: true,
  },
  {
    id: 'khmer-ocr',
    title: 'Deep Khmer OCR',
    category: 'ai',
    year: '2024',
    summary: 'Deep learning OCR for the complex Khmer script: printed, handwritten and historical scans.',
    description:
      'An OCR pipeline built for Khmer text, including handwritten and historical documents. It combines U-Net segmentation with projection-profile analysis to separate stacked glyphs, improving accuracy on low-contrast and damaged scans.',
    image: '/images/work/khmer-ocr-scan.webp',
    tags: ['PyTorch', 'OpenCV', 'CUDA', 'TypeScript'],
    metrics: [
      { label: 'Segmentation', value: '94.6%' },
      { label: 'CUDA speed-up', value: '3.4×' },
    ],
    featured: true,
  },
  {
    id: 'knowledge-base-chatbot',
    title: 'AI Knowledge Base Chatbot',
    category: 'ai',
    year: '2025',
    summary: 'Private, local-first RAG assistant that answers company questions with cited sources.',
    description:
      'An enterprise knowledge assistant that pairs local vector search with Gemini’s reasoning. Smart document chunking and self-correcting queries deliver accurate answers with source citations, while company data stays private.',
    image: '/images/work/knowledge-base-chatbot.webp',
    tags: ['LlamaIndex', 'Gemini', 'ChromaDB', 'Node.js', 'Express'],
    metrics: [
      { label: 'Retrieval recall', value: '98.2%' },
      { label: 'Context window', value: '128K' },
    ],
  },

  // ── Branding ─────────────────────────────────────────────────────────
  {
    id: 'cafe-bean-harmony',
    title: 'Cafe Bean Harmony',
    category: 'branding',
    year: '2026',
    summary: 'Warm coffee-shop identity: cup, steam and leaves in one circular mark.',
    description:
      'Logo design for Cafe Bean Harmony. The circular mark brings together a coffee cup, rising steam and coffee leaves, symbolising warmth, aroma and the quality of the beans.',
    image: '/images/work/cafe-bean-harmony.webp',
    cover: '/images/work/cafe-bean-harmony-cover.webp',
    gallery: ['/images/work/cafe-bean-harmony-mark.webp', '/images/work/cafe-bean-harmony-story.webp'],
    tags: ['Logo', 'Brand identity', 'Mockups'],
    featured: true,
  },
  {
    id: 'arcwave',
    title: 'ArcWave Solution',
    category: 'branding',
    year: '2025',
    summary: 'Bold, forward-moving logo built on a precise construction grid.',
    description:
      'Brand identity for ArcWave Solution. The arrow-like mark is drawn on a strict circular grid and works in colour, black and reverse. Shown here on stationery and storefront signage.',
    image: '/images/work/arcwave.webp',
    cover: '/images/work/arcwave-cover.webp',
    gallery: [
      '/images/work/arcwave-logo.webp',
      '/images/work/arcwave-grid.webp',
      '/images/work/arcwave-mono.webp',
      '/images/work/arcwave-paper.webp',
    ],
    tags: ['Logo', 'Brand identity', 'Grid system', 'Signage'],
    featured: true,
  },
  {
    id: 'bespire',
    title: 'BeSpire',
    category: 'branding',
    year: '2025',
    summary: 'Identity for BeSpire, a business growth & strategy platform.',
    description:
      'Logo and brand guidelines for BeSpire, a business growth and strategy platform. A geometric mark, a defined colour palette and a construction grid keep the brand consistent across web and mobile.',
    image: '/images/work/bespire.webp',
    cover: '/images/work/bespire-cover.webp',
    gallery: ['/images/work/bespire-guide.webp', '/images/work/bespire-grid.webp'],
    tags: ['Logo', 'Brand guidelines', 'Colour palette'],
  },
  {
    id: 'rumduol',
    title: 'Rumduol',
    category: 'branding',
    year: '2024',
    summary: 'Identity inspired by the Rumduol, Cambodia’s national flower.',
    description:
      'A brand identity inspired by the Rumduol flower: soft botanical shapes, warm yellows and refined typography, applied across stationery and print.',
    image: '/images/work/rumduol.webp',
    cover: '/images/work/rumduol-cover.webp',
    tags: ['Logo', 'Brand identity', 'Stationery'],
  },
  {
    id: 'editorial-brand-system',
    title: 'Editorial Brand System',
    category: 'branding',
    year: '2024',
    summary: 'Catalogue and brand assets built on Swiss grids, white space and a clear type hierarchy.',
    description:
      'A design system for a printed catalogue and brand-asset package: high-contrast typography, hairline rules, generous white space and a strict grid that scales from mobile posts to large posters.',
    tags: ['Typography', 'Grid systems', 'Brand book'],
  },

  // ── Posters ──────────────────────────────────────────────────────────
  {
    id: 'poster-victory-day',
    title: 'Victory Over Genocide Day',
    category: 'poster',
    year: '2026',
    summary: 'Commemorative poster for the 47th anniversary of 7 January.',
    description:
      'A commemorative poster for the 47th anniversary of Victory Over Genocide Day (7 January 1979 – 2026), with bilingual Khmer–English typography, the national colours and doves of peace.',
    image: '/images/work/poster-victory-day.webp',
    cover: '/images/work/poster-victory-day-cover.webp',
    tags: ['Poster', 'Khmer typography', 'Social media'],
  },
  {
    id: 'poster-coffee',
    title: 'Another Cup of Coffee',
    category: 'poster',
    year: '2025',
    summary: 'Product poster for a coffee brand, made with Adobe Firefly and Photoshop.',
    description:
      '“Another day, another cup of coffee.” A product poster for a coffee brand, with cups on natural stone, warm light and minimal type. Created with Adobe Firefly and Adobe Photoshop.',
    image: '/images/work/poster-coffee.webp',
    cover: '/images/work/poster-coffee-cover.webp',
    tags: ['Poster', 'Adobe Firefly', 'Photoshop'],
  },
  {
    id: 'poster-womens-day',
    title: 'International Women’s Day',
    category: 'poster',
    year: '2025',
    summary: 'Poster celebrating the strength and achievements of women.',
    description:
      'A poster for International Women’s Day (8 March), with soft pinks, botanical line art and elegant type honouring the strength and achievements of women.',
    image: '/images/work/poster-womens-day.webp',
    cover: '/images/work/poster-womens-day-cover.webp',
    tags: ['Poster', 'Illustration', 'Social media'],
  },
  {
    id: 'poster-coronation-day',
    title: 'Coronation Day',
    category: 'poster',
    year: '2024',
    summary: 'Poster for the 20th anniversary of King Norodom Sihamoni’s coronation.',
    description:
      'A celebratory poster for the 20th anniversary of the coronation of His Majesty King Norodom Sihamoni, with warm golden light, the royal coat of arms and formal Khmer typography.',
    image: '/images/work/poster-coronation-day.webp',
    cover: '/images/work/poster-coronation-day-cover.webp',
    tags: ['Poster', 'Khmer typography', 'Photo compositing'],
  },
  {
    id: 'poster-pchum-ben',
    title: 'Pchum Ben Festival',
    category: 'poster',
    year: '2024',
    summary: 'Festival poster for Pchum Ben, the Khmer ancestors’ day.',
    description:
      'A poster for Pchum Ben, the Khmer festival honouring ancestors, with traditional offerings, lotus flowers and bright festive Khmer lettering.',
    image: '/images/work/poster-pchum-ben.webp',
    cover: '/images/work/poster-pchum-ben-cover.webp',
    tags: ['Poster', 'Khmer typography', 'Photo compositing'],
  },
];
