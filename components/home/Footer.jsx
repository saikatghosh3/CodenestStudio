"use client";

import { useState, useEffect } from "react";
import { Code2, Mail, MapPin, Phone, MessageSquare, ArrowRight, Github, Twitter, Linkedin, Dribbble, Globe } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP = {
  Github,
  Twitter,
  Linkedin,
  Dribbble,
  Globe,
};

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.ok && r.json())
      .then((data) => setSettings(data))
      .catch(() => {});
  }, []);

  const brandName = "CodeNestStudio";
  const siteName = "CodeNestStudio";
  const logoUrl = settings?.logo || "";
  const description = settings?.footerDescription || "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.";
  const email = settings?.email || "codersync9@gmail.com";
  const phone = settings?.phone || "+880 1758197272";
  const address = settings?.address || "Dhaka, Bangladesh";
  const copyright = "CodeNestStudio. Crafted with precision.";
  const socialLinks = settings?.socialLinks || [];

  const socialVariants = {
    hover: { y: -5, scale: 1.1, color: "#fff" },
  };

  function getSocialIcon(platform) {
    const key = platform?.toLowerCase();
    if (key === "github") return Github;
    if (key === "twitter") return Twitter;
    if (key === "linkedin") return Linkedin;
    if (key === "dribbble") return Dribbble;
    return Globe;
  }

  const navLinks = ["Home", "About", "Projects", "Clients", "FAQ"];

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4">
            <a href="/" className="flex items-center gap-2 mb-6 group hover-target w-fit">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
                {logoUrl ? (
                  <img src={logoUrl} alt={brandName} className="h-8 w-auto" />
                ) : (
                  <Code2 className="h-8 w-8 text-primary group-hover:text-foreground transition-colors" />
                )}
              </motion.div>
              {!logoUrl && (
                <span className="text-2xl font-bold tracking-tight text-foreground">
                  {brandName.split(/(Studio)/).map((part, i) =>
                    part === "Studio" ? <span key={i} className="text-primary">{part}</span> : part
                  )}
                </span>
              )}
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              {description}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, idx) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <motion.a
                    key={idx}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    variants={socialVariants}
                    className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:bg-primary/10 transition-colors hover-target"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-foreground font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 group hover-target transition-colors"
                  >
                    <span className="h-px w-0 bg-primary group-hover:w-4 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-foreground font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <a href={`mailto:${email}`} className="hover:text-foreground transition-colors hover-target">{email}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors hover-target">{phone}</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                {address}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-foreground font-semibold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to get the latest design news and tech updates.</p>
            <form className="relative group">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-card border border-border rounded-full px-5 py-3 pr-14 text-sm text-foreground focus:outline-none focus:border-primary transition-colors hover-target"
              />
              <button
                type="button"
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-primary text-white rounded-full px-4 hover:bg-primary/80 transition-colors flex items-center justify-center hover-target"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {copyright}
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors hover-target">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors hover-target">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
