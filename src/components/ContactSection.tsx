/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, FileText, CheckCircle, Trash2, Calendar, HelpCircle } from 'lucide-react';

interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  timestamp: string;
  isUrgent: boolean;
}

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Full-Stack Web Dev');
  const [message, setMessage] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [messages, setMessages] = useState<InquiryMessage[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Load existing messages on mount
  useEffect(() => {
    const stored = localStorage.getItem('thareah_contact_logs');
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse contact logs", e);
      }
    } else {
      // Add a welcoming default placeholder message so it's not looking empty!
      const welcomeMsg: InquiryMessage = {
        id: "sys-welcome",
        name: "Welcome Co-Pilot",
        email: "dohloot@gmail.com",
        category: "Visual Presentation / VMD",
        message: "Hello! Thank you for looking through our portfolio. Feel free to type anything in the fields above and hit 'Transmit Inquiry' to test the persistent terminal log below.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " UTC",
        isUrgent: false
      };
      setMessages([welcomeMsg]);
      localStorage.setItem('thareah_contact_logs', JSON.stringify([welcomeMsg]));
    }
  }, []);

  const handleClearLogs = () => {
    if (window.confirm("Do you want to reset the local transmission terminal?")) {
      const storedWelcome = messages.filter(m => m.id === "sys-welcome");
      setMessages(storedWelcome);
      localStorage.setItem('thareah_contact_logs', JSON.stringify(storedWelcome));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all mandatory inquiry fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate cinematic data transmission
    setTimeout(() => {
      const newInquiry: InquiryMessage = {
        id: "msg-" + Date.now(),
        name: name.trim(),
        email: email.trim(),
        category,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " UTC",
        isUrgent
      };

      const updated = [newInquiry, ...messages];
      setMessages(updated);
      localStorage.setItem('thareah_contact_logs', JSON.stringify(updated));

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
      setIsUrgent(false);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Hide success notification after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#fcfbf9] py-16 md:py-24 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 md:px-12 select-text">
        {/* SECTION LABELING */}
        <div className="space-y-3 mb-16">
          <span className="font-mono text-[9px] md:text-[10px] text-amber-600 font-extrabold block uppercase tracking-widest">
            CHAMBER_06 // SECURE CONTACT GATEWAY
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 
              className="font-display text-4xl md:text-5xl font-light text-neutral-950 tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Get in Touch.
            </h2>
            <p className="text-neutral-500 font-mono text-[10px] md:text-xs leading-relaxed max-w-sm">
              Transmit a direct inquiry to Thareah's operational terminal below. Logs are parsed and kept in persistent local storage.
            </p>
          </div>
        </div>

        {/* DOUBLE COLUMN TERMINAL LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* LEFT: FORM BOX */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-6 bg-white p-6 md:p-8 border border-neutral-200/80 rounded-xs space-y-5 shadow-xs">
            <span className="font-mono text-[8px] text-neutral-400 font-bold uppercase block border-b border-neutral-100 pb-2.5">
              NEW TRANSACTION FORM // SECURE PORT_8080
            </span>

            {/* Success message floating alert */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 border border-emerald-200 text-emerald-850 p-3.5 text-xs rounded-xs flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong className="font-sans block">Inquiry Transmitted Successfully!</strong>
                    Your message has been stored in the persistent terminal loop below. Feel free to review or inspect it.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-semibold block">
                  Your Name <span className="text-amber-600 font-bold">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Satoshi" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fafafd] border border-neutral-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm px-3 py-2 text-xs font-sans text-neutral-800 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-neutral-500 uppercase font-semibold block">
                  Email Address <span className="text-amber-600 font-bold">*</span>
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fafafd] border border-neutral-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm px-3 py-2 text-xs font-sans text-neutral-800 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-neutral-500 uppercase font-semibold block">
                Operational Discipline Interest
              </label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#fafafd] border border-neutral-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm px-3 py-2.5 text-xs font-sans text-neutral-800 outline-none cursor-pointer transition-colors"
              >
                <option value="Full-Stack Web Dev">Full-Stack Web Dev & UI systems</option>
                <option value="Visual Presentation / VMD">Visual Presentation / Space Merchandising</option>
                <option value="Intelligent AI systems">Cognitive AI systems & OCR Vision</option>
                <option value="General Conversation">General Partnership / Conversation</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-neutral-500 uppercase font-semibold block">
                Detailed Inquiry Message <span className="text-amber-600 font-bold">*</span>
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Describe your design objectives, timelines or system questions..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#fafafd] border border-neutral-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-sm px-3 py-2 text-xs font-sans text-neutral-800 outline-none transition-colors"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input 
                type="checkbox" 
                id="urgent-checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-3.5 h-3.5 text-amber-500 bg-[#fafafd] border-neutral-200 focus:ring-amber-500 focus:ring-0 rounded-xs cursor-pointer"
              />
              <label htmlFor="urgent-checkbox" className="font-mono text-[9px] text-neutral-600 uppercase font-medium cursor-pointer select-none">
                Request priority routing (Urgent review requested)
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2.5 rounded-sm font-mono text-[10px] tracking-widest font-black uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isSubmitting 
                  ? 'bg-neutral-200 text-neutral-400 border border-neutral-200' 
                  : 'bg-neutral-950 text-white hover:bg-neutral-800 border border-neutral-900'
              }`}
            >
              <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
              {isSubmitting ? 'Transmitting data payload...' : 'Transmit Inquiry'}
            </button>
          </form>

          {/* RIGHT: LOCAL TERMINAL LOG */}
          <div className="lg:col-span-6 bg-[#161512] text-[#e2dfd9] p-6 rounded-xs border border-neutral-900 shadow-inner space-y-4 font-mono select-text">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-wider text-amber-500 uppercase">
                  OPERATIONAL INQUIRY LOGS
                </span>
                <span className="text-[7.5px] text-neutral-500">[{messages.length} RECORDED]</span>
              </div>
              <button 
                onClick={handleClearLogs}
                className="p-1 px-2 border border-neutral-800 rounded-sm text-[8px] hover:text-[#fff] hover:bg-neutral-900/60 transition-colors flex items-center gap-1 cursor-pointer"
                title="Wipe Logs"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
                RESET LOGS
              </button>
            </div>

            {/* List of received inquiries */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto custom-scrollbar pr-1.5 text-left">
              {messages.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 space-y-2">
                  <FileText className="w-8 h-8 text-neutral-600 mx-auto animate-pulse" />
                  <p className="text-[9px] uppercase tracking-wider">No active transmissions stored on loop.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isExpanded = expandedId === msg.id;
                  return (
                    <div 
                      key={msg.id}
                      className={`p-3 border rounded-xs transition-all ${
                        isExpanded 
                          ? 'bg-[#22211d] border-amber-600/60' 
                          : 'bg-[#1c1a16] border-neutral-800 hover:border-neutral-700 cursor-pointer'
                      }`}
                      onClick={() => setExpandedId(isExpanded ? null : msg.id)}
                    >
                      <div className="flex items-center justify-between text-[9px] mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans font-bold text-neutral-200">
                            {msg.name}
                          </span>
                          <span className="text-neutral-500 font-mono">
                            &lt;{msg.email}&gt;
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] mt-1 text-amber-500/80">
                        <span>PORTAL: {msg.category}</span>
                        {msg.isUrgent && (
                          <span className="bg-red-900/60 text-red-200 border border-red-500/30 px-1 py-0.2 rounded-xs uppercase leading-none font-extrabold tracking-widest animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>

                      {/* Msg Details */}
                      <div className={`mt-2.5 text-[10px] leading-relaxed font-sans text-neutral-300 border-t border-neutral-800/60 pt-2 ${
                        isExpanded ? 'block' : 'line-clamp-1 opacity-70 text-[9px]'
                      }`}>
                        {msg.message}
                      </div>

                      {!isExpanded && (
                        <div className="text-center text-[7px] text-neutral-500 hover:text-neutral-400 mt-1 cursor-pointer select-none font-mono">
                          [ CLICK TO EXPAND METADATA ]
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Instruction Footer */}
            <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[8px] text-neutral-500">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3" />
                DURABLE CLIENT TRANSACTION STORAGE ACTIVE
              </span>
              <span>TYPE: READ_WRITE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
