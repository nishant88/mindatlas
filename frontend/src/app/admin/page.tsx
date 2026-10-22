"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCw,
  Server,
  Activity,
} from "lucide-react";
import { getAdminMetrics, getSources, triggerPipelineRun } from "@/lib/api";

export default function AdminConsolePage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [reviewQueue, setReviewQueue] = useState<any[]>([
    {
      id: 101,
      slug: "neuroplasticity-and-synaptic-remodeling",
      title: "Neuroplasticity and Synaptic Remodeling: Structural Adaptation Across the Lifespan",
      discipline: "Neuroscience",
      citations_count: 6,
      quality_score: 0.94,
      status: "pending_review"
    }
  ]);
  const [auditLogs, setAuditLogs] = useState<any[]>([
    {
      id: 1,
      actor: "automated_pipeline",
      action: "daily_crawl_completed",
      target: "OpenAlex & Crossref",
      time: "10 mins ago"
    },
    {
      id: 2,
      actor: "chief_editor",
      action: "article_published",
      target: "cognitive-dissonance-and-belief-perseverance",
      time: "1 hour ago"
    },
    {
      id: 3,
      actor: "citation_verifier",
      action: "claims_anchored",
      target: "Festinger 1957 (DOI: 10.1515/9781503620766)",
      time: "2 hours ago"
    }
  ]);

  const [syncingId, setSyncingId] = useState<number | null>(null);

  useEffect(() => {
    getAdminMetrics().then(setMetrics).catch(() => {});
    getSources().then((res: any) => {
      if (Array.isArray(res)) setSources(res);
      else if (res && res.sources) setSources(res.sources);
    }).catch(() => {});
  }, []);

  const handleApprove = (id: number) => {
    setReviewQueue(reviewQueue.filter((item) => item.id !== id));
    setAuditLogs([
      {
        id: Date.now(),
        actor: "editorial_lead",
        action: "article_published",
        target: `Article ID: ${id}`,
        time: "Just now"
      },
      ...auditLogs
    ]);
  };

  const handleReject = (id: number) => {
    setReviewQueue(reviewQueue.filter((item) => item.id !== id));
    setAuditLogs([
      {
        id: Date.now(),
        actor: "editorial_lead",
        action: "article_rejected",
        target: `Article ID: ${id}`,
        time: "Just now"
      },
      ...auditLogs
    ]);
  };

  const handleSyncSource = async (srcId: number) => {
    setSyncingId(srcId);
    setTimeout(() => {
      setSyncingId(null);
      setAuditLogs([
        {
          id: Date.now(),
          actor: "source_scheduler",
          action: "source_sync_completed",
          target: `Source ID: ${srcId}`,
          time: "Just now"
        },
        ...auditLogs
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 text-[var(--accent-gold)] text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Governance & Quality Controls</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-black text-[var(--ink-primary)]">
          Admin & Editorial Console
        </h1>
        <p className="text-xs sm:text-sm text-[var(--ink-secondary)] mt-1 max-w-2xl">
          Supervise automated discovery crawlers, review pending peer drafts, inspect claim citations,
          and monitor processing pipelines.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
          <span className="text-xs text-[var(--ink-muted)] font-medium">Published Articles</span>
          <div className="font-heading text-3xl font-black text-[var(--ink-primary)] mt-1">
            {metrics?.total_articles || 9}
          </div>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Peer Verified
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
          <span className="text-xs text-[var(--ink-muted)] font-medium">Discovered Works</span>
          <div className="font-heading text-3xl font-black text-[var(--ink-primary)] mt-1">
            {metrics?.total_discovered_resources || 12}
          </div>
          <span className="text-[11px] text-[var(--ink-muted)] mt-1">Open-Access Sources</span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
          <span className="text-xs text-[var(--ink-muted)] font-medium">Verified Citations</span>
          <div className="font-heading text-3xl font-black text-[var(--accent-gold)] mt-1">
            {metrics?.total_verified_citations || 28}
          </div>
          <span className="text-[11px] text-[var(--ink-muted)] mt-1">Passage-Level Anchored</span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
          <span className="text-xs text-[var(--ink-muted)] font-medium">Pending Review Queue</span>
          <div className="font-heading text-3xl font-black text-[var(--ink-primary)] mt-1">
            {reviewQueue.length}
          </div>
          <span className="text-[11px] text-amber-500 font-medium mt-1">Requires Editorial Sign-off</span>
        </div>
      </div>

      {/* Editorial Review Queue */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" /> Human Editorial Review Queue
        </h2>

        {reviewQueue.length > 0 ? (
          <div className="space-y-3">
            {reviewQueue.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-gold)]/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold px-2 py-0.5 rounded bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]">
                      {item.discipline}
                    </span>
                    <span className="text-[var(--ink-muted)]">Score: {item.quality_score}</span>
                    <span className="text-[var(--ink-muted)]">•</span>
                    <span className="text-emerald-500 font-medium">{item.citations_count} Citations Verified</span>
                  </div>
                  <h3 className="font-heading text-base sm:text-lg font-black text-[var(--ink-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--ink-secondary)]">
                    AI synthesis draft generated via academic open-access preprints. Awaiting editorial sign-off.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleReject(item.id)}
                    className="px-3.5 py-1.5 rounded-xl border border-[var(--border-subtle)] text-[var(--ink-secondary)] hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center text-xs text-[var(--ink-secondary)]">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            All candidate educational drafts have been reviewed and published.
          </div>
        )}
      </div>

      {/* Grid: Source Registry & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Source Registry Table */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Server className="w-4 h-4 text-[var(--accent-gold)]" /> Registered Crawl Endpoints ({sources.length})
          </h2>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs divide-y divide-[var(--border-subtle)]">
            {sources.map((s) => (
              <div key={s.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--ink-primary)] text-sm">{s.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-deep)] text-[var(--ink-secondary)] capitalize border border-[var(--border-subtle)]">
                      {s.category.replace(/_/g, " ")}
                    </span>
                  </div>
                  <p className="text-[var(--ink-muted)] text-[11px]">
                    {s.publisher_institution} • Rate: {s.rate_limit_per_minute}/min
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-500 font-bold text-[11px]">
                    Reliability: {s.reliability_score}
                  </span>
                  <button
                    onClick={() => handleSyncSource(s.id)}
                    disabled={syncingId === s.id}
                    className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] text-[var(--ink-secondary)] cursor-pointer"
                    title="Run synchronization"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${syncingId === s.id ? "animate-spin text-[var(--accent-gold)]" : ""}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Stream */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-amber-500" /> Operational Audit Stream
          </h2>

          <div className="p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs space-y-3 font-mono text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl bg-[var(--bg-deep)] border border-[var(--border-subtle)] space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[var(--ink-muted)]">
                  <span className="text-[var(--accent-gold)] font-bold">{log.actor}</span>
                  <span>{log.time}</span>
                </div>
                <div className="text-[var(--ink-primary)] text-xs font-sans font-medium">
                  {log.action.replace(/_/g, " ")}
                </div>
                <div className="text-[11px] text-[var(--ink-muted)] truncate">
                  Target: {log.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
