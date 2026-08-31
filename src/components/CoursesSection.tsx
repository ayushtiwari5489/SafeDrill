import React, { useState } from "react";
import { 
  BookOpen, CheckCircle2, Clock, Award, ShieldAlert, 
  ChevronRight, Heart, Flame, Shield, Sparkles, AlertTriangle, 
  Zap, Briefcase
} from "lucide-react";
import { COURSES } from "../data";
import { CourseModule } from "../types";
import { CprTrainer } from "./CprTrainer";
import { FireExtinguisherSim } from "./FireExtinguisherSim";

interface CoursesSectionProps {
  onScoreEarned?: (points: number) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onScoreEarned }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("cpr-basics");
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const activeCourse: CourseModule =
    COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const categories = ["All", "First Aid", "Fire Safety", "Preparedness"];

  const filteredCourses = filterCategory === "All"
    ? COURSES
    : COURSES.filter((c) => c.category === filterCategory);

  const handleMarkCompleted = (courseId: string) => {
    if (!completedCourses.includes(courseId)) {
      setCompletedCourses((prev) => [...prev, courseId]);
      if (onScoreEarned) onScoreEarned(200);
    }
  };

  return (
    <div id="safedrill-courses-section" className="space-y-6 max-w-5xl mx-auto">
      {/* Category Pills & Course Explorer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" /> Life-Saving Skill Masterclasses
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive, practical tutorials and simulators designed for rapid comprehension during crises.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === cat
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid (Compact Selector) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {filteredCourses.map((course) => {
          const isSelected = course.id === selectedCourseId;
          const isDone = completedCourses.includes(course.id);

          return (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all group ${
                isSelected
                  ? "bg-slate-900 border-amber-500/60 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10"
                  : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                    {course.category}
                  </span>
                  {isDone ? (
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Done
                    </span>
                  ) : (
                    <span className="text-slate-500 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.estimatedMinutes}m
                    </span>
                  )}
                </div>

                <h4 className={`text-sm font-bold leading-snug line-clamp-2 ${isSelected ? "text-white" : "text-slate-200 group-hover:text-amber-400"}`}>
                  {course.title}
                </h4>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-semibold text-amber-400/90">{course.badge}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "translate-x-1 text-amber-400" : "text-slate-600"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED COURSE DETAILED VIEWER */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6">
        {/* Module Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeCourse.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeCourse.estimatedMinutes} min interactive masterclass
              </span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {activeCourse.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {activeCourse.summary}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMarkCompleted(activeCourse.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                completedCourses.includes(activeCourse.id)
                  ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
                  : "bg-emerald-600 hover:bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-600/20"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedCourses.includes(activeCourse.id) ? "Module Completed (+200 XP)" : "Mark Module Complete"}
            </button>
          </div>
        </div>

        {/* Embedded Interactive Simulators if available for this course */}
        {activeCourse.interactiveType === "cpr-metronome" && (
          <div className="mb-6">
            <CprTrainer onScoreEarned={onScoreEarned} />
          </div>
        )}

        {activeCourse.interactiveType === "fire-pass-sim" && (
          <div className="mb-6">
            <FireExtinguisherSim onScoreEarned={onScoreEarned} />
          </div>
        )}

        {/* Step-by-Step Interactive Practical Cards */}
        <div className="space-y-4">
          <h4 className="text-sm font-black text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Standard Operating Life-Saving Protocol:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCourse.steps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-sm">
                      {step.stepNumber}
                    </span>
                    <h5 className="font-extrabold text-sm text-slate-100">{step.title}</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-bold text-amber-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{step.actionCallout}</span>
                  </div>

                  {step.caution && (
                    <div className="text-[11px] text-red-300 font-semibold flex items-center gap-1.5 px-2 bg-red-950/40 p-2 rounded-lg border border-red-800/50">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-red-400" />
                      <span>{step.caution}</span>
                    </div>
                  )}

                  {step.proTip && (
                    <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 px-2 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/50">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      <span>{step.proTip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Takeaways summary */}
        <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> Key Takeaways to Remember:
          </h5>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {activeCourse.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-amber-400 font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
