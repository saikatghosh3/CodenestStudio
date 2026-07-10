"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_REVIEWS = [
  { name: "Alice Johnson", company: "FinCorp", rating: 5, text: "Exceptional work, delivered ahead of schedule." },
  { name: "Mark Lee", company: "Shoply", rating: 5, text: "Our conversions increased significantly after the redesign." },
  { name: "Sara Gomez", company: "HealthPlus", rating: 5, text: "Professional team and great long-term support." },
];

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-violet-600",
];

export default function ClientReviews({ initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews.length > 0 ? initialReviews : FALLBACK_REVIEWS);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setReviews(data);
        }
      } catch {
        // use fallback
      }
    }
    loadReviews();
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, reviews.length]);

  const review = reviews[index];
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const variants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-5 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Client Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Clients Say
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-lg leading-relaxed">
            Real feedback from real clients. Their success stories drive us to deliver exceptional results every time.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="relative bg-card border border-border/60 rounded-2xl p-8 sm:p-10 shadow-lg shadow-black/5">
                  <div className="absolute -top-4 left-8 text-6xl text-primary/10 leading-none select-none">
                    &ldquo;
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 mb-6">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg shrink-0 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                      {review.name.split(" ")[0][0]}
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2 mt-0.5">
                        {review.company}
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span className="text-primary/70 font-medium">Verified Client</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed relative z-10 pl-0 sm:pl-2">
                    {review.text}
                  </p>

                  <div className="flex items-center gap-1.5 mt-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i, duration: 0.2 }}
                        className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-muted-foreground/20"}`}
                      >
                        ★
                      </motion.span>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {review.rating}.0
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              className="group w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center text-muted-foreground"
              aria-label="Previous review"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="group w-11 h-11 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 flex items-center justify-center text-muted-foreground"
              aria-label="Next review"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
