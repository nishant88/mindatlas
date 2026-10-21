from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class QualityAssessment(BaseModel):
    overall_score: float = Field(..., ge=0.0, le=1.0)
    authority_score: float = Field(..., ge=0.0, le=1.0)
    evidence_rigor_score: float = Field(..., ge=0.0, le=1.0)
    relevance_score: float = Field(..., ge=0.0, le=1.0)
    originality_score: float = Field(..., ge=0.0, le=1.0)
    traceability_score: float = Field(..., ge=0.0, le=1.0)
    licensing_score: float = Field(..., ge=0.0, le=1.0)
    methodology_classification: str
    dimension_breakdown: Dict[str, float]
    justification: str
    recommended_for_synthesis: bool


class SourceEvaluator:
    """
    Transparent scoring framework that prioritizes authoritative, methodologically rigorous,
    and verifiable intellectual material without equating prestige or click counts to truth.
    """

    METHODOLOGY_WEIGHTS = {
        "meta_analysis": 0.95,
        "systematic_review": 0.92,
        "randomized_controlled_trial": 0.90,
        "longitudinal_study": 0.85,
        "conceptual_philosophical": 0.88,
        "observational": 0.75,
        "case_study": 0.65,
        "theoretical_model": 0.80,
        "primary_historical_text": 0.90,
        "pre_print": 0.60
    }

    DISCIPLINE_KEYWORD_MAP = {
        "Psychology": ["cognition", "behavior", "heuristic", "bias", "perception", "dissonance", "social psychology", "memory"],
        "Philosophy": ["epistemology", "ethics", "metaphysics", "existentialism", "normative", "dialectic", "ontological"],
        "Critical Thinking": ["fallacy", "formal logic", "validity", "soundness", "syllogism", "rationality", "argumentation"],
        "Neuroscience": ["neural", "cortex", "synapse", "fMRI", "consciousness", "neuroplasticity", "prefrontal"],
        "Behavioral Economics": ["prospect theory", "loss aversion", "nudge", "game theory", "bounded rationality", "utility"],
        "Sociology": ["collective behavior", "social structure", "cultural norms", "institutions", "social identity"]
    }

    def evaluate_resource(
        self,
        title: str,
        abstract: str,
        discipline: str,
        format_type: str,
        doi: Optional[str] = None,
        methodology: Optional[str] = None,
        source_name: Optional[str] = None,
        is_open_access: bool = True
    ) -> QualityAssessment:
        text_corpus = f"{title.lower()} {abstract.lower()}"
        detected_methodology = methodology or self._infer_methodology(text_corpus, discipline)
        
        # 1. Authority & Editorial Standards
        authority_score = 0.80
        if source_name in ["OpenAlex", "Crossref", "Stanford Encyclopedia of Philosophy", "PubMed"]:
            authority_score = 0.92
        elif source_name in ["Project Gutenberg", "Internet Archive"]:
            authority_score = 0.88
        if doi:
            authority_score = min(1.0, authority_score + 0.05)

        # 2. Evidence Quality & Methodological Rigor
        evidence_rigor = self.METHODOLOGY_WEIGHTS.get(detected_methodology, 0.75)
        
        # Subject-specific refinements
        if discipline == "Psychology":
            if "replication" in text_corpus or "pre-registered" in text_corpus:
                evidence_rigor = min(1.0, evidence_rigor + 0.08)
            elif "anecdotal" in text_corpus or "uncontrolled" in text_corpus:
                evidence_rigor = max(0.40, evidence_rigor - 0.20)
        elif discipline == "Philosophy":
            if any(term in text_corpus for term in ["objection", "counterargument", "premise", "reductio"]):
                evidence_rigor = min(1.0, evidence_rigor + 0.10)
        elif discipline == "Neuroscience":
            if "animal model" in text_corpus and "human behavior" in text_corpus:
                evidence_rigor = max(0.60, evidence_rigor - 0.15)  # Caveat indirect extrapolation
            elif "fmri" in text_corpus and "sample size" in text_corpus:
                evidence_rigor = min(1.0, evidence_rigor + 0.05)
        elif discipline == "Critical Thinking":
            if "formal logic" in text_corpus or "truth table" in text_corpus:
                evidence_rigor = 0.95

        # 3. Relevance to core curriculum
        keywords = self.DISCIPLINE_KEYWORD_MAP.get(discipline, [])
        matches = sum(1 for kw in keywords if kw in text_corpus)
        relevance_score = min(1.0, 0.65 + (matches * 0.07))

        # 4. Originality & Intellectual Contribution
        originality_score = 0.82
        if any(term in text_corpus for term in ["novel", "paradigm", "first demonstration", "groundbreaking", "foundational"]):
            originality_score = 0.90

        # 5. Traceability & Citation Integrity
        traceability_score = 0.70
        if doi:
            traceability_score += 0.20
        if "references" in text_corpus or "bibliography" in text_corpus or len(abstract) > 300:
            traceability_score += 0.08
        traceability_score = min(1.0, traceability_score)

        # 6. Licensing & Lawful Access
        licensing_score = 1.0 if is_open_access else 0.75

        # Weighted aggregate score
        overall_score = (
            authority_score * 0.20 +
            evidence_rigor * 0.25 +
            relevance_score * 0.20 +
            originality_score * 0.15 +
            traceability_score * 0.10 +
            licensing_score * 0.10
        )
        overall_score = round(min(1.0, max(0.1, overall_score)), 3)

        # Transparent justification generator
        justification = (
            f"Evaluated as {detected_methodology.replace('_', ' ').title()} in {discipline}. "
            f"Evidence rigor ({evidence_rigor:.2f}) evaluated against disciplinary standards. "
            f"Source authority rated {authority_score:.2f} with traceability of {traceability_score:.2f}."
        )

        return QualityAssessment(
            overall_score=overall_score,
            authority_score=round(authority_score, 2),
            evidence_rigor_score=round(evidence_rigor, 2),
            relevance_score=round(relevance_score, 2),
            originality_score=round(originality_score, 2),
            traceability_score=round(traceability_score, 2),
            licensing_score=round(licensing_score, 2),
            methodology_classification=detected_methodology,
            dimension_breakdown={
                "Authority": round(authority_score, 2),
                "Evidence Rigor": round(evidence_rigor, 2),
                "Subject Relevance": round(relevance_score, 2),
                "Originality": round(originality_score, 2),
                "Traceability": round(traceability_score, 2),
                "Open Licensing": round(licensing_score, 2)
            },
            justification=justification,
            recommended_for_synthesis=overall_score >= 0.75
        )

    def _infer_methodology(self, text: str, discipline: str) -> str:
        if "meta-analysis" in text or "systematic review" in text:
            return "meta_analysis"
        if "randomized" in text and "trial" in text:
            return "randomized_controlled_trial"
        if "longitudinal" in text or "cohort" in text:
            return "longitudinal_study"
        if "fMRI" in text or "neuroimaging" in text or "electrophysiology" in text:
            return "observational"
        if discipline == "Philosophy" or "conceptual" in text or "argument" in text:
            return "conceptual_philosophical"
        if "experiment" in text or "participants were assigned" in text:
            return "randomized_controlled_trial"
        if "case study" in text or "single case" in text:
            return "case_study"
        return "observational"

source_evaluator = SourceEvaluator()
