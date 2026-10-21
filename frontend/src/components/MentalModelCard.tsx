"use client";

import React from "react";
import Link from "next/link";
import Illustration from "./Illustrations";
import { MentalModel, DISCIPLINES } from "@/lib/mindAtlasData";

interface MentalModelCardProps {
  model: MentalModel;
}

export default function MentalModelCard({ model }: MentalModelCardProps) {
  const disciplineMeta = DISCIPLINES.find((d) => d.id === model.discipline) || {
    id: model.discipline,
    label: model.disciplineLabel,
    color: "#d5bcfe",
    strong: "#7057a1",
    dot: "#654b99",
    textDark: "#1f1438",
  };

  return (
    <article className="group relative flex flex-col rounded-3xl bg-[#272220] border border-[#3d3532] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[#574d48] hover:shadow-xl hover:shadow-black/30">
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

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9f9488]">
              {model.conceptType}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl sm:text-2xl font-black text-[#f2ebe2] tracking-tight mb-2 group-hover:underline decoration-2 underline-offset-2">
            <Link href={`/articles/${model.slug}`}>{model.title}</Link>
          </h3>

          {/* Summary */}
          <p className="text-sm text-[#b8ada2] leading-relaxed line-clamp-3">
            {model.summary}
          </p>
        </div>

        {/* Bottom Empirical Punchline */}
        <div className="pt-3 border-t border-[#3d3532]/60">
          <p
            className="text-xs sm:text-sm font-black leading-snug"
            style={{ color: disciplineMeta.color }}
          >
            {model.replicationPunchline}
          </p>
        </div>
      </div>
    </article>
  );
}
