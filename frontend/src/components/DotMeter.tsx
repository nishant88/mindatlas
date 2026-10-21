"use client";

import React from "react";

interface DotMeterProps {
  percentage: number; // 0 to 100
  color?: string; // hex color for active dots
  mutedColor?: string; // hex color for inactive dots
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function DotMeter({
  percentage,
  color = "#d5cf66",
  mutedColor = "#3d3532",
  size = "md",
  className = "",
}: DotMeterProps) {
  // Clamp between 0 and 100
  const activeCount = Math.max(0, Math.min(100, Math.round(percentage)));
  
  // Dot sizing
  const dotSizeClass = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  }[size];

  const gapClass = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2",
  }[size];

  return (
    <div
      className={`inline-grid grid-cols-10 ${gapClass} p-2 rounded-xl bg-[#171412]/80 border border-[#3d3532]/60 select-none ${className}`}
      aria-label={`Prevalence visualizer: ${percentage} out of 100`}
      title={`${percentage}% of population`}
    >
      {Array.from({ length: 100 }).map((_, i) => {
        const isActive = i < activeCount;
        return (
          <span
            key={i}
            className={`${dotSizeClass} rounded-full transition-colors duration-200`}
            style={{
              backgroundColor: isActive ? color : mutedColor,
              boxShadow: isActive ? `0 0 4px ${color}40` : "none",
            }}
          />
        );
      })}
    </div>
  );
}
