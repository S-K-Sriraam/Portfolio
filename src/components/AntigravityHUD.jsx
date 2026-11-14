import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  isSoundEnabled,
  toggleSound,
  playChirp,
  initSoundFromStorage,
} from "../utils/sound";
import { projects, technologies } from "../constants";

export const AntigravityHUD = ({ onToggleGravity, isZeroGravity }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [commandInput, setCommandInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([
    {
      type: "system",
      text: "⚡ Antigravity Agent Core v2.6.4 initialized. System Online.",
    },
    {
      type: "system",
      text: "Type 'help' or click quick chips below to explore commands.",
    },
  ]);
  const [fps, setFps] = useState(60);
  const terminalBottomRef = useRef(null);

  // Initialize sound preference
  useEffect(() => {
    const saved = initSoundFromStorage();
    setSoundOn(saved);
  }, []);

  // Track cursor position for ambient spotlight glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global hotkey Ctrl+K / Cmd+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => {
          const next = !prev;
          playChirp(next ? "open" : "close");
          return next;
        });
      }
      if (e.key === "Escape" && terminalOpen) {
        setTerminalOpen(false);
        playChirp("close");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminalOpen]);

  // FPS telemetry counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId;

    const calculateFps = (now) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calculateFps);
    };

    animId = requestAnimationFrame(calculateFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto scroll terminal
  useEffect(() => {
    if (terminalOpen && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [commandHistory, terminalOpen]);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    playChirp("terminal");
    const newEntry = { type: "user", text: `$ ${cmd}` };
    const responses = [];

    switch (trimmed) {
      case "help":
        responses.push({
          type: "output",
          text: `Available Commands:
  • help       : Display command catalog
  • projects   : List all 15+ engineered applications
  • skills     : View full technical stack telemetry
  • about      : Read engineering background & bio
  • contact    : Jump straight to contact terminal
  • gravity    : Toggle zero-gravity levitation mode
  • sound      : Toggle audio soundscapes (${soundOn ? "ON" : "OFF"})
  • status     : View live system telemetry
  • clear      : Clear terminal screen`,
        });
        break;

      case "projects":
        responses.push({
          type: "output",
          text: `Found ${projects.length} verified projects:\n` +
            projects
              .slice(0, 8)
              .map((p, i) => `  [${i + 1}] ${p.name} (${p.category.toUpperCase()})`)
              .join("\n") +
            `\n  ...and ${projects.length - 8} more. Use the Projects section to filter!`,
        });
        break;

      case "skills":
        responses.push({
          type: "output",
          text: `Core Technical Matrix:\n` +
            technologies.map((t) => `  ⚡ ${t.name}`).join("  |  "),
        });
        break;

      case "about":
        responses.push({
          type: "output",
          text: `Developer: Sriraam S K\nRole: Full Stack Engineer & IoT Builder\nFocus: High-performance React/Node webapps, ESP32/Raspberry Pi hardware, 3D interactive graphics.`,
        });
        break;

      case "contact":
        responses.push({
          type: "output",
          text: `Navigating to Contact Section...`,
        });
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth" });
        }
        break;

      case "gravity":
      case "zero-g":
        if (onToggleGravity) onToggleGravity();
        responses.push({
          type: "output",
          text: `Zero-Gravity mode ${!isZeroGravity ? "ACTIVATED 🚀" : "NORMALIZED ⚓"}.`,
        });
        break;

      case "sound":
        const updated = toggleSound();
        setSoundOn(updated);
        responses.push({
          type: "output",
          text: `Audio soundscapes ${updated ? "ENABLED 🔊" : "MUTED 🔇"}.`,
        });
        break;

      case "status":
        responses.push({
          type: "output",
          text: `SYSTEM TELEMETRY:
  • FPS          : ${fps} fps
  • Latency      : < 15ms
  • Viewport     : ${window.innerWidth} x ${window.innerHeight}
  • Zero-G State : ${isZeroGravity ? "ONLINE" : "STANDBY"}
  • Sound Audio  : ${soundOn ? "ACTIVE" : "DISABLED"}
  • Agent Engine : Antigravity v2.6 Deepmind Architecture`,
        });
        break;

      case "clear":
        setCommandHistory([]);
        setCommandInput("");
        return;

      default:
        responses.push({
          type: "error",
          text: `Command '${trimmed}' unrecognized. Type 'help' for available commands.`,
        });
        break;
    }

    setCommandHistory((prev) => [...prev, newEntry, ...responses]);
    setCommandInput("");
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    executeCommand(commandInput);
  };

  return (
    <>
      {/* 1. Global Ambient Spotlight Aura (Follows cursor smoothly) */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300 opacity-60 sm:opacity-80"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(145, 94, 255, 0.12), rgba(0, 206, 168, 0.04) 40%, transparent 80%)`,
        }}
      />

      {/* 2. Floating Bottom Controls Dock (Sound Toggle, Terminal Pill, Zero-G indicator) */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5">
        {/* Terminal Toggle Button */}
        <button
          type="button"
          onClick={() => {
            setTerminalOpen((prev) => {
              const next = !prev;
              playChirp(next ? "open" : "close");
              return next;
            });
          }}
          className="group px-3.5 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-[#915eff]/40 hover:border-[#915eff] text-white shadow-[0_0_20px_rgba(145,94,255,0.3)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] transition-all flex items-center gap-2 text-[12px] font-semibold cursor-pointer"
          title="Open Antigravity Terminal (Ctrl+K)"
        >
          <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-ping" />
          <span className="font-mono text-[#00cea8]">AGY:</span>
          <span>Terminal</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-secondary font-mono">
            Ctrl+K
          </span>
        </button>

        {/* Zero-G Toggle Button */}
        <button
          type="button"
          onClick={() => {
            playChirp("click");
            if (onToggleGravity) onToggleGravity();
          }}
          className={`px-3 py-2.5 rounded-full backdrop-blur-md border text-[12px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
            isZeroGravity
              ? "bg-[#915eff]/20 border-[#915eff] text-[#dfd9ff] shadow-[0_0_15px_#915eff]"
              : "bg-black/80 border-white/15 text-secondary hover:text-white hover:border-white/30"
          }`}
          title="Toggle Zero-Gravity Levitation"
        >
          <span>🚀</span>
          <span className="hidden md:inline font-mono text-[11px]">
            {isZeroGravity ? "ZERO-G ON" : "ZERO-G OFF"}
          </span>
        </button>

        {/* Audio Soundscape Toggle Button with Equalizer Bars */}
        <button
          type="button"
          onClick={handleSoundToggle}
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all flex items-center justify-center cursor-pointer shadow-md ${
            soundOn
              ? "bg-[#00cea8]/15 border-[#00cea8] text-[#00cea8] shadow-[0_0_15px_rgba(0,206,168,0.4)]"
              : "bg-black/80 border-white/15 text-secondary hover:text-white hover:border-white/30"
          }`}
          title={soundOn ? "Mute Sci-Fi Soundscape" : "Enable Sci-Fi Soundscape"}
        >
          {soundOn ? (
            <div className="flex items-center gap-0.5 h-3.5 px-0.5">
              <span className="w-1 bg-[#00cea8] rounded-full animate-[bounce_0.6s_infinite_alternate]" />
              <span className="w-1 bg-[#00cea8] rounded-full animate-[bounce_0.8s_infinite_alternate_0.2s] h-3" />
              <span className="w-1 bg-[#00cea8] rounded-full animate-[bounce_0.5s_infinite_alternate_0.4s] h-2" />
            </div>
          ) : (
            <span className="text-[13px]">🔇</span>
          )}
        </button>
      </div>

      {/* 3. Interactive Neural Terminal Modal Window */}
      <AnimatePresence>
        {terminalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setTerminalOpen(false);
                playChirp("close");
              }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#09061c]/95 border border-[#915eff]/40 rounded-2xl shadow-[0_0_50px_rgba(145,94,255,0.3)] overflow-hidden flex flex-col z-10 font-mono text-[13px]"
            >
              {/* Header Bar */}
              <div className="p-3.5 bg-black/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setTerminalOpen(false)} />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-white/90 font-bold text-[12px] flex items-center gap-1.5">
                    <span>⚡</span> Antigravity Neural Terminal v2.6
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-secondary">
                  <span className="text-emerald-400 font-bold">{fps} FPS</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTerminalOpen(false);
                      playChirp("close");
                    }}
                    className="text-secondary hover:text-white cursor-pointer px-1.5 py-0.5 rounded hover:bg-white/10"
                  >
                    ESC
                  </button>
                </div>
              </div>

              {/* Output Scroll Area */}
              <div className="p-4 h-[320px] overflow-y-auto space-y-2 text-white/90 scrollbar-thin">
                {commandHistory.map((entry, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed whitespace-pre-wrap ${
                      entry.type === "user"
                        ? "text-[#00cea8] font-bold"
                        : entry.type === "error"
                        ? "text-red-400"
                        : entry.type === "system"
                        ? "text-secondary/80"
                        : "text-[#e2e8f0]"
                    }`}
                  >
                    {entry.text}
                  </div>
                ))}
                <div ref={terminalBottomRef} />
              </div>

              {/* Quick Command Chips */}
              <div className="p-2.5 bg-black/40 border-t border-white/5 flex flex-wrap gap-1.5">
                {["help", "projects", "skills", "about", "contact", "gravity", "sound", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-[#915eff]/20 border border-white/10 hover:border-[#915eff]/50 text-secondary hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
                  >
                    ${cmd}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleCommandSubmit}
                className="p-3 bg-black/60 border-t border-white/10 flex items-center gap-2"
              >
                <span className="text-[#00cea8] font-bold text-[14px]">❯</span>
                <input
                  type="text"
                  autoFocus
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type a command (e.g. 'help', 'projects', 'skills')..."
                  className="w-full bg-transparent outline-none text-white placeholder:text-secondary/50 font-mono text-[13px]"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-[#915eff] hover:bg-[#804dee] text-white font-bold text-[11px] transition-colors cursor-pointer"
                >
                  EXEC
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AntigravityHUD;
