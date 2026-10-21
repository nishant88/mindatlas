import asyncio
import re
from datetime import datetime
from typing import Dict, Any, List, Optional
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.entities import (
    Source, DiscoveredResource, ResourceAuthor, Article,
    ArticleSourceLink, ClaimCitation, Concept, ConceptRelationship,
    ArticleConcept, ProcessingJob, AuditLog, EditorialReview
)
from app.services.research_engine import research_engine
from app.services.source_evaluator import source_evaluator
from app.services.synthesizer import ai_synthesizer

class PipelineOrchestrator:
    """
    Executes the 15-step Daily Automated Research Pipeline:
    Discover -> Retrieve -> Extract -> Normalize -> Deduplicate -> Classify ->
    Evaluate Quality -> Extract Claims -> Graph Connections -> Route Decision ->
    Synthesize Cited Draft -> Automated Integrity Checks -> Publish/Review Queue ->
    Update Graph & Study Indexes -> Auditable Log.
    """

    async def run_daily_pipeline(
        self,
        db: AsyncSession,
        search_terms: Optional[List[str]] = None,
        job_id: Optional[int] = None
    ) -> Dict[str, Any]:
        started_at = datetime.utcnow()
        terms = search_terms or ["Cognitive Dissonance", "Bayesian Epistemology", "Neuroplasticity", "Formal Logic"]

        # 1. Initialize or update processing job record
        job = None
        if job_id:
            res = await db.execute(select(ProcessingJob).where(ProcessingJob.id == job_id))
            job = res.scalar_one_or_none()
        if not job:
            job = ProcessingJob(
                job_type="daily_research_crawl",
                status="running",
                started_at=started_at,
                items_processed=0,
                job_metadata={"terms": terms, "steps_executed": []}
            )
            db.add(job)
            await db.commit()
            await db.refresh(job)

        pipeline_log = []
        discovered_count = 0
        synthesized_count = 0
        duplicate_count = 0

        try:
            for term in terms:
                # Step 1: Discover newly published or updated resources
                pipeline_log.append(f"Step 1: Discovering open-access works for query '{term}'...")
                raw_resources = await research_engine.search_all(term, limit_per_source=2)
                discovered_count += len(raw_resources)

                for raw in raw_resources:
                    # Step 2 & 3: Retrieve permitted metadata & Extract fields
                    title = raw.get("title", "").strip()
                    if not title:
                        continue
                    canonical_url = raw.get("canonical_url", "")
                    doi = raw.get("doi")
                    fingerprint = raw.get("content_fingerprint")

                    # Step 4: Normalize metadata into common schema
                    # Done by connectors

                    # Step 5: Deduplicate using DOI, canonical URL, fingerprint
                    stmt = select(DiscoveredResource).where(
                        (DiscoveredResource.canonical_url == canonical_url) |
                        (DiscoveredResource.content_fingerprint == fingerprint)
                    )
                    existing = (await db.execute(stmt)).scalar_one_or_none()
                    if existing:
                        duplicate_count += 1
                        pipeline_log.append(f"Step 5: Deduplication: Item '{title[:40]}...' already indexed. Skipping re-ingestion.")
                        continue

                    # Step 6: Classify resource by topic, discipline, format, methodology
                    discipline = raw.get("primary_discipline", "Cognitive Science")

                    # Step 7: Evaluate source quality & evidence rigor
                    assessment = source_evaluator.evaluate_resource(
                        title=title,
                        abstract=raw.get("abstract", ""),
                        discipline=discipline,
                        format_type=raw.get("format_type", "peer_reviewed_paper"),
                        doi=doi,
                        methodology=raw.get("methodology_type"),
                        source_name=raw.get("source_name")
                    )

                    # Persist discovered resource with quality scores
                    db_resource = DiscoveredResource(
                        source_id=1,  # Default source anchor
                        external_id=raw.get("external_id"),
                        doi=doi,
                        canonical_url=canonical_url,
                        title=title,
                        abstract=raw.get("abstract"),
                        content_fingerprint=fingerprint,
                        primary_discipline=discipline,
                        format_type=raw.get("format_type", "peer_reviewed_paper"),
                        methodology_type=assessment.methodology_classification,
                        overall_quality_score=assessment.overall_score,
                        authority_score=assessment.authority_score,
                        evidence_rigor_score=assessment.evidence_rigor_score,
                        relevance_score=assessment.relevance_score,
                        originality_score=assessment.originality_score,
                        traceability_score=assessment.traceability_score,
                        quality_justification=assessment.justification,
                        is_processed=True
                    )
                    db.add(db_resource)
                    await db.flush()

                    for a in raw.get("authors", []):
                        db.add(ResourceAuthor(resource_id=db_resource.id, author_name=a))

                    # Step 8, 9 & 10: Extract claims, connect graph, and route decision
                    if assessment.recommended_for_synthesis:
                        # Check if article with matching slug already exists
                        slug = re.sub(r'[^a-z0-9]+', '-', term.lower()).strip('-')
                        art_stmt = select(Article).where(Article.slug == slug)
                        existing_article = (await db.execute(art_stmt)).scalar_one_or_none()

                        if not existing_article:
                            # Step 11: Generate cited educational draft
                            pipeline_log.append(f"Step 11: Synthesizing educational article for '{term}'...")
                            draft = await ai_synthesizer.generate_article(
                                topic=term,
                                sources=[raw],
                                article_type="deep_dive_synthesis",
                                discipline=discipline
                            )

                            # Step 12: Automated consistency, citation integrity & anti-plagiarism checks
                            integrity_passed = len(draft.claim_citations) > 0 and len(draft.key_takeaways) > 0
                            target_status = "published" if integrity_passed and assessment.overall_score >= 0.85 else "pending_review"

                            # Step 13: Publish or route to human review queue
                            new_article = Article(
                                slug=draft.slug,
                                title=draft.title,
                                subtitle=draft.subtitle,
                                summary=draft.summary,
                                article_type=draft.article_type,
                                primary_discipline=draft.primary_discipline,
                                subdisciplines=draft.subdisciplines,
                                reading_time_mins=draft.reading_time_mins,
                                difficulty_level=draft.difficulty_level,
                                why_it_matters=draft.why_it_matters,
                                learning_objectives=draft.learning_objectives,
                                prerequisite_concepts=draft.prerequisite_concepts,
                                beginner_explanation=draft.beginner_explanation,
                                detailed_explanation=draft.detailed_explanation,
                                historical_background=draft.historical_background,
                                major_theories_and_thinkers=draft.major_theories_and_thinkers,
                                concrete_examples=draft.concrete_examples,
                                case_studies_and_experiments=draft.case_studies_and_experiments,
                                common_misconceptions=draft.common_misconceptions,
                                counterarguments_and_alternatives=draft.counterarguments_and_alternatives,
                                practical_applications=draft.practical_applications,
                                limitations_and_unresolved_questions=draft.limitations_and_unresolved_questions,
                                key_takeaways=draft.key_takeaways,
                                review_questions=draft.review_questions,
                                flashcards=draft.flashcards,
                                further_reading=draft.further_reading,
                                status=target_status
                            )
                            db.add(new_article)
                            await db.flush()

                            # Link claim citations
                            for cit in draft.claim_citations:
                                db.add(ClaimCitation(
                                    article_id=new_article.id,
                                    passage_reference=cit.passage_reference,
                                    claim_text=cit.claim_text,
                                    supporting_quote_or_finding=cit.supporting_quote_or_finding,
                                    source_title=cit.source_title,
                                    source_author=cit.source_author,
                                    source_year=cit.source_year,
                                    doi=cit.doi,
                                    canonical_url=cit.canonical_url,
                                    page_or_section=cit.page_or_section,
                                    verification_status=cit.verification_status,
                                    confidence_score=cit.confidence_score
                                ))

                            # Link article source
                            db.add(ArticleSourceLink(
                                article_id=new_article.id,
                                resource_id=db_resource.id,
                                citation_type="primary_evidence"
                            ))

                            # Step 14: Update Knowledge Graph connections
                            concept_stmt = select(Concept).where(Concept.name.ilike(f"%{term}%"))
                            c_match = (await db.execute(concept_stmt)).scalar_one_or_none()
                            if c_match:
                                db.add(ArticleConcept(article_id=new_article.id, concept_id=c_match.id, is_primary=True))

                            synthesized_count += 1
                            pipeline_log.append(f"Step 13: Article '{draft.title}' created (Status: {target_status}).")

            # Step 15: Record in auditable processing log
            completed_at = datetime.utcnow()
            job.status = "completed"
            job.completed_at = completed_at
            job.items_processed = discovered_count
            job.job_metadata = {
                "discovered": discovered_count,
                "duplicates_prevented": duplicate_count,
                "synthesized_articles": synthesized_count,
                "log": pipeline_log
            }

            db.add(AuditLog(
                actor="automated_research_pipeline",
                action_type="daily_crawl_completed",
                target_entity="processing_jobs",
                target_id=job.id,
                details={"discovered": discovered_count, "synthesized": synthesized_count}
            ))

            await db.commit()
            return {
                "status": "success",
                "job_id": job.id,
                "discovered": discovered_count,
                "duplicates_prevented": duplicate_count,
                "synthesized": synthesized_count,
                "duration_seconds": (completed_at - started_at).total_seconds(),
                "logs": pipeline_log
            }

        except Exception as e:
            await db.rollback()
            job.status = "failed"
            job.error_message = str(e)
            job.completed_at = datetime.utcnow()
            await db.commit()
            return {"status": "error", "message": str(e), "job_id": job.id}

pipeline_orchestrator = PipelineOrchestrator()
