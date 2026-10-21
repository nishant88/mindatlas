"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  Award,
  ChevronDown,
  ChevronUp,
  Brain,
  HelpCircle,
  Check
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import { getStudyPlans, completeStudySession, getQuizzes } from "@/lib/api";

function StudyPlannerContent() {
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<{ [key: number]: boolean }>({ 1: true, 2: true });

  useEffect(() => {
    async function load() {
      const [pData, qData] = await Promise.all([getStudyPlans(), getQuizzes()]);
      setPlans(pData);
      setQuizzes(qData);
    }
    load();
  }, []);

  const activePlan = plans[0];
  const currentWeekData = activePlan?.weeks?.find((w: any) => w.week_number === selectedWeek);

  const handleMarkComplete = async (sessionId: number) => {
    await completeStudySession(sessionId, 5);
    setCompletedSessions((prev) => ({ ...prev, [sessionId]: true }));
  };

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    if (!activeQuiz) return 0;
    let correct = 0;
    activeQuiz.questions.forEach((q: any) => {
      if (quizAnswers[q.id] === q.correct_option_index) correct++;
    });
    return Math.round((correct / activeQuiz.questions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            Structured Cognitive Curriculum
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            12-Week Epistemic Mastery Path
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Spaced repetition schedules, active recall self-tests, and progressive mastery from foundational heuristics to advanced formal epistemology.
          </p>

          {/* Week Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((weekNum) => {
              const isSelected = selectedWeek === weekNum;
              return (
                <button
                  key={weekNum}
                  onClick={() => setSelectedWeek(weekNum)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#d5cf66] text-[#232402] scale-105 shadow-md"
                      : "bg-[#272220] border border-[#3d3532] text-[#b8ada2] hover:text-[#f2ebe2]"
                  }`}
                >
                  Week {weekNum}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Syllabus Sessions (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Header Card with Dashed Sketched Border */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border-2 border-dashed border-[#d5cf66]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                  Week {selectedWeek} Curriculum Focus
                </span>
                <span className="text-xs text-[#82756a] font-bold">
                  Estimated 4.5 hours study
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2] mb-2">
                {currentWeekData?.title || `Week ${selectedWeek}: Cognitive Foundations & Heuristics`}
              </h2>
              <p className="text-sm text-[#b8ada2] leading-relaxed">
                {currentWeekData?.focus_description ||
                  "Mastering the dual-process foundations of human decision-making, systematic deviations from Bayesian probability, and cognitive dissonance."}
              </p>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-black text-[#f2ebe2]">
                Prescribed Reading Sessions
              </h3>

              <div className="space-y-4">
                {[
                  {
                    id: 1,
                    title: "Session 1: The Dual-Process Mind & Fast Heuristics",
                    discipline: "Cognitive Science",
                    mins: 45,
                    slug: "heuristics-biases-and-bounded-rationality",
                    desc: "Analyze System 1 and System 2 cognitive processing architecture and bounded optimization.",
                  },
                  {
                    id: 2,
                    title: "Session 2: Cognitive Dissonance & Self-Justification",
                    discipline: "Psychology",
                    mins: 50,
                    slug: "cognitive-dissonance-and-belief-perseverance",
                    desc: "Festinger's paradigm, neural predictive coding error discounting, and debiasing protocols.",
                  },
                  {
                    id: 3,
                    title: "Session 3: Identity-Protective Motivated Reasoning",
                    discipline: "Social Psychology",
                    mins: 40,
                    slug: "motivated-reasoning-and-identity-protective-cognition",
                    desc: "Cultural cognition theory, political polarization mechanics, and value-affirming evidence framing.",
                  },
                ].map((session) => {
                  const isDone = completedSessions[session.id];
                  return (
                    <div
                      key={session.id}
                      className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d5bcfe] text-[#1f1438]">
                            {session.discipline}
                          </span>
                          <span className="text-xs text-[#82756a] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {session.mins} mins
                          </span>
                        </div>
                        <h4 className="font-heading text-lg font-black text-[#f2ebe2]">
                          <Link href={`/articles/${session.slug}`} className="hover:underline">
                            {session.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-[#b8ada2]">{session.desc}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          href={`/articles/${session.slug}`}
                          className="px-4 py-2 rounded-full bg-[#1e1a17] border border-[#3d3532] text-xs font-bold text-[#f2ebe2] hover:border-[#574d48]"
                        >
                          Read Synthesis
                        </Link>
                        <button
                          onClick={() => handleMarkComplete(session.id)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isDone
                              ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                              : "bg-[#d5cf66] text-[#232402] hover:bg-[#ded871]"
                          }`}
                        >
                          {isDone ? "✓ Completed" : "Mark Complete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Recall Quiz Panel */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                  Active Recall Self-Test
                </span>
                <HelpCircle className="w-4 h-4 text-[#d5cf66]" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-black text-[#f2ebe2] mb-1">
                  Week {selectedWeek} Knowledge Check
                </h3>
                <p className="text-xs text-[#b8ada2]">
                  Empirically proven to double 30-day concept retention compared to passive reading.
                </p>
              </div>

              {/* Sample Quiz Question */}
              <div className="p-4 rounded-2xl bg-[#1e1a17] border border-[#3d3532] space-y-3">
                <p className="text-xs sm:text-sm font-bold text-[#f2ebe2] leading-snug">
                  Which cognitive mechanism explains why highly educated domain experts are often more effective at defending partisan falsehoods?
                </p>

                <div className="space-y-2">
                  {[
                    "They possess lower emotional awareness.",
                    "Higher cognitive numeracy provides more computational ability to construct post-hoc justifications.",
                    "They do not experience cognitive dissonance.",
                    "They rely exclusively on fast-and-frugal heuristics."
                  ].map((opt, oIdx) => {
                    const isSelected = quizAnswers[1] === oIdx;
                    const isCorrect = oIdx === 1;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerSelect(1, oIdx)}
                        className={`w-full p-3 rounded-xl text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? quizSubmitted
                              ? isCorrect
                                ? "bg-emerald-900/50 border border-emerald-500 text-emerald-200"
                                : "bg-rose-900/50 border border-rose-500 text-rose-200"
                              : "bg-[#d5cf66] text-[#232402] font-bold"
                            : "bg-[#272220] border border-[#3d3532] text-[#b8ada2] hover:text-[#f2ebe2]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    className="w-full mt-3 py-2.5 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all cursor-pointer"
                  >
                    Submit Self-Evaluation
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-bold">
                    ✓ Correct! Higher analytical numeracy amplifies motivated reasoning.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudyPlannerPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading study planner...</div>}>
      <StudyPlannerContent />
    </Suspense>
  );
}
