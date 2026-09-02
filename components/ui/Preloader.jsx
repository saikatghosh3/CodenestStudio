"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Code2 } from "lucide-react";

export default function Preloader() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const prevPath = useRef(pathname);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2200);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    setShow(true);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 900);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [pathname]);

  const name = "CodeNestStudio";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[120px] dark:bg-blue-900/30" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-900/25" />
          </div>

          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            <motion.div
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-accent flex items-center justify-center shadow-2xl shadow-primary/30 mb-6"
            >
              <Code2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </motion.div>

            <div className="flex items-baseline overflow-hidden">
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
                    char === "S"
                      ? "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                      : "text-foreground"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="mt-5 h-1 w-44 sm:w-56 rounded-full bg-primary/15 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
                className="h-full w-full rounded-full bg-gradient-to-r from-primary to-accent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.3em]"
            >
              Crafting Premium Web Experiences
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}