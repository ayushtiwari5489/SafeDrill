import React, { useState } from "react";
import { CourseProgressRecord } from "../../types";
import {
  Award,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  QrCode,
  Calendar,
  Clock,
  Building,
  User,
  Sparkles
} from "lucide-react";

interface CourseCertificateProps {
  courseId: string;
  courseTitle: string;
  category: string;
  progress: CourseProgressRecord;
  onJumpToStep: (step: "intro" | "video" | "guidelines" | "drill" | "scenarios" | "assessment") => void;
  onOpenVerifier: (certId: string) => void;
}

export const CourseCertificate: React.FC<CourseCertificateProps> = ({
  courseId,
  courseTitle,
  category,
  progress,
  onJumpToStep,
  onOpenVerifier
}) => {
  const defaultName = progress.learnerName || "Verified Safety Scholar";
  const [learnerName, setLearnerName] = useState<string>(defaultName);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  // Generate or retrieve stable cert ID
  const certId =
    progress.certificateId ||
    `SAF-2026-${courseId.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

  const completionDate =
    progress.completionDate ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const isUnlocked = progress.passed && progress.assessmentCompleted;

  const handlePrint = () => {
    window.print();
  };

  // If not unlocked, show requirements checklist
  if (!isUnlocked) {
    const checklist = [
      { id: "intro" as const, label: "Module 1: Foundational Awareness", completed: progress.introCompleted },
      { id: "video" as const, label: "Module 2: Certified Video Masterclass", completed: progress.videoCompleted },
      { id: "guidelines" as const, label: "Module 3: Practical Guidelines & Protocols", completed: progress.guidelinesCompleted },
      { id: "drill" as const, label: "Module 4: Reusable Interactive Emergency Drill", completed: progress.drillCompleted },
      { id: "scenarios" as const, label: "Module 5: Realistic Multi-Environment Scenarios", completed: progress.scenariosCompleted },
      { id: "assessment" as const, label: "Module 6: Final Assessment (Pass ≥ 70%)", completed: progress.assessmentCompleted && progress.passed }
    ];

    return (
      <div
        id="course-certificate-locked"
        className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl"
      >
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Certificate Locked</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            To ensure genuine emergency response competence, you must complete all course modules and achieve a passing score of at least 70% on the final assessment.
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="max-w-lg mx-auto rounded-xl bg-slate-950 border border-slate-800 divide-y divide-slate-800/80">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="p-3.5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                {item.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                )}
                <span className={item.completed ? "text-slate-300 line-through opacity-80" : "text-white font-medium"}>
                  {item.label}
                </span>
              </div>

              {!item.completed && (
                <button
                  onClick={() => onJumpToStep(item.id)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <span>Complete</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      id="course-certificate-unlocked"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Certified Credential Unlocked
            </span>
            <span className="text-xs text-slate-400">Official SafeDrill Credential</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Certificate of Emergency Preparedness
          </h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onOpenVerifier(certId)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Verify Online</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Name Customizer */}
      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <User className="w-4 h-4 text-amber-400" />
          <span>Learner Name on Certificate:</span>
          <span className="font-bold text-white">{learnerName}</span>
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400 flex-1 sm:w-48"
              placeholder="Enter full name"
            />
            <button
              onClick={() => setIsEditingName(false)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingName(true)}
            className="text-amber-400 hover:text-amber-300 underline font-semibold text-xs"
          >
            Change Name
          </button>
        )}
      </div>

      {/* THE OFFICIAL CERTIFICATE CANVAS */}
      <div
        id="printable-certificate"
        className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-500/50 p-6 sm:p-10 shadow-2xl overflow-hidden text-center space-y-6"
      >
        {/* Subtle decorative background watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
          <ShieldCheck className="w-96 h-96 text-amber-400" />
        </div>

        {/* Certificate Header */}
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-2">
            <Award className="w-10 h-10" />
          </div>

          <div className="text-[11px] font-black uppercase tracking-widest text-amber-400">
            SafeDrill Public Safety & Emergency Response Initiative
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase font-serif">
            Certificate of Completion
          </h2>

          <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>

        {/* Body Text */}
        <div className="space-y-4 relative z-10 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-400 font-serif italic">
            This certifies that
          </p>

          <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wide font-serif border-b border-amber-500/30 pb-2 inline-block px-8">
            {learnerName}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            has successfully completed all instructional modules, interactive drills, realistic environmental scenarios, and the verified final assessment for:
          </p>

          <div className="text-lg sm:text-xl font-black text-white uppercase tracking-wider bg-slate-900/90 py-2.5 px-4 rounded-xl border border-slate-700 shadow-inner">
            {courseTitle} Awareness
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Demonstrating foundational competence in emergency scene assessment, rapid decision-making protocols, and public safety procedures aligned with recognized disaster management guidelines.
          </p>
        </div>

        {/* Certificate Footer: ID, Date, Authority, Signatures */}
        <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end relative z-10 text-left">
          {/* Certificate ID & QR representation */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">Certificate ID</div>
                <div className="font-mono text-xs font-bold text-amber-300">{certId}</div>
              </div>
            </div>
            <div className="text-[9px] text-slate-500">
              Verify online: safedrill.gov.in/verify/{certId}
            </div>
          </div>

          {/* Date & Duration */}
          <div className="text-center sm:text-left space-y-1">
            <div className="text-[10px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3 h-3 text-amber-400" /> Date: <strong className="text-white">{completionDate}</strong>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> Duration: <strong className="text-white">45 Min Curriculum</strong>
            </div>
          </div>

          {/* Signature / Seal representation */}
          <div className="text-center sm:text-right space-y-1">
            <div className="inline-block border-b border-slate-700 pb-1 px-4">
              <span className="font-serif italic text-amber-400 text-sm font-semibold">
                SafeDrill Academic Board
              </span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-bold">
              Director of Emergency Training
            </div>
            <div className="text-[9px] text-slate-500">
              Disaster Preparedness Council
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
