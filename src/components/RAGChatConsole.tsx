/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, FileText, Lock, Globe, Database, Terminal, ShieldAlert } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'system';
  text: string;
  citations?: { id: string; label: string; text: string }[];
}

export default function RAGChatConsole() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'system',
      text: "System initialized. Secure Local-First Vector Retrieval DB connected. Enter queries below regarding portfolio logs or thesis abstracts.",
      citations: []
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCitation, setActiveCitation] = useState<{ id: string; label: string; text: string } | null>(null);

  const SUGGESTED_QUERIES = [
    { text: "Where did Thareah publish studies?", query: "What are Thareah's publication venues and study landmarks?" },
    { text: "What deep architectures were modeled?", query: "Tell me about Thareah's PyTorch or neural modeling?" },
    { text: "Explain the secure bank ledger warehouse.", query: "What are the specs of the compliant banking warehouse?" }
  ];

  const handleQuerySubmit = (queryText: string) => {
    if (!queryText.trim() || loading) return;

    // Append user message
    const query = queryText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInputValue('');
    setLoading(true);
    setActiveCitation(null);

    // Simulate vector retrieval search
    setTimeout(() => {
      let botAnswer = "";
      let botCitations: { id: string; label: string; text: string }[] = [];

      const queryLower = query.toLowerCase();

      if (queryLower.includes('publish') || queryLower.includes('studies') || queryLower.includes('paper') || queryLower.includes('research')) {
        botAnswer = "Thareah has published advanced research pieces in two key venues. First, in the Journal of Medical Systems & Digital Health (2025), addressing Explainable AI frameworks for clinical triage in low-power domains. Second, in the Indo-China NLP Symposium & Archive (2024), centering on deep learning segmentation profiles for historical Khmer manuscripts.";
        botCitations = [
          {
            id: "cit-jmed",
            label: "[DOC: J-MED-SYS-2025]",
            text: "Journal of Medical Systems 2025, Sect. 4.3: Hybrid local tree surrogate classification models compressing deep weights to run on local Android clients with zero latency and 96.4% testing partition recall."
          },
          {
            id: "cit-nlp",
            label: "[DOC: INDOCHINA-NLP-2024]",
            text: "Indo-China NLP Symposium, p. 128: Hand-written digitization scans. Bounding box profiling achieves better results than classic sliding windows since glyph clusters are vertically stack-bound."
          }
        ];
      } else if (queryLower.includes('model') || queryLower.includes('pytorch') || queryLower.includes('architecture') || queryLower.includes('deep')) {
        botAnswer = "Thareah specializes in PyTorch modeling, OpenCV vision systems, and neural network compression. Notable models include U-Net convolutional segmenters for Khmer palm-leaf character boundaries, decision-making clinical frameworks with SHAP explainability matrices, and self-correcting prompt chunk routers integrated with enterprise Gemini models.";
        botCitations = [
          {
            id: "cit-unet",
            label: "[DOC: MODEL-SPEC-UNET]",
            text: "OCR System specs: PyTorch 2.3+ CUDA-optimized, leveraging native contour extraction on sparse-dense multi-layer segmentations, culminating inside localized client-side browser containers."
          }
        ];
      } else if (queryLower.includes('bank') || queryLower.includes('ledger') || queryLower.includes('warehouse') || queryLower.includes('data')) {
        botAnswer = "As Lead Intelligence Engineer, Thareah designed a secure national retail banking data warehouse implementing Data Vault 2.0 schema methodologies. Deployed under stringent security parameters, the warehouse successfully handles over 4.2 Million daily microloan transactions with zero replication data-gaps and completely tamper-proof auditing trails.";
        botCitations = [
          {
            id: "cit-vault",
            label: "[DOC: SECURE-VAULT-2.0]",
            text: "Data Vault Structural Specs: Implemented with dbt pipelines & secure PostgreSQL clusters, preserving absolute mathematical immutability for compliance logs under tight audit checks."
          }
        ];
      } else {
        botAnswer = "Query fetched. Top cosine similarity nodes references show Thareah operates high-caliber portfolios in Data Engineering (Postgres, DBT, Airflow) and Intelligent AI Modeling (PyTorch, OpenCV, Gemini frameworks). Is there a specific system exhibit or publication summary you would like to retrieve?";
        botCitations = [
          {
            id: "cit-general",
            label: "[DOC: CORE-CURATOR-BIO]",
            text: "Thareah: Enterprise architect bridging theoretical machine learning structures with durable, gorgeous, reliable client-facing products and Japanese visual standards (Pearl Idea inspired)."
          }
        ];
      }

      setMessages(prev => [...prev, { sender: 'system', text: botAnswer, citations: botCitations }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full bg-neutral-950 text-neutral-100 p-6 lg:p-8 select-none grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative overflow-y-auto lg:overflow-hidden font-mono">
      {/* Background terminal matrix lines */}
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none"></div>

      <span className="absolute top-4 right-4 text-[8px] text-neutral-600">
        ROOM://CHAMBER_3 // AIR-GAPPED RETRIEVE SYSTEM // SHIELD_STATE: LOCKED
      </span>

      {/* LEFT PANEL: INTERACTIVE TELEMETRY CHAT TERMINAL */}
      <div className="lg:col-span-7 flex flex-col justify-between h-[560px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-900">
            <Terminal className="w-4 h-4 text-[#C5BCA5]" />
            <span className="text-[10px] text-neutral-400 font-bold tracking-wider uppercase">
              LOCAL VECTOR RAG RETRIEVER PROTOCOL
            </span>
          </div>

          {/* CHAT DISPLAY SPACE */}
          <div className="h-[340px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-neutral-800">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-sm text-xs leading-relaxed max-w-[90%] ${
                  m.sender === 'user'
                    ? 'bg-neutral-900 border border-neutral-800 text-neutral-105 self-end ml-auto'
                    : 'bg-[#121212] border border-neutral-900 text-neutral-300'
                }`}
              >
                <div className="text-[8px] text-neutral-500 uppercase font-bold mb-1">
                  {m.sender === 'user' ? '// END-USER INPUT' : '// VECTOR NODE RETRIEVAL'}
                </div>
                <p className="font-sans leading-normal">{m.text}</p>

                {/* Citations block list */}
                {m.citations && m.citations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-neutral-900">
                    {m.citations.map((c) => (
                      <button
                        id={`citation-btn-${c.id}`}
                        key={c.id}
                        onClick={() => setActiveCitation(c)}
                        className={`text-[8px] font-bold px-2 py-1 rounded-sm border cursor-pointer transition-colors ${
                          activeCitation?.id === c.id
                            ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="p-3 bg-neutral-900/40 border border-neutral-900/60 rounded-sm text-xs text-neutral-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping"></div>
                <span>PERFORMING SPARSE-DENSE RETRIEVAL LOOKUPS...</span>
              </div>
            )}
          </div>
        </div>

        {/* INPUT SUBMISSION */}
        <div className="space-y-3 pt-4 border-t border-neutral-900">
          <div className="flex gap-2">
            <input
              id="rag-terminal-input"
              type="text"
              placeholder="Query portfolio indexing databases (e.g. publication history)..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit(inputValue)}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-sm px-4 py-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none focus:border-amber-500 text-white"
              disabled={loading}
            />
            <button
              id="rag-submit-btn"
              onClick={() => handleQuerySubmit(inputValue)}
              disabled={loading || !inputValue.trim()}
              className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 disabled:bg-neutral-900 disabled:text-neutral-500 text-neutral-950 rounded-sm cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* SUGGESTS */}
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUERIES.map((s, sIdx) => (
              <button
                id={`rag-suggest-btn-${sIdx}`}
                key={sIdx}
                onClick={() => handleQuerySubmit(s.query)}
                disabled={loading}
                className="text-[9px] text-neutral-450 hover:text-white hover:bg-neutral-900 transition-colors bg-neutral-950 border border-neutral-900 px-2 py-1 rounded-sm cursor-pointer"
              >
                {s.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: CITATION DOCUMENT VIEWER SHEET */}
      <div className="lg:col-span-5 bg-[#0D0D0D] border border-neutral-900 rounded-sm p-6 flex flex-col justify-between h-[560px]">
        <div>
          <div className="pb-3 border-b border-neutral-900 flex items-center justify-between text-neutral-400">
            <span className="text-[10px] uppercase tracking-wider font-bold">// SECURE LEDGER PROOF</span>
            <Lock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          </div>

          <div className="py-6 space-y-6">
            <AnimatePresence mode="wait">
              {activeCitation ? (
                <motion.div
                  key={activeCitation.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xs text-amber-500 text-[10px] font-bold flex items-center gap-1.5 uppercase">
                    <FileText className="w-4 h-4" />
                    INDEX NODE RETRIEVED: {activeCitation.label}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[8px] text-neutral-500 uppercase block font-bold leading-none">
                      DE-COMPRESSED DOCUMENT BOUNDS
                    </span>
                    <p className="text-neutral-300 text-xs leading-relaxed font-sans bg-neutral-950 p-4 rounded-sm border border-neutral-900">
                      {activeCitation.text}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-[280px] flex flex-col items-center justify-center text-center text-neutral-600 gap-2 border border-dashed border-neutral-900 p-6 rounded-sm">
                  <Database className="w-8 h-8 text-neutral-700" />
                  <p className="text-[10px] leading-relaxed">
                    Click any citation node pill on the response sheets to inspect the cryptographic origin documents stored securely in the knowledge graph.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Audit bottom banner */}
        <div className="p-3 bg-neutral-950 rounded-xs border border-neutral-900 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[9px] font-bold text-red-500">
            <ShieldAlert className="w-4 h-4" />
            COMPLIANCE GUARD ACTIVE
          </div>
          <p className="text-[8px] text-neutral-500 leading-normal font-sans">
            Secure client proxies enforce semantic boundaries, filtering unauthorized SQL injections or prompt hacking arrays. Zero document leak threshold guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
}
