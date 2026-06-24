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
        name: "Welcome",
        email: "dohloot@gmail.com",
        category: "General Conversation",
        message: "Hello! Thank you for looking through the portfolio. Feel free to type anything in the fields above and hit 'Transmit Inquiry' to test the persistent terminal log below.",
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
        <div className="space-y-3 mb-16 text-center">
          <span className="font-mono text-[9px] md:text-[10px] text-amber-600 font-extrabold block uppercase tracking-widest">
            CHAMBER_06 // SECURE CONTACT GATEWAY
          </span>
          <div className="flex flex-col items-center gap-6">
            <h2 
              className="font-display text-4xl md:text-5xl font-light text-neutral-950 tracking-tight leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Get in Touch.
            </h2>
            {/* <p className="text-neutral-500 font-mono text-[10px] md:text-xs leading-relaxed max-w-sm">
              Transmit a direct inquiry to Thareah's operational terminal below. Logs are parsed and kept in persistent local storage.
            </p> */}
          </div>
        </div>

        {/* SINGLE COLUMN TERMINAL LAYOUT */}
        <div className="flex justify-center">
          <form onSubmit={handleFormSubmit} className="w-full max-w-2xl bg-white p-6 md:p-8 border border-neutral-200/80 rounded-xs space-y-5 shadow-xs">
            <span className="font-mono text-[8px] text-neutral-400 font-bold uppercase block border-b border-neutral-100 pb-2.5 text-center">
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
                <option value="Visual Presentation / Space Merchandising">Visual Presentation / Space Merchandising</option>
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
        </div>
      </div>
    </div>
  );
}
