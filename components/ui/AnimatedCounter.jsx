"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedCounter({ from = 0, to = 100, duration = 2000, className = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const diff = to - from;

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.floor(from + diff * progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <div ref={ref} className={className} aria-hidden={false}>
      <motion.span aria-live="polite" className="font-bold tracking-tight">
        {value}
      </motion.span>
      {suffix && <span className="ml-1 text-sm font-medium text-muted-foreground">{suffix}</span>}
    </div>
  );
}
