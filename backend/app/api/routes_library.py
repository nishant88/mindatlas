from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Body, Response
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.entities import Collection, SavedItem, Note, Highlight, Article, DiscoveredResource

router = APIRouter(prefix="/library", tags=["library"])

@router.get("/saved")
async def get_saved_items(user_id: int = 1, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(SavedItem)
        .where(SavedItem.user_id == user_id)
        .order_by(desc(SavedItem.created_at))
    )
    items = (await db.execute(stmt)).scalars().all()
    
    result = []
    for it in items:
        # Load related article details if applicable
        title = "Saved Library Item"
        slug = ""
        discipline = "Interdisciplinary"
        if it.item_type == "article":
            art = (await db.execute(select(Article).where(Article.id == it.target_id))).scalar_one_or_none()
            if art:
                title = art.title
                slug = art.slug
                discipline = art.primary_discipline

        result.append({
            "id": it.id,
            "target_id": it.target_id,
            "item_type": it.item_type,
            "title": title,
            "slug": slug,
            "discipline": discipline,
            "status": it.status,
            "reading_progress_percent": it.reading_progress_percent,
            "created_at": it.created_at.isoformat()
        })
    return result

@router.post("/saved")
async def save_item(
    payload: Dict[str, Any] = Body(...),
    user_id: int = 1,
    db: AsyncSession = Depends(get_db)
):
    target_id = payload.get("target_id")
    item_type = payload.get("item_type", "article")

    stmt = select(SavedItem).where(
        SavedItem.user_id == user_id,
        SavedItem.target_id == target_id,
        SavedItem.item_type == item_type
    )
    existing = (await db.execute(stmt)).scalar_one_or_none()
    if existing:
        return {"status": "already_saved", "id": existing.id}

    item = SavedItem(
        user_id=user_id,
        item_type=item_type,
        target_id=target_id,
        status="saved",
        reading_progress_percent=0
    )
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return {"status": "saved", "id": item.id}

@router.delete("/saved/{item_id}")
async def remove_saved_item(item_id: int, user_id: int = 1, db: AsyncSession = Depends(get_db)):
    stmt = select(SavedItem).where(SavedItem.id == item_id, SavedItem.user_id == user_id)
    item = (await db.execute(stmt)).scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Saved item not found")
    await db.delete(item)
    await db.commit()
    return {"status": "removed"}

@router.get("/notes")
async def get_notes(user_id: int = 1, db: AsyncSession = Depends(get_db)):
    stmt = select(Note).where(Note.user_id == user_id).order_by(desc(Note.updated_at))
    notes = (await db.execute(stmt)).scalars().all()
    return [
        {
            "id": n.id,
            "title": n.title,
            "content_markdown": n.content_markdown,
            "tags": n.tags,
            "article_id": n.article_id,
            "concept_id": n.concept_id,
            "created_at": n.created_at.isoformat(),
            "updated_at": n.updated_at.isoformat()
        }
        for n in notes
    ]

@router.post("/notes")
async def create_note(
    payload: Dict[str, Any] = Body(...),
    user_id: int = 1,
    db: AsyncSession = Depends(get_db)
):
    note = Note(
        user_id=user_id,
        title=payload.get("title", "Untitled Observation"),
        content_markdown=payload.get("content_markdown", ""),
        tags=payload.get("tags", []),
        article_id=payload.get("article_id"),
        concept_id=payload.get("concept_id")
    )
    db.add(note)
    await db.commit()
    await db.refresh(note)
    return {"status": "created", "note": {"id": note.id, "title": note.title}}

@router.get("/export")
async def export_library(
    format: str = "bibtex",  # bibtex, markdown, json
    user_id: int = 1,
    db: AsyncSession = Depends(get_db)
):
    notes = (await db.execute(select(Note).where(Note.user_id == user_id))).scalars().all()
    saved = (await db.execute(select(SavedItem).where(SavedItem.user_id == user_id))).scalars().all()
    articles = (await db.execute(select(Article))).scalars().all()
    art_map = {a.id: a for a in articles}

    if format == "markdown":
        lines = ["# MindAtlas Personal Knowledge Library Export\n\n"]
        lines.append("## Saved Articles & Reading Queue\n")
        for s in saved:
            art = art_map.get(s.target_id)
            if art:
                lines.append(f"- **{art.title}** ({art.primary_discipline}) — Status: `{s.status}`\n  Link: `/articles/{art.slug}`\n")
        lines.append("\n## Personal Research Notes\n")
        for n in notes:
            lines.append(f"### {n.title}\n{n.content_markdown}\n*Tags: {', '.join(n.tags)}*\n\n")
        return Response(content="".join(lines), media_type="text/markdown")

    elif format == "bibtex":
        entries = []
        for a in articles[:10]:
            safe_key = a.slug.replace("-", "_")
            entries.append(
                f"@article{{{safe_key},\n"
                f"  title = {{{a.title}}},\n"
                f"  author = {{MindAtlas Synthesis Engine}},\n"
                f"  journal = {{MindAtlas Human Knowledge Library}},\n"
                f"  year = {{{a.published_at.year if a.published_at else 2024}}},\n"
                f"  url = {{https://mindatlas.library/articles/{a.slug}}}\n"
                f"}}"
            )
        return Response(content="\n\n".join(entries), media_type="application/x-bibtex")

    else:
        return {
            "exported_at": datetime.utcnow().isoformat(),
            "notes": [{"id": n.id, "title": n.title, "content": n.content_markdown, "tags": n.tags} for n in notes],
            "saved_items": [{"id": s.id, "target_id": s.target_id, "status": s.status} for s in saved]
        }
