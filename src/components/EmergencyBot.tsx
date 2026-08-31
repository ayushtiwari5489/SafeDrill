import React, { useState, useRef, useEffect } from "react";
import { 
  Send, 
  Bot, 
  User, 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw,
  Zap,
  Info
} from "lucide-react";
import { ChatMessage, EmergencyBotResponse } from "../types";

export const EmergencyBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "🚨 SafeBot Emergency AI is ACTIVE. State your emergency, location, or disaster situation below for immediate step-by-step life-saving protocols and dispatch advice.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    { label: "🏫 School Earthquake Trapped", prompt: "I am a student trapped in a classroom after a strong earthquake. Broken glass and fallen locker blocking the door. What should I do?" },
    { label: "🧯 Kitchen Cooking Gas Smell", prompt: "Strong rotten egg gas smell in my home kitchen. Lights are off. What is the immediate safety protocol?" },
    { label: "❤️ Unconscious Person (No Breathing)", prompt: "A person suddenly collapsed on the ground, not breathing or responding. Give step-by-step emergency CPR action." },
    { label: "🌊 Flood Water Entering House", prompt: "Flash flood water is entering our ground floor rapidly and rising above ankles. What do I do right now?" },
    { label: "🔥 Clothes Caught Fire", prompt: "Someone's clothing caught on fire from a stove flame. How to extinguish them immediately?" }
  ];

  const emergencyContacts = [
    { name: "Universal Emergency", number: "112", color: "bg-red-500 text-white" },
    { name: "Police Dispatch", number: "100 / 911", color: "bg-blue-600 text-white" },
    { name: "Fire & Rescue", number: "101", color: "bg-orange-500 text-white" },
    { name: "Ambulance / Medical", number: "108 / 102", color: "bg-emerald-600 text-white" },
    { name: "Disaster Management Authority", number: "1078", color: "bg-purple-600 text-white" },
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Speech synthesis reader
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/emergency-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: textToSend,
          location: userLocation || "General / On-site",
          severity: "HIGH",
          history: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            content: m.text || (m.response ? m.response.title : ""),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to contact emergency server.");
      }

      const botData: EmergencyBotResponse = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        response: botData,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Read aloud top step if speech is enabled
      if (speechEnabled && botData.immediateSteps && botData.immediateSteps.length > 0) {
        const speakSummary = `${botData.title}. Step 1: ${botData.immediateSteps[0]}. Call 1 1 2 immediately.`;
        speakText(speakSummary);
      }
    } catch (err: any) {
      console.error("Emergency bot error:", err);
      // Client-side emergency fallback
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: "bot",
        response: {
          success: true,
          severity: "CRITICAL",
          title: "Immediate Life-Safety Protocol",
          immediateSteps: [
            "1. Scene Safety: Remove yourself and victims from immediate fire, collapsing debris, or moving water.",
            "2. Call National Emergency Helpline (112 or local 911/100) immediately.",
            "3. If severe bleeding: Apply firm continuous pressure with clean cloth.",
            "4. If trapped: Tap on pipes/walls with metal objects to signal rescuers without inhaling dust.",
          ],
          doNots: [
            "DO NOT use elevators or enter uninspected basements.",
            "DO NOT touch wet electrical outlets or wires.",
          ],
          helplineNumbers: [
            { name: "Emergency Dispatch", number: "112" },
            { name: "Fire Department", number: "101" },
            { name: "Ambulance", number: "108" },
          ],
          safetyTips: "Stay low to floor if smoke is present. Conserve mobile phone battery.",
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-1",
        sender: "bot",
        text: "🚨 SafeBot Emergency AI is ACTIVE. State your emergency, location, or disaster situation below for immediate step-by-step life-saving protocols and dispatch advice.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div id="safedrill-emergency-bot-section" className="space-y-6">
      {/* Top Emergency Hotlines Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 md:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            Direct One-Tap Emergency Helplines
          </div>
          <span className="text-[11px] text-slate-400">Toll-Free 24/7 Dispatch</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.name}
              href={`tel:${contact.number.split(" ")[0]}`}
              className={`p-3 rounded-2xl ${contact.color} shadow-sm hover:brightness-110 active:scale-95 transition-all flex flex-col justify-between`}
            >
              <div className="text-[10px] font-bold opacity-90 truncate">{contact.name}</div>
              <div className="text-base font-black flex items-center justify-between mt-1">
                <span>{contact.number}</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Chat Interface (Vibrant Palette style) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[640px]">
        {/* Chat Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-orange-200">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-800">SafeBot AI Assistant</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Response
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Gemini 3.7 Flash Certified Disaster & Trauma Protocols</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                speechEnabled
                  ? "bg-orange-50 border-orange-300 text-orange-600"
                  : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title={speechEnabled ? "Mute auto-speech" : "Enable voice read-out"}
            >
              {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 text-xs"
              title="Clear conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Disaster Scenario Chips */}
        <div className="p-3 bg-slate-100/70 border-b border-slate-200/60 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[11px] font-black text-slate-500 uppercase shrink-0">Quick Drills:</span>
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              className="px-3 py-1 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:border-orange-500 hover:text-orange-600 whitespace-nowrap shadow-2xs transition-all active:scale-95"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto bg-slate-50/50">
          {messages.map((msg) => {
            const isBot = msg.sender === "bot";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? "items-start" : "items-start flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                    isBot ? "bg-orange-500 text-white" : "bg-slate-900 text-white"
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
                  {/* Simple text bubble */}
                  {msg.text && (
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        isBot
                          ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs"
                          : "bg-orange-500 text-white rounded-tr-none shadow-sm shadow-orange-200 font-medium"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  {/* Rich Emergency Bot Response Card */}
                  {msg.response && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 rounded-tl-none">
                      {/* Severity Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-0.5 rounded-full text-xs font-black uppercase ${
                              msg.response.severity === "CRITICAL"
                                ? "bg-red-100 text-red-700"
                                : msg.response.severity === "HIGH"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {msg.response.severity} PRIORITY
                          </span>
                          <h4 className="font-black text-slate-900 text-base">{msg.response.title}</h4>
                        </div>

                        <button
                          onClick={() =>
                            speakText(
                              `${msg.response?.title}. ${msg.response?.immediateSteps?.join(". ")}`
                            )
                          }
                          className="p-1 text-slate-400 hover:text-orange-600"
                          title="Read aloud"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Immediate Steps */}
                      {msg.response.immediateSteps && (
                        <div className="space-y-2">
                          <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            Immediate Action Protocol:
                          </div>
                          <div className="space-y-1.5">
                            {msg.response.immediateSteps.map((step, idx) => (
                              <div
                                key={idx}
                                className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 text-xs font-bold text-slate-800 flex items-start gap-2"
                              >
                                <span className="text-emerald-700 font-black shrink-0">#{idx + 1}</span>
                                <span className="leading-relaxed">{step.replace(/^\d+\.\s*/, "")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Do Nots Warnings */}
                      {msg.response.doNots && msg.response.doNots.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="text-xs font-black text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                            <XCircle className="w-3.5 h-3.5" /> Critical Don'ts (Hazards):
                          </div>
                          <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/60 space-y-1 text-xs text-red-900 font-medium">
                            {msg.response.doNots.map((dont, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="font-black text-red-600">✕</span>
                                <span>{dont}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Medical First Aid if present */}
                      {msg.response.medicalFirstAid && (
                        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 space-y-1">
                          <div className="font-black text-blue-800 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> First Aid Advice:
                          </div>
                          <p>{msg.response.medicalFirstAid}</p>
                        </div>
                      )}

                      {/* Safety Tips Footer */}
                      {msg.response.safetyTips && (
                        <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                          ℹ️ {msg.response.safetyTips}
                        </div>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 font-mono block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="font-bold">Analyzing emergency scenario and generating life-saving steps...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="emergency-bot-input"
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Describe your disaster or emergency situation (e.g., Gas leak in basement, Earthquake aftershocks)..."
              className="flex-1 bg-slate-100 border-none rounded-2xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />

            <button
              id="emergency-bot-send-btn"
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-5 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-black rounded-2xl shadow-md shadow-orange-200 flex items-center gap-2 transition-all shrink-0"
            >
              <span>Ask SafeBot</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
