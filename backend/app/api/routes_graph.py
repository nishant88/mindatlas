from typing import Optional, List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.knowledge_graph import knowledge_graph_service

router = APIRouter(prefix="/graph", tags=["graph"])

@router.get("")
async def get_knowledge_graph(
    root_concept_id: Optional[int] = Query(None),
    depth: int = Query(2, ge=1, le=4),
    relationship_type: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    rel_filter = [relationship_type] if relationship_type else None
    return await knowledge_graph_service.get_concept_subgraph(
        db=db,
        root_concept_id=root_concept_id,
        depth=depth,
        relationship_filter=rel_filter
    )

@router.get("/path")
async def get_concept_path(
    start_id: int = Query(...),
    target_id: int = Query(...),
    db: AsyncSession = Depends(get_db)
):
    path = await knowledge_graph_service.find_shortest_path(db, start_id, target_id)
    return {"path": path, "steps": len(path)}
