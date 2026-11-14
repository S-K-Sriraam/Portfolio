import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas, StarsCanvas } from "./canvas";
import { playChirp } from "../utils/sound";

const roles = [
  "Full Stack Web Developer",
  "IoT & Embedded Systems Builder",
  "3D Web & Interactive UI Engineer",
  "React & Node.js Specialist",
];

const telemetryBadges = [
  { icon: "🛰️", label: "Core: React 19 & Node.js", delay: 0 },
  { icon: "🤖", label: "Edge: ESP32 & IoT Telemetry", delay: 1.5 },
  { icon: "🌐", label: "Graphics: Three.js & WebGL", delay: 3 },
  { icon: "⚡", label: "Status: Ready for Impact", delay: 4.5 },
];

function Hero({ isZeroGravity }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden bg-primary">
      {/* 3D background stars */}
      <StarsCanvas />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#915eff]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00cea8]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#804dee]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero content header */}
      <div
        className={`${styles.paddingX} pointer-events-none absolute inset-0 top-[90px] sm:top-[105px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-4">
          <div className="w-5 h-5 rounded-full bg-[#915eff] shadow-[0_0_25px_#915eff] animate-pulse" />
          <div className="w-1 sm:h-72 h-36 violet-gradient" />
        </div>

        <div className="max-w-3xl">
          {/* Dynamic rotating role badge + Agent status */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#915eff]/15 border border-[#915eff]/30 backdrop-blur-md shadow-[0_0_20px_rgba(145,94,255,0.25)] min-h-[36px]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00cea8] animate-pulse shadow-[0_0_10px_#00cea8]" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[currentRoleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-[12px] sm:text-[13px] font-semibold tracking-wider text-white uppercase"
                >
                  {roles[currentRoleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Antigravity protocol badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[11px] font-mono text-[#00cea8]">
              <span>ANTIGRAVITY // v2.6</span>
            </div>
          </div>

          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-[#915eff] via-[#c084fc] to-[#00cea8] bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(145,94,255,0.7)]">
              Sriraam
            </span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white/90 max-w-xl`}>
            Engineering high-performance web applications, intelligent IoT systems, and immersive 3D digital experiences.
          </p>

          {/* Interactive CTA Action Buttons */}
          <div className="pointer-events-auto mt-6 flex flex-wrap items-center gap-3.5">
            <a
              href="#projects"
              onMouseEnter={() => playChirp("hover")}
              onClick={() => playChirp("click")}
              className="px-6 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-[#915eff] via-[#804dee] to-[#6d28d9] text-white font-semibold text-[13px] sm:text-[14px] shadow-[0_0_25px_rgba(145,94,255,0.45)] hover:shadow-[0_0_35px_rgba(145,94,255,0.75)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore 15+ Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#about"
              onMouseEnter={() => playChirp("hover")}
              onClick={() => playChirp("click")}
              className="px-6 sm:px-7 py-3 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md text-white font-semibold text-[13px] sm:text-[14px] hover:bg-white/10 hover:border-[#915eff] hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>About Me</span>
              <span>⚡</span>
            </a>

            <a
              href="#contact"
              onMouseEnter={() => playChirp("hover")}
              onClick={() => playChirp("click")}
              className="px-5 sm:px-6 py-3 rounded-xl bg-white/5 border border-white/20 backdrop-blur-md text-secondary hover:text-white font-semibold text-[13px] sm:text-[14px] hover:bg-white/10 hover:border-[#00cea8] hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Let's Talk</span>
              <span>💬</span>
            </a>
          </div>

          {/* Floating Zero-Gravity Telemetry Badges */}
          <div className="pointer-events-auto mt-6 hidden lg:flex flex-wrap gap-2.5">
            {telemetryBadges.map((badge, idx) => (
              <motion.div
                key={idx}
                animate={
                  isZeroGravity
                    ? {
                        y: [-6, 6, -6],
                        x: [-2, 2, -2],
                        rotate: [-1, 1, -1],
                      }
                    : {
                        y: [-3, 3, -3],
                      }
                }
                transition={{
                  duration: 4 + idx * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: badge.delay,
                }}
                className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-medium text-white/80 flex items-center gap-1.5 hover:border-[#915eff]/60 hover:text-white transition-colors"
              >
                <span>{badge.icon}</span>
                <span>{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Computer canvas */}
      <div className="absolute inset-0 top-[150px] sm:top-[120px] w-full h-full">
        <ComputersCanvas />
      </div>

      {/* Scroll indicator with pulse */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 w-full flex justify-center items-center z-10 pointer-events-auto">
        <a 
          href="#about" 
          aria-label="Scroll to About section"
          onMouseEnter={() => playChirp("hover")}
          onClick={() => playChirp("click")}
        >
          <div className="flex h-13 w-7.5 justify-center rounded-3xl border-2 border-white/60 p-2 backdrop-blur-sm bg-black/20 hover:border-[#915eff] transition-colors">
            <motion.div
              animate={{
                y: [0, 18, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-2 w-2 rounded-full bg-[#915eff] shadow-[0_0_10px_#915eff]"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

export default Hero;
