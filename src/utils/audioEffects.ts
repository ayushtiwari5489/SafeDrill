// Web Audio API & Speech Synthesis Engine for crystal-clear interactive feedback

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let compressor: DynamicsCompressorNode | null = null;
let soundEnabled = true;
let botSpeechRate = 0.95; // Authoritative, deliberate, clear pacing for emergency instructions
let botSpeechVolume = 1.0; // 100% volume for audibility

// Safe unlock mechanism for browsers
export function unlockAudio() {
  if (typeof window === "undefined") return;
  const ctx = getAudioContext();
  if (ctx && ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  if ("speechSynthesis" in window && window.speechSynthesis.paused) {
    try {
      window.speechSynthesis.resume();
    } catch {}
  }
}

// Auto-register unlock on first user gesture
if (typeof window !== "undefined") {
  const handleFirstGesture = () => {
    unlockAudio();
    window.removeEventListener("pointerdown", handleFirstGesture);
    window.removeEventListener("keydown", handleFirstGesture);
    window.removeEventListener("touchstart", handleFirstGesture);
  };
  window.addEventListener("pointerdown", handleFirstGesture, { once: true, passive: true });
  window.addEventListener("keydown", handleFirstGesture, { once: true, passive: true });
  window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();

      // Set up dynamic range compressor to make sounds punchy, audible, and prevent clipping
      compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-20, audioCtx.currentTime);
      compressor.knee.setValueAtTime(40, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(10, audioCtx.currentTime);
      compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
      compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.9, audioCtx.currentTime);

      compressor.connect(masterGain);
      masterGain.connect(audioCtx.destination);
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function getAudioOutput(ctx: AudioContext): AudioNode {
  return compressor ? compressor : ctx.destination;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (!enabled) {
    stopBotSpeech();
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setBotSpeechRate(rate: number) {
  botSpeechRate = Math.max(0.7, Math.min(1.5, rate));
}

export function getBotSpeechRate(): number {
  return botSpeechRate;
}

export function setBotSpeechVolume(vol: number) {
  botSpeechVolume = Math.max(0, Math.min(1.0, vol));
}

export function getBotSpeechVolume(): number {
  return botSpeechVolume;
}

// --------------------------------------------------------------------------
// Sound Effects (Web Audio API with high audibility & pleasant harmonic shapes)
// --------------------------------------------------------------------------

// Play correct answer pleasant chime (Major chord arpeggio)
export function playCorrectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const output = getAudioOutput(ctx);

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.07);

    gain.gain.setValueAtTime(0, now + index * 0.07);
    gain.gain.linearRampToValueAtTime(0.35, now + index * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.35);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now + index * 0.07);
    osc.stop(now + index * 0.07 + 0.4);
  });
}

// Play wrong answer buzzer
export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const output = getAudioOutput(ctx);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.linearRampToValueAtTime(90, now + 0.28);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(output);

  osc.start(now);
  osc.stop(now + 0.35);
}

// Play heart lost sound
export function playHeartLostSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const output = getAudioOutput(ctx);

  osc.type = "triangle";
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(95, now + 0.25);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

  osc.connect(gain);
  gain.connect(output);

  osc.start(now);
  osc.stop(now + 0.26);
}

// CPR Metronome Click (110 BPM rhythm)
export function playMetronomeTick(isAccent = false) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const output = getAudioOutput(ctx);

  osc.type = "sine";
  osc.frequency.setValueAtTime(isAccent ? 1000 : 800, now);

  gain.gain.setValueAtTime(isAccent ? 0.45 : 0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(output);

  osc.start(now);
  osc.stop(now + 0.07);
}

// Fire Extinguisher Hissing sound
let hissNode: AudioBufferSourceNode | null = null;
let hissGain: GainNode | null = null;

export function startExtinguisherSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (hissNode) return;

  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const outputChannel = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    outputChannel[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1200, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(getAudioOutput(ctx));

  whiteNoise.start();
  hissNode = whiteNoise;
  hissGain = gain;
}

