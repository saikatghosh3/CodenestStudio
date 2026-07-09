"use client";

import { motion } from "framer-motion";
import { Heart, BookOpen, Coffee, ShoppingCart, Home, Airplay, Wrench, Users } from "lucide-react";

const INDUSTRIES = [
  { title: "Healthcare", icon: Heart },
  { title: "Education", icon: BookOpen },
  { title: "Restaurant", icon: Coffee },
  { title: "E-Commerce", icon: ShoppingCart },
  { title: "Real Estate", icon: Home },
  { title: "Travel & Booking", icon: Airplay },
  { title: "ERP Systems", icon: Wrench },
  { title: "POS Systems", icon: Users },
];

export default function Industries() {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-4 py-2 rounded-full mb-4">Industries We Serve</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Industry Expertise</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-3">We deliver tailored solutions across a wide range of industries.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((it, idx) => {
            const Icon = it.icon;
            return (
              <motion.div key={it.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="group rounded-xl sm:rounded-2xl border border-border bg-card p-4 sm:p-6 hover:bg-card/80 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-card border border-border flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold text-foreground">{it.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Custom solutions and integrations for {it.title}.</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
