import React, { useState } from "react";
import { CourseScenario } from "../../types";
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building,
  Home,
  School,
  Activity,
  Users,
  Briefcase
} from "lucide-react";

interface RealisticScenariosProps {
  courseTitle: string;
  scenarios: CourseScenario[];
  onComplete: () => void;
  alreadyCompleted?: boolean;
}

export const RealisticScenarios: React.FC<RealisticScenariosProps> = ({
  courseTitle,
  scenarios,
  onComplete,
  alreadyCompleted = false
}) => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const currentScenario = scenarios[activeScenarioIndex];

  const getEnvIcon = (env: string) => {
    switch (env) {
      case "School":
      case "College":
        return <School className="w-4 h-4 text-amber-400" />;
      case "Home":
        return <Home className="w-4 h-4 text-emerald-400" />;
      case "Sports":
        return <Activity className="w-4 h-4 text-blue-400" />;
      case "Workplace":
        return <Briefcase className="w-4 h-4 text-purple-400" />;
      default:
        return <Users className="w-4 h-4 text-rose-400" />;
    }
  };

  const handleSelectDecision = (decisionId: string) => {
    setSelectedDecisionId(decisionId);
    if (!completedScenarios.includes(currentScenario.id)) {
      setCompletedScenarios((prev) => [...prev, currentScenario.id]);
    }
  };

  const handleNextScenario = () => {
    if (activeScenarioIndex < scenarios.length - 1) {
      setActiveScenarioIndex((prev) => prev + 1);
      setSelectedDecisionId(null);
    } else {
      onComplete();
    }
  };

  const selectedDecision = currentScenario.decisions.find(
    (d) => d.id === selectedDecisionId
  );

  const allCompleted = completedScenarios.length === scenarios.length;

  return (
    <div
      id="realistic-scenarios-component"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Compass className="w-3 h-3" /> Module 5: Realistic Scenarios
            </span>
            <span className="text-xs text-slate-400">
              Environment {activeScenarioIndex + 1} of {scenarios.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Real-World Emergency Decision-Making
          </h3>
        </div>

        {alreadyCompleted && (
          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> All Scenarios Mastered
          </div>
        )}
      </div>

      {/* Scenario Environment Switcher Tabs */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((scen, idx) => {
          const isActive = idx === activeScenarioIndex;
          const isDone = completedScenarios.includes(scen.id);

          return (
            <button
              key={scen.id}
              onClick={() => {
                setActiveScenarioIndex(idx);
                setSelectedDecisionId(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                isActive
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                  : isDone
                  ? "bg-slate-950 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
              }`}
            >
              {getEnvIcon(scen.environment)}
              <span>{scen.environment}: {scen.title}</span>
              {isDone && !isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="space-y-4">
        {/* Scenario Header Info */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1.5">
              {getEnvIcon(currentScenario.environment)}
              {currentScenario.locationTag}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Realistic Dilemma Simulation
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-white">
            {currentScenario.title}
          </h4>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentScenario.situation}
          </p>

          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-medium flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span><strong>The Dilemma: </strong>{currentScenario.dilemma}</span>
          </div>
        </div>

        {/* Decisions to Make */}
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider">
            Choose your course of action in this real setting:
          </div>

          <div className="space-y-2.5">
            {currentScenario.decisions.map((decision) => {
              const isSelected = selectedDecisionId === decision.id;

              let cardStyle = "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200";
              if (isSelected) {
                cardStyle = decision.isBest
                  ? "bg-emerald-950/40 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/40"
                  : "bg-red-950/40 border-red-500 text-red-100 ring-1 ring-red-500/40";
              }

              return (
                <button
                  key={decision.id}
                  onClick={() => handleSelectDecision(decision.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all space-y-2 ${cardStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        isSelected
                          ? decision.isBest
                            ? "bg-emerald-500 border-emerald-400 text-slate-950"
                            : "bg-red-500 border-red-400 text-white"
                          : "bg-slate-900 border-slate-700 text-slate-400"
                      }`}
                    >
                      {isSelected ? (
                        decision.isBest ? "✓" : "✕"
                      ) : (
                        "•"
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold leading-snug flex-1">
                      {decision.text}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feedback on Selected Decision */}
        {selectedDecision && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              selectedDecision.isBest
                ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-100"
                : "bg-red-950/30 border-red-500/30 text-red-100"
            }`}
          >
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
              {selectedDecision.isBest ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Optimal Safety Decision</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400">High-Risk Course of Action</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong>Outcome: </strong>{selectedDecision.outcome}
            </p>

            <div className="pt-1 text-xs text-amber-300 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Key Takeaway: </strong>{selectedDecision.safetyTakeaway}</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <span className="text-xs text-slate-400">
          Completed {completedScenarios.length} of {scenarios.length} scenarios.
        </span>

        <button
          onClick={handleNextScenario}
          disabled={!selectedDecisionId}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            selectedDecisionId
              ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
              : "bg-slate-800 text-slate-500 cursor-not-allowed"
          }`}
        >
          <span>
            {activeScenarioIndex < scenarios.length - 1
              ? "Next Scenario"
              : "Complete Scenarios & Proceed to Final Assessment"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
