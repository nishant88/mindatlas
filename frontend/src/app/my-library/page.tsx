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
  ExternalLink
} from "lucide-react";

export default function MyLibraryPage() {
  const [activeTab, setActiveTab] = useState<"saved" | "notes" | "export">("saved");
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Reflections on Epistemic Asymmetry & Falsification",
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
    }
  ]);

  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "Cognitive Dissonance and the Architecture of Self-Justification",
      slug: "cognitive-dissonance-and-belief-perseverance",
      discipline: "Psychology",
      status: "reading",
      progress: 65
    },
    {
      id: 2,
      title: "Popperian Falsificationism and the Demarcation Problem in Modern Epistemology",
      slug: "popperian-falsificationism-and-scientific-demarcation",
      discipline: "Scientific Reasoning",
      status: "completed",
      progress: 100
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
      content = `@article{mindatlas_cognitive_dissonance,\n  title = {Cognitive Dissonance and the Architecture of Self-Justification},\n  author = {MindAtlas Synthesis},\n  journal = {The Human Knowledge Library},\n  year = {2024}\n}\n\n@article{mindatlas_popperian_falsification,\n  title = {Popperian Falsificationism and Scientific Demarcation},\n  author = {MindAtlas Synthesis},\n  journal = {The Human Knowledge Library},\n  year = {2024}\n}`;
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Private Research Workspace</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            My Knowledge Library
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
            Your private annotations, reading queues, custom tags, and citation bibliography export.
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => handleDownloadExport("markdown")}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-medium hover:border-amber-500 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Markdown</span>
          </button>
          <button
            onClick={() => handleDownloadExport("bibtex")}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-medium hover:border-amber-500 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>BibTeX</span>
          </button>
          <button
            onClick={() => handleDownloadExport("json")}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-medium hover:border-amber-500 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-6 text-sm">
        <button
          onClick={() => setActiveTab("saved")}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === "saved"
              ? "border-amber-600 text-amber-600 dark:text-amber-400 font-semibold"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Reading Queue & Bookmarks ({savedItems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("notes")}
          className={`pb-3 font-medium transition-colors border-b-2 flex items-center gap-1.5 ${
            activeTab === "notes"
              ? "border-amber-600 text-amber-600 dark:text-amber-400 font-semibold"
              : "border-transparent text-stone-500 hover:text-stone-800"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Personal Research Notes ({notes.length})</span>
        </button>
      </div>

      {/* Tab Content: Saved Reading Queue */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {item.discipline}
                    </span>
                    <span className="capitalize text-xs font-medium text-amber-600">
                      {item.status} ({item.progress}%)
                    </span>
                  </div>
                  <h3 className="font-editorial text-lg font-bold text-stone-900 dark:text-stone-100">
                    {item.title}
                  </h3>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden mt-3">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-900 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Private Bookmark</span>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  >
                    Continue Reading <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Notes & Annotations */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          {/* Create New Note Form */}
          <form
            onSubmit={handleAddNote}
            className="p-5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs"
          >
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-amber-500" /> Create Research Note
            </h3>
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder="Note title (e.g., Epistemic Asymmetry in Popperian Science)..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-amber-500"
            />
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={3}
              placeholder="Draft your synthesis, critique, or passage annotation in Markdown..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 focus:outline-none focus:border-amber-500"
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <input
                type="text"
                value={newNoteTag}
                onChange={(e) => setNewNoteTag(e.target.value)}
                placeholder="Tag (e.g. Epistemology)"
                className="w-full sm:w-60 px-3 py-1.5 text-xs rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 text-white font-medium text-xs hover:bg-amber-700"
              >
                Save Private Note
              </button>
            </div>
          </form>

          {/* Notes List */}
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-base font-bold text-stone-900 dark:text-stone-100">
                    {note.title}
                  </h4>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 rounded-lg text-stone-400 hover:text-rose-600 transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                  {note.content}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-900 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-stone-400" />
                    {note.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span>Updated: {note.updated_at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
