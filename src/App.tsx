import React, { useState } from "react";
import { Header } from "./components/Header";
import { GameSection } from "./components/GameSection";
import { CoursesSection } from "./components/CoursesSection";
import { EmergencyBotSection } from "./components/EmergencyBotSection";
import { GoBagSection } from "./components/GoBagSection";
import { TabType } from "./types";
import { Shield, Sparkles, AlertTriangle, Heart, BookOpen, Bot, Award } from "lucide-react";
import { ThemeProvider } from "./context/ThemeContext";

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>("quiz");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans transition-colors duration-200">
      {/* SafeDrill Navigation Bar */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* TAB 1: 2-OPTION GAMIFIED SURVIVAL DRILL */}
        {activeTab === "quiz" && (
          <GameSection
            onNavigateToCourses={() => setActiveTab("courses")}
            onNavigateToBot={() => setActiveTab("emergency-bot")}
          />
        )}

        {/* TAB 2: PRACTICAL SAFETY COURSES */}
        {activeTab === "courses" && (
          <CoursesSection />
        )}

        {/* TAB 3: AI EMERGENCY TRIAGE BOT */}
        {activeTab === "emergency-bot" && (
          <EmergencyBotSection />
        )}

        {/* TAB 4: 72-HOUR SURVIVAL GO-BAG CHECKLIST */}
        {activeTab === "go-bag" && (
          <GoBagSection />
        )}
      </main>

      {/* Modern Footer with Quick Drill Stats */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 mt-auto py-8 text-center text-xs text-slate-500 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-500 dark:text-amber-400" /> SafeDrill Hackathon Edition
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Real-time 2-Choice Drills
            </span>
            <span className="flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> AI Emergency Assistance
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-600 max-w-xl mx-auto">
            SafeDrill is engineered to build instinctual muscle memory for natural disasters, domestic fires, medical crises, and urban hazards.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
