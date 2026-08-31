import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Flame, 
  Timer, 
  Zap, 
  Trophy, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Volume2, 
  VolumeX,
  School,
  Building,
  Train,
  Home,
  ShoppingBag,
  Palmtree
} from "lucide-react";
import confetti from "canvas-confetti";
import { SCENARIOS } from "../data";
import { ScenarioQuestion, DecisionOption, LocationType } from "../types";
import { playCorrectSound, playWrongSound, playHeartLostSound, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";

interface QuizGameProps {
  onScoreUpdate?: (newScore: number) => void;
  userScore: number;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onScoreUpdate, userScore }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | "all">("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hearts, setHearts] = useState(3);
  const [streak, setStreak] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [shakeCard, setShakeCard] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter questions by location
  const filteredQuestions = selectedLocation === "all"
    ? SCENARIOS
    : SCENARIOS.filter((q) => q.location === selectedLocation);

  const currentQ: ScenarioQuestion = filteredQuestions[currentQuestionIndex] || SCENARIOS[0];

  // Timer logic for active question
  useEffect(() => {
    if (hasAnswered || isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimerSeconds(currentQ.urgencySeconds || 12);

    timerRef.current = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, selectedLocation, hasAnswered, isGameOver]);

  const handleTimeOut = () => {
    if (hasAnswered || isGameOver) return;
    setHasAnswered(true);
    setHearts((prev) => {
      const nextHearts = Math.max(0, prev - 1);
      playHeartLostSound();
      if (nextHearts === 0) setIsGameOver(true);
      return nextHearts;
    });
    setStreak(0);
  };

  const handleSelectOption = (option: DecisionOption) => {
    if (hasAnswered || isGameOver) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      playCorrectSound();
      const streakMultiplier = streak >= 3 ? 2 : streak >= 1 ? 1.5 : 1;
      const pointsEarned = Math.round(100 * streakMultiplier);
      const newScore = userScore + pointsEarned;
      if (onScoreUpdate) onScoreUpdate(newScore);

      const nextStreak = streak + 1;
      setStreak(nextStreak);

      if (nextStreak % 3 === 0) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      playWrongSound();
      playHeartLostSound();
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);

      setHearts((prev) => {
        const nextHearts = Math.max(0, prev - 1);
        if (nextHearts === 0) setIsGameOver(true);
        return nextHearts;
      });
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setHasAnswered(false);

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Loop back or finish
      setCurrentQuestionIndex(0);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setHearts(3);
    setStreak(0);
    setIsGameOver(false);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const locationButtons: { id: LocationType | "all"; label: string; icon: any }[] = [
    { id: "all", label: "All Drills", icon: Sparkles },
    { id: "school", label: "School Classroom", icon: School },
    { id: "highrise", label: "High-Rise Tower", icon: Building },
    { id: "metro", label: "Metro Platform", icon: Train },
    { id: "home", label: "Home / Residence", icon: Home },
    { id: "mall", label: "Shopping Mall", icon: ShoppingBag },
    { id: "outdoors", label: "Outdoors / Coast", icon: Palmtree },
  ];

  const currentOptionA = currentQ.options[0];
  const currentOptionB = currentQ.options[1];
  const chosenOptionObj = selectedOption === "A" ? currentOptionA : selectedOption === "B" ? currentOptionB : null;

  return (
    <div id="safedrill-quiz-game-section" className="space-y-6">
      {/* Top Location & Disaster Filter Pills */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-2">
          {locationButtons.map((loc) => {
            const Icon = loc.icon;
            const isSelected = selectedLocation === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => {
                  setSelectedLocation(loc.id);
                  setCurrentQuestionIndex(0);
                  setSelectedOption(null);
                  setHasAnswered(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{loc.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs"
            title={soundOn ? "Mute audio" : "Enable sound"}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-orange-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Main Scenario Arena Card */}
      <div
        className={`bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden transition-transform duration-200 ${
          shakeCard ? "animate-bounce" : ""
        }`}
      >
        {/* Top Status Bar: Danger badge + Question counter + Hearts + Timer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span
              className={`px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                currentQ.dangerLevel === "CRITICAL"
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : currentQ.dangerLevel === "HIGH"
                  ? "bg-orange-100 text-orange-600 border border-orange-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }`}
            >
              {currentQ.disasterName}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">
              Scenario {currentQuestionIndex + 1}/{filteredQuestions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Lives / Hearts */}
            <div className="flex items-center gap-1 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`w-4 h-4 transition-all ${
                    heartIndex <= hearts
                      ? "text-rose-500 fill-rose-500"
                      : "text-slate-300"
                  }`}
                />
              ))}
              <span className="text-xs font-black text-rose-600 ml-1">{hearts} Lives</span>
            </div>

            {/* Streak Multiplier */}
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200 text-xs font-black">
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{streak}x Combo</span>
              </div>
            )}

            {/* Countdown Timer */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black font-mono border ${
                timerSeconds <= 4
                  ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{timerSeconds}s</span>
            </div>
          </div>
        </div>

        {/* Question & Situation Content */}
        <div className="my-6 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-600 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            Location: {currentQ.locationName}
          </div>
          <p className="text-sm text-slate-600 italic bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            "{currentQ.contextDescription}"
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
            {currentQ.situation}
          </h2>
        </div>

        {/* Game Over Screen Overlay if 0 hearts */}
        {isGameOver ? (
          <div className="py-8 text-center space-y-4 bg-red-50/50 rounded-2xl border border-red-100 p-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-200">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Drill Failed: Out of Lives!</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              In real-world disasters, split-second decisions dictate survival. Review safety steps and try again!
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-200 inline-flex items-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Restart Scenario Drill
            </button>
          </div>
        ) : (
          /* EXACT 2 OPTIONS with Vibrant Palette aesthetics */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* OPTION A */}
            <button
              id="quiz-option-a-btn"
              onClick={() => handleSelectOption(currentOptionA)}
              disabled={hasAnswered}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left border-2 transition-all flex flex-col justify-between min-h-[160px] select-none ${
                hasAnswered
                  ? currentOptionA.isCorrect
                    ? "bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100 shadow-md"
                    : selectedOption === "A"
                    ? "bg-red-50 border-red-500 ring-4 ring-red-100"
                    : "bg-slate-50 border-slate-200 opacity-50"
                  : "bg-slate-50 border-slate-200 hover:border-orange-500 hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-400 tracking-wider uppercase group-hover:text-orange-600">
                  OPTION A
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    hasAnswered
                      ? currentOptionA.isCorrect
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : selectedOption === "A"
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-slate-300"
                      : "border-slate-300 group-hover:border-orange-500"
                  }`}
                >
                  {hasAnswered && currentOptionA.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : hasAnswered && selectedOption === "A" ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-orange-500" />
                  )}
                </div>
              </div>

              <p className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                {currentOptionA.text}
              </p>
            </button>

            {/* OPTION B */}
            <button
              id="quiz-option-b-btn"
              onClick={() => handleSelectOption(currentOptionB)}
              disabled={hasAnswered}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left border-2 transition-all flex flex-col justify-between min-h-[160px] select-none ${
                hasAnswered
                  ? currentOptionB.isCorrect
                    ? "bg-emerald-50 border-emerald-500 ring-4 ring-emerald-100 shadow-md"
                    : selectedOption === "B"
                    ? "bg-red-50 border-red-500 ring-4 ring-red-100"
                    : "bg-slate-50 border-slate-200 opacity-50"
                  : "bg-slate-50 border-slate-200 hover:border-orange-500 hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-slate-400 tracking-wider uppercase group-hover:text-orange-600">
                  OPTION B
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    hasAnswered
                      ? currentOptionB.isCorrect
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : selectedOption === "B"
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-slate-300"
                      : "border-slate-300 group-hover:border-orange-500"
                  }`}
                >
                  {hasAnswered && currentOptionB.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : hasAnswered && selectedOption === "B" ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-orange-500" />
                  )}
                </div>
              </div>

              <p className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                {currentOptionB.text}
              </p>
            </button>
          </div>
        )}

        {/* Post-Answer Educational Consequence Breakdown */}
        {hasAnswered && chosenOptionObj && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {chosenOptionObj.isCorrect ? (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Correct Survival Decision (+100 PTS)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-red-100 text-red-800 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Hazardous Decision (-1 Life)
                  </span>
                )}
              </div>

              <button
                id="next-scenario-question-btn"
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-orange-200 flex items-center gap-2 transition-all transform hover:translate-x-0.5"
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">⚡ Real-world Outcome:</span>
                <p className="text-slate-600 leading-relaxed">{chosenOptionObj.consequence}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-orange-600 block mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" /> Key Survival Rule:
                </span>
                <p className="text-slate-600 leading-relaxed">{chosenOptionObj.survivalTip}</p>
              </div>
            </div>

            {currentQ.didYouKnow && (
              <div className="text-[11px] text-slate-500 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                💡 <strong className="text-slate-700">Did You Know?</strong> {currentQ.didYouKnow}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Skill Cards Row (Vibrant Palette 3-card footer) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-md shadow-blue-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-80">Life Saving Training</p>
            <p className="font-black text-lg">Hands-Only CPR</p>
          </div>
          <span className="text-2xl">❤️</span>
        </div>

        <div className="bg-emerald-600 rounded-2xl p-4 text-white shadow-md shadow-emerald-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-80">Essential Skills</p>
            <p className="font-black text-lg">P.A.S.S. Fire Safety</p>
          </div>
          <span className="text-2xl">🧯</span>
        </div>

        <div className="bg-purple-600 rounded-2xl p-4 text-white shadow-md shadow-purple-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold opacity-80">Disaster Ready</p>
            <p className="font-black text-lg">72-Hr Go-Bag</p>
          </div>
          <span className="text-2xl">🎒</span>
        </div>
      </div>
    </div>
  );
};
