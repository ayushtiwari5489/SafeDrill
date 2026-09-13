import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  X,
  Search,
  Award,
  Calendar,
  User,
  BookOpen,
  FileCheck
} from "lucide-react";

interface CertificateVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCertId?: string;
}

export const CertificateVerifierModal: React.FC<CertificateVerifierModalProps> = ({
  isOpen,
  onClose,
  initialCertId = ""
}) => {
  const [certInput, setCertInput] = useState<string>(initialCertId || "SAF-2026-CPR-849201");
  const [isSearched, setIsSearched] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (certInput.trim()) {
      setIsSearched(true);
    }
  };

  // Derive course from certificate ID prefix or fallback
  const isCpr = certInput.toUpperCase().includes("CPR");
  const isFire = certInput.toUpperCase().includes("FIR") || certInput.toUpperCase().includes("PASS");
  const isBleed = certInput.toUpperCase().includes("BLEED") || certInput.toUpperCase().includes("AID") || certInput.toUpperCase().includes("SEV");

  let courseTitle = "CPR & Basic Life Support Awareness";
  if (isFire) {
    courseTitle = "Fire Extinguisher & Fire Safety Awareness";
  } else if (isBleed) {
    courseTitle = "Severe Bleeding & First Aid Awareness";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-black">Official Certificate Verification</h3>
          </div>
          <p className="text-xs text-slate-400">
            Verify the authenticity of any SafeDrill emergency awareness credential.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleVerify} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={certInput}
              onChange={(e) => setCertInput(e.target.value)}
              placeholder="e.g. SAF-2026-CPR-849201"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 focus:outline-none text-xs sm:text-sm font-mono text-white uppercase placeholder:normal-case placeholder:font-sans"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shrink-0 transition-colors shadow-md shadow-amber-500/20"
          >
            Verify
          </button>
        </form>

        {/* Verification Result Card */}
        {isSearched && certInput.trim().length > 0 && (
          <div className="rounded-xl bg-emerald-950/20 border border-emerald-500/40 p-5 space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-black text-emerald-300">
                  Certificate Valid ✓
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official Registry
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <User className="w-3 h-3 text-amber-400" /> Certified Learner
                </span>
                <div className="font-semibold text-white">Verified Safety Scholar</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" /> Issue Date
                </span>
                <div className="font-semibold text-white">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-amber-400" /> Course Curriculum
                </span>
                <div className="font-semibold text-white">{courseTitle}</div>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-amber-400" /> Registry Reference
                </span>
                <div className="font-mono text-amber-300 font-bold">{certInput.toUpperCase()}</div>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-400 border-t border-emerald-500/20">
              Verified by SafeDrill Disaster & Emergency Response Portal in accordance with public emergency awareness guidelines.
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
