import React, { useState } from "react";
import { 
  Briefcase, CheckCircle2, Circle, ShieldCheck, AlertTriangle, 
  RotateCcw, Sparkles, Filter, Droplets, Utensils, HeartPulse, 
  Flashlight, BatteryCharging, Radio, Sparkle, Shirt, CloudRain, 
  Wrench, FileText, Compass, Users, Baby, Dog, Eye, ChevronDown, 
  ChevronUp, HelpCircle, Download, Calendar, Flame, Waves, Wind,
  Activity, ZapOff, Check, X
} from "lucide-react";
import { 
  GoBagMasterItem, GoBagCategory, DisasterType, 
  PersonalProfileAnswers 
} from "../types/gobag";
import { 
  GO_BAG_MASTER_ITEMS, DISASTER_PRESETS 
} from "../data/gobagMasterData";
import { GoBagDrillSimulator } from "./GoBagDrillSimulator";
import { playCorrectSound } from "../utils/audioEffects";

export const GoBagSection: React.FC = () => {
  // Navigation / View Modes
  const [activeView, setActiveView] = useState<"builder" | "drill" | "readyCheck">("builder");

  // Disaster Preset selection
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>("general");

  // Selected Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Personal profile customizations
  const [personalProfile, setPersonalProfile] = useState<PersonalProfileAnswers>({
    hasChildren: false,
    hasElderly: false,
    hasAccessibility: false,
    hasPets: false,
    climateZone: "moderate"
  });

  // Track packed item IDs
  const [packedItemIds, setPackedItemIds] = useState<string[]>([
    "water_drinking",
    "food_ready_rations",
    "med_personal_prescriptions",
    "first_aid_basic_kit",
    "light_led_flashlight",
    "power_bank_high_cap",
    "comm_whistle_pealess",
    "doc_waterproof_id_copies"
  ]);

  // Expanded "Why It Matters" accordion items
  const [expandedWhyIds, setExpandedWhyIds] = useState<string[]>([]);

  // Toggle packing an item
  const togglePacked = (id: string) => {
    setPackedItemIds((prev) => {
      const isAlreadyPacked = prev.includes(id);
      if (!isAlreadyPacked) {
        playCorrectSound();
        return [...prev, id];
      } else {
        return prev.filter((item) => item !== id);
      }
    });
  };

  // Toggle "Why it matters" explanation
  const toggleWhy = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedWhyIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Filter items based on personal profile & selected disaster
  const availableItems = GO_BAG_MASTER_ITEMS.filter((item) => {
    // If it's a personalized sub-category item, only show if user checked that profile
    if (item.subPersonalCategory === "children" && !personalProfile.hasChildren) return false;
    if (item.subPersonalCategory === "elderly" && !personalProfile.hasElderly) return false;
    if (item.subPersonalCategory === "accessibility" && !personalProfile.hasAccessibility) return false;
    if (item.subPersonalCategory === "pets" && !personalProfile.hasPets) return false;

    // Filter by category tab if not 'all'
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  // Calculations for bag stats
  const packedItems = GO_BAG_MASTER_ITEMS.filter((i) => packedItemIds.includes(i.id));
  const totalWeightKg = packedItems.reduce((acc, curr) => acc + curr.approxWeightKg, 0);
  const criticalItems = availableItems.filter((i) => i.priority === "CRITICAL");
  const packedCriticalCount = criticalItems.filter((i) => packedItemIds.includes(i.id)).length;
  const criticalReadinessPct = criticalItems.length > 0 
    ? Math.round((packedCriticalCount / criticalItems.length) * 100) 
    : 100;

  // Categories list
  const categoryFilters: { id: string; label: string; icon: any }[] = [
    { id: "all", label: "All Items", icon: Briefcase },
    { id: "water", label: "Water", icon: Droplets },
    { id: "food", label: "Food", icon: Utensils },
    { id: "first_aid", label: "First Aid & Meds", icon: HeartPulse },
    { id: "lighting", label: "Lighting", icon: Flashlight },
    { id: "power", label: "Power & Phone", icon: BatteryCharging },
    { id: "communication", label: "Communication", icon: Radio },
    { id: "hygiene", label: "Hygiene", icon: Sparkle },
    { id: "clothing", label: "Clothing", icon: Shirt },
    { id: "weather", label: "Weather Protection", icon: CloudRain },
    { id: "tools", label: "Basic Tools", icon: Wrench },
    { id: "documents", label: "Documents & Cash", icon: FileText },
    { id: "navigation", label: "Navigation", icon: Compass },
    { id: "personal", label: "Personal Needs", icon: Users }
  ];

  const currentDisasterPreset = DISASTER_PRESETS.find((d) => d.id === selectedDisaster) || DISASTER_PRESETS[0];

  const handlePackAllCritical = () => {
    const criticalIds = criticalItems.map((c) => c.id);
    setPackedItemIds((prev) => Array.from(new Set([...prev, ...criticalIds])));
    playCorrectSound();
  };

  const handleResetBag = () => {
    setPackedItemIds([]);
  };

  return (
    <div id="safedrill-gobag-section" className="space-y-6 max-w-5xl mx-auto">
      {/* 1. HERO HEADER: Realistic 72-Hour Go-Bag */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                72-HOUR GO-BAG
              </span>
              <span className="text-xs text-slate-400">Survival & Evacuation Preparedness</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              "If you had to leave in 3 minutes, what would you take?"
            </h1>
            
            <p className="text-sm text-slate-300 leading-relaxed pt-1">
              Build your emergency bag for the first 72 hours. Choose what matters most, understand why it matters, and learn what you may be missing. Keep it lightweight, portable, and realistic—not an extreme survivalist burden.
            </p>

            {/* Top Navigation Mode Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="cta-build-gobag"
                onClick={() => setActiveView("builder")}
                className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeView === "builder"
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>BUILD MY GO-BAG</span>
              </button>

              <button
                id="cta-3min-drill"
                onClick={() => setActiveView("drill")}
                className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeView === "drill"
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md shadow-red-500/25"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>3-Minute Evacuation Drill</span>
              </button>

              <button
                id="cta-bag-ready-status"
                onClick={() => setActiveView("readyCheck")}
                className={`px-5 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  activeView === "readyCheck"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Readiness & Storage Guide</span>
              </button>
            </div>
          </div>

          {/* REALISTIC CAPACITY & WEIGHT GAUGE */}
          <div className="w-full sm:w-auto flex items-center gap-4 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 shrink-0">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Current Bag Weight
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {totalWeightKg.toFixed(1)} <span className="text-sm font-semibold text-slate-400">kg</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Target: <strong>6.0–9.0 kg</strong> (Portable)
              </div>
              <div className="mt-2 text-[11px] font-bold text-slate-300">
                Critical Readiness: <strong className={criticalReadinessPct > 80 ? "text-emerald-400" : "text-amber-400"}>{criticalReadinessPct}%</strong>
              </div>
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden text-center p-1">
              <div
                className={`absolute bottom-0 inset-x-0 transition-all duration-300 ${
                  criticalReadinessPct >= 80 ? "bg-emerald-500/30" : "bg-amber-500/30"
                }`}
                style={{ height: `${criticalReadinessPct}%` }}
              />
              <ShieldCheck className="w-6 h-6 text-amber-400 relative z-10" />
              <span className="text-[10px] font-black text-white relative z-10 mt-0.5">
                {packedItems.length} Packed
              </span>
            </div>
          </div>
        </div>

        {/* Safety Core Banner */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300">Crucial Safety Principle:</strong> Official evacuation orders always take priority over collecting items. Never delay evacuation to pack a bag.
          </span>
        </div>
      </div>

      {/* 2. MODE: 3-MINUTE SURVIVAL DRILL */}
      {activeView === "drill" && (
        <GoBagDrillSimulator
          onBackToBuilder={() => setActiveView("builder")}
        />
      )}

      {/* 3. MODE: KEEP IT READY & STORAGE EDUCATION */}
      {activeView === "readyCheck" && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Readiness Verification
              </span>
              <h3 className="text-xl font-black text-white">Your Go-Bag Storage & Maintenance Plan</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Bag Status Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bag Readiness Overview</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• <strong>Items Packed:</strong> {packedItems.length} of {availableItems.length} available essentials</li>
                <li>• <strong>Approximate Weight:</strong> {totalWeightKg.toFixed(1)} kg ({totalWeightKg > 9 ? "Slightly heavy, consider shedding non-essentials" : "Excellent portable load"})</li>
                <li>• <strong>Critical Supplies:</strong> {packedCriticalCount} of {criticalItems.length} essential life-preservers packed</li>
                <li>• <strong>Review Interval:</strong> Every 6 months (Synchronize with Daylight Saving Time or Spring/Autumn)</li>
              </ul>
            </div>

            {/* Storage Rules Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Optimal Bag Storage Locations</span>
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li>• <strong>Near Primary Exit:</strong> Inside the entryway closet, hall stand, or beside the front door.</li>
                <li>• <strong>Not in the Attic or Basement:</strong> During an earthquake or flood, stairs to basements and attics collapse or flood first.</li>
                <li>• <strong>Everyone Knows the Location:</strong> Ensure children, roommates, and elderly family members know where the pack sits.</li>
              </ul>
            </div>
          </div>

          {/* Maintenance Reminders */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3 text-xs text-amber-200">
            <h4 className="text-sm font-black text-amber-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Periodic Readiness Checklist</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Check Food & Meds:</strong> Replace expired energy bars, blister packs, and water bottles.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Recharge Power Banks:</strong> Lithium batteries lose charge over 6 months; top up to 100%.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Update Physical Contacts:</strong> Check that phone numbers and addresses are current.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Seasonal Clothing Swap:</strong> Exchange winter woolens for rain gear as seasons change.</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView("builder")}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            ← Return to Interactive Bag Builder
          </button>
        </div>
      )}

      {/* 4. MODE: INTERACTIVE BAG BUILDER */}
      {activeView === "builder" && (
        <div className="space-y-6">
          {/* DISASTER SITUATION PRESET SELECTOR */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step 1: Choose Your Situation
                </span>
                <h3 className="text-base font-black text-white mt-0.5">
                  What disaster are you preparing for?
                </h3>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Recommendations adapt automatically
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {DISASTER_PRESETS.map((preset) => {
                const isSelected = selectedDisaster === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedDisaster(preset.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10 ring-1 ring-amber-500"
                        : "bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="text-xs font-black text-white">{preset.title.split(" ")[0]}</div>
                    <div className="text-[10px] text-amber-400 font-semibold mt-1">{preset.badge}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Disaster Guidance Card */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">{currentDisasterPreset.title}: </strong>
                {currentDisasterPreset.summary} <span className="text-amber-300 font-medium">({currentDisasterPreset.keyAdvice})</span>
              </div>
            </div>
          </div>

          {/* PERSONALIZATION CONTROLS */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step 2: Household Personalization
                </span>
                <h4 className="text-sm font-black text-white mt-0.5">
                  Are there specific personal requirements in your home?
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => setPersonalProfile((p) => ({ ...p, hasChildren: !p.hasChildren }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  personalProfile.hasChildren
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Baby className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Infants / Children</span>
                </div>
                <span className="text-xs font-bold">{personalProfile.hasChildren ? "✓" : "+"}</span>
              </button>

              <button
                onClick={() => setPersonalProfile((p) => ({ ...p, hasElderly: !p.hasElderly }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  personalProfile.hasElderly
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Elderly / Glasses</span>
                </div>
                <span className="text-xs font-bold">{personalProfile.hasElderly ? "✓" : "+"}</span>
              </button>

              <button
                onClick={() => setPersonalProfile((p) => ({ ...p, hasAccessibility: !p.hasAccessibility }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  personalProfile.hasAccessibility
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Mobility Needs</span>
                </div>
                <span className="text-xs font-bold">{personalProfile.hasAccessibility ? "✓" : "+"}</span>
              </button>

              <button
                onClick={() => setPersonalProfile((p) => ({ ...p, hasPets: !p.hasPets }))}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  personalProfile.hasPets
                    ? "bg-amber-500/20 border-amber-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Dog className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Pets (Cat / Dog)</span>
                </div>
                <span className="text-xs font-bold">{personalProfile.hasPets ? "✓" : "+"}</span>
              </button>
            </div>
          </div>

          {/* CATEGORY FILTER TABS & BULK ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
              {categoryFilters.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <button
                onClick={handlePackAllCritical}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
              >
                ✓ Pack All Critical
              </button>
              <button
                onClick={handleResetBag}
                className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer"
                title="Reset Bag"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* MASTER ITEMS LIST WITH "WHY IT MATTERS" INTERACTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {availableItems.map((item) => {
              const isPacked = packedItemIds.includes(item.id);
              const isWhyExpanded = expandedWhyIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => togglePacked(item.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isPacked
                      ? "bg-slate-900 border-emerald-500/50 shadow-md shadow-emerald-500/5"
                      : "bg-slate-950/80 hover:bg-slate-900 border-slate-800/80 text-slate-300"
                  }`}
                >
                  <div>
                    {/* Header Row: Title, Priority Badge, Weight */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <button
                          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                            isPacked
                              ? "bg-emerald-500 text-slate-950 font-bold"
                              : "bg-slate-900 border border-slate-700 text-transparent"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <div>
                          <h4 className={`text-sm font-bold leading-tight ${isPacked ? "text-white" : "text-slate-200"}`}>
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">
                            📂 {item.categoryLabel} • ~{item.approxWeightKg} kg
                          </span>
                        </div>
                      </div>

                      {/* Priority Tag */}
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded shrink-0 ${
                          item.priority === "CRITICAL"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : item.priority === "HIGH"
                            ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            : item.priority === "USEFUL"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-400 mt-2 pl-8 leading-snug">
                      {item.description}
                    </p>
                  </div>

                  {/* "Why does this matter?" educational expandable */}
                  <div className="mt-3 pl-8 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={(e) => toggleWhy(item.id, e)}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Why does this matter?</span>
                      {isWhyExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {isWhyExpanded && (
                      <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-amber-500/20 text-xs text-slate-300 leading-relaxed animate-fade-in">
                        <strong className="text-amber-300 block mb-1">Practical Reason:</strong>
                        {item.whyItMatters}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty fallback */}
          {availableItems.length === 0 && (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400">
              No supplies matched the current category or household filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
