"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Compass, Search } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mindatlas-theme");
      if (stored === "light") {
        setIsDark(false);
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        setIsDark(true);
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof window !== "undefined") {
      if (nextDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        localStorage.setItem("mindatlas-theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        localStorage.setItem("mindatlas-theme", "light");
      }
    }
  };

  const navLinks = [
    { label: "Knowledge Library", href: "/library" },
    { label: "Disciplines", href: "/discover" },
    { label: "Knowledge Graph", href: "/graph" },
    { label: "Study Planner", href: "/study" },
    { label: "Source Radar", href: "/research" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1e1a17]/95 dark:bg-[#1e1a17]/95 light:bg-[#fbf7f1]/95 backdrop-blur-md border-b border-[#3d3532]/80 transition-colors">
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
            <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-[#f2ebe2] group-hover:text-white transition-colors">
              MindAtlas
            </span>
            <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-[#d5cf66] px-2 py-0.5 rounded-full bg-[#272220] border border-[#3d3532]">
              Human Knowledge Library
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-colors ${
                  isActive
                    ? "text-[#f2ebe2] underline underline-offset-4 decoration-2 decoration-[#d5cf66]"
                    : "text-[#b8ada2] hover:text-[#f2ebe2]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="w-9 h-9 rounded-full border border-[#3d3532] bg-[#272220] flex items-center justify-center text-[#b8ada2] hover:text-[#f2ebe2] hover:border-[#574d48] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d5cf66] cursor-pointer"
          >
            {isDark ? (
              <Moon className="w-4 h-4 text-[#f2ebe2]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500" />
            )}
          </button>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle mode"
            className="w-9 h-9 rounded-full border border-[#3d3532] bg-[#272220] flex items-center justify-center text-[#b8ada2]"
          >
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile menu"
            className="w-9 h-9 rounded-full border border-[#3d3532] bg-[#272220] flex items-center justify-center text-[#b8ada2]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#3d3532] bg-[#1e1a17] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-base font-bold text-[#b8ada2] hover:text-[#f2ebe2] hover:bg-[#272220]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
