"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Calendar, Mail, Clock, User, Phone } from "lucide-react";

const DEFAULT_WHATSAPP = "8801758197272";
const DEFAULT_EMAIL = "codersync9@gmail.com";

export default function BookMeetingModal({ isOpen, onClose, whatsappNumber, email }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const wa = whatsappNumber || DEFAULT_WHATSAPP;
  const mail = email || DEFAULT_EMAIL;
  const topic = subject.trim() || "a web project";

  const handleWhatsApp = () => {
    const text = `Hi, I'm ${name.trim() || "interested"}. I'd like to book a meeting to discuss ${topic}.`;
    window.open(
      `https://wa.me/${wa}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleEmail = () => {
    const subjectLine = `Meeting Request - ${topic}`;
    const body = `Hi CodeNestStudio,%0D%0A%0D%0AMy name is ${name.trim() || "[Your Name]"}. I'd like to book a meeting to discuss ${topic}.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you.`;
    window.location.href = `mailto:${mail}?subject=${encodeURIComponent(subjectLine)}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="relative px-6 pt-6 pb-8 bg-gradient-to-br from-primary/10 via-background to-purple-600/10 border-b border-border/50 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-8 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Book a Meeting</h3>
                  <p className="text-sm text-muted-foreground">Choose how you&apos;d like to connect</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 mb-1">
                    <User className="h-3.5 w-3.5" /> Your Name (optional)
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Chen"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                  />
                </label>

                <label className="block text-sm font-medium text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 mb-1">
                    <MessageSquare className="h-3.5 w-3.5" /> What would you like to discuss?
                  </span>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. a new web application"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleWhatsApp}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 hover:bg-emerald-500 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleEmail}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>Email</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-xl bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Typically responds within 2 business hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
