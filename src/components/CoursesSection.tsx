import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, Clock, Heart, Flame, Shield, Sparkles, 
  Tv, Play, Award, ShieldCheck, Bookmark, FileText, 
  Compass, Zap, Lock, ArrowRight, RotateCcw, Search, Eye
} from "lucide-react";
import { COURSES } from "../data";
import { 
  CourseModule, 
  CourseLearningStep, 
  CourseProgressRecord 
} from "../types";
import { 
  CPR_INTRO, CPR_GUIDELINES, CPR_DRILLS, CPR_SCENARIOS, CPR_ASSESSMENT,
  BLEEDING_INTRO, BLEEDING_GUIDELINES, BLEEDING_DRILLS, BLEEDING_SCENARIOS, BLEEDING_ASSESSMENT,
  FIRE_INTRO, FIRE_GUIDELINES, FIRE_DRILLS, FIRE_SCENARIOS, FIRE_ASSESSMENT
} from "../courseData";

import { CourseVideoPlayer } from "./CourseVideoPlayer";
import { CourseIntroView } from "./courses/CourseIntroView";
import { CourseGuidelinesView } from "./courses/CourseGuidelinesView";
import { InteractiveDrill } from "./courses/InteractiveDrill";
import { RealisticScenarios } from "./courses/RealisticScenarios";
import { FinalAssessment } from "./courses/FinalAssessment";
import { CourseCertificate } from "./courses/CourseCertificate";
import { CertificateVerifierModal } from "./courses/CertificateVerifierModal";

interface CoursesSectionProps {
  onScoreEarned?: (points: number) => void;
}

