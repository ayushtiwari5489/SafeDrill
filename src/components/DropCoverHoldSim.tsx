import React, { useState, useEffect } from "react";
import { Shield, AlertOctagon, Sparkles, RefreshCw, Volume2, VolumeX } from "lucide-react";
import { playEmergencyBeep, playCorrectSound, playWrongSound, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";

interface DropCoverHoldSimProps {
  onScoreEarned?: (points: number) => void;
}

export const DropCoverHoldSim: React.FC<DropCoverHoldSimProps> = ({ onScoreEarned }) => {
  const [gameState, setGameState] = useState<"IDLE" | "WAITING" | "SHAKING" | "SURVIVED" | "FAILED">("IDLE");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [shakingIntensity, setShakingIntensity] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (gameState === "WAITING") {
      // Random delay between 1.5 and 4.0 seconds
      const delay = Math.floor(Math.random() * 2500) + 1500;
      timeout = setTimeout(() => {
        setGameState("SHAKING");
        setShakingIntensity(1);
        playEmergencyBeep();
        (window as any)._quakeStartTime = Date.now();
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [gameState]);

  const handleStartDrill = () => {
    setGameState("WAITING");
    setReactionTime(null);
    setShakingIntensity(0);
  };

  const handleDropAction = () => {
    if (gameState === "WAITING") {
      // Clicked too early before shaking
      setGameState("FAILED");
      playWrongSound();
      return;
    }

    if (gameState === "SHAKING") {
      const start = (window as any)._quakeStartTime || Date.now();
      const elapsed = Date.now() - start;
      setReactionTime(elapsed);
      setGameState("SURVIVED");
      setShakingIntensity(0);
      playCorrectSound();

      if (onScoreEarned) {
        const bonus = Math.max(50, 250 - Math.floor(elapsed / 10));
        onScoreEarned(bonus);
      }
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <div id="drop-cover-hold-mini-game" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 md:p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              Seismic Reflex Drill: Drop, Cover & Hold On!
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Reflex Challenge
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              When the earthquake tremor triggers, hit <strong>DROP & COVER</strong> as fast as humanly possible!
            </p>
          </div>
        </div>

        <button
          onClick={toggleSound}
          className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
          title="Sound"
        >
          {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      {/* Interactive Arena */}
      <div
        className={`relative h-64 rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-all duration-75 overflow-hidden border ${
          gameState === "SHAKING"
            ? "bg-red-950/70 border-red-500 animate-bounce ring-8 ring-red-500/30"
            : gameState === "WAITING"
            ? "bg-slate-950 border-amber-500/50"
            : gameState === "SURVIVED"
            ? "bg-emerald-950/70 border-emerald-500"
            : gameState === "FAILED"
            ? "bg-red-950/80 border-red-500"
            : "bg-slate-950 border-slate-800"
        }`}
      >
        {gameState === "IDLE" && (
          <div className="space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <AlertOctagon className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">Ready to test your survival reaction time?</h4>
            <p className="text-xs text-slate-400">
              Earthquakes give zero warning. Tap start and be ready to DROP the moment shaking starts.
            </p>
            <button
              onClick={handleStartDrill}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20"
            >
              Start Reflex Drill
            </button>
          </div>
        )}

        {gameState === "WAITING" && (
          <div className="space-y-3 animate-pulse">
            <div className="text-sm font-bold text-amber-400 uppercase tracking-widest">
              👂 Listen closely... stay alert...
            </div>
            <div className="text-xs text-slate-400">
              DO NOT CLICK YET! Wait for the seismic shockwave.
            </div>
            <button
              onClick={handleDropAction}
              className="mt-4 px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm border border-slate-600 cursor-pointer"
            >
              Ready (Stand By...)
            </button>
          </div>
        )}

        {gameState === "SHAKING" && (
          <div className="space-y-3 z-10">
            <div className="text-2xl md:text-3xl font-black text-red-400 uppercase tracking-wider animate-ping">
              🚨 EARTHQUAKE! SHAKING NOW!
            </div>
            <button
              onClick={handleDropAction}
              className="px-10 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xl uppercase tracking-widest shadow-2xl shadow-red-600/60 scale-110 active:scale-95 transition-all border-2 border-white"
            >
              🛡️ DROP & COVER NOW!
            </button>
          </div>
        )}

        {gameState === "SURVIVED" && (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-sm font-black">
              <Sparkles className="w-4 h-4 text-amber-400" /> SURVIVED!
            </div>
            <h4 className="text-2xl font-black text-white">
              Reaction Time: <span className="text-emerald-400">{reactionTime} ms</span>
            </h4>
            <p className="text-xs text-slate-300 max-w-sm">
              {reactionTime && reactionTime < 450
                ? "⚡ Pro Reflexes! You dropped under the sturdy desk before heavy debris fell."
                : "Good save! You safely held on to the furniture legs until the shockwave subsided."}
            </p>
            <button
              onClick={handleStartDrill}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 mx-auto shadow"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Try Again to Beat High Score
            </button>
          </div>
        )}

        {gameState === "FAILED" && (
          <div className="space-y-3">
            <div className="text-red-400 text-lg font-black">
              ❌ False Alarm! You clicked too early.
            </div>
            <p className="text-xs text-slate-400">
              Wait until the tremor actually starts before making your move.
            </p>
            <button
              onClick={handleStartDrill}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 mx-auto border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Drill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
