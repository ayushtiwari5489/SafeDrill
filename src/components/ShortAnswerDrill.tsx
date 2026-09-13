import React, { useState } from "react";
import { 
  Sparkles, Shield, AlertTriangle, CheckCircle2, XCircle, 
  HelpCircle, ChevronRight, RotateCcw, Volume2, ArrowRight,
  BookOpen, Compass, School, Zap, Lightbulb, Check, MessageSquare
} from "lucide-react";
import { SHORT_ANSWER_SCENARIOS } from "../dataShortAnswers";
import { ShortAnswerScenario, ShortAnswerEvaluationResult } from "../types";
import confetti from "canvas-confetti";

interface ShortAnswerDrillProps {
  onEarnScore?: (pts: number) => void;
}

export const ShortAnswerDrill: React.FC<ShortAnswerDrillProps> = ({ onEarnScore }) => {
  const [selectedAge, setSelectedAge] = useState<"all" | "8-10" | "11-14" | "15-17">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<ShortAnswerEvaluationResult | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [totalScoreSum, setTotalScoreSum] = useState<number>(0);

  // Filter scenarios
  const filteredScenarios = SHORT_ANSWER_SCENARIOS.filter((sc) => {
    const ageMatch = selectedAge === "all" || sc.ageGroup === selectedAge;
    const catMatch = selectedCategory === "all" || sc.category === selectedCategory;
    return ageMatch && catMatch;
  });

  const currentScenario: ShortAnswerScenario = filteredScenarios[scenarioIndex] || SHORT_ANSWER_SCENARIOS[0];

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);

    try {
      const response = await fetch("/api/evaluate-short-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: currentScenario.scenario,
          question: currentScenario.question,
          userAnswer: userAnswer.trim(),
          expectedConcepts: currentScenario.expectedConcepts,
          category: currentScenario.category,
          ageGroup: currentScenario.ageGroup,
          difficulty: currentScenario.difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error(`Evaluation failed with status ${response.status}`);
      }

      const result: ShortAnswerEvaluationResult = await response.json();
      setEvaluationResult(result);
      setCompletedCount((prev) => prev + 1);
      setTotalScoreSum((prev) => prev + (result.score || 70));

      if (onEarnScore) {
        onEarnScore(Math.round(result.score * 1.5));
      }

      if (result.status === "SAFE") {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.warn("Server evaluation error, switching to local semantic check:", err);
      // Client-side fallback if network hiccups
      const lower = userAnswer.toLowerCase();
      const matched = currentScenario.expectedConcepts.filter((c) =>
        c.toLowerCase().split(" ").some((w) => w.length > 3 && lower.includes(w))
      );
      const isUnsafe = lower.includes("run") && currentScenario.category === "earthquake" ||
                       lower.includes("elevator") ||
                       lower.includes("go back") ||
                       lower.includes("swim");

      const status = isUnsafe ? "UNSAFE" : matched.length >= 1 ? "SAFE" : "PARTIALLY_SAFE";
      const score = isUnsafe ? 35 : matched.length >= 2 ? 95 : 70;

      const fallbackRes: ShortAnswerEvaluationResult = {
        success: true,
        source: "offline_evaluator",
        status,
        score,
        overallAssessment: status === "SAFE" ? "Great Safety Response" : status === "PARTIALLY_SAFE" ? "Good Start, Missing Steps" : "High Risk Action Detected",
        conceptsIdentified: matched.length > 0 ? matched : ["Attempted realistic decision"],
        conceptsMissed: currentScenario.expectedConcepts.filter((c) => !matched.includes(c)),
        feedback: status === "SAFE" 
          ? "Excellent decision! You correctly identified the primary protection procedures for this emergency."
          : status === "PARTIALLY_SAFE"
          ? "You showed good situational awareness, but make sure to include all key physical protection moves."
          : "Not the safest choice. Avoid risky moves like running or using elevators during emergencies.",
        betterOptions: currentScenario.betterOptions,
        safetyPrinciple: currentScenario.safetyPrinciple,
        followUpQuestion: currentScenario.followUpPrompt,
      };

      setEvaluationResult(fallbackRes);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleNext = () => {
    setUserAnswer("");
    setEvaluationResult(null);
    setShowHint(false);
    if (scenarioIndex + 1 < filteredScenarios.length) {
      setScenarioIndex((prev) => prev + 1);
    } else {
      setScenarioIndex(0);
    }
  };

  const handleApplySampleAnswer = () => {
    setUserAnswer(currentScenario.sampleGoodAnswer);
  };

  const handleSpeakFeedback = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && evaluationResult) {
      window.speechSynthesis.cancel();
      const text = `${evaluationResult.overallAssessment}. Safety Score: ${evaluationResult.score} out of 100. ${evaluationResult.feedback} Remember: ${evaluationResult.safetyPrinciple}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div id="short-answer-safety-challenges" className="space-y-6">
      {/* Category & Age Group Selector Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-lg">
        {/* Top: Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="font-bold text-slate-400 whitespace-nowrap uppercase tracking-wider flex items-center gap-1 mr-1">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Disaster:
          </span>
          {[
            { id: "all", label: "All Topics" },
            { id: "earthquake", label: "🏚️ Earthquake" },
            { id: "fire", label: "🔥 Fire & Smoke" },
            { id: "evacuation", label: "🚪 Evacuation" },
            { id: "flood", label: "🌊 Flood Water" },
            { id: "lightning", label: "⚡ Lightning" },
            { id: "heat", label: "🌡️ Extreme Heat" },
            { id: "communication", label: "📢 Emergency Alert" },
            { id: "bus", label: "🚌 School Bus" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setScenarioIndex(0);
                setEvaluationResult(null);
                setUserAnswer("");
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bottom: Age / Difficulty Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-slate-400 mr-1 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Grade Level:
            </span>
            {[
              { id: "all", label: "All Ages (8–17)" },
              { id: "8-10", label: "Level 1 (8–10 yrs)" },
              { id: "11-14", label: "Level 2 (11–14 yrs)" },
              { id: "15-17", label: "Level 3 (15–17 yrs)" },
            ].map((age) => (
              <button
                key={age.id}
                onClick={() => {
                  setSelectedAge(age.id as any);
                  setScenarioIndex(0);
                  setEvaluationResult(null);
                  setUserAnswer("");
                }}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedAge === age.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {age.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400">
              Scenario <strong>{scenarioIndex + 1}</strong> of <strong>{filteredScenarios.length}</strong>
            </span>
            {completedCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                Avg Score: {Math.round(totalScoreSum / completedCount)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE SHORT-ANSWER QUESTION CARD */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Badges & Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              {currentScenario.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
              <School className="w-3 h-3 text-slate-400" />
              {currentScenario.environment}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
              {currentScenario.ageLabel}
            </span>
            <span className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 font-black">
              {"★".repeat(currentScenario.difficulty)}
            </span>
          </div>
        </div>

        {/* Narrative Realistic Scenario */}
        <div className="p-4 md:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 mb-6">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Realistic Emergency Situation:
          </div>
          <p className="text-base md:text-lg text-slate-100 font-medium leading-relaxed italic">
            "{currentScenario.scenario}"
          </p>
        </div>

        {/* Specific Question Prompt */}
        <div className="mb-4">
          <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" /> Short-Answer Question:
          </div>
          <h3 className="text-lg md:text-xl font-black text-white leading-snug">
            {currentScenario.question}
          </h3>
        </div>

        {/* Written Input Section */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              id="short-answer-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="In 1–2 sentences, explain what you would do and why... (e.g. 'I would drop under the desk, cover my head, and hold on...')"
              rows={4}
              disabled={isEvaluating}
              className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm md:text-base leading-relaxed resize-none transition-all shadow-inner"
            />
            <div className="absolute bottom-3 right-3 text-[11px] font-medium text-slate-500">
              {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </div>
          </div>

          {/* Quick Helper Tools */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 py-1 font-semibold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                {showHint ? "Hide Key Concepts" : "Need a Hint?"}
              </button>

              <button
                type="button"
                onClick={handleApplySampleAnswer}
                className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 py-1 font-semibold ml-2"
                title="Fill in a model safety response for study"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                Sample Answer
              </button>
            </div>

            <div className="text-slate-400 italic text-[11px]">
              Tip: The AI evaluates your safety logic, not exact grammar.
            </div>
          </div>

          {/* Hint Dropdown */}
          {showHint && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-fade-in space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-300">
                <Lightbulb className="w-3.5 h-3.5" /> Safety Concepts to Consider:
              </div>
              <ul className="list-disc pl-5 space-y-0.5 text-amber-100">
                {currentScenario.expectedConcepts.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Skip / Next Question
            </button>

            <button
              id="analyze-answer-btn"
              onClick={handleEvaluate}
              disabled={!userAnswer.trim() || isEvaluating}
              className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg ${
                !userAnswer.trim() || isEvaluating
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-orange-500/25 scale-100 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isEvaluating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                  AI Evaluating Safety Response...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* AI EVALUATION RESULTS PANEL */}
        {evaluationResult && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-5 animate-fade-in">
            {/* Status & Score Header Card */}
            <div
              className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
                evaluationResult.status === "SAFE"
                  ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-200"
                  : evaluationResult.status === "PARTIALLY_SAFE"
                  ? "bg-amber-950/70 border-amber-500/50 text-amber-200"
                  : "bg-red-950/70 border-red-500/50 text-red-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    evaluationResult.status === "SAFE"
                      ? "bg-emerald-500 text-slate-950"
                      : evaluationResult.status === "PARTIALLY_SAFE"
                      ? "bg-amber-500 text-slate-950"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {evaluationResult.status === "SAFE" ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : evaluationResult.status === "PARTIALLY_SAFE" ? (
                    <AlertTriangle className="w-7 h-7" />
                  ) : (
                    <XCircle className="w-7 h-7" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        evaluationResult.status === "SAFE"
                          ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                          : evaluationResult.status === "PARTIALLY_SAFE"
                          ? "bg-amber-500/30 text-amber-300 border border-amber-500/40"
                          : "bg-red-500/30 text-red-300 border border-red-500/40"
                      }`}
                    >
                      {evaluationResult.status === "SAFE"
                        ? "SAFE & PREPARED"
                        : evaluationResult.status === "PARTIALLY_SAFE"
                        ? "PARTIALLY SAFE"
                        : "HIGH RISK / UNSAFE"}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Evaluated by {evaluationResult.source || "SafeDrill AI"}
                    </span>
                  </div>
                  <h4 className="text-lg md:text-xl font-extrabold text-white mt-0.5">
                    {evaluationResult.overallAssessment}
                  </h4>
                </div>
              </div>

              {/* Safety Score Gauge */}
              <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Safety Score</div>
                  <div
                    className={`text-2xl font-black ${
                      evaluationResult.score >= 80
                        ? "text-emerald-400"
                        : evaluationResult.score >= 50
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {evaluationResult.score}/100
                  </div>
                </div>

                <button
                  onClick={handleSpeakFeedback}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Listen to feedback"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            {/* AI Constructive Feedback Narrative */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Educational Analysis:
              </div>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {evaluationResult.feedback}
              </p>
            </div>

            {/* Concept Coverage Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Concepts Covered */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                <div className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Safety Concepts Identified in Your Answer:
                </div>
                {evaluationResult.conceptsIdentified && evaluationResult.conceptsIdentified.length > 0 ? (
                  <ul className="space-y-1.5">
                    {evaluationResult.conceptsIdentified.map((concept, idx) => (
                      <li key={idx} className="text-xs text-emerald-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    No primary protective steps were clearly mentioned.
                  </div>
                )}
              </div>

              {/* Concepts Missed / Vital Next Steps */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Crucial Procedures to Remember:
                </div>
                {evaluationResult.conceptsMissed && evaluationResult.conceptsMissed.length > 0 ? (
                  <ul className="space-y-1.5">
                    {evaluationResult.conceptsMissed.map((concept, idx) => (
                      <li key={idx} className="text-xs text-amber-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Outstanding! All core concepts covered.
                  </div>
                )}
              </div>
            </div>

            {/* BETTER OPTIONS & SAFER ALTERNATIVES */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Better & Safer Actions You Can Take:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(evaluationResult.betterOptions || currentScenario.betterOptions).map((opt, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 font-black flex items-center justify-center shrink-0 text-[11px]">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Life-Saving Rule */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 text-xs text-amber-200">
              <span className="font-extrabold text-amber-300">💡 Golden Life-Saving Principle: </span>
              {evaluationResult.safetyPrinciple || currentScenario.safetyPrinciple}
            </div>

            {/* Follow-Up Decision for Scenario Continuity */}
            {(evaluationResult.followUpQuestion || currentScenario.followUpPrompt) && (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                <div className="text-xs font-black uppercase text-cyan-300 flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5" /> Follow-Up Decision (Continuous Learning):
                </div>
                <p className="text-xs md:text-sm text-cyan-100 leading-relaxed font-medium">
                  {evaluationResult.followUpQuestion || currentScenario.followUpPrompt}
                </p>
              </div>
            )}

            {/* Next Scenario Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  setEvaluationResult(null);
                  setUserAnswer("");
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
              >
                Re-Answer This Scenario
              </button>

              <button
                id="next-short-answer-btn"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform"
              >
                Next Challenge Scenario <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
