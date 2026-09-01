"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play, Code2, Layers, Cpu, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import Earth from "@/components/ui/globe";
import BookMeetingModal from "@/components/ui/BookMeetingModal";

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 50;
    let timeout;

    if (!isDeleting && index === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
      timeout = setTimeout(() => {}, 500);
    } else {
      timeout = setTimeout(() => {
        setIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, typeSpeed);
    }

    setDisplayedText(text.slice(0, index));
    return () => clearTimeout(timeout);
  }, [index, isDeleting, text]);

  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 whitespace-pre-wrap">
        {displayedText}
        <span className="animate-pulse ml-0.5 inline-block w-[0.5ch] h-[1em] bg-primary align-text-bottom" />
      </span>
    </span>
  );
};

const LOGOS = [
  { icon: <Code2 className="w-5 h-5" />, name: "React" },
  { icon: <Globe className="w-5 h-5" />, name: "Next.js" },
  { icon: <Layers className="w-5 h-5" />, name: "Tailwind" },
  { icon: <Cpu className="w-5 h-5" />, name: "Framer" },
  { icon: <Code2 className="w-5 h-5" />, name: "Node.js" },
  { icon: <Globe className="w-5 h-5" />, name: "Vercel" },
];

export default function Hero() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background transition-colors duration-500"
    >
      <div className="absolute inset-0 z-0 contain-layout">
        <div className="absolute top-[20%] left-[20%] h-[40vw] w-[40vw] rounded-full bg-primary/20 blur-[100px] animate-hero-blob-1" />
        <div className="absolute bottom-[10%] right-[10%] h-[35vw] w-[35vw] rounded-full bg-blue-600/20 blur-[100px] animate-hero-blob-2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 rounded-full border border-border bg-muted px-5 py-2 text-sm font-medium text-foreground backdrop-blur-xl transition-colors duration-300"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </div>
              <Sparkles className="h-4 w-4 text-primary" />
              Award-Winning Enterprise Agency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05] text-foreground transition-colors duration-300"
            >
              We Build Premium <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 dark:via-blue-400 dark:to-purple-500 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-light transition-colors duration-300"
            >
              <TypewriterText text="Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering designed for maximum conversion." />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMeetingOpen(true)}
                className="group relative inline-flex items-center justify-center gap-3 bg-foreground text-background px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold overflow-hidden hover-target transition-colors duration-300 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Meeting
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-foreground/80 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-foreground border border-border hover:bg-muted transition-colors hover-target duration-300"
              >
                <Play className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" fill="currentColor" />
                View Showreel
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-8 sm:pt-12 border-t border-border grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl transition-colors duration-300"
            >
              <div>
                <p className="text-xl sm:text-3xl font-bold text-foreground mb-1 transition-colors duration-300">
                  10<span className="text-primary">+</span>
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider transition-colors duration-300">
                  Years Exp.
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-foreground mb-1 transition-colors duration-300">
                  200<span className="text-primary">+</span>
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider transition-colors duration-300">
                  Projects
                </p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-bold text-foreground mb-1 transition-colors duration-300">
                  99<span className="text-primary">%</span>
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider transition-colors duration-300">
                  Satisfaction
                </p>
              </div>
            </motion.div>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <Earth />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-muted border-y border-border py-4 z-10 backdrop-blur-md transition-colors duration-300">
        <div className="flex items-center whitespace-nowrap gap-16 pr-16 w-fit animate-marquee">
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <div key={idx} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-default">
              {logo.icon}
              <span className="text-lg font-semibold tracking-wider">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>

      <BookMeetingModal isOpen={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}
