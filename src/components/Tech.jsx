import { useState, Suspense } from "react";
import { View } from "@react-three/drei";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { Ball } from "./canvas";
import { playChirp } from "../utils/sound";

const techCategories = {
  "HTML 5": "frontend",
  "CSS 3": "frontend",
  "JavaScript": "frontend",
  "TypeScript": "frontend",
  "React JS": "frontend",
  "Redux Toolkit": "frontend",
  "Tailwind CSS": "frontend",
  "Three JS": "frontend",
  "Node JS": "backend",
  "MongoDB": "backend",
  "Raspberry Pi": "iot",
  "ESP32": "iot",
  "git": "tools",
  "figma": "tools",
  "docker": "tools",
};

const techProficiency = {
  "React JS": 95,
  "JavaScript": 92,
  "Node JS": 90,
  "TypeScript": 85,
  "Tailwind CSS": 95,
  "Three JS": 82,
  "ESP32": 88,
  "Raspberry Pi": 85,
  "MongoDB": 86,
  "Redux Toolkit": 88,
  "git": 90,
  "HTML 5": 98,
  "CSS 3": 95,
  "docker": 78,
  "figma": 80,
};

function Tech({ isZeroGravity }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTech, setSelectedTech] = useState(null);

  const filterTabs = [
    { id: "all", label: "All Skills", icon: "⚡" },
    { id: "frontend", label: "Frontend & UI", icon: "🌐" },
    { id: "backend", label: "Backend & DB", icon: "🗄️" },
    { id: "iot", label: "IoT & Hardware", icon: "🤖" },
    { id: "tools", label: "DevOps & Tools", icon: "🛠️" },
  ];

  return (
    <>
      <motion.div variants={textVariant()} className="mb-12 text-center">
        <p className={styles.sectionSubText}>Interactive Neural Matrix</p>
        <h2 className={styles.sectionHeadText}>Technologies.</h2>
        
        {/* Interactive Filter Pills */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-2.5 max-w-3xl mx-auto">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => playChirp("hover")}
                onClick={() => {
                  playChirp("click");
                  setActiveCategory(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                  isActive
                    ? "bg-gradient-to-r from-[#915eff] to-[#804dee] text-white border-[#915eff] shadow-[0_0_15px_rgba(145,94,255,0.4)] scale-105"
                    : "bg-tertiary/60 text-secondary border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#915eff]/10 border border-[#915eff]/30 text-[#dfd9ff] text-[12px] sm:text-[13px] font-medium backdrop-blur-sm">
          <span>✨</span>
          <span>Click & drag any 3D sphere to rotate in real-time space</span>
        </div>
      </motion.div>

      {/* 3D Ball Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-8 sm:gap-10">
        {technologies.map((technology, idx) => {
          const cat = techCategories[technology.name] || "other";
          const isMatch = activeCategory === "all" || activeCategory === cat;
          const proficiency = techProficiency[technology.name] || 85;

          return (
            <motion.div
              key={technology.name}
              animate={
                isZeroGravity
                  ? {
                      y: [-6, 6, -6],
                      rotate: [-1, 1, -1],
                    }
                  : {}
              }
              transition={{
                duration: 3 + (idx % 4) * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => playChirp("hover")}
              onClick={() => {
                playChirp("click");
                setSelectedTech(technology.name === selectedTech ? null : technology.name);
              }}
              className={`w-28 h-40 flex flex-col items-center justify-center group relative cursor-grab active:cursor-grabbing transition-all duration-300 ${
                isMatch
                  ? "opacity-100 scale-100"
                  : "opacity-25 scale-90 grayscale hover:grayscale-0 hover:opacity-75"
              }`}
            >
              <View className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <Suspense fallback={null}>
                  <Ball icon={technology.icon} />
                </Suspense>
              </View>

              <span
                className={`mt-2 px-2.5 py-0.5 rounded-full border text-[12px] font-medium tracking-wide text-center transition-all duration-300 shadow-sm ${
                  isMatch
                    ? "bg-tertiary/90 border-white/15 text-white group-hover:border-[#915eff] group-hover:bg-[#915eff]/20"
                    : "bg-tertiary/40 border-white/5 text-secondary/60"
                }`}
              >
                {technology.name}
              </span>

              {/* Dynamic Proficiency Bar */}
              <div className="w-16 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-full transition-all duration-500"
                  style={{ width: `${proficiency}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}

export default SectionWrapper(Tech, "");
