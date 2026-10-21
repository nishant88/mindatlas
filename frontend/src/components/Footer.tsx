"use client";

import React from "react";
import Link from "next/link";
import { Compass, CheckCircle2, ShieldCheck, BookOpen } from "lucide-react";
import { DISCIPLINES } from "@/lib/mindAtlasData";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#3d3532] bg-[#171412] text-[#b8ada2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#ee936b] flex items-center justify-center shadow-md">
                <Compass className="w-4 h-4 text-[#2b2622]" />
              </div>
              <span className="font-heading text-xl font-black text-[#f2ebe2]">
                MindAtlas
              </span>
            </Link>

            <p className="text-sm text-[#b8ada2] leading-relaxed max-w-md">
              The Ever-Growing Human Knowledge Library. Dedicated to collecting, synthesizing, organizing,
              and teaching foundational frameworks in psychology, cognitive science, philosophy,
              decision theory, and formal reasoning.
            </p>

            <div className="p-3 rounded-2xl bg-[#272220] border border-[#3d3532] text-xs text-[#82756a] leading-relaxed max-w-md space-y-1">
              <div className="flex items-center gap-1.5 text-[#d5cf66] font-bold">
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
            <h4 className="font-heading text-sm font-black text-[#f2ebe2] tracking-wide mb-3 uppercase">
              Curated Disciplines
            </h4>
            <ul className="space-y-2 text-xs">
              {DISCIPLINES.slice(0, 6).map((disc) => (
                <li key={disc.id}>
                  <Link
                    href={`/library?discipline=${encodeURIComponent(disc.label)}`}
                    className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: disc.color }}
                    />
                    <span>{disc.label}</span>
                    <span className="text-[#82756a]">({disc.count})</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/discover"
                  className="text-amber-400 hover:text-amber-300 font-bold text-xs"
                >
                  View all 9 disciplines &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Architecture */}
          <div>
            <h4 className="font-heading text-sm font-black text-[#f2ebe2] tracking-wide mb-3 uppercase">
              Platform Architecture
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/graph" className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2">
                  <span>Interactive Knowledge Graph</span>
                </Link>
              </li>
              <li>
                <Link href="/study" className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2">
                  <span>12-Week Study Curriculum</span>
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2">
                  <span>Source Quality & Citation Radar</span>
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2">
                  <span>Complete Mental Model Index</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#f2ebe2] transition-colors flex items-center gap-2">
                  <span>Editorial Governance Console</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#3d3532] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#82756a]">
          <div>
            &copy; {new Date().getFullYear()} MindAtlas. Open-access cognitive science and epistemological library.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/library" className="hover:text-[#b8ada2] transition-colors">Library</Link>
            <Link href="/discover" className="hover:text-[#b8ada2] transition-colors">Disciplines</Link>
            <Link href="/graph" className="hover:text-[#b8ada2] transition-colors">Graph</Link>
            <Link href="/study" className="hover:text-[#b8ada2] transition-colors">Curriculum</Link>
            <Link href="/research" className="hover:text-[#b8ada2] transition-colors">Research</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
