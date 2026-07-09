"use client";

import { motion } from "framer-motion";

const STEPS = [
  "Requirement Discussion",
  "Research & Planning",
  "UI/UX Design",
  "Development",
  "Testing & Quality Assurance",
  "Launch & Long-Term Support",
];

export default function DevelopmentProcess() {
  return (
    <section id="process" className="py-20 lg:py-28 relative bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 dark:bg-primary/5 px-4 py-2 rounded-full mb-4">
            Development Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Our Process (Step-by-step)
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-base sm:text-lg">
            A clear, collaborative process that reduces risk and accelerates delivery.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Desktop Horizontal Connecting Line */}
          <div className="hidden lg:block absolute left-0 right-0 top-6 h-px bg-border/60 z-0" />

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-4 relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Mobile/Tablet Vertical Connecting Line (Hidden on the last item) */}
                {idx !== STEPS.length - 1 && (
                  <div className="lg:hidden absolute left-6 top-12 bottom-[-2rem] w-px bg-border/60 z-0" />
                )}

                <div className="flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-6 text-left lg:text-center">
                  
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border border-border flex items-center justify-center text-primary font-bold text-sm sm:text-base shadow-sm transition-all duration-300 group-hover:border-primary/50 relative z-10">
                    {idx + 1}
                  </div>

                  {/* Text Content Block */}
                  <div className="space-y-1 pt-1 lg:pt-0">
                    <h4 className="text-sm sm:text-lg font-semibold text-foreground tracking-tight">
                      {step}
                    </h4>
                    <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                      {getStepDesc(idx)}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getStepDesc(idx) {
  const descs = [
    "Align on goals, scope, and success metrics.",
    "Market research and technical feasibility.",
    "Wireframes, prototypes, and visual design.",
    "Iterative engineering with tests and reviews.",
    "Comprehensive testing, QA and performance tuning.",
    "Launch, monitor, and provide long-term support.",
  ];
  return descs[idx] || "";
}