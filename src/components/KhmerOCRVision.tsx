/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Search, Eye, AlertCircle, FileText, BarChart } from 'lucide-react';

interface OCRGlyph {
  id: string;
  char: string;
  romanization: string;
  english: string;
  confidence: number;
  type: string;
  x: number; // coordinates on mock parchment background
  y: number;
  width: number;
  height: number;
  segmentationNotes: string;
}

export default function KhmerOCRVision() {
  const [selectedGlyphId, setSelectedGlyphId] = useState<string>("glyph-ka");
  const [scanning, setScanning] = useState<boolean>(false);

  const GLYPHS: OCRGlyph[] = [
    {
      id: "glyph-ka",
      char: "ក",
      romanization: "ka",
      english: "First consonant, representing 'chicken' in standard scripts",
      confidence: 98.4,
      type: "Consonant (Standard)",
      x: 120,
      y: 110,
      width: 70,
      height: 70,
      segmentationNotes: "Traditional curved looping structure. High overlap with compound vowels correctly isolated via U-Net decoder."
    },
    {
      id: "glyph-kha",
      char: "ខ",
      romanization: "kha",
      english: "Second consonant. High baseline complexity",
      confidence: 96.1,
      type: "Consonant (Complex)",
      x: 320,
      y: 90,
      width: 75,
      height: 80,
      segmentationNotes: "Double interior loop. Suffers from high ink bleed across parchment grains; restored via high-frequency Fourier heuristics."
    },
    {
      id: "glyph-ko",
      char: "គ",
      romanization: "ko",
      english: "Third consonant, representing voiceless velar plumbing",
      confidence: 94.8,
      type: "Consonant (Standard)",
      x: 210,
      y: 240,
      width: 65,
      height: 75,
      segmentationNotes: "Isolated baseline vowel overlaps solved using dynamic vertical boundary coordinate projection."
    },
    {
      id: "glyph-vowel-ah",
      char: "ា",
      romanization: "ā",
      english: "Inherent vocalic modifier element",
      confidence: 97.9,
      type: "Dependent Vowel",
      x: 440,
      y: 220,
      width: 50,
      height: 85,
      segmentationNotes: "Hanging stroke. Susceptible to boundary erosion. Restored successfully using local context regression channels."
    }
  ];

  const activeGlyph = GLYPHS.find(g => g.id === selectedGlyphId) || GLYPHS[0];

  const triggerMockScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full bg-[#FAF6EE] p-6 lg:p-8 select-none grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative overflow-y-auto lg:overflow-hidden">
      {/* Blueprint Grid Watermark overlay */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-5 pointer-events-none"></div>

      {/* Coordinate register line */}
      <span className="absolute top-4 right-4 font-mono text-[8px] text-[#A69B7C]">
        ROOM://CHAMBER_2 // HIGH-BLEED OCR TRANSCRIBER // SEGMENTATION DELTA: 94.6%
      </span>

      {/* LEFT: HEIRAL PALM LEAF SIMULATOR CANVAS */}
      <div className="lg:col-span-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-[#A69B7C] tracking-wider uppercase font-semibold">
              EXHIBIT // SEGMETATION CORE
            </span>
          </div>
          <h2 className="font-display text-2xl font-light text-[#4A3F22] tracking-tight mb-2">
            Historical Parchment Segmenter
          </h2>
          <p className="text-[#8C7E5C] text-xs leading-relaxed mb-6">
            Click highlighted glyph coordinates on this ancient manuscript replica below to analyze U-Net segmentation contours and character confidence scores.
          </p>

          {/* PARCHMENT DISPLAY REPLICATOR CASE */}
          <div className="relative w-full aspect-[4/3] bg-[#EBE4D3] border border-[#DCD3BE] rounded-sm shadow-inner overflow-hidden p-6 select-none flex items-center justify-center">
            {/* Antique leaf lines representing palm-leaf text row registers */}
            <div className="absolute inset-x-0 h-[1px] bg-[#C5BCA5] top-1/4"></div>
            <div className="absolute inset-x-0 h-[1px] bg-[#C5BCA5] top-2/4"></div>
            <div className="absolute inset-x-0 h-[1px] bg-[#C5BCA5] top-3/4"></div>

            {/* Glowing vertical scanning laser beam during mockup scan */}
            {scanning && (
              <motion.div
                initial={{ left: 0 }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_15px_#10b981] z-20"
              />
            )}

            {/* Simulated ancient handwriting marks & background elements */}
            <div className="absolute inset-0 opacity-15 font-serif text-[100px] text-[#8C7E5C] select-none p-12 pointer-events-none font-bold">
              សាស្ត្រាស្លឹករឹត
            </div>

            {/* Clickable glyph elements plotted directly in 2D coordinates */}
            <div className="relative w-[540px] h-[340px]">
              {GLYPHS.map((g) => {
                const isSelected = g.id === selectedGlyphId;
                return (
                  <button
                    id={`parchment-glyph-btn-${g.id}`}
                    key={g.id}
                    onClick={() => setSelectedGlyphId(g.id)}
                    style={{
                      left: `${g.x}px`,
                      top: `${g.y}px`,
                      width: `${g.width}px`,
                      height: `${g.height}px`
                    }}
                    className={`absolute p-2 flex items-center justify-center font-serif text-5xl transition-all duration-300 rounded-xs cursor-pointer focus:outline-none ${
                      isSelected
                        ? "bg-white/90 text-neutral-950 font-black scale-105 shadow-md border-2 border-emerald-500 z-10"
                        : "text-[#5C4F2E] hover:bg-white/40 border border-transparent"
                    }`}
                  >
                    {/* Bounding box fluorescent angles representation */}
                    {isSelected && (
                      <div className="absolute -inset-1.5 border border-emerald-500 rounded-sm pointer-events-none animate-pulse">
                        <span className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-500"></span>
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500"></span>
                        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-500"></span>
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-emerald-500"></span>
                      </div>
                    )}
                    {g.char}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Floating Calibration command button */}
        <div className="pt-4 flex items-center justify-between">
          <button
            onClick={triggerMockScan}
            disabled={scanning}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-[#4A3F22] hover:bg-[#342C17] disabled:bg-neutral-250 text-white font-mono text-[10px] uppercase tracking-wider rounded-sm shadow-sm cursor-pointer transition-colors"
          >
            <Eye className="w-4 h-4" />
            {scanning ? "SYSTEM SCANNING..." : "TRIGGER MATRIX RE-SCAN"}
          </button>
          <span className="font-mono text-[9px] text-[#A69B7C] italic">MATRIX RESOLUTION // CUDA ENGINE ENABLED</span>
        </div>
      </div>

      {/* RIGHT: SPECIFICATION DECODER CHART SHEET */}
      <div className="lg:col-span-6 bg-white border border-[#E6DEC9] rounded-sm p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="pb-4 border-b border-[#EBE4D3] flex justify-between items-center">
            <div className="space-y-0.5">
              <span className="font-mono text-[8px] text-[#A69B7C] font-semibold uppercase tracking-wider">
                DECRYPT CONTRAST LOG
              </span>
              <h3 className="font-display font-medium text-lg text-neutral-900 leading-tight">
                Segmentation Spectrum
              </h3>
            </div>
            <div className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold border border-emerald-200 rounded-sm">
              CONFIDENCE: {activeGlyph.confidence}%
            </div>
          </div>

          {/* Abstract information panels */}
          <div className="py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#FAF6EE] border border-[#EBE4D3] rounded-xs space-y-1">
                <span className="font-mono text-[8px] text-[#A69B7C] block uppercase font-bold">SCRIPT CHARACTER</span>
                <span className="font-serif text-3xl font-black text-[#4A3F22]">{activeGlyph.char}</span>
              </div>
              <div className="p-3 bg-[#FAF6EE] border border-[#EBE4D3] rounded-xs space-y-1">
                <span className="font-mono text-[8px] text-[#A69B7C] block uppercase font-bold">ROMANIZED PHONETIC</span>
                <span className="font-mono text-base font-bold text-neutral-800">/{activeGlyph.romanization}/</span>
              </div>
            </div>

            <div className="space-y-1 bg-neutral-50 p-4 border border-neutral-100 rounded-sm">
              <span className="font-mono text-[8px] text-neutral-400 block uppercase font-bold flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-600" />
                DICTIONARY EXPOSITION
              </span>
              <p className="text-neutral-700 text-xs leading-relaxed font-sans mt-1">
                {activeGlyph.english}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[8px] text-[#A69B7C] block uppercase font-bold">
                U-NET LAYER SEGMENTATION FOOTPRINT
              </span>
              <p className="text-neutral-500 text-xs leading-relaxed font-mono">
                {activeGlyph.segmentationNotes}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM: TRANSLITERATION SPEED COMPARISON (D3-tier visualizer mockup) */}
        <div className="pt-6 border-t border-[#EBE4D3] space-y-3">
          <span className="font-mono text-[8px] text-[#A69B7C] block uppercase font-bold">
            HISTORIC TRANSCRIBING EFFICIENCY RATIO (WORDS / MINUTE)
          </span>

          <div className="space-y-2 font-mono text-[10px]">
            {/* Manual archeologist vs model speed bars */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-neutral-500">
                <span>MANUAL PALAEOGRAPHER DECODING</span>
                <span>3 WPM</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div className="w-[12%] h-full bg-[#A69B7C] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-neutral-900 font-bold">
                <span>THAREAH HYBRID OCR PIPELINE (CUDA RUNTIME)</span>
                <span>46 WPM</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "95%" }}
                  viewport={{ once: true }}
                  className="h-full bg-emerald-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
          <span className="text-[8px] text-neutral-400 font-mono block text-right">METRIC IMPROVEMENT GAUGE: 15x SPEED INCREASE</span>
        </div>
      </div>
    </div>
  );
}
