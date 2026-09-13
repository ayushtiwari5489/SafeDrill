import React, { useState, useRef, useEffect } from "react";
import { 
  Send, Bot, AlertOctagon, PhoneCall, ShieldAlert, 
  Sparkles, CheckCircle, AlertTriangle, Siren, Volume2, 
  VolumeX, RefreshCw, Compass, HeartPulse, Flame, Zap,
  Square, Play, Radio, FastForward
} from "lucide-react";
import { EmergencyBotResponse, ChatMessage } from "../types";
import { 
  playEmergencyBeep, 
  playBotResponseChime, 
  playAudioSelfTest,
  speakBotGuidance, 
  stopBotSpeech, 
  isBotSpeaking, 
  isSoundEnabled, 
  setSoundEnabled,
  getBotSpeechRate,
  setBotSpeechRate
} from "../utils/audioEffects";

export const EmergencyBotSection: React.FC = () => {
  const [problemText, setProblemText] = useState("");
  const [locationContext, setLocationContext] = useState("Home / Indoor");
  const [declaredUrgency, setDeclaredUrgency] = useState<"CRITICAL" | "HIGH" | "MODERATE">("HIGH");
  const [isLoading, setIsLoading] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [speechSpeed, setSpeechSpeed] = useState(0.95);
  const [activeSpeakingKey, setActiveSpeakingKey] = useState<string | null>(null);
  const [isAudioTesting, setIsAudioTesting] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "bot",
      text: "🚨 SafeDrill AI Emergency Assistant active. Describe your situation or tap a quick crisis scenario below for immediate, life-saving step-by-step guidance.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
  ]);

  const sirenIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle siren audio
  useEffect(() => {
    if (isSirenActive && soundOn) {
      playEmergencyBeep();
      sirenIntervalRef.current = setInterval(() => {
        playEmergencyBeep();
      }, 700);
    } else {
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    }

    return () => {
      if (sirenIntervalRef.current) clearInterval(sirenIntervalRef.current);
    };
  }, [isSirenActive, soundOn]);

  const quickPresets = [
    { label: "🩸 Severe Arterial Bleeding", query: "Person has deep cut with spurting bright red blood on arm.", location: "Home", urgency: "CRITICAL" },
    { label: "🫁 Adult Choking & Silent", query: "Adult holding throat, gasping, cannot talk or cough.", location: "Restaurant", urgency: "CRITICAL" },
    { label: "⚡ Kitchen LPG Gas Leak Smell", query: "Strong rotten-egg gas smell inside kitchen, room is dark.", location: "Home Kitchen", urgency: "CRITICAL" },
    { label: "🏢 High-Rise Fire Smoke in Hall", query: "Apartment hallway filled with dark smoke, alarm blaring.", location: "High-Rise 10th floor", urgency: "CRITICAL" },
    { label: "🏚️ Earthquake Trapped in Room", query: "Earthquake stopped, door jammed, ceiling rubble overhead.", location: "School Classroom", urgency: "HIGH" },
    { label: "🌊 Floodwater Entering House", query: "Water rising past doorstep, electrical sockets near water level.", location: "Ground floor home", urgency: "HIGH" }
  ];

  const playFullVoiceInstructions = (msgId: string, response: EmergencyBotResponse) => {
    const key = `full-${msgId}`;
    if (activeSpeakingKey === key) {
      stopBotSpeech();
      setActiveSpeakingKey(null);
      return;
    }

    const narrative = `${response.title}. ` +
      `Priority Step 1: ${response.immediateSteps[0] || ""}. ` +
      (response.immediateSteps[1] ? `Step 2: ${response.immediateSteps[1]}. ` : "") +
      (response.immediateSteps[2] ? `Step 3: ${response.immediateSteps[2]}. ` : "") +
      (response.doNots && response.doNots.length > 0 ? `Critical warning: Do not ${response.doNots[0]}. ` : "") +
      `Universal Emergency Helpline is one one two.`;

    setActiveSpeakingKey(key);
    speakBotGuidance(narrative, {
      rate: speechSpeed,
      onStart: () => setActiveSpeakingKey(key),
      onEnd: () => setActiveSpeakingKey(null),
      onError: () => setActiveSpeakingKey(null),
    });
  };

  const playSingleStepVoice = (stepKey: string, stepContent: string) => {
    if (activeSpeakingKey === stepKey) {
      stopBotSpeech();
      setActiveSpeakingKey(null);
      return;
    }

    setActiveSpeakingKey(stepKey);
    speakBotGuidance(stepContent, {
      rate: speechSpeed,
      onStart: () => setActiveSpeakingKey(stepKey),
      onEnd: () => setActiveSpeakingKey(null),
      onError: () => setActiveSpeakingKey(null),
    });
  };

  const handleTestSound = () => {
    if (isAudioTesting) {
      stopBotSpeech();
      setIsAudioTesting(false);
      setActiveSpeakingKey(null);
      return;
    }

    setIsAudioTesting(true);
    setActiveSpeakingKey("test-sound");
    playAudioSelfTest(() => {
      setIsAudioTesting(false);
      setActiveSpeakingKey(null);
    });
  };

  const handleSendQuery = async (queryToSend?: string) => {
    const text = queryToSend || problemText;
    if (!text.trim() || isLoading) return;

    // Stop any existing speech when sending a new query
    stopBotSpeech();
    setActiveSpeakingKey(null);

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setProblemText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/emergency-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: text,
          location: locationContext,
          severity: declaredUrgency,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text || (m.response ? `${m.response.title}: ${m.response.immediateSteps.join("; ")}` : "")
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: EmergencyBotResponse = await response.json();

      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        response: data,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Play arrival chime to audibly notify the user
      playBotResponseChime();

      // Read aloud top emergency instructions clearly if sound is on
      if (soundOn && data.immediateSteps && data.immediateSteps.length > 0) {
        const topStepSummary = `${data.title}. Priority Step 1: ${data.immediateSteps[0]}. Call 1 1 2 immediately if in danger.`;
        setActiveSpeakingKey(`full-${botMsgId}`);
        speakBotGuidance(topStepSummary, {
          rate: speechSpeed,
          onStart: () => setActiveSpeakingKey(`full-${botMsgId}`),
          onEnd: () => setActiveSpeakingKey(null),
          onError: () => setActiveSpeakingKey(null),
        });
      }
    } catch (err: any) {
      // Local fallback emergency response
      const fallbackMsgId = `bot-fallback-${Date.now()}`;
      const fallbackMsg: ChatMessage = {
        id: fallbackMsgId,
        sender: "bot",
        response: {
          success: true,
          source: "offline-failsafe",
          severity: "CRITICAL",
          title: "Immediate Life-Safety Action Required",
          immediateSteps: [
            "Scene Safety: Move away from immediate fire, falling debris, or high-voltage lines.",
            "Call National Emergency Dispatch (112 or 911 / 100) immediately.",
            "If bleeding, apply direct continuous firm pressure with clean cloth.",
            "Stay low if smoke is present and avoid elevator shafts."
          ],
          doNots: [
            "DO NOT use elevators during fires or earthquakes.",
            "DO NOT touch exposed electrical fixtures in flooded water."
          ],
          helplineNumbers: [
            { name: "Universal Emergency", number: "112" },
            { name: "Police", number: "100 / 911" },
            { name: "Fire", number: "101" },
            { name: "Ambulance", number: "108 / 102" }
          ],
          safetyTips: "Conserve phone battery and stay calm while responders navigate to you."
        },
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);

      // Play chime and speak fallback
      playBotResponseChime();
      if (soundOn) {
        setActiveSpeakingKey(`full-${fallbackMsgId}`);
        speakBotGuidance("Immediate Life Safety Action: Move away from danger and call 1 1 2.", {
          rate: speechSpeed,
          onStart: () => setActiveSpeakingKey(`full-${fallbackMsgId}`),
          onEnd: () => setActiveSpeakingKey(null),
          onError: () => setActiveSpeakingKey(null),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (!next) {
      stopBotSpeech();
      setActiveSpeakingKey(null);
    }
  };

  const cycleSpeechSpeed = () => {
    const nextSpeed = speechSpeed === 0.85 ? 1.0 : speechSpeed === 1.0 ? 1.15 : 0.85;
    setSpeechSpeed(nextSpeed);
    setBotSpeechRate(nextSpeed);
  };

  return (
    <div id="safedrill-emergency-bot-section" className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner: Emergency Status & Strobe/SOS Alarm */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-950/90 via-slate-900 to-slate-900 border border-red-500/40 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-xl bg-red-600/20 text-red-400 border border-red-500/40 flex items-center justify-center shrink-0">
            <Siren className={`w-6 h-6 ${isSirenActive ? "animate-spin text-red-400" : ""}`} />
            {isSirenActive && (
              <div className="absolute inset-0 rounded-xl bg-red-500/30 animate-ping" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              SafeDrill AI Emergency Bot
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white uppercase tracking-wider">
                Live AI Triage
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Type your emergency situation to receive instant, audible life-saving instructions with audio voice narration.
            </p>
          </div>
        </div>

        {/* Audio & Alarm Control Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Test Sound Button */}
          <button
            id="bot-sound-test-btn"
            onClick={handleTestSound}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              isAudioTesting
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30 animate-pulse"
                : "bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700"
            }`}
            title="Test AI Voice & Sound Audibility"
          >
            <Radio className={`w-3.5 h-3.5 ${isAudioTesting ? "animate-spin" : ""}`} />
            {isAudioTesting ? "Testing Audio..." : "🔊 Test AI Voice & Sound"}
          </button>

          {/* Voice Speed Toggle */}
          <button
            onClick={cycleSpeechSpeed}
            className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1"
            title="Adjust Voice Speed for Audibility"
          >
            <FastForward className="w-3.5 h-3.5 text-amber-400" />
            <span>{speechSpeed === 0.85 ? "0.85x (Calm)" : speechSpeed === 1.0 ? "1.0x (Normal)" : "1.15x (Fast)"}</span>
          </button>

          {/* SOS Siren Toggle */}
          <button
            id="sos-siren-toggle"
            onClick={() => setIsSirenActive(!isSirenActive)}
            className={`px-3.5 py-2 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg ${
              isSirenActive
                ? "bg-red-500 text-white animate-pulse ring-4 ring-red-500/30 shadow-red-500/50"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            <Siren className="w-3.5 h-3.5" />
            {isSirenActive ? "Stop Siren" : "🚨 SOS Siren"}
          </button>

          {/* Global Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-colors ${
              soundOn 
                ? "bg-slate-800 text-amber-400 border-amber-500/40 hover:bg-slate-700" 
                : "bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-800"
            }`}
            title={soundOn ? "Sound Enabled (Click to Mute)" : "Sound Muted (Click to Unmute)"}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 1-Tap Quick Emergency Presets Bar */}
      <div>
        <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant 1-Tap Crisis Protocols (Select to Auto-Generate):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setLocationContext(preset.location);
                setDeclaredUrgency(preset.urgency as any);
                handleSendQuery(preset.query);
              }}
              className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 hover:border-red-500/50 border border-slate-800 text-left transition-all text-xs font-bold text-slate-200 group flex flex-col justify-between"
            >
              <span className="line-clamp-2 text-[11px] leading-tight group-hover:text-amber-300">
                {preset.label}
              </span>
              <span className="text-[9px] text-slate-500 mt-1 uppercase font-semibold">
                {preset.location}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation & Triage Card Stream */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-4 md:p-6 shadow-2xl space-y-4">
        {/* Messages Stream */}
        <div className="space-y-4 min-h-[300px] max-h-[520px] overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {msg.sender === "user" ? (
                <div className="max-w-lg p-4 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/10">
                  <div className="text-[10px] text-slate-900/70 font-semibold mb-1">
                    Emergency Situation ({msg.timestamp}):
                  </div>
                  {msg.text}
                </div>
              ) : (
                <div className="w-full max-w-2xl space-y-3">
                  {msg.text && (
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-sm flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1">{msg.text}</div>
                    </div>
                  )}

                  {/* STRUCTURED EMERGENCY TRIAGE CARD */}
                  {msg.response && (
                    <div className="p-5 md:p-6 rounded-2xl bg-slate-950 border border-slate-700 shadow-xl space-y-5">
                      {/* Triage Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              msg.response.severity === "CRITICAL"
                                ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                                : msg.response.severity === "HIGH"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/40"
                                : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                            }`}
                          >
                            🚨 {msg.response.severity} PRIORITY
                          </span>
                          <span className="text-xs text-slate-400">
                            {msg.timestamp}
                          </span>
                        </div>

                        <div className="text-[11px] font-semibold text-slate-400">
                          Source: <span className="text-cyan-400">
                            {msg.response.source?.includes("gemini") 
                              ? `Google ${msg.response.source}` 
                              : "SafeDrill Emergency Engine"}
                          </span>
                        </div>
                      </div>

                      {/* Main Emergency Title */}
                      <h4 className="text-lg md:text-xl font-extrabold text-white">
                        {msg.response.title}
                      </h4>

                      {/* VOICE GUIDANCE CONTROLLER BAR */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-inner">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            activeSpeakingKey?.startsWith(`full-${msg.id}`) 
                              ? "bg-amber-500 text-slate-950 animate-pulse" 
                              : "bg-slate-800 text-amber-400"
                          }`}>
                            <Volume2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-100 flex items-center gap-2">
                              <span>AI Voice Dispatch</span>
                              {activeSpeakingKey?.startsWith(`full-${msg.id}`) && (
                                <span className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping mr-1" />
                                  Speaking Instructions...
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Loud & clear synthesized voice narration at 100% volume
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playFullVoiceInstructions(msg.id, msg.response!)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                              activeSpeakingKey === `full-${msg.id}`
                                ? "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/30"
                                : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                            }`}
                          >
                            {activeSpeakingKey === `full-${msg.id}` ? (
                              <>
                                <Square className="w-3.5 h-3.5 fill-current" /> Stop Voice
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current" /> Read Aloud (Voice)
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Immediate 1-2-3 Action Protocol */}
                      <div className="space-y-2">
                        <div className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" /> Immediate Life-Saving Steps:
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            Tap 🔊 to listen to each step
                          </span>
                        </div>
                        <div className="space-y-2">
                          {(msg.response.immediateSteps || []).map((step, idx) => {
                            const stepKey = `step-${msg.id}-${idx}`;
                            const isStepSpeaking = activeSpeakingKey === stepKey;
                            return (
                              <div
                                key={idx}
                                className={`p-3.5 rounded-xl border text-sm font-semibold flex items-start gap-3 transition-colors ${
                                  isStepSpeaking
                                    ? "bg-slate-850 border-amber-400/60 shadow-md shadow-amber-500/10 text-white"
                                    : "bg-slate-900 border-slate-800 text-slate-100"
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                                  isStepSpeaking
                                    ? "bg-amber-500 text-slate-950 font-bold"
                                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                }`}>
                                  {idx + 1}
                                </span>
                                <div className="leading-snug flex-1">{step}</div>
                                <button
                                  onClick={() => playSingleStepVoice(stepKey, `Step ${idx + 1}: ${step}`)}
                                  className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                                    isStepSpeaking
                                      ? "bg-amber-500 text-slate-950 border-amber-400"
                                      : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                                  }`}
                                  title={`Listen to Step ${idx + 1}`}
                                >
                                  {isStepSpeaking ? (
                                    <Square className="w-3.5 h-3.5 fill-current" />
                                  ) : (
                                    <Volume2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Critical DO NOTs Warning Box */}
                      {msg.response.doNots && msg.response.doNots.length > 0 && (
                        <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" /> Fatal Errors to Avoid (DO NOT):
                            </div>
                            <button
                              onClick={() => playSingleStepVoice(
                                `donots-${msg.id}`, 
                                `Critical warnings to avoid: ${msg.response?.doNots?.join(". ")}`
                              )}
                              className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                                activeSpeakingKey === `donots-${msg.id}`
                                  ? "bg-red-500 text-white border-red-400"
                                  : "bg-red-900/40 hover:bg-red-900/60 text-red-200 border-red-500/30"
                              }`}
                            >
                              <Volume2 className="w-3 h-3" />
                              {activeSpeakingKey === `donots-${msg.id}` ? "Stop Warnings" : "Listen Warnings"}
                            </button>
                          </div>
                          <ul className="space-y-1.5 text-xs text-red-200">
                            {msg.response.doNots.map((d, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="font-black text-red-400">✕</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Medical First Aid if provided */}
                      {msg.response.medicalFirstAid && (
                        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-black text-rose-300 uppercase block">
                              🩹 First-Aid Recommendation:
                            </span>
                            <button
                              onClick={() => playSingleStepVoice(
                                `firstaid-${msg.id}`, 
                                `First-Aid Recommendation: ${msg.response?.medicalFirstAid}`
                              )}
                              className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-900/40 hover:bg-rose-900/60 text-rose-200 border border-rose-500/30 flex items-center gap-1"
                            >
                              <Volume2 className="w-3 h-3" />
                              Hear First-Aid
                            </button>
                          </div>
                          <div className="leading-relaxed">{msg.response.medicalFirstAid}</div>
                        </div>
                      )}

                      {/* 1-Touch Emergency Helplines */}
                      <div className="pt-2">
                        <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> One-Touch Direct Emergency Helplines:
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(msg.response.helplineNumbers || [
                            { name: "Emergency All-in-One", number: "112" },
                            { name: "Police", number: "100" },
                            { name: "Fire Service", number: "101" },
                            { name: "Ambulance", number: "108" }
                          ]).map((h, i) => (
                            <a
                              key={i}
                              href={`tel:${h.number.replace(/\s+/g, '')}`}
                              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center transition-colors group"
                            >
                              <span className="text-[10px] text-slate-400 font-semibold">{h.name}</span>
                              <span className="text-base font-black text-amber-400 group-hover:text-amber-300">
                                📞 {h.number}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Reassurance Tip */}
                      {msg.response.safetyTips && (
                        <div className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                          💡 <strong>Safety note:</strong> {msg.response.safetyTips}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs animate-pulse">
              <div className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span>SafeDrill AI analyzing situation and formulating immediate emergency response protocol...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar & Controls */}
        <div className="pt-3 border-t border-slate-800 space-y-3">
          {/* Location & Urgency Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Location:</span>
              <select
                value={locationContext}
                onChange={(e) => setLocationContext(e.target.value)}
                className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Home / Indoor" className="bg-slate-900">Home / Indoor</option>
                <option value="School / College" className="bg-slate-900">School / College</option>
                <option value="High-Rise Building" className="bg-slate-900">High-Rise Building</option>
                <option value="Metro Station / Transit" className="bg-slate-900">Metro Station / Transit</option>
                <option value="Commercial Mall / Cinema" className="bg-slate-900">Commercial Mall / Cinema</option>
                <option value="Outdoors / Beach / Forest" className="bg-slate-900">Outdoors / Beach / Forest</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Urgency:</span>
              <select
                value={declaredUrgency}
                onChange={(e) => setDeclaredUrgency(e.target.value as any)}
                className="bg-transparent text-red-400 font-bold focus:outline-none cursor-pointer"
              >
                <option value="CRITICAL" className="bg-slate-900 text-red-400">🚨 CRITICAL (Life Threat)</option>
                <option value="HIGH" className="bg-slate-900 text-amber-400">⚠️ HIGH (Urgent Hazard)</option>
                <option value="MODERATE" className="bg-slate-900 text-blue-400">ℹ️ MODERATE (Precautionary)</option>
              </select>
            </div>
          </div>

          {/* Prompt Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              id="emergency-prompt-input"
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="Describe what is happening right now (e.g., child choked on coin, transformer spark, gas smell)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white text-sm placeholder:text-slate-500 shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !problemText.trim()}
              className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-red-600 text-white font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg shadow-red-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