export function stopExtinguisherSound() {
  if (hissNode && hissGain && audioCtx) {
    hissGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    setTimeout(() => {
      try {
        hissNode?.stop();
        hissNode?.disconnect();
      } catch {}
      hissNode = null;
      hissGain = null;
    }, 100);
  }
}

// Clear, High-Audibility Emergency Siren Pulse
export function playEmergencyBeep() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const output = getAudioOutput(ctx);

  // Dual oscillator for rich, urgent acoustic penetration
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = "triangle";
  osc2.type = "sine";

  // Emergency siren frequency sweep (750 Hz to 1350 Hz)
  osc1.frequency.setValueAtTime(750, now);
  osc1.frequency.linearRampToValueAtTime(1350, now + 0.25);
  osc1.frequency.linearRampToValueAtTime(750, now + 0.5);

  osc2.frequency.setValueAtTime(1500, now);
  osc2.frequency.linearRampToValueAtTime(2700, now + 0.25);
  osc2.frequency.linearRampToValueAtTime(1500, now + 0.5);

  gain.gain.setValueAtTime(0.35, now);
  gain.gain.linearRampToValueAtTime(0.4, now + 0.25);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.52);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(output);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.53);
  osc2.stop(now + 0.53);
}

// AI Bot Response Arrival Chime - Crystal clear tri-tone notification
export function playBotResponseChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const output = getAudioOutput(ctx);
  // High clarity bell-like notes: E5, G#5, B5 (E Major chord)
  const notes = [659.25, 830.61, 987.77];

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.08);

    gain.gain.setValueAtTime(0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.38, now + index * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.45);

    osc.connect(gain);
    gain.connect(output);

    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.48);
  });
}

// Radio dispatch squelch chirp (signals active voice transmission)
export function playRadioChirp() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const output = getAudioOutput(ctx);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.linearRampToValueAtTime(950, now + 0.06);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(output);

  osc.start(now);
  osc.stop(now + 0.08);
}

// --------------------------------------------------------------------------
// AI Bot Speech Synthesis Engine (Refined, Audible, Bug-Resistant)
// --------------------------------------------------------------------------

let cachedVoices: SpeechSynthesisVoice[] = [];
let speechHeartbeat: any = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let isSpeakingState = false;
let currentListeners: { onStart?: () => void; onEnd?: () => void } = {};

function initVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  }
}

initVoices();

// Choose the clearest and most natural sounding English voice
function pickOptimalVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  if (!cachedVoices || cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  if (!cachedVoices || cachedVoices.length === 0) return null;

  // Preference list for highest audibility and natural diction
  const priorities = [
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Online")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Neural")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en") && (v.name.includes("Samantha") || v.name.includes("Jenny") || v.name.includes("David")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en") && (v.name.includes("Alex") || v.name.includes("Daniel") || v.name.includes("Victoria")),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en-US") && v.default,
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en") && v.default,
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en-US"),
    (v: SpeechSynthesisVoice) => v.lang.startsWith("en"),
    (v: SpeechSynthesisVoice) => v.default,
  ];

  for (const matchFn of priorities) {
    const match = cachedVoices.find(matchFn);
    if (match) return match;
  }

  return cachedVoices[0] || null;
}

