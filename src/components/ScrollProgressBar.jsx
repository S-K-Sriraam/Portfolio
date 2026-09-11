import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00cea8] via-[#915eff] to-[#ff3b94] origin-left z-50 shadow-[0_0_10px_rgba(145,94,255,0.7)]"
    />
  );
};

export default ScrollProgressBar;
