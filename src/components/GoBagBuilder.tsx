import React, { useState } from "react";
import { Check, Plus, PackageCheck, AlertCircle, Sparkles, RefreshCw, ShieldAlert } from "lucide-react";
import { INITIAL_GO_BAG_ITEMS } from "../data";
import { GoBagItem } from "../types";
import { playCorrectSound } from "../utils/audioEffects";

export const GoBagBuilder: React.FC = () => {
  const [items, setItems] = useState<GoBagItem[]>(INITIAL_GO_BAG_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Water & Food", "First Aid & Meds", "Tools & Power", "Documents & Cash", "Sanitation & Warmth"];

  const toggleItem = (id: string) => {
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
  const criticalCount = items.filter((i) => i.importance === "CRITICAL" && i.packed).length;
  const totalCritical = items.filter((i) => i.importance === "CRITICAL").length;
  const readinessPercent = Math.round((packedCount / items.length) * 100);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const handlePackAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, packed: true })));
    playCorrectSound();
  };

  const handleReset = () => {
    setItems(INITIAL_GO_BAG_ITEMS);
  };

  return (
    <div id="gobag-interactive-checklist" className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
      {/* Header & Readiness Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-100">
        <div className="md:col-span-7 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-black uppercase">
              72-Hour Evacuation Kit
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              Grab & Go in under 10 seconds
            </span>
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            Emergency Go-Bag Readiness Simulator
          </h3>
          <p className="text-sm text-slate-600">
            Tap items to pack or unpack them. Ensure all <strong className="text-red-600">CRITICAL</strong> life-support items are packed first before non-essentials.
          </p>
        </div>

        <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Readiness Score</span>
            </div>
            <span className="text-lg font-black text-purple-600">{readinessPercent}%</span>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                readinessPercent >= 80
                  ? "bg-emerald-500"
                  : readinessPercent >= 50
                  ? "bg-purple-600"
                  : "bg-amber-500"
              }`}
              style={{ width: `${readinessPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <span>Critical Items: <strong className="text-slate-900">{criticalCount}/{totalCritical}</strong></span>
            <span>Total Packed: <strong className="text-slate-900">{packedCount}/{items.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Category Pills & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePackAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            Pack All
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Reset Checklist"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-start justify-between gap-3 ${
                item.packed
                  ? "bg-white border-purple-300 ring-2 ring-purple-50 shadow-sm"
                  : "bg-slate-50 border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300"
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{item.name}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      item.importance === "CRITICAL"
                        ? "bg-red-100 text-red-700"
                        : item.importance === "HIGH"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.importance}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  {item.category}
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all mt-0.5 ${
                  item.packed
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-slate-300 bg-white"
                }`}
              >
                {item.packed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
