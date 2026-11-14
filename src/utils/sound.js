// Ultra-lightweight Web Audio API synthesizer for futuristic Antigravity UI soundscapes
// Requires zero external audio files, operates instantly in any browser.

let audioCtx = null;
let soundEnabled = false;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = () => soundEnabled;

export const toggleSound = (forceState) => {
  if (typeof forceState === "boolean") {
    soundEnabled = forceState;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (soundEnabled) {
    getAudioContext();
    playChirp("enable");
  }
  try {
    localStorage.setItem("portfolio_sound_enabled", soundEnabled ? "true" : "false");
  } catch (e) {
    // ignore
  }
  return soundEnabled;
};

export const initSoundFromStorage = () => {
  try {
    const saved = localStorage.getItem("portfolio_sound_enabled");
    if (saved === "true") {
      soundEnabled = true;
    }
  } catch (e) {
    // ignore
  }
  return soundEnabled;
};

export const playChirp = (type = "hover") => {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "hover") {
      // Subtle micro-click / high-tech tactile tick
      osc.type = "sine";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "click") {
      // Crisp sci-fi select tone
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === "open") {
      // Futuristic ascending sweep
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "close") {
      // Futuristic descending tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "enable") {
      // Antigravity core activation tone (two-note harmonic chord)
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === "terminal") {
      // Cyber retro terminal keypress
      osc.type = "square";
      osc.frequency.setValueAtTime(750, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    }
  } catch (err) {
    // Ignore audio context autoplay errors
  }
};