// Text sanitization for human-like emergency audio clarity
export function cleanTextForSpeech(text: string): string {
  if (!text) return "";

  return text
    // Replace markdown symbols
    .replace(/[*_~`#>\-]/g, " ")
    // Spell out critical helpline numbers so they are distinct
    .replace(/\b112\b/g, "one, one, two")
    .replace(/\b911\b/g, "nine, one, one")
    .replace(/\b100\b/g, "one, zero, zero")
    .replace(/\b101\b/g, "one, zero, one")
    .replace(/\b108\b/g, "one, zero, eight")
    .replace(/\b102\b/g, "one, zero, two")
    .replace(/\b1078\b/g, "ten, seventy eight")
    // Clarify common emergency acronyms
    .replace(/\bCPR\b/g, "C P R")
    .replace(/\bAED\b/g, "A E D")
    .replace(/\bLPG\b/g, "L P G")
    .replace(/\bSOS\b/g, "S O S")
    .replace(/\bDO NOT\b/gi, "Do not")
    // Normalize punctuation pauses
    .replace(/\s*;\s*/g, ". ")
    .replace(/\s*:\s*/g, ". ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stopBotSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    if (speechHeartbeat) {
      clearInterval(speechHeartbeat);
      speechHeartbeat = null;
    }
    window.speechSynthesis.cancel();
    isSpeakingState = false;
    activeUtterance = null;
    (window as any).__safeDrillActiveUtterance = null;
    if (currentListeners.onEnd) {
      currentListeners.onEnd();
    }
  } catch {}
}

export function isBotSpeaking(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return isSpeakingState && window.speechSynthesis.speaking;
}

interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Speaks instructions with maximum volume, clean diction, and Chrome bug workarounds
export function speakBotGuidance(rawText: string, options: SpeakOptions = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options.onError?.("Speech synthesis not supported in this browser");
    return;
  }

  if (!soundEnabled) {
    options.onEnd?.();
    return;
  }

  // Stop any prior speech
  stopBotSpeech();

  const text = cleanTextForSpeech(rawText);
  if (!text) {
    options.onEnd?.();
    return;
  }

  // Ensure AudioContext and Speech are active
  unlockAudio();

  // Play subtle radio chirp to signify transmission start
  playRadioChirp();

  // Small delay to let radio chirp play and ensure window.speechSynthesis.cancel() resolves cleanly
  setTimeout(() => {
    try {
      // Chrome pause bug failsafe
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate !== undefined ? options.rate : botSpeechRate;
      utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0;
      utterance.volume = options.volume !== undefined ? options.volume : botSpeechVolume;

      const chosenVoice = pickOptimalVoice();
      if (chosenVoice) {
        utterance.voice = chosenVoice;
        utterance.lang = chosenVoice.lang;
      } else {
        utterance.lang = "en-US";
      }

      currentListeners = {
        onStart: options.onStart,
        onEnd: options.onEnd,
      };

      utterance.onstart = () => {
        isSpeakingState = true;
        options.onStart?.();

        // Chrome 15-second speech synthesis cut-off heartbeat fix
        if (speechHeartbeat) clearInterval(speechHeartbeat);
        speechHeartbeat = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          } else {
            clearInterval(speechHeartbeat);
            speechHeartbeat = null;
          }
        }, 8000);
      };

      utterance.onend = () => {
        if (speechHeartbeat) {
          clearInterval(speechHeartbeat);
          speechHeartbeat = null;
        }
        isSpeakingState = false;
        activeUtterance = null;
        (window as any).__safeDrillActiveUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        if (speechHeartbeat) {
          clearInterval(speechHeartbeat);
          speechHeartbeat = null;
        }
        isSpeakingState = false;
        activeUtterance = null;
        (window as any).__safeDrillActiveUtterance = null;
        options.onError?.(e);
        options.onEnd?.();
      };

      // Retain reference on window to prevent Blink garbage-collection mid-speech
      activeUtterance = utterance;
      (window as any).__safeDrillActiveUtterance = utterance;

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech synthesis error:", err);
      options.onError?.(err);
      options.onEnd?.();
    }
  }, 90);
}

// Self-test helper to immediately demonstrate audible sound and voice clarity
export function playAudioSelfTest(onComplete?: () => void) {
  unlockAudio();
  playBotResponseChime();
  setTimeout(() => {
    speakBotGuidance(
      "SafeDrill Emergency AI audio is active, audible, and calibrated at one hundred percent volume. All instructions will be spoken clearly.",
      {
        onEnd: onComplete,
      }
    );
  }, 450);
}

