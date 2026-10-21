# MindAtlas Operational Procedures

This document outlines deployment, scheduled ingestion maintenance, monitoring, backups, and disaster recovery.

---

## 1. Daily Ingestion Pipeline Execution

The research discovery pipeline is designed to be **idempotent, resumable, and error-tolerant**:
- Can be triggered manually via `POST /api/v1/research/run-pipeline` or scheduled via standard Cron / systemd timer.
- Standard daily cron expression:
  ```cron
  0 2 * * * cd /app && PYTHONPATH=backend ./backend/venv/bin/python3 -c "import asyncio; from app.core.database import AsyncSessionLocal; from app.services.pipeline_orchestrator import pipeline_orchestrator; asyncio.run(pipeline_orchestrator.run_daily_pipeline(AsyncSessionLocal()))"
  ```
- **Error Backoff & Dead-Letter Queue**: If an individual external source times out or returns HTTP 429 (Rate Limited), the worker logs the incident into `sources.error_history` and continues processing remaining sources. Persistent failures are flagged in `processing_jobs.status = 'failed'` and surface immediately in the Admin Console.

---

## 2. Health Monitoring & Service Level Objectives (SLOs)

- **API Health Endpoint**: `GET /api/v1/health`
  - Returns `{"status": "healthy", "database": "connected", "knowledge_graph": "active"}`.
  - Used for Docker / Kubernetes liveness and readiness probes.
- **Latency Target**:
  - Interactive API responses (Articles, Knowledge Graph, Search) $\le 120\text{ms}$.
  - AI Synthesis batch jobs run asynchronously in background workers without blocking HTTP request threads.
- **Citation Fidelity Target**:
  - 100% of claims published in educational monographs must have an associated `claim_citations` record pointing to a valid DOI, canonical URL, or public domain archive.

---

## 3. Database Backup & Disaster Recovery

### Automated Daily Snapshot
```bash
# SQLite backup (using online vacuum backup API)
sqlite3 /app/mindatlas.db ".backup '/backups/mindatlas_$(date +%Y%m%d).db'"

# PostgreSQL backup (if configured)
pg_dump -U postgres -d mindatlas -F c -b -v -f "/backups/mindatlas_$(date +%Y%m%d).dump"
```

### Restoration Verification Test
```bash
# Verify integrity of backup snapshot
sqlite3 /backups/mindatlas_test.db "PRAGMA integrity_check;"
```

---

## 4. Environment Variables Reference

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | SQLAlchemy Async connection string | `sqlite+aiosqlite:///./mindatlas.db` |
| `OPENALEX_API_URL` | OpenAlex API base endpoint | `https://api.openalex.org` |
| `CROSSREF_API_URL` | Crossref API base endpoint | `https://api.crossref.org` |
| `GUTENBERG_API_URL`| Project Gutenberg API endpoint | `https://gutendex.com/books` |
| `OPENAI_API_KEY` | Optional OpenAI key for external LLM | `None` (built-in scholarly fallback active) |
| `ANTHROPIC_API_KEY`| Optional Anthropic key | `None` |
| `GEMINI_API_KEY` | Optional Google Gemini key | `None` |
| `CRAWL_POLITENESS_DELAY_SECONDS` | Rate limit delay between requests | `1.0` |
