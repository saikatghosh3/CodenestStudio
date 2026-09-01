"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/utils/constants";
import {
  X,
  Code2,
  MessageSquare,
  ChevronRight,
  Home,
  Info,
  FolderKanban,
  Palette,
  BadgeDollarSign,
  HelpCircle,
  Mail,
  Phone,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_ICONS = {
  "#home": Home,
  "/about": Info,
  "#projects": FolderKanban,
  "#frontend-designs": Palette,
  "#pricing": BadgeDollarSign,
  "#faq": HelpCircle,
  "/contact": Mail,
};

const MOBILE_LINKS = NAV_LINKS.map((link) => ({
  ...link,
  icon: NAV_ICONS[link.href] || Sparkles,
}));

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function MenuButton({ open, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-purple-600 shadow-[0_6px_22px_-8px_rgba(99,102,241,0.55)] group"
    >
      <span className="absolute inset-[1.5px] rounded-[14px] bg-background group-hover:bg-card transition-colors duration-300" />
      <span className="relative flex items-center justify-center h-full">
        <span className="relative block w-5 h-5">
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="absolute left-0 top-[3px] h-[2px] w-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-600"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="absolute left-0 top-[9px] h-[2px] w-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-600"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            className="absolute left-0 top-[15px] h-[2px] w-full rounded-full bg-gradient-to-r from-primary via-blue-500 to-purple-600"
          />
        </span>
      </span>
    </motion.button>
  );
}

export default function Navbar({ initialSettings = null }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settings, setSettings] = useState(initialSettings);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!initialSettings) {
      fetch("/api/settings")
        .then((r) => r.ok && r.json())
        .then((data) => setSettings(data))
        .catch(() => {});
    }
  }, [initialSettings]);

  const brandName = "CodeNestStudio";
  const logoUrl = settings?.logo || "";
  const whatsappNumber = settings?.whatsappNumber || "8801758197272";
  const email = settings?.contactEmail || "codersync9@gmail.com";

  const getNavHref = (href) => {
    if (href.startsWith("/")) return href;
    return pathname === "/" ? href : `/${href}`;
  };

  const isOnHome = () => pathname === "/";

  const scrollToHash = (href) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Target may be a lazy section that isn't mounted yet. Scroll progressively
    // so the IntersectionObserver mounts it, then scroll exactly to it.
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const el = document.getElementById(id);
      if (el) {
        window.clearInterval(timer);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollBy({ top: 420, behavior: "smooth" });
      }
      if (attempts > 50) window.clearInterval(timer);
    }, 40);
  };

  const handleNavClick = (e, link) => {
    if (mobileOpen) setMobileOpen(false);

    if (link.href.startsWith("/")) {
      // page route — let Next Link handle navigation (instant client-side)
      return;
    }
    if (!isOnHome()) {
      // hash sections live on the home page — let the anchor navigate there.
      return;
    }
    e.preventDefault();
    scrollToHash(link.href);
  };

  const renderBrand = () => {
    if (logoUrl) {
      return <img src={logoUrl} alt={brandName} className="h-7 sm:h-8 w-auto" width={32} height={32} loading="eager" />;
    }
    return (
      <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
        CodeNest<span className="text-primary">Studio</span>
      </span>
    );
  };

  const renderBrandMark = () => {
    if (logoUrl) {
      return <img src={logoUrl} alt={brandName} className="h-9 w-auto" />;
    }
    return <Code2 className="h-9 w-9 text-primary" />;
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? "py-2" : "py-4 lg:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`flex items-center justify-between rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-background/70 backdrop-blur-xl border border-border shadow-xl dark:shadow-2xl dark:shadow-black/50 px-6 py-3"
              : "bg-transparent px-2 py-2"
          }`}
        >
          <a href="/" className="flex items-center gap-2 group relative z-10 hover-target">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}>
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} className="h-8 w-auto" />
              ) : (
                <Code2 className="h-7 w-7 sm:h-8 sm:w-8 text-primary group-hover:text-foreground transition-colors" />
              )}
            </motion.div>
            {renderBrand()}
          </a>

          <nav className="hidden lg:flex items-center gap-2 relative z-10">
            {NAV_LINKS.map((link) => {
              const isPage = link.href.startsWith("/");
              return isPage ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(undefined, link)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover-target group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={getNavHref(link.href)}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover-target group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              );
            })}
            <div className="h-4 w-px bg-border mx-2 transition-colors duration-300" />
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I would like to discuss a web project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 relative group overflow-hidden rounded-full p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400 rounded-full animate-spin-slow opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-2 px-5 py-2.5 bg-background dark:bg-background rounded-full transition-colors group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50">
                <span className="text-sm font-semibold text-foreground transition-colors duration-300">Let&apos;s Talk</span>
                <ChevronRight className="h-4 w-4 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </nav>

          <div className="lg:hidden flex items-center gap-2 relative z-10">
            <ThemeToggle />
            <MenuButton open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="absolute top-full left-0 right-0 mx-3 sm:mx-6 mt-3 lg:hidden"
          >
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-primary/50 via-blue-500/40 to-purple-600/50 shadow-[0_20px_60px_-15px_rgba(2,105,255,0.4)]">
              <div className="relative rounded-[calc(1.5rem-1.5px)] bg-background/95 backdrop-blur-2xl overflow-hidden max-h-[calc(100dvh-7rem)] overflow-y-auto">
                <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/20 rounded-full blur-3xl animate-bg-blob-1 pointer-events-none" />
                <div className="absolute -bottom-24 -left-16 w-56 h-56 bg-purple-500/15 rounded-full blur-3xl animate-bg-blob-2 pointer-events-none" />

                <div className="relative p-5 sm:p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.6 }}
                        className="shrink-0"
                      >
                        {renderBrandMark()}
                      </motion.div>
                      <div>
                        <p className="font-bold text-foreground leading-tight">{brandName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Premium Web Studio
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={closeMenu}
                      aria-label="Close menu"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2 px-1">
                    Explore
                  </p>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="space-y-1.5"
                  >
                    {MOBILE_LINKS.map(({ label, href, icon: Icon }) => (
                      <motion.a
                        key={href}
                        variants={staggerItem}
                        href={getNavHref(href)}
                        onClick={(e) => handleNavClick(e, { href })}
                        className="group flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-primary/20 hover:bg-gradient-to-r hover:from-primary/10 hover:via-transparent hover:to-purple-500/5 transition-all duration-300"
                      >
                        <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-card border border-border text-primary group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-transparent group-hover:scale-105 transition-all duration-300 shrink-0">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1 text-foreground font-semibold group-hover:text-primary transition-colors">
                          {label}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-all">
                          <span className="hidden sm:inline group-hover:translate-x-0 -translate-x-0 opacity-0 group-hover:opacity-100 transition-all">
                            Explore
                          </span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </motion.a>
                    ))}
                  </motion.div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-5" />

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.a
                      variants={staggerItem}
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I would like to discuss a web project.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="group w-full flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <MessageSquare className="h-5 w-5" />
                      Discuss Your Project
                      <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>

                    <motion.div
                      variants={staggerItem}
                      className="grid grid-cols-2 gap-3 mt-3"
                    >
                      <a
                        href={`mailto:${email}`}
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-secondary transition-all duration-300"
                      >
                        <Mail className="h-4 w-4 text-primary" />
                        Email
                      </a>
                      <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border text-sm font-semibold text-foreground hover:border-primary/50 hover:bg-secondary transition-all duration-300"
                      >
                        <Phone className="h-4 w-4 text-primary" />
                        Call
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}