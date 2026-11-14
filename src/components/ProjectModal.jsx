import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { github } from "../assets";
import { playChirp } from "../utils/sound";

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        playChirp("close");
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playChirp("close");
              onClose();
            }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 25 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0824] border border-[#915eff]/30 rounded-3xl shadow-[0_0_50px_rgba(145,94,255,0.25)] overflow-hidden flex flex-col z-10"
          >
            {/* Modal Header */}
            <div className="relative p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-[#170e3b] via-[#100a29] to-[#0c0824] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#00cea8] animate-pulse shadow-[0_0_12px_#00cea8]" />
                <div>
                  <span className="text-[11px] font-semibold tracking-widest text-[#915eff] uppercase">
                    System Architecture Deep-Dive
                  </span>
                  <h3 className="text-white font-extrabold text-[22px] sm:text-[26px] tracking-tight mt-0.5">
                    {project.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playChirp("close");
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all hover:scale-105 cursor-pointer text-[16px]"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Media Preview Banner */}
              <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={project.image}
                  alt={project.name}
                  className={`w-full h-full ${project.imageClassName || "object-cover"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0824] via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className={`text-[12px] font-semibold px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 ${tag.color}`}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white font-bold text-[12px] shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
                      >
                        <span>Launch App</span>
                        <span>↗</span>
                      </a>
                    )}
                    {project.source_code_link && (
                      <a
                        href={project.source_code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-black/80 hover:bg-white/10 border border-white/20 text-white transition-all flex items-center gap-2"
                        title="GitHub Repository"
                      >
                        <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
                        <span className="text-[12px] font-semibold hidden sm:inline">Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Engineering Overview */}
              <div>
                <h4 className="text-white font-bold text-[18px] flex items-center gap-2">
                  <span>⚡</span> Technical Architecture & Overview
                </h4>
                <p className="mt-2 text-secondary text-[15px] leading-[28px]">
                  {project.description}
                </p>
              </div>

              {/* Architecture Blueprint Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4.5 rounded-2xl bg-tertiary/60 border border-white/10">
                  <div className="text-[20px] mb-1">🏗️</div>
                  <h5 className="text-white font-bold text-[14px]">Core Domain</h5>
                  <p className="text-secondary text-[13px] mt-1 capitalize">
                    {project.category === "web"
                      ? "Modern Full Stack Web Application"
                      : project.category === "iot"
                      ? "Edge IoT & Telemetry Hardware"
                      : "Data Analytics & ML Intelligence"}
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-tertiary/60 border border-white/10">
                  <div className="text-[20px] mb-1">🛡️</div>
                  <h5 className="text-white font-bold text-[14px]">Performance & Scaling</h5>
                  <p className="text-secondary text-[13px] mt-1">
                    Component modularity, optimized bundle size & reactive real-time state.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-tertiary/60 border border-white/10">
                  <div className="text-[20px] mb-1">🚀</div>
                  <h5 className="text-white font-bold text-[14px]">Deployment & Status</h5>
                  <p className="text-secondary text-[13px] mt-1">
                    Continuous integration with active version control and verified build integrity.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-[#080517] flex items-center justify-between">
              <span className="text-[12px] text-secondary font-mono">
                PRESS ESC OR CLICK OUTSIDE TO CLOSE
              </span>
              <button
                type="button"
                onClick={() => {
                  playChirp("close");
                  onClose();
                }}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-[13px] transition-all cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
