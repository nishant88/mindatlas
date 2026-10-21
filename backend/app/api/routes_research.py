from typing import List, Optional, Dict, Any
from fastapi import APIRouter, Depends, Query, Body, BackgroundTasks
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db, AsyncSessionLocal
from app.models.entities import DiscoveredResource, ResourceAuthor, Source
from app.services.pipeline_orchestrator import pipeline_orchestrator

router = APIRouter(prefix="/research", tags=["research"])

@router.get("/discovered")
async def get_discovered_resources(
    discipline: Optional[str] = Query(None),
    min_quality: float = Query(0.0, ge=0.0, le=1.0),
    methodology: Optional[str] = Query(None),
    limit: int = Query(25, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    stmt = (
        select(DiscoveredResource)
        .options(selectinload(DiscoveredResource.authors), selectinload(DiscoveredResource.source))
        .where(DiscoveredResource.overall_quality_score >= min_quality)
    )
    if discipline:
        stmt = stmt.where(DiscoveredResource.primary_discipline == discipline)
    if methodology:
        stmt = stmt.where(DiscoveredResource.methodology_type == methodology)
    stmt = stmt.order_by(desc(DiscoveredResource.created_at)).limit(limit)

    res = await db.execute(stmt)
    resources = res.scalars().all()

    return [
        {
            "id": r.id,
            "title": r.title,
            "abstract": r.abstract,
            "doi": r.doi,
            "canonical_url": r.canonical_url,
            "primary_discipline": r.primary_discipline,
            "format_type": r.format_type,
            "methodology_type": r.methodology_type,
            "overall_quality_score": r.overall_quality_score,
            "authority_score": r.authority_score,
            "evidence_rigor_score": r.evidence_rigor_score,
            "relevance_score": r.relevance_score,
            "originality_score": r.originality_score,
            "traceability_score": r.traceability_score,
            "quality_justification": r.quality_justification,
            "source_name": r.source.name if r.source else "Academic Source",
            "authors": [a.author_name for a in r.authors],
            "published_date": r.published_date.isoformat() if r.published_date else None,
            "created_at": r.created_at.isoformat()
        }
        for r in resources
    ]

@router.post("/run-pipeline")
async def trigger_pipeline_run(
    payload: Dict[str, Any] = Body(default={}),
    db: AsyncSession = Depends(get_db)
):
    """Trigger manual research pipeline cycle."""
    terms = payload.get("search_terms", ["Cognitive Dissonance", "Bayesian Epistemology"])
    result = await pipeline_orchestrator.run_daily_pipeline(db, search_terms=terms)
    return result
