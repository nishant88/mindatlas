# 🧭 MindAtlas — The Ever-Growing Human Knowledge Library

[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-green.svg)](https://fastapi.tiangolo.com/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-amber.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

> **A serious, evidence-grounded intellectual learning environment** dedicated to discovering, evaluating, organizing, connecting, and teaching the world's best educational material on psychology, philosophy, cognitive science, neuroscience, behavioral economics, critical thinking, and the history of ideas.

---

## 🏛️ Core Operating Principles

1. **Quality over Quantity**: Prioritize authoritative, original, and educationally valuable monographs.
2. **Evidence over Popularity**: Reject ranking based solely on clicks or vanity metrics.
3. **Traceability**: Every factual claim is anchored to a verified external DOI or canonical archival source.
4. **Respect Open Access**: Rigorously adhere to copyright, CC licenses, and public domain works.
5. **No Plagiarism**: Synthesize and teach without republishing copyrighted texts or bypassing paywalls.
6. **Intellectual Honesty**: Transparently represent counterarguments, limitations, and scholarly disagreements.
7. **Interconnected Knowledge**: Unify disparate disciplines through a concept-level Knowledge Graph.
8. **Continuous Learning**: Discover and ingest new open-access resources daily without duplications.
9. **Human Oversight**: Maintain an editorial review queue, audit trails, and version rollback capabilities.
10. **Educational Utility**: Transform complex papers into structured 20-section syntheses, flashcards, and spaced-repetition curricula.

---

## 📖 The 9 Application Pages

| Page | Route | Description |
|---|---|---|
| **1. Home Dashboard** | `/` | Continue learning widget, today's recommended lesson, research digest, study progress, and explore by discipline. |
| **2. Discover** | `/discover` | Faceted discovery engine with discipline, difficulty, methodology, and curated thematic syllabi. |
| **3. Knowledge Library** | `/library` | Searchable syntheses with Grid/List toggles, bookmarks, reading time, and difficulty tags. |
| **4. Article Reader** | `/articles/[slug]` | Complete 20-section distraction-free long-form reader with claim-level verified citation popovers, adjustable typography, and flashcards. |
| **5. Study Planner** | `/study` | Prerequisite-aware 12-week interdisciplinary curriculum, daily lesson cards, and active recall quizzes. |
| **6. Knowledge Graph** | `/graph` | Interactive concept canvas with relationship filtering (`prerequisite_of`, `supports`, `critiques`, `extends`), node inspector, and deep links. |
| **7. Research Explorer** | `/research` | Discovered open-access publications, live pipeline execution trigger, and transparent multi-dimensional evaluation radar. |
| **8. My Library** | `/my-library` | Private research workspace with saved items, Markdown notes, custom tags, and export to **Markdown**, **BibTeX**, and **JSON**. |
| **9. Admin Console** | `/admin` | Source registry, live crawler synchronization, human editorial review queue, and audit log stream. |
| **Global Hybrid Search** | `⌘K` Modal | Natural language Q&A synthesis with citations, scholarly debate notes, and concept matches. |

---

## 🏗️ Repository Architecture

```
psychoSocial/
├── backend/
│   ├── app/
│   │   ├── api/             # REST endpoints (articles, graph, study, library, research, admin, search)
│   │   ├── core/            # Configuration, database engine, security
│   │   ├── models/          # SQLAlchemy relational data model (22 tables)
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── seed/            # Authentic scholarly seed dataset
│   │   ├── services/
│   │   │   ├── research_engine.py      # OpenAlex, Crossref, Gutenberg connectors
│   │   │   ├── source_evaluator.py     # Multi-dimensional quality scoring
│   │   │   ├── synthesizer.py          # 14-mode AI educational engine + claim citations
│   │   │   ├── knowledge_graph.py      # Graph traversal, ego-networks, path finding
│   │   │   ├── study_planner.py        # 12-week curriculum & SuperMemo SM-2 algorithm
│   │   │   ├── pipeline_orchestrator.py# 15-step daily research discovery pipeline
│   │   │   └── search_engine.py        # Hybrid search & evidence-aware Q&A synthesis
│   │   └── main.py          # FastAPI application entrypoint with lifespan startup
│   ├── tests/               # Pytest automated test suite (11 test suites)
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Backend containerization
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js App Router (All 9 pages)
│   │   ├── components/      # Navbar, Footer, SearchModal
│   │   └── lib/             # API client with resilient offline fallbacks
│   ├── package.json         # Frontend dependencies (Lucide, Tailwind CSS)
│   └── Dockerfile           # Frontend multi-stage containerization
├── docs/
│   ├── ARCHITECTURE.md      # Detailed system architecture & Mermaid diagrams
│   ├── API.md               # Complete REST API contract documentation
│   ├── DATA_MODEL.md        # Relational database schema reference
│   ├── OPERATIONS.md        # Deployment, monitoring, backups, SLOs
│   └── LIMITATIONS.md       # Scope, known limitations, and future roadmap
├── netlify.toml          # Zero-config Netlify build settings
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v20+ & npm
- Python 3.10+ & pip

### Option A: Running Locally

#### 1. Start the Backend API (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run FastAPI server (auto-creates and seeds database on first run)
PYTHONPATH=. uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
The backend API is now live at `http://127.0.0.1:8000` (API docs at `http://127.0.0.1:8000/docs`).

#### 2. Start the Frontend (Next.js)
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at **`http://localhost:3000`** to access the MindAtlas platform.

### Option B: Deploying to Netlify

MindAtlas is optimized for zero-config Netlify deployment:

1. **Via Netlify Git Integration**:
   - Push this repository to GitHub or GitLab.
   - In Netlify, click **"Add new site"** &rarr; **"Import an existing project"**.
   - Select your repository.
   - The included [`netlify.toml`](file:///Users/nishantguleria/Desktop/psychoSocial/netlify.toml) automatically sets:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - Click **Deploy Site**.

2. **Via Netlify CLI**:
   ```bash
   cd frontend
   npx netlify deploy --prod
   ```
   MindAtlas runs 100% self-contained with instant mock fallbacks when hosted on Netlify, requiring no external database or server configuration to view and interact with all synthesized models, graphs, and study tools.

## 🧪 Running Automated Tests

Run the complete backend test suite:
```bash
cd backend
PYTHONPATH=. ./venv/bin/pytest tests -v
```
**Test Coverage Includes:**
- Multi-dimensional source evaluator & methodology classifications
- AI article synthesizer (20-section schema & claim citations)
- 12-week curriculum construction & SuperMemo SM-2 interval calculations
- API endpoints (health, articles detail, graph traversal, search Q&A, study plans, admin metrics)

---

## 🔬 External Services & Optional API Keys

MindAtlas operates **100% out-of-the-box** using built-in scholarly synthesis models and direct open-access connectors.

To connect external LLM providers, configure a `.env` file in `backend/`:
```env
# Optional external LLMs (if unset, built-in deterministic scholarly engine is used)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...

# Optional Custom PostgreSQL database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/mindatlas
```

---

## 📜 Intellectual Property & Fair Use

MindAtlas strictly respects publisher terms and open-access rights:
- Public-domain classics (Project Gutenberg, Standard Ebooks).
- Open-access peer-reviewed literature (OpenAlex, Crossref, DOAJ, PubMed Central).
- Fair-use educational synthesis with explicit passage-level citation attribution.
- No paywalls or access controls are ever bypassed.
