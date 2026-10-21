from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.entities import Article, ClaimCitation, ArticleConcept, ArticleSourceLink, Concept, DiscoveredResource
from app.services.synthesizer import ai_synthesizer

router = APIRouter(prefix="/articles", tags=["articles"])

@router.get("")
async def list_articles(
    discipline: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    article_type: Optional[str] = Query(None),
    status: str = Query("published"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Article).where(Article.status == status)
    if discipline:
        stmt = stmt.where(Article.primary_discipline == discipline)
    if difficulty:
        stmt = stmt.where(Article.difficulty_level == difficulty)
    if article_type:
        stmt = stmt.where(Article.article_type == article_type)
    stmt = stmt.order_by(desc(Article.published_at)).offset(offset).limit(limit)
    res = await db.execute(stmt)
    articles = res.scalars().all()
    
    return [
        {
            "id": a.id,
            "slug": a.slug,
            "title": a.title,
            "subtitle": a.subtitle,
            "summary": a.summary,
            "article_type": a.article_type,
            "primary_discipline": a.primary_discipline,
            "subdisciplines": a.subdisciplines,
            "reading_time_mins": a.reading_time_mins,
            "difficulty_level": a.difficulty_level,
            "status": a.status,
            "published_at": a.published_at.isoformat() if a.published_at else None,
            "last_reviewed_at": a.last_reviewed_at.isoformat() if a.last_reviewed_at else None,
        }
        for a in articles
    ]

@router.get("/{slug}")
async def get_article_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Article)
        .where(Article.slug == slug)
        .options(
            selectinload(Article.claim_citations),
            selectinload(Article.concepts).selectinload(ArticleConcept.concept),
            selectinload(Article.source_links).selectinload(ArticleSourceLink.resource)
        )
    )
    res = await db.execute(stmt)
    article = res.scalar_one_or_none()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return {
        "id": article.id,
        "slug": article.slug,
        "title": article.title,
        "subtitle": article.subtitle,
        "summary": article.summary,
        "article_type": article.article_type,
        "primary_discipline": article.primary_discipline,
        "subdisciplines": article.subdisciplines,
        "reading_time_mins": article.reading_time_mins,
        "difficulty_level": article.difficulty_level,
        "status": article.status,
        "current_version": article.current_version,
        "published_at": article.published_at.isoformat() if article.published_at else None,
        "last_reviewed_at": article.last_reviewed_at.isoformat() if article.last_reviewed_at else None,
        "why_it_matters": article.why_it_matters,
        "learning_objectives": article.learning_objectives,
        "prerequisite_concepts": article.prerequisite_concepts,
        "beginner_explanation": article.beginner_explanation,
        "detailed_explanation": article.detailed_explanation,
        "historical_background": article.historical_background,
        "major_theories_and_thinkers": article.major_theories_and_thinkers,
        "concrete_examples": article.concrete_examples,
        "case_studies_and_experiments": article.case_studies_and_experiments,
        "common_misconceptions": article.common_misconceptions,
        "counterarguments_and_alternatives": article.counterarguments_and_alternatives,
        "practical_applications": article.practical_applications,
        "limitations_and_unresolved_questions": article.limitations_and_unresolved_questions,
        "key_takeaways": article.key_takeaways,
        "review_questions": article.review_questions,
        "flashcards": article.flashcards,
        "further_reading": article.further_reading,
        "claim_citations": [
            {
                "id": c.id,
                "passage_reference": c.passage_reference,
                "claim_text": c.claim_text,
                "supporting_quote": c.supporting_quote_or_finding,
                "source_title": c.source_title,
                "source_author": c.source_author,
                "source_year": c.source_year,
                "doi": c.doi,
                "canonical_url": c.canonical_url,
                "page_or_section": c.page_or_section,
                "verification_status": c.verification_status,
                "confidence_score": c.confidence_score
            }
            for c in article.claim_citations
        ],
        "related_concepts": [
            {
                "id": ac.concept.id,
                "slug": ac.concept.slug,
                "name": ac.concept.name,
                "category": ac.concept.category,
                "discipline": ac.concept.discipline,
                "short_definition": ac.concept.short_definition
            }
            for ac in article.concepts if ac.concept
        ],
        "sources": [
            {
                "id": sl.resource.id,
                "title": sl.resource.title,
                "doi": sl.resource.doi,
                "canonical_url": sl.resource.canonical_url,
                "quality_score": sl.resource.overall_quality_score,
                "citation_type": sl.citation_type
            }
            for sl in article.source_links if sl.resource
        ]
    }
