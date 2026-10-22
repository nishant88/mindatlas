"use client";

import React, { useState, Suspense } from "react";
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
  Check,
  ListTodo,
  Layers,
  Compass,
  FileText,
  Share2
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";
import { TWELVE_WEEK_PLANS, WeekPlan, DailySession } from "@/lib/curriculumData";

function StudyPlannerContent() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"daily" | "roadmap">("daily");
  const [expandedDays, setExpandedDays] = useState<{ [dayKey: string]: boolean }>({ "1-1": true });
  const [completedSessions, setCompletedSessions] = useState<{ [sessionKey: string]: boolean }>({
    "1-1": true,
    "1-2": true
  });
  const [completedTasks, setCompletedTasks] = useState<{ [taskKey: string]: boolean }>({
    "1-1-0": true,
    "1-1-1": true,
    "1-2-0": true
  });
  const [quizAnswers, setQuizAnswers] = useState<{ [weekNum: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [weekNum: number]: boolean }>({});

  const currentPlan = TWELVE_WEEK_PLANS.find((w) => w.week === selectedWeek) || TWELVE_WEEK_PLANS[0];

  // Calculate completion stats for current week
  const weekCompletedCount = currentPlan.days.filter((d) => completedSessions[`${currentPlan.week}-${d.day}`]).length;
  const weekProgressPercent = Math.round((weekCompletedCount / currentPlan.days.length) * 100);

  // Overall curriculum stats
  const totalCompletedDays = Object.values(completedSessions).filter(Boolean).length;
  const overallProgressPercent = Math.round((totalCompletedDays / (12 * 5)) * 100);

  const toggleDayExpanded = (dayKey: string) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey]
    }));
  };

  const toggleSessionComplete = (sessionKey: string) => {
    setCompletedSessions((prev) => ({
      ...prev,
      [sessionKey]: !prev[sessionKey]
    }));
  };

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey]
    }));
  };

  const handleAnswerSelect = (weekNum: number, optionIndex: number) => {
    if (quizSubmitted[weekNum]) return;
    setQuizAnswers((prev) => ({ ...prev, [weekNum]: optionIndex }));
  };

  const handleSubmitQuiz = (weekNum: number) => {
    if (quizAnswers[weekNum] === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [weekNum]: true }));
  };

  const selectedAnswer = quizAnswers[selectedWeek];
  const isSubmitted = quizSubmitted[selectedWeek];
  const isAnswerCorrect = selectedAnswer === currentPlan.quiz.correctIndex;

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--ink-primary)]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-gold)] mb-2">
                Structured Cognitive Curriculum
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-black text-[var(--ink-primary)] tracking-tight mb-3">
                12-Week Epistemic Mastery Path
              </h1>
              <p className="text-base sm:text-lg text-[var(--ink-secondary)] max-w-2xl leading-relaxed">
                Spaced repetition schedules, day-by-day reading assignments, guided inquiry questions, and active recall self-tests from foundational heuristics to formal epistemology.
              </p>
            </div>

            {/* View Mode Switcher + Global Progress */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center">
                <button
                  onClick={() => setViewMode("daily")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "daily"
                      ? "bg-[#d5cf66] text-[#232402] shadow-sm"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Daily Study Plan</span>
                </button>
                <button
                  onClick={() => setViewMode("roadmap")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "roadmap"
                      ? "bg-[#d5cf66] text-[#232402] shadow-sm"
                      : "text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>12-Week Roadmap</span>
                </button>
              </div>

              {/* Overall Progress Pill */}
              <div className="px-4 py-2 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs font-bold text-[var(--ink-secondary)] flex items-center gap-2">
                <span className="text-[#d5cf66] font-black">{overallProgressPercent}%</span>
                <span>Curriculum Mastered</span>
              </div>
            </div>
          </div>

          {/* Week Selector Pills (1 to 12) */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {TWELVE_WEEK_PLANS.map((w) => {
              const isSelected = selectedWeek === w.week;
              const hasCompletedWeek = w.days.every((d) => completedSessions[`${w.week}-${d.day}`]);
              const completedInWeek = w.days.filter((d) => completedSessions[`${w.week}-${d.day}`]).length;

              return (
                <button
                  key={w.week}
                  onClick={() => {
                    setSelectedWeek(w.week);
                    setViewMode("daily");
                    // Expand Day 1 of selected week by default
                    setExpandedDays({ [`${w.week}-1`]: true });
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#d5cf66] text-[#232402] scale-105 shadow-lg ring-2 ring-[#d5cf66]/50"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  {hasCompletedWeek ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                  ) : completedInWeek > 0 ? (
                    <span className="w-2 h-2 rounded-full bg-[#d5cf66]" />
                  ) : null}
                  <span>Week {w.week}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* VIEW 1: DAILY STUDY PLAN FOR SELECTED WEEK */}
        {viewMode === "daily" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Weekly Header + 5 Day-by-Day Sessions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Selected Week Header Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                      Week {currentPlan.week} of 12
                    </span>
                    <span className="text-xs text-[#82756a]">•</span>
                    <span className="text-xs font-bold text-[#b8ada2]">
                      {currentPlan.primaryDiscipline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#b8ada2]">
                    <span>Progress:</span>
                    <span className="text-[#d5cf66] font-black">{weekCompletedCount} of {currentPlan.days.length} Days</span>
                    <span className="text-[#82756a]">({weekProgressPercent}%)</span>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink-primary)] tracking-tight mb-1">
                    {currentPlan.title}
                  </h2>
                  <p className="text-sm font-bold text-[#d5cf66]/90">
                    {currentPlan.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#b8ada2] leading-relaxed pt-1 border-t border-[#3d3532]/60">
                  {currentPlan.weeklyObjective}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-[#1e1a17] overflow-hidden">
                  <div
                    className="h-full bg-[#d5cf66] rounded-full transition-all duration-300"
                    style={{ width: `${weekProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Day-by-Day Detailed Schedule */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-black text-[var(--ink-primary)] flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-[#d5cf66]" />
                    <span>Day-by-Day Learning Schedule (Week {currentPlan.week})</span>
                  </h3>
                  <span className="text-xs text-[var(--ink-muted)]">
                    Click any day card to expand guided inquiries
                  </span>
                </div>

                <div className="space-y-4">
                  {currentPlan.days.map((session) => {
                    const sessionKey = `${currentPlan.week}-${session.day}`;
                    const isDone = completedSessions[sessionKey];
                    const isExpanded = expandedDays[sessionKey];

                    return (
                      <div
                        key={session.day}
                        className={`rounded-3xl border transition-all ${
                          isDone
                            ? "bg-[var(--bg-surface)]/80 border-emerald-500/30"
                            : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
                        }`}
                      >
                        {/* Day Card Header */}
                        <div
                          onClick={() => toggleDayExpanded(sessionKey)}
                          className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* Day Label Badge */}
                              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[var(--bg-page)] text-[#d5cf66] border border-[var(--border-subtle)]">
                                {session.dayLabel}
                              </span>

                              {/* Discipline Badge */}
                              <span
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                                style={{
                                  backgroundColor: session.disciplineColor,
                                  color: session.disciplineTextColor
                                }}
                              >
                                {session.discipline}
                              </span>

                              {/* Duration */}
                              <span className="text-xs text-[var(--ink-muted)] flex items-center gap-1 font-medium">
                                <Clock className="w-3.5 h-3.5" /> {session.durationMins} mins
                              </span>

                              {isDone && (
                                <span className="text-xs font-black text-emerald-400 flex items-center gap-1 ml-auto sm:ml-0">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                                </span>
                              )}
                            </div>

                            <h4 className="font-heading text-lg sm:text-xl font-black text-[var(--ink-primary)] hover:text-[#d5cf66] transition-colors">
                              {session.sessionTitle}
                            </h4>

                            <p className="text-xs sm:text-sm text-[var(--ink-secondary)] leading-relaxed">
                              {session.objective}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <Link
                              href={`/articles/${session.articleSlug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="px-4 py-2 rounded-full bg-[var(--bg-page)] hover:bg-[var(--bg-surface-raised)] border border-[var(--border-subtle)] hover:border-[#d5cf66]/50 text-xs font-bold text-[#d5cf66] flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Read Treatise</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSessionComplete(sessionKey);
                              }}
                              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                isDone
                                  ? "bg-emerald-950/90 border border-emerald-500/50 text-emerald-300"
                                  : "bg-[#d5cf66] text-[#232402] hover:bg-[#ded871] shadow-md"
                              }`}
                            >
                              {isDone ? "✓ Completed" : "Mark Day Complete"}
                            </button>

                            <div className="text-[var(--ink-muted)] p-1">
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                          </div>
                        </div>

                        {/* Expandable Day Details */}
                        {isExpanded && (
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[var(--border-subtle)]/60 space-y-5 animate-in fade-in duration-150">
                            {/* Assigned Reading Link Callout */}
                            <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] flex items-center justify-between gap-4">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--ink-muted)] block mb-0.5">
                                  Prescribed Scholarly Treatise
                                </span>
                                <span className="font-heading font-black text-sm text-[var(--ink-primary)]">
                                  {session.articleTitle}
                                </span>
                              </div>
                              <Link
                                href={`/articles/${session.articleSlug}`}
                                className="px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-raised)] text-xs font-bold text-[#d5cf66] border border-[var(--border-subtle)] shrink-0"
                              >
                                Open Reader &rarr;
                              </Link>
                            </div>

                            {/* Guided Inquiry Questions */}
                            <div>
                              <h5 className="text-xs font-black uppercase tracking-wider text-[#d5cf66] mb-2.5 flex items-center gap-1.5">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Guided Inquiry Questions</span>
                              </h5>
                              <ul className="space-y-1.5 text-xs text-[var(--ink-secondary)] leading-relaxed">
                                {session.guidedQuestions.map((q, qIdx) => (
                                  <li key={qIdx} className="flex items-start gap-2">
                                    <span className="text-[#d5cf66] font-bold">•</span>
                                    <span>{q}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Practical Exercise & Real-World Observation */}
                            <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#7cd0c5]">
                                Practical Observation Drill
                              </span>
                              <p className="text-xs text-[var(--ink-primary)] leading-relaxed">
                                {session.practicalExercise}
                              </p>
                            </div>

                            {/* Personal Reflection Prompt */}
                            <div className="p-4 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-subtle)] space-y-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#d5bcfe]">
                                Socratic Reflection Prompt
                              </span>
                              <p className="text-xs text-[var(--ink-primary)] leading-relaxed italic">
                                &ldquo;{session.reflectionPrompt}&rdquo;
                              </p>
                            </div>

                            {/* Daily Task Checklist */}
                            <div>
                              <span className="text-[10px] font-black uppercase tracking-wider text-[#82756a] block mb-2">
                                Daily Completion Checklist
                              </span>
                              <div className="space-y-2">
                                {session.checklistTasks.map((task, tIdx) => {
                                  const taskKey = `${sessionKey}-${tIdx}`;
                                  const isTaskDone = completedTasks[taskKey];

                                  return (
                                    <div
                                      key={tIdx}
                                      onClick={() => toggleTask(taskKey)}
                                      className="flex items-center gap-2.5 text-xs text-[var(--ink-secondary)] cursor-pointer hover:text-[var(--ink-primary)]"
                                    >
                                      <div
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                          isTaskDone
                                            ? "bg-[#d5cf66] border-[#d5cf66] text-[#232402]"
                                            : "border-[var(--border-subtle)] bg-[var(--bg-page)]"
                                        }`}
                                      >
                                        {isTaskDone && <Check className="w-3 h-3 stroke-[3]" />}
                                      </div>
                                      <span className={isTaskDone ? "line-through opacity-60" : ""}>
                                        {task}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Active Recall Self-Test Panel */}
            <div className="space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl space-y-5 sticky top-24">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                    Active Recall Self-Test
                  </span>
                  <HelpCircle className="w-4 h-4 text-[#d5cf66]" />
                </div>

                <div>
                  <h3 className="font-heading text-xl font-black text-[var(--ink-primary)] mb-1">
                    Week {currentPlan.week} Knowledge Check
                  </h3>
                  <p className="text-xs text-[var(--ink-secondary)]">
                    Testing your retention of {currentPlan.title}. Empirical research demonstrates active recall doubles 30-day concept retention over passive re-reading.
                  </p>
                </div>

                {/* Dynamic Quiz Question */}
                <div className="p-5 rounded-2xl bg-[var(--bg-deep)] border border-[var(--border-subtle)] space-y-4">
                  <p className="text-xs sm:text-sm font-bold text-[var(--ink-primary)] leading-snug">
                    {currentPlan.quiz.question}
                  </p>

                  <div className="space-y-2.5">
                    {currentPlan.quiz.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswer === oIdx;
                      const isCorrect = oIdx === currentPlan.quiz.correctIndex;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSelect(currentPlan.week, oIdx)}
                          className={`w-full p-3.5 rounded-xl text-xs text-left transition-all cursor-pointer ${
                            isSelected
                              ? isSubmitted
                                ? isCorrect
                                  ? "bg-emerald-900/50 border border-emerald-500 text-emerald-200"
                                  : "bg-rose-900/50 border border-rose-500 text-rose-200"
                                : "bg-[#d5cf66] text-[#232402] font-bold"
                              : isSubmitted && isCorrect
                              ? "bg-emerald-950/60 border border-emerald-500/70 text-emerald-300 font-semibold"
                              : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-mono text-[10px] font-bold opacity-75 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {!isSubmitted ? (
                    <button
                      onClick={() => handleSubmitQuiz(currentPlan.week)}
                      disabled={selectedAnswer === undefined}
                      className="w-full mt-3 py-2.5 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all cursor-pointer disabled:opacity-40 shadow-md"
                    >
                      Submit Self-Evaluation
                    </button>
                  ) : (
                    <div
                      className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                        isAnswerCorrect
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                          : "bg-rose-950/80 border-rose-500/40 text-rose-200"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {isAnswerCorrect ? "✓ Mastered!" : "✕ Epistemic Misstep"}
                      </div>
                      <p className="opacity-90">{currentPlan.quiz.explanation}</p>
                    </div>
                  )}
                </div>

                {/* Week Navigation Jumpers */}
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <button
                    disabled={selectedWeek === 1}
                    onClick={() => {
                      setSelectedWeek(Math.max(1, selectedWeek - 1));
                      setExpandedDays({ [`${selectedWeek - 1}-1`]: true });
                    }}
                    className="font-bold text-[var(--ink-secondary)] hover:text-[var(--ink-primary)] disabled:opacity-30 cursor-pointer"
                  >
                    &larr; Previous Week
                  </button>

                  <button
                    disabled={selectedWeek === 12}
                    onClick={() => {
                      setSelectedWeek(Math.min(12, selectedWeek + 1));
                      setExpandedDays({ [`${selectedWeek + 1}-1`]: true });
                    }}
                    className="font-bold text-[#d5cf66] hover:underline disabled:opacity-30 cursor-pointer"
                  >
                    Next Week &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: FULL 12-WEEK ROADMAP AT A GLANCE */}
        {viewMode === "roadmap" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-2xl font-black text-[var(--ink-primary)]">
                  Complete 12-Week Curriculum Roadmap
                </h3>
                <p className="text-xs sm:text-sm text-[var(--ink-secondary)]">
                  Click any week to switch to its detailed Day-by-Day schedule and active recall self-test.
                </p>
              </div>

              <button
                onClick={() => setViewMode("daily")}
                className="px-4 py-2 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all cursor-pointer shadow-md"
              >
                Back to Daily Plan &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TWELVE_WEEK_PLANS.map((plan) => {
                const isSelected = selectedWeek === plan.week;
                const completedInThisWeek = plan.days.filter((d) => completedSessions[`${plan.week}-${d.day}`]).length;
                const percent = Math.round((completedInThisWeek / plan.days.length) * 100);

                return (
                  <div
                    key={plan.week}
                    onClick={() => {
                      setSelectedWeek(plan.week);
                      setViewMode("daily");
                      setExpandedDays({ [`${plan.week}-1`]: true });
                    }}
                    className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                      isSelected
                        ? "bg-[var(--bg-surface)] border-[#d5cf66] ring-2 ring-[#d5cf66]/40 shadow-xl"
                        : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:-translate-y-0.5"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-black uppercase tracking-wider text-[#d5cf66]">
                          Week {plan.week}
                        </span>
                        <span className="text-xs text-[var(--ink-muted)] font-bold">
                          {completedInThisWeek}/{plan.days.length} Days ({percent}%)
                        </span>
                      </div>

                      <h4 className="font-heading text-xl font-black text-[var(--ink-primary)] mb-1">
                        {plan.title}
                      </h4>
                      <p className="text-xs font-bold text-[var(--ink-secondary)] mb-3">
                        {plan.subtitle}
                      </p>

                      <p className="text-xs text-[var(--ink-secondary)] line-clamp-3 leading-relaxed mb-4">
                        {plan.weeklyObjective}
                      </p>

                      {/* Days preview pill list */}
                      <div className="space-y-1.5 pt-3 border-t border-[var(--border-subtle)]/60">
                        {plan.days.slice(0, 3).map((d) => (
                          <div key={d.day} className="flex items-center gap-2 text-[11px] text-[#82756a]">
                            <span className="font-mono text-[10px] text-[#d5cf66]">D{d.day}</span>
                            <span className="truncate">{d.sessionTitle}</span>
                          </div>
                        ))}
                        {plan.days.length > 3 && (
                          <div className="text-[10px] text-[#82756a] font-bold pl-5">
                            + {plan.days.length - 3} more daily sessions
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#3d3532] flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1e1a17] text-[#b8ada2]">
                        {plan.primaryDiscipline.split("&")[0].trim()}
                      </span>
                      <span className="font-bold text-[#d5cf66] flex items-center gap-1">
                        Open Week Plan &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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
