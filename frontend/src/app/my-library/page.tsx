"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Library,
  BookOpen,
  Bookmark,
  FileText,
  Download,
  Plus,
  Trash2,
  Tag,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";

export default function MyLibraryPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "notes" | "export">("saved");
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Reflections on Epistemic Asymmetry & Popperian Falsification",
      content: "It is essential to remember that proof in empirical science is always tentative. We can refute theories with single decisive anomalies, but verification remains asymptotically open.",
      tags: ["Epistemology", "Popper", "Methodology"],
      updated_at: "2024-04-10"
    },
    {
      id: 2,
      title: "Festinger's Induced Compliance Mechanics",
      content: "The counter-intuitive finding that $1 payment generates higher attitude change than $20 demonstrates that human rationalization kicks in precisely when external justification is insufficient.",
      tags: ["Dissonance", "Psychology"],
      updated_at: "2024-04-12"
    },
    {
      id: 3,
      title: "Predictive Processing & Top-Down Hallucination",
      content: "The brain is an inference engine minimizing free energy. Sensory signals do not construct reality; they simply correct internal generative models through prediction errors.",
      tags: ["Neuroscience", "Bayesian Brain"],
      updated_at: "2024-04-18"
    }
  ]);

  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Cognitive Dissonance & Self-Justification",
      slug: "cognitive-dissonance-and-belief-perseverance",
      discipline: "Psychology",
      disciplineColor: "#d5bcfe",
      disciplineTextColor: "#1f1438",
      status: "reading",
      progress: 65,
      readingMins: 18
    },
    {
      id: 2,
      title: "Popperian Falsification & The Black Swan",
      slug: "popperian-falsificationism-and-scientific-demarcation",
      discipline: "Scientific Reasoning",
      disciplineColor: "#7cd0c5",
      disciplineTextColor: "#032623",
      status: "completed",
      progress: 100,
      readingMins: 13
    },
    {
      id: 3,
      title: "Bounded Rationality & Satisficing",
      slug: "heuristics-biases-and-bounded-rationality",
      discipline: "Cognitive Science",
      disciplineColor: "#98dcfa",
      disciplineTextColor: "#04222e",
      status: "reading",
      progress: 45,
      readingMins: 14
    },
    {
      id: 4,
      title: "Loss Aversion & Prospect Theory",
      slug: "loss-aversion-and-prospect-theory",
      discipline: "Behavioral Economics",
      disciplineColor: "#ee9976",
      disciplineTextColor: "#330d00",
      status: "completed",
      progress: 100,
      readingMins: 11
    },
    {
      id: 5,
      title: "The Predictive Brain & Free Energy Principle",
      slug: "predictive-processing-and-the-bayesian-brain",
      discipline: "Neuroscience",
      disciplineColor: "#97b5f6",
      disciplineTextColor: "#051838",
      status: "reading",
      progress: 25,
      readingMins: 15
    }
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteTag, setNewNoteTag] = useState("");

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      tags: newNoteTag ? [newNoteTag] : ["General"],
      updated_at: new Date().toISOString().split("T")[0]
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setNewNoteTag("");
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleDownloadExport = (format: "markdown" | "bibtex" | "json") => {
    let content = "";
    let mimeType = "text/plain";
    let filename = `mindatlas_library_export.${format === "bibtex" ? "bib" : format === "markdown" ? "md" : "json"}`;

    if (format === "markdown") {
      mimeType = "text/markdown";
      content = `# MindAtlas Personal Knowledge Export\n\n## Saved Reading Queue\n` +
        savedItems.map(s => `- **${s.title}** (${s.discipline}) - Status: ${s.status} (${s.progress}%)\n`).join("") +
        `\n## Research Notes\n` +
        notes.map(n => `### ${n.title}\n${n.content}\n*Tags: ${n.tags.join(", ")}*\n\n`).join("");
    } else if (format === "bibtex") {
      mimeType = "application/x-bibtex";
      content = `@article{mindatlas_cognitive_dissonance,\n  title = {Cognitive Dissonance & the Architecture of Self-Justification},\n  author = {MindAtlas Cognitive Synthesis Collaborative},\n  journal = {The Human Knowledge Library},\n  year = {2024}\n}\n\n@article{mindatlas_popperian_falsification,\n  title = {Popperian Falsificationism and Scientific Demarcation},\n  author = {MindAtlas Epistemic Research Group},\n  journal = {The Human Knowledge Library},\n  year = {2024}\n}\n\n@article{mindatlas_bounded_rationality,\n  title = {Bounded Rationality, Heuristics and Satisficing},\n  author = {MindAtlas Cognitive Synthesis Collaborative},\n  journal = {The Human Knowledge Library},\n  year = {2024}\n}`;
    } else {
      mimeType = "application/json";
      content = JSON.stringify({ savedItems, notes }, null, 2);
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5cf66]/10 border border-[#d5cf66]/30 text-[#d5cf66] text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Private Research Workspace</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-2">
                My Knowledge Library
              </h1>
              <p className="text-base text-[#b8ada2] max-w-2xl leading-relaxed">
                Your personal reading progress, synthesized annotations, custom tags, and citation bibliography export.
              </p>
            </div>

            {/* Quick Export Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleDownloadExport("markdown")}
                className="px-3.5 py-2 rounded-full border border-[#3d3532] bg-[#272220] hover:bg-[#3d3532] text-xs font-bold text-[#f2ebe2] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#d5cf66]" />
                <span>Markdown</span>
              </button>
              <button
                onClick={() => handleDownloadExport("bibtex")}
                className="px-3.5 py-2 rounded-full border border-[#3d3532] bg-[#272220] hover:bg-[#3d3532] text-xs font-bold text-[#f2ebe2] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#d5cf66]" />
                <span>BibTeX</span>
              </button>
              <button
                onClick={() => handleDownloadExport("json")}
                className="px-3.5 py-2 rounded-full border border-[#3d3532] bg-[#272220] hover:bg-[#3d3532] text-xs font-bold text-[#f2ebe2] flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#d5cf66]" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#3d3532] gap-6 text-sm mt-8">
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-3 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === "saved"
                  ? "border-[#d5cf66] text-[#d5cf66]"
                  : "border-transparent text-[#82756a] hover:text-[#f2ebe2]"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Reading Queue & Bookmarks ({savedItems.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-3 font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === "notes"
                  ? "border-[#d5cf66] text-[#d5cf66]"
                  : "border-transparent text-[#82756a] hover:text-[#f2ebe2]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Personal Research Notes ({notes.length})</span>
            </button>
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Tab 1: Saved Reading Queue */}
        {activeTab === "saved" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] flex flex-col justify-between gap-4 transition-all hover:border-[#574d48] hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span
                        className="font-bold px-2.5 py-0.5 rounded-full text-[11px]"
                        style={{
                          backgroundColor: item.disciplineColor,
                          color: item.disciplineTextColor
                        }}
                      >
                        {item.discipline}
                      </span>
                      <span className="capitalize text-xs font-bold text-[#d5cf66]">
                        {item.status} ({item.progress}%)
                      </span>
                    </div>

                    <h3 className="font-heading text-xl font-black text-[#f2ebe2] mb-3 hover:text-[#d5cf66] transition-colors">
                      <Link href={`/articles/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-[#1e1a17] overflow-hidden">
                      <div
                        className="h-full bg-[#d5cf66] rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#3d3532]/60 flex items-center justify-between text-xs">
                    <span className="text-[#82756a] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.readingMins} mins
                    </span>
                    <Link
                      href={`/articles/${item.slug}`}
                      className="font-bold text-[#d5cf66] hover:underline flex items-center gap-1"
                    >
                      <span>Continue Reading</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Personal Research Notes */}
        {activeTab === "notes" && (
          <div className="space-y-8">
            {/* Create New Note Form */}
            <form
              onSubmit={handleAddNote}
              className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4 shadow-xl"
            >
              <h3 className="text-xs font-black text-[#d5cf66] uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Research Note
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note title (e.g. Asymmetric Loss Functions in Decision Science)..."
                  className="sm:col-span-2 px-4 py-3 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-[#f2ebe2] placeholder-[#82756a] text-sm focus:outline-none focus:border-[#d5cf66]"
                />
                <input
                  type="text"
                  value={newNoteTag}
                  onChange={(e) => setNewNoteTag(e.target.value)}
                  placeholder="Tag (e.g. Behavioral Economics)"
                  className="px-4 py-3 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-[#f2ebe2] placeholder-[#82756a] text-sm focus:outline-none focus:border-[#d5cf66]"
                />
              </div>
              <textarea
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={3}
                placeholder="Draft your synthesized observations, counterarguments, or open research questions..."
                className="w-full px-4 py-3 rounded-2xl bg-[#1e1a17] border border-[#3d3532] text-[#f2ebe2] placeholder-[#82756a] text-sm focus:outline-none focus:border-[#d5cf66]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all cursor-pointer shadow-md"
              >
                Save Annotation
              </button>
            </form>

            {/* Notes List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap gap-1.5">
                        {note.tags.map((t, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1e1a17] text-[#d5cf66] border border-[#3d3532]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-[#82756a] hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-heading text-lg font-black text-[#f2ebe2] mb-2">
                      {note.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#b8ada2] leading-relaxed">
                      {note.content}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#82756a] pt-3 border-t border-[#3d3532]/60">
                    Updated {note.updated_at}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
