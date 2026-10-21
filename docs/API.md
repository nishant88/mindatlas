# MindAtlas API Contracts & Endpoint Specification

Base URL: `http://localhost:8000/api/v1`

---

## 1. Articles API (`/articles`)

### `GET /articles`
List published educational syntheses.
- **Query Parameters**:
  - `discipline` (string, optional): e.g., "Psychology", "Philosophy"
  - `difficulty` (string, optional): "beginner", "intermediate", "advanced"
  - `article_type` (string, optional): "deep_dive_synthesis", "beginner_explainer"
  - `limit` (integer, default: 20)
  - `offset` (integer, default: 0)
- **Response**: `200 OK`
```json
[
  {
    "id": 1,
    "slug": "cognitive-dissonance-and-belief-perseverance",
    "title": "Cognitive Dissonance and the Architecture of Self-Justification",
    "subtitle": "How the human brain resolves conflicting evidence...",
    "summary": "An evidence-based synthesis...",
    "primary_discipline": "Psychology",
    "reading_time_mins": 12,
    "difficulty_level": "intermediate",
    "published_at": "2024-03-15T10:00:00Z"
  }
]
```

### `GET /articles/{slug}`
Retrieve complete 20-section article with verified claim citations and related graph concepts.
- **Path Parameter**: `slug` (string)
- **Response**: `200 OK`
```json
{
  "id": 1,
  "slug": "cognitive-dissonance-and-belief-perseverance",
  "title": "Cognitive Dissonance and the Architecture of Self-Justification",
  "why_it_matters": "...",
  "learning_objectives": [...],
  "beginner_explanation": "...",
  "detailed_explanation": "...",
  "concrete_examples": [...],
  "claim_citations": [
    {
      "id": 1,
      "passage_reference": "sec_detailed_explanation_claim_1",
      "claim_text": "...",
      "supporting_quote": "...",
      "source_title": "A Theory of Cognitive Dissonance",
      "source_author": "Leon Festinger",
      "doi": "10.1515/9781503620766",
      "verification_status": "verified",
      "confidence_score": 0.98
    }
  ],
  "related_concepts": [...],
  "flashcards": [...]
}
```

---

## 2. Knowledge Graph API (`/graph`)

### `GET /graph`
Retrieve concept nodes and typed directed relationship links for canvas rendering.
- **Query Parameters**:
  - `root_concept_id` (integer, optional): Ego-network center
  - `depth` (integer, default: 2)
  - `relationship_type` (string, optional): "prerequisite_of", "related_to", "supports", "extends", "critiques"
- **Response**: `200 OK`
```json
{
  "nodes": [
    {
      "id": "1",
      "name": "Cognitive Dissonance",
      "category": "theory",
      "discipline": "Psychology",
      "short_definition": "..."
    }
  ],
  "links": [
    {
      "id": "1",
      "source": "1",
      "target": "2",
      "relationship_type": "related_to",
      "rationale": "Dissonance reduction motivates confirmation-seeking."
    }
  ],
  "total_nodes": 8,
  "total_links": 6
}
```

---

## 3. Study Planner API (`/study`)

### `GET /study/plans`
Get 12-week structured study plans with daily sessions, flashcards, and checklists.
- **Response**: `200 OK`

### `POST /study/sessions/{session_id}/complete`
Mark a session as completed with a comprehension rating (1-5).
- **Body**:
```json
{
  "is_completed": true,
  "comprehension_rating": 5
}
```

### `POST /study/spaced-repetition/review`
Compute SuperMemo SM-2 interval for active recall repetition.
- **Body**:
```json
{
  "repetition_count": 1,
  "ease_factor": 2.5,
  "quality_rating": 4
}
```
- **Response**:
```json
{
  "interval_days": 6,
  "repetition_count": 2,
  "ease_factor": 2.5,
  "next_review_due": "2024-04-16T12:00:00Z"
}
```

---

## 4. Hybrid Search & Q&A API (`/search`)

### `GET /search`
Perform hybrid search across articles, concepts, and trigger evidence-aware Q&A synthesis.
- **Query Parameter**: `q` (string, required): e.g., "moral relativism", "confirmation bias"
- **Response**: `200 OK`
```json
{
  "query": "confirmation bias",
  "qa_synthesis": {
    "question": "How does confirmation bias differ from motivated reasoning?",
    "synthesis": "...",
    "evidence_distinction": "...",
    "disagreements": "...",
    "citations": [...]
  },
  "articles": [...],
  "concepts": [...]
}
```

---

## 5. Research & Crawler API (`/research`)

### `GET /research/discovered`
List discovered open-access publications with multi-dimensional quality scores.
- **Query Parameters**:
  - `min_quality` (float, default: 0.0)
  - `discipline` (string, optional)

### `POST /research/run-pipeline`
Trigger manual crawl and synthesis pipeline.
- **Body**:
```json
{
  "search_terms": ["Cognitive Dissonance", "Bayesian Epistemology"]
}
```

---

## 6. Admin & Editorial API (`/admin`)

- `GET /admin/metrics`: Platform health and counts.
- `GET /admin/review-queue`: Candidate drafts awaiting editorial review.
- `POST /admin/articles/{id}/review`: Approve or reject article (`decision`: "approve" | "reject").
- `GET /admin/audit-logs`: Operational audit log entries.
