# Thareah — Freelance Portfolio

Portfolio for Thareah, a freelance designer and full-stack developer in Phnom Penh: branding & posters, websites and AI tools.

Light mode by default, with a dark mode toggle. Fully responsive, with smooth scrolling and scroll animations
(a 3D logo in the hero, text that slides left/right, a sideways "Selected work" scroller).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 (or the next free port)
```

Production:

```bash
npm run build
npm run start
```

## Add a project

Everything on the site (text, services, experience, projects) lives in **`src/data.ts`**.

1. Put the image in `public/images/work/` — WebP or JPG, about 1400px wide, ideally under 300 KB.
2. Copy an entry in `PROJECTS` and edit it:
   - `category`: `'web'`, `'ai'`, `'branding'` or `'poster'`
   - `featured: true` also shows it in the "Selected work" scroller
   - `cover`: optional 4:3 picture for cards and lists (e.g. a mockup); the project page still shows `image`
   - `gallery`: extra images shown when the project is opened
   - no image yet? Leave `image` out and a cover is generated

Lists, filters and counters update automatically.

Other things you can set in `src/data.ts`: your email and social links (`SITE.socials`), and which three
projects are pictured on the Design / Web / AI cards (`showcase` in `PILLARS`).

## Structure

```
src/
  data.ts            all content
  App.tsx            page order
  components/        one file per section (Hero, TextRows, About, FeaturedWork, ProjectIndex,
                     DesignGallery, Services, Experience, Contact, Footer, …)
  three/             the 3D logo (Three.js, loaded in the background)
  lib/               smooth scrolling (Lenis) and small helpers
public/images/work/  project images
```

## Tech

React 19, TypeScript, Tailwind CSS 4, Motion, Three.js, Lenis, Vite, Express.

© 2026 Thareah. All rights reserved.
