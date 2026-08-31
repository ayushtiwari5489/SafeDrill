import React, { useState, useEffect } from "react";
import { 
  Heart, Zap, Award, AlertTriangle, Shield, Clock, 
  RotateCcw, Sparkles, CheckCircle2, XCircle, Compass, 
  Building2, School, Train, Home, ShoppingBag, Waves, 
  ChevronRight, Volume2, VolumeX, Flame, Activity
} from "lucide-react";
import { SCENARIOS } from "../data";
import { ScenarioQuestion, DecisionOption, LocationType } from "../types";
import { 
  playCorrectSound, 
  playWrongSound, 
  playHeartLostSound, 
  isSoundEnabled, 
  setSoundEnabled 
} from "../utils/audioEffects";
import confetti from "canvas-confetti";
import { DropCoverHoldSim } from "./DropCoverHoldSim";
import { FireExtinguisherSim } from "./FireExtinguisherSim";
import { CprTrainer } from "./CprTrainer";

interface GameSectionProps {
  onNavigateToCourses: () => void;
  onNavigateToBot: () => void;
}

export const GameSection: React.FC<GameSectionProps> = ({ onNavigateToCourses, onNavigateToBot }) => {
  // Game State
  const [selectedLocation, setSelectedLocation] = useState<LocationType | "all">("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<DecisionOption | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(12);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [activeMiniGame, setActiveMiniGame] = useState<"none" | "drop" | "fire" | "cpr">("none");

  // Filtered scenarios
  const questions: ScenarioQuestion[] = selectedLocation === "all"
    ? SCENARIOS
    : SCENARIOS.filter((q) => q.location === selectedLocation);

  const currentQ = questions[currentQuestionIndex] || questions[0];

  // Timer countdown
  useEffect(() => {
    if (isAnswered || isGameOver || isVictory || activeMiniGame !== "none") return;

    setTimeLeft(currentQ.urgencySeconds || 12);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Time run out = automatic penalty
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, isAnswered, isGameOver, isVictory, selectedLocation, activeMiniGame]);

  const handleTimeout = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setHearts((prev) => {
      const next = prev - 1;
      playHeartLostSound();
      if (next <= 0) setIsGameOver(true);
      return Math.max(0, next);
    });
    setStreak(0);
  };

  const handleSelectOption = (option: DecisionOption) => {
    if (isAnswered || isGameOver) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option.isCorrect) {
      playCorrectSound();
      const points = 100 + streak * 25 + Math.max(0, timeLeft * 5);
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);

      if (streak + 1 >= 3) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    } else {
      playWrongSound();
      playHeartLostSound();
      setStreak(0);
      setHearts((prev) => {
        const next = prev - 1;
        if (next <= 0) {
          setIsGameOver(true);
        }
        return Math.max(0, next);
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsVictory(true);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setHearts(3);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
    setIsVictory(false);
    setActiveMiniGame("none");
  };

  const handleLocationChange = (loc: LocationType | "all") => {
    setSelectedLocation(loc);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsGameOver(false);
    setIsVictory(false);
    setActiveMiniGame("none");
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  // Rank determination
  const getRank = (pts: number) => {
    if (pts >= 800) return { title: "Disaster Response Commander", color: "text-amber-300", badge: "⭐ Master" };
    if (pts >= 450) return { title: "Senior Survival Specialist", color: "text-purple-300", badge: "🛡️ Advanced" };
    if (pts >= 200) return { title: "Certified First Responder", color: "text-emerald-300", badge: "⚡ Responder" };
    return { title: "Safety Drill Cadet", color: "text-cyan-300", badge: "🔰 Cadet" };
  };

  const currentRank = getRank(score);

  return (
    <div id="safedrill-game-section" className="space-y-6 max-w-5xl mx-auto">
      {/* Top HUD: Hearts, Score, Streak, Sound Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 md:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        {/* Left: Hearts & Rank */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 mr-1">HP:</span>
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 transition-all duration-300 ${
                  h <= hearts
                    ? "text-red-500 fill-red-500 scale-100"
                    : "text-slate-700 fill-slate-800 scale-75 opacity-40"
                }`}
              />
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            <Award className="w-4 h-4 text-amber-400" />
            <div className="text-xs">
              <span className="text-slate-400">Rank: </span>
              <span className={`font-bold ${currentRank.color}`}>{currentRank.title}</span>
            </div>
          </div>
        </div>

        {/* Center: Score & Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs text-slate-400">XP:</span>
            <span className="text-sm font-black text-amber-400">{score}</span>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/40 px-3 py-1.5 rounded-xl text-xs font-black animate-pulse">
              <span>🔥 {streak}x Streak!</span>
            </div>
          )}
        </div>

        {/* Right: Audio and Quick Mini-Games */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
              soundOn
                ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                : "bg-slate-950 text-slate-500 border-slate-800"
            }`}
            title="Toggle Audio Feedback"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition-colors"
            title="Restart Drill"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Location Filter / Campaign Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-amber-400" /> Places:
        </span>
        {[
          { id: "all", label: "All Scenarios", icon: Shield },
          { id: "school", label: "School Classroom", icon: School },
          { id: "highrise", label: "High-Rise Apartment", icon: Building2 },
          { id: "metro", label: "Metro Station", icon: Train },
          { id: "home", label: "Home & Kitchen", icon: Home },
          { id: "mall", label: "Shopping Mall", icon: ShoppingBag },
          { id: "outdoors", label: "Coast & Outdoors", icon: Waves },
        ].map((loc) => {
          const Icon = loc.icon;
          const isSelected = selectedLocation === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => handleLocationChange(loc.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20 scale-105"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {loc.label}
            </button>
          );
        })}
      </div>

      {/* Quick Interactive Mini-Game Launcher Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveMiniGame(activeMiniGame === "drop" ? "none" : "drop")}
          className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
            activeMiniGame === "drop"
              ? "bg-amber-500/20 border-amber-500/60 text-amber-300 ring-2 ring-amber-500/30"
              : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Reflex Mini-Game</div>
              <div className="text-[11px] text-slate-400">Drop, Cover, Hold On</div>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {activeMiniGame === "drop" ? "Active" : "Play"}
          </span>
        </button>

        <button
          onClick={() => setActiveMiniGame(activeMiniGame === "fire" ? "none" : "fire")}
          className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
            activeMiniGame === "fire"
              ? "bg-orange-500/20 border-orange-500/60 text-orange-300 ring-2 ring-orange-500/30"
              : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">P.A.S.S. Simulator</div>
              <div className="text-[11px] text-slate-400">Aim & Extinguish Fire</div>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
            {activeMiniGame === "fire" ? "Active" : "Play"}
          </span>
        </button>

        <button
          onClick={() => setActiveMiniGame(activeMiniGame === "cpr" ? "none" : "cpr")}
          className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
            activeMiniGame === "cpr"
              ? "bg-rose-500/20 border-rose-500/60 text-rose-300 ring-2 ring-rose-500/30"
              : "bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">CPR Beat Trainer</div>
              <div className="text-[11px] text-slate-400">110 BPM Metronome</div>
            </div>
          </div>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {activeMiniGame === "cpr" ? "Active" : "Play"}
          </span>
        </button>
      </div>

      {/* Embedded Mini-Game view when activated */}
      {activeMiniGame === "drop" && (
        <DropCoverHoldSim onScoreEarned={(pts) => setScore((p) => p + pts)} />
      )}
      {activeMiniGame === "fire" && (
        <FireExtinguisherSim onScoreEarned={(pts) => setScore((p) => p + pts)} />
      )}
      {activeMiniGame === "cpr" && (
        <CprTrainer onScoreEarned={(pts) => setScore((p) => p + pts)} />
      )}

      {/* MAIN GAME SCENARIO CARD */}
      {!isGameOver && !isVictory && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Urgency Progress Bar */}
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full transition-all duration-1000 ${
                timeLeft > 5 ? "bg-amber-500" : "bg-red-500 animate-pulse"
              }`}
              style={{
                width: `${(timeLeft / (currentQ.urgencySeconds || 12)) * 100}%`
              }}
            />
          </div>

          {/* Scenario Location & Disaster Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                {currentQ.locationName}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                {currentQ.disasterName}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Drill {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1 text-xs font-black text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5" />
                {timeLeft}s
              </div>
            </div>
          </div>

          {/* Narrative Context Description */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6">
            <p className="text-sm md:text-base text-slate-300 leading-relaxed italic">
              "{currentQ.contextDescription}"
            </p>
          </div>

          {/* Question / Immediate Decision Prompt */}
          <div className="mb-6">
            <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Quick Decision (Choose 1 of 2):
            </div>
            <h3 className="text-lg md:text-xl font-extrabold text-white leading-snug">
              {currentQ.situation}
            </h3>
          </div>

          {/* STRICT 2-OPTION DECISION BUTTONS (Animated & Interactive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQ.options.map((option) => {
              const isSelected = selectedOption?.id === option.id;
              let btnStyle = "bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-100 hover:border-amber-500/50";

              if (isAnswered) {
                if (option.isCorrect) {
                  btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30";
                } else if (isSelected && !option.isCorrect) {
                  btnStyle = "bg-red-950/80 border-red-500 text-red-100 ring-2 ring-red-500/30";
                } else {
                  btnStyle = "bg-slate-950/50 border-slate-800/50 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={option.id}
                  id={`option-${option.id.toLowerCase()}`}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`relative p-5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all duration-200 group active:scale-[0.98] ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl font-black text-sm flex items-center justify-center shrink-0 transition-colors ${
                        isAnswered && option.isCorrect
                          ? "bg-emerald-500 text-slate-950"
                          : isAnswered && isSelected && !option.isCorrect
                          ? "bg-red-500 text-white"
                          : "bg-slate-800 text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950"
                      }`}
                    >
                      {option.id}
                    </div>

                    <div className="text-sm md:text-base font-bold leading-snug">
                      {option.text}
                    </div>
                  </div>

                  {/* Status Indicator Icon */}
                  {isAnswered && (
                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center gap-1.5 text-xs font-black">
                      {option.isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct Survival Action
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> High Risk / Fatal Mistake
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* POST-DECISION EXPLANATION & SURVIVAL BREAKDOWN */}
          {isAnswered && selectedOption && (
            <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 animate-fade-in space-y-3">
              <div className="flex items-center gap-2">
                {selectedOption.isCorrect ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5" /> Survival Instinct Confirmed (+{100 + streak * 25} XP)
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-black">
                    <AlertTriangle className="w-3.5 h-3.5" /> Hazard Sustained (-1 HP)
                  </div>
                )}
              </div>

              <div className="text-sm text-slate-200">
                <span className="font-bold text-white">Outcome: </span>
                {selectedOption.consequence}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <span className="font-extrabold text-amber-300">💡 Life-Saving Rule: </span>
                {selectedOption.survivalTip}
              </div>

              {currentQ.didYouKnow && (
                <div className="text-xs text-slate-400 italic">
                  📚 <strong>Did you know:</strong> {currentQ.didYouKnow}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  id="next-drill-btn"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-transform hover:scale-105"
                >
                  Next Survival Drill <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME OVER SCREEN */}
      {isGameOver && (
        <div className="rounded-3xl bg-gradient-to-b from-red-950/80 to-slate-950 border border-red-500/40 p-8 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10" />
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Drill Terminated: Out of HP
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            In emergencies, split-second misconceptions can be dangerous. Review the core safety rules and try the drill again to build muscle memory!
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400">Score Earned: </span>
              <span className="font-black text-amber-400">{score} XP</span>
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400">Rank: </span>
              <span className="font-bold text-cyan-300">{currentRank.title}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/30"
            >
              <RotateCcw className="w-4 h-4" /> Try Drill Again
            </button>
            <button
              onClick={onNavigateToCourses}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700"
            >
              Study Safety Courses
            </button>
          </div>
        </div>
      )}

      {/* VICTORY / DRILL COMPLETED SCREEN */}
      {isVictory && (
        <div className="rounded-3xl bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/50 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
            <Award className="w-12 h-12" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider">
              🏆 Drill Master Certified
            </span>
            <h3 className="text-3xl font-black text-white mt-2">
              All Scenarios Survived!
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto mt-1">
              Outstanding tactical awareness. You correctly navigated school earthquakes, high-rise smoke evacuations, crowd surges, and flash floods!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total XP</div>
              <div className="text-xl font-black text-amber-400">{score}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">HP Left</div>
              <div className="text-xl font-black text-red-400">{hearts}/3</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Badge</div>
              <div className="text-xs font-black text-emerald-300 mt-1">Hero Ready</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700"
            >
              Replay Scenarios
            </button>
            <button
              onClick={onNavigateToCourses}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-orange-500/25"
            >
              Explore Skill Courses
            </button>
            <button
              onClick={onNavigateToBot}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
            >
              Emergency AI Bot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
