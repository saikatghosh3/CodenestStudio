"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_DATA } from "@/utils/constants";
import {
  Plus,
  Sparkles,
  HelpCircle,
  MessageCircle,
  Search,
  ArrowUpRight,
} from "lucide-react";

const containers = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FAQItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div variants={itemVariants} layout="position">
      <div
        className={`group relative rounded-2xl transition-all duration-300 ${
          isOpen
            ? "bg-card border border-primary shadow-[0_8px_40px_-12px_rgba(2,105,255,0.35)]"
            : "bg-card border border-border hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(2,105,255,0.25)]"
        }`}
      >
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center gap-4 text-left p-5 sm:p-6 rounded-2xl backdrop-blur-sm"
        >
          <div
            className={`shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl text-sm sm:text-base font-extrabold transition-all duration-300 ${
              isOpen
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                : "bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <span
            className={`flex-1 font-semibold sm:text-lg leading-snug transition-colors duration-300 ${
              isOpen ? "text-primary font-bold" : "text-foreground"
            }`}
          >
            {item.question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 135 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border transition-colors duration-300 ${
              isOpen
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                : "border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary"
            }`}
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              className="overflow-hidden"
            >
              <div className="px-6 sm:px-8 pb-6 sm:pb-7 sm:pl-24">
                <div className="border-t border-border/70 pt-4">
                  <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [query, setQuery] = useState("");

  const filtered = FAQ_DATA.filter((item) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i);

  return (
    <section id="faq" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[140px] animate-bg-blob-1 pointer-events-none" />
      <div className="absolute bottom-0 -right-24 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[160px] animate-bg-blob-2 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-16 items-start">
          {/* ---- Left column ---- */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Answers
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
                Have Questions?{" "}
                <span className="text-primary">
                  We&apos;ve Got Answers
                </span>
              </h2>

              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Everything you need to know about our services, pricing, and
                process. Can&apos;t find what you&apos;re looking for? Just ask.
              </p>

              {/* Stats chips */}
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Avg. response under 2h
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Support on all plans
                </div>
              </div>

              {/* Contact card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="relative mt-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-card shadow-sm"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative p-6 sm:p-8">
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          Still have a question?
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Chat with us directly and get a tailored answer within
                          a couple of hours.
                        </p>
                      </div>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-3 mt-6">
                      <a
                        href={`https://wa.me/8801758197272?text=${encodeURIComponent("Hi, I have a question about your services.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 hover:scale-[1.03] transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Us
                      </a>
                      <a
                        href="mailto:codersync9@gmail.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card text-foreground text-sm font-semibold border border-border hover:bg-secondary hover:border-primary/40 transition-all duration-300"
                      >
                        Email Us
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

          {/* ---- Right column: accordion ---- */}
          <motion.div
            variants={containers}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-4"
          >
            {/* Search */}
            <motion.div variants={itemVariants} className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your question..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
              />
            </motion.div>

            {filtered.length > 0 ? (
              filtered.map((item, i) => {
                const realIndex = FAQ_DATA.indexOf(item);
                return (
                  <FAQItem
                    key={realIndex}
                    index={realIndex}
                    item={item}
                    isOpen={openIndex === realIndex}
                    onToggle={() => toggle(realIndex)}
                  />
                );
              })
            ) : (
              <motion.p
                variants={itemVariants}
                className="text-center text-muted-foreground py-12 bg-card border border-border rounded-2xl"
              >
                No questions match &quot;{query}&quot; — try a different search or ask us directly.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}