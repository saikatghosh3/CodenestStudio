"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import BookMeetingModal from "@/components/ui/BookMeetingModal";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function ContactPage() {
  const [settings, setSettings] = useState(null);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setSettings(data))
      .catch(() => {});
  }, []);

  const email = settings?.email || "codersync9@gmail.com";
  const phone = settings?.phone || "+880 1758197272";
  const address = settings?.address || "Dhaka, Bangladesh";
  const whatsapp = settings?.whatsappNumber || "8801758197272";
  const contactEmail = settings?.contactEmail || email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: "Email Us",
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      external: false,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      external: false,
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: "Chat with us instantly",
      href: `https://wa.me/${whatsapp}`,
      external: true,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: address,
      href: undefined,
      external: false,
    },
  ];

  const hours = [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 5:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar initialSettings={settings} />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card mb-5 sm:mb-8 backdrop-blur-sm shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-widest">Get in Touch</span>
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[1.75rem] leading-tight sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-4 sm:mb-7 text-balance"
            >
              Let&apos;s Build Something{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
                Great Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Have a project in mind or a question about our services? We&apos;d love to hear from you.
              Reach out and we&apos;ll get back within a few hours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              const inner = (
                <>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-600/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{card.label}</p>
                  <p className="text-sm sm:text-base font-semibold text-foreground break-words">{card.value}</p>
                </>
              );
              return (
                <motion.div
                  key={card.label}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                >
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.external ? "_blank" : undefined}
                      rel={card.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-col h-full rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex flex-col h-full rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
                      {inner}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Contact Form */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-border bg-card p-5 sm:p-8 lg:p-10"
            >
              <h2 className="text-xl sm:text-3xl font-bold text-foreground mb-1">Send Us a Message</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">Fill out the form and we&apos;ll get back to you shortly.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-sm mb-6">
                    Thank you for reaching out. We&apos;ve received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setError("");
                      setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5 text-sm text-destructive">
                      {error}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:hover:scale-[1]"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Book meeting */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl sm:rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-purple-600/5 p-5 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/25">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Book a Meeting</h3>
                    <p className="text-xs text-muted-foreground">Free consultation</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  Speak with our senior engineers about your project and get a tailored roadmap.
                </p>
                <button
                  onClick={() => setMeetingOpen(true)}
                  className="w-full py-3 px-5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" /> Schedule a Meeting
                </button>
              </motion.div>

              {/* Business Hours */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl sm:rounded-3xl border border-border bg-card p-5 sm:p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Business Hours</h3>
                </div>
                <ul className="space-y-3">
                  {hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className={`font-semibold ${h.time === "Closed" ? "text-destructive" : "text-foreground"}`}>
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border relative min-h-[280px] flex items-center justify-center bg-gradient-to-br from-primary/5 via-card to-purple-600/5"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-8 left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 text-center px-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{address}</h3>
              <p className="text-sm text-muted-foreground mb-5">We work with clients worldwide, remotely & on-site.</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:bg-foreground/90 transition-colors"
              >
                <MapPin className="h-4 w-4" /> Open in Maps
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer initialSettings={settings} />
      <BookMeetingModal isOpen={meetingOpen} onClose={() => setMeetingOpen(false)} whatsappNumber={whatsapp} email={contactEmail} />
    </div>
  );
}
