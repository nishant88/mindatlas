"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  Network,
  Search,
  Filter,
  ArrowRight,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
  CheckCircle2,
  BookOpen
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import { getKnowledgeGraph } from "@/lib/api";
import { DISCIPLINES } from "@/lib/mindAtlasData";

function KnowledgeGraphContent() {
  const [graphData, setGraphData] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedRelType, setSelectedRelType] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getKnowledgeGraph(
        undefined,
        2,
        selectedRelType === "All" ? undefined : selectedRelType
      );
      setGraphData(data);
      if (data?.nodes?.length > 0 && !selectedNode) {
        setSelectedNode(data.nodes[0]);
      }
      setLoading(false);
    }
    load();
  }, [selectedRelType]);

  const relationshipTypes = [
    "All",
    "related_to",
    "prerequisite_of",
    "supports",
    "extends",
    "critiques",
    "applies_to"
  ];

  const nodePositions: { [id: string]: { x: number; y: number } } = {
    "1": { x: 340, y: 180 }, // Cognitive Dissonance
    "2": { x: 480, y: 140 }, // Confirmation Bias
    "3": { x: 620, y: 220 }, // Motivated Reasoning
    "4": { x: 600, y: 360 }, // Epistemology
    "5": { x: 430, y: 420 }, // Falsificationism
    "6": { x: 260, y: 320 }, // Prospect Theory
    "7": { x: 200, y: 160 }, // Dual Process Theory
    "8": { x: 380, y: 70 },  // Bystander Effect
  };

  const getDisciplineColor = (disc: string) => {
    switch (disc) {
      case "Psychology":
        return "#d5bcfe"; // Lavender
      case "Cognitive Science":
        return "#98dcfa"; // Sky Blue
      case "Philosophy":
        return "#e0da7a"; // Gold
      case "Scientific Reasoning":
        return "#7cd0c5"; // Teal
      case "Behavioral Economics":
        return "#ee9976"; // Coral
      default:
        return "#b6bec6";
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            Interconnected Conceptual Architecture
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            MindAtlas Knowledge Graph
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Explore topological relationships between psychological mechanisms, cognitive biases, and philosophical foundations. Click any node to inspect definitions and evidence linkages.
          </p>

          {/* Relationship filter badges */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {relationshipTypes.map((rt) => (
              <button
                key={rt}
                onClick={() => setSelectedRelType(rt)}
                className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  selectedRelType === rt
                    ? "bg-[#d5cf66] text-[#232402]"
                    : "bg-[#272220] border border-[#3d3532] text-[#b8ada2] hover:text-[#f2ebe2]"
                }`}
              >
                {rt.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Main Canvas + Side Inspector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[580px]">
          {/* Interactive Canvas Area */}
          <div className="lg:col-span-2 rounded-3xl border border-[#3d3532] bg-[#272220] p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Top legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#b8ada2] z-10 bg-[#1e1a17]/90 backdrop-blur-md p-2.5 rounded-2xl border border-[#3d3532] w-fit">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#d5bcfe]"></span> Psychology</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#98dcfa]"></span> Cognitive Science</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#e0da7a]"></span> Philosophy</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7cd0c5]"></span> Science</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ee9976]"></span> Economics</span>
            </div>

            {/* SVG Graph Visualization with dot grid */}
            <div className="w-full h-[460px] flex items-center justify-center my-auto overflow-hidden bg-dot-matrix rounded-2xl border border-[#3d3532]/60 mt-4">
              <svg viewBox="0 0 800 500" className="w-full h-full select-none">
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#82756a" />
                  </marker>
                </defs>

                {/* Relationship Links */}
                {graphData?.links?.map((link: any) => {
                  const sPos = nodePositions[link.source] || { x: 200, y: 200 };
                  const tPos = nodePositions[link.target] || { x: 400, y: 400 };
                  const isHighlighted =
                    selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);

                  return (
                    <g key={link.id} className="transition-all">
                      <line
                        x1={sPos.x}
                        y1={sPos.y}
                        x2={tPos.x}
                        y2={tPos.y}
                        stroke={isHighlighted ? "#d5cf66" : "#3d3532"}
                        strokeWidth={isHighlighted ? 3 : 1.5}
                        strokeDasharray={link.relationship_type === "critiques" ? "4,4" : undefined}
                        markerEnd="url(#arrow)"
                      />
                      <text
                        x={(sPos.x + tPos.x) / 2}
                        y={(sPos.y + tPos.y) / 2 - 4}
                        textAnchor="middle"
                        className="text-[10px] fill-[#82756a] font-sans font-medium tracking-wide"
                      >
                        {link.relationship_type.replace(/_/g, " ")}
                      </text>
                    </g>
                  );
                })}

                {/* Concept Nodes */}
                {graphData?.nodes?.map((node: any) => {
                  const pos = nodePositions[node.id] || { x: 400, y: 250 };
                  const isSelected = selectedNode?.id === node.id;
                  const nodeColor = getDisciplineColor(node.discipline);

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer group"
                    >
                      {/* Outer pulse when selected */}
                      {isSelected && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={24}
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth={2}
                          strokeOpacity={0.6}
                          className="animate-pulse"
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 16 : 13}
                        fill={nodeColor}
                        stroke={isSelected ? "#ffffff" : "#2b2622"}
                        strokeWidth={3}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />

                      {/* Node label */}
                      <text
                        x={pos.x}
                        y={pos.y + 26}
                        textAnchor="middle"
                        className={`text-xs font-heading font-black transition-colors ${
                          isSelected
                            ? "fill-[#f2ebe2] font-black"
                            : "fill-[#b8ada2] group-hover:fill-[#f2ebe2]"
                        }`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-xs text-[#82756a] text-right mt-3">
              Displaying {graphData?.total_nodes || 8} concepts • {graphData?.total_links || 6} verified topological relationships
            </div>
          </div>

          {/* Node Inspector Sidebar Panel with Dashed Sketched Border */}
          <div className="rounded-3xl border-2 border-dashed border-[#d5cf66] bg-[#272220] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            {selectedNode ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="font-bold px-3 py-1 rounded-full text-[#1f1438]"
                    style={{ backgroundColor: getDisciplineColor(selectedNode.discipline) }}
                  >
                    {selectedNode.discipline}
                  </span>
                  <span className="capitalize text-[#82756a] text-xs font-bold">
                    {selectedNode.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-black text-[#f2ebe2]">
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-[#82756a] mt-1">
                    Importance Rank: #{selectedNode.importance_rank} in Human Knowledge Catalog
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                  <span className="font-bold text-[#d5cf66] uppercase tracking-wider text-[10px] block mb-1">
                    Formal Definition:
                  </span>
                  {selectedNode.short_definition}
                </div>

                {/* Intellectual Linkages */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-black text-[#f2ebe2] uppercase tracking-wider">
                    Intellectual Linkages
                  </h4>
                  <div className="space-y-2 text-xs">
                    {graphData?.links
                      ?.filter((l: any) => l.source === selectedNode.id || l.target === selectedNode.id)
                      .map((rel: any) => {
                        const isSource = rel.source === selectedNode.id;
                        const otherId = isSource ? rel.target : rel.source;
                        const otherNode = graphData.nodes.find((n: any) => n.id === otherId);

                        return (
                          <div
                            key={rel.id}
                            className="p-3 rounded-xl border border-[#3d3532] bg-[#1e1a17]/70"
                          >
                            <div className="flex items-center gap-1.5 font-bold text-[#f2ebe2]">
                              <span className="text-[#d5cf66] font-mono text-[11px]">
                                {rel.relationship_type.replace(/_/g, " ")}
                              </span>
                              <span>&rarr;</span>
                              <span>{otherNode?.name}</span>
                            </div>
                            <p className="text-[11px] text-[#82756a] mt-1">{rel.rationale}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-[#82756a]">
                <Info className="w-8 h-8 mx-auto mb-2 text-[#d5cf66]" />
                <p className="text-sm">Click any node to inspect concept connections</p>
              </div>
            )}

            {/* Link to Deep-Dive Article */}
            <div className="pt-6 mt-6 border-t border-[#3d3532]">
              <Link
                href="/articles/cognitive-dissonance-and-belief-perseverance"
                className="w-full py-3 px-4 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Deep-Dive Article</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeGraphPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading Knowledge Graph...</div>}>
      <KnowledgeGraphContent />
    </Suspense>
  );
}
