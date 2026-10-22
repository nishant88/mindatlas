"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  Sparkles,
  Filter,
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  Award
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import MentalModelCard from "@/components/MentalModelCard";
import { MENTAL_MODELS, DISCIPLINES, CONCEPT_TYPES } from "@/lib/mindAtlasData";

function DiscoverContent() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = MENTAL_MODELS.filter((item) => {
    if (selectedDiscipline !== "All" && item.disciplineLabel.toLowerCase() !== selectedDiscipline.toLowerCase()) {
      return false;
    }
    if (selectedType !== "All" && item.conceptType.toLowerCase().replace(/\s+/g, "-") !== selectedType.toLowerCase()) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const curatedThematicPathways = [
    {
      title: "The Epistemic Debiasing Toolkit",
      desc: "Foundational investigations into how self-justification, cognitive dissonance, and motivated perception distort empirical truth.",
      works: "4 Core Syntheses",
      discipline: "Psychology",
      slug: "cognitive-dissonance-and-belief-perseverance",
      color: "#d5bcfe",
    },
    {
      title: "Falsification & The Logic of Science",
      desc: "Demarcating genuine empirical discovery from unfalsifiable dogma through Popperian asymmetric refutation.",
      works: "3 Core Works",
      discipline: "Scientific Reasoning",
      slug: "popperian-falsificationism-and-scientific-demarcation",
      color: "#7cd0c5",
    },
    {
      title: "Bounded Rationality & Heuristics",
      desc: "How human cognition navigates high-stakes decisions under finite computation, time limits, and uncertainty.",
      works: "3 Core Works",
      discipline: "Cognitive Science",
      slug: "heuristics-biases-and-bounded-rationality",
      color: "#98dcfa",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Hero Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            Faceted Discovery Engine
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            Explore Human Knowledge
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Navigate through cross-disciplinary syntheses, cognitive heuristics, and epistemological frameworks with claim-level empirical citations.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#82756a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by keyword, e.g. "heuristics", "dissonance", "popper"...'
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-[#272220] border border-[#3d3532] text-[#f2ebe2] placeholder-[#82756a] text-sm focus:outline-none focus:border-[#d5cf66]"
            />
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Curated Thematic Syllabi with Sketched Dashed Borders */}
        <div>
          <h2 className="font-heading text-2xl font-black text-[#f2ebe2] mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#d5cf66]" />
            <span>Featured Thematic Pathways</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curatedThematicPathways.map((path, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#272220] border-2 border-dashed border-[#d5cf66] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold text-[#1f1438]"
                      style={{ backgroundColor: path.color }}
                    >
                      {path.discipline}
                    </span>
                    <span className="text-xs text-[#82756a] font-bold">{path.works}</span>
                  </div>
                  <h3 className="font-heading text-xl font-black text-[#f2ebe2] mb-2">
                    <Link href={`/articles/${path.slug}`} className="hover:underline">
                      {path.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                    {path.desc}
                  </p>
                </div>
                <Link
                  href={`/articles/${path.slug}`}
                  className="text-xs font-bold text-[#d5cf66] hover:underline flex items-center gap-1"
                >
                  Start pathway syllabus &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-5">
          {/* Disciplines */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#82756a] mb-2.5">
              Filter by Discipline
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDiscipline("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedDiscipline === "All"
                    ? "bg-[#f2ebe2] text-[#1e1a17]"
                    : "bg-[#1e1a17] text-[#b8ada2] border border-[#3d3532] hover:text-[#f2ebe2]"
                }`}
              >
                All Disciplines
              </button>
              {DISCIPLINES.map((d) => {
                const isSelected = selectedDiscipline === d.label;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDiscipline(isSelected ? "All" : d.label)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? d.color : "var(--pill-unselected-bg, #1e1a17)",
                      color: isSelected ? d.textDark : "var(--pill-unselected-text, #b8ada2)",
                      border: `1px solid ${isSelected ? d.color : "var(--border-subtle, #3d3532)"}`,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.dot }} />
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Types */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#82756a] mb-2.5">
              Filter by Concept Type
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType("All")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedType === "All"
                    ? "bg-[#f2ebe2] text-[#1e1a17]"
                    : "bg-[#1e1a17] text-[#b8ada2] border border-[#3d3532] hover:text-[#f2ebe2]"
                }`}
              >
                All Types
              </button>
              {CONCEPT_TYPES.map((t) => {
                const isSelected = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(isSelected ? "All" : t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#d5cf66] text-[#232402] border-[#d5cf66]"
                        : "bg-[#1e1a17] text-[#b8ada2] border-[#3d3532] hover:text-[#f2ebe2]"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-black text-[#f2ebe2]">
              Knowledge Models ({filtered.length})
            </h2>
            {(selectedDiscipline !== "All" || selectedType !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDiscipline("All");
                  setSelectedType("All");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#ee936b] hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <MentalModelCard key={item.id} model={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading Discovery Engine...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
