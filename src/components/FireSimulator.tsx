import React, { useState, useEffect, useRef } from "react";
import { Flame, CheckCircle, RotateCcw, AlertTriangle, ShieldCheck, Volume2, VolumeX, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { startExtinguisherSound, stopExtinguisherSound, playCorrectSound, playWrongSound } from "../utils/audioEffects";

interface FireSimulatorProps {
  onCompleted?: () => void;
}

export const FireSimulator: React.FC<FireSimulatorProps> = ({ onCompleted }) => {
  // P.A.S.S. steps: 1 = Pull, 2 = Aim, 3 = Squeeze, 4 = Sweep, 5 = Extinguished
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [pinPulled, setPinPulled] = useState(false);
  const [aimTarget, setAimTarget] = useState<"top" | "middle" | "base" | null>(null);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [extinguishProgress, setExtinguishProgress] = useState(0); // 0 to 100
  const [sweepCount, setSweepCount] = useState(0);
  const [fireSize, setFireSize] = useState(100); // 100 down to 0
  const [feedbackMsg, setFeedbackMsg] = useState<string>("Step 1: Pull the safety pin to unlock the lever.");

  const sweepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up sounds on unmount
  useEffect(() => {
    return () => {
      stopExtinguisherSound();
      if (sweepIntervalRef.current) clearInterval(sweepIntervalRef.current);
    };
  }, []);

  // Handle Step 1: Pull Pin
  const handlePullPin = () => {
    if (currentStep !== 1) return;
    setPinPulled(true);
    setCurrentStep(2);
    playCorrectSound();
    setFeedbackMsg("Step 2: Aim the nozzle at the BASE of the fire (where fuel is burning).");
  };

  // Handle Step 2: Aim
  const handleAim = (target: "top" | "middle" | "base") => {
    if (currentStep !== 2 && currentStep !== 3 && currentStep !== 4) return;
    setAimTarget(target);

    if (target === "base") {
      playCorrectSound();
      setFeedbackMsg("Perfect Aim! Step 3: Squeeze the lever and sweep side-to-side across the base.");
      if (currentStep === 2) setCurrentStep(3);
    } else {
      playWrongSound();
      setFeedbackMsg("⚠️ Aim lower! Aiming at flames or smoke will not stop the fire at its fuel base.");
    }
  };

  // Handle Step 3 & 4: Squeeze & Sweep
  const handleStartSqueeze = () => {
    if (currentStep < 2 || !pinPulled) return;
    setIsSqueezing(true);
    startExtinguisherSound();

    if (aimTarget === "base") {
      setCurrentStep(4);
      setFeedbackMsg("Active Discharge! Move the nozzle from side to side (Sweep)!");
    } else {
      setFeedbackMsg("⚠️ You are squeezing but aimed incorrectly! Aim at the BASE to extinguish.");
    }
  };

  const handleStopSqueeze = () => {
    setIsSqueezing(false);
    stopExtinguisherSound();
  };

  const handleSweepMotion = (direction: "left" | "right") => {
    if (!isSqueezing || aimTarget !== "base") return;

    setSweepCount((prev) => {
      const next = prev + 1;
      const progress = Math.min(100, Math.round((next / 8) * 100));
      setExtinguishProgress(progress);
      setFireSize(Math.max(0, 100 - progress));

      if (progress >= 100 && currentStep !== 5) {
        setCurrentStep(5);
        stopExtinguisherSound();
        playCorrectSound();
        setFeedbackMsg("🎉 Fire Extinguished! You safely applied the P.A.S.S. protocol!");
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        if (onCompleted) onCompleted();
      }
      return next;
    });
  };

  const handleReset = () => {
    stopExtinguisherSound();
    setCurrentStep(1);
    setPinPulled(false);
    setAimTarget(null);
    setIsSqueezing(false);
    setExtinguishProgress(0);
    setSweepCount(0);
    setFireSize(100);
    setFeedbackMsg("Step 1: Pull the safety pin to unlock the lever.");
  };

  return (
    <div id="fire-pass-interactive-sim" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-200">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              P.A.S.S. Fire Extinguisher Interactive Sim
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 font-bold">
                Level 1 Drill
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Interactive 4-step emergency drill: Pull, Aim, Squeeze, Sweep.
            </p>
          </div>
        </div>

        <button
          id="fire-sim-reset-btn"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Restart Sim
        </button>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { step: 1, letter: "P", label: "Pull Pin" },
          { step: 2, letter: "A", label: "Aim Low" },
          { step: 3, letter: "S", label: "Squeeze" },
          { step: 4, letter: "S", label: "Sweep" },
        ].map((item) => {
          const isDone = currentStep > item.step || currentStep === 5;
          const isCurrent = currentStep === item.step;
          return (
            <div
              key={item.step}
              className={`p-3 rounded-2xl border transition-all ${
                isDone
                  ? "bg-green-50 border-green-200 text-green-700"
                  : isCurrent
                  ? "bg-orange-50 border-orange-300 text-orange-600 ring-2 ring-orange-200"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              <div className="text-base font-black">{item.letter}</div>
              <div className="text-[11px] font-bold truncate">{item.label}</div>
            </div>
          );
        })}
      </div>

      {/* Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Fire Box Visualizer (6 cols) */}
        <div className="md:col-span-6 bg-slate-950 rounded-2xl p-6 relative h-72 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Flame Visualizer */}
          <div className="relative flex-1 flex items-end justify-center">
            {fireSize > 0 ? (
              <div
                className="relative transition-all duration-300 flex flex-col items-center"
                style={{ transform: `scale(${Math.max(0.2, fireSize / 100)})` }}
              >
                <div className="w-24 h-28 bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 rounded-full blur-[2px] animate-flame flex items-center justify-center">
                  <div className="w-12 h-16 bg-white rounded-full blur-sm opacity-80 animate-pulse" />
                </div>
                <div className="w-36 h-4 bg-orange-950/80 rounded-full blur-md mt-1" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-emerald-400 space-y-2 py-8">
                <ShieldCheck className="w-16 h-16 text-emerald-400 animate-bounce" />
                <div className="text-xl font-black">Fire Completely Extinguished!</div>
                <div className="text-xs text-slate-400">Great job applying the P.A.S.S. method!</div>
              </div>
            )}

            {/* Extinguisher Spray Cloud animation */}
            {isSqueezing && (
              <div className="absolute inset-0 bg-slate-200/20 backdrop-blur-[1px] animate-pulse pointer-events-none rounded-xl flex items-center justify-center">
                <div className="text-white text-xs font-bold tracking-widest bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                  DISCHARGING CHEMICAL FOAM...
                </div>
              </div>
            )}
          </div>

          {/* Aim Target Buttons (on top of fire zone) */}
          {currentStep >= 2 && currentStep < 5 && (
            <div className="space-y-1.5 z-10">
              <div className="text-[10px] uppercase font-bold text-slate-400 text-center tracking-wider">
                Click where to aim nozzle:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="aim-top-flames"
                  onClick={() => handleAim("top")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                    aimTarget === "top"
                      ? "bg-red-500 text-white border-red-400"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  Top Smoke
                </button>
                <button
                  id="aim-mid-flames"
                  onClick={() => handleAim("middle")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border ${
                    aimTarget === "middle"
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  Middle Flames
                </button>
                <button
                  id="aim-base-fuel"
                  onClick={() => handleAim("base")}
                  className={`py-1.5 px-2 rounded-lg text-xs font-black transition-all border ${
                    aimTarget === "base"
                      ? "bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300"
                      : "bg-slate-900 text-emerald-400 border-emerald-500/50 hover:bg-slate-800"
                  }`}
                >
                  🎯 Base of Fire
                </button>
              </div>
            </div>
          )}

          {/* Bottom health bar */}
          <div className="mt-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-1">
              <span>Extinguish Status</span>
              <span className={extinguishProgress === 100 ? "text-emerald-400" : "text-orange-400"}>
                {extinguishProgress}% Extinguished
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 h-full transition-all duration-200"
                style={{ width: `${extinguishProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Controls & Interactive Extinguisher (6 cols) */}
        <div className="md:col-span-6 space-y-4">
          {/* Feedback pill */}
          <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-800 text-sm font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500 shrink-0" />
            <span>{feedbackMsg}</span>
          </div>

          {/* Interactive controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Action 1: Pull Pin */}
            <button
              id="pull-pin-action-btn"
              onClick={handlePullPin}
              disabled={pinPulled}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                pinPulled
                  ? "bg-green-50 border-green-300 text-green-800"
                  : currentStep === 1
                  ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-200 hover:bg-orange-600 animate-pulse"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase">Step 1</span>
                {pinPulled && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
              <div className="font-extrabold text-base mt-2">
                {pinPulled ? "Pin Pulled (Unlocked)" : "Pull Ring Pin"}
              </div>
              <div className="text-[11px] opacity-80 mt-1">Breaks plastic safety tamper seal</div>
            </button>

            {/* Action 2: Squeeze Lever */}
            <button
              id="squeeze-lever-action-btn"
              onMouseDown={handleStartSqueeze}
              onMouseUp={handleStopSqueeze}
              onTouchStart={handleStartSqueeze}
              onTouchEnd={handleStopSqueeze}
              disabled={!pinPulled || currentStep === 5}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between select-none transition-all ${
                isSqueezing
                  ? "bg-red-600 text-white border-red-700 shadow-lg scale-95"
                  : pinPulled && currentStep !== 5
                  ? "bg-white border-2 border-orange-500 text-slate-800 hover:bg-orange-50 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase">Step 3</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                  Hold Down
                </span>
              </div>
              <div className="font-extrabold text-base mt-2">
                {isSqueezing ? "Discharging Foam!" : "Squeeze Lever"}
              </div>
              <div className="text-[11px] opacity-80 mt-1">Press and hold trigger handle</div>
            </button>
          </div>

          {/* Action 3: Sweep Buttons */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Step 4: Sweep Motion</span>
              <span className="text-[11px] text-orange-600 font-bold">{sweepCount}/8 Sweeps</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="sweep-left-btn"
                onClick={() => handleSweepMotion("left")}
                disabled={!isSqueezing || currentStep === 5}
                className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-orange-500 font-bold text-xs text-slate-700 flex items-center justify-center gap-1 shadow-sm active:bg-orange-100 disabled:opacity-40"
              >
                ◀ Sweep Left
              </button>
              <button
                id="sweep-right-btn"
                onClick={() => handleSweepMotion("right")}
                disabled={!isSqueezing || currentStep === 5}
                className="py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-orange-500 font-bold text-xs text-slate-700 flex items-center justify-center gap-1 shadow-sm active:bg-orange-100 disabled:opacity-40"
              >
                Sweep Right ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
