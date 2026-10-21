import pytest
from app.services.synthesizer import ai_synthesizer

@pytest.mark.asyncio
async def test_ai_synthesizer_generates_20_sections():
    mock_sources = [
        {
            "title": "A Theory of Cognitive Dissonance",
            "doi": "10.1515/9781503620766",
            "canonical_url": "https://doi.org/10.1515/9781503620766",
            "abstract": "Foundational demonstration of attitude change resulting from psychological discomfort.",
            "authors": ["Leon Festinger"],
            "published_date": "1957-01-01"
        }
    ]
    article = await ai_synthesizer.generate_article(
        topic="Cognitive Dissonance",
        sources=mock_sources,
        article_type="deep_dive_synthesis",
        discipline="Psychology"
    )

    assert article.title is not None
    assert article.why_it_matters is not None
    assert len(article.learning_objectives) >= 3
    assert len(article.prerequisite_concepts) >= 2
    assert len(article.beginner_explanation) > 50
    assert len(article.detailed_explanation) > 100
    assert len(article.concrete_examples) >= 2
    assert len(article.common_misconceptions) >= 1
    assert len(article.counterarguments_and_alternatives) >= 1
    assert len(article.key_takeaways) >= 2
    assert len(article.review_questions) >= 1
    assert len(article.flashcards) >= 1
    assert len(article.claim_citations) >= 1

    # Check citation integrity
    cit = article.claim_citations[0]
    assert cit.doi == "10.1515/9781503620766"
    assert cit.verification_status == "verified"
    assert cit.confidence_score >= 0.90
