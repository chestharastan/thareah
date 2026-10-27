import { useCallback, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'motion/react';
import type { PillarId, Project } from './types';
import { scrollToSection } from './lib/smoothScroll';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import TextRows from './components/TextRows';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import ProjectIndex from './components/ProjectIndex';
import DesignGallery from './components/DesignGallery';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

const PRELOADER_SEEN = 'preloader-seen';

function preloaderSeen() {
  try {
    return sessionStorage.getItem(PRELOADER_SEEN) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const [ready, setReady] = useState(preloaderSeen);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [projectFilter, setProjectFilter] = useState<'all' | PillarId>('all');

  // Clicking a Design / Web / AI card shows those projects in the list
  const showPillar = useCallback((id: PillarId) => {
    setProjectFilter(id);
    scrollToSection('#projects');
  }, []);

  const finishLoading = useCallback(() => {
    try {
      sessionStorage.setItem(PRELOADER_SEEN, '1');
    } catch {
      // Storage can be blocked; the preloader will simply show again next time.
    }
    setReady(true);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Preloader key="preloader" onDone={finishLoading} />}</AnimatePresence>

      <Header />
      <main className="overflow-x-clip">
        <Hero ready={ready} />
        <TextRows />
        <About onSelectPillar={showPillar} />
        <FeaturedWork onOpen={setOpenProject} />
        <ProjectIndex filter={projectFilter} onFilterChange={setProjectFilter} onOpen={setOpenProject} />
        <DesignGallery onOpen={setOpenProject} />
        <Services />
        <Experience />
        <Contact />
      </main>
      <Footer />

      <AnimatePresence>
        {openProject && (
          <ProjectModal
            key="project"
            project={openProject}
            onClose={() => setOpenProject(null)}
            onSelect={setOpenProject}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
