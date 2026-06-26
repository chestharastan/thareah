/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Monitor, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  title: string;
  phrase: string;
  description: string;
  deliverables: string[];
  vibeColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "graphic-design",
    icon: Layers,
    tag: "BRANDING & VISUAL DESIGN",
    title: "Graphic Design",
    phrase: "ブランドの価値を、視覚で伝える。",
    description:
      "Creating modern, high-impact visual identities for businesses. From logos and brand assets to marketing materials and social media graphics, every design is crafted to communicate clearly and leave a lasting impression.",
    deliverables: [
      "Logo & Brand Identity",
      "Social Media Graphics",
      "Posters, Flyers & Print Design",
    ],
    vibeColor: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    id: "website-design",
    icon: Monitor,
    tag: "UI / UX DESIGN",
    title: "Website Design",
    phrase: "美しさと使いやすさを両立する。",
    description:
      "Designing modern, responsive, and user-focused websites with clean layouts and engaging interactions. Every interface is built to strengthen your brand and maximize user experience.",
    deliverables: [
      "UI/UX Design",
      "Responsive Layouts",
      "Interactive Prototypes",
    ],
    vibeColor: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    id: "web-app",
    icon: Monitor,
    tag: "FULL-STACK DEVELOPMENT",
    title: "Web Application Development",
    phrase: "高速・安全・スケーラブルなWeb体験。",
    description:
      "Building scalable web applications using modern technologies such as React, Next.js, Node.js, and FastAPI. From dashboards to internal management systems, every application is optimized for performance and maintainability.",
    deliverables: [
      "Admin Dashboards",
      "Business Management Systems",
      "REST API Integration",
    ],
    vibeColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    id: "ai-agent",
    icon: Sparkles,
    tag: "AI AUTOMATION",
    title: "AI Agent Development",
    phrase: "AIを、あなたのビジネスパートナーへ。",
    description:
      "Developing intelligent AI agents that automate workflows, answer customer inquiries, retrieve knowledge with RAG, and integrate seamlessly with Telegram or web platforms.",
    deliverables: [
      "Telegram AI Bots",
      "Web AI Assistants",
      "RAG & Knowledge Base Integration",
    ],
    vibeColor: "text-amber-700 bg-amber-50 border-amber-300",
  },
  {
    id: "telegram-ecommerce",
    icon: Sparkles,
    tag: "E-COMMERCE AUTOMATION",
    title: "Telegram E-Commerce Solutions",
    phrase: "チャットから、そのまま販売へ。",
    description:
      "Creating Telegram-based e-commerce systems that allow businesses to showcase products, manage orders, process customer requests, and automate sales workflows directly within Telegram.",
    deliverables: [
      "Product Catalog",
      "Order Management",
      "Payment & Notification Integration",
    ],
    vibeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
];

export default function ServiceSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>("graphic-design");

  return (
    <div className="w-full bg-[#faf8f4] py-16 md:py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 select-text">
        {/* SECTION LABELING */}
        <div className="space-y-3 mb-16">
          <span className="font-mono text-[9px] md:text-[10px] text-amber-600 font-extrabold block uppercase tracking-widest">
            CHAMBER_02 // COMPREHENSIVE SERVICE SUITE
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 
              className="font-display text-4xl md:text-5xl font-light text-neutral-950 tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Architectural Offerings.
            </h2>
            <p className="text-neutral-500 font-mono text-[10px] md:text-xs leading-relaxed max-w-sm">
              An overlap of digital product creation, typographic rigor, and robust systems engineering.
            </p>
          </div>
        </div>

        {/* INTERACTIVE COMPONENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* LEFT CHROME: Interactive list of disciplines */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              const isSelected = selectedService === srv.id;
              return (
                <motion.div
                  key={srv.id}
                  onClick={() => setSelectedService(srv.id)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ x: 4 }}
                  className={`p-5 rounded-xs border transition-all duration-300 cursor-pointer flex gap-4 text-left ${
                    isSelected 
                      ? 'bg-white border-neutral-900 shadow-sm' 
                      : 'bg-[#f4f1e6]/40 border-neutral-200/60 hover:bg-[#f4f1e6]/80 hover:border-neutral-300'
                  }`}
                >
                  <div className={`p-2.5 rounded-xs border ${srv.vibeColor} shrink-0 w-11 h-11 flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] font-bold text-amber-600 tracking-widest block uppercase">
                      {srv.tag}
                    </span>
                    <h3 className="font-sans font-bold text-xs text-neutral-900 flex items-center gap-1.5 leading-tight">
                      {srv.title}
                      {isSelected && <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />}
                    </h3>
                    <p className="font-serif italic text-neutral-400 text-[10px] line-clamp-1">
                      {srv.phrase}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT CHROME: Display details of chosen service */}
          <div className="lg:col-span-7">
            {SERVICES.map((srv) => {
              if (srv.id !== selectedService) return null;
              const Icon = srv.icon;
              return (
                <motion.div
                  key={srv.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-white border border-neutral-200/80 p-8 rounded-xs shadow-xs space-y-6 select-text"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-amber-600 font-bold uppercase tracking-widest block">
                        Service Profile // {srv.tag}
                      </span>
                      <h4 className="font-display font-medium text-lg text-neutral-950">
                        {srv.title}
                      </h4>
                    </div>
                    <div className={`p-3 rounded-xs border ${srv.vibeColor} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Japanese Phrase */}
                  <div className="border-l-2 border-amber-500 pl-4 py-1">
                    <p 
                      className="text-neutral-700 text-xs font-light tracking-wide italic"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {srv.phrase}
                    </p>
                  </div>

                  {/* Narrative paragraph */}
                  <p className="text-neutral-500 text-xs leading-relaxed font-sans">
                    {srv.description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase block tracking-wider">
                      PRIMARY DESIGN DELIVERABLES
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {srv.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-neutral-800 text-xs font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic CTA */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="font-mono text-[8px] text-neutral-400">
                      STATUS : DIRECTLY INTEGRATED IN SUITE
                    </span>
                    <span className="font-mono text-[9px] text-amber-600 font-extrabold tracking-widest uppercase animate-pulse">
                      Scroll down to proceed →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
