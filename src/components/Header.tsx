import React, { useState } from "react";
import { 
  Gamepad2, BookOpen, Bot, Briefcase, Siren, 
  PhoneCall, ShieldAlert, X, Volume2, VolumeX, Flame 
} from "lucide-react";
import { TabType } from "../types";
import { Logo } from "./Logo";
import { isSoundEnabled, setSoundEnabled } from "../utils/audioEffects";

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [showSosModal, setShowSosModal] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const navItems = [
    { id: "quiz" as TabType, label: "Survival Drill (Game)", icon: Gamepad2, badge: "2-Choice" },
    { id: "courses" as TabType, label: "Safety Courses", icon: BookOpen, badge: "Interactive" },
    { id: "emergency-bot" as TabType, label: "Emergency AI Bot", icon: Bot, badge: "Live AI" },
    { id: "go-bag" as TabType, label: "72h Go-Bag", icon: Briefcase, badge: "Packer" },
  ];

  const emergencyHelplines = [
    { name: "Universal Disaster / Emergency", number: "112", desc: "Single National Emergency Hotline (India / EU / Universal)" },
    { name: "Police Emergency", number: "100 / 911", desc: "Direct law enforcement & crowd security" },
    { name: "Fire & Rescue Department", number: "101", desc: "Fire fighting, structural collapses & HAZMAT" },
    { name: "Ambulance & Medical Trauma", number: "108 / 102", desc: "Advanced life support ambulances & trauma response" },
    { name: "National Disaster Management (NDMA)", number: "1078", desc: "Flood, cyclone & major earthquake response control room" },
    { name: "Women's Safety Helpline", number: "1091", desc: "Dedicated emergency response assistance for women" }
  ];

  return (
    <header id="safedrill-main-header" className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Left: SafeDrill Brand Logo */}
          <div className="cursor-pointer" onClick={() => onTabChange("quiz")}>
            <Logo size="md" />
          </div>

          {/* Center: Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all select-none ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/25 scale-[1.02]"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: SOS Emergency Button & Sound */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors hidden sm:flex items-center justify-center"
              title="Toggle Audio Feedback"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              id="header-sos-button"
              onClick={() => setShowSosModal(true)}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 animate-pulse transition-all active:scale-95 border border-red-400/40"
            >
              <Siren className="w-4 h-4" />
              <span>SOS HELPLINES</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-between gap-1 py-2 border-t border-slate-900 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950"
                    : "text-slate-400 bg-slate-900/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SOS DIRECT HELPLINES MODAL */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-red-500/50 p-6 md:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowSosModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/40 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  Emergency SOS Helplines
                </h3>
                <p className="text-xs text-slate-400">
                  Tap to call emergency response services directly from your device.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyHelplines.map((line, idx) => (
                <a
                  key={idx}
                  href={`tel:${line.number.replace(/\s+/g, '')}`}
                  className="p-3.5 rounded-2xl bg-slate-950 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-300">{line.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{line.desc}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-900">
                    <span className="text-lg font-black text-amber-400 group-hover:text-red-400">
                      📞 {line.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      Call
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 flex items-start gap-2">
              <span className="font-bold text-red-400">⚠️ NOTICE:</span>
              <span>During heavy disasters, cellular towers may experience congestion. If voice calls drop, send SMS texts or use SafeDrill AI Bot for triage.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
