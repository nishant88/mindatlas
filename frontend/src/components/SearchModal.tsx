"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Network, CheckCircle2, Sparkles } from "lucide-react";
import { searchMindAtlas } from "@/lib/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchMindAtlas(query);
      setResults(res);
      setIsSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--ink-primary)] rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] transition-colors">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-page)]">
          <Search className="w-5 h-5 text-[var(--ink-muted)] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search mental models, papers, thinkers (e.g. 'falsification', 'dissonance', 'loss aversion')..."
            className="w-full bg-transparent text-[var(--ink-primary)] placeholder-[var(--ink-muted)] focus:outline-none text-base font-medium"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[var(--ink-muted)] hover:text-[var(--ink-primary)] hover:bg-[var(--bg-surface-raised)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Natural Language Q&A Synthesis Section */}
          {results?.qa_synthesis && (
            <div className="p-5 rounded-2xl bg-[var(--bg-page)] border border-[var(--accent-gold)]/40 text-[var(--ink-primary)]">
              <div className="flex items-center gap-2 mb-2 text-[var(--accent-gold)] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Evidence-Aware Synthesis</span>
              </div>
              <p className="text-sm font-black mb-2 text-[var(--ink-primary)]">
                {results.qa_synthesis.question}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 text-[var(--ink-secondary)]">
                {results.qa_synthesis.synthesis}
              </p>

              {results.qa_synthesis.disagreements && (
                <div className="text-xs bg-[var(--bg-surface)] p-3 rounded-xl border border-[var(--border-subtle)] mb-3 text-[var(--ink-secondary)]">
                  <strong className="text-[var(--accent-gold)]">Scholarly Debate: </strong>
                  {results.qa_synthesis.disagreements}
                </div>
              )}

              {results.qa_synthesis.citations && results.qa_synthesis.citations.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-xs text-[var(--ink-muted)] font-medium self-center">Verified Citations:</span>
                  {results.qa_synthesis.citations.map((c: any, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--ink-primary)]"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {c.author} ({c.year})
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Matching Articles */}
          {results?.articles && results.articles.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-[var(--ink-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-gold)]" /> Library Articles ({results.articles.length})
              </h4>
              <div className="space-y-2.5">
                {results.articles.map((art: any) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.slug}`}
                    onClick={onClose}
                    className="block p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)]/60 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d5bcfe] text-[#1f1438]">
                        {art.primary_discipline || art.discipline}
                      </span>
                      <span className="text-xs text-[var(--ink-muted)]">{art.reading_time_mins || 12} min read</span>
                    </div>
                    <h5 className="font-heading text-base font-black text-[var(--ink-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {art.title}
                    </h5>
                    <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 mt-1">
                      {art.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Concepts & Knowledge Graph Nodes */}
          {results?.concepts && results.concepts.length > 0 && (
            <div>
              <h4 className="text-xs font-black text-[var(--ink-muted)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-[#98dcfa]" /> Knowledge Graph Concepts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {results.concepts.map((c: any) => (
                  <Link
                    key={c.id}
                    href="/graph"
                    onClick={onClose}
                    className="p-3.5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] hover:border-[#98dcfa]/60 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] mb-1">
                      <span className="font-bold text-[var(--accent-gold)]">{c.discipline}</span>
                      <span className="capitalize">{c.category}</span>
                    </div>
                    <div className="font-heading font-black text-sm text-[var(--ink-primary)]">{c.name}</div>
                    <p className="text-xs text-[var(--ink-secondary)] line-clamp-2 mt-1">{c.short_definition}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Initial Suggestion State */}
          {!results && (
            <div className="text-center py-10 text-[var(--ink-muted)]">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-[var(--accent-gold)]/50" />
              <p className="text-sm font-medium text-[var(--ink-secondary)]">Search by keyword, mental model, or philosophical inquiry</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                  "Cognitive Dissonance",
                  "Bounded Rationality",
                  "Falsificationism",
                  "Prospect Theory",
                  "Bystander Effect",
                  "First Principles",
                  "Occam's Razor",
                  "Predictive Brain"
                ].map((suggest) => (
                  <button
                    key={suggest}
                    onClick={() => setQuery(suggest)}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--bg-page)] text-[var(--ink-secondary)] border border-[var(--border-subtle)] hover:text-[var(--ink-primary)] hover:border-[var(--accent-gold)] transition-all cursor-pointer"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-page)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <span>Tip: Questions are answered with claim-level empirical citations.</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
