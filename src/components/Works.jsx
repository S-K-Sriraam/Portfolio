import { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import ProjectModal from './ProjectModal';
import { playChirp } from '../utils/sound';

const getCategoryBadge = (category) => {
  switch (category) {
    case 'web':
      return {
        label: '🌐 Web App',
        className: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      };
    case 'iot':
      return {
        label: '⚡ IoT & Hardware',
        className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    case 'ai':
      return {
        label: '📊 AI & Data Systems',
        className: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      };
    default:
      return {
        label: '🚀 Project',
        className: 'bg-white/10 text-white border-white/20',
      };
  }
};

const ProjectCard = ({
  index,
  name,
  category,
  description,
  tags,
  image,
  imageClassName = "object-cover",
  source_code_link,
  live_link,
  onOpenModal,
  isZeroGravity,
}) => {
  const badge = getCategoryBadge(category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isZeroGravity
          ? {
              opacity: 1,
              scale: 1,
              y: [-4, 4, -4],
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: isZeroGravity ? 3.5 + (index % 3) * 0.5 : 0.35,
        repeat: isZeroGravity ? Infinity : 0,
        ease: "easeInOut",
        delay: (index % 6) * 0.05,
      }}
      className="w-full flex"
    >
      <Tilt
        options={{
          max: 18,
          scale: 1.02,
          speed: 450,
        }}
        className="bg-[#151030] p-5 sm:p-6 rounded-3xl w-full border border-white/10 shadow-2xl transition-all duration-300 hover:border-[#915eff]/60 hover:shadow-[0_15px_35px_rgba(145,94,255,0.2)] flex flex-col justify-between group"
      >
        <div>
          {/* Image Container with Hover Inspect Overlay */}
          <div 
            onClick={() => {
              playChirp("open");
              onOpenModal();
            }}
            onMouseEnter={() => playChirp("hover")}
            className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-[#0d0921] cursor-pointer"
          >
            <img
              src={image}
              alt={name}
              className={`w-full h-full ${imageClassName} transition-transform duration-500 group-hover:scale-108`}
            />

            {/* Quick Inspect Hover Tint */}
            <div className="absolute inset-0 bg-[#09051d]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
              <span className="px-4 py-2 rounded-xl bg-[#915eff] text-white font-bold text-[12px] shadow-[0_0_20px_#915eff] flex items-center gap-1.5">
                <span>🔍 Inspect Architecture</span>
              </span>
            </div>

            {/* Category Tag Top Left */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border backdrop-blur-md shadow-md ${badge.className}`}
              >
                {badge.label}
              </span>
            </div>

            {/* Action Buttons Top Right */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {live_link && (
                <a
                  href={live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Live Webpage"
                  onMouseEnter={() => playChirp("hover")}
                  onClick={() => playChirp("click")}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white font-semibold text-[11px] shadow-lg hover:scale-105 transition-all flex items-center gap-1 backdrop-blur-md cursor-pointer"
                >
                  <span>Live</span>
                  <span>↗</span>
                </a>
              )}

              {source_code_link && (
                <a
                  href={source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Source on GitHub"
                  onMouseEnter={() => playChirp("hover")}
                  onClick={() => playChirp("click")}
                  className="black-gradient w-9 h-9 rounded-full flex justify-center items-center cursor-pointer border border-white/20 shadow-lg hover:border-[#915eff] hover:scale-110 transition-all backdrop-blur-md"
                >
                  <img
                    src={github}
                    alt="github"
                    className="w-4 h-4 object-contain"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Text Information */}
          <div className="mt-5">
            <h3 
              onClick={() => {
                playChirp("open");
                onOpenModal();
              }}
              className="text-white font-bold text-[20px] sm:text-[22px] tracking-tight group-hover:text-[#915eff] transition-colors line-clamp-1 cursor-pointer"
            >
              {name}
            </h3>
            <p className="mt-2.5 text-secondary text-[14px] leading-[24px] line-clamp-3">
              {description}
            </p>
          </div>
        </div>

        {/* Tags & Architecture Link */}
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.name}
                className={`text-[12px] font-medium px-2.5 py-1 rounded-lg bg-black-200/80 border border-white/5 ${tag.color}`}
              >
                #{tag.name}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              playChirp("open");
              onOpenModal();
            }}
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#915eff]/20 border border-white/10 hover:border-[#915eff]/50 text-secondary hover:text-white text-[12px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Architecture Breakdown</span>
            <span>⚡</span>
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = ({ isZeroGravity }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const tabs = [
    { id: 'all', label: 'All Projects', icon: '🚀', count: projects.length },
    {
      id: 'web',
      label: 'Web Apps',
      icon: '🌐',
      count: projects.filter((p) => p.category === 'web').length,
    },
    {
      id: 'iot',
      label: 'IoT & Hardware',
      icon: '⚡',
      count: projects.filter((p) => p.category === 'iot').length,
    },
    {
      id: 'ai',
      label: 'AI & Data Systems',
      icon: '📊',
      count: projects.filter((p) => p.category === 'ai').length,
    },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = activeTab === 'all' || p.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesName = p.name.toLowerCase().includes(query);
    const matchesDesc = p.description.toLowerCase().includes(query);
    const matchesTags = p.tags.some((t) => t.name.toLowerCase().includes(query));

    return matchesCategory && (matchesName || matchesDesc || matchesTags);
  });

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Engineered Portfolios</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-secondary text-[17px] sm:text-[18px] max-w-3xl leading-[32px]"
        >
          A comprehensive showcase of{' '}
          <span className="text-white font-semibold">{projects.length} real-world systems</span>{' '}
          engineered across{' '}
          <span className="text-white font-semibold">Full Stack Web Development</span>,{' '}
          <span className="text-[#00cea8] font-medium">IoT & Embedded Hardware</span>, and{' '}
          <span className="text-[#915eff] font-medium">AI & Data Intelligence</span>. Click any project card to inspect its system architecture blueprint.
        </motion.p>
      </div>

      {/* Interactive Category Filter Tabs & Live Search */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2.5 items-center">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onMouseEnter={() => playChirp("hover")}
                onClick={() => {
                  playChirp("click");
                  setActiveTab(tab.id);
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-[13px] sm:text-[14px] transition-all duration-300 flex items-center gap-2 cursor-pointer border relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#915eff] to-[#804dee] text-white border-[#915eff] shadow-[0_0_20px_rgba(145,94,255,0.4)] scale-105'
                    : 'bg-tertiary/70 text-secondary border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-secondary/80'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full md:w-[320px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech, tag, or title..."
            className="w-full bg-tertiary/80 border border-white/10 focus:border-[#915eff] text-white text-[13px] sm:text-[14px] rounded-xl pl-10 pr-9 py-2.5 outline-none transition-all placeholder:text-secondary/60 shadow-inner"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary text-[14px]">
            🔍
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                playChirp("click");
                setSearchQuery('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white text-[12px] bg-white/10 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`project-${project.name}`}
                index={index}
                {...project}
                isZeroGravity={isZeroGravity}
                onOpenModal={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-16 p-12 rounded-3xl bg-tertiary/30 border border-white/10 text-center flex flex-col items-center justify-center">
          <div className="text-[36px] mb-3">🔍</div>
          <h4 className="text-white font-bold text-[20px]">No matching projects found</h4>
          <p className="text-secondary text-[14px] mt-1 max-w-md">
            No projects matched "{searchQuery}" under the selected category.
          </p>
          <button
            type="button"
            onClick={() => {
              playChirp("click");
              setSearchQuery('');
              setActiveTab('all');
            }}
            className="mt-5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#915eff] to-[#804dee] text-white font-semibold text-[13px] shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

      {/* Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default SectionWrapper(Works, 'projects');
