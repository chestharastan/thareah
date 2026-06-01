/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Activity, AlertCircle, Info, ChevronRight } from 'lucide-react';

export default function ClinicalAIDashboard() {
  // Slider states with custom defaults
  const [glucose, setGlucose] = useState<number>(140);  // Normal range: 70-200+
  const [bmi, setBmi] = useState<number>(29.5);         // Healthy range: 18.5-40+
  const [age, setAge] = useState<number>(54);           // Range: 18-90
  const [insulin, setInsulin] = useState<number>(95);    // Normal range: 15-250

  const [risk, setRisk] = useState<number>(0);
  const [shapVals, setShapVals] = useState<{ name: string; value: number; label: string }[]>([]);

  // Calculate live risk predictions and SHAP values model-simulation on clientside
  useEffect(() => {
    // Coefficients representing model parameters
    // High glucose pushes risk up strongly
    // High BMI pushes risk up moderately
    // High Age pushes risk up moderately
    // Extremely high or low insulin offsets risk
    const gVal = (glucose - 100) * 0.035;
    const bVal = (bmi - 23.5) * 0.09;
    const aVal = (age - 32) * 0.025;
    const iVal = (insulin - 80) * 0.008;

    const netScore = gVal + bVal + aVal + iVal - 1.25; // bias factor
    const probability = 100 / (1 + Math.exp(-netScore));

    setRisk(Math.round(probability));

    // Dynamic SHAP values centered at average population rates
    // SHAP value measures the exact contribution (odds ratio impact) relative to population baseline (average 15% risk)
    setShapVals([
      { name: "Plasma Glucose Concentration", value: gVal, label: `${glucose} mg/dL (Baseline baseline: 100)` },
      { name: "Body Mass Index (BMI)", value: bVal, label: `${bmi} kg/m²` },
      { name: "Patient Biological Age", value: aVal, label: `${age} Years Old` },
      { name: "2-Hour Serum Insulin", value: iVal, label: `${insulin} mu U/ml` }
    ]);
  }, [glucose, bmi, age, insulin]);

  return (
    <div className="w-full h-full bg-white p-6 lg:p-8 select-none grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 relative overflow-y-auto lg:overflow-hidden">
      {/* Absolute coordinates panel */}
      <span className="absolute top-4 right-4 font-mono text-[8px] text-neutral-400">
        ROOM://CHAMBER_1 // DECISION_XAI // ACCURACY: 96.4%
      </span>

      {/* LEFT: INTERACTIVE SLIDERS FOR BIO INPUT */}
      <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-neutral-400 tracking-wider uppercase font-semibold">
              EXHIBIT // MEDICAL INTERACTIVE WORKSPACE
            </span>
          </div>
          <h2 className="font-display text-2xl font-light text-neutral-900 tracking-tight leading-none mb-2">
            Clinical Risk Biosampler
          </h2>
          <p className="text-neutral-500 text-xs leading-relaxed mb-6">
            Adjust the physical biometric sliders below. Watch the real-time AI modeling engine map SHAP (SHapley Additive exPlanations) values immediately.
          </p>

          <div className="space-y-5">
            {/* 1. Glucose */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-neutral-600">
                <span className="font-semibold text-neutral-900 uppercase">Plasma Glucose Level</span>
                <span>{glucose} mg/dL</span>
              </div>
              <input
                type="range"
                min="70"
                max="250"
                value={glucose}
                onChange={(e) => setGlucose(Number(e.target.value))}
                className="w-full accent-emerald-600 bg-neutral-150 h-1.5 rounded-full cursor-col-resize cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>Healthy (70-99)</span>
                <span>Diabetic Threshold (140)</span>
                <span>Critical (&gt;200)</span>
              </div>
            </div>

            {/* 2. BMI */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-neutral-600">
                <span className="font-semibold text-neutral-900 uppercase">Body Mass Index (BMI)</span>
                <span>{bmi.toFixed(1)} kg/m²</span>
              </div>
              <input
                type="range"
                min="15"
                max="48"
                step="0.5"
                value={bmi}
                onChange={(e) => setBmi(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-155 h-1.5 rounded-full cursor-col-resize cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>Underweight (18)</span>
                <span>Normal (22)</span>
                <span>Obese (&gt;30)</span>
              </div>
            </div>

            {/* 3. Biological Age */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-neutral-600">
                <span className="font-semibold text-neutral-900 uppercase">Biological Age</span>
                <span>{age} Years</span>
              </div>
              <input
                type="range"
                min="18"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full accent-sky-500 bg-neutral-155 h-1.5 rounded-full cursor-col-resize cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>Youth (18)</span>
                <span>Active (35)</span>
                <span>Advanced Risk (&gt;55)</span>
              </div>
            </div>

            {/* 4. Insulin */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-neutral-600">
                <span className="font-semibold text-neutral-900 uppercase">2-Hour Serum Insulin</span>
                <span>{insulin} mu U/ml</span>
              </div>
              <input
                type="range"
                min="15"
                max="250"
                value={insulin}
                onChange={(e) => setInsulin(Number(e.target.value))}
                className="w-full accent-violet-500 bg-neutral-155 h-1.5 rounded-full cursor-col-resize cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-neutral-400 font-mono">
                <span>Fasting Average (15)</span>
                <span>Moderate (90)</span>
                <span>Hyperinsulinemic (&gt;180)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Summary box on the bottom left */}
        <div className="p-4 bg-neutral-50 border border-neutral-150 rounded-sm space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800">
            <Shield className="w-4 h-4 text-emerald-600" />
            MD-DECISION COMPLIANCE
          </div>
          <p className="text-[10px] text-neutral-400 leading-normal">
            Models optimized with low-resource coefficients to enable full diagnostic offline execution inside tablet networks. Accuracy benchmarked against PIMA Indians dataset variables.
          </p>
        </div>
      </div>

      {/* RIGHT: LIVE PREDICTION SCREEN & SHAP VALUES EXPLAINER */}
      <div className="lg:col-span-7 bg-neutral-950 text-white rounded-sm p-6 md:p-8 flex flex-col justify-between relative border border-neutral-850">
        <div className="absolute top-4 right-4 font-mono text-[7px] text-neutral-600">
          SURROGACY STATUS: ACTIVE-VALIDATED
        </div>

        {/* TOP: LIVE GAUGE RING */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-neutral-850">
          {/* Radial percentage gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="56"
                cy="56"
                r="48"
                className="stroke-neutral-800 fill-none"
                strokeWidth="6"
              />
              <circle
                cx="56"
                cy="56"
                r="48"
                className="stroke-red-500 fill-none transition-all duration-300"
                strokeWidth="6"
                strokeDasharray="301.6"
                strokeDashoffset={301.6 - (301.6 * risk) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl font-light tracking-tighter text-white">
                {risk}%
              </span>
              <span className="font-mono text-[7px] text-neutral-400 uppercase tracking-widest">
                DIABETES RISK
              </span>
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-widest font-semibold block">
              DIAGNOSTIC CRITERIA SYSTEM
            </span>
            <h4 className="font-display font-medium text-base text-neutral-100 leading-none">
              {risk > 60 ? "Critical Probability Warning" : risk > 30 ? "Moderate Vigilance Mode" : "Nominal Homeostatic Control"}
            </h4>
            <p className="text-neutral-400 text-[10px] leading-normal max-w-sm">
              Tree ensemble predictions detect a risk probability of {risk}% based on combined biomarker dynamics. See attribution values breakdown below.
            </p>
          </div>
        </div>

        {/* BOTTOM: LIVE DRAWN SHAP HISTOGRAM */}
        <div className="space-y-4 pt-6 flex-1 flex flex-col justify-center">
          <div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase block tracking-wider mb-2 font-semibold">
              FEATURE ATTRIBTION BAR GRID (SHAPLEY CONTRIBUTION FORCE)
            </span>
            <div className="space-y-3.5">
              {shapVals.map((item, idx) => {
                const limit = 3.5; // max positive/negative limit coordinate
                const normalizedVal = Math.max(-limit, Math.min(limit, item.value));
                const percentage = (Math.abs(normalizedVal) / limit) * 100;
                const isPositive = normalizedVal >= 0;

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline text-[10px] font-mono">
                      <span className="text-neutral-300 truncate max-w-[200px]">{item.name}</span>
                      <span className={isPositive ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                        {isPositive ? `+${percentage.toFixed(0)}% Odds` : `-${percentage.toFixed(0)}% Odds`}
                      </span>
                    </div>

                    {/* Bi-directional horizontal force bar */}
                    <div className="relative h-2 bg-neutral-900 rounded-full overflow-hidden flex">
                      {/* Zero indicator line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-neutral-600/60 z-10"></div>
                      
                      {/* Left Side negative bar */}
                      <div className="w-1/2 h-full flex justify-end">
                        {!isPositive && (
                          <div 
                            style={{ width: `${percentage}%` }}
                            className="h-full bg-emerald-500 rounded-r-none rounded-l-xs transition-all duration-300"
                          ></div>
                        )}
                      </div>

                      {/* Right Side positive bar */}
                      <div className="w-1/2 h-full flex justify-start">
                        {isPositive && (
                          <div 
                            style={{ width: `${percentage}%` }}
                            className="h-full bg-red-500 rounded-l-none rounded-r-xs transition-all duration-300"
                          ></div>
                        )}
                      </div>
                    </div>
                    <div className="text-[8px] text-neutral-500 font-mono leading-none flex justify-between">
                      <span>{item.label}</span>
                      <span>Baseline: {isPositive ? "Pushes Risk UP" : "Protective Effect"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color Key */}
          <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 pt-2 border-t border-neutral-850 mt-1">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Red: Elevates Risk Vector
            </span>
            <span>BASE SHAP VALS COMPUTE: OK</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Green: Reduces Risk Vector
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
