"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Info,
  Scale,
  Brain,
  History,
  FlaskConical,
  ShieldAlert,
  HelpCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Maximize2,
  Type,
  Layers,
  GraduationCap
} from "lucide-react";
import { MENTAL_MODELS, DISCIPLINES } from "@/lib/mindAtlasData";
import { getComprehensiveArticle, ComprehensiveArticle } from "@/lib/comprehensiveArticles";
import Illustration from "@/components/Illustrations";
import DotMeter from "@/components/DotMeter";
import RainbowStrip from "@/components/RainbowStrip";
import MentalModelCard from "@/components/MentalModelCard";

export default function ArticleClient() {
  const params = useParams();
  const slug = (params?.slug as string) || "cognitive-dissonance-and-belief-perseverance";

  // Retrieve comprehensive, full-length scholarly treatise
  const article: ComprehensiveArticle = useMemo(() => {
    return getComprehensiveArticle(slug);
  }, [slug]);

  // Reader state
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [fontFamily, setFontFamily] = useState<"sans" | "serif">("sans");
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: number]: boolean }>({});
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Track reading progress on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const disciplineMeta = DISCIPLINES.find(
    (d) => d.id === article.discipline || d.label.toLowerCase() === article.disciplineLabel.toLowerCase()
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

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [qIndex]: true }));
  };

  // Section Jump targets for Table of Contents
  const sections = [
    { id: "overview", label: "Epistemic Thesis & Summary", icon: Sparkles },
    { id: "objectives", label: "Learning Objectives & Prerequisites", icon: GraduationCap },
    { id: "narrative", label: "Intuitive Walkthrough", icon: Lightbulb },
    { id: "mechanisms", label: "Neurocomputational Architecture", icon: Brain },
    { id: "history", label: "Historical Genesis & Thinkers", icon: History },
    { id: "experiments", label: "Landmark Empirical Experiments", icon: FlaskConical },
    { id: "cases", label: "High-Stakes Domain Case Studies", icon: FileText },
    { id: "misconceptions", label: "Misconceptions Debunked", icon: AlertTriangle },
    { id: "critiques", label: "Scholarly Critiques & Counterarguments", icon: Scale },
    { id: "protocols", label: "Institutional Debiasing Protocols", icon: ShieldAlert },
    { id: "citations", label: "Claim-Level Traceable Citations", icon: BookOpen },
    { id: "active-recall", label: "Active Recall & Conceptual Self-Test", icon: RotateCcw },
    { id: "further-reading", label: "Annotated Academic Further Reading", icon: Layers },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const relatedModels = MENTAL_MODELS.filter((m) => m.slug !== slug).slice(0, 3);

  // Dynamic typography styles
  const proseSizeClasses = {
    normal: "text-[16px] sm:text-[17px] leading-[1.8]",
    large: "text-[18px] sm:text-[19px] leading-[1.85]",
    xl: "text-[20px] sm:text-[21px] leading-[1.9]",
  }[fontSize];

  const proseFamilyClasses = fontFamily === "serif" ? "font-serif text-[#f0e8dc]" : "font-sans text-[#e5dbcf]";

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2] selection:bg-[#d5cf66]/30 selection:text-[#f6efe1]">
      {/* Scroll Reading Progress Bar at Very Top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#272220] z-50">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${readingProgress}%`,
            backgroundColor: disciplineMeta.color,
          }}
        />
      </div>

      {/* Reader Navigation & Customization Toolbar */}
      <header className="sticky top-0 z-40 border-b border-[#3d3532] bg-[#171412]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Breadcrumb / Back Link */}
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#b8ada2] hover:text-[#f2ebe2] transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#d5cf66]" />
            <span className="hidden sm:inline">Back to Knowledge Library</span>
            <span className="sm:hidden">Library</span>
          </Link>

          {/* Reader Customization Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Font Family Toggle */}
            <div className="flex items-center rounded-full border border-[#3d3532] bg-[#272220] p-0.5 text-xs">
              <button
                onClick={() => setFontFamily("sans")}
                className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                  fontFamily === "sans" ? "bg-[#3d3532] text-[#f2ebe2]" : "text-[#82756a] hover:text-[#b8ada2]"
                }`}
                title="Sans-serif modern typography"
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily("serif")}
                className={`px-2.5 py-1 rounded-full font-serif font-bold transition-all ${
                  fontFamily === "serif" ? "bg-[#3d3532] text-[#f2ebe2]" : "text-[#82756a] hover:text-[#b8ada2]"
                }`}
                title="Serif academic editorial typography"
              >
                Serif
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="hidden md:flex items-center rounded-full border border-[#3d3532] bg-[#272220] p-0.5 text-xs font-bold text-[#82756a]">
              <button
                onClick={() => setFontSize("normal")}
                className={`px-2 py-1 rounded-full ${fontSize === "normal" ? "bg-[#3d3532] text-[#f2ebe2]" : "hover:text-[#b8ada2]"}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-2 py-1 rounded-full text-sm ${fontSize === "large" ? "bg-[#3d3532] text-[#f2ebe2]" : "hover:text-[#b8ada2]"}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize("xl")}
                className={`px-2 py-1 rounded-full text-base ${fontSize === "xl" ? "bg-[#3d3532] text-[#f2ebe2]" : "hover:text-[#b8ada2]"}`}
              >
                A++
              </button>
            </div>

            {/* Save to Reading List Button */}
            <button
              onClick={() => setSaved(!saved)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#3d3532] bg-[#272220] text-[#b8ada2] hover:text-[#f2ebe2] transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-[#d5cf66] text-[#d5cf66]" : ""}`} />
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>

            {/* Share / Copy URL Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#3d3532] bg-[#272220] text-[#b8ada2] hover:text-[#f2ebe2] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Bodily Oddities 9-Discipline Strip */}
      <RainbowStrip />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Article Masthead: Title, Badges, Vector Illustration & Consensus Meter */}
        <div className="border-b border-[#3d3532] pb-12 mb-12 space-y-8">
          {/* Metadata Badges Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold"
              style={{
                backgroundColor: disciplineMeta.color,
                color: disciplineMeta.textDark,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: disciplineMeta.dot }}
              />
              {article.disciplineLabel}
            </span>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#272220] border border-[#3d3532] text-[#9f9488]">
              {article.conceptType}
            </span>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#272220] border border-[#3d3532] text-[#d5cf66]">
              {article.difficultyLevel} Level
            </span>

            <span className="text-xs text-[#82756a] ml-auto flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#d5cf66]" />
              {article.readingTimeMins} min comprehensive read
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#f2ebe2] tracking-tight leading-[1.15]">
              {article.title}
            </h1>
            <p className="text-lg sm:text-xl text-[#b8ada2] leading-relaxed font-normal">
              {article.subtitle}
            </p>
          </div>

          {/* Author, Review & Verification Stamp */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#82756a] pt-2 border-t border-[#3d3532]/60">
            <div>
              <span className="text-[#9f9488] font-bold">Synthesized by:</span> {article.author}
            </div>
            <div>
              <span className="text-[#9f9488] font-bold">Published:</span> {article.publishedDate}
            </div>
            <div>
              <span className="text-[#9f9488] font-bold">Last Reviewed:</span> {article.lastReviewedDate}
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold ml-auto">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{article.peerReviewStatus}</span>
            </div>
          </div>

          {/* Hero Media Grid: Vector Illustration + 10x10 Replication Consensus */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-4">
            {/* Vector Illustration */}
            <div className="md:col-span-7 rounded-3xl overflow-hidden bg-[#f6efe1] border border-[#3d3532] shadow-2xl aspect-[16/10] relative flex items-center justify-center">
              <Illustration
                name={article.illustration}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Empirical Replication Box with 10x10 Matrix */}
            <div className="md:col-span-5 rounded-3xl bg-[#272220] border-2 border-dashed border-[#d5cf66] p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#82756a]">
                    Empirical Replication Consensus
                  </span>
                  <span
                    className="text-sm font-black px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${disciplineMeta.color}30`,
                      color: disciplineMeta.color,
                    }}
                  >
                    {article.empiricalConsensus.percentage}% Meta-Consensus
                  </span>
                </div>
                <h3
                  className="font-heading text-lg font-black leading-snug"
                  style={{ color: disciplineMeta.color }}
                >
                  {article.empiricalConsensus.replicationSummary}
                </h3>
              </div>

              {/* 10x10 Dot Matrix */}
              <div className="py-2 flex justify-center sm:justify-start">
                <DotMeter
                  percentage={article.empiricalConsensus.percentage}
                  color={disciplineMeta.color}
                  mutedColor="#3d3532"
                  size="md"
                />
              </div>

              {/* Statistical Rigor Meta Data */}
              <div className="space-y-1.5 pt-3 border-t border-[#3d3532] text-xs text-[#b8ada2]">
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Sample Size Meta:</span>
                  <span className="font-mono font-bold text-[#f2ebe2]">{article.empiricalConsensus.sampleSizeMeta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Observed Effect Size:</span>
                  <span className="font-mono font-bold text-[#f2ebe2]">{article.empiricalConsensus.effectSizeRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#82756a]">Open Science Registered:</span>
                  <span className="font-bold text-emerald-400">Verified Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Long-Form Two-Column Layout: Sticky Jump Nav (Left) + Expansive Prose (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-6">
            <div className="p-5 rounded-2xl bg-[#272220] border border-[#3d3532]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d5cf66] mb-3">
                <BookOpen className="w-4 h-4" />
                <span>Treatise Contents</span>
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => {
                  const Icon = sec.icon;
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#3d3532] text-[#f2ebe2] shadow-sm"
                          : "text-[#82756a] hover:text-[#b8ada2] hover:bg-[#1e1a17]"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#d5cf66]" : "text-[#82756a]"}`} />
                      <span className="truncate">{sec.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Citation Card */}
            <div className="p-5 rounded-2xl bg-[#171412] border border-[#3d3532] space-y-2.5 text-xs text-[#82756a]">
              <div className="font-bold uppercase tracking-wider text-[#9f9488]">
                Scholarly Indexing
              </div>
              <p className="font-mono text-[11px] leading-relaxed text-[#b8ada2]">
                MindAtlas Institute (2026). &ldquo;{article.title}&rdquo;. <em>MindAtlas Interdisciplinary Knowledge Corpus</em>. Vol. IV, Art. {article.slug.substring(0, 8)}.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `MindAtlas Institute (2026). "${article.title}". MindAtlas Interdisciplinary Knowledge Corpus. ${typeof window !== "undefined" ? window.location.href : ""}`
                  );
                  alert("APA Citation copied to clipboard!");
                }}
                className="w-full mt-2 py-1.5 rounded-lg border border-[#3d3532] bg-[#272220] text-[#d5cf66] font-bold text-[11px] hover:bg-[#3d3532] transition-colors cursor-pointer"
              >
                Copy APA Citation
              </button>
            </div>
          </aside>

          {/* Main Scholarly Article Body */}
          <article className="lg:col-span-9 space-y-14">
            {/* SECTION 1: Executive Summary & Epistemic Thesis */}
            <section id="overview" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#d5cf66]">
                <Sparkles className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  1. Epistemic Thesis & Executive Summary
                </h2>
              </div>

              {/* Sketched Dashed Callout for Core Epistemic Thesis */}
              <div className="p-6 rounded-2xl bg-[#272220] border-2 border-dashed border-[#d5cf66] space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#d5cf66]">
                  Foundational Principle
                </span>
                <p className="text-base sm:text-lg font-bold text-[#f2ebe2] leading-snug">
                  {article.executiveSummary[0]}
                </p>
              </div>

              {/* Continuous Rich Multi-Paragraph Prose */}
              <div className={`space-y-5 ${proseSizeClasses} ${proseFamilyClasses}`}>
                {article.executiveSummary.slice(1).map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* SECTION 2: Learning Objectives & Foundational Prerequisites */}
            <section id="objectives" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#98dcfa]">
                <GraduationCap className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  2. Learning Objectives & Foundational Prerequisites
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Learning Objectives Box */}
                <div className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#98dcfa]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mastery Objectives</span>
                  </div>
                  <ul className="space-y-3">
                    {article.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#98dcfa] mt-2 shrink-0" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisite Foundations */}
                <div className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#d5cf66]">
                    <Layers className="w-4 h-4" />
                    <span>Prerequisite Conceptual Models</span>
                  </div>
                  <div className="space-y-3">
                    {article.prerequisiteFoundations.map((prereq, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#1e1a17] border border-[#3d3532] space-y-1">
                        <span className="font-bold text-xs text-[#f2ebe2] block">{prereq.concept}</span>
                        <p className="text-xs text-[#82756a] leading-relaxed">{prereq.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: Intuitive Foundations & Narrative Case Walkthrough */}
            <section id="narrative" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#ee936b]">
                <Lightbulb className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  3. Intuitive Walkthrough: The Phenomenon in the Wild
                </h2>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-5">
                <div className="text-xs font-bold uppercase tracking-widest text-[#ee936b]">
                  Naturalistic Narrative Analysis
                </div>
                <div className={`space-y-4 ${proseSizeClasses} ${proseFamilyClasses}`}>
                  {article.intuitiveNarrative.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 4: Advanced Neurocomputational & Mathematical Foundations */}
            <section id="mechanisms" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#d5bcfe]">
                <Brain className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  4. Neurocomputational Architecture & Mathematical Modeling
                </h2>
              </div>

              {/* Multi-Paragraph Mechanistic Prose */}
              <div className={`space-y-5 ${proseSizeClasses} ${proseFamilyClasses}`}>
                {article.neurocomputationalMechanisms.overview.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Mathematical / Formal Model Specification Card */}
              {article.neurocomputationalMechanisms.mathematicalOrFormalModel && (
                <div className="p-6 sm:p-8 rounded-3xl bg-[#171412] border-2 border-dashed border-[#d5bcfe] space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d5bcfe]">
                      Formal Mathematical Specification
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#272220] text-[#b8ada2]">
                      Analytical Formulation
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-black text-[#f2ebe2]">
                    {article.neurocomputationalMechanisms.mathematicalOrFormalModel.title}
                  </h3>

                  {/* Formula Box */}
                  <div className="p-5 rounded-2xl bg-[#272220] border border-[#3d3532] overflow-x-auto text-center font-mono text-base sm:text-lg font-bold text-[#d5cf66]">
                    {article.neurocomputationalMechanisms.mathematicalOrFormalModel.formula}
                  </div>

                  {/* Variable Breakdown */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                      Variable Deconstruction:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {article.neurocomputationalMechanisms.mathematicalOrFormalModel.variableBreakdown.map((vb, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-[#272220]/60 border border-[#3d3532] flex items-start gap-2">
                          <span className="font-mono font-bold text-[#d5cf66] shrink-0">{vb.variable}:</span>
                          <span className="text-[#b8ada2]">{vb.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Epistemic Implication */}
                  <p className="text-xs sm:text-sm text-[#b8ada2] italic border-t border-[#3d3532] pt-3">
                    <strong className="text-[#f2ebe2] not-italic">Theoretical Implication:</strong>{" "}
                    {article.neurocomputationalMechanisms.mathematicalOrFormalModel.implication}
                  </p>
                </div>
              )}

              {/* Neural Substrates Grid */}
              <div className="pt-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                  Identified Cortical & Subcortical Substrates
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.neurocomputationalMechanisms.neuralSubstrates.map((ns, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#272220] border border-[#3d3532] space-y-2">
                      <div className="text-xs font-bold text-[#d5bcfe] uppercase tracking-wider">
                        {ns.role}
                      </div>
                      <div className="font-heading text-sm font-bold text-[#f2ebe2]">
                        {ns.region}
                      </div>
                      <p className="text-xs text-[#82756a] leading-relaxed">
                        {ns.activationFindings}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 5: Historical Genesis & Key Thinkers */}
            <section id="history" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#e6b677]">
                <History className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  5. Historical Genesis & The Evolution of Thought
                </h2>
              </div>

              {/* Narrative of Discovery */}
              <div className={`space-y-5 ${proseSizeClasses} ${proseFamilyClasses}`}>
                {article.historicalGenesis.narrative.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Thinkers Cards */}
              <div className="pt-4 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                  Key Thinkers & Intellectual Lineage
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {article.historicalGenesis.keyThinkers.map((thinker, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#272220] border border-[#3d3532] flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-heading text-sm font-bold text-[#f2ebe2]">{thinker.name}</span>
                          <span className="text-[10px] text-[#82756a]">{thinker.era}</span>
                        </div>
                        <p className="text-xs text-[#b8ada2] leading-relaxed">{thinker.contribution}</p>
                      </div>
                      <div className="text-[11px] font-mono text-[#d5cf66] pt-2 border-t border-[#3d3532]">
                        {thinker.seminalWork}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6: Landmark Empirical Experiments & Replications */}
            <section id="experiments" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#7cd0c5]">
                <FlaskConical className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  6. Landmark Empirical Experiments & Laboratory Validation
                </h2>
              </div>

              <div className="space-y-6">
                {article.classicExperiments.map((exp, idx) => (
                  <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#3d3532] pb-3">
                      <div>
                        <span className="text-xs font-bold text-[#7cd0c5] uppercase tracking-wider block">
                          Experimental Paradigm {idx + 1} ({exp.year})
                        </span>
                        <h3 className="font-heading text-lg font-black text-[#f2ebe2]">
                          {exp.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#1e1a17] text-[#b8ada2] border border-[#3d3532]">
                        {exp.investigators}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                      <div>
                        <strong className="text-[#f2ebe2]">Methodology & Setup:</strong> {exp.methodology}
                      </div>
                      <div className="p-4 rounded-xl bg-[#1e1a17] border border-[#3d3532]">
                        <strong className="text-[#7cd0c5] block mb-1">Sample & Conditions:</strong>
                        {exp.sampleAndConditions}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <strong className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                        Landmark Quantitative Findings:
                      </strong>
                      <ul className="space-y-2">
                        {exp.keyFindings.map((finding, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7cd0c5] mt-2 shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3d3532] text-xs">
                      <div>
                        <span className="text-[#82756a]">Statistical Effect Size:</span>{" "}
                        <span className="font-mono font-bold text-[#f2ebe2]">{exp.effectSize}</span>
                      </div>
                      <div className="text-[#a0d9a1] font-bold">
                        Replication: {exp.replicationNotes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 7: High-Stakes Domain Case Studies */}
            <section id="cases" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#fe9ea6]">
                <FileText className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  7. High-Stakes Cross-Domain Case Studies
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {article.concreteCaseStudies.map((cs, idx) => (
                  <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4">
                    <div className="flex items-center justify-between gap-2 border-b border-[#3d3532] pb-3">
                      <div>
                        <span className="text-xs font-bold text-[#fe9ea6] uppercase tracking-wider block">
                          Domain: {cs.domain}
                        </span>
                        <h3 className="font-heading text-lg font-black text-[#f2ebe2]">
                          {cs.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                      <p>
                        <strong className="text-[#f2ebe2]">Operational Context:</strong> {cs.background}
                      </p>
                      <p>
                        <strong className="text-[#fe9ea6]">Cognitive Failure Mode:</strong> {cs.biasManifestation}
                      </p>
                      <p>
                        <strong className="text-[#f2ebe2]">Consequences & Cost:</strong> {cs.consequences}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-xs text-[#d5cf66] leading-relaxed">
                      <strong className="block text-[#f2ebe2] mb-1">Institutional Lesson Learned:</strong>
                      {cs.lessonsLearned}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 8: Common Misconceptions Debunked */}
            <section id="misconceptions" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#5cb87a]">
                <AlertTriangle className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  8. Common Misconceptions Debunked (Myth vs Reality)
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {article.commonMisconceptions.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#283a2e] border border-[#384f3f] space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#fe9ea6] uppercase tracking-wider block">
                        Popular Misconception:
                      </span>
                      <h4 className="font-heading text-sm font-bold text-[#f2ebe2]">
                        &ldquo;{item.misconception}&rdquo;
                      </h4>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-[#384f3f]">
                      <span className="text-xs font-bold text-[#a0d9a1] uppercase tracking-wider block">
                        Empirical Reality:
                      </span>
                      <p className="text-xs text-[#b8ada2] leading-relaxed">
                        {item.reality}
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-[#82756a] pt-1">
                      Evidence: {item.empiricalEvidence}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 9: Scholarly Critiques & Counterarguments */}
            <section id="critiques" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#e0da7a]">
                <Scale className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  9. Scholarly Critiques & Counterarguments
                </h2>
              </div>

              <div className="space-y-6">
                {article.critiquesAndCounterarguments.map((critique, idx) => (
                  <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4">
                    <div className="flex items-center justify-between border-b border-[#3d3532] pb-3">
                      <div>
                        <span className="text-xs font-bold text-[#e0da7a] uppercase tracking-wider block">
                          Alternative Theoretical Paradigm
                        </span>
                        <h3 className="font-heading text-base font-black text-[#f2ebe2]">
                          {critique.perspective}
                        </h3>
                      </div>
                      <span className="text-xs text-[#82756a] font-bold">
                        {critique.proponent}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                      <p>
                        <strong className="text-[#e0da7a]">Core Academic Objection:</strong> {critique.coreArgument}
                      </p>
                      <p className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532]">
                        <strong className="text-[#f2ebe2] block mb-1">Response & Modern Synthesis:</strong>
                        {critique.responseAndSynthesis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 10: Actionable Institutional Debiasing Protocols */}
            <section id="protocols" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#d5cf66]">
                <ShieldAlert className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  10. Actionable Institutional Protocols & Debiasing Scaffolds
                </h2>
              </div>

              <div className="space-y-6">
                {article.debiasingProtocols.map((proto) => (
                  <div key={proto.protocolNumber} className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-5">
                    <div className="flex items-center justify-between border-b border-[#3d3532] pb-3">
                      <div>
                        <span className="text-xs font-bold text-[#d5cf66] uppercase tracking-wider block">
                          Protocol {proto.protocolNumber}
                        </span>
                        <h3 className="font-heading text-lg font-black text-[#f2ebe2]">
                          {proto.name}
                        </h3>
                      </div>
                      <span className="text-xs text-[#82756a] font-mono px-3 py-1 rounded-full bg-[#1e1a17]">
                        {proto.targetContext}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <strong className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                        Step-by-Step Procedural Execution:
                      </strong>
                      <ol className="space-y-2.5">
                        {proto.stepByStepProcedure.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-[#3d3532] text-[#d5cf66] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#1e1a17] border border-[#3d3532] text-xs text-[#fe9ea6]">
                      <strong>Common Failure Mode:</strong> {proto.commonFailureModes}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 11: Claim-Level Traceable Citations */}
            <section id="citations" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#97b5f6]">
                <BookOpen className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  11. Claim-Level Traceable Citations & Supporting Evidence
                </h2>
              </div>

              <div className="space-y-4">
                {article.claimCitations.map((citation) => (
                  <div key={citation.id} className="p-5 sm:p-6 rounded-2xl bg-[#171412] border border-[#3d3532] space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#97b5f6]">
                          Claim Verification (DOI: {citation.doi})
                        </span>
                        <p className="text-sm font-bold text-[#f2ebe2]">
                          &ldquo;{citation.claimText}&rdquo;
                        </p>
                      </div>
                      <a
                        href={`https://doi.org/${citation.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-[#97b5f6] hover:bg-[#272220] transition-colors shrink-0"
                      >
                        <span>Crossref</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Exact Verbatim Supporting Quote */}
                    <blockquote className="p-3.5 rounded-xl bg-[#272220]/80 border-l-2 border-[#97b5f6] text-xs text-[#b8ada2] italic leading-relaxed">
                      &ldquo;{citation.supportingQuote}&rdquo;
                    </blockquote>

                    <div className="text-[11px] font-mono text-[#82756a] flex flex-wrap gap-4 pt-1">
                      <span>Source: {citation.sourceAuthor} ({citation.sourceYear})</span>
                      <span>Publication: {citation.publisherOrJournal}</span>
                      <span>Location: {citation.pageOrSection}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 12: Active Recall & Conceptual Self-Test */}
            <section id="active-recall" className="space-y-8 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#d5cf66]">
                <RotateCcw className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  12. Active Recall & Conceptual Diagnostic Check
                </h2>
              </div>

              {/* Spaced Repetition Flashcards Deck */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#82756a] block">
                  Active Recall Flashcards (Click to flip)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {article.activeRecallFlashcards.map((fc, idx) => {
                    const isFlipped = flippedCards[idx];
                    return (
                      <button
                        key={fc.id}
                        onClick={() => toggleCard(idx)}
                        className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] hover:border-[#574d48] text-left transition-all flex flex-col justify-between min-h-[170px] cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#d5cf66] block mb-2">
                            {isFlipped ? "Empirical Answer" : "Active Recall Question"}
                          </span>
                          <p className="font-heading text-sm sm:text-base font-bold text-[#f2ebe2]">
                            {isFlipped ? fc.back : fc.front}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#82756a] mt-4">
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isFlipped ? "Click to view prompt" : "Click to reveal answer"}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conceptual Multiple-Choice Self-Test */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d5cf66]">
                    Self-Assessment Check
                  </span>
                  <h3 className="font-heading text-xl font-black text-[#f2ebe2]">
                    Conceptual Comprehension Diagnostic
                  </h3>
                </div>

                <div className="space-y-6">
                  {article.comprehensionQuestions.map((q, qIdx) => {
                    const selected = selectedAnswers[qIdx];
                    const hasSelected = selected !== undefined;
                    const isCorrect = selected === q.correctIndex;

                    return (
                      <div key={q.id} className="p-5 rounded-2xl bg-[#1e1a17] border border-[#3d3532] space-y-4">
                        <div className="font-heading text-sm sm:text-base font-bold text-[#f2ebe2]">
                          {qIdx + 1}. {q.question}
                        </div>

                        <div className="space-y-2">
                          {q.options.map((option, optIdx) => {
                            let optionStyle = "border-[#3d3532] bg-[#272220] text-[#b8ada2] hover:bg-[#322c2a]";
                            if (hasSelected) {
                              if (optIdx === q.correctIndex) {
                                optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold";
                              } else if (optIdx === selected) {
                                optionStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                              } else {
                                optionStyle = "border-[#3d3532] bg-[#272220]/40 text-[#82756a]";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(qIdx, optIdx)}
                                disabled={hasSelected}
                                className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                              >
                                <span>{option}</span>
                                {hasSelected && optIdx === q.correctIndex && (
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {showExplanations[qIdx] && (
                          <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                            isCorrect ? "bg-emerald-950/30 border-emerald-800 text-emerald-200" : "bg-rose-950/30 border-rose-800 text-rose-200"
                          }`}>
                            <strong className="block mb-1 font-bold">
                              {isCorrect ? "Correct!" : "Pedagogical Clarification:"}
                            </strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SECTION 13: Annotated Academic Further Reading */}
            <section id="further-reading" className="space-y-6 scroll-mt-24">
              <div className="flex items-center gap-3 border-b border-[#3d3532] pb-3 text-[#f095d2]">
                <Layers className="w-6 h-6" />
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                  13. Annotated Academic Further Reading
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {article.furtherReading.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#272220] border border-[#3d3532] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#f2ebe2]">{item.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e1a17] text-[#f095d2] border border-[#3d3532]">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-xs text-[#82756a]">
                        By {item.author} ({item.year})
                      </p>
                      <p className="text-xs text-[#b8ada2] pt-1">
                        {item.annotation}
                      </p>
                    </div>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#3d3532] bg-[#1e1a17] text-[#d5cf66] hover:bg-[#3d3532] transition-colors shrink-0 self-start sm:self-auto"
                      >
                        <span>Access Resource</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Related Mental Models Grid */}
            <div className="pt-12 border-t border-[#3d3532] space-y-6">
              <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2] tracking-tight">
                Related Synthesized Mental Models
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedModels.map((item) => (
                  <MentalModelCard key={item.id} model={item} />
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
