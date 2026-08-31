import React, { useState, useEffect, useRef } from "react";
import { Play, Square, Heart, Award, RefreshCw, Volume2, VolumeX, Sparkles } from "lucide-react";
import { playMetronomeTick, isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";

interface CprTrainerProps {
  onScoreEarned?: (points: number) => void;
}

export const CprTrainer: React.FC<CprTrainerProps> = ({ onScoreEarned }) => {
  const [isActive, setIsActive] = useState(false);
  const [compressionCount, setCompressionCount] = useState(0);
  const [bpmFeedback, setBpmFeedback] = useState<"PERFECT" | "TOO_SLOW" | "TOO_FAST" | "READY">("READY");
  const [lastTapTime, setLastTapTime] = useState<number | null>(null);
  const [accuracyScore, setAccuracyScore] = useState(100);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [pulseAnimation, setPulseAnimation] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const beatCountRef = useRef(0);

  // Target BPM: 110 (within the optimal 100-120 range)
  const TARGET_INTERVAL_MS = 60000 / 110; // ~545ms

  useEffect(() => {
    if (isActive) {
      // Metronome interval
      timerRef.current = setInterval(() => {
        beatCountRef.current += 1;
        const isAccent = beatCountRef.current % 4 === 1;
        playMetronomeTick(isAccent);
        
        // Trigger pulse visual
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 200);
      }, TARGET_INTERVAL_MS);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const toggleMetronome = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setBpmFeedback("READY");
    }
  };

  const handleCompressionTap = () => {
    const now = Date.now();
    setCompressionCount((prev) => prev + 1);

    if (lastTapTime) {
      const delta = now - lastTapTime;
      const userBpm = Math.round(60000 / delta);

      if (userBpm >= 100 && userBpm <= 120) {
        setBpmFeedback("PERFECT");
        setAccuracyScore((prev) => Math.min(100, prev + 2));
      } else if (userBpm < 100) {
        setBpmFeedback("TOO_SLOW");
        setAccuracyScore((prev) => Math.max(30, prev - 4));
      } else {
        setBpmFeedback("TOO_FAST");
        setAccuracyScore((prev) => Math.max(30, prev - 4));
      }
    } else {
      setBpmFeedback("PERFECT");
    }

    setLastTapTime(now);

    // Milestone rewards
    if (compressionCount === 29) {
      if (onScoreEarned) onScoreEarned(150);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setCompressionCount(0);
    setLastTapTime(null);
    setBpmFeedback("READY");
    setAccuracyScore(100);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <div id="cpr-interactive-trainer" className="rounded-2xl bg-slate-900 border border-slate-800 p-5 md:p-6 shadow-xl relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <Heart className={`w-5 h-5 ${pulseAnimation ? "scale-125 text-rose-300" : ""} transition-transform duration-100`} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              CPR Rhythm Metronome & Beat Trainer
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                110 BPM
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Optimal adult chest compression rate is 100 to 120 compressions per minute.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="cpr-sound-toggle"
            onClick={toggleSound}
            className={`p-2 rounded-lg text-xs font-semibold border transition-all ${
              soundOn
                ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
            }`}
            title={soundOn ? "Mute audio" : "Unmute audio"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            id="cpr-reset-btn"
            onClick={handleReset}
            className="p-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors"
            title="Reset Counter"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        {/* Left: Metronome Pulse Visualizer */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center">
          <div className="relative flex items-center justify-center my-3">
            {/* Rhythm Ring */}
            <div
              className={`w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-150 ${
                pulseAnimation
                  ? "border-rose-500 bg-rose-500/20 scale-110 shadow-lg shadow-rose-500/30"
                  : "border-slate-800 bg-slate-900/50 scale-100"
              }`}
            >
              <Heart
                className={`w-12 h-12 transition-all duration-150 ${
                  pulseAnimation ? "text-rose-400 scale-110 fill-rose-500/40" : "text-slate-600"
                }`}
              />
            </div>
            {isActive && (
              <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white uppercase tracking-wider shadow">
                110 BPM
              </span>
            )}
          </div>

          <button
            id="cpr-start-stop-metronome"
            onClick={toggleMetronome}
            className={`mt-4 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
              isActive
                ? "bg-amber-600 hover:bg-amber-500 text-slate-950"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30"
            }`}
          >
            {isActive ? (
              <>
                <Square className="w-4 h-4 fill-current" /> Stop Metronome Guide
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Start Audio Beat (110 BPM)
              </>
            )}
          </button>
        </div>

        {/* Center: Tap Target & Compression Counter */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 text-center">
          <div className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
            Target: 30 Compressions / Cycle
          </div>

          {/* Interactive Tap Zone */}
          <button
            id="cpr-compression-tap-button"
            onClick={handleCompressionTap}
            className="group relative w-32 h-32 rounded-2xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 text-white font-extrabold flex flex-col items-center justify-center shadow-xl shadow-rose-600/30 active:scale-95 transition-all transform hover:brightness-110 border border-rose-400/40"
          >
            <div className="text-3xl font-black">{compressionCount}</div>
            <span className="text-[11px] font-semibold text-rose-100 uppercase tracking-wider mt-1">
              PUSH HERE
            </span>
            <div className="text-[9px] text-rose-200/80">Lock Elbows</div>
          </button>

          {/* Feedback badge */}
          <div className="mt-4">
            {bpmFeedback === "PERFECT" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-bounce">
                <Sparkles className="w-3.5 h-3.5" /> Perfect Cadence! (100-120 BPM)
              </span>
            )}
            {bpmFeedback === "TOO_SLOW" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ⚠️ Too Slow! Speed up tempo
              </span>
            )}
            {bpmFeedback === "TOO_FAST" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ⚠️ Too Fast! Allow chest recoil
              </span>
            )}
            {bpmFeedback === "READY" && (
              <span className="text-xs text-slate-400">
                Tap button in rhythm to practice hand compressions
              </span>
            )}
          </div>
        </div>

        {/* Right: Real-time Stats & Guidelines */}
        <div className="flex flex-col justify-between p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
              <span>Rhythm Accuracy</span>
              <span className="text-emerald-400 font-bold">{accuracyScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  accuracyScore > 75
                    ? "bg-emerald-500"
                    : accuracyScore > 50
                    ? "bg-amber-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${accuracyScore}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-rose-400 text-sm">30:2</span>
              <span>Give 30 compressions followed by 2 rescue breaths (or continuous compressions if untrained).</span>
            </div>
            <div className="flex items-start gap-2 text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-400 text-sm">2"</span>
              <span>Compress 2 to 2.4 inches deep into the sternum. Do not lean on chest between pumps.</span>
            </div>
          </div>

          {compressionCount >= 30 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full 30-compression cycle completed! Check airway or continue.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
