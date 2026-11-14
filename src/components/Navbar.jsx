import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { playChirp } from "../utils/sound";

function Navbar({ isZeroGravity, onToggleGravity }) {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);

      // Detect active section
      const sections = ["contact", "projects", "experience", "about"];
      let currentSection = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentSection = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            break;
          }
        }
      }
      if (currentSection) {
        setActive(currentSection);
      } else if (scrollTop < 200) {
        setActive("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center fixed top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => {
            playChirp("click");
            setActive("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={() => playChirp("hover")}
        >
          <div className="relative">
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-full border border-white/20 shadow-[0_0_15px_rgba(145,94,255,0.35)] transition-all duration-300 hover:rotate-6 hover:scale-110 hover:border-[#915eff]"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00cea8] border-2 border-primary" />
          </div>

          <div className="flex flex-col">
            <p className="text-white text-[16px] sm:text-[18px] font-bold cursor-pointer flex items-center tracking-tight transition-colors duration-300 hover:text-[#915eff]">
              Sriraam S K
            </p>
            <span className="text-secondary font-mono text-[11px] -mt-0.5 tracking-wider text-[#00cea8]/80 hidden sm:inline">
              SYS_ENGINEER // FULL_STACK
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="list-none flex flex-row gap-7 items-center">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-white font-semibold" : "text-secondary font-medium"
                } relative text-[15px] cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
                  active === link.title ? "after:w-full after:bg-[#915eff]" : "after:w-0 after:bg-white hover:after:w-full"
                }`}
                onMouseEnter={() => playChirp("hover")}
                onClick={() => {
                  playChirp("click");
                  setActive(link.title);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>

          {/* Quick CTA */}
          <a
            href="#contact"
            onMouseEnter={() => playChirp("hover")}
            onClick={() => playChirp("click")}
            className="px-4.5 py-2 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[13px] shadow-[0_0_15px_rgba(145,94,255,0.35)] hover:shadow-[0_0_25px_rgba(145,94,255,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-1.5"
          >
            <span>Let's Talk</span>
            <span className="text-[11px]">↗</span>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => {
              playChirp("click");
              setToggle(!toggle);
            }}
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-6 h-6 object-contain cursor-pointer transition-transform duration-300"
            />
          </button>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient border border-white/10 shadow-2xl absolute top-16 right-0 mx-4 my-2 min-w-[200px] z-30 rounded-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 w-full">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-[#915eff] font-semibold" : "text-secondary font-medium"
                  } font-poppins cursor-pointer text-[15px] transition-all duration-300 hover:translate-x-1.5 hover:text-white w-full py-1`}
                  onClick={() => {
                    playChirp("click");
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`} className="block w-full">
                    {link.title}
                  </a>
                </li>
              ))}
              <li className="w-full pt-2 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={() => {
                    playChirp("click");
                    setToggle(false);
                  }}
                  className="block text-center w-full py-2.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[13px]"
                >
                  Get In Touch 💬
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
