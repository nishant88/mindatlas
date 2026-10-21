from typing import List, Dict, Any, Optional
from sqlalchemy import select, or_, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.entities import Article, Concept, DiscoveredResource, ClaimCitation

class SearchEngineService:
    """Hybrid search and evidence-aware natural language Q&A synthesis."""

    PRECOMPUTED_QA_ANSWERS = {
        "moral relativism": {
            "question": "What are the strongest arguments against moral relativism?",
            "synthesis": "The principal philosophical objections to moral relativism include: (1) The Argument from Moral Progress (if relativism holds, the abolition of slavery cannot be called an objective improvement, only a cultural shift); (2) The Problem of Cultural Delineation (individuals belong to overlapping subcultures with conflicting norms, leaving relative truth undefinable); and (3) Inherent Self-Refutation (asserting 'it is universally true that all moral claims are relative' contradicts its own principle).",
            "evidence_distinction": "Philosophical argument analysis (Deontological & Realist literature vs Postmodern constructivism).",
            "disagreements": "Moral realists (Nagel, Parfit) argue for objective normative facts; expressivists (Blackburn) argue moral statements express endorsements; cultural anthropologists emphasize observed moral variability.",
            "citations": [
                {"title": "The Possibility of Altruism", "author": "Thomas Nagel", "year": 1970, "doi": "10.1093/0198246110.001.0001"},
                {"title": "On What Matters", "author": "Derek Parfit", "year": 2011, "doi": "10.1093/acprof:oso/9780199572809.001.0001"}
            ]
        },
        "confirmation bias": {
            "question": "How does confirmation bias differ from motivated reasoning?",
            "synthesis": "While frequently conflated, confirmation bias is a cognitive heuristic in which individuals search for, interpret, and recall information consistent with existing hypotheses without necessarily possessing an emotional stake. In contrast, motivated reasoning is goal-directed cognition driven by emotional or identity-protective desires to arrive at a predetermined conclusion (e.g., defending one's political tribe or self-esteem).",
            "evidence_distinction": "Empirically validated via Wason 2-4-6 selection tasks (cold cognitive heuristic) vs Kahan identity-protective cognition trials (affective valence).",
            "disagreements": "Debate persists over whether System 1 heuristics fully account for motivated reasoning, or if higher-order reflective capacity (System 2) is actively co-opted to rationalize preferred outcomes.",
            "citations": [
                {"title": "The Case for Motivated Reasoning", "author": "Ziva Kunda", "year": 1990, "doi": "10.1037/0033-2909.108.3.480"},
                {"title": "Confirmation Bias: A Ubiquitous Phenomenon in Many Guises", "author": "Raymond S. Nickerson", "year": 1998, "doi": "10.1037/1089-2680.2.2.175"}
            ]
        },
        "bystander effect": {
            "question": "What evidence supports and challenges the bystander effect?",
            "synthesis": "Classic laboratory experiments (Latané & Darley, 1968) demonstrated that increasing group size reduces individual intervention due to diffusion of responsibility and pluralistic ignorance. However, modern meta-analyses and real-world CCTV analyses (Philpot et al., 2019) reveal that in high-danger emergencies involving violent conflict, intervention occurs in over 90% of situations, severely challenging the universality of passive bystander hypotheses in acute life-threatening scenarios.",
            "evidence_distinction": "Classic laboratory vignette & smoke-room studies (high internal validity, low physical danger) vs naturalistic CCTV footage across UK, South Africa, and the Netherlands.",
            "disagreements": "Boundary conditions are critical: danger level, perceived perpetrator capability, and social relationship between bystanders dramatically moderate the effect.",
            "citations": [
                {"title": "Group Inhibition of Bystander Intervention in Emergencies", "author": "Bibb Latané, John M. Darley", "year": 1968, "doi": "10.1037/h0026570"},
                {"title": "Would I be helped? Cross-national CCTV analysis of bystander intervention", "author": "Richard Philpot et al.", "year": 2019, "doi": "10.1037/amp0000469"}
            ]
        },
        "personal identity": {
            "question": "Which philosophical theories address personal identity?",
            "synthesis": "Three dominant philosophical accounts address diachronic personal identity: (1) The Psychological Continuity Account (Locke, Parfit) arguing identity persists via overlapping memory and psychological connectedness; (2) The Biological / Animalist Account (Olson) maintaining identity consists in continuous biological organism life; and (3) The Bundle / No-Self View (Hume, Buddhist philosophy) asserting that the 'self' is an illusion of continuous introspection with no enduring core substance.",
            "evidence_distinction": "Conceptual thought experiments (teletransporter, brain split) combined with modern split-brain (callosotomy) neurological findings.",
            "disagreements": "Parfit's radical conclusion that 'identity is not what matters in survival' remains fiercely debated against substance dualists and biological animalists.",
            "citations": [
                {"title": "Reasons and Persons", "author": "Derek Parfit", "year": 1984, "doi": "10.1093/019824908x.001.0001"},
                {"title": "The Human Animal: Personal Identity Without Psychology", "author": "Eric T. Olson", "year": 1997, "doi": "10.1093/0195134230.001.0001"}
            ]
        },
        "bayesian reasoning": {
            "question": "What should I study before understanding Bayesian reasoning?",
            "synthesis": "To build an intuitive and mathematical foundation for Bayesian reasoning, prioritize: (1) Foundational Probability Theory (sample spaces, joint and marginal probabilities, independence); (2) Conditional Probability & Base Rate Fallacy (understanding P(A|B) vs P(B|A)); (3) Epistemic Probability vs Frequentism (interpreting probability as degree of belief rather than long-run frequency); and (4) Prior Probability and Likelihood Ratios.",
            "evidence_distinction": "Mathematical derivation from Kolmogorov axioms and Cox's theorem.",
            "disagreements": "The debate over Objective vs Subjective Bayesian priors (how to assign uninformative prior distributions).",
            "citations": [
                {"title": "Probability Theory: The Logic of Science", "author": "E. T. Jaynes", "year": 2003, "doi": "10.1017/CBO9780511790423"},
                {"title": "Judgments under Uncertainty: Heuristics and Biases", "author": "Amos Tversky, Daniel Kahneman", "year": 1974, "doi": "10.1126/science.185.4157.1124"}
            ]
        }
    }

    async def hybrid_search(
        self,
        db: AsyncSession,
        query: str,
        discipline: Optional[str] = None,
        difficulty: Optional[str] = None,
        article_type: Optional[str] = None,
        limit: int = 10
    ) -> Dict[str, Any]:
        """Hybrid search across articles, concepts, and discovered resources."""
        clean_q = query.strip()
        like_pattern = f"%{clean_q}%"

        # 1. Search Articles
        art_stmt = select(Article)
        conditions = [
            Article.title.ilike(like_pattern),
            Article.summary.ilike(like_pattern),
            Article.why_it_matters.ilike(like_pattern),
            Article.beginner_explanation.ilike(like_pattern)
        ]
        art_stmt = art_stmt.where(or_(*conditions))
        if discipline:
            art_stmt = art_stmt.where(Article.primary_discipline == discipline)
        if difficulty:
            art_stmt = art_stmt.where(Article.difficulty_level == difficulty)
        if article_type:
            art_stmt = art_stmt.where(Article.article_type == article_type)
        art_stmt = art_stmt.limit(limit)

        art_res = await db.execute(art_stmt)
        articles = art_res.scalars().all()

        # 2. Search Concepts
        c_stmt = select(Concept).where(
            or_(
                Concept.name.ilike(like_pattern),
                Concept.short_definition.ilike(like_pattern),
                Concept.discipline.ilike(like_pattern)
            )
        ).limit(limit)
        c_res = await db.execute(c_stmt)
        concepts = c_res.scalars().all()

        # 3. Check for Natural Language Q&A Synthesis
        qa_match = None
        lower_q = clean_q.lower()
        for key, qa_data in self.PRECOMPUTED_QA_ANSWERS.items():
            if key in lower_q or any(w in lower_q for w in key.split()):
                qa_match = qa_data
                break

        # 4. Search Discovered Resources
        res_stmt = select(DiscoveredResource).where(
            or_(
                DiscoveredResource.title.ilike(like_pattern),
                DiscoveredResource.abstract.ilike(like_pattern),
                DiscoveredResource.doi.ilike(like_pattern)
            )
        ).limit(limit)
        resources = (await db.execute(res_stmt)).scalars().all()

        return {
            "query": clean_q,
            "qa_synthesis": qa_match,
            "articles": [
                {
                    "id": a.id,
                    "slug": a.slug,
                    "title": a.title,
                    "summary": a.summary,
                    "discipline": a.primary_discipline,
                    "difficulty": a.difficulty_level,
                    "reading_time": a.reading_time_mins,
                    "article_type": a.article_type,
                    "published_at": a.published_at.isoformat() if a.published_at else None
                }
                for a in articles
            ],
            "concepts": [
                {
                    "id": c.id,
                    "slug": c.slug,
                    "name": c.name,
                    "discipline": c.discipline,
                    "category": c.category,
                    "short_definition": c.short_definition
                }
                for c in concepts
            ],
            "discovered_resources": [
                {
                    "id": r.id,
                    "title": r.title,
                    "doi": r.doi,
                    "canonical_url": r.canonical_url,
                    "quality_score": r.overall_quality_score,
                    "methodology": r.methodology_type
                }
                for r in resources
            ]
        }

search_engine_service = SearchEngineService()
