from typing import List, Dict, Any, Optional, Set
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from app.models.entities import Concept, ConceptRelationship

class KnowledgeGraphService:
    """Graph traversal, node exploration, and relational semantic navigation."""

    async def get_concept_subgraph(
        self,
        db: AsyncSession,
        root_concept_id: Optional[int] = None,
        depth: int = 2,
        relationship_filter: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Extract an ego-network or full knowledge graph.
        Returns nodes and links formatted for interactive visual rendering.
        """
        # Fetch concepts
        concepts_stmt = select(Concept)
        concepts_res = await db.execute(concepts_stmt)
        all_concepts = concepts_res.scalars().all()

        concept_map = {c.id: c for c in all_concepts}

        # Fetch relationships
        rel_stmt = select(ConceptRelationship)
        rel_res = await db.execute(rel_stmt)
        all_relationships = rel_res.scalars().all()

        nodes: List[Dict[str, Any]] = []
        links: List[Dict[str, Any]] = []

        active_concept_ids: Set[int] = set()

        if root_concept_id is not None and root_concept_id in concept_map:
            # Breadth-first search for ego subgraph
            current_level = {root_concept_id}
            active_concept_ids.add(root_concept_id)

            for _ in range(depth):
                next_level = set()
                for rel in all_relationships:
                    if relationship_filter and rel.relationship_type not in relationship_filter:
                        continue
                    if rel.source_concept_id in current_level:
                        next_level.add(rel.target_concept_id)
                        active_concept_ids.add(rel.target_concept_id)
                    if rel.target_concept_id in current_level:
                        next_level.add(rel.source_concept_id)
                        active_concept_ids.add(rel.source_concept_id)
                current_level = next_level
        else:
            active_concept_ids = set(concept_map.keys())

        # Build nodes
        for cid in active_concept_ids:
            c = concept_map.get(cid)
            if c:
                nodes.append({
                    "id": str(c.id),
                    "slug": c.slug,
                    "name": c.name,
                    "category": c.category,
                    "discipline": c.discipline,
                    "short_definition": c.short_definition,
                    "importance_rank": c.importance_rank
                })

        # Build links
        for rel in all_relationships:
            if relationship_filter and rel.relationship_type not in relationship_filter:
                continue
            if rel.source_concept_id in active_concept_ids and rel.target_concept_id in active_concept_ids:
                links.append({
                    "id": str(rel.id),
                    "source": str(rel.source_concept_id),
                    "target": str(rel.target_concept_id),
                    "relationship_type": rel.relationship_type,
                    "rationale": rel.rationale,
                    "evidence_citation": rel.evidence_citation
                })

        return {
            "nodes": nodes,
            "links": links,
            "total_nodes": len(nodes),
            "total_links": len(links)
        }

    async def find_shortest_path(
        self,
        db: AsyncSession,
        start_concept_id: int,
        target_concept_id: int
    ) -> List[Dict[str, Any]]:
        """Find the intellectual journey / conceptual path linking two ideas."""
        rel_stmt = select(ConceptRelationship)
        rel_res = await db.execute(rel_stmt)
        all_relationships = rel_res.scalars().all()

        adj: Dict[int, List[tuple[int, str, str]]] = {}
        for r in all_relationships:
            adj.setdefault(r.source_concept_id, []).append((r.target_concept_id, r.relationship_type, r.rationale))
            # bi-directional traversal for exploration
            adj.setdefault(r.target_concept_id, []).append((r.source_concept_id, f"reversed_{r.relationship_type}", r.rationale))

        queue = [[(start_concept_id, "start", "")]]
        visited = {start_concept_id}

        while queue:
            path = queue.pop(0)
            node = path[-1][0]
            if node == target_concept_id:
                # Format path
                return [{"concept_id": n, "step_relationship": rel, "rationale": rat} for n, rel, rat in path]

            for neighbor, rel, rat in adj.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_path = list(path)
                    new_path.append((neighbor, rel, rat))
                    queue.append(new_path)

        return []

knowledge_graph_service = KnowledgeGraphService()
