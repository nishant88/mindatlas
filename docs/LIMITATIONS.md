# MindAtlas: Known Limitations, External Dependencies & Roadmap

---

## 1. Known Limitations

1. **Open-Access Boundary**:
   - In accordance with Core Operating Principle #4 and #5, MindAtlas never circumvents publisher paywalls, authentication portals, or CAPTCHAs.
   - For closed-access journals, MindAtlas indexes only authorized metadata, abstracts, and DOIs, directing users to university libraries or institutional open-access repositories.
2. **Medical & Diagnostic Disclaimer**:
   - Psychological and cognitive material is curated strictly for educational and philosophical enrichment. It must never be utilized as individualized psychiatric diagnosis or as a substitute for professional clinical care.
3. **Graph Rendering Density**:
   - In dense subgraphs ($> 500$ simultaneous nodes), SVG rendering in the browser canvas can experience framerate drops on mobile devices. Subgraphs are therefore pruned to degree $\le 3$ with interactive expansion controls.
4. **Offline Mode**:
   - When external research APIs are unreachable or offline, the platform relies on verified authentic local fixtures and pre-computed scholarly models, ensuring uninterrupted availability.

---

## 2. External Dependencies

- **OpenAlex API**: Primary catalog for cognitive science and psychology works.
- **Crossref API**: Primary DOI metadata resolution and bibliographic citation linkage.
- **Gutendex / Project Gutenberg**: Public domain philosophical monographs.
- **PostgreSQL / pgvector** (or SQLite with aiosqlite): Primary relational storage engine.
- **Node.js (v20+) & Python (v3.10+)**: Core runtime environments.

---

## 3. Future Improvements (Roadmap)

- **Vector Semantic Search (pgvector integration)**: Extend full-text keyword indexing with high-dimensional embeddings (`text-embedding-3-small` / open-source `bge-large-en-v1.5`).
- **PDF Annotation Synchronizer**: Allow scholars to upload legally downloaded open-access PDFs and extract highlighted passages directly into personal collections.
- **Interactive Socratic Dialogue Tutor**: Chat mode grounded strictly in verified claim citations to debate ethical and epistemological counterarguments.
- **Multi-lingual Translation**: Enable cross-lingual synthesis across French, German, and classical philosophical translations.
