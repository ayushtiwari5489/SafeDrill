// Web Audio API Synthesizer for zero-latency interactive feedback

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

// Play correct answer pleasant chime (Major chord arpeggio)
export function playCorrectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.07);

    gain.gain.setValueAtTime(0, now + index * 0.07);
    gain.gain.linearRampToValueAtTime(0.2, now + index * 0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.07 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.07);
    osc.stop(now + index * 0.07 + 0.35);
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

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.linearRampToValueAtTime(80, now + 0.3);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

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

  osc.type = "triangle";
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

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

  osc.type = "sine";
  osc.frequency.setValueAtTime(isAccent ? 950 : 750, now);

  gain.gain.setValueAtTime(isAccent ? 0.35 : 0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

// Fire Extinguisher Hissing sound
let hissNode: AudioBufferSourceNode | null = null;
let hissGain: GainNode | null = null;

export function startExtinguisherSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (hissNode) return;

  // Generate white noise buffer
  const bufferSize = ctx.sampleRate * 2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // High pass filter to simulate compressed gas
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1200, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.1);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

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

// Emergency Siren Pulse
export function playEmergencyBeep() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.linearRampToValueAtTime(1400, now + 0.25);
  osc.frequency.linearRampToValueAtTime(800, now + 0.5);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.5);
}
