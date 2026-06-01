/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Play, RefreshCw, Terminal, CheckCircle2, Sliders, Database, LineChart, Cpu, Zap, ArrowRight, Laptop, Calendar, Award, LayoutGrid, Layers, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../data';

export default function WebDevDashboard() {
  const [activeMode, setActiveMode] = useState<'projects' | 'simulator'>('projects');
  const [activeProjectTab, setActiveProjectTab] = useState<'dwh' | 'training'>('dwh');

  // --- BANKING DATA WAREHOUSE MOCK STATE ---
  const [etlRunning, setEtlRunning] = useState(false);
  const [etlProgress, setEtlProgress] = useState(0);
  const [etlLogs, setEtlLogs] = useState<string[]>([
    "SYSTEM READY // WAITING FOR SCHEDULER PROTOCOL...",
    "DATA VAULT 2.0 PROTOCOLS LOADED [OK]",
    "ENVELOPE SECURE ENCRYPTION ENGINES VERIFIED [OK]"
  ]);
  const [totalProcessedRows, setTotalProcessedRows] = useState(4200000);
  const [latencyMs, setLatencyMs] = useState(1.4);
  const etlIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startEtlPipeline = () => {
    if (etlRunning) return;
    setEtlRunning(true);
    setEtlProgress(0);
    setEtlLogs([
      "INITIALIZING COMPLIANT PIPELINE ORCHESTRATION...",
      "POLLING TRANSACT TRANSACTION ENDPOINTS (POSTGRES ENGINE)..."
    ]);

    let step = 0;
    const stages = [
      { prg: 15, log: "SUCCESS: Found 42,912 untransformed transaction events." },
      { prg: 35, log: "TRANSFORM: Applying compliant Data Vault 2.0 hash mapping..." },
      { prg: 55, log: "COMPLIANCE CHECK: Auditing multi-currency decryption parameters..." },
      { prg: 75, log: "LOAD: Streaming atomic microloan rows into Snowflake core warehouse..." },
      { prg: 90, log: "VERIFY: Running zero replication file-size checksum validation..." },
      { prg: 100, log: "PIPELINE COMPLETED. 4.29M total records synced. 0% replication error." }
    ];

    etlIntervalRef.current = setInterval(() => {
      if (step < stages.length) {
        const nextStage = stages[step];
        setEtlProgress(nextStage.prg);
        setEtlLogs(prev => [...prev, nextStage.log]);
        setTotalProcessedRows(prev => prev + Math.floor(Math.random() * 5000 + 4000));
        setLatencyMs(parseFloat((Math.random() * 0.4 + 1.1).toFixed(2)));
        step++;
      } else {
        if (etlIntervalRef.current) clearInterval(etlIntervalRef.current);
        setEtlRunning(false);
      }
    }, 800);
  };

  // --- MODEL TRAINING MONITOR MOCK STATE ---
  const [learningRate, setLearningRate] = useState(0.0001);
  const [epochs, setEpochs] = useState(10);
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainingLoss, setTrainingLoss] = useState<number[]>([0.85]);
  const [trainingAcc, setTrainingAcc] = useState<number[]>([0.62]);
  const trainingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startModelTraining = () => {
    if (isTraining) return;
    setIsTraining(true);
    setCurrentEpoch(0);
    setTrainingLoss([0.85]);
    setTrainingAcc([0.62]);

    let epoch = 0;
    trainingIntervalRef.current = setInterval(() => {
      if (epoch < epochs) {
        epoch++;
        setCurrentEpoch(epoch);
        // Descrease loss cleanly, raise accuracy
        setTrainingLoss(prev => {
          const last = prev[prev.length - 1];
          const drop = last * (0.35 + Math.random() * 0.15); // descending exponentially
          return [...prev, parseFloat((last - drop).toFixed(4))];
        });
        setTrainingAcc(prev => {
          const last = prev[prev.length - 1];
          const rise = (1 - last) * (0.28 + Math.random() * 0.12); // approach 99.9%
          return [...prev, parseFloat((last + rise).toFixed(4))];
        });
      } else {
        if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);
        setIsTraining(false);
      }
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (etlIntervalRef.current) clearInterval(etlIntervalRef.current);
      if (trainingIntervalRef.current) clearInterval(trainingIntervalRef.current);
    };
  }, []);

  const webProjects = PROJECTS.filter(p => p.projectType === 'webdev');

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between overflow-hidden">
      {/* Sub-tab bar styled in a pristine system grid */}
      <div className="border-b border-neutral-200/60 bg-[#faf9f6] pl-16 pr-6 md:pl-24 md:pr-12 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none flex-shrink-0">
        <div className="flex items-center gap-2">
          <Code2 className="w-4.5 h-4.5 text-neutral-800 animate-pulse" />
          <div className="h-4 w-[1px] bg-neutral-300" />
          <div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase font-black tracking-widest block">
              CHAMBER_04 // ENGINEERING DECK
            </span>
            <span className="font-display font-semibold text-xs tracking-wide text-neutral-800 uppercase">
              Web Systems & Transactional Warehouses
            </span>
          </div>
        </div>

        {/* Tab options */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          <button
            id="tab-web-projects-btn"
            onClick={() => setActiveMode('projects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'projects'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Completed Projects List
          </button>

          <button
            id="tab-web-simulator-btn"
            onClick={() => setActiveMode('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all cursor-pointer font-mono text-[10px] uppercase font-bold whitespace-nowrap ${
              activeMode === 'simulator'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white hover:bg-neutral-100/80 text-neutral-500 hover:text-neutral-950 border-neutral-200/70'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Operational Simulator Rig
          </button>
        </div>
      </div>

      {/* Body Area */}
      <div className="flex-grow overflow-hidden relative bg-[#faf9f6]/40">
        <AnimatePresence mode="wait">
          {activeMode === 'projects' ? (
            <motion.div
              key="web-projects"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full overflow-y-auto p-6 md:p-10 custom-scrollbar"
            >
              <div className="max-w-5xl mx-auto space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-light text-neutral-900 tracking-tight">
                    Completed Web Engineering Applications
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1 leading-relaxed max-w-xl">
                    A curated suite of high-throughput transaction ledger warehouses, model execution trackers, and real-time canvas visualizers developed with bulletproof schema safety and low-latency pipelines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {webProjects.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-neutral-200 rounded-sm overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-900/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Artwork/Screenshot frame */}
                        <div className="relative aspect-video overflow-hidden bg-neutral-900">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4 font-mono text-[9px] font-black bg-white text-neutral-900 px-2 py-0.5 rounded-sm uppercase tracking-wider">
                            {p.year} // SYSTEM DONE
                          </div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="font-mono text-[8px] text-[#ffae58] block uppercase tracking-widest font-black mb-0.5">{p.subtitle}</span>
                            <h4 className="font-display font-medium text-lg leading-tight">{p.title}</h4>
                          </div>
                        </div>

                        {/* Text descriptions */}
                        <div className="p-6 space-y-4">
                          <p className="text-neutral-600 text-xs leading-relaxed">
                            {p.longDescription}
                          </p>

                          {/* Tech Swatches */}
                          <div className="flex flex-wrap gap-1.5">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="font-mono text-[9px] text-neutral-600 bg-neutral-50 border border-neutral-200/60 px-2 py-0.5 rounded-sm"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Production metrics */}
                          {p.metrics && (
                            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-neutral-100">
                              {p.metrics.map((m, idx) => (
                                <div key={idx} className="p-2 bg-neutral-50/50 rounded-sm border border-neutral-100 text-center">
                                  <span className="font-mono text-[8px] text-neutral-400 block uppercase font-bold leading-none mb-1">{m.label}</span>
                                  <span className="font-mono text-xs font-black text-neutral-800">{m.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Direct Hotlink Action */}
                      <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                        {p.liveUrl ? (
                          <>
                            <span className="font-mono text-[8px] text-neutral-400 uppercase font-bold">Live deployment online</span>
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-[9px] font-mono text-[#d56d05] hover:text-amber-600 font-extrabold uppercase bg-transparent border-0 cursor-pointer transition-colors"
                            >
                              VISIT LIVE SITE
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </>
                        ) : (
                          <>
                            <span className="font-mono text-[8px] text-neutral-400 uppercase font-bold">Pipeline simulator available</span>
                            <button
                              onClick={() => {
                                setActiveProjectTab(p.id === 'banking-dwh' ? 'dwh' : 'training');
                                setActiveMode('simulator');
                              }}
                              className="flex items-center gap-1 text-[9px] font-mono text-[#d56d05] hover:text-amber-600 font-extrabold uppercase bg-transparent border-0 cursor-pointer transition-colors"
                            >
                              RUN SIMULATION CONSOLE
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="web-simulator"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="w-full h-full p-6 lg:p-10 select-none grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto lg:overflow-hidden relative">
                {/* Decors Grid */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-neutral-900/[0.04]" />
                <div className="absolute inset-y-0 left-12 w-[1px] bg-neutral-900/[0.04] pointer-events-none" />

                {/* LEFT COLUMN: SELECTION AND HYPERPARAMETERS / SETTINGS */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider">
                        CHAMBER_04 // ENGINEERING DECK
                      </span>
                    </div>

                    <h3 className="font-display text-3xl font-light tracking-tight text-neutral-950">
                      High-Performance Web Engineering
                    </h3>
                    <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
                      Bridging complex, secure multi-threaded transactional backends with flawless interactive live dashboards modeled under high security margins.
                    </p>

                    {/* PROJECT CHOOSER METRIC PORTALS */}
                    <div className="space-y-2.5 pt-4">
                      <button
                        onClick={() => setActiveProjectTab('dwh')}
                        className={`w-full text-left p-3.5 border transition-all rounded-xs flex items-center justify-between cursor-pointer ${
                          activeProjectTab === 'dwh' 
                            ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900/10' 
                            : 'bg-transparent border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xs ${activeProjectTab === 'dwh' ? 'bg-neutral-900 text-white' : 'bg-neutral-150 text-neutral-700'}`}>
                            <Database className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-xs text-neutral-900">1. Trans-Regional Data Warehouse</h4>
                            <p className="text-[10px] text-neutral-400 mt-1 font-mono uppercase">Multi-Layered ETL Gateway // vault 2.0</p>
                          </div>
                        </div>
                        <span className="text-[10.5px] font-mono text-zinc-400">01</span>
                      </button>

                      <button
                        onClick={() => setActiveProjectTab('training')}
                        className={`w-full text-left p-3.5 border transition-all rounded-xs flex items-center justify-between cursor-pointer ${
                          activeProjectTab === 'training' 
                            ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900/10' 
                            : 'bg-transparent border-neutral-200 hover:border-neutral-350 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xs ${activeProjectTab === 'training' ? 'bg-neutral-900 text-white' : 'bg-neutral-150 text-neutral-700'}`}>
                            <Sliders className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-xs text-neutral-900">2. Khmer NLP Training Monitor</h4>
                            <p className="text-[10px] text-neutral-400 mt-1 font-mono uppercase">PyTorch Convergence Tracker</p>
                          </div>
                        </div>
                        <span className="text-[10.5px] font-mono text-zinc-400">02</span>
                      </button>
                    </div>
                  </div>

        {/* DETAILS ACCORDION BASE ON CHOSEN TAB */}
        <div className="bg-white border border-neutral-200 p-4 rounded-xs shrink-0">
          <AnimatePresence mode="wait">
            {activeProjectTab === 'dwh' ? (
              <motion.div
                key="dwh"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h5 className="font-display font-semibold text-[13px] text-neutral-950">Vault ETL Compliance Specs</h5>
                  <span className="font-mono text-[8.5px] bg-red-50 text-red-700 font-bold border border-red-100 px-1.5 py-0.25 rounded-sm">SECURE SHA-2</span>
                </div>
                <p className="text-neutral-500 text-xs leading-relaxed">
                  Conforms to global retail banking schema structures. Employs asymmetric ledger vaults to synchronize and isolate high-fidelity customer transaction sequences safely.
                </p>
                <button
                  onClick={startEtlPipeline}
                  disabled={etlRunning}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-950 hover:bg-neutral-850 text-white hover:text-amber-300 disabled:opacity-50 text-[10px] font-mono uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {etlRunning ? "PIPELINE ACTIVE..." : "RUN ETL COMPLIANCE SEQUENCE"}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="training"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-start">
                  <h5 className="font-display font-semibold text-[13px] text-neutral-950">Optimizer Convergence Rig</h5>
                  <span className="font-mono text-[8.5px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-1.5 py-0.25 rounded-sm">ADAMW CORE</span>
                </div>
                
                {/* Real interactive sliders for deep learning hyperparameters */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase font-black">
                      <span>Learning Rate (α)</span>
                      <span>{learningRate.toFixed(5)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.00001"
                      max="0.001"
                      step="0.00005"
                      value={learningRate}
                      onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                      className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-950"
                      disabled={isTraining}
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase font-black">
                      <span>Epoch Cap Limit</span>
                      <span>{epochs} Steps</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      step="1"
                      value={epochs}
                      onChange={(e) => setEpochs(parseInt(e.target.value))}
                      className="w-full h-1 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-neutral-950"
                      disabled={isTraining}
                    />
                  </div>
                </div>

                <button
                  onClick={startModelTraining}
                  disabled={isTraining}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-neutral-950 hover:bg-neutral-850 text-white hover:text-amber-300 disabled:opacity-50 text-[10px] font-mono uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  {isTraining ? `TRAINING CORES ENGAGED...` : "COMMENCE NEURAL TRAINING RUN"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* RIGHT COLUMN: INTERACTIVE VISUALIZER PLATFORMS */}
      <div className="lg:col-span-7 bg-white border border-neutral-200 p-5 rounded-xs flex flex-col justify-between overflow-hidden relative min-h-[420px] lg:min-h-0">
        <AnimatePresence mode="wait">
          {activeProjectTab === 'dwh' ? (
            <motion.div
              key="dwh-visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col justify-between space-y-4"
            >
              {/* Header metrics bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                  <span className="font-mono text-[7.5px] text-neutral-400 block uppercase font-bold">TOTAL TRANSACTIONS</span>
                  <span className="font-display font-semibold text-lg text-neutral-800 tabular-nums">
                    {totalProcessedRows.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                  <span className="font-mono text-[7.5px] text-neutral-400 block uppercase font-bold">ETL PIPELINE JITTER</span>
                  <span className="font-display font-semibold text-lg text-emerald-600 font-mono">
                    {latencyMs}ms
                  </span>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-xs">
                  <span className="font-mono text-[7.5px] text-neutral-400 block uppercase font-bold">AUDIT INTEGRITY</span>
                  <span className="font-display font-semibold text-lg text-neutral-800">
                    100.0%
                  </span>
                </div>
              </div>

              {/* Progress and graphical line bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline font-mono text-[9px] text-neutral-500">
                  <span className="uppercase font-bold">Trans-border Ledger Synchronization</span>
                  <span>{etlProgress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 border border-neutral-200/50 rounded-xs overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-neutral-900 rounded-xs"
                    animate={{ width: `${etlProgress}%` }}
                    transition={{ ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Elegant Retro terminal console displaying active hash checks */}
              <div className="flex-grow flex flex-col justify-between bg-neutral-950 text-neutral-300 rounded-xs p-4 font-mono text-[10px] space-y-3 shadow-inner min-h-[180px]">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-1">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-[#c4bbb0]" />
                    <span className="text-[9px] text-[#c4bbb0] uppercase font-semibold">Atomic Compliance Feed Log</span>
                  </div>
                  <span className="text-[8px] uppercase font-bold text-amber-500 py-0.5 px-1.5 rounded-sm bg-amber-500/10">VAULT v2.0</span>
                </div>

                {/* Event Logs list scrolling */}
                <div className="flex-grow overflow-y-auto space-y-1.5 custom-scrollbar pr-1 select-text">
                  {etlLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-neutral-400 line-clamp-2">
                      <span className="text-amber-500 shrink-0 select-none">❯</span>
                      <span className={idx === etlLogs.length - 1 ? "text-white font-medium" : ""}>{log}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-800 pt-2 flex items-center justify-between text-[9px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#c4bbb0] animate-bounce" />
                    STATUS: {etlRunning ? 'STREAMING' : 'IDLE / CALIBRATED'}
                  </span>
                  <span>SSL: SECURE</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="training-visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col justify-between space-y-6"
            >
              {/* Dynamic live performance metrics */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <span className="font-mono text-[8px] text-neutral-400 uppercase font-black">ACTIVE EPOCH ITERATION</span>
                  <div className="font-display font-semibold text-lg text-neutral-950 tabular-nums">
                    STEP {currentEpoch} / {epochs}
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-[8px] text-neutral-400 uppercase font-black">CURRENT CONVERGENCE</span>
                  <div className="font-display font-semibold text-lg text-neutral-950 tracking-tight">
                    {trainingAcc.length > 1 ? (trainingAcc[trainingAcc.length - 1] * 100).toFixed(2) : "62.00"}% ACC
                  </div>
                </div>
              </div>

              {/* Graphic Chart representation plotting gradient loss curves */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                
                {/* Loss Downward Plot */}
                <div className="space-y-2">
                  <span className="font-mono text-[8.5px] text-neutral-400 uppercase font-black block">Loss Gradient (Descends)</span>
                  <div className="h-28 border border-neutral-200 bg-neutral-50/70 p-2 rounded-xs flex items-end justify-between relative overflow-hidden">
                    {/* Visualizing path SVG curves */}
                    <svg className="absolute inset-x-0 bottom-0 h-24 w-full overflow-visible pointer-events-none">
                      <polyline
                        fill="none"
                        stroke="#e11d48"
                        strokeWidth="1.5"
                        points={trainingLoss.map((val, i) => {
                          const x = (i / epochs) * 260 + 10;
                          const y = 90 - (val / 0.85) * 75;
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                    {trainingLoss.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center z-10 shrink-0">
                        <span className="font-mono text-[7px] text-rose-600 block">{val}</span>
                        <div className="w-[1.25px] h-1.5 bg-rose-200 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Character Accuracy Ascent Plot */}
                <div className="space-y-2">
                  <span className="font-mono text-[8.5px] text-neutral-400 uppercase font-black block">Transcription Bounds Accuracy (Ascends)</span>
                  <div className="h-28 border border-neutral-200 bg-neutral-50/70 p-1.5 rounded-xs flex items-end justify-between relative overflow-hidden">
                    <svg className="absolute inset-x-0 bottom-0 h-24 w-full overflow-visible pointer-events-none">
                      <polyline
                        fill="none"
                        stroke="#059669"
                        strokeWidth="1.5"
                        points={trainingAcc.map((val, i) => {
                          const x = (i / epochs) * 260 + 10;
                          const y = 90 - ((val - 0.5) / 0.5) * 75;
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                    {trainingAcc.map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center z-10 shrink-0">
                        <span className="font-mono text-[7px] text-emerald-600 block">{(val * 100).toFixed(0)}%</span>
                        <div className="w-[1.125px] h-1.5 bg-emerald-250 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Graphic neural lattice grid block representation */}
              <div className="p-3 bg-neutral-50/70 border border-neutral-100 rounded-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4].map((node) => (
                      <motion.div
                        key={node}
                        className="w-1.5 h-1.5 bg-neutral-900 rounded-full"
                        animate={isTraining ? { scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 0.6, delay: node * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-[#252525] font-semibold">Active Node Weight Matrix</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400">STATE: {isTraining ? 'ACTIVE RUNWEIGHTS' : 'MODEL SYNCED S-RANK'}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div> 
    </div> 
  </motion.div>
  )}
</AnimatePresence>
</div>
</div>
);
}
