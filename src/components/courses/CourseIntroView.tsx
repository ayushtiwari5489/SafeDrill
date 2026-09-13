import React from "react";
import { CourseIntroContent } from "../../types";
import {
  BookOpen,
  Phone,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  Info
} from "lucide-react";

interface CourseIntroViewProps {
  courseTitle: string;
  category: string;
  intro: CourseIntroContent;
  onComplete: () => void;
  alreadyCompleted?: boolean;
}

export const CourseIntroView: React.FC<CourseIntroViewProps> = ({
  courseTitle,
  category,
  intro,
  onComplete,
  alreadyCompleted = false
}) => {
  return (
    <div
      id="course-intro-view"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Module 1: Core Awareness
            </span>
            <span className="text-xs text-slate-400">{category}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {courseTitle} — Foundational Awareness
          </h3>
        </div>

        {alreadyCompleted && (
          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed
          </div>
        )}
      </div>

      {/* What it is & Why it Matters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4" /> What It Is
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {intro.whatItIs}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-4 h-4" /> Why Every Second Matters
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {intro.whyItMatters}
          </p>
        </div>
      </div>

      {/* The Golden Rule Callout */}
      <div className="p-4 sm:p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
        <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-black text-amber-400 uppercase tracking-wider">
            Primary Safety Principle
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed">
            {intro.goldenRule}
          </p>
        </div>
      </div>

      {/* Recognizing the Emergency */}
      <div className="space-y-3">
        <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-red-400" /> How to Recognize This Emergency:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {intro.recognizingEmergency.map((sign, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                {idx + 1}
              </div>
              <span className="text-xs text-slate-300 leading-relaxed">{sign}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Helplines */}
      <div className="space-y-3">
        <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Phone className="w-4 h-4 text-emerald-400" /> Critical Emergency Helplines:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {intro.helplineNumbers.map((hl, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1"
            >
              <div className="text-xs text-slate-400 font-medium">{hl.name}</div>
              <div className="text-2xl font-black text-emerald-400 tracking-tight font-mono">
                {hl.number}
              </div>
              <div className="text-[10px] text-slate-500">{hl.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Authority Alignment & Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/60 text-xs text-slate-400 space-y-1.5">
        <div className="text-[11px] font-bold text-slate-300">Curriculum Source & Verification:</div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          {intro.authorityReference}
        </p>
      </div>

      {/* Completion Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Step 1 of 7 in the {courseTitle} curriculum.
        </span>

        <button
          onClick={onComplete}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
        >
          <span>Mark Introduction Complete & Next: Video Lesson</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
