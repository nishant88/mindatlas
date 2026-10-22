"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Compass } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Knowledge Library", href: "/library" },
    { label: "Disciplines", href: "/discover" },
    { label: "Knowledge Graph", href: "/graph" },
    { label: "Study Planner", href: "/study" },
    { label: "Source Radar", href: "/research" },
    { label: "My Library", href: "/my-library" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-page)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5cf66] rounded-full"
        >
          {/* Circular Amber/Coral Badge */}
          <div className="w-9 h-9 rounded-full bg-[#ee936b] flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <Compass className="w-5 h-5 text-[#2b2622] transition-transform group-hover:rotate-45" />
          </div>

          {/* Brand Wordmark in Bodily Oddities heavy typography */}
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-[var(--ink-primary)] group-hover:opacity-90 transition-opacity">
              MindAtlas
            </span>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-[var(--accent-gold)] px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              Human Knowledge Library
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? "text-[var(--ink-primary)] underline underline-offset-4 decoration-2 decoration-[#d5cf66]"
                    : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)] transition-all focus:outline-none focus:ring-2 focus:ring-[#d5cf66] cursor-pointer shadow-xs"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#f2ebe2]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-600" />
            )}
          </button>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--ink-secondary)] cursor-pointer"
          >
            {isDark ? <Moon className="w-4 h-4 text-[#f2ebe2]" /> : <Sun className="w-4 h-4 text-amber-600" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile menu"
            className="w-9 h-9 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--ink-secondary)] cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-page)] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-bold text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-surface)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
