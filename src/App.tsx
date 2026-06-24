/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";

import { ExhibitionLayout } from "./types";
import { SKILL_CATEGORIES, RESEARCH_PAPERS, TIMELINE } from "./data";

import Header from "./components/Header";
import ExhibitionSandbox from "./components/ExhibitionSandbox";
import TimelineSection from "./components/TimelineSection";

import IntroCollage from "./components/IntroCollage";
import AboutMeSection from "./components/AboutMeSection";
import WebDevDashboard from "./components/WebDevDashboard";
import AISystemsHub from "./components/AISystemsHub";
import PortfolioHub from "./components/PortfolioHub";
import RecruitmentBanner from "./components/RecruitmentBanner";
import ServiceSection from "./components/ServiceSection";
import ContactSection from "./components/ContactSection";

const getRoomGroupKey = (room: string) => {
  if (
    ["overview", "service", "about", "chrono", "portfolio", "contact"].includes(
      room,
    )
  )
    return "intro";
  return room;
};

export default function App() {
  const PORTFOLIO_SCROLL_JOURNEY = 1200;
  const [activeRoom, setActiveRoom] = useState<string>("overview");
  const [activeSubTab, setActiveSubTab] = useState<string>("");
  const [isHoveredBack, setIsHoveredBack] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1);
  const [isBlackFading, setIsBlackFading] = useState<boolean>(false);

  const [activeResearchId, setActiveResearchId] = useState<string | null>(
    "diabetes-predict-low-resource",
  );
  const [currentDesignTheme, setCurrentDesignTheme] = useState<string>(
    "ARCH-AI SYNERGY EXPO",
  );

  // Track viewport dimensions to calculate mobile auto scale values
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  const [screenHeight, setScreenHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  const profileScrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const isComingBackFromHubRef = useRef<boolean>(false);

  // DOM refs for scroll-driven transition — avoids React re-renders on every scroll tick
  const chronoSectionRef = useRef<HTMLDivElement>(null);
  const portfolioClipRef = useRef<HTMLDivElement>(null);
  const recruitmentLayerRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);

  const setProfileScrollRef = (node: HTMLDivElement | null) => {
    (profileScrollRef as any).current = node;

    if (node && isComingBackFromHubRef.current) {
      isComingBackFromHubRef.current = false;
      isProgrammaticScrollRef.current = false;
      const portfolioEl = document.getElementById("portfolio-section");
      if (portfolioEl) {
        node.scrollTop = portfolioEl.offsetTop + PORTFOLIO_SCROLL_JOURNEY;
        applyScrollProgress(1, 1);
      } else {
        setTimeout(() => {
          const portfolioElRetry = document.getElementById("portfolio-section");
          if (portfolioElRetry) {
            node.scrollTop = portfolioElRetry.offsetTop + PORTFOLIO_SCROLL_JOURNEY;
            applyScrollProgress(1, 1);
          }
        }, 50);
      }
    }
  };

  // Premium custom programmatic scrolling engine with slow, cinematic ease-out-cubic deceleration
  const animateScrollTo = (
    container: HTMLDivElement,
    targetTop: number,
    duration: number = 2200,
    callback?: () => void,
  ) => {
    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    if (distance === 0) {
      if (callback) callback();
      return;
    }
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Slow, luxurious ease-in-out curve
      const t = progress;
      const easeInOutCubic =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      container.scrollTop = startTop + distance * easeInOutCubic;

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        container.scrollTop = targetTop; // exact docking
        if (callback) callback();
      }
    };

    requestAnimationFrame(step);
  };

  // Resilient, smooth-scroll helper that waits for layout loading elements before executing the scroll
  const runProgrammaticScroll = (
    targetId: string | null,
    offsetDelta: number = 0,
    duration: number = 2000,
  ) => {
    isProgrammaticScrollRef.current = true;

    const tryScroll = () => {
      if (!profileScrollRef.current) return false;

      if (targetId === null) {
        animateScrollTo(profileScrollRef.current, 0, duration, () => {
          isProgrammaticScrollRef.current = false;
        });
        return true;
      }

      const element = document.getElementById(targetId);
      if (element) {
        animateScrollTo(
          profileScrollRef.current,
          element.offsetTop + offsetDelta,
          duration,
          () => {
            isProgrammaticScrollRef.current = false;
          },
        );
        return true;
      }
      return false;
    };

    setTimeout(() => {
      if (!tryScroll()) {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          const done = tryScroll();
          if (done || attempts > 15) {
            clearInterval(interval);
            if (!done) {
              isProgrammaticScrollRef.current = false;
            }
          }
        }, 50);
      }
    }, 20);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth < 768;
  const currentMobileScale = isMobile
    ? Math.min(1, (screenWidth - 20) / 1120)
    : 1;

  const handleLayoutGenerated = (layout: ExhibitionLayout) => {
    setCurrentDesignTheme(layout.theme);
  };

  // Direct DOM style updates — zero React re-renders during the scroll transition
  const applyScrollProgress = (
    circleProgress: number,
    overallProgress: number,
  ) => {
    if (chronoSectionRef.current) {
      chronoSectionRef.current.style.opacity = String(
        Math.max(0, 1 - overallProgress / 0.35),
      );
    }
    if (portfolioClipRef.current) {
      const el = portfolioClipRef.current;
      const inset = (1 - circleProgress) * 50;
      el.style.clipPath =
        circleProgress >= 0.96 ? "none" : `inset(${inset}% 0% ${inset}% 0%)`;
      el.style.opacity = circleProgress === 0 ? "0" : "1";
      el.style.transform = `scale(${0.97 + circleProgress * 0.03})`;
      el.style.pointerEvents = circleProgress > 0.85 ? "auto" : "none";
    }
    if (recruitmentLayerRef.current) {
      const el = recruitmentLayerRef.current;
      el.style.opacity = String(Math.max(0, 1 - circleProgress * 1.5));
      el.style.transform = `scale(${1 - circleProgress * 0.08})`;
      el.style.pointerEvents = circleProgress < 0.25 ? "auto" : "none";
    }
    if (glowRingRef.current) {
      const el = glowRingRef.current;
      if (circleProgress > 0 && circleProgress < 0.96) {
        el.style.opacity = String(Math.max(0, 1 - circleProgress * 2));
      } else {
        el.style.opacity = "0";
      }
    }
  };

  const handleProfileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const clientHeight = target.clientHeight;
    const scrollTop = target.scrollTop;

    const serviceEl = document.getElementById("service-section");
    const aboutEl = document.getElementById("about-section");
    const chronoEl = document.getElementById("chrono-section");
    const portfolioEl = document.getElementById("portfolio-section");
    const contactEl = document.getElementById("contact-section");

    // High fidelity scroll-linked circle zoom transition mapping matching Pearl Idea Recruit
    if (chronoEl && portfolioEl) {
      const triggerStart = portfolioEl.offsetTop;
      const totalScrollArea = PORTFOLIO_SCROLL_JOURNEY; // Shorter journey so the contact section arrives sooner.
      const delayScroll = 500; // Scroll down 500px through Recruitment Banner first before the portal circle starts to expand
      const transitionLength = totalScrollArea - delayScroll;
      const triggerEnd = triggerStart + totalScrollArea;

      if (scrollTop < triggerStart) {
        applyScrollProgress(0, 0);
      } else if (scrollTop >= triggerEnd) {
        applyScrollProgress(1, 1);
      } else {
        const currentRelativeScroll = scrollTop - triggerStart;
        const overallProgress = currentRelativeScroll / totalScrollArea;
        let progress = 0;
        if (currentRelativeScroll > delayScroll) {
          progress = (currentRelativeScroll - delayScroll) / transitionLength;
        }
        applyScrollProgress(progress, overallProgress);
      }
    } else {
      applyScrollProgress(0, 0);
    }

    if (isProgrammaticScrollRef.current) return;

    if (contactEl && scrollTop >= contactEl.offsetTop - clientHeight * 0.45) {
      if (activeRoom !== "contact") {
        setActiveRoom("contact");
      }
    } else if (portfolioEl && scrollTop >= portfolioEl.offsetTop + 1900) {
      if (activeRoom !== "portfolio") {
        setActiveRoom("portfolio");
      }
    } else if (
      chronoEl &&
      scrollTop >= chronoEl.offsetTop - clientHeight * 0.45
    ) {
      if (activeRoom !== "chrono") {
        setActiveRoom("chrono");
      }
    } else if (
      aboutEl &&
      scrollTop >= aboutEl.offsetTop - clientHeight * 0.45
    ) {
      if (activeRoom !== "about") {
        setActiveRoom("about");
      }
    } else if (
      serviceEl &&
      scrollTop >= serviceEl.offsetTop - clientHeight * 0.45
    ) {
      if (activeRoom !== "service") {
        setActiveRoom("service");
      }
    } else {
      if (activeRoom !== "overview") {
        setActiveRoom("overview");
      }
    }
  };

  // Navigate cleanly to visual pages/decks with specified fly-through zoom directionality
  const navigateToRoom = (room: string, subTab?: string) => {
    const pages = ["overview", "portfolio"];

    if (subTab) {
      setActiveSubTab(subTab);
    }

    const currentGroup = [
      "overview",
      "service",
      "about",
      "chrono",
      "portfolio",
      "contact",
    ].includes(activeRoom)
      ? "overview"
      : ["design", "webdev", "ai"].includes(activeRoom)
        ? "portfolio"
        : activeRoom;
    const targetGroup = [
      "overview",
      "service",
      "about",
      "chrono",
      "portfolio",
      "contact",
    ].includes(room)
      ? "overview"
      : ["design", "webdev", "ai"].includes(room)
        ? "portfolio"
        : room;

    const currentIndex = pages.indexOf(currentGroup);
    const nextIndex = pages.indexOf(targetGroup);

    const executeNavigation = (r: string) => {
      if (r === "overview") {
        setActiveRoom("overview");
        runProgrammaticScroll(null, 0, 1800);
        return;
      }

      if (r === "service") {
        setActiveRoom("service");
        runProgrammaticScroll("service-section", 0, 1900);
        return;
      }

      if (r === "about") {
        setActiveRoom("about");
        runProgrammaticScroll("about-section", 0, 1900);
        return;
      }

      if (r === "chrono") {
        setActiveRoom("chrono");
        runProgrammaticScroll("chrono-section", 0, 1900);
        return;
      }

      if (r === "portfolio") {
        setActiveRoom("portfolio");
        if (isComingBackFromHubRef.current) {
          isProgrammaticScrollRef.current = false;
        } else {
          // Scroll to the portfolio reveal faster so the contact section follows sooner.
          runProgrammaticScroll(
            "portfolio-section",
            PORTFOLIO_SCROLL_JOURNEY,
            700,
          );
        }
        return;
      }

      if (r === "contact") {
        setActiveRoom("contact");
        runProgrammaticScroll("contact-section", 0, 200);
        return;
      }

      setActiveRoom(r);
    };

    // If we are migrating between chambers and main introduction sections, do NOT use black loading screens!
    // Instead execute the navigation instantly, allowing Framer Motion's scale transition to handle it elegantly.
    const isChamberTransition =
      ["design", "webdev", "ai"].includes(activeRoom) ||
      ["design", "webdev", "ai"].includes(room);

    if (isChamberTransition) {
      // Direct jump with beautiful scale zoom transition inside Framer Motion
      const isBackToProfile = [
        "overview",
        "service",
        "about",
        "chrono",
        "portfolio",
        "contact",
      ].includes(room);
      setDirection(isBackToProfile ? -1 : 1);
      if (isBackToProfile && room === "portfolio") {
        isComingBackFromHubRef.current = true;
      }
      executeNavigation(room);
      return;
    }

    if (nextIndex !== -1 && nextIndex !== currentIndex) {
      setDirection(nextIndex > currentIndex ? 1 : -1);

      // TRIGGER CINEMATIC BLACK FADE
      setIsBlackFading(true);
      setTimeout(() => {
        executeNavigation(room);
        setTimeout(() => {
          setIsBlackFading(false);
        }, 400);
      }, 450);
      return;
    }

    executeNavigation(room);
  };

  const scrollThreshold = 15; // Delta scroll threshold limits to prevent double skipping
  const scrollCooldown = 100; // ms transition freeze to allow animations to fully play out
  const lastScrollTime = useRef<number>(0);

  // High-performance direct wheel scroll pagination tracking with smart container limit detection
  const handleWheelScroll = (e: React.WheelEvent) => {
    const target = e.target as HTMLElement;
    // Keep standard textboxes and form fields isolated from room switching
    if (target.closest("input") || target.closest("textarea")) {
      return;
    }

    // Ignore room/view switching when scrolling within fixed sidebars/modals (like the "Aether Aura" artwork detail slider)
    if (target.closest(".fixed") || target.closest("[data-no-scroll-exit]")) {
      return;
    }

    // Disable mouse wheel page-snapping for the naturally scrolling profile pages
    if (
      [
        "overview",
        "service",
        "about",
        "chrono",
        "portfolio",
        "contact",
      ].includes(activeRoom)
    ) {
      return;
    }

    const now = Date.now();
    if (now - lastScrollTime.current < scrollCooldown) return;

    if (Math.abs(e.deltaY) > scrollThreshold) {
      const dir = e.deltaY > 0 ? 1 : -1;

      // Look up target ancestors for any scrollable container that is not yet at its scroll boundary
      let currentEl: HTMLElement | null = target;
      let hasActiveScroll = false;

      while (
        currentEl &&
        currentEl !== e.currentTarget &&
        currentEl !== document.body
      ) {
        const style = window.getComputedStyle(currentEl);
        const overflowY = style.overflowY || style.overflow || "";
        const canScrollY =
          overflowY.includes("auto") ||
          overflowY.includes("scroll") ||
          currentEl.classList.contains("overflow-auto") ||
          currentEl.classList.contains("overflow-y-auto") ||
          currentEl.id === "academic-paper-shelf";

        if (canScrollY && currentEl.scrollHeight > currentEl.clientHeight + 2) {
          if (dir > 0) {
            // Scrolling down - check remaining space to scroll down
            const scrollBottomRemaining =
              currentEl.scrollHeight -
              currentEl.clientHeight -
              currentEl.scrollTop;
            if (scrollBottomRemaining > 8) {
              hasActiveScroll = true;
              break;
            }
          } else {
            // Scrolling up - check if we can scroll up more
            if (currentEl.scrollTop > 8) {
              hasActiveScroll = true;
              break;
            }
          }
        }
        currentEl = currentEl.parentElement;
      }

      if (hasActiveScroll) return; // Prioritize natural container scroll instead of changing rooms

      // If user is inside a specific hub chamber and scrolls up, return back to the Portfolio Hub portal
      if (["design", "webdev", "ai"].includes(activeRoom)) {
        if (dir < 0) {
          lastScrollTime.current = now;
          setDirection(-1);
          navigateToRoom("portfolio");
          return;
        }
      }

      const pages = ["overview", "portfolio"];
      const currentGroup = [
        "overview",
        "service",
        "about",
        "chrono",
        "portfolio",
        "contact",
      ].includes(activeRoom)
        ? "overview"
        : ["design", "webdev", "ai"].includes(activeRoom)
          ? "portfolio"
          : activeRoom;
      const currentIndex = pages.indexOf(currentGroup);
      const nextIndex = currentIndex + dir;

      if (nextIndex >= 0 && nextIndex < pages.length) {
        lastScrollTime.current = now;
        setDirection(dir);
        const targetRoom =
          pages[nextIndex] === "overview" && dir < 0
            ? "chrono"
            : pages[nextIndex];
        navigateToRoom(targetRoom);
      }
    }
  };

  // Tactile touch swipe track parameters for seamless responsive mobile deck transitions
  const touchStartY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("input") || target.closest("textarea")) return;
    if (target.closest(".fixed") || target.closest("[data-no-scroll-exit]"))
      return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = () => {
    // Left empty to prevent standard browser vertical dragging default trigger overrides
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("input") || target.closest("textarea")) return;

    // Ignore room/view switching when swiping within fixed sidebars/modals (like the "Aether Aura" artwork detail slider)
    if (target.closest(".fixed") || target.closest("[data-no-scroll-exit]")) {
      return;
    }

    // Disable swipe-snapping page transitions for the naturally scrolling profile pages
    if (
      [
        "overview",
        "service",
        "about",
        "chrono",
        "portfolio",
        "contact",
      ].includes(activeRoom)
    ) {
      return;
    }

    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY.current - touchEndY; // Positive represents swipe down (forward)
    const threshold = 40;
    const now = Date.now();

    if (now - lastScrollTime.current < scrollCooldown) return;

    if (Math.abs(deltaY) > threshold) {
      const dir = deltaY > 0 ? 1 : -1;

      let currentEl: HTMLElement | null = target;
      let hasActiveScroll = false;

      while (
        currentEl &&
        currentEl !== e.currentTarget &&
        currentEl !== document.body
      ) {
        const style = window.getComputedStyle(currentEl);
        const overflowY = style.overflowY || style.overflow || "";
        const canScrollY =
          overflowY.includes("auto") ||
          overflowY.includes("scroll") ||
          currentEl.classList.contains("overflow-auto") ||
          currentEl.classList.contains("overflow-y-auto");

        if (canScrollY && currentEl.scrollHeight > currentEl.clientHeight + 2) {
          if (dir > 0) {
            const scrollBottomRemaining =
              currentEl.scrollHeight -
              currentEl.clientHeight -
              currentEl.scrollTop;
            if (scrollBottomRemaining > 5) {
              hasActiveScroll = true;
              break;
            }
          } else {
            if (currentEl.scrollTop > 5) {
              hasActiveScroll = true;
              break;
            }
          }
        }
        currentEl = currentEl.parentElement;
      }

      if (hasActiveScroll) return;

      // If user is inside a specific hub chamber and scrolls/swipes up, return back to the Portfolio Hub portal
      if (["design", "webdev", "ai"].includes(activeRoom)) {
        if (dir < 0) {
          lastScrollTime.current = now;
          setDirection(-1);
          navigateToRoom("portfolio");
          return;
        }
      }

      const pages = ["overview", "portfolio"];
      const currentGroup = [
        "overview",
        "service",
        "about",
        "chrono",
        "portfolio",
        "contact",
      ].includes(activeRoom)
        ? "overview"
        : ["design", "webdev", "ai"].includes(activeRoom)
          ? "portfolio"
          : activeRoom;
      const currentIndex = pages.indexOf(currentGroup);
      const nextIndex = currentIndex + dir;

      if (nextIndex >= 0 && nextIndex < pages.length) {
        lastScrollTime.current = now;
        setDirection(dir);
        const targetRoom =
          pages[nextIndex] === "overview" && dir < 0
            ? "chrono"
            : pages[nextIndex];
        navigateToRoom(targetRoom);
      }
    }
  };

  // Smooth cinematic layout zoom transition profiles
  const pageVariants = {
    initial: (dir: number) => {
      const isReturn = dir < 0;
      return {
        opacity: 0,
        scale: isReturn ? 1.25 : 0.85,
        y: isReturn ? -30 : 30,
        filter: "blur(6px)",
      };
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 95,
        damping: 22,
        mass: 0.95,
      },
    },
    exit: (dir: number) => {
      const isReturn = dir < 0;
      return {
        opacity: 0,
        scale: isReturn ? 0.75 : 1.25,
        y: isReturn ? 30 : -30,
        filter: "blur(6px)",
        transition: {
          duration: 0.45,
          ease: [0.25, 1, 0.5, 1],
        },
      };
    },
  };

  const renderActiveSection = () => {
    switch (activeRoom) {
      case "overview":
      case "service":
      case "about":
      case "chrono":
      case "portfolio":
      case "contact":
        return (
          <motion.div
            key="profile-group-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            ref={setProfileScrollRef}
            onScroll={handleProfileScroll}
            className="w-full h-full overflow-y-auto custom-scrollbar relative bg-white"
          >
            <div
              id="profile-section-top"
              className="w-full min-h-[640px] h-[calc(100vh-53px)] shrink-0 bg-[#fbf9f4]"
            >
              <IntroCollage zoom={1} onNavigateToRoom={navigateToRoom} />
            </div>
            <div id="service-section" className="w-full shrink-0">
              <ServiceSection />
            </div>
            <div
              id="about-section"
              className="w-full min-h-[calc(100vh-53px)] bg-white shrink-0 font-sans"
            >
              <AboutMeSection
                onExploreProjects={(tgt, sub) =>
                  navigateToRoom(tgt || "portfolio", sub)
                }
              />
            </div>
            <div
              id="chrono-section"
              ref={chronoSectionRef}
              style={{ opacity: 1 }}
              className="w-full min-h-[calc(100vh-53px)] bg-white shrink-0 font-sans p-6 md:p-10 relative"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                <div className="lg:col-span-5 space-y-3">
                  <span className="font-mono text-[10px] text-amber-500 font-bold block uppercase tracking-wider">
                    CHAMBER_05 // RECORD ARCHIVES
                  </span>
                  <h2 className="font-display text-4xl font-light text-neutral-950 tracking-tight leading-none">
                    Curation Chronology
                  </h2>
                  <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
                    Professional landmarks, research paper hypotheticals, and
                    core capabilities matrices plotted as physical displays.
                  </p>

                  {/* Dynamic Accordion list inside long timeline */}
                  <div
                    id="academic-paper-shelf"
                    className="pt-6 space-y-3 font-medium"
                  >
                    <span className="font-mono text-[9px] text-neutral-400 uppercase block font-semibold hover:text-amber-500">
                      PUBLISHED REPOSITORIES ABSTRACTS
                    </span>
                    <div className="space-y-3 shrink-0">
                      {RESEARCH_PAPERS.map((paper) => {
                        const isActive = activeResearchId === paper.id;
                        return (
                          <div
                            key={paper.id}
                            className={`p-3 border rounded-xs transition-all ${
                              isActive
                                ? "bg-neutral-50 border-neutral-900"
                                : "bg-transparent border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <button
                              onClick={() =>
                                setActiveResearchId(isActive ? null : paper.id)
                              }
                              className="w-full text-left flex justify-between items-center text-xs focus:outline-none cursor-pointer"
                            >
                              <span className="font-medium text-neutral-800 pr-4">
                                {paper.title}
                              </span>
                              <span className="font-mono text-[9px] text-neutral-400 uppercase shrink-0">
                                {isActive ? "[ HIDE ]" : "[ SHOW ]"}
                              </span>
                            </button>
                            {isActive && (
                              <div className="mt-2.5 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                                <p className="italic font-sans">
                                  &ldquo;{paper.question}&rdquo;
                                </p>
                                <p className="leading-snug text-neutral-650 mt-1.5">
                                  {paper.abstract}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Structured Toolkit columns */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-[9.5px] text-neutral-400 font-extrabold uppercase block tracking-widest pl-2">
                    ORGANIZED CAPABILITY PORT MATRIX
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    {SKILL_CATEGORIES.slice(0, 2).map((cat) => (
                      <div
                        key={cat.id}
                        className="bg-neutral-50 border border-neutral-150 p-4 rounded-xs space-y-4"
                      >
                        <div className="space-y-0.5">
                          <span className="font-mono text-[8px] text-amber-600 uppercase font-bold">
                            GROUP PORT
                          </span>
                          <h4 className="font-display font-medium text-xs text-neutral-900">
                            {cat.title}
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {cat.skills.slice(0, 3).map((s, sIdx) => (
                            <div key={sIdx} className="space-y-1">
                              <div className="flex justify-between text-[10px] font-mono">
                                <span className="font-semibold text-neutral-700">
                                  {s.name}
                                </span>
                                <span>{s.level}%</span>
                              </div>
                              <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-neutral-900"
                                  style={{ width: `${s.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <TimelineSection events={TIMELINE} />
            </div>

            {/* Transition & Portfolio Sticky Zoom Section */}
            <div
              id="portfolio-section"
              className="w-full relative select-none"
              style={{
                height: `calc(100vh - 53px + ${PORTFOLIO_SCROLL_JOURNEY}px)`,
              }}
            >
              {/* Sticky container that stays fixed on screen during the scroll transition */}
              <div className="sticky top-[53px] h-[calc(100vh-53px)] w-full overflow-hidden bg-white flex items-center justify-center">
                {/* Solid background matching the RecruitmentBanner canvas */}
                <div className="absolute inset-0 bg-[#f4f1e6] z-0" />

                {/* The RecruitmentBanner background layer that gets zoomed/reveal-masked */}
                <div
                  ref={recruitmentLayerRef}
                  className="absolute inset-0 w-full h-full z-10 origin-center"
                  style={{
                    opacity: 1,
                    transform: "scale(1)",
                    pointerEvents: "auto",
                  }}
                >
                  <RecruitmentBanner
                    onEnterPortals={() => navigateToRoom("portfolio")}
                    isStickyMode={true}
                  />
                </div>

                {/* The Masked / Clipped Portfolio Container */}
                <div
                  ref={portfolioClipRef}
                  className="absolute inset-0 w-full h-full bg-[#fcfbf9] select-auto z-20"
                  style={{
                    clipPath: "inset(50% 0% 50% 0%)",
                    opacity: 0,
                    transform: "scale(0.97)",
                    pointerEvents: "none",
                  }}
                >
                  <PortfolioHub
                    onZoomIn={(chamber) => navigateToRoom(chamber)}
                  />
                </div>

                {/* Horizontal glow line at the center split point */}
                <div
                  ref={glowRingRef}
                  className="absolute left-0 right-0 pointer-events-none z-30"
                  style={{
                    top: "50%",
                    height: "1px",
                    transform: "translateY(-50%)",
                    opacity: 0,
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.7) 20%, rgba(255,255,255,0.9) 50%, rgba(217,119,6,0.7) 80%, transparent 100%)",
                    boxShadow: "0 0 18px 3px rgba(217, 119, 6, 0.4)",
                  }}
                />
              </div>
            </div>

            <div id="contact-section" className="w-full shrink-0">
              <ContactSection />
            </div>
          </motion.div>
        );
      case "design":
        return (
          <div className="w-full h-full overflow-hidden">
            <div className="interactive-cockpit h-full">
              <ExhibitionSandbox onLayoutGenerated={handleLayoutGenerated} />
            </div>
          </div>
        );
      case "webdev":
        return (
          <div className="w-full h-full overflow-hidden">
            <WebDevDashboard />
          </div>
        );
      case "ai":
        return (
          <div className="w-full h-full overflow-hidden">
            <AISystemsHub
              initialTab={activeSubTab || "diabetes"}
              onTabChange={(t) => setActiveSubTab(t)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onWheel={handleWheelScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-screen overflow-hidden bg-[#fbf9f4] text-neutral-900 select-none cursor-default"
    >
      {/* 
        AESTHETIC BACKGROUND
        Clean, pristine, solid background supporting full screen views
      */}
      <div className="absolute inset-0 bg-white pointer-events-none z-0"></div>

      <Header onRoomSelect={navigateToRoom} activeRoom={activeRoom} />

      {/* FULL-WINDOW ACTIVE DECK CONTAINER */}
      <div className="w-full h-full flex flex-col pt-[53px] pb-0 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={getRoomGroupKey(activeRoom)}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full flex items-center justify-center z-10"
          >
            <AnimatePresence mode="wait">
              {renderActiveSection()}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* FIXED FLOATING ACTION PILL FOR ZOOMING OUT OF PORT SUB-PORTALS */}
      {["design", "webdev", "ai"].includes(activeRoom) && (
        <div className="fixed bottom-6 left-6 md:left-12 z-50">
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.8, x: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setIsHoveredBack(true)}
            onMouseLeave={() => setIsHoveredBack(false)}
            onClick={() => {
              setIsHoveredBack(false);
              navigateToRoom("portfolio");
            }}
            className="flex items-center justify-center bg-neutral-950 text-white font-mono text-[9px] tracking-widest font-black uppercase rounded-full shadow-2xl hover:bg-neutral-800 cursor-pointer border border-neutral-800 transition-all duration-300 h-10 select-none overflow-hidden"
            style={{
              width: isHoveredBack ? "190px" : "40px",
              paddingLeft: isHoveredBack ? "14px" : "0px",
              paddingRight: isHoveredBack ? "14px" : "0px",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4 shrink-0 text-white" />
              <AnimatePresence initial={false}>
                {isHoveredBack && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap font-mono tracking-widest text-[9.5px] font-black pt-[1px]"
                  >
                    BACK TO PORTALS
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>
      )}

      {/* CINEMATIC FULL SCREEN BLACK TRANSITION OVERLAY */}
      <AnimatePresence>
        {isBlackFading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#0c0c0a] z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
              className="text-center space-y-4"
            >
              <span className="font-mono text-[9px] md:text-[10px] text-amber-500 font-extrabold tracking-widest uppercase block animate-pulse">
                SHIFTING COGNITIVE SPACE
              </span>
              <div className="flex gap-2 justify-center items-center">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></span>
                <span className="font-serif italic text-neutral-100 text-base md:text-lg font-light tracking-wide">
                  Launching Showroom Portal...
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
