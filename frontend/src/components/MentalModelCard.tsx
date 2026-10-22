"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Illustration from "./Illustrations";
import { MentalModel, DISCIPLINES } from "@/lib/mindAtlasData";
import { useTheme } from "@/context/ThemeContext";

interface MentalModelCardProps {
  model: MentalModel;
}

export default function MentalModelCard({ model }: MentalModelCardProps) {
  const { isDark } = useTheme();

  const disciplineMeta = DISCIPLINES.find((d) => d.id === model.discipline) || {
    id: model.discipline,
    label: model.disciplineLabel,
    color: "#d5bcfe",
    strong: "#7057a1",
    dot: "#654b99",
    textDark: "#1f1438",
  };

  // High-contrast punchline color adapting to dark vs light mode
  const punchlineColor = isDark ? disciplineMeta.color : disciplineMeta.strong;

  return (
    <article className="group relative flex flex-col rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30">
      {/* Top Illustration Area */}
      <Link
        href={`/articles/${model.slug}`}
        className="block relative overflow-hidden bg-[#f6efe1] aspect-[4/3] w-full"
      >
        <Illustration
          name={model.illustration}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Card Content Area */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
        <div>
          {/* Metadata Row: Discipline Pill + Concept Type */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <Link
              href={`/library?discipline=${encodeURIComponent(disciplineMeta.label)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: disciplineMeta.color,
                color: disciplineMeta.textDark,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: disciplineMeta.dot }}
              />
              {disciplineMeta.label}
            </Link>

            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
              {model.conceptType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl sm:text-2xl font-black text-[var(--ink-primary)] tracking-tight mb-2 group-hover:underline decoration-2 underline-offset-2">
            <Link href={`/articles/${model.slug}`}>{model.title}</Link>
          </h3>

          {/* Summary */}
          <p className="text-sm text-[var(--ink-secondary)] leading-relaxed line-clamp-3">
            {model.summary}
          </p>
        </div>

        {/* Bottom Empirical Punchline */}
        <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
          <p
            className="text-xs sm:text-sm font-black leading-snug transition-colors"
            style={{ color: punchlineColor }}
          >
            {model.replicationPunchline}
          </p>

          {/* Action Link to Full Article */}
          <Link
            href={`/articles/${model.slug}`}
            className="w-full py-2.5 px-4 rounded-xl bg-[var(--bg-deep)] hover:bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] hover:border-[#d5cf66]/50 text-xs font-bold text-[var(--accent-gold)] flex items-center justify-between transition-all group/btn"
          >
            <span>Read Full Treatise ({model.readingTimeMins || 15} min)</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
