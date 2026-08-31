import React, { useState, useEffect, useRef } from "react";
import { Flame, ShieldCheck, RefreshCw, Volume2, VolumeX, Sparkles, AlertTriangle } from "lucide-react";
import { startExtinguisherSound, stopExtinguisherSound, playCorrectSound, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";
import confetti from "canvas-confetti";

interface FireExtinguisherSimProps {
  onScoreEarned?: (points: number) => void;
}

export const FireExtinguisherSim: React.FC<FireExtinguisherSimProps> = ({ onScoreEarned }) => {
  // PASS Step status
  const [pinPulled, setPinPulled] = useState(false);
  const [isAimingAtBase, setIsAimingAtBase] = useState(false);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const [sweepProgress, setSweepProgress] = useState(0); // 0 to 100
  const [fireIntensity, setFireIntensity] = useState(100); // 100% down to 0%
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [nozzleX, setNozzleX] = useState(50); // percentage 0 to 100
  
  const sweepHistoryRef = useRef<number[]>([]);

  // Sound effect handler when squeezing
  useEffect(() => {
    if (isSqueezing && pinPulled && !isExtinguished) {
      startExtinguisherSound();
    } else {
      stopExtinguisherSound();
    }

    return () => {
      stopExtinguisherSound();
    };
  }, [isSqueezing, pinPulled, isExtinguished]);

  // Extinguishing interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSqueezing && pinPulled && isAimingAtBase && !isExtinguished) {
      interval = setInterval(() => {
        setFireIntensity((prev) => {
          const next = Math.max(0, prev - 4);
          if (next === 0 && !isExtinguished) {
            setIsExtinguished(true);
            playCorrectSound();
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
            if (onScoreEarned) onScoreEarned(200);
          }
          return next;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isSqueezing, pinPulled, isAimingAtBase, isExtinguished, onScoreEarned]);

  const handlePullPin = () => {
    if (!pinPulled) {
      setPinPulled(true);
      playCorrectSound();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setNozzleX(Math.max(10, Math.min(90, x)));

    // Base of fire is roughly Y > 55%
    if (y > 45 && y < 90 && x > 25 && x < 75) {
      setIsAimingAtBase(true);
    } else {
      setIsAimingAtBase(false);
    }

    // Track sweep coverage
    sweepHistoryRef.current.push(x);
    if (sweepHistoryRef.current.length > 20) {
      sweepHistoryRef.current.shift();
      const minX = Math.min(...sweepHistoryRef.current);
      const maxX = Math.max(...sweepHistoryRef.current);
      if (maxX - minX > 25) {
        setSweepProgress((prev) => Math.min(100, prev + 5));
      }
    }
  };

  const handleReset = () => {
    setPinPulled(false);
    setIsAimingAtBase(false);
    setIsSqueezing(false);
    setFireIntensity(100);
    setIsExtinguished(false);
    setSweepProgress(0);
    sweepHistoryRef.current = [];
    stopExtinguisherSound();
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <div id="fire-pass-simulator" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              P.A.S.S. Fire Extinguisher 3D Action Simulator
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Interactive Drill
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Follow all 4 steps: <strong>Pull</strong> Pin → <strong>Aim</strong> Low at Base → <strong>Squeeze</strong> Lever → <strong>Sweep</strong> Side to Side!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
            title="Audio feedback"
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
            title="Reset Simulator"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4-Step Checklist Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        <div
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            pinPulled
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${pinPulled ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
            P
          </div>
          <div className="text-xs font-bold leading-tight">
            1. Pull Pin
            <div className="text-[10px] font-normal opacity-80">{pinPulled ? "Unlocked!" : "Locked"}</div>
          </div>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            isAimingAtBase
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${isAimingAtBase ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
            A
          </div>
          <div className="text-xs font-bold leading-tight">
            2. Aim Low
            <div className="text-[10px] font-normal opacity-80">{isAimingAtBase ? "At Base!" : "Hover on base"}</div>
          </div>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            isSqueezing
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${isSqueezing ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
            S
          </div>
          <div className="text-xs font-bold leading-tight">
            3. Squeeze
            <div className="text-[10px] font-normal opacity-80">{isSqueezing ? "Spraying!" : "Hold button"}</div>
          </div>
        </div>

        <div
          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
            sweepProgress > 40
              ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950 border-slate-800 text-slate-400"
          }`}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${sweepProgress > 40 ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
            S
          </div>
          <div className="text-xs font-bold leading-tight">
            4. Sweep
            <div className="text-[10px] font-normal opacity-80">{sweepProgress}% coverage</div>
          </div>
        </div>
      </div>

      {/* Simulator Interactive Canvas Area */}
      <div
        id="fire-interactive-stage"
        onMouseMove={handleMouseMove}
        className="relative h-72 md:h-80 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-900 border border-slate-700 overflow-hidden cursor-crosshair select-none flex flex-col justify-between p-4"
      >
        {/* Top Overlay: Fire Hazard Level & Extinguishing Pressure */}
        <div className="flex items-center justify-between z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs font-bold text-slate-300">Fire Hazard:</span>
            <span className={`text-xs font-black ${fireIntensity > 50 ? "text-red-400" : fireIntensity > 0 ? "text-amber-400" : "text-emerald-400"}`}>
              {fireIntensity}%
            </span>
            <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden ml-1">
              <div
                className={`h-full transition-all duration-100 ${
                  fireIntensity > 50 ? "bg-red-500" : "bg-amber-500"
                }`}
                style={{ width: `${fireIntensity}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
            <span className="text-xs font-bold text-slate-300">Extinguisher Agent:</span>
            <span className="text-xs font-black text-cyan-400">ABC Dry Chemical</span>
          </div>
        </div>

        {/* The Fire Visual (scales with fireIntensity) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!isExtinguished ? (
            <div
              className="relative flex flex-col items-center justify-center transition-all duration-200"
              style={{ transform: `scale(${Math.max(0.2, fireIntensity / 100)})`, opacity: Math.max(0.1, fireIntensity / 100) }}
            >
              {/* Animated Flames */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 blur-md animate-pulse opacity-90" />
                <div className="absolute inset-x-4 bottom-2 h-24 bg-yellow-200 rounded-full blur-sm animate-ping opacity-70" />
                <Flame className="absolute inset-0 m-auto w-24 h-24 text-yellow-100 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
              </div>

              {/* Base target indicator */}
              <div className="mt-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-[11px] font-bold text-red-200 tracking-wider">
                🎯 BASE OF FIRE (Aim Here)
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-emerald-500/60 shadow-2xl animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-black text-white flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-amber-400" /> Fire Successfully Extinguished!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mt-1">
                You correctly followed the P.A.S.S. protocol. Always back away slowly while watching for re-ignition.
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow"
              >
                Practice Drill Again
              </button>
            </div>
          )}
        </div>

        {/* Chemical Spray Cloud Visual when squeezing */}
        {isSqueezing && pinPulled && !isExtinguished && (
          <div
            className="absolute bottom-16 pointer-events-none transition-all duration-75"
            style={{ left: `${nozzleX}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-36 h-48 bg-gradient-to-t from-cyan-200/60 via-slate-100/40 to-transparent blur-md rounded-t-full animate-pulse" />
          </div>
        )}

        {/* Bottom Interactive Controls */}
        <div className="relative z-20 flex items-center justify-between gap-4 mt-auto pt-2 border-t border-slate-800/80 bg-slate-950/80 p-2 rounded-xl backdrop-blur-md">
          {/* Step 1 Pin Toggle */}
          <button
            id="fire-pull-pin-btn"
            onClick={handlePullPin}
            disabled={pinPulled}
            className={`px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
              pinPulled
                ? "bg-slate-800 text-slate-400 border border-slate-700 cursor-default"
                : "bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse shadow-lg"
            }`}
          >
            {pinPulled ? "✓ Pin Pulled (Unlocked)" : "⚠️ 1. Pull Safety Pin"}
          </button>

          {/* Step 3 Squeeze Lever Trigger */}
          <button
            id="fire-squeeze-lever-btn"
            onMouseDown={() => pinPulled && setIsSqueezing(true)}
            onMouseUp={() => setIsSqueezing(false)}
            onTouchStart={() => pinPulled && setIsSqueezing(true)}
            onTouchEnd={() => setIsSqueezing(false)}
            disabled={!pinPulled || isExtinguished}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all select-none ${
              !pinPulled
                ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                : isSqueezing
                ? "bg-cyan-500 text-slate-950 scale-95 shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-400/30"
                : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 hover:scale-105"
            }`}
          >
            {isSqueezing ? "💨 SPRAYING... (HOLD)" : "🔥 3. HOLD TO SQUEEZE"}
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>Move cursor to aim & sweep</span>
          </div>
        </div>
      </div>
    </div>
  );
};
