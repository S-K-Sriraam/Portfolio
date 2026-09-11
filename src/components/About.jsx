import React from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt
      options={{
        max: 35,
        scale: 1.02,
        speed: 450,
      }}
      className="w-[260px] xs:w-[240px] sm:w-[210px] md:w-[215px] lg:w-[190px] xl:w-[215px] flex"
    >
      <motion.div 
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-px rounded-[24px] shadow-card flex flex-col"
      >
        <div
          className="bg-tertiary rounded-[24px] py-6 px-4 min-h-[280px] w-full flex-1 flex justify-evenly items-center flex-col text-center"
        >
          <img
            src={icon}
            alt={title}
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[18px] sm:text-[19px] font-bold text-center leading-snug px-1">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

function About() {
  const stats = [
    { value: "15+", label: "Engineered Projects", icon: "🚀" },
    { value: "15", label: "Core Technologies", icon: "⚡" },
    { value: "6+", label: "IoT & Hardware Systems", icon: "🤖" },
    { value: "100%", label: "Production Mindset", icon: "✨" },
  ];

  const highlights = [
    { icon: "⚡", label: "Full Stack Web Apps", desc: "React, Node.js, Next.js & REST APIs" },
    { icon: "🌐", label: "3D & Interactive UI", desc: "Three.js, WebGL & Framer Motion" },
    { icon: "🤖", label: "IoT & Embedded", desc: "Raspberry Pi, ESP32 & Microcontrollers" },
    { icon: "📊", label: "Data & Systems", desc: "MongoDB, SQL & Scalable Architecture" },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.div 
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-5xl"
      >
        <p className="text-secondary text-[17px] sm:text-[18px] leading-[32px]">
          I am a versatile <span className="text-white font-semibold">Full Stack Developer</span> and <span className="text-white font-semibold">Systems Builder</span> specialized in engineering robust, end-to-end applications with responsive frontends and resilient backends.
        </p>
        <p className="mt-3 text-secondary text-[16px] sm:text-[17px] leading-[30px]">
          Beyond classic web development, I bridge software with physical computing through <span className="text-[#00cea8] font-medium">IoT & embedded systems (ESP32, Raspberry Pi)</span> and craft immersive <span className="text-[#915eff] font-medium">3D web visuals</span>. Driven by clean architecture and rapid problem solving, I build production-ready solutions that solve real-world problems.
        </p>

        {/* Stats Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-tertiary/40 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5 backdrop-blur-sm hover:border-[#00cea8]/50 hover:bg-[#00cea8]/5 transition-all duration-300"
            >
              <span className="text-[26px]">{stat.icon}</span>
              <div>
                <h4 className="text-white font-black text-[22px] sm:text-[24px] leading-none bg-gradient-to-r from-white to-secondary bg-clip-text">
                  {stat.value}
                </h4>
                <p className="text-secondary text-[12px] font-medium mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Feature Badges */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <div 
              key={i}
              className="bg-tertiary/60 border border-white/10 rounded-2xl p-4.5 backdrop-blur-md hover:border-[#915eff]/50 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="text-[24px] mb-1.5">{h.icon}</div>
                <h4 className="text-white font-bold text-[15px] group-hover:text-[#915eff] transition-colors">
                  {h.label}
                </h4>
              </div>
              <p className="text-secondary text-[12px] mt-2">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Services Cards */}
      <div className="mt-14 flex flex-wrap justify-center items-stretch gap-6 sm:gap-5 lg:gap-4 xl:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(About, "about");
