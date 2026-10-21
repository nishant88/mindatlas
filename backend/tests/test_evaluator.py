import pytest
from app.services.source_evaluator import source_evaluator

def test_source_evaluator_meta_analysis():
    assessment = source_evaluator.evaluate_resource(
        title="A Meta-Analytic Review of Cognitive Dissonance Induced Compliance Paradigms",
        abstract="A systematic review and meta-analysis of 142 randomized controlled trials examining effect sizes across attitude change experiments.",
        discipline="Psychology",
        format_type="peer_reviewed_paper",
        doi="10.1037/0033-2909.123.4.567",
        source_name="OpenAlex"
    )
    assert assessment.overall_score >= 0.85
    assert assessment.methodology_classification == "meta_analysis"
    assert assessment.evidence_rigor_score >= 0.90
    assert assessment.recommended_for_synthesis is True
    assert "Authority" in assessment.dimension_breakdown

def test_source_evaluator_philosophical_argument():
    assessment = source_evaluator.evaluate_resource(
        title="On What Matters: Epistemic Normativity and Non-Naturalism",
        abstract="A conceptual philosophical argument articulating objections to reductive naturalism and responding to metaethical counterarguments.",
        discipline="Philosophy",
        format_type="book",
        source_name="Stanford Encyclopedia of Philosophy"
    )
    assert assessment.overall_score >= 0.75
    assert assessment.methodology_classification == "conceptual_philosophical"
    assert "Philosophy" in assessment.justification
