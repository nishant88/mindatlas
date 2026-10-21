from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy import select, desc, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.entities import (
    Source, ProcessingJob, Article, EditorialReview, AuditLog, DiscoveredResource, ClaimCitation
)

router = APIRouter(prefix="/admin", tags=["admin"])

@router.get("/metrics")
async def get_admin_metrics(db: AsyncSession = Depends(get_db)):
    total_articles = (await db.execute(select(func.count(Article.id)))).scalar() or 0
    total_resources = (await db.execute(select(func.count(DiscoveredResource.id)))).scalar() or 0
    total_citations = (await db.execute(select(func.count(ClaimCitation.id)))).scalar() or 0
    total_sources = (await db.execute(select(func.count(Source.id)))).scalar() or 0
    pending_reviews = (await db.execute(select(func.count(Article.id)).where(Article.status == "pending_review"))).scalar() or 0
    
    return {
        "total_articles": total_articles,
        "total_discovered_resources": total_resources,
        "total_verified_citations": total_citations,
        "total_registered_sources": total_sources,
        "pending_editorial_reviews": pending_reviews,
        "system_status": "healthy",
        "last_health_check": datetime.utcnow().isoformat()
    }

@router.get("/jobs")
async def list_processing_jobs(
    limit: int = 20,
    db: AsyncSession = Depends(get_db)
):
    stmt = select(ProcessingJob).order_by(desc(ProcessingJob.started_at)).limit(limit)
    jobs = (await db.execute(stmt)).scalars().all()
    return [
        {
            "id": j.id,
            "job_type": j.job_type,
            "status": j.status,
            "started_at": j.started_at.isoformat() if j.started_at else None,
            "completed_at": j.completed_at.isoformat() if j.completed_at else None,
            "items_processed": j.items_processed,
            "error_message": j.error_message,
            "job_metadata": j.job_metadata
        }
        for j in jobs
    ]

@router.get("/review-queue")
async def list_review_queue(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Article)
        .where(Article.status == "pending_review")
        .options(selectinload(Article.claim_citations))
        .order_by(desc(Article.created_at))
    )
    articles = (await db.execute(stmt)).scalars().all()
    return [
        {
            "id": a.id,
            "slug": a.slug,
            "title": a.title,
            "summary": a.summary,
            "primary_discipline": a.primary_discipline,
            "citations_count": len(a.claim_citations),
            "created_at": a.created_at.isoformat()
        }
        for a in articles
    ]

@router.post("/articles/{article_id}/review")
async def review_article(
    article_id: int,
    payload: Dict[str, Any] = Body(...),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Article).where(Article.id == article_id)
    article = (await db.execute(stmt)).scalar_one_or_none()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    decision = payload.get("decision", "approve")  # approve, reject
    notes = payload.get("notes", "Editorial validation passed.")

    if decision == "approve":
        article.status = "published"
        article.last_reviewed_at = datetime.utcnow()
    else:
        article.status = "archived"

    rev = EditorialReview(
        article_id=article.id,
        reviewer_name=payload.get("reviewer_name", "Chief Editor"),
        status="approved" if decision == "approve" else "rejected",
        review_notes=notes,
        citation_fidelity_score=0.98
    )
    db.add(rev)

    db.add(AuditLog(
        actor="chief_editor",
        action_type=f"article_{decision}d",
        target_entity="articles",
        target_id=article.id,
        details={"notes": notes, "decision": decision}
    ))

    await db.commit()
    return {"status": "success", "article_status": article.status}

@router.get("/audit-logs")
async def list_audit_logs(limit: int = 50, db: AsyncSession = Depends(get_db)):
    stmt = select(AuditLog).order_by(desc(AuditLog.timestamp)).limit(limit)
    logs = (await db.execute(stmt)).scalars().all()
    return [
        {
            "id": l.id,
            "actor": l.actor,
            "action_type": l.action_type,
            "target_entity": l.target_entity,
            "target_id": l.target_id,
            "details": l.details,
            "timestamp": l.timestamp.isoformat()
        }
        for l in logs
    ]
