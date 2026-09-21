import React, { useState, useEffect } from "react";
import { 
  Timer, AlertTriangle, ShieldCheck, CheckCircle2, 
  XCircle, ArrowRight, RotateCcw, Sparkles, Zap,
  Weight, BatteryCharging, Radio, Droplets, HeartPulse
} from "lucide-react";
import { GoBagMasterItem } from "../types/gobag";
import { GO_BAG_MASTER_ITEMS } from "../data/gobagMasterData";
import { playCorrectSound, playWrongSound } from "../utils/audioEffects";

// The 3-minute survival drill candidate items (a mix of critical essentials, nice-to-haves, and heavy unnecessary traps)
interface DrillOption {
  id: string;
  name: string;
  category: string;
  weightKg: number;
  isTrap?: boolean;
  scoreContribution: number;
  categoryKey: string;
  explanation: string;
}

const DRILL_CANDIDATE_ITEMS: DrillOption[] = [
  {
    id: "drill_water",
    name: "3L Potable Water Pouches",
    category: "Hydration",
    categoryKey: "water",
    weightKg: 3.0,
    scoreContribution: 20,
    explanation: "Water is the absolute #1 biological priority during evacuations when municipal pipes burst."
  },
  {
    id: "drill_meds",
    name: "Personal Prescription Medications & First Aid",
    category: "Medical",
    categoryKey: "first_aid",
    weightKg: 0.5,
    scoreContribution: 15,
    explanation: "Pharmacies close immediately; life-dependent medications cannot be replaced in transit."
  },
  {
    id: "drill_food",
    name: "Ready-to-Eat High-Calorie Ration Bars",
    category: "Nutrition",
    categoryKey: "food",
    weightKg: 0.8,
    scoreContribution: 15,
    explanation: "Zero-preparation calories keep your energy up without needing gas stoves or clean cookware."
  },
  {
    id: "drill_docs_cash",
    name: "Waterproof Pouch with IDs & Small Cash",
    category: "Documents",
    categoryKey: "documents",
    weightKg: 0.3,
    scoreContribution: 10,
    explanation: "ATMs fail and cashiers cannot take cards during outages; IDs prove identity for shelter services."
  },
  {
    id: "drill_light",
    name: "LED Headlamp / Flashlight & Extra Batteries",
    category: "Lighting",
    categoryKey: "lighting",
    weightKg: 0.3,
    scoreContribution: 10,
    explanation: "Hands-free lighting prevents serious falls in debris-filled stairwells or smoke."
  },
  {
    id: "drill_power",
    name: "Charged 20,000mAh Power Bank & Cable",
    category: "Power",
    categoryKey: "power",
    weightKg: 0.4,
    scoreContribution: 10,
    explanation: "Preserves your phone for emergency alerts, offline navigation, and family reunification."
  },
  {
    id: "drill_whistle_radio",
    name: "Emergency Whistle & Crank Radio",
    category: "Communication",
    categoryKey: "communication",
    weightKg: 0.4,
    scoreContribution: 10,
    explanation: "Signals search-and-rescue teams without screaming, and tunes into civil defense alerts."
  },
  {
    id: "drill_warmth",
    name: "Mylar Thermal Blankets & Rain Poncho",
    category: "Weather Protection",
    categoryKey: "weather",
    weightKg: 0.3,
    scoreContribution: 10,
    explanation: "Prevents deadly hypothermia and shock during cold, wet night evacuations."
  },

  // Distractors & Heavy Traps
  {
    id: "trap_heavy_laptop",
    name: "Heavy Gaming Laptop & Huge Charger Brick",
    category: "Electronics (Non-essential)",
    categoryKey: "trap",
    weightKg: 3.8,
    isTrap: true,
    scoreContribution: -5,
    explanation: "Weighs down your pack drastically without serving immediate 72h survival functions."
  },
  {
    id: "trap_canned_cans_heavy",
    name: "12 Metal Soup Cans (No Opener)",
    category: "Food (Unpractical)",
    categoryKey: "trap",
    weightKg: 5.5,
    isTrap: true,
    scoreContribution: -5,
    explanation: "Extremely heavy to walk with and impossible to open safely without a manual can opener."
  },
  {
    id: "trap_luxury_clothes",
    name: "Suitcases of Formal Clothes & Hair Dryer",
    category: "Luggage (Trap)",
    categoryKey: "trap",
    weightKg: 6.0,
    isTrap: true,
    scoreContribution: -10,
    explanation: "Bulk luggage obstructs crowded stairwells and significantly delays escape during rapid alerts."
  },
  {
    id: "trap_heavy_books",
    name: "Stack of Heavy Hardcover Novels",
    category: "Entertainment (Bulky)",
    categoryKey: "trap",
    weightKg: 4.2,
    isTrap: true,
    scoreContribution: -5,
    explanation: "Adds dead weight when every kilogram reduces walking stamina and speed."
  }
];

