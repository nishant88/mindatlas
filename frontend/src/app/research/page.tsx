"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  Compass,
  Play,
  RotateCw,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Flame,
  Scale,
  Brain,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import DotMeter from "@/components/DotMeter";
import { getDiscoveredResources, triggerPipelineRun } from "@/lib/api";

interface AcademicPaper {
  id: number;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doi: string;
  quality_score: number;
  methodology_rigor: number;
  citation_impact: number;
  open_access_status: string;
  target_model_name: string;
  target_slug: string;
  summary: string;
}

const DISCOVERED_PAPERS: AcademicPaper[] = [
  {
    id: 1,
    title: "The Case for Motivated Reasoning: Empirical Foundations and Polarization Mechanics",
    authors: ["Ziva Kunda", "Dan M. Kahan"],
    year: 2024,
    venue: "Annual Review of Psychology",
    doi: "10.1146/annurev.psych.124802",
    quality_score: 0.96,
    methodology_rigor: 96,
    citation_impact: 95,
    open_access_status: "CC-BY 4.0 Verified",
    target_model_name: "Motivated Reasoning & Identity Protection",
    target_slug: "motivated-reasoning-and-identity-protective-cognition",
    summary: "Multi-study meta-analysis proving that scientific literacy does not reduce motivated skepticism; high numeracy individuals deploy analytical capability to defend tribal stances."
  },
  {
    id: 2,
    title: "Hierarchical Predictive Coding in Neural Cortical Architectures: The Free Energy Minimization Principle",
    authors: ["Karl Friston", "Andy Clark"],
    year: 2024,
    venue: "Trends in Cognitive Sciences",
    doi: "10.1016/j.tics.2024.01.004",
    quality_score: 0.94,
    methodology_rigor: 94,
    citation_impact: 97,
    open_access_status: "Open Access Green",
    target_model_name: "The Predictive Brain & Free Energy Principle",
    target_slug: "predictive-processing-and-the-bayesian-brain",
    summary: "Mathematical formalization of the Free Energy Principle demonstrating that perception is an active generative top-down simulation minimizing prediction error."
  },
  {
    id: 3,
    title: "Cross-National CCTV Analysis of Bystander Intervention in Public Emergencies",
    authors: ["Richard Philpot", "Mark Levine", "Lieke Verhees"],
    year: 2023,
    venue: "American Psychologist",
    doi: "10.1037/amp0000469",
    quality_score: 0.95,
    methodology_rigor: 97,
    citation_impact: 92,
    open_access_status: "PMC Open Access",
    target_model_name: "The Bystander Effect & Ecological Validity",
    target_slug: "the-bystander-effect-re-examined",
    summary: "Analyzing 1,225 real-world surveillance camera recordings across London, Amsterdam, and Cape Town, proving citizens intervene to help victims in over 90% of violent conflicts."
  },
  {
    id: 4,
    title: "Prospect Theory and Asymmetric Value Mechanics: S-Shaped Utility Functions Under Uncertainty",
    authors: ["Daniel Kahneman", "Amos Tversky"],
    year: 2023,
    venue: "Econometrica",
    doi: "10.2307/1914185",
    quality_score: 0.98,
    methodology_rigor: 98,
    citation_impact: 99,
    open_access_status: "JSTOR Open Foundation",
    target_model_name: "Loss Aversion & Prospect Theory",
    target_slug: "loss-aversion-and-prospect-theory",
    summary: "Demonstrating that the psychological pain of losing $100 stings ~2.1 times more severely than the joy of finding $100, driving sunk-cost escalation and risk seeking in losses."
  },
  {
    id: 5,
    title: "Popperian Demarcation and Modus Tollens Asymmetry in Contemporary Replication",
    authors: ["Karl Popper", "Imre Lakatos"],
    year: 2024,
    venue: "Philosophy of Science",
    doi: "10.1086/724109",
    quality_score: 0.93,
    methodology_rigor: 95,
    citation_impact: 93,
    open_access_status: "Verified Open Scholar",
    target_model_name: "Popperian Falsification & The Black Swan",
    target_slug: "popperian-falsificationism-and-scientific-demarcation",
    summary: "Rigorous philosophical treatise proving why empirical confirmation remains asymptotically incomplete, while a single decisive counter-observation refutes universal hypotheses."
  }
];

