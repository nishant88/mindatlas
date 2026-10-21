"use client";

import React, { useState, useEffect } from "react";
import { Search, X, BookOpen, Network, CheckCircle2, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { searchHybrid } from "@/lib/api";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const data = await searchHybrid(query);
      setResults(data);
      setIsSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ideas, papers, thinkers, or ask questions (e.g. 'moral relativism', 'confirmation bias')..."
            className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none text-base"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1">
          {/* Natural Language Q&A Synthesis Section */}
          {results?.qa_synthesis && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400 font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Evidence-Aware Synthesis</span>
              </div>
              <p className="text-sm font-semibold mb-2 text-stone-900 dark:text-white">
                {results.qa_synthesis.question}
              </p>
              <p className="text-sm leading-relaxed mb-3 text-stone-700 dark:text-stone-300">
                {results.qa_synthesis.synthesis}
              </p>
              
              {results.qa_synthesis.disagreements && (
                <div className="text-xs bg-white/60 dark:bg-stone-950/60 p-2.5 rounded-lg border border-amber-500/10 mb-3">
                  <span className="font-semibold text-amber-700 dark:text-amber-400">Scholarly Debate: </span>
                  {results.qa_synthesis.disagreements}
                </div>
              )}

              {results.qa_synthesis.citations && results.qa_synthesis.citations.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 border-t border-amber-500/15">
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-medium self-center">Sources:</span>
                  {results.qa_synthesis.citations.map((c: any, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
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
              <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Library Articles ({results.articles.length})
              </h4>
              <div className="space-y-2">
                {results.articles.map((art: any) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.slug}`}
                    onClick={onClose}
                    className="block p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 hover:bg-stone-50/50 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                        {art.discipline}
                      </span>
                      <span className="text-xs text-stone-400">{art.reading_time || 10} min read</span>
                    </div>
                    <h5 className="font-editorial text-base font-semibold mt-1 text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {art.title}
                    </h5>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
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
              <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5" /> Knowledge Graph Concepts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {results.concepts.map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/graph?root=${c.id}`}
                    onClick={onClose}
                    className="p-3 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                      <span className="font-medium text-amber-700 dark:text-amber-400">{c.discipline}</span>
                      <span className="capitalize">{c.category}</span>
                    </div>
                    <div className="font-medium text-sm text-stone-900 dark:text-stone-100">{c.name}</div>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">{c.short_definition}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty / Initial State */}
          {!results && (
            <div className="text-center py-10 text-stone-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-stone-300 dark:text-stone-700" />
              <p className="text-sm">Search by keyword, topic, or question</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {["Moral Relativism", "Confirmation Bias", "Bystander Effect", "Bayesian Reasoning", "Karl Popper"].map((suggest) => (
                  <button
                    key={suggest}
                    onClick={() => setQuery(suggest)}
                    className="text-xs px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950/50 flex items-center justify-between text-xs text-stone-400">
          <span>Tip: Questions are answered with evidence-based passage citations.</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
