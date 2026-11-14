import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export const CountUp = ({ to, duration = 1.8, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    // Parse numerical value from string or number (e.g. "15+" -> 15, "100%" -> 100)
    const numericTarget = typeof to === "number" ? to : parseInt(to.toString().replace(/[^0-9]/g, ""), 10) || 0;
    if (numericTarget === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * numericTarget);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(numericTarget);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, to, duration]);

  // Determine suffixes/prefixes if not provided explicitly
  const displaySuffix = suffix || (typeof to === "string" && to.includes("+") ? "+" : typeof to === "string" && to.includes("%") ? "%" : "");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count}{displaySuffix}
    </span>
  );
};

export default CountUp;
