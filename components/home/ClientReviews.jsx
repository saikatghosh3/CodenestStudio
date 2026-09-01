"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  BadgeCheck,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const FALLBACK_REVIEWS = [
  {
    name: "Alice Johnson",
    company: "Founder, FinCorp",
    rating: 5,
    text: "Exceptional work, delivered ahead of schedule. The team understood our vision instantly and built a platform that exceeded every expectation.",
  },
  {
    name: "Mark Lee",
    company: "CEO, Shoply",
    rating: 5,
    text: "Our conversions increased significantly after the redesign. Clean code, stunning design, and a process that was completely transparent from day one.",
  },
  {
    name: "Sara Gomez",
    company: "Product Lead, HealthPlus",
    rating: 5,
    text: "A truly professional team with excellent long-term support. They treat our product like their own and always go the extra mile.",
  },
];

const PORTRAITS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/85.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/11.jpg",
];

const AVATAR_COLORS = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-amber-500 to-orange-600",
];

function ClientAvatar({ name, index }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("");
    return (
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center text-white text-lg font-bold ring-2 ring-border/60 shadow-lg`}
        aria-hidden="true"
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={PORTRAITS[index % PORTRAITS.length]}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-2 ring-primary/20 shadow-xl bg-secondary"
    />
  );
}

function StarRow({ rating }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/25"}`}
        />
      ))}
    </div>
  );
}

export default function ClientReviews({ initialReviews = [] }) {
  const [reviews, setReviews] = useState(
    initialReviews.length > 0 ? initialReviews : FALLBACK_REVIEWS
  );
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

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
    if (reviews.length <= 1 || paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, reviews.length, paused]);

  if (reviews.length === 0) return null;

  const review = reviews[index];

  const variants = {
    enter: (d) => ({ x: d > 0 ? 320 : -320, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d) => ({ x: d > 0 ? -320 : 320, opacity: 0, scale: 0.98 }),
  };

  return (
    <section id="reviews" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <Quote className="absolute top-28 left-8 lg:left-24 h-36 w-36 text-primary/5 -rotate-12 pointer-events-none select-none" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest border border-primary/20 bg-primary/10 px-5 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Clients Say
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mt-4 text-lg leading-relaxed">
            Real feedback from real clients. Their success stories drive us to deliver
            exceptional results every single time.
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative min-h-[360px] sm:min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="text-center max-w-3xl mx-auto px-2">
                  <div className="mb-8 inline-flex">
                    <Quote className="h-10 w-10 text-primary/20" fill="currentColor" aria-hidden="true" />
                  </div>

                  <StarRow rating={review.rating} />

                  <blockquote className="text-xl sm:text-3xl lg:text-[2rem] leading-snug sm:leading-snug text-foreground mt-7 font-light">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <div className="flex items-center justify-center gap-4 mt-9">
                    <ClientAvatar name={review.name} index={index} />
                    <div className="text-left">
                      <p className="flex items-center gap-2 font-semibold text-foreground">
                        {review.name}
                        <BadgeCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      </p>
                      <p className="text-sm text-muted-foreground mt-0.5">{review.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              type="button"
              onClick={prev}
              className="group w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center text-muted-foreground"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? "w-9 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="group w-11 h-11 rounded-full border border-border bg-card/60 backdrop-blur-sm hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 flex items-center justify-center text-muted-foreground"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by businesses across every industry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}