import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    contentStyle={{
      background: "#151030",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6)",
      borderRadius: "20px",
      padding: "24px 28px",
    }}
    contentArrowStyle={{ borderRight: "7px solid #151030" }}
    date={experience.date}
    dateClassName="text-secondary font-medium text-[14px]"
    iconStyle={{ background: experience.iconBg, boxShadow: "0 0 15px rgba(145, 94, 255, 0.4)" }}
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={experience.icon}
          alt={experience.company_name}
          className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[22px] sm:text-[24px] font-bold tracking-tight">
        {experience.title}
      </h3>
      <p className="text-[#915eff] text-[15px] font-semibold mt-1">
        {experience.company_name}
      </p>
    </div>

    <ul className="mt-5 list-none space-y-2.5">
      {experience.points.map((point, index) => (
        <li
          key={`experience-point-${index}`}
          className="text-white/80 text-[14px] sm:text-[15px] leading-[24px] tracking-wide flex items-start gap-2.5"
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
        <p className={styles.sectionSubText}>My Journey</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "experience");
