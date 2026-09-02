"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import {
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNextdotjs,
  SiReact,
  SiJavascript,
} from "react-icons/si";

const iconClass = "w-full h-full";

function TechIcon({ icon: Icon, className = "" }) {
  return <Icon className={`${iconClass} ${className}`} />;
}

export default function TechStack() {
  const containerRef = useRef(null);

  const r1c1 = useRef(null);
  const r1c2 = useRef(null);
  const r2c1 = useRef(null);
  const r2c3 = useRef(null);
  const r3c1 = useRef(null);
  const r3c2 = useRef(null);
  const center = useRef(null);

  return (
    <section id="stack" className="py-20 lg:py-28 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-4">
            Technology Stack
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Tools & Technologies
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-3">
            A modern stack chosen for performance, scalability, and developer happiness.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-[550px] overflow-hidden rounded-2xl border border-border bg-muted/30 backdrop-blur-sm p-6 sm:p-10 shadow-xl transition-colors duration-300"
          >
            <div className="flex w-full flex-col items-stretch justify-between gap-8 sm:gap-10">
              <div className="flex flex-row items-center justify-between">
                <Circle ref={r1c1} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiTypescript} className="text-[#3178C6] w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
                <Circle ref={r1c2} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiTailwindcss} className="text-[#38BDF8] w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
              </div>

              <div className="flex flex-row items-center justify-between">
                <Circle ref={r2c1} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiFramer} className="text-[#05F] w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
                <Circle ref={center} className="h-20 w-24 sm:h-24 sm:w-32 border-primary/40 shadow-primary/20">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[9px] sm:text-[11px] font-bold text-primary tracking-tight leading-none text-center">codenest<br/>studio</span>
                  </div>
                </Circle>
                <Circle ref={r2c3} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiJavascript} className="text-[#F7DF1E] w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
              </div>

              <div className="flex flex-row items-center justify-between">
                <Circle ref={r3c1} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiNextdotjs} className="text-foreground w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
                <Circle ref={r3c2} className="h-10 w-10 sm:h-12 sm:w-12">
                  <TechIcon icon={SiReact} className="text-[#61DAFB] w-5 h-5 sm:w-6 sm:h-6" />
                </Circle>
              </div>
            </div>

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r1c1}
              toRef={center}
              curvature={-80}
              endYOffset={-10}
              dotted
              duration={12}
              gradientStartColor="#3178C6"
              gradientStopColor="#ffba00"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r1c2}
              toRef={center}
              curvature={-80}
              endYOffset={-10}
              reverse
              dotted
              duration={14}
              gradientStartColor="#38BDF8"
              gradientStopColor="#06B6D4"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r2c1}
              toRef={center}
              dotted
              duration={10}
              gradientStartColor="#05F"
              gradientStopColor="#BB4BFF"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r2c3}
              toRef={center}
              reverse
              dotted
              duration={11}
              gradientStartColor="#F7DF1E"
              gradientStopColor="#f0db4f"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r3c1}
              toRef={center}
              curvature={80}
              endYOffset={10}
              dotted
              duration={13}
              gradientStartColor="#666"
              gradientStopColor="#fff"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={r3c2}
              toRef={center}
              curvature={80}
              endYOffset={10}
              reverse
              dotted
              duration={15}
              gradientStartColor="#61DAFB"
              gradientStopColor="#20232A"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
