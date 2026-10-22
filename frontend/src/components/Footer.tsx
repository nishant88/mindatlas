"use client";

import React from "react";
import Link from "next/link";
import { Compass, CheckCircle2 } from "lucide-react";
import { DISCIPLINES } from "@/lib/mindAtlasData";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] text-[var(--ink-secondary)] mt-auto transition-colors duration-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#ee936b] flex items-center justify-center shadow-md">
                <Compass className="w-4 h-4 text-[#2b2622]" />
              </div>
              <span className="font-heading text-xl font-black text-[var(--ink-primary)]">
                MindAtlas
              </span>
            </Link>

            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-md">
              The Ever-Growing Human Knowledge Library. Dedicated to collecting, synthesizing, organizing,
              and teaching foundational frameworks in psychology, cognitive science, philosophy,
              decision theory, and formal reasoning.
            </p>

            <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--ink-muted)] leading-relaxed max-w-md space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--accent-gold)] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Claim-Level Traceability Guarantee</span>
              </div>
              <p>
                Every synthesized model links directly to primary empirical literature with DOI verification and zero paywall bypassing.
              </p>
            </div>
          </div>

          {/* Curated Disciplines */}
          <div>
            <h4 className="font-heading text-sm font-black text-[var(--ink-primary)] tracking-wide mb-3 uppercase">
              Curated Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {DISCIPLINES.slice(0, 6).map((disc) => (
                <li key={disc.id}>
                  <Link
                    href={`/library?discipline=${encodeURIComponent(disc.label)}`}
                    className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: disc.color }}
                    />
                    <span>{disc.label}</span>
                    <span className="text-[var(--ink-muted)]">({disc.count})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/discover"
                  className="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 font-bold text-xs"
                >
                  View all 9 disciplines &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Architecture */}
          <div>
            <h4 className="font-heading text-sm font-black text-[var(--ink-primary)] tracking-wide mb-3 uppercase">
              Platform Architecture
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/graph" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>Interactive Knowledge Graph</span>
                </Link>
              </li>
              <li>
                <Link href="/study" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>12-Week Study Curriculum</span>
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>Source Quality & Citation Radar</span>
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>Complete Mental Model Index</span>
                </Link>
              </li>
              <li>
                <Link href="/my-library" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>Personal Library & Annotations</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[var(--ink-primary)] transition-colors flex items-center gap-2">
                  <span>Editorial Governance Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--ink-muted)]">
          <div>
            &copy; {new Date().getFullYear()} MindAtlas. Open-access cognitive science and epistemological library.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/library" className="hover:text-[var(--ink-primary)] transition-colors">Library</Link>
            <Link href="/discover" className="hover:text-[var(--ink-primary)] transition-colors">Disciplines</Link>
            <Link href="/graph" className="hover:text-[var(--ink-primary)] transition-colors">Graph</Link>
            <Link href="/study" className="hover:text-[var(--ink-primary)] transition-colors">Curriculum</Link>
            <Link href="/research" className="hover:text-[var(--ink-primary)] transition-colors">Research</Link>
            <Link href="/my-library" className="hover:text-[var(--ink-primary)] transition-colors">My Library</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
