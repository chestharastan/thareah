/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, SkillCategory, ResearchPaper, TimelineEvent } from './types';

export const HERO_INFO = {
  name: "Thareah",
  title: "I build with data & AI",
  subtitle: "Engineer, builder, perpetual learner.",
  tagline: "Bridging the gap between mathematical accuracy and architectural elegance. Crafting high-fidelity, secure intelligent software systems.",
  location: "Phnom Penh, Cambodia",
  availability: "Available for elite consulting & spatial engineering",
  galleryHeroImage: "/src/assets/images/spatial_gallery_hero_1780197905791.png"
};

export const PROJECTS: Project[] = [
  {
    id: "diabetes-xai",
    title: "Explainable AI for Diabetes Risk",
    subtitle: "Interpretable Healthcare Decision Systems",
    category: "Machine Learning / Clinical Tech",
    projectType: "ai",
    year: "2025",
    description: "Integrated risk factor prediction using interpretable ML networks tailored specifically for low-resource regional clinics.",
    longDescription: "Developed and commercialized an Explainable AI (XAI) clinical prototype that empowers community physicians to predict high-incidence diabetes risks. Utilizing state-of-the-art SHAP (SHapley Additive exPlanations) values and local surrogate tree classifiers, the system turns opaque neural risk predictions into clear, visual, action-ready insights regarding patient biometrics.",
    tags: ["Python", "XAI / SHAP", "Scikit-Learn", "FastAPI", "React", "D3.js"],
    image: "/src/assets/images/medical_ai_display_1780197943001.png",
    accentColor: "emerald",
    metrics: [
      { label: "Accuracy", value: "96.4%" },
      { label: "SHAP Latency", value: "<15ms" },
      { label: "Clinical Utility", value: "A Grade" }
    ]
  },
  {
    id: "khmer-ocr",
    title: "Deep Khmer OCR System",
    subtitle: "Deep Neural Optical Character Recognition",
    category: "Computer Vision / Deep Learning",
    projectType: "ai",
    year: "2024",
    description: "A specialized deep learning OCR engine for the complex Khmer script, with custom visual character segmentation strategies.",
    longDescription: "Engineered a production-ready Optical Character Recognition (OCR) framework targeting historical and handwritten Khmer texts. Designed a novel visual character segmentation pipeline combining U-Net pixel-wise contours with traditional projection profile analyses, raising transcription accuracies across high-bleed, low-contrast historical parchment scans.",
    tags: ["PyTorch", "OpenCV", "CUDA Engine", "TypeScript", "TailwindCSS"],
    image: "/src/assets/images/text_ocr_display_1780197926426.png",
    accentColor: "amber",
    metrics: [
      { label: "Segment Delta", value: "94.6%" },
      { label: "CUDA Speedup", value: "3.4x" },
      { label: "Training Epochs", value: "240" }
    ]
  },
  {
    id: "kb-rag",
    title: "AI Knowledge Base Chatbot",
    subtitle: "Local-First Enterprise Retrieval-Engine",
    category: "NLP & Retrieval-Augmented Generation",
    projectType: "ai",
    year: "2025",
    description: "A private, zero-leak enterprise knowledge search pipeline using secure local-first vector quantization and Gemini APIs.",
    longDescription: "Designed an air-gapped enterprise search proxy combining highly compressed sparse-dense vector retrievers with Gemini's reasoning layers. Created dynamic document chunking strategies and self-correcting query pipelines to achieve high-fidelity corporate search answers with verifiable origin citation badges.",
    tags: ["LlamaIndex", "Gemini Pro", "ChromaDB", "NodeJS", "Express"],
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=600&q=80",
    accentColor: "sky",
    metrics: [
      { label: "Retrieval Recall", value: "98.2%" },
      { label: "Context Window", value: "128K" },
      { label: "Halving Error", value: "11x" }
    ]
  },
  {
    id: "vmd-sandbox",
    title: "Interactive Exhibition Sandbox",
    subtitle: "Visual Merchandising & Curation Logic Engine",
    category: "Spatial Design / Interaction CSS",
    projectType: "design",
    year: "2025",
    description: "An advanced, interactive visual merchandising display curator that maps physical layout proportions with mathematical harmony.",
    longDescription: "Styled on elegant Swiss grids and Japanese minimalist space layouts (Pearl Idea inspired), this interactive design platform lets curators drag, drop, and configure museum-grade pedestals, lighting sources, and display screens using physical dimensions mapped smoothly inside React states.",
    tags: ["Framer Motion", "React Hooks", "Boutique Styling", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    accentColor: "amber",
    metrics: [
      { label: "Proportions", value: "Perfect Phi" },
      { label: "Render Time", value: "<8ms" },
      { label: "Layout Elements", value: "15+ Types" }
    ]
  },
  {
    id: "pearl-editorial",
    title: "Minimalist Brand Curation & Editorial Typo",
    subtitle: "High-Contrast Luxury Guidelines",
    category: "Brand Curation / Graphic Design",
    projectType: "design",
    year: "2024",
    description: "A physical catalog and design asset package utilizing Swiss-school grids, generous negative space, and Japanese text hierarchies.",
    longDescription: "Formulated a custom design system centered on high-contrast display serif typography paired with strict hairline borders and elegant off-white canvas values. Deployed dynamic, scale-invariant text systems that look flawless from mobile feeds up to grand physical poster grids.",
    tags: ["Typography", "Grid Systems", "Vector Assets", "Brand Book"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    accentColor: "zinc",
    metrics: [
      { label: "Font Combiners", value: "3 Core" },
      { label: "Grid Alignment", value: "Strict Swiss" },
      { label: "Color Palette", value: "Dual Tone" }
    ]
  },
  {
    id: "solara-sands-resort",
    title: "Solara Sands Resort",
    subtitle: "Luxury Hospitality Web Experience",
    category: "Web Application / Frontend",
    projectType: "webdev",
    year: "2025",
    description: "A polished, fully responsive marketing and booking website for a luxury beachfront resort, built and deployed on Vercel.",
    longDescription: "Designed and shipped an immersive front-of-house web experience for a luxury sands resort. Features a cinematic hero, room and amenity showcases, and a clean booking-oriented information architecture with motion-driven scroll interactions, all optimized for fast global edge delivery on Vercel.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    accentColor: "amber",
    liveUrl: "https://solara-sands-resort.vercel.app/",
    metrics: [
      { label: "Deployment", value: "Vercel Edge" },
      { label: "Responsive", value: "100%" },
      { label: "Lighthouse", value: "A Grade" }
    ]
  },
  {
    id: "novahq-platform",
    title: "NovaHQ Workspace Platform",
    subtitle: "SaaS Operations Dashboard — Work in Progress",
    category: "Web Application / Frontend",
    projectType: "webdev",
    year: "2025",
    description: "An early-stage SaaS workspace dashboard, currently iterating on layout and visual design, deployed on Vercel.",
    longDescription: "An in-progress build of NovaHQ, a team operations platform. The core layout, feature sections, and routing are in place, with active iteration on the visual design and interaction polish. Deployed continuously to Vercel as the design matures.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vercel"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    accentColor: "sky",
    liveUrl: "https://novahq-fzwo.vercel.app/",
    metrics: [
      { label: "Status", value: "In Progress" },
      { label: "Deployment", value: "Vercel" },
      { label: "Design", value: "Iterating" }
    ]
  },
  {
    id: "novahq-studio",
    title: "NovaHQ Studio",
    subtitle: "Product Marketing & Brand Experience",
    category: "Web Application / Frontend",
    projectType: "webdev",
    year: "2025",
    description: "A refined marketing companion site for the NovaHQ brand, showcasing product storytelling with cinematic motion, deployed on Vercel.",
    longDescription: "Built an immersive brand and product storytelling experience for NovaHQ Studio. Combines bold editorial typography, layered scroll reveals, and a clean component-driven layout to communicate product value, all engineered for crisp responsiveness and fast edge delivery on Vercel.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    accentColor: "emerald",
    liveUrl: "https://novahq-livid.vercel.app/",
    metrics: [
      { label: "Deployment", value: "Vercel Edge" },
      { label: "Responsive", value: "100%" },
      { label: "Lighthouse", value: "A Grade" }
    ]
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming-ai",
    title: "Programming & Intelligent Automation",
    description: "The core stack used to design models, parse multidimensional spaces, and script intelligent microservices.",
    skills: [
      { name: "Python / PyTorch", level: 92, description: "Advanced deep learning architecture modeling & tensor workflows." },
      { name: "TypeScript / ESM Node", level: 95, description: "Production full-stack service deployment." },
      { name: "SQL & Relational Logic", level: 88, description: "Complex recursive schemas & query optimization." },
      { name: "Scikit-Learn & Math Specs", level: 90, description: "Statistical machine learning, regression, clustering models." }
    ]
  },
  {
    id: "web-dev",
    title: "Sleek Web Construction & Visual Merchandising",
    description: "Creating highly visual, crisp, structural user interfaces matching Swiss grid and luxury design guidelines.",
    skills: [
      { name: "React 19 & Vite Engine", level: 96, description: "Asynchronous component design and hook architectures." },
      { name: "Tailwind CSS & Spatial Grids", level: 98, description: "Flawless screen padding and micro-interaction margins." },
      { name: "Motion (React Animation)", level: 92, description: "Staggered transitions and cinematic page scroll events." },
      { name: "D3.js / WebGL Visualizers", level: 85, description: "Scientific canvas plotting and dynamic coordinate grids." }
    ]
  },
  {
    id: "data-infra",
    title: "Enterprise Infrastructure & Scalability",
    description: "Handling multi-gigabyte transaction streams without data gaps or replication bottlenecks.",
    skills: [
      { name: "PostgreSQL & Vector Indexes", level: 90, description: "Transactional stability and high-dimension search embedding." },
      { name: "Docker & Docker Compose", level: 88, description: "Standardized containerization and localized micro-networks." },
      { name: "Apache Airflow / DBT pipelines", level: 84, description: "Scalable directed acyclic graphs for data extraction." },
      { name: "Google Cloud Platform", level: 86, description: "Cloud Run containers and serverless IAM governance." }
    ]
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "diabetes-predict-low-resource",
    title: "Explainable AI for Diabetes Risk Prediction in Low-Resource Settings",
    question: "How do we deploy deep classifier confidence and interpretable surrogate models into areas lacking broadband, high-tier hardware, or advanced specialist clinicians?",
    abstract: "This paper outlines a localized decision support system leveraging lightweight Tree-ensembles and SHAP algorithms. By compressing modeling structures to execute clientside inside local tablets without network connection, we maintain premium clinical classification accuracies (>95%) while outputting human-readable tree structures explaining specific warning boundaries.",
    venue: "Journal of Medical Systems & Digital Health",
    year: "2025",
    tags: ["XAI", "Tree-Ensembles", "Clinical UX", "Low-Resource Systems"]
  },
  {
    id: "khmer-ocr-segmentation",
    title: "Segmentation Strategies for Khmer OCR: A Comparative Study of DL and Heuristic Approaches",
    question: "Can hybrid projection heuristic algorithms resolve text bleed and compound character stacking boundaries in medieval character scans?",
    abstract: "Khmer script is highly sophisticated, utilizing sub-characters, baseline vowels, and complex vertical glyph piles. This study conducts an exhaustive architectural comparative matrix between full-pixel neural net segmenters (U-Net) and coordinate bounding-box projections. We introduce a hybrid projection-bounding segmenter which reduces word bleed-over by 14.2% while consuming 40% less memory.",
    venue: "Indo-China NLP Symposium & Archive",
    year: "2024",
    tags: ["OCR", "Computer Vision", "Khmer Script", "Document Analysis"]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "2025",
    title: "AI Student Circle — Cambodia",
    role: "Co-Founder & Lead Instructor",
    organization: "AI Student Circle",
    description: "Created and launched Cambodia's premiere student-led AI development circle. Designed core syllabi, secured regional sponsorship, and lectured on practical deep learning to over 140+ student software engineers, concluding with a national generative-art hackathon."
  },
  {
    year: "2024",
    title: "Lead Intelligence Engineer",
    role: "Data Infrastructure Architect",
    organization: "Dev-Studio Cambodia",
    description: "Designed secure compliance pipelines for enterprise microcredit and blockchain ledgers. Pioneered structural audit systems processing millions of transactions, ensuring zero data discrepancies or unauthorized records."
  },
  {
    year: "2023",
    title: "Research Assistant & Vision Coder",
    role: "OpenCV Researcher",
    organization: "Academic NLP Laboratories",
    description: "Pioneered neural-net based text segmentation algorithms handling Khmer scripts and historical palm-leaf manuscripts. Developed novel high-frequency heuristics that significantly accelerated handwriting analysis."
  }
];