const DEFAULT_PROGRESS: CourseProgressRecord = {
  introCompleted: false,
  videoCompleted: false,
  guidelinesCompleted: false,
  drillCompleted: false,
  scenariosCompleted: false,
  assessmentCompleted: false,
  passed: false,
};

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onScoreEarned }) => {
  // Only the 3 requested courses: CPR, Severe Bleeding, and Fire Extinguisher
  const allowedCourseIds = ["cpr-basics", "bleeding-control", "fire-extinguisher-pass"];
  const availableCourses = COURSES.filter((c) => allowedCourseIds.includes(c.id));

  const [selectedCourseId, setSelectedCourseId] = useState<string>("cpr-basics");
  const [activeStep, setActiveStep] = useState<CourseLearningStep>("intro");

  // Progress records mapped by courseId
  const [progressMap, setProgressMap] = useState<Record<string, CourseProgressRecord>>(() => {
    const initial: Record<string, CourseProgressRecord> = {};
    allowedCourseIds.forEach((id) => {
      try {
        const saved = localStorage.getItem(`safedrill_course_${id}`);
        if (saved) {
          initial[id] = JSON.parse(saved);
        } else {
          initial[id] = { ...DEFAULT_PROGRESS };
        }
      } catch {
        initial[id] = { ...DEFAULT_PROGRESS };
      }
    });
    return initial;
  });

  // Verifier Modal State
  const [verifierOpen, setVerifierOpen] = useState<boolean>(false);
  const [verifierTargetId, setVerifierTargetId] = useState<string>("");

  const activeCourse: CourseModule =
    availableCourses.find((c) => c.id === selectedCourseId) || availableCourses[0];

  const currentProgress = progressMap[selectedCourseId] || DEFAULT_PROGRESS;

  // Save progress helper
  const updateCurrentCourseProgress = (partial: Partial<CourseProgressRecord>) => {
    setProgressMap((prev) => {
      const updated = {
        ...prev,
        [selectedCourseId]: {
          ...(prev[selectedCourseId] || DEFAULT_PROGRESS),
          ...partial,
        },
      };
      try {
        localStorage.setItem(
          `safedrill_course_${selectedCourseId}`,
          JSON.stringify(updated[selectedCourseId])
        );
      } catch (err) {
        console.warn("Could not save to localStorage", err);
      }
      return updated;
    });
  };

  // Helper to get structured course contents
  const getCourseContent = (courseId: string) => {
    switch (courseId) {
      case "cpr-basics":
        return {
          intro: CPR_INTRO,
          guidelines: CPR_GUIDELINES,
          drills: CPR_DRILLS,
          scenarios: CPR_SCENARIOS,
          assessment: CPR_ASSESSMENT,
          accreditation: "MoHFW / NDRF / AHA Guidelines",
        };
      case "bleeding-control":
        return {
          intro: BLEEDING_INTRO,
          guidelines: BLEEDING_GUIDELINES,
          drills: BLEEDING_DRILLS,
          scenarios: BLEEDING_SCENARIOS,
          assessment: BLEEDING_ASSESSMENT,
          accreditation: "STOP THE BLEED® / Red Cross / MoHFW",
        };
      case "fire-extinguisher-pass":
      default:
        return {
          intro: FIRE_INTRO,
          guidelines: FIRE_GUIDELINES,
          drills: FIRE_DRILLS,
          scenarios: FIRE_SCENARIOS,
          assessment: FIRE_ASSESSMENT,
          accreditation: "NDRF / NBC 2016 / NFPA Standards",
        };
    }
  };

  const courseData = getCourseContent(selectedCourseId);

  // Calculate percentage of learning steps completed (7 steps total)
  const calculateCourseProgressPct = (record: CourseProgressRecord) => {
    let completed = 0;
    if (record.introCompleted) completed++;
    if (record.videoCompleted) completed++;
    if (record.guidelinesCompleted) completed++;
    if (record.drillCompleted) completed++;
    if (record.scenariosCompleted) completed++;
    if (record.assessmentCompleted && record.passed) completed += 2; // assessment + certificate
    return Math.round((completed / 7) * 100);
  };

  const currentPct = calculateCourseProgressPct(currentProgress);

  // Course visual theming
  const getCourseMeta = (courseId: string) => {
    switch (courseId) {
      case "cpr-basics":
        return {
          icon: Heart,
          colorText: "text-rose-500",
          colorBg: "bg-rose-500/10 dark:bg-rose-500/20",
          badgeColor: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
        };
      case "bleeding-control":
        return {
          icon: Shield,
          colorText: "text-red-500",
          colorBg: "bg-red-500/10 dark:bg-red-500/20",
          badgeColor: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
        };
      case "fire-extinguisher-pass":
      default:
        return {
          icon: Flame,
          colorText: "text-amber-500",
          colorBg: "bg-amber-500/10 dark:bg-amber-500/20",
          badgeColor: "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        };
    }
  };

  // Step Completion Handlers
  const handleIntroComplete = () => {
    updateCurrentCourseProgress({ introCompleted: true });
    if (onScoreEarned) onScoreEarned(30);
    setActiveStep("video");
  };

  const handleVideoComplete = () => {
    updateCurrentCourseProgress({ videoCompleted: true });
    if (onScoreEarned) onScoreEarned(50);
    setActiveStep("guidelines");
  };

  const handleGuidelinesComplete = () => {
    updateCurrentCourseProgress({ guidelinesCompleted: true });
    if (onScoreEarned) onScoreEarned(30);
    setActiveStep("drill");
  };

  const handleDrillComplete = (scorePct: number) => {
    updateCurrentCourseProgress({
      drillCompleted: true,
      drillScore: scorePct,
    });
    if (onScoreEarned) onScoreEarned(50);
    setActiveStep("scenarios");
  };

  const handleScenariosComplete = () => {
    updateCurrentCourseProgress({ scenariosCompleted: true });
    if (onScoreEarned) onScoreEarned(40);
    setActiveStep("assessment");
  };

  const handleAssessmentPass = (scorePct: number) => {
    const certCode = `SAF-2026-${selectedCourseId.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    updateCurrentCourseProgress({
      assessmentCompleted: true,
      assessmentScore: scorePct,
      passed: true,
      certificateId: currentProgress.certificateId || certCode,
      completionDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
    if (onScoreEarned) onScoreEarned(150);
    setActiveStep("certificate");
  };

  const handleOpenVerifier = (certId: string) => {
    setVerifierTargetId(certId);
    setVerifierOpen(true);
  };

  // Learning flow steps metadata
  const learningSteps: {
    id: CourseLearningStep;
    label: string;
    icon: any;
    isCompleted: boolean;
  }[] = [
    { id: "intro", label: "Introduction", icon: Bookmark, isCompleted: currentProgress.introCompleted },
    { id: "video", label: "Video Lesson", icon: Tv, isCompleted: currentProgress.videoCompleted },
    { id: "guidelines", label: "Guidelines", icon: FileText, isCompleted: currentProgress.guidelinesCompleted },
    { id: "drill", label: "Interactive Drill", icon: Zap, isCompleted: currentProgress.drillCompleted },
    { id: "scenarios", label: "Scenarios", icon: Compass, isCompleted: currentProgress.scenariosCompleted },
    { id: "assessment", label: "Assessment", icon: Award, isCompleted: currentProgress.assessmentCompleted && currentProgress.passed },
    { id: "certificate", label: "Certificate", icon: ShieldCheck, isCompleted: currentProgress.passed },
  ];

  return (
    <div id="safedrill-courses-section" className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner with Quick Certificate Verification Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" /> Certified Safety Courses & Learning Flow
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 7-Step Verified Mastery
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Watch → Learn Guidelines → Virtual Drills → Environmental Scenarios → Pass Assessment → Official Certificate.
          </p>
        </div>

        {/* Global Certificate Verifier Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenVerifier("")}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
          >
            <Search className="w-3.5 h-3.5 text-amber-500" />
            <span>Verify Any Certificate</span>
          </button>
        </div>
      </div>

      {/* 3 COURSE MODULE SELECTOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableCourses.map((course) => {
          const isSelected = course.id === selectedCourseId;
          const meta = getCourseMeta(course.id);
          const Icon = meta.icon;
          const prog = progressMap[course.id] || DEFAULT_PROGRESS;
          const pct = calculateCourseProgressPct(prog);
          const isDone = prog.passed;

          return (
            <button
              key={course.id}
              onClick={() => {
                setSelectedCourseId(course.id);
                // Keep active step or reset to intro if not set
              }}
              className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden group ${
                isSelected
                  ? "bg-white dark:bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 shadow-xl shadow-amber-500/10"
                  : "bg-white/80 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-red-500 to-orange-500" />
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${meta.colorBg} flex items-center justify-center ${meta.colorText}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isDone ? (
                      <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Certified ✓
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" /> {course.estimatedMinutes}m
                      </span>
                    )}
                  </div>
                </div>

                <h3 className={`text-base font-black leading-snug mb-1.5 ${
                  isSelected 
                    ? "text-slate-900 dark:text-white" 
                    : "text-slate-800 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors"
                }`}>
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {course.summary}
                </p>
              </div>

              {/* Course Progress Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                  <span className="font-bold text-amber-500">{pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE COURSE LEARNING FLOW CONTAINER */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-2xl space-y-6 transition-colors">
        {/* Course Top Title & Progress Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${getCourseMeta(activeCourse.id).badgeColor}`}>
                {activeCourse.category}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {courseData.accreditation}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
              {activeCourse.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {activeCourse.summary}
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Course Progress</div>
              <div className="text-lg font-black text-amber-500">{currentPct}%</div>
            </div>
            <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${currentPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 7-STEP LEARNING FLOW NAVIGATION BAR */}
        <div className="space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>Learning Journey:</span>
            <span className="text-slate-500 font-normal">Complete all steps to unlock certificate</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {learningSteps.map((step, idx) => {
              const isActive = activeStep === step.id;
              const StepIcon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : step.isCompleted
                      ? "bg-slate-50 dark:bg-slate-950 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:border-emerald-500/50"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isActive
                      ? "bg-slate-900 text-amber-400"
                      : step.isCompleted
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                  }`}>
                    {step.isCompleted && !isActive ? "✓" : idx + 1}
                  </span>

                  <StepIcon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STEP COMPONENT RENDERER */}
        <div className="pt-2">
          {activeStep === "intro" && (
            <CourseIntroView
              courseTitle={activeCourse.title}
              category={activeCourse.category}
              intro={courseData.intro}
              onComplete={handleIntroComplete}
              alreadyCompleted={currentProgress.introCompleted}
            />
          )}

          {activeStep === "video" && (
            <div className="space-y-4">
              {activeCourse.videos && activeCourse.videos.length > 0 ? (
                <CourseVideoPlayer
                  videos={activeCourse.videos}
                  courseTitle={activeCourse.title}
                  onScoreEarned={onScoreEarned}
                  onComplete={handleVideoComplete}
                  alreadyCompleted={currentProgress.videoCompleted}
                />
              ) : (
                <div className="p-8 text-center text-slate-400">No videos available for this course.</div>
              )}
            </div>
          )}

          {activeStep === "guidelines" && (
            <CourseGuidelinesView
              courseTitle={activeCourse.title}
              guidelines={courseData.guidelines}
              onComplete={handleGuidelinesComplete}
              alreadyCompleted={currentProgress.guidelinesCompleted}
            />
          )}

          {activeStep === "drill" && (
            <InteractiveDrill
              courseTitle={activeCourse.title}
              category={activeCourse.category}
              drills={courseData.drills}
              onComplete={handleDrillComplete}
              alreadyCompleted={currentProgress.drillCompleted}
            />
          )}

          {activeStep === "scenarios" && (
            <RealisticScenarios
              courseTitle={activeCourse.title}
              scenarios={courseData.scenarios}
              onComplete={handleScenariosComplete}
              alreadyCompleted={currentProgress.scenariosCompleted}
            />
          )}

          {activeStep === "assessment" && (
            <FinalAssessment
              courseTitle={activeCourse.title}
              questions={courseData.assessment}
              passingScore={70}
              onPass={handleAssessmentPass}
              alreadyPassed={currentProgress.passed}
            />
          )}

          {activeStep === "certificate" && (
            <CourseCertificate
              courseId={activeCourse.id}
              courseTitle={activeCourse.title}
              category={activeCourse.category}
              progress={currentProgress}
              onJumpToStep={(step) => setActiveStep(step)}
              onOpenVerifier={handleOpenVerifier}
            />
          )}
        </div>

        {/* Global Bottom Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong>Educational Awareness Notice: </strong> SafeDrill courses provide emergency decision-making awareness and safety education. They do not substitute for accredited clinical paramedic, BLS hospital certification, or professional firefighting academy training.
          </div>
        </div>
      </div>

      {/* Global Certificate Verifier Modal */}
      <CertificateVerifierModal
        isOpen={verifierOpen}
        onClose={() => setVerifierOpen(false)}
        initialCertId={verifierTargetId}
      />
    </div>
  );
};
