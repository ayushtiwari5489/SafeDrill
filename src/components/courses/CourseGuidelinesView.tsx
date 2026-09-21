import React from "react";
import { CourseGuidelineContent } from "../../types";
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Info
} from "lucide-react";

interface CourseGuidelinesViewProps {
  courseTitle: string;
  guidelines: CourseGuidelineContent;
  onComplete: () => void;
  alreadyCompleted?: boolean;
}

export const CourseGuidelinesView: React.FC<CourseGuidelinesViewProps> = ({
  courseTitle,
  guidelines,
  onComplete,
  alreadyCompleted = false
}) => {
  return (
    <div
      id="course-guidelines-view"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Module 3: Protocol Guidelines
            </span>
            <span className="text-xs text-slate-400">Step-by-step actions</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {courseTitle} — Practical Guidelines
          </h3>
        </div>

        {alreadyCompleted && (
          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Completed
          </div>
        )}
      </div>

      {/* Mandatory Awareness Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-400">
            Awareness Education Notice:
          </span>
          <p className="leading-relaxed">
            {guidelines.awarenessDisclaimer}
          </p>
        </div>
      </div>

      {/* Step-by-Step Instructions Grid */}
      <div className="space-y-3">
        <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-4 h-4 text-amber-400" /> Standard Sequence of Action:
        </div>

        <div className="space-y-3">
          {guidelines.coreSteps.map((step) => (
            <div
              key={step.number}
              className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm shadow-md shadow-amber-500/20">
                  {step.number}
                </div>

                <div className="space-y-1 flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {step.detail}
                  </p>

                  {step.actionCallout && (
                    <div className="mt-2 text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Key Focus: {step.actionCallout}
                    </div>
                  )}

                  {step.caution && (
                    <div className="mt-2 text-xs text-red-300 bg-red-950/40 p-2.5 rounded-lg border border-red-500/30 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{step.caution}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do / Don't Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* DO's */}
        <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Crucial DO's
          </div>
          <ul className="space-y-2.5">
            {guidelines.dos.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DON'T's */}
        <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-3">
          <div className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
            <XCircle className="w-4 h-4" /> Dangerous DON'T's
          </div>
          <ul className="space-y-2.5">
            {guidelines.donts.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                <span className="text-red-400 font-bold shrink-0">✕</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning Boxes */}
      {guidelines.warningBoxes && guidelines.warningBoxes.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Life-Safety Warnings:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guidelines.warningBoxes.map((box, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-1.5 ${
                  box.level === "danger"
                    ? "bg-red-950/40 border-red-500/40 text-red-100"
                    : "bg-amber-950/40 border-amber-500/40 text-amber-100"
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle
                    className={`w-4 h-4 ${
                      box.level === "danger" ? "text-red-400" : "text-amber-400"
                    }`}
                  />
                  <span>{box.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{box.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Decision Points Table */}
      {guidelines.emergencyDecisions && guidelines.emergencyDecisions.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-400" /> Emergency Decision Points:
          </div>

          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-900/80 p-3">
              <div>If You Observe This Condition...</div>
              <div className="pt-2 md:pt-0">Immediate Protocol Action</div>
            </div>
            <div className="divide-y divide-slate-800/80">
              {guidelines.emergencyDecisions.map((pt, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 p-3 text-xs"
                >
                  <div className="text-slate-200 font-medium pr-2">{pt.condition}</div>
                  <div className="text-amber-300 font-semibold pt-2 md:pt-0 md:pl-2">
                    {pt.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion Action */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Step 3 of 7 in the {courseTitle} curriculum.
        </span>

        <button
          onClick={onComplete}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/20"
        >
          <span>Mark Guidelines Complete & Next: Interactive Drill</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
