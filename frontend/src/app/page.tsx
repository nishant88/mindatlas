"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Shuffle, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import DotMeter from "@/components/DotMeter";
import MentalModelCard from "@/components/MentalModelCard";
import { MENTAL_MODELS, DISCIPLINES, CONCEPT_TYPES } from "@/lib/mindAtlasData";

export default function MindAtlasHomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"biases" | "models" | null>(null);

  // Featured synthesis: Cognitive Dissonance
  const featuredModel = MENTAL_MODELS[0];

  // Random mental model jumper
  const handleRandomModel = () => {
    const randomIndex = Math.floor(Math.random() * MENTAL_MODELS.length);
    const chosen = MENTAL_MODELS[randomIndex];
    router.push(`/articles/${chosen.slug}`);
  };

  // Filtered list
  const filteredModels = useMemo(() => {
    return MENTAL_MODELS.filter((model) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = model.title.toLowerCase().includes(q);
        const matchesSummary = model.summary.toLowerCase().includes(q);
        const matchesTags = model.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDiscipline = model.disciplineLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesDiscipline) {
          return false;
        }
      }

      // Discipline
      if (selectedDiscipline && model.discipline !== selectedDiscipline) {
        return false;
      }

      // Type
      if (selectedType && model.conceptType.toLowerCase().replace(/\s+/g, "-") !== selectedType) {
        return false;
      }

      // Quick action filter
      if (activeFilter === "biases") {
        if (!model.tags.includes("biases-that-trick") && model.conceptType !== "Cognitive Bias") {
          return false;
        }
      } else if (activeFilter === "models") {
        if (!model.tags.includes("models-you-can-apply") && model.conceptType !== "Mental Model") {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDiscipline, selectedType, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION WITH DOT MATRIX BACKGROUND */}
      <section className="bg-dot-matrix w-full py-12 sm:py-16 md:py-20 border-b border-[#3d3532]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Title, Subtitle, Search, Quick Cards, Random Jump */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Main Heading */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink-primary)] tracking-tight mb-2">
                MindAtlas
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-[var(--ink-secondary)] mb-8 font-medium">
                <strong className="text-[var(--ink-primary)] font-black">500+</strong> Synthesized mental models, cognitive biases & philosophical foundations.
              </p>

              {/* Pill Search Input */}
              <div className="relative w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--ink-muted)] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search mental models, e.g. "cognitive dissonance", "bayesian", "falsification"'
                  className="w-full pl-13 pr-6 py-3.5 sm:py-4 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--ink-primary)] placeholder-[var(--ink-muted)] text-sm sm:text-base font-medium focus:outline-none focus:border-[#d5cf66] focus:ring-1 focus:ring-[#d5cf66] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--ink-muted)] hover:text-[var(--ink-primary)] px-2 py-1 rounded-full bg-[var(--bg-deep)]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Two Quick Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Forest Green Card */}
                <button
                  onClick={() => {
                    setActiveFilter(activeFilter === "biases" ? null : "biases");
                    setSelectedDiscipline(null);
                    setSelectedType(null);
                  }}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeFilter === "biases"
                      ? "bg-[#35533e] border-[#5cb87a] ring-2 ring-[#5cb87a]"
                      : "bg-[#283a2e] hover:bg-[#2f4537] border-[#384f3f]"
                  }`}
                >
                  <span className="font-heading font-black text-white text-base sm:text-lg leading-snug">
                    Biases that trick your brain
                  </span>
                  <ChevronRight className="w-5 h-5 text-white shrink-0 ml-2" />
                </button>

                {/* Lime/Yellow Card */}
                <button
                  onClick={() => {
                    setActiveFilter(activeFilter === "models" ? null : "models");
                    setSelectedDiscipline(null);
                    setSelectedType(null);
                  }}
                  className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    activeFilter === "models"
                      ? "bg-[#e5df70] border-[#938b03] ring-2 ring-[#232402]"
                      : "bg-[#d5cf66] hover:bg-[#ded871] border-[#bcb64f]"
                  }`}
                >
                  <span className="font-heading font-black text-[#232402] text-base sm:text-lg leading-snug">
                    Mental models you can use right now
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#232402] shrink-0 ml-2" />
                </button>
              </div>

              {/* Full-width Lavender Pill Button: Random mental model */}
              <button
                onClick={handleRandomModel}
                className="w-full mt-4 flex items-center justify-between px-6 py-3.5 sm:py-4 rounded-full bg-[#ccb0f9] hover:bg-[#d5bcfe] text-[#1f1438] transition-all font-heading font-black text-base shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>Random mental model</span>
                <Shuffle className="w-5 h-5 text-[#1f1438]" />
              </button>
            </div>

            {/* Right Column: "CORE MENTAL MODEL" Featured Card */}
            <div className="lg:col-span-5">
              <div className="relative p-6 sm:p-8 rounded-[28px] bg-[var(--bg-surface)] border-2 border-dashed border-[var(--accent-gold)] shadow-2xl flex flex-col justify-between">
                <div>
                  {/* Category Tracker */}
                  <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-gold)] mb-3">
                    CORE MENTAL MODEL
                  </div>

                  {/* Title */}
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink-primary)] tracking-tight mb-3">
                    <Link
                      href={`/articles/${featuredModel.slug}`}
                      className="hover:underline decoration-2 underline-offset-2"
                    >
                      {featuredModel.title}
                    </Link>
                  </h2>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-[var(--ink-secondary)] leading-relaxed mb-5">
                    {featuredModel.summary}
                  </p>

                  {/* Badges Row */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#d5bcfe] text-[#1f1438]">
                      <span className="w-2 h-2 rounded-full bg-[#654b99]" />
                      {featuredModel.disciplineLabel}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      {featuredModel.conceptType}
                    </span>
                  </div>
                </div>

                {/* Lower callout box with 10x10 dot matrix meter */}
                <div className="p-4 rounded-2xl bg-[var(--bg-deep)] border border-[var(--border-subtle)] flex items-center gap-4">
                  {/* 10x10 Dot Matrix Grid */}
                  <div className="shrink-0">
                    <DotMeter
                      percentage={featuredModel.empiricalReplicationPercentage}
                      size="sm"
                    />
                  </div>

                  {/* Bold callout text */}
                  <div className="text-xs sm:text-sm font-black text-[var(--accent-gold)] leading-snug">
                    {featuredModel.replicationPunchline}
                  </div>
                </div>

                {/* Direct Action Link to Full Treatise */}
                <Link
                  href={`/articles/${featuredModel.slug}`}
                  className="mt-4 w-full py-3 px-5 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#ded871] transition-all shadow-md group cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full 18-Min Treatise</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-WIDTH 9-DISCIPLINE RAINBOW STRIP */}
      <RainbowStrip />

      {/* BROWSE BY DISCIPLINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink-primary)] tracking-tight">
            Browse by discipline
          </h2>
          {selectedDiscipline && (
            <button
              onClick={() => setSelectedDiscipline(null)}
              className="text-xs font-bold text-[var(--ink-muted)] hover:text-[var(--ink-primary)] underline cursor-pointer"
            >
              Reset discipline filter
            </button>
          )}
        </div>

        {/* 9 Colored Pill Chips */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {DISCIPLINES.map((discipline) => {
            const isSelected = selectedDiscipline === discipline.id;
            return (
              <button
                key={discipline.id}
                onClick={() => {
                  setSelectedDiscipline(isSelected ? null : discipline.id);
                  setActiveFilter(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-offset-[var(--bg-page)] ring-[var(--ink-primary)] scale-105"
                    : "hover:scale-[1.03] active:scale-[0.98]"
                }`}
                style={{
                  backgroundColor: discipline.color,
                  color: discipline.textDark,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: discipline.dot }}
                />
                <span>{discipline.label}</span>
                <span className="opacity-70 font-bold">· {discipline.count}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* BROWSE BY CONCEPT TYPE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 w-full">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink-primary)] tracking-tight">
            Browse by concept type
          </h2>
          {selectedType && (
            <button
              onClick={() => setSelectedType(null)}
              className="text-xs font-bold text-[var(--ink-muted)] hover:text-[var(--ink-primary)] underline cursor-pointer"
            >
              Reset concept filter
            </button>
          )}
        </div>

        {/* Concept Type Pill Chips */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {CONCEPT_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(isSelected ? null : type.id);
                  setActiveFilter(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-black border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent-gold)] text-[var(--accent-gold-text)] border-[var(--accent-gold)] scale-105"
                    : "bg-[var(--pill-unselected-bg)] hover:bg-[var(--bg-surface-raised)] border-[var(--border-subtle)] text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                }`}
              >
                <span>{type.label}</span>
                <span className={isSelected ? "text-[var(--accent-gold-text)]/80" : "text-[var(--ink-muted)]"}>
                  · {type.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* RECENTLY SYNTHESIZED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink-primary)] tracking-tight">
            {selectedDiscipline || selectedType || activeFilter || searchQuery
              ? `Filtered Models (${filteredModels.length})`
              : "Recently synthesized"}
          </h2>
          <Link
            href="/library"
            className="text-sm font-bold text-[#ee936b] hover:text-[#f7a57f] flex items-center gap-1 group"
          >
            <span>Explore all library</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 3-Column Responsive Grid */}
        {filteredModels.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
            <p className="font-heading text-xl font-bold text-[var(--ink-primary)] mb-2">
              No mental models match your filter
            </p>
            <p className="text-sm text-[#b8ada2] mb-4">
              Try searching another concept or clear active filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDiscipline(null);
                setSelectedType(null);
                setActiveFilter(null);
              }}
              className="px-5 py-2 rounded-full bg-[#d5cf66] text-[#232402] font-black text-sm cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredModels.map((model) => (
              <MentalModelCard key={model.id} model={model} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