interface Props {
  onBackToBuilder: () => void;
  onApplyDrillSelectionsToBag?: (selectedItemIds: string[]) => void;
}

export const GoBagDrillSimulator: React.FC<Props> = ({ onBackToBuilder, onApplyDrillSelectionsToBag }) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(180); // 3 minutes
  const [isDrillActive, setIsDrillActive] = useState<boolean>(false);
  const [selectedDrillItems, setSelectedDrillItems] = useState<string[]>([]);
  const [drillCompleted, setDrillCompleted] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let timer: any = null;
    if (isDrillActive && !drillCompleted && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setDrillCompleted(true);
            setIsDrillActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDrillActive, drillCompleted, secondsRemaining]);

  const startDrill = () => {
    setSecondsRemaining(180);
    setSelectedDrillItems([]);
    setDrillCompleted(false);
    setIsDrillActive(true);
  };

  const toggleItem = (itemId: string) => {
    if (!isDrillActive) return;
    setSelectedDrillItems((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        return prev.filter((id) => id !== itemId);
      } else {
        // Enforce practical max count (e.g. 7 items in a quick 3-min pack)
        if (prev.length >= 8) {
          return prev;
        }
        playCorrectSound();
        return [...prev, itemId];
      }
    });
  };

  const finishDrill = () => {
    setDrillCompleted(true);
    setIsDrillActive(false);
  };

  // Calculate Score & Analysis
  const chosenItems = DRILL_CANDIDATE_ITEMS.filter((item) => selectedDrillItems.includes(item.id));
  const totalWeight = chosenItems.reduce((acc, curr) => acc + curr.weightKg, 0);

  // Scoring calculation
  let rawScore = 0;
  const categoriesPresent = new Set<string>();

  chosenItems.forEach((item) => {
    if (item.isTrap) {
      rawScore += item.scoreContribution; // penalty
    } else {
      if (!categoriesPresent.has(item.categoryKey)) {
        rawScore += item.scoreContribution;
        categoriesPresent.add(item.categoryKey);
      }
    }
  });

  // Clamp 0 to 100
  const finalScore = Math.max(0, Math.min(100, rawScore));

  const hasWater = categoriesPresent.has("water");
  const hasMeds = categoriesPresent.has("first_aid");
  const hasFood = categoriesPresent.has("food");
  const hasLight = categoriesPresent.has("lighting");
  const hasPower = categoriesPresent.has("power");
  const hasComm = categoriesPresent.has("communication");
  const hasDocs = categoriesPresent.has("documents");
  const hasWeather = categoriesPresent.has("weather");
  const hasHeavyTraps = chosenItems.some((i) => i.isTrap);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Intro Alert Banner */}
      <div className="p-5 md:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0">
              <Timer className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
                  Realistic Evacuation Drill
                </span>
                <span className="text-xs text-slate-400">Decision Reflex</span>
              </div>
              <h3 className="text-lg md:text-xl font-black text-white mt-0.5">
                "If you had to leave in 3 minutes, what would you grab?"
              </h3>
            </div>
          </div>

          {/* Action Button */}
          {!isDrillActive && !drillCompleted && (
            <button
              onClick={startDrill}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black text-sm shadow-lg shadow-red-500/25 transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              <span>Start 3-Minute Evacuation</span>
            </button>
          )}

          {isDrillActive && (
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-red-500/40 text-red-400 font-mono text-xl font-black flex items-center gap-2">
                <Timer className="w-5 h-5 animate-spin" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
              <button
                onClick={finishDrill}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors cursor-pointer"
              >
                Evacuate Now
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">The Rule:</strong> When sirens blow or wild evacuation alarms trigger, your pack cannot weigh 30 kilograms. Select up to <strong>7 essential survival items</strong> that protect life, hydration, and communication. Beware of enticing, heavy traps.
        </p>
      </div>

      {/* ACTIVE DRILL SELECTION AREA */}
      {isDrillActive && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2 text-xs text-slate-400">
            <span>
              Items packed: <strong className="text-amber-400">{selectedDrillItems.length}/7</strong>
            </span>
            <span>
              Estimated weight: <strong className={totalWeight > 9 ? "text-red-400" : "text-emerald-400"}>{totalWeight.toFixed(1)} kg</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DRILL_CANDIDATE_ITEMS.map((item) => {
              const isSelected = selectedDrillItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-slate-900 border-amber-500 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40"
                      : "bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        ~{item.weightKg} kg
                      </span>
                    </div>
                    <h4 className="text-sm font-bold mt-0.5 text-white">{item.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{item.explanation}</p>
                  </div>

                  <div className="shrink-0 mt-1">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-900 border border-slate-700 text-slate-500"
                      }`}
                    >
                      {isSelected ? "✓" : "+"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={finishDrill}
              disabled={selectedDrillItems.length === 0}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-sm transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
            >
              Finish & Check Survival Score ({selectedDrillItems.length} items)
            </button>
          </div>
        </div>
      )}

      {/* DRILL COMPLETED / RESULTS SCREEN */}
      {drillCompleted && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Preparedness Evaluation
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Your 3-Minute Evacuation Result
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pack weight: <strong className="text-white">{totalWeight.toFixed(1)} kg</strong> • Items selected: <strong className="text-white">{chosenItems.length}</strong>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-bold">Preparedness Score</div>
                <div className={`text-3xl font-black ${finalScore >= 80 ? "text-emerald-400" : finalScore >= 50 ? "text-amber-400" : "text-red-400"}`}>
                  {finalScore}/100
                </div>
                <div className="text-[10px] text-slate-500">
                  {finalScore >= 80 ? "Good Preparedness" : finalScore >= 50 ? "Moderate Readiness" : "Needs Improvement"}
                </div>
              </div>
            </div>
          </div>

          {/* What You Did Well vs Missed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Did Well */}
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>WHAT YOU DID WELL</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {hasWater && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Secured Hydration:</strong> 3L water is sufficient for initial 72h dehydration defense.</span>
                  </li>
                )}
                {hasMeds && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Protected Health:</strong> Personal daily medications prevent secondary chronic complications.</span>
                  </li>
                )}
                {hasLight && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Secured Lighting:</strong> You can navigate pitch-black stairwells and hazardous rubble safely.</span>
                  </li>
                )}
                {hasPower && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Phone Power Reserve:</strong> Keeps digital maps, SOS alarms, and family contact alive.</span>
                  </li>
                )}
                {hasComm && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Emergency Signaling:</strong> Whistle and radio allow contact even if cellular towers fail.</span>
                  </li>
                )}
                {!hasHeavyTraps && (
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>No Bulky Traps:</strong> Kept luggage lean without dragging useless 10-kg weight anchors.</span>
                  </li>
                )}
                {chosenItems.length === 0 && (
                  <li className="text-slate-400 italic">No items were packed during the drill.</li>
                )}
              </ul>
            </div>

            {/* What You Missed */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                <XCircle className="w-5 h-5" />
                <span>WHAT YOU MAY HAVE MISSED</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {!hasWater && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✗</span>
                    <span><strong>No Drinking Water:</strong> Municipal pumps break; dehydration triggers exhaustion in 24 hours.</span>
                  </li>
                )}
                {!hasMeds && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✗</span>
                    <span><strong>No Medications/First Aid:</strong> Pharmacies will be inaccessible during disasters.</span>
                  </li>
                )}
                {!hasComm && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✗</span>
                    <span><strong>No Radio or Whistle:</strong> Cellular towers congest quickly; you need off-grid signals.</span>
                  </li>
                )}
                {!hasPower && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✗</span>
                    <span><strong>No Backup Power Bank:</strong> Modern smartphones die in 6–10 hours with continuous screen use.</span>
                  </li>
                )}
                {!hasWeather && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✗</span>
                    <span><strong>No Weather Protection:</strong> Wet clothes and night drops cause hypothermia.</span>
                  </li>
                )}
                {hasHeavyTraps && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✗</span>
                    <span><strong>Packed Bulky Traps:</strong> Luggage, textbooks, or heavy laptops added unnecessary weight.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Key Takeaway Banner */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-400">Core Survival Takeaway: </strong>
              "Don't pack everything. Pack what matters." A realistic 72-hour pack prioritizes clean water, prescriptions, emergency lights, and low-energy communication over heavy comforts.
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={startDrill}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry 3-Minute Drill</span>
            </button>

            <button
              onClick={onBackToBuilder}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <span>Back to Go-Bag Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
