import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { playChirp } from "../utils/sound";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#151030",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      borderRadius: "24px",
      padding: "26px 30px",
    }}
    contentArrowStyle={{ borderRight: "7px solid #151030" }}
    date={experience.date}
    dateClassName="text-secondary font-semibold text-[14px]"
    iconStyle={{ 
      background: experience.iconBg, 
      boxShadow: "0 0 20px rgba(145, 94, 255, 0.5)",
      border: "2px solid rgba(255, 255, 255, 0.2)"
    }}
    icon={
      <div 
        className="flex justify-center items-center w-full h-full cursor-pointer"
        onMouseEnter={() => playChirp("hover")}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div onMouseEnter={() => playChirp("hover")}>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[#00cea8] uppercase">
          Engineered Discipline
        </span>
      </div>
      <h3 className="text-white text-[22px] sm:text-[24px] font-extrabold tracking-tight mt-1">
        {experience.title}
      </h3>
      <p className="text-[#915eff] text-[15px] font-semibold mt-0.5">
        {experience.company_name}
      </p>
    </div>

    <ul className="mt-5 list-none space-y-2.5">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          onMouseEnter={() => playChirp("hover")}
          className="text-white/80 text-[14px] sm:text-[15px] leading-[24px] tracking-wide flex items-start gap-2.5 transition-colors hover:text-white"
        >
          <span className="text-[#00cea8] text-[14px] mt-0.5 shrink-0">▹</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
);

function Experience() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Proven Capability</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-16 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default SectionWrapper(Experience, "experience");
