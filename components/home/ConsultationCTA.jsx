"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Calendar } from "lucide-react";
import BookMeetingModal from "@/components/ui/BookMeetingModal";

export default function ConsultationCTA() {
  const [meetingOpen, setMeetingOpen] = useState(false);
  return (
    <section id="consult" className="py-20 lg:py-28 relative bg-gradient-to-br from-primary/6 to-purple-900/2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-card border border-border backdrop-blur-md text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">Book a Free Consultation</h3>
          <p className="text-muted-foreground mb-6">Speak with our senior engineers to discuss your project and get a tailored roadmap.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`https://wa.me/8801758197272?text=${encodeURIComponent("Hi, I'd like to book a consultation.")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
            <a href="mailto:codersync9@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-full font-semibold hover:bg-secondary transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
            <button onClick={() => setMeetingOpen(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-full font-semibold hover:bg-secondary transition-colors">
              <Calendar className="w-4 h-4" /> Schedule
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="inline-flex items-center gap-2 bg-card px-3 py-2 rounded-full border border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> <span className="text-sm text-foreground">Available: Mon–Fri</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-card px-3 py-2 rounded-full border border-border">
              <span className="text-sm text-foreground">Response Time: within 2h</span>
            </div>
          </div>
        </motion.div>
      </div>

      <BookMeetingModal isOpen={meetingOpen} onClose={() => setMeetingOpen(false)} />
    </section>
  );
}
