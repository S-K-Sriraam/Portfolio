import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      
      setScrollPercentage(scrollPercent);
      setVisible(scrollTop > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-tertiary/90 backdrop-blur-md border border-[#915eff]/40 shadow-[0_0_20px_rgba(145,94,255,0.4)] text-white hover:border-[#915eff] hover:shadow-[0_0_30px_rgba(145,94,255,0.7)] transition-all cursor-pointer group flex items-center justify-center"
        >
          {/* Circular progress svg background */}
          <svg className="w-10 h-10 -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              className="text-white/10 stroke-current"
              strokeWidth="2.5"
              fill="transparent"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              className="text-[#915eff] stroke-current transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray={100}
              strokeDashoffset={100 - scrollPercentage}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Icon in center */}
          <span className="absolute text-[13px] font-bold text-white group-hover:text-[#00cea8] transition-colors">
            ?
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
