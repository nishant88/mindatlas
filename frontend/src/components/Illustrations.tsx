"use client";

import React from "react";

interface IllustrationProps {
  name: string;
  className?: string;
}

export default function Illustration({ name, className = "w-full h-full" }: IllustrationProps) {
  switch (name) {
    case "cognitive-dissonance":
      // Head with two conflicting puzzle gears grinding, causing a mental spark
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f8f1e5" />
          
          {/* Head silhouette in profile facing right */}
          <path
            d="M 120 180 C 100 130 140 60 220 60 C 280 60 300 100 300 150 C 300 168 310 178 305 190 C 295 200 280 200 280 215 C 280 230 260 240 235 240 L 235 280 L 160 280 L 160 240 C 130 240 120 210 120 180 Z"
            fill="#f7dfbe"
            stroke="#2b2622"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Hair overlay */}
          <path
            d="M 120 170 C 110 110 150 55 230 60 C 280 62 295 90 298 120 C 280 115 260 120 250 110 C 235 125 205 115 190 122 C 170 115 150 130 135 135 Z"
            fill="#eed078"
            stroke="#2b2622"
            strokeWidth="3.5"
          />

          {/* Brain Cavity Window */}
          <ellipse cx="205" cy="135" rx="55" ry="42" fill="#efe2cf" stroke="#2b2622" strokeWidth="3" />

          {/* Left Gear (Prior Belief - Purple) */}
          <g transform="translate(180, 130)">
            <circle cx="0" cy="0" r="22" fill="#d5bcfe" stroke="#2b2622" strokeWidth="3" />
            <circle cx="0" cy="0" r="7" fill="#7057a1" stroke="#2b2622" strokeWidth="2" />
            {/* Gear cogs */}
            <rect x="-4" y="-27" width="8" height="6" fill="#7057a1" rx="1" />
            <rect x="-4" y="21" width="8" height="6" fill="#7057a1" rx="1" />
            <rect x="-27" y="-4" width="6" height="8" fill="#7057a1" rx="1" />
            <rect x="21" y="-4" width="6" height="8" fill="#7057a1" rx="1" />
          </g>

          {/* Right Gear (Contradictory Fact - Coral) */}
          <g transform="translate(225, 145)">
            <circle cx="0" cy="0" r="22" fill="#ee9976" stroke="#2b2622" strokeWidth="3" />
            <circle cx="0" cy="0" r="7" fill="#893106" stroke="#2b2622" strokeWidth="2" />
            {/* Gear cogs */}
            <rect x="-4" y="-27" width="8" height="6" fill="#893106" rx="1" />
            <rect x="-4" y="21" width="8" height="6" fill="#893106" rx="1" />
            <rect x="-27" y="-4" width="6" height="8" fill="#893106" rx="1" />
            <rect x="21" y="-4" width="6" height="8" fill="#893106" rx="1" />
          </g>

          {/* Electric Cognitive Friction Spark right where gears collide */}
          <path
            d="M 202 135 L 208 127 L 203 125 L 210 115 L 205 123 L 211 125 Z"
            fill="#d5cf66"
            stroke="#626400"
            strokeWidth="2"
          />
          {/* Tension rays */}
          <line x1="200" y1="110" x2="195" y2="105" stroke="#e0da7a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="216" y1="112" x2="224" y2="107" stroke="#e0da7a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Pensive closed eye & furrowed brow */}
          <path d="M 270 145 Q 278 150 285 145" stroke="#2b2622" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 268 138 Q 278 134 286 138" stroke="#2b2622" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Nose & mouth */}
          <path d="M 300 160 L 308 174 L 300 176" stroke="#2b2622" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 285 198 Q 292 195 298 198" stroke="#2b2622" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case "bounded-rationality":
      // Inquisitive person looking through telescope shortcut through a maze
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f6efe1" />

          {/* Maze Wall Line Segments in Background */}
          <path d="M 40 50 L 160 50 L 160 120 L 80 120 L 80 190 L 150 190" stroke="#c9bba8" strokeWidth="4" strokeLinecap="round" />
          <path d="M 80 70 L 130 70 L 130 100" stroke="#c9bba8" strokeWidth="4" strokeLinecap="round" />
          <path d="M 120 140 L 120 170" stroke="#c9bba8" strokeWidth="4" strokeLinecap="round" />

          {/* Decision Thinker with Telescope */}
          {/* Body / Navy Coat */}
          <path
            d="M 230 140 C 215 140 200 160 195 190 L 180 270 L 310 270 L 295 190 C 290 160 275 140 250 140 Z"
            fill="#3d5a80"
            stroke="#2b2622"
            strokeWidth="3.5"
          />

          {/* Head & Hair */}
          <circle cx="240" cy="95" r="28" fill="#f7dfbe" stroke="#2b2622" strokeWidth="3.5" />
          <path
            d="M 215 90 C 215 65 240 60 265 65 C 275 75 272 95 268 105 C 255 100 240 105 230 95 C 220 95 215 95 215 90 Z"
            fill="#ee9976"
            stroke="#2b2622"
            strokeWidth="3"
          />

          {/* Brass Telescope pointing through maze */}
          <g transform="translate(200, 105) rotate(-18)">
            <rect x="0" y="0" width="30" height="18" rx="3" fill="#e0da7a" stroke="#2b2622" strokeWidth="2.5" />
            <rect x="30" y="2" width="40" height="14" rx="2" fill="#d5cf66" stroke="#2b2622" strokeWidth="2.5" />
            <rect x="70" y="4" width="45" height="10" rx="2" fill="#c4be55" stroke="#2b2622" strokeWidth="2.5" />
            {/* Glass Lens & Ray */}
            <ellipse cx="115" cy="9" rx="3" ry="5" fill="#98dcfa" stroke="#2b2622" strokeWidth="2" />
          </g>

          {/* Direct Green Heuristic Shortcut Light Beam */}
          <path
            d="M 90 85 L 145 102 L 95 160"
            stroke="#8dbd39"
            strokeWidth="4"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          {/* Golden Goal Star at Maze exit */}
          <polygon
            points="85,85 88,75 97,75 90,70 93,60 85,66 77,60 80,70 73,75 82,75"
            fill="#ffd152"
            stroke="#2b2622"
            strokeWidth="2"
          />
        </svg>
      );

    case "motivated-reasoning":
      // Identity Shield deflecting incoming arrows of facts
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f8f1e5" />

          {/* Defender Person holding shield */}
          {/* Torso in Coral */}
          <path
            d="M 240 150 C 260 140 310 145 325 160 L 340 270 L 220 270 Z"
            fill="#ee9976"
            stroke="#2b2622"
            strokeWidth="3.5"
          />
          {/* Head & Confident Expression */}
          <circle cx="280" cy="100" r="28" fill="#f7dfbe" stroke="#2b2622" strokeWidth="3.5" />
          <path
            d="M 255 95 C 255 70 280 65 305 70 C 315 80 310 100 305 110 C 295 105 280 110 270 100 Z"
            fill="#eed078"
            stroke="#2b2622"
            strokeWidth="3"
          />
          <circle cx="272" cy="102" r="3" fill="#2b2622" />
          <path d="M 268 94 Q 275 90 282 94" stroke="#2b2622" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 270 115 Q 278 120 286 115" stroke="#2b2622" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Big Identity Shield */}
          <path
            d="M 180 80 C 230 80 235 90 235 150 C 235 210 190 240 180 250 C 170 240 125 210 125 150 C 125 90 130 80 180 80 Z"
            fill="#f095d2"
            stroke="#2b2622"
            strokeWidth="4"
          />
          {/* Shield Emblem (Tribe Crest) */}
          <circle cx="180" cy="150" r="24" fill="#ffffff" stroke="#2b2622" strokeWidth="3" />
          <path d="M 172 150 L 180 140 L 188 150 L 180 162 Z" fill="#8c0267" />

          {/* Incoming Factual Arrows bouncing off shield with deflection sparks */}
          {/* Arrow 1 (bounced) */}
          <line x1="50" y1="110" x2="115" y2="125" stroke="#2b2622" strokeWidth="3" strokeLinecap="round" />
          <polygon points="120,126 108,120 111,130" fill="#2b2622" />
          {/* Spark at impact */}
          <path d="M 125 125 L 120 118 L 128 122 Z" fill="#ffd152" stroke="#2b2622" strokeWidth="1.5" />

          {/* Arrow 2 (bounced away upward) */}
          <line x1="60" y1="190" x2="118" y2="165" stroke="#2b2622" strokeWidth="3" strokeLinecap="round" />
          <polygon points="123,163 111,162 115,172" fill="#2b2622" />
          <path d="M 125 160 L 130 152 L 122 156 Z" fill="#ffd152" stroke="#2b2622" strokeWidth="1.5" />
        </svg>
      );

    case "black-swan":
      // Popper's Black Swan among white swans with magnifying glass
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f4faf8" />

          {/* Soft Water Waves */}
          <ellipse cx="200" cy="220" rx="170" ry="40" fill="#d9f2ec" stroke="#7cd0c5" strokeWidth="2.5" />
          <path d="M 80 230 Q 140 220 200 230 T 320 230" stroke="#006256" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

          {/* White Swan 1 on left */}
          <g transform="translate(60, 140)">
            <ellipse cx="40" cy="40" rx="28" ry="18" fill="#ffffff" stroke="#2b2622" strokeWidth="3" />
            <path d="M 55 40 C 65 25 55 10 45 10 C 35 10 40 25 45 35" fill="#ffffff" stroke="#2b2622" strokeWidth="3" />
            <polygon points="45,10 38,12 43,15" fill="#ee936b" />
          </g>

          {/* White Swan 2 on right */}
          <g transform="translate(260, 140)">
            <ellipse cx="40" cy="40" rx="28" ry="18" fill="#ffffff" stroke="#2b2622" strokeWidth="3" />
            <path d="M 25 40 C 15 25 25 10 35 10 C 45 10 40 25 35 35" fill="#ffffff" stroke="#2b2622" strokeWidth="3" />
            <polygon points="35,10 42,12 37,15" fill="#ee936b" />
          </g>

          {/* The Solitary Majestic Black Swan in Center */}
          <g transform="translate(150, 110)">
            {/* Swan Body */}
            <ellipse cx="50" cy="60" rx="42" ry="26" fill="#272220" stroke="#2b2622" strokeWidth="3.5" />
            {/* Feathers */}
            <path d="M 30 65 Q 50 50 75 65" stroke="#574d48" strokeWidth="2.5" fill="none" />
            {/* Long Graceful S-Neck */}
            <path
              d="M 75 60 C 95 35 75 10 60 10 C 48 10 55 35 60 55"
              fill="#272220"
              stroke="#2b2622"
              strokeWidth="3.5"
            />
            {/* Crimson Beak */}
            <polygon points="60,10 48,13 56,18" fill="#fe9ea6" stroke="#2b2622" strokeWidth="2" />
            <circle cx="58" cy="12" r="2" fill="#fff" />
          </g>

          {/* Karl Popper's Magnifying Glass focusing on Black Swan */}
          <g transform="translate(240, 70)">
            <circle cx="25" cy="25" r="28" fill="#98dcfa" fillOpacity="0.4" stroke="#2b2622" strokeWidth="4" />
            <line x1="45" y1="45" x2="75" y2="75" stroke="#2b2622" strokeWidth="6" strokeLinecap="round" />
            {/* Highlight */}
            <path d="M 12 18 A 18 18 0 0 1 28 8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );

    case "loss-aversion":
      // Asymmetric balance scale where -$100 weighs heavily against +$100
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#fdf6ee" />

          {/* Base & Fulcrum Pillar */}
          <polygon points="200,100 185,240 215,240" fill="#b6bec6" stroke="#2b2622" strokeWidth="3.5" />
          <rect x="150" y="235" width="100" height="18" rx="6" fill="#8a9299" stroke="#2b2622" strokeWidth="3.5" />
          <circle cx="200" cy="100" r="10" fill="#ffd152" stroke="#2b2622" strokeWidth="3" />

          {/* Tilted Balance Beam (tilted down to the left due to heavy loss!) */}
          <g transform="rotate(16 200 100)">
            <rect x="70" y="96" width="260" height="8" rx="4" fill="#2b2622" />

            {/* Left Hanging Pan (HEAVY LOSS) */}
            <line x1="90" y1="100" x2="70" y2="150" stroke="#2b2622" strokeWidth="2.5" />
            <line x1="90" y1="100" x2="110" y2="150" stroke="#2b2622" strokeWidth="2.5" />
            <path d="M 60 150 Q 90 165 120 150 Z" fill="#b6bec6" stroke="#2b2622" strokeWidth="3" />
            {/* Dense Iron Loss Weight: -$100 */}
            <rect x="72" y="115" width="36" height="34" rx="4" fill="#ee9976" stroke="#2b2622" strokeWidth="3" />
            <text x="76" y="137" fill="#621a00" fontSize="13" fontWeight="900" fontFamily="sans-serif">-$100</text>

            {/* Right Hanging Pan (LIGHT GAIN) */}
            <line x1="310" y1="100" x2="290" y2="150" stroke="#2b2622" strokeWidth="2.5" />
            <line x1="310" y1="100" x2="330" y2="150" stroke="#2b2622" strokeWidth="2.5" />
            <path d="M 280 150 Q 310 165 340 150 Z" fill="#b6bec6" stroke="#2b2622" strokeWidth="3" />
            {/* Equal Nominal Gain Weight: +$100 (buoyant) */}
            <rect x="292" y="115" width="36" height="34" rx="4" fill="#a0d9a1" stroke="#2b2622" strokeWidth="3" />
            <text x="294" y="137" fill="#126827" fontSize="13" fontWeight="900" fontFamily="sans-serif">+$100</text>
          </g>

          {/* 2.1x Empirical Callout Badge */}
          <g transform="translate(165, 40)">
            <rect x="0" y="0" width="70" height="28" rx="14" fill="#fe9ea6" stroke="#2b2622" strokeWidth="2.5" />
            <text x="14" y="18" fill="#380510" fontSize="12" fontWeight="900" fontFamily="sans-serif">2.1x Loss</text>
          </g>
        </svg>
      );

    case "bystander-effect":
      // Group of observers with one brave citizen stepping forward
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f8f1e5" />

          {/* Sidewalk pavement line */}
          <line x1="40" y1="230" x2="360" y2="230" stroke="#d5c6b0" strokeWidth="4" strokeLinecap="round" />

          {/* Bystander 1 (Passive Observer on left) */}
          <g transform="translate(70, 110)">
            <circle cx="20" cy="20" r="14" fill="#f7dfbe" stroke="#2b2622" strokeWidth="2.5" />
            <path d="M 5 45 C 5 35 35 35 35 45 L 38 100 L 2 100 Z" fill="#a9b4bd" stroke="#2b2622" strokeWidth="2.5" />
            <circle cx="24" cy="19" r="2" fill="#2b2622" />
          </g>

          {/* Bystander 2 (Passive Observer in center-left) */}
          <g transform="translate(125, 95)">
            <circle cx="20" cy="20" r="14" fill="#f7dfbe" stroke="#2b2622" strokeWidth="2.5" />
            <path d="M 5 45 C 5 35 35 35 35 45 L 38 115 L 2 115 Z" fill="#b6bec6" stroke="#2b2622" strokeWidth="2.5" />
            <circle cx="24" cy="19" r="2" fill="#2b2622" />
          </g>

          {/* Active Citizen stepping forward (in vibrant orange-rose coat) */}
          <g transform="translate(230, 80)">
            {/* Head */}
            <circle cx="25" cy="22" r="18" fill="#f7dfbe" stroke="#2b2622" strokeWidth="3" />
            <path d="M 12 18 C 12 5 38 5 38 18 Z" fill="#eed078" stroke="#2b2622" strokeWidth="2.5" />
            <circle cx="31" cy="22" r="2.5" fill="#2b2622" />
            {/* Forward Leaning Torso */}
            <path d="M 8 50 C 8 40 45 35 50 50 L 55 140 L 0 140 Z" fill="#f095d2" stroke="#2b2622" strokeWidth="3" />
            {/* Extended Helpful Hand */}
            <path d="M 45 70 L 80 90 L 85 85" stroke="#2b2622" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="85" cy="85" rx="5" ry="4" fill="#f7dfbe" stroke="#2b2622" strokeWidth="2" />
          </g>

          {/* Dropped Books / Incident on right */}
          <g transform="translate(310, 195)">
            <rect x="0" y="15" width="40" height="12" rx="2" fill="#d5bcfe" stroke="#2b2622" strokeWidth="2" transform="rotate(-15)" />
            <rect x="8" y="20" width="38" height="10" rx="2" fill="#98dcfa" stroke="#2b2622" strokeWidth="2" />
          </g>
        </svg>
      );

    case "first-principles":
      // Atomic clockwork gear deconstruction
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f6fcf3" />

          {/* Outer Legacy Box dismantled into dotted guidelines */}
          <rect x="70" y="50" width="260" height="180" rx="20" stroke="#8dbd39" strokeWidth="3" strokeDasharray="8 6" fill="none" />

          {/* Central Fundamental Golden Gear */}
          <g transform="translate(200, 140)">
            <circle cx="0" cy="0" r="45" fill="#ffd152" stroke="#2b2622" strokeWidth="3.5" />
            <circle cx="0" cy="0" r="16" fill="#8dbd39" stroke="#2b2622" strokeWidth="3" />
            {/* Gear Cogs */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <rect
                  key={i}
                  x="-6"
                  y="-55"
                  width="12"
                  height="12"
                  rx="2"
                  fill="#ffd152"
                  stroke="#2b2622"
                  strokeWidth="2.5"
                  transform={`rotate(${angle})`}
                />
              );
            })}
          </g>

          {/* Core Atomic Particle Orbits (Physics foundation) */}
          <ellipse cx="200" cy="140" rx="80" ry="24" stroke="#007098" strokeWidth="2" strokeDasharray="4 4" fill="none" transform="rotate(30 200 140)" />
          <ellipse cx="200" cy="140" rx="80" ry="24" stroke="#007098" strokeWidth="2" strokeDasharray="4 4" fill="none" transform="rotate(-30 200 140)" />
          <circle cx="130" cy="100" r="5" fill="#7cd0c5" />
          <circle cx="270" cy="180" r="5" fill="#7cd0c5" />
        </svg>
      );

    case "occams-razor":
      // Quill cutting through tangled yarn knot to draw a straight line
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#fdfbf5" />

          {/* Tangled Over-Complicated Spaghetti Loops (cut through) */}
          <path
            d="M 50 150 C 90 80 130 220 180 120 C 220 50 140 70 200 160 C 240 220 280 90 350 140"
            stroke="#d5c6b0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Clean, Direct Golden Path cut by Occam's Razor */}
          <line x1="50" y1="140" x2="350" y2="140" stroke="#e0da7a" strokeWidth="6" strokeLinecap="round" />

          {/* Antique Feather Quill / Razor cutting through center */}
          <g transform="translate(190, 70) rotate(35)">
            {/* Feather */}
            <path
              d="M 0 0 C 15 20 20 60 5 100 L 0 115 L -5 100 C -20 60 -15 20 0 0 Z"
              fill="#eed078"
              stroke="#2b2622"
              strokeWidth="3"
            />
            <line x1="0" y1="10" x2="0" y2="115" stroke="#2b2622" strokeWidth="2" />
            {/* Nib Razor Tip */}
            <polygon points="0,115 -4,125 0,132 4,125" fill="#3d5a80" stroke="#2b2622" strokeWidth="2" />
          </g>

          {/* Spark of Simplicity */}
          <circle cx="200" cy="140" r="8" fill="#ffd152" stroke="#2b2622" strokeWidth="2.5" />
        </svg>
      );

    case "predictive-brain":
    default:
      // Profile of brain projecting top-down prediction waves
      return (
        <svg viewBox="0 0 400 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="280" rx="16" fill="#f5f7fc" />

          {/* Head Outline in Profile */}
          <path
            d="M 130 180 C 110 130 150 60 230 60 C 290 60 310 100 310 150 C 310 168 320 178 315 190 C 305 200 290 200 290 215 C 290 230 270 240 245 240 L 245 280 L 170 280 L 170 240 C 140 240 130 210 130 180 Z"
            fill="#f7dfbe"
            stroke="#2b2622"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Brain with Hierarchical Neural Waves */}
          <path
            d="M 170 140 C 160 100 210 80 250 90 C 280 100 285 130 270 150 C 255 170 220 170 190 165 Z"
            fill="#97b5f6"
            stroke="#2b2622"
            strokeWidth="3"
          />

          {/* Top-Down Generative Prediction Waves (Downward blue arcs) */}
          <path d="M 200 110 A 30 30 0 0 1 250 110" stroke="#004d96" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 190 125 A 45 45 0 0 1 260 125" stroke="#004d96" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Bottom-Up Sensory Error Signals (Upward yellow pulses) */}
          <line x1="285" y1="170" x2="265" y2="145" stroke="#e0da7a" strokeWidth="3" strokeLinecap="round" />
          <line x1="295" y1="175" x2="275" y2="150" stroke="#e0da7a" strokeWidth="3" strokeLinecap="round" />

          {/* Eye taking in light */}
          <circle cx="295" cy="140" r="4" fill="#2b2622" />
        </svg>
      );
  }
}
