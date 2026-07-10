"use client";

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import { Globe, Palette, Smartphone, Cloud, Sparkles, Zap, Code2, Database, Layout, Server } from "lucide-react";
import { useRef, MouseEvent } from "react";
import { SERVICES } from "@/utils/constants";

const ICON_MAP = { Globe, Palette, Smartphone, Cloud };

function SkillCard({ service, index }) {
  const Icon = ICON_MAP[service.icon] || Code2;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef(null);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;
      mouseX.set((x / width) * 2 - 1);
      mouseY.set((y / height) * 2 - 1);
      rafRef.current = null;
    });
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full rounded-2xl lg:rounded-[2rem] border border-border bg-card p-6 lg:p-8 hover:bg-card/80 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 h-12 w-12 lg:h-16 lg:w-16 rounded-xl lg:rounded-2xl bg-card border border-border flex items-center justify-center mb-4 lg:mb-6 text-muted-foreground group-hover:text-primary group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
        <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
      </div>

      <h3 style={{ transform: "translateZ(40px)" }} className="text-lg lg:text-xl font-bold text-foreground mb-3 lg:mb-4 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      
      <p style={{ transform: "translateZ(30px)" }} className="text-muted-foreground leading-relaxed text-sm">
        {service.description}
      </p>

      
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={containerRef} id="about" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Our Expertise</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-3xl"
          >
            Engineering <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Digital Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            We don't just write code. We architect scalable, high-performance web applications that drive real business growth and leave lasting impressions.
          </motion.p>
        </div>

        {/* Timeline / Process Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            {[
              { year: "Strategy", title: "Discovery & Planning", desc: "We analyze your business goals to formulate a precise technical roadmap." },
              { year: "Design", title: "UI/UX & Prototyping", desc: "Crafting pixel-perfect, Awwwards-level interfaces that maximize conversion." },
              { year: "Code", title: "Full-stack Engineering", desc: "Building robust, secure, and blazing-fast applications using modern stacks." },
              { year: "Launch", title: "Deployment & Scaling", desc: "Seamless launch with enterprise-grade infrastructure and continuous support." },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-border" />
                <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
                
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 group">
                  <div className="hidden md:block w-32 shrink-0 pt-1 text-right">
                    <span className="text-sm font-bold text-primary uppercase tracking-widest">{step.year}</span>
                  </div>
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-colors z-10" />
                    {idx !== 3 && <div className="w-px h-full bg-border group-hover:bg-primary/50 transition-colors my-2 min-h-[60px]" />}
                  </div>
                  <div className="flex-1 pb-8 md:pb-0">
                    <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

            <motion.div
              style={{ y }}
              className="relative rounded-2xl lg:rounded-[2.5rem] border border-border bg-card p-4 sm:p-6 lg:p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
              <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="rounded-2xl lg:rounded-3xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">99<span className="text-primary">%</span></div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Client Retention</div>
                  </div>
                  <div className="rounded-2xl lg:rounded-3xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">100<span className="text-primary">%</span></div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">In-house Code</div>
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8">
                  <div className="rounded-2xl lg:rounded-3xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">24<span className="text-primary">/7</span></div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Support SLA</div>
                  </div>
                  <div className="rounded-2xl lg:rounded-3xl border border-border bg-card p-4 sm:p-5 lg:p-6 backdrop-blur-md">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1 sm:mb-2">&lt;2<span className="text-primary">s</span></div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">Load Times</div>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>

        {/* 3D Skill Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
          {SERVICES.map((service, idx) => (
            <SkillCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