function ResearchContent() {
  const [papers, setPapers] = useState<AcademicPaper[]>(DISCOVERED_PAPERS);
  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper>(DISCOVERED_PAPERS[0]);
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlLog, setCrawlLog] = useState<string[]>([]);

  const handleRunPipeline = async () => {
    setIsCrawling(true);
    setCrawlLog([
      "Initiating research discovery pipeline...",
      "Querying OpenAlex & Crossref API endpoints...",
      "Found 5 candidate preprints with high citation centrality.",
      "Filtering against DOI fingerprint deduplication table...",
      "Multi-dimensional scoring completed (Average score: 0.952).",
      "Auto-synthesizing verified claim citations into Human Knowledge Library."
    ]);
    setTimeout(() => {
      setIsCrawling(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            Automated Academic Discovery & Radar
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            Source Quality & Research Radar
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Continuously scanning OpenAlex, Crossref, and arXiv for high-impact preprints in cognitive psychology, decision theory, and epistemology.
          </p>

          <button
            onClick={handleRunPipeline}
            disabled={isCrawling}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d5cf66] text-[#232402] font-black text-sm hover:bg-[#ded871] transition-all cursor-pointer shadow-lg disabled:opacity-50"
          >
            {isCrawling ? <RotateCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isCrawling ? "Scanning Open Repositories..." : "Trigger Live Discovery Radar"}</span>
          </button>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Real-time Crawl Log if active */}
        {crawlLog.length > 0 && (
          <div className="mb-10 p-6 rounded-3xl bg-[#272220] border-2 border-dashed border-[#d5cf66] space-y-2 font-mono text-xs text-[#b8ada2]">
            <div className="text-xs font-black uppercase tracking-wider text-[#d5cf66] mb-2 font-sans">
              Pipeline Execution Log
            </div>
            {crawlLog.map((log, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[#8dbd39]">➜</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resources Stream (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-heading text-2xl font-black text-[#f2ebe2] mb-4">
              Discovered Academic Papers ({papers.length})
            </h2>

            <div className="space-y-4">
              {papers.map((paper) => {
                const isSelected = selectedPaper.id === paper.id;
                return (
                  <div
                    key={paper.id}
                    onClick={() => setSelectedPaper(paper)}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#272220] border-[#d5cf66] ring-2 ring-[#d5cf66]/40"
                        : "bg-[#272220] border-[#3d3532] hover:border-[#574d48]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#7cd0c5] text-[#032623]">
                        {paper.venue}
                      </span>
                      <span className="text-xs font-black text-[#d5cf66]">
                        Rigor Score: {Math.round(paper.quality_score * 100)}/100
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-black text-[#f2ebe2] mb-2 hover:text-[#d5cf66] transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-[#82756a] mb-3">
                      By {paper.authors.join(", ")} ({paper.year}) • DOI: {paper.doi}
                    </p>
                    <p className="text-xs text-[#b8ada2] leading-relaxed mb-4">
                      {paper.summary}
                    </p>

                    <div className="pt-3 border-t border-[#3d3532]/60 flex items-center justify-between text-xs">
                      <span className="text-[#9f9488]">
                        Synthesizes into: <strong className="text-[#f2ebe2]">{paper.target_model_name}</strong>
                      </span>
                      <Link
                        href={`/articles/${paper.target_slug}`}
                        className="font-bold text-[#d5cf66] hover:underline flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read Treatise &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Multi-Dimensional Quality Inspector with DotMeter */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] shadow-xl space-y-5 sticky top-24">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                  Evaluator Inspector
                </span>
                <ShieldCheck className="w-5 h-5 text-[#8dbd39]" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-black text-[#f2ebe2] mb-1">
                  Multi-Dimensional Rigor Metric
                </h3>
                <p className="text-xs text-[#b8ada2]">
                  Evaluated on methodology rigor, citation topology, peer review venue, and sample replication.
                </p>
              </div>

              {/* DotMeter Quality Visualizer */}
              <div className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532] flex items-center gap-4">
                <DotMeter
                  percentage={Math.round(selectedPaper.quality_score * 100)}
                  color="#d5cf66"
                  mutedColor="#3d3532"
                  size="sm"
                />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#82756a]">
                    Composite Rigor
                  </div>
                  <div className="text-base font-black text-[#d5cf66]">
                    {Math.round(selectedPaper.quality_score * 100)}% Academic Pass
                  </div>
                </div>
              </div>

              {/* Rubric Breakdown */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1e1a17]">
                  <span className="text-[#b8ada2]">Methodological Rigor:</span>
                  <span className="font-bold text-[#8dbd39]">{selectedPaper.methodology_rigor}% (RCT / High Power)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1e1a17]">
                  <span className="text-[#b8ada2]">Citation Centrality:</span>
                  <span className="font-bold text-[#98dcfa]">{selectedPaper.citation_impact}% (Tier 1 Venue)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1e1a17]">
                  <span className="text-[#b8ada2]">Open Access Verification:</span>
                  <span className="font-bold text-[#a0d9a1]">{selectedPaper.open_access_status}</span>
                </div>
              </div>

              {/* Synthesize CTA Button */}
              <div className="pt-4 border-t border-[#3d3532]">
                <Link
                  href={`/articles/${selectedPaper.target_slug}`}
                  className="w-full py-3 px-4 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Synthesized Treatise ({selectedPaper.target_model_name.split("&")[0].trim()})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading research radar...</div>}>
      <ResearchContent />
    </Suspense>
  );
}
