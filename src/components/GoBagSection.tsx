import React, { useState } from "react";
import { 
  Briefcase, CheckCircle2, Circle, ShieldCheck, 
  AlertTriangle, Download, RefreshCw, Sparkles, Filter 
} from "lucide-react";
import { INITIAL_GO_BAG_ITEMS } from "../data";
import { GoBagItem } from "../types";
import { playCorrectSound } from "../utils/audioEffects";

export const GoBagSection: React.FC = () => {
  const [items, setItems] = useState<GoBagItem[]>(INITIAL_GO_BAG_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Water & Food",
    "First Aid & Meds",
    "Tools & Power",
    "Documents & Cash",
    "Sanitation & Warmth"
  ];

  const handleTogglePacked = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.packed;
          if (next) playCorrectSound();
          return { ...item, packed: next };
        }
        return item;
      })
    );
  };

  const packedCount = items.filter((i) => i.packed).length;
  const totalCount = items.length;
  const readinessPercent = Math.round((packedCount / totalCount) * 100);

  const filteredItems = selectedCategory === "All"
    ? items
    : items.filter((i) => i.category === selectedCategory);

  const handlePackAll = () => {
    setItems((prev) => prev.map((i) => ({ ...i, packed: true })));
    playCorrectSound();
  };

  const handleReset = () => {
    setItems(INITIAL_GO_BAG_ITEMS);
  };

  return (
    <div id="safedrill-gobag-section" className="space-y-6 max-w-5xl mx-auto">
      {/* Go Bag Header & Readiness Gauge */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Briefcase className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                72-Hour Evacuation Kit
              </span>
              <span className="text-xs text-slate-400">Emergency Preparedness</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              Disaster Go-Bag Interactive Packer
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Pack essential supplies to survive the first 72 hours of any severe disaster evacuation.
            </p>
          </div>
        </div>

        {/* Readiness Meter Gauge */}
        <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-bold">Kit Readiness</div>
            <div className="text-2xl font-black text-amber-400">{readinessPercent}%</div>
            <div className="text-[10px] text-slate-500">{packedCount} of {totalCount} packed</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center relative overflow-hidden">
            <div
              className={`absolute bottom-0 inset-x-0 transition-all duration-300 ${
                readinessPercent > 80 ? "bg-emerald-500/40" : readinessPercent > 40 ? "bg-amber-500/40" : "bg-red-500/40"
              }`}
              style={{ height: `${readinessPercent}%` }}
            />
            <ShieldCheck className="w-7 h-7 text-white relative z-10" />
          </div>
        </div>
      </div>

      {/* Action Controls & Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePackAll}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            ✓ Pack All
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
            title="Reset Checklist"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Items Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleTogglePacked(item.id)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 select-none ${
                item.packed
                  ? "bg-slate-900/90 border-emerald-500/40 text-slate-200 shadow-md"
                  : "bg-slate-950/70 hover:bg-slate-900 border-slate-800/80 text-slate-400"
              }`}
            >
              <button
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                  item.packed
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-900 border border-slate-700 text-transparent hover:border-slate-500"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm font-bold truncate ${item.packed ? "text-white line-through opacity-80" : "text-slate-200"}`}>
                    {item.name}
                  </h4>
                  <span
                    className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      item.importance === "CRITICAL"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : item.importance === "HIGH"
                        ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {item.description}
                </p>
                <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                  📂 {item.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Pro Tip Footer */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-300">Go-Bag Placement Advice: </span>
          Keep your Go-Bag in an easily accessible location near the front door or bedroom exit, never buried in a high closet or attic. Check medication and ration expiration dates every 6 months.
        </div>
      </div>
    </div>
  );
};
