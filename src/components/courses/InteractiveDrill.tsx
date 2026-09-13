import React, { useState } from "react";
import { DrillSituation } from "../../types";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Zap,
  Award,
  Sparkles,
  HelpCircle
} from "lucide-react";

interface InteractiveDrillProps {
  courseTitle: string;
  category: string;
  drills: DrillSituation[];
  onComplete: (scorePercentage: number) => void;
  alreadyCompleted?: boolean;
}

export const InteractiveDrill: React.FC<InteractiveDrillProps> = ({
  courseTitle,
  drills,
  onComplete,
  alreadyCompleted = false
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [userDecisions, setUserDecisions] = useState<{
    situationId: string;
    isCorrect: boolean;
  }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentDrill = drills[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optionId);
  };

  const handleConfirmDecision = () => {
    if (!selectedOptionId || hasSubmitted) return;

    const chosenOption = currentDrill.options.find((o) => o.id === selectedOptionId);
    const isAppropriate = chosenOption?.isAppropriate ?? false;

    setHasSubmitted(true);
    setUserDecisions((prev) => [
      ...prev,
      { situationId: currentDrill.id, isCorrect: isAppropriate }
    ]);
  };

  const handleNextSituation = () => {
    if (currentIndex < drills.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      setIsFinished(true);
      const correctCount = userDecisions.filter((d) => d.isCorrect).length;
      const scorePct = Math.round((correctCount / drills.length) * 100);
      onComplete(scorePct);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setUserDecisions([]);
    setIsFinished(false);
  };

  const selectedOption = currentDrill?.options.find((o) => o.id === selectedOptionId);
  const correctCount = userDecisions.filter((d) => d.isCorrect).length;
  const drillScorePct = drills.length > 0 ? Math.round((correctCount / drills.length) * 100) : 0;

  if (isFinished) {
    const isMastery = drillScorePct >= 80;
    return (
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Award className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Interactive Drill Completed!</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You evaluated {drills.length} critical emergency situations in this safe decision-making simulation.
          </p>
        </div>

        {/* Score Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Decision Accuracy</span>
            <div className="text-3xl font-black text-amber-400">{drillScorePct}%</div>
            <p className="text-[11px] text-slate-500">{correctCount} of {drills.length} safe decisions</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Safety Rating</span>
            <div className={`text-xl font-black ${isMastery ? "text-emerald-400" : "text-amber-400"}`}>
              {isMastery ? "Proficient Responder" : "Needs Review"}
            </div>
            <p className="text-[11px] text-slate-500">
              {isMastery ? "Exemplary judgment" : "Review guidelines before re-trying"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status</span>
            <div className="text-xl font-black text-emerald-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-5 h-5" /> Verified
            </div>
            <p className="text-[11px] text-slate-500">Saved to course progress</p>
          </div>
        </div>

        {/* Physical Practice Notice */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Hands-On Practice Notice:</span> While virtual simulations build mental decision-making speed, real-life physical techniques (such as CPR compression depth and fire extinguisher handling) should be practiced using certified training mannequins and safety equipment under qualified instruction.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={handleRestart}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Drill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="interactive-drill-component"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Drill Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Virtual Emergency Drill
            </span>
            <span className="text-xs text-slate-400">
              Situation {currentIndex + 1} of {drills.length}
            </span>
            {alreadyCompleted && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Completed
              </span>
            )}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            {currentDrill.title}
          </h3>
          <p className="text-xs text-slate-400">
            Environment: <span className="text-amber-400 font-semibold">{currentDrill.environment}</span> • Context: {currentDrill.context}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {drills.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-6 bg-amber-400"
                  : idx < currentIndex
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scenario Prompt Box */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <div className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" /> Emergency Situation
        </div>
        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          "{currentDrill.situation}"
        </p>
      </div>

      {/* Decision Options */}
      <div className="space-y-3">
        <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
          What is your immediate response? (Select one):
        </div>

        <div className="space-y-2.5">
          {currentDrill.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            // When submitted, highlight correct vs incorrect
            let borderClass = "border-slate-800 bg-slate-950/70 hover:border-slate-700 text-slate-200";
            if (isSelected && !hasSubmitted) {
              borderClass = "border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500/30";
            } else if (hasSubmitted) {
              if (option.isAppropriate) {
                borderClass = "border-emerald-500/80 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/40";
              } else if (isSelected && !option.isAppropriate) {
                borderClass = "border-red-500/80 bg-red-950/40 text-red-200 ring-1 ring-red-500/40";
              } else {
                borderClass = "border-slate-800/60 bg-slate-950/30 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                disabled={hasSubmitted}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 group ${borderClass}`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                    isSelected && !hasSubmitted
                      ? "bg-amber-500 border-amber-400 text-slate-950"
                      : hasSubmitted && option.isAppropriate
                      ? "bg-emerald-500 border-emerald-400 text-slate-950"
                      : hasSubmitted && isSelected && !option.isAppropriate
                      ? "bg-red-500 border-red-400 text-white"
                      : "bg-slate-900 border-slate-700 text-slate-400 group-hover:border-slate-600"
                  }`}
                >
                  {hasSubmitted ? (
                    option.isAppropriate ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isSelected ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      "•"
                    )
                  ) : (
                    option.id.slice(-1).toUpperCase()
                  )}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="text-xs sm:text-sm font-medium leading-snug">
                    {option.text}
                  </div>
                  {option.riskLevel && !hasSubmitted && (
                    <span className="inline-block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Risk level: {option.riskLevel}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Confirmation / Feedback Section */}
      {!hasSubmitted ? (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleConfirmDecision}
            disabled={!selectedOptionId}
            className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              selectedOptionId
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 cursor-pointer"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <span>Confirm Emergency Action</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-2">
          {/* Result Feedback Banner */}
          {selectedOption && (
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                selectedOption.isAppropriate
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-100"
                  : "bg-red-950/40 border-red-500/40 text-red-100"
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                {selectedOption.isAppropriate ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400">{selectedOption.actionFeedback}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400">{selectedOption.actionFeedback}</span>
                  </>
                )}
              </div>

              <div className="text-xs sm:text-sm leading-relaxed text-slate-200">
                <span className="font-bold text-white">Why this matters: </span>
                {selectedOption.explanation}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Emergency decision registered.
            </div>

            <button
              onClick={handleNextSituation}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
            >
              <span>{currentIndex < drills.length - 1 ? "Next Emergency Situation" : "View Drill Results"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
