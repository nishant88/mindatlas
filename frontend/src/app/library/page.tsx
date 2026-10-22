"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, Filter, Sparkles, X, ChevronRight } from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import MentalModelCard from "@/components/MentalModelCard";
import { MENTAL_MODELS, DISCIPLINES, CONCEPT_TYPES } from "@/lib/mindAtlasData";

function LibraryCatalog() {
  const searchParams = useSearchParams();
  const initialDiscipline = searchParams.get("discipline");
  const initialType = searchParams.get("type");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(initialDiscipline);
  const [selectedType, setSelectedType] = useState<string | null>(initialType);

  const filtered = useMemo(() => {
    return MENTAL_MODELS.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesDisc = item.disciplineLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesDisc) return false;
      }
      if (selectedDiscipline && item.disciplineLabel.toLowerCase() !== selectedDiscipline.toLowerCase() && item.discipline !== selectedDiscipline) {
        return false;
      }
      if (selectedType && item.conceptType.toLowerCase().replace(/\s+/g, "-") !== selectedType.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [searchQuery, selectedDiscipline, selectedType]);

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            The Knowledge Library
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            Synthesized Mental Models & Biases
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Rigorous, peer-reviewed syntheses of the most influential frameworks in cognitive psychology, decision science, epistemology, and behavioral economics.
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Discipline Filters */}
        <div className="flex flex-col gap-6 mb-10 pb-8 border-b border-[#3d3532]">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#82756a] mb-2.5">
              Filter by Discipline
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDiscipline(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !selectedDiscipline
                    ? "bg-[#f2ebe2] text-[#1e1a17]"
                    : "bg-[#272220] text-[#b8ada2] border border-[#3d3532] hover:text-[#f2ebe2]"
                }`}
              >
                All Disciplines
              </button>
              {DISCIPLINES.map((d) => {
                const isSelected = selectedDiscipline === d.id || selectedDiscipline === d.label;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDiscipline(isSelected ? null : d.label)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? d.color : "var(--pill-unselected-bg, #272220)",
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

          {/* Concept Type Filters */}
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#82756a] mb-2.5">
              Filter by Concept Type
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !selectedType
                    ? "bg-[#f2ebe2] text-[#1e1a17]"
                    : "bg-[#272220] text-[#b8ada2] border border-[#3d3532] hover:text-[#f2ebe2]"
                }`}
              >
                All Types
              </button>
              {CONCEPT_TYPES.map((t) => {
                const isSelected = selectedType === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(isSelected ? null : t.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#d5cf66] text-[#232402] border-[#d5cf66]"
                        : "bg-[#272220] text-[#b8ada2] border-[#3d3532] hover:text-[#f2ebe2]"
                    }`}
                  >
                    {t.label} ({t.count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Counter Row */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm font-bold text-[#b8ada2]">
            Showing <span className="text-[#f2ebe2] font-black">{filtered.length}</span> mental models & syntheses
          </div>
          {(selectedDiscipline || selectedType || searchQuery) && (
            <button
              onClick={() => {
                setSelectedDiscipline(null);
                setSelectedType(null);
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[#ee936b] hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((item) => (
            <MentalModelCard key={item.id} model={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-[#b8ada2]">Loading Knowledge Library...</div>}>
      <LibraryCatalog />
    </Suspense>
  );
}
