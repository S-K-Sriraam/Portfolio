import React from "react";
import { logo, github } from "../assets";
import { navLinks } from "../constants";
import { playChirp } from "../utils/sound";

const Footer = () => {
  const scrollToTop = () => {
    playChirp("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-black-200 border-t border-white/10 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="logo"
            className="w-12 h-12 object-cover rounded-full border border-white/20 shadow-[0_0_15px_rgba(145,94,255,0.35)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-white font-bold text-[18px] tracking-tight">Sriraam S K</h4>
              <span className="px-2 py-0.5 rounded-full bg-[#915eff]/20 border border-[#915eff]/40 text-[#dfd9ff] text-[10px] font-mono">
                ANTIGRAVITY // PRO
              </span>
            </div>
            <p className="text-secondary text-[13px] mt-0.5">
              Full Stack Engineer & IoT Systems Architect
            </p>
          </div>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onMouseEnter={() => playChirp("hover")}
                onClick={() => playChirp("click")}
                className="text-secondary text-[14px] font-medium hover:text-[#915eff] transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-[12px] font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span>Available for Hire</span>
          </div>

          <a
            href="https://github.com/s-k-sriraam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            onMouseEnter={() => playChirp("hover")}
            onClick={() => playChirp("click")}
            className="w-10 h-10 rounded-full bg-tertiary border border-white/10 flex justify-center items-center hover:border-[#915eff] hover:scale-110 transition-all shadow-md cursor-pointer"
          >
            <img src={github} alt="github" className="w-5 h-5 object-contain" />
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => playChirp("hover")}
            aria-label="Scroll to top"
            className="px-4 py-2 rounded-xl bg-tertiary border border-white/10 text-white text-[13px] font-semibold hover:bg-[#915eff] hover:border-[#915eff] transition-all cursor-pointer shadow-md flex items-center gap-1"
          >
            <span>↑</span>
            <span>Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-16 mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-secondary text-[13px]">
        <p>© {new Date().getFullYear()} Sriraam S K. Formatted with Antigravity Aesthetic & Precision.</p>
        <p className="text-secondary/70">Crafted with React 19, Three.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
};

export default Footer;
