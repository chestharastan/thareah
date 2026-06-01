/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import thorLogo from '../assets/images/thor.svg';

interface HeaderProps {
  onRoomSelect?: (room: string) => void;
  activeRoom?: string;
}

export default function Header({ onRoomSelect, activeRoom = 'overview' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "01 / PROFILE", id: "overview" },
    { label: "02 / SERVICE", id: "service" },
    { label: "03 / ABOUT ME", id: "about" },
    { label: "04 / CHRONOLOGY", id: "chrono" },
    { label: "05 / PORTALS", id: "portfolio" },
    { label: "06 / CONTACT", id: "contact" }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (onRoomSelect) {
      onRoomSelect(id);
    }
  };

  return (
    <header
      id="main-app-header"
      className="fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b bg-white/90 backdrop-blur-md border-neutral-200/50 py-3 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO AREA */}
        <button
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2 focus:outline-none cursor-pointer group"
        >
          <img
            src={thorLogo}
            alt="Thareah logo"
            width={28}
            height={28}
            className="transform transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-medium text-sm tracking-widest text-neutral-900">
            THAREAH <span className="font-mono text-xs text-neutral-400 font-light">/ EXPO</span>
          </span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {menuItems.map((item, idx) => {
            const isActive = activeRoom === item.id;
            return (
              <button
                id={`nav-item-${idx}`}
                key={idx}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-[10px] uppercase tracking-wider font-semibold transition-colors duration-250 cursor-pointer px-2.5 py-1 rounded-sm ${
                  isActive
                    ? 'bg-neutral-950 text-white'
                    : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            id="header-cta-btn"
            onClick={() => handleNavClick('design')}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-mono text-[10px] tracking-wider uppercase px-3.5 py-1.5 rounded-sm transition-colors cursor-pointer font-bold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            VMD CO-PILOT
          </button>
        </nav>

        {/* MOBILE TRIGGER */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNavClick('design')}
            className="bg-amber-500 text-neutral-900 font-mono text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-sm cursor-pointer font-bold"
          >
            VMD
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-neutral-600 hover:text-neutral-950 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-200 shadow-xl p-6 space-y-4 md:hidden z-10 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3">
            {menuItems.map((item, idx) => (
              <button
                id={`mobile-nav-item-${idx}`}
                key={idx}
                onClick={() => handleNavClick(item.id)}
                className={`font-mono text-xs tracking-wider transition-colors py-2.5 border-b border-neutral-50 text-left px-2 rounded-xs ${
                  activeRoom === item.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
