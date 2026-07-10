"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, ShieldCheck, Star, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Animated Glowing Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-hero-blob-1" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-hero-blob-2" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-[3rem] border border-border bg-card/30 p-6 sm:p-12 lg:p-20 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {/* Internal ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <div className="lg:col-span-7 text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full bg-blue-400 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Zap className="h-4 w-4 text-primary fill-primary" />
                <span>Start Your Project</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                Ready to build something <br />
                <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient-x">
                  extraordinary?
                </span>
              </h2>

              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-xl font-light">
                Partner with us to transform your vision into a high-performance, Awwwards-winning digital reality that drives growth.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  { icon: ShieldCheck, text: "Enterprise-grade Security & Performance" },
                  { icon: Star, text: "Award-winning UI/UX Design" },
                  { icon: Zap, text: "Dedicated Post-launch Support" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-center gap-4 text-muted-foreground font-medium"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 w-full lg:pl-10">
              <div className="p-5 sm:p-8 rounded-2xl lg:rounded-[2rem] border border-border bg-card/40 backdrop-blur-xl shadow-2xl space-y-6 sm:space-y-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="text-center space-y-2 relative z-10">
                  <h3 className="text-2xl font-bold text-foreground">Let's Discuss</h3>
                  <p className="text-muted-foreground text-sm">Schedule a free consultation or chat with us instantly.</p>
                </div>

                <div className="space-y-4 relative z-10">
                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] hover-target"
                  >
                    <Calendar className="h-5 w-5" />
                    Book a Meeting
                  </a>

                  <a
                    href={`https://wa.me/8801758197272?text=${encodeURIComponent("Hello, I would like to discuss an enterprise web project.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-3 bg-card text-foreground border border-border hover:bg-secondary hover:scale-[1.02] hover-target"
                  >
                    Chat on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="border-t border-border pt-6 text-center relative z-10">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                    Typically responds within 2 hours
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
