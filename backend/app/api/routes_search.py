from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.search_engine import search_engine_service

router = APIRouter(prefix="/search", tags=["search"])

@router.get("")
async def search(
    q: str = Query(..., min_length=1),
    discipline: Optional[str] = Query(None),
    difficulty: Optional[str] = Query(None),
    article_type: Optional[str] = Query(None),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db)
):
    return await search_engine_service.hybrid_search(
        db=db,
        query=q,
        discipline=discipline,
        difficulty=difficulty,
        article_type=article_type,
        limit=limit
    )
