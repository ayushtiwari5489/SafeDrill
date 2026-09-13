import React, { useState } from "react";
import { AssessmentQuestion } from "../../types";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Award,
  Sparkles,
  ShieldCheck
} from "lucide-react";

interface FinalAssessmentProps {
  courseTitle: string;
  questions: AssessmentQuestion[];
  passingScore?: number; // e.g. 70
  onPass: (score: number) => void;
  alreadyPassed?: boolean;
}

export const FinalAssessment: React.FC<FinalAssessmentProps> = ({
  courseTitle,
  questions,
  passingScore = 70,
  onPass,
  alreadyPassed = false
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [lastScore, setLastScore] = useState<number | null>(null);

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (hasSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === questions.length;

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const scorePct = Math.round((correct / questions.length) * 100);
    setLastScore(scorePct);
    setHasSubmitted(true);

    if (scorePct >= passingScore) {
      onPass(scorePct);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setHasSubmitted(false);
    setLastScore(null);
  };

  const isPassed = (lastScore ?? 0) >= passingScore;

  return (
    <div
      id="final-assessment-component"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-7 space-y-6 text-white shadow-xl"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Award className="w-3 h-3" /> Module 6: Final Assessment
            </span>
            <span className="text-xs text-slate-400">
              Passing threshold: {passingScore}%
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {courseTitle} — Knowledge & Protocol Exam
          </h3>
        </div>

        {alreadyPassed && (
          <div className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Assessment Passed
          </div>
        )}
      </div>

      {/* Assessment Status / Score Banner if Submitted */}
      {hasSubmitted && (
        <div
          className={`p-6 rounded-2xl border space-y-4 text-center ${
            isPassed
              ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-100"
              : "bg-red-950/40 border-red-500/50 text-red-100"
          }`}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800">
            {isPassed ? (
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-red-400" />
            )}
          </div>

          <div>
            <h4 className="text-2xl font-black tracking-tight">
              {isPassed ? "Congratulations! Assessment Passed" : "Assessment Below Passing Threshold"}
            </h4>
            <div className="text-4xl font-black my-2">
              <span className={isPassed ? "text-emerald-400" : "text-red-400"}>
                {lastScore}%
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              {isPassed
                ? `You demonstrated verified emergency preparedness and reached the required ${passingScore}% passing score. Your official certificate is now unlocked!`
                : `You scored ${lastScore}%. A minimum of ${passingScore}% is required to ensure reliable emergency recall. Review the detailed explanations below and retake the exam.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {!isPassed ? (
              <button
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retake Assessment
              </button>
            ) : (
              <button
                onClick={() => onPass(lastScore ?? 100)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Official Certificate of Completion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Question List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border space-y-4 transition-all ${
                hasSubmitted
                  ? isCorrect
                    ? "bg-emerald-950/10 border-emerald-500/30"
                    : "bg-red-950/10 border-red-500/30"
                  : "bg-slate-950 border-slate-800"
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {q.domainArea} • {q.type.toUpperCase()}
                  </span>
                </div>

                {hasSubmitted && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Correct
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Incorrect
                      </>
                    )}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-semibold text-slate-100">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isTargetCorrect = optIdx === q.correctAnswerIndex;

                  let optClass = "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300";
                  if (!hasSubmitted && isSelected) {
                    optClass = "bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-500/30";
                  } else if (hasSubmitted) {
                    if (isTargetCorrect) {
                      optClass = "bg-emerald-950/50 border-emerald-500 text-emerald-100 font-semibold";
                    } else if (isSelected && !isTargetCorrect) {
                      optClass = "bg-red-950/50 border-red-500 text-red-200";
                    } else {
                      optClass = "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(q.id, optIdx)}
                      disabled={hasSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm flex items-center gap-3 transition-all ${optClass}`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold ${
                          isSelected && !hasSubmitted
                            ? "bg-amber-500 border-amber-400 text-slate-950"
                            : hasSubmitted && isTargetCorrect
                            ? "bg-emerald-500 border-emerald-400 text-slate-950"
                            : hasSubmitted && isSelected && !isTargetCorrect
                            ? "bg-red-500 border-red-400 text-white"
                            : "border-slate-700 text-slate-400"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box on Review */}
              {hasSubmitted && (
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-400">Explanation: </span>
                  <span>{q.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Footer */}
      {!hasSubmitted && (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            {answeredCount} of {questions.length} questions answered.
          </span>

          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              allAnswered
                ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            <span>Submit Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
