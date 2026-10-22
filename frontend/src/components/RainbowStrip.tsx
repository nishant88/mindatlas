"use client";

import React from "react";
import Link from "next/link";
import { DISCIPLINES } from "@/lib/mindAtlasData";

export default function RainbowStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full flex h-2.5 sm:h-3 overflow-hidden select-none ${className}`}
      role="presentation"
      aria-hidden="true"
    >
      {DISCIPLINES.map((discipline) => (
        <Link
          key={discipline.id}
          href={`/library?discipline=${encodeURIComponent(discipline.label)}`}
          className="flex-1 h-full transition-transform hover:scale-y-125 focus:outline-none"
          style={{ backgroundColor: discipline.color }}
          title={discipline.label}
        />
      ))}
    </div>
  );
}
