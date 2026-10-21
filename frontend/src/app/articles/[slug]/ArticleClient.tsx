"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  RotateCcw,
  Check,
  Info
} from "lucide-react";
import { getArticleBySlug } from "@/lib/api";
import { MENTAL_MODELS, DISCIPLINES } from "@/lib/mindAtlasData";
import Illustration from "@/components/Illustrations";
import DotMeter from "@/components/DotMeter";
import RainbowStrip from "@/components/RainbowStrip";
import MentalModelCard from "@/components/MentalModelCard";

export default function ArticleClient() {
  const params = useParams();
  const slug = (params?.slug as string) || "cognitive-dissonance-and-belief-perseverance";

  const [article, setArticle] = useState<any>(null);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Match corresponding rich model in mindAtlasData
  const localModel = MENTAL_MODELS.find((m) => m.slug === slug) || MENTAL_MODELS[0];

  useEffect(() => {
    async function load() {
      const data = await getArticleBySlug(slug);
      setArticle(data);
    }
    load();
  }, [slug]);

  if (!article) {
    return (
      <div className="py-24 text-center text-[#b8ada2] space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#d5cf66] border-t-transparent animate-spin mx-auto"></div>
        <p className="text-sm font-medium">Retrieving synthesized mental model with verified citations...</p>
      </div>
    );
  }

  const disciplineMeta = DISCIPLINES.find(
    (d) => d.label.toLowerCase() === (article.primary_discipline || "").toLowerCase()
  ) || DISCIPLINES[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCard = (index: number) => {
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const relatedModels = MENTAL_MODELS.filter((m) => m.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Navigation Bar */}
      <div className="border-b border-[#3d3532] bg-[#171412]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#b8ada2] hover:text-[#f2ebe2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Library</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSaved(!saved)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#3d3532] bg-[#272220] text-[#b8ada2] hover:text-[#f2ebe2] transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-[#d5cf66] text-[#d5cf66]" : ""}`} />
              <span>{saved ? "Saved" : "Save Model"}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#3d3532] bg-[#272220] text-[#b8ada2] hover:text-[#f2ebe2] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Top Hero: Vector Illustration & Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Vector Illustration */}
          <div className="md:col-span-6 rounded-3xl overflow-hidden bg-[#f6efe1] border border-[#3d3532] shadow-2xl aspect-[4/3]">
            <Illustration
              name={localModel.illustration}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Empirical Consensus Meter */}
          <div className="md:col-span-6 flex flex-col justify-between h-full gap-6">
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: disciplineMeta.color,
                    color: disciplineMeta.textDark,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: disciplineMeta.dot }}
                  />
                  {article.primary_discipline || localModel.disciplineLabel}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9f9488]">
                  {localModel.conceptType}
                </span>
                <span className="text-xs text-[#82756a] ml-auto flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.reading_time_mins || 12} min read
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#f2ebe2] tracking-tight mb-3">
                {article.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base text-[#b8ada2] leading-relaxed">
                {article.subtitle || localModel.subtitle}
              </p>
            </div>

            {/* Empirical Replication Meter in Sketched Dashed Border */}
            <div className="p-5 rounded-2xl bg-[#272220] border-2 border-dashed border-[#d5cf66] flex flex-col sm:flex-row items-center gap-5">
              <DotMeter
                percentage={localModel.empiricalReplicationPercentage}
                color={disciplineMeta.color}
                mutedColor="#3d3532"
                size="md"
              />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#82756a] mb-1">
                  Empirical Replication Consensus
                </div>
                <div
                  className="text-sm font-black leading-snug"
                  style={{ color: disciplineMeta.color }}
                >
                  {localModel.replicationPunchline}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        {article.why_it_matters && (
          <div className="p-8 rounded-3xl bg-[#272220] border border-[#3d3532]">
            <div className="flex items-center gap-2.5 mb-3 text-[#d5cf66]">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-heading text-xl font-black text-[#f2ebe2]">Why it matters</h2>
            </div>
            <p className="text-sm sm:text-base text-[#b8ada2] leading-relaxed">
              {article.why_it_matters}
            </p>
          </div>
        )}

        {/* Breakdown: Core Mechanism & Concrete Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mechanism */}
          <div className="p-8 rounded-3xl bg-[#272220] border border-[#3d3532]">
            <div className="flex items-center gap-2.5 mb-3 text-[#98dcfa]">
              <Info className="w-5 h-5" />
              <h3 className="font-heading text-xl font-black text-[#f2ebe2]">The underlying mechanism</h3>
            </div>
            <p className="text-sm text-[#b8ada2] leading-relaxed">
              {article.detailed_explanation || localModel.coreMechanism}
            </p>
          </div>

          {/* Everyday Concrete Examples */}
          <div className="p-8 rounded-3xl bg-[#272220] border border-[#3d3532]">
            <div className="flex items-center gap-2.5 mb-3 text-[#ee936b]">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-heading text-xl font-black text-[#f2ebe2]">Concrete real-world scenarios</h3>
            </div>
            <ul className="space-y-3">
              {(article.concrete_examples || localModel.everydayExamples).map((ex: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ee936b] mt-1.5 shrink-0" />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Misconceptions (Myth vs Reality) */}
        {localModel.commonMisconceptions && (
          <div className="p-8 rounded-3xl bg-[#283a2e] border border-[#384f3f]">
            <div className="flex items-center gap-2.5 mb-6 text-[#5cb87a]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-heading text-xl font-black text-[#f2ebe2]">Common misconceptions debunked</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {localModel.commonMisconceptions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#1e1a17]/80 border border-[#384f3f]/60 space-y-2">
                  <div className="text-xs font-bold text-[#fe9ea6] uppercase tracking-wide">
                    Misconception:
                  </div>
                  <div className="text-xs text-[#f2ebe2] font-semibold">
                    &ldquo;{item.misconception}&rdquo;
                  </div>
                  <div className="text-xs font-bold text-[#a0d9a1] uppercase tracking-wide pt-2">
                    Empirical Reality:
                  </div>
                  <div className="text-xs text-[#b8ada2] leading-relaxed">
                    {item.reality}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practical Debiasing Applications */}
        <div className="p-8 rounded-3xl bg-[#272220] border border-[#3d3532]">
          <div className="flex items-center gap-2.5 mb-4 text-[#d5cf66]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-heading text-xl font-black text-[#f2ebe2]">Practical applications & protocols</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(article.practical_applications || localModel.practicalApplications).map((app: string, idx: number) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-xs text-[#b8ada2] leading-relaxed">
                <span className="font-bold text-[#d5cf66] block mb-1">Protocol {idx + 1}</span>
                {app}
              </div>
            ))}
          </div>
        </div>

        {/* Claim-Level Peer-Reviewed Citation */}
        <div className="p-6 rounded-2xl bg-[#171412] border border-[#3d3532] flex items-start gap-4">
          <BookOpen className="w-5 h-5 text-[#ee936b] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#82756a]">
              Peer-Reviewed Primary Citation & Claim-Level Traceability
            </div>
            <p className="text-sm text-[#b8ada2] font-mono">
              {localModel.scientificCitation.author} ({localModel.scientificCitation.year}). &ldquo;{localModel.scientificCitation.title}&rdquo;. <em>{localModel.scientificCitation.journalOrBook}</em>.
            </p>
          </div>
        </div>

        {/* Spaced Repetition Flashcards */}
        {article.flashcards && article.flashcards.length > 0 && (
          <div className="pt-4">
            <h3 className="font-heading text-2xl font-black text-[#f2ebe2] mb-6">
              Active Recall Flashcards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {article.flashcards.map((fc: any, idx: number) => {
                const isFlipped = flippedCards[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCard(idx)}
                    className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] hover:border-[#574d48] text-left transition-all flex flex-col justify-between min-h-[160px] cursor-pointer"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#d5cf66] mb-2">
                        {isFlipped ? "Answer" : "Question (Click to flip)"}
                      </div>
                      <div className="font-heading text-base font-bold text-[#f2ebe2]">
                        {isFlipped ? fc.back : fc.front}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#82756a] mt-4">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{isFlipped ? "Click to view question" : "Click to check answer"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Mental Models */}
        <div className="pt-8 border-t border-[#3d3532]">
          <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2] tracking-tight mb-6">
            Related Mental Models
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedModels.map((item) => (
              <MentalModelCard key={item.id} model={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
