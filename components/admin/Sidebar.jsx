"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Code2, LayoutDashboard, FolderOpen, Plus, LogOut, ArrowLeft, DollarSign, Settings, MessageSquare, Video, Tags, Menu, X, Users, Palette, Mail } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    try {
      await fetch("/api/auth/me", { method: "POST" });
    } catch {
      // cookie clear anyway     
    }
    document.cookie = "token=; path=/; max-age=0";
    router.push("/admin/login");
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "All Projects", icon: FolderOpen },
    { href: "/admin/projects/create", label: "New Project", icon: Plus },
    { href: "/admin/frontend-designs", label: "Frontend Designs", icon: Palette },
    { href: "/admin/frontend-designs/create", label: "New Design", icon: Palette },
    { href: "/admin/categories", label: "Categories", icon: Tags },
    { href: "/admin/video-showcase", label: "Video Showcase", icon: Video },
    { href: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/pricing", label: "Pricing Plans", icon: DollarSign },
    { href: "/admin/about-us", label: "About Us", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  function isActive(href) {
    return pathname === href ||
      (href === "/admin/projects" &&
        pathname.startsWith("/admin/projects") &&
        !pathname.includes("/create") &&
        !pathname.includes("/edit")) ||
      (href === "/admin/frontend-designs" &&
        pathname.startsWith("/admin/frontend-designs") &&
        !pathname.includes("/create") &&
        !pathname.includes("/edit"));
  }

  const sidebarContent = (
    <>
      <div className="p-4 sm:p-6 border-b border-border">
        <a href="/" className="flex items-center gap-2 group">
          <Code2 className="h-6 w-6 sm:h-7 sm:w-7 text-primary group-hover:text-accent transition-colors" />
          <span className="text-base sm:text-lg font-bold">
            CodeNest<span className="text-primary">Studio</span>
          </span>
        </a>
        <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);
          return (
            <button
              key={link.href}
              onClick={() => { router.push(link.href); setMobileOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 sm:p-4 border-t border-border space-y-1">
        <button
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Site
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 xl:w-64 min-h-screen bg-card border-r border-border flex-col shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2 group">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="text-base font-bold">
            CodeNest<span className="text-primary">Studio</span>
          </span>
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile sidebar drawer */}
      <div className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r border-border flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {sidebarContent}
      </div>
    </>
  );
}
