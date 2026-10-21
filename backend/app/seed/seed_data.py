import hashlib
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.entities import (
    User, UserPreference, Source, SourcePermission,
    DiscoveredResource, ResourceAuthor,
    Article, ArticleVersion, ArticleSourceLink, ClaimCitation,
    Concept, ConceptRelationship, ArticleConcept,
    Collection, SavedItem, Note, Highlight,
    StudyPlan, StudyPlanWeek, StudySession,
    Quiz, QuizQuestion
)
from app.services.study_planner import study_planner_service

async def seed_database(db: AsyncSession):
    # Check if already seeded
    existing_user = (await db.execute(select(User).limit(1))).scalar_one_or_none()
    if existing_user:
        return

    # 1. Create Default User & Preferences
    user = User(
        username="scholar",
        email="scholar@mindatlas.library",
        hashed_password="scrypt:32768:8:1$placeholder$mockhash",
        role="admin",
        is_active=True
    )
    db.add(user)
    await db.flush()

    user_pref = UserPreference(
        user_id=user.id,
        theme="editorial-light",
        font_family="merriweather",
        font_size="medium",
        daily_time_budget_mins=30,
        preferred_depth="comprehensive",
        topics_of_interest=["Cognitive Science", "Epistemology", "Behavioral Economics", "Philosophy"],
        digest_frequency="weekly"
    )
    db.add(user_pref)

    # 2. Seed Source Registry
    sources_data = [
        {
            "name": "OpenAlex",
            "canonical_url": "https://openalex.org",
            "category": "academic",
            "subject_coverage": ["Psychology", "Philosophy", "Neuroscience", "Cognitive Science"],
            "publisher_institution": "OurResearch (Non-profit)",
            "ingestion_method": "api",
            "access_licensing": "cc0",
            "rate_limit_per_minute": 60,
            "reliability_score": 0.98,
            "authority_score": 0.98
        },
        {
            "name": "Crossref",
            "canonical_url": "https://crossref.org",
            "category": "academic",
            "subject_coverage": ["Peer-Reviewed Science", "Humanities", "Methodology"],
            "publisher_institution": "Crossref DOI Registry",
            "ingestion_method": "api",
            "access_licensing": "open_access",
            "rate_limit_per_minute": 50,
            "reliability_score": 0.99,
            "authority_score": 0.99
        },
        {
            "name": "Stanford Encyclopedia of Philosophy",
            "canonical_url": "https://plato.stanford.edu",
            "category": "educational_philosophy",
            "subject_coverage": ["Epistemology", "Ethics", "Logic", "Philosophy of Mind"],
            "publisher_institution": "Stanford University",
            "ingestion_method": "open_access",
            "access_licensing": "open_access",
            "rate_limit_per_minute": 20,
            "reliability_score": 0.99,
            "authority_score": 0.99
        },
        {
            "name": "Project Gutenberg",
            "canonical_url": "https://www.gutenberg.org",
            "category": "books",
            "subject_coverage": ["Classical Philosophy", "History of Ideas", "Historical Texts"],
            "publisher_institution": "Project Gutenberg Literary Archive",
            "ingestion_method": "api",
            "access_licensing": "public_domain",
            "rate_limit_per_minute": 30,
            "reliability_score": 0.95,
            "authority_score": 0.95
        },
        {
            "name": "PubMed Central",
            "canonical_url": "https://pmc.ncbi.nlm.nih.gov",
            "category": "academic",
            "subject_coverage": ["Neuroscience", "Behavioral Genetics", "Cognitive Psychology"],
            "publisher_institution": "National Institutes of Health (NIH)",
            "ingestion_method": "api",
            "access_licensing": "open_access",
            "rate_limit_per_minute": 40,
            "reliability_score": 0.99,
            "authority_score": 0.99
        }
    ]

    source_objs = {}
    for s_dict in sources_data:
        src = Source(
            name=s_dict["name"],
            canonical_url=s_dict["canonical_url"],
            category=s_dict["category"],
            subject_coverage=s_dict["subject_coverage"],
            publisher_institution=s_dict["publisher_institution"],
            ingestion_method=s_dict["ingestion_method"],
            access_licensing=s_dict["access_licensing"],
            rate_limit_per_minute=s_dict["rate_limit_per_minute"],
            reliability_score=s_dict["reliability_score"],
            authority_score=s_dict["authority_score"],
            operational_status="active",
            last_successful_sync=datetime.utcnow()
        )
        db.add(src)
        await db.flush()
        source_objs[src.name] = src

    # 3. Seed Knowledge Graph Concepts
    concepts_data = [
        {"slug": "cognitive-dissonance", "name": "Cognitive Dissonance", "category": "theory", "discipline": "Psychology", "definition": "A state of psychological discomfort arising from holding two contradictory cognitions, driving attitude change.", "rank": 95},
        {"slug": "confirmation-bias", "name": "Confirmation Bias", "category": "bias", "discipline": "Cognitive Science", "definition": "The tendency to search for, interpret, favor, and recall information that confirms preexisting beliefs.", "rank": 98},
        {"slug": "motivated-reasoning", "name": "Motivated Reasoning", "category": "theory", "discipline": "Social Psychology", "definition": "An emotion-driven cognitive process where individuals arrive at predetermined conclusions to protect identity.", "rank": 90},
        {"slug": "epistemology", "name": "Epistemology", "category": "concept", "discipline": "Philosophy", "definition": "The philosophical study of knowledge, its nature, justification, sources, and scope.", "rank": 96},
        {"slug": "falsificationism", "name": "Falsificationism", "category": "theory", "discipline": "Scientific Reasoning", "definition": "Karl Popper's demarcation principle that for a theory to be scientific, it must be inherently testable and refutable.", "rank": 92},
        {"slug": "prospect-theory", "name": "Prospect Theory", "category": "theory", "discipline": "Behavioral Economics", "definition": "A behavioral economic model demonstrating that people evaluate outcomes relative to a reference point, with loss aversion.", "rank": 94},
        {"slug": "dual-process-theory", "name": "Dual-Process Theory (System 1 & System 2)", "category": "theory", "discipline": "Cognitive Science", "definition": "A model differentiating fast, intuitive, heuristic thinking (System 1) from slow, deliberative, reflective reasoning (System 2).", "rank": 95},
        {"slug": "ad-hominem", "name": "Ad Hominem Fallacy", "category": "fallacy", "discipline": "Critical Thinking", "definition": "An informal fallacy where an arguer attacks their opponent's character or motives rather than addressing the substance of the premise.", "rank": 88},
        {"slug": "straw-man", "name": "Straw Man Fallacy", "category": "fallacy", "discipline": "Critical Thinking", "definition": "Misrepresenting or exaggerating an opponent's argument to make it easier to knock down.", "rank": 89},
        {"slug": "existentialism", "name": "Existentialism", "category": "school_of_thought", "discipline": "Philosophy", "definition": "A philosophical movement centered on individual freedom, subjective authenticity, and the premise that existence precedes essence.", "rank": 91},
        {"slug": "bystander-effect", "name": "Bystander Effect", "category": "theory", "discipline": "Social Psychology", "definition": "The social phenomenon wherein the presence of other people discourages an individual from intervening in an emergency.", "rank": 85},
        {"slug": "neuroplasticity", "name": "Neuroplasticity", "category": "concept", "discipline": "Neuroscience", "definition": "The brain's physiological ability to structurally reorganize its neural connections and synaptic weights throughout life.", "rank": 93}
    ]

    concept_objs = {}
    for c_data in concepts_data:
        c = Concept(
            slug=c_data["slug"],
            name=c_data["name"],
            category=c_data["category"],
            discipline=c_data["discipline"],
            short_definition=c_data["definition"],
            detailed_overview=f"Comprehensive scholarly overview of {c_data['name']} across {c_data['discipline']}.",
            importance_rank=c_data["rank"]
        )
        db.add(c)
        await db.flush()
        concept_objs[c.slug] = c

    # 4. Seed Concept Relationships
    relationships_data = [
        ("cognitive-dissonance", "confirmation-bias", "related_to", "Cognitive dissonance drives individuals to seek confirming evidence to eliminate psychological discomfort."),
        ("confirmation-bias", "motivated-reasoning", "related_to", "Confirmation bias provides the cognitive mechanism through which motivated reasoning achieves preferred conclusions."),
        ("motivated-reasoning", "epistemology", "applies_to", "Motivated reasoning poses a direct challenge to normative epistemic justification and belief calibration."),
        ("dual-process-theory", "confirmation-bias", "prerequisite_of", "System 1 heuristic associative memory generates the initial bias that System 2 often fails to override."),
        ("dual-process-theory", "prospect-theory", "supports", "Prospect theory's loss aversion and framing effects rely heavily on System 1 perceptual shortcuts."),
        ("falsificationism", "epistemology", "extends", "Popper's falsificationism extends classical epistemology into empirical scientific demarcation."),
        ("straw-man", "ad-hominem", "related_to", "Both informal fallacies deflect attention from sound premise-conclusion argumentation to rhetorical deception."),
        ("existentialism", "epistemology", "critiques", "Existential phenomenologists critique detached objective epistemic models in favor of lived, situated consciousness."),
        ("bystander-effect", "cognitive-dissonance", "related_to", "Pluralistic ignorance in bystander intervention involves dissonance between observed ambiguity and collective inaction.")
    ]

    for src_slug, tgt_slug, rel_type, rationale in relationships_data:
        if src_slug in concept_objs and tgt_slug in concept_objs:
            db.add(ConceptRelationship(
                source_concept_id=concept_objs[src_slug].id,
                target_concept_id=concept_objs[tgt_slug].id,
                relationship_type=rel_type,
                rationale=rationale,
                evidence_citation="Foundational literature synthesis."
            ))

    # 5. Seed Discovered Resources (Authentic Open-Access Literature)
    resources_data = [
        {
            "title": "A Theory of Cognitive Dissonance",
            "doi": "10.1515/9781503620766",
            "canonical_url": "https://doi.org/10.1515/9781503620766",
            "abstract": "Leon Festinger's foundational text demonstrating how inconsistencies between beliefs and actions generate a state of psychological discomfort, motivating individuals to rationalize behaviors, reject conflicting information, and modify attitudes.",
            "authors": ["Leon Festinger"],
            "discipline": "Psychology",
            "methodology": "randomized_controlled_trial",
            "quality": 0.98,
            "source": "OpenAlex"
        },
        {
            "title": "Judgment under Uncertainty: Heuristics and Biases",
            "doi": "10.1126/science.185.4157.1124",
            "canonical_url": "https://doi.org/10.1126/science.185.4157.1124",
            "abstract": "Amos Tversky and Daniel Kahneman show how people rely on a limited number of heuristic principles—representativeness, availability, and anchoring—which reduce the complex tasks of assessing probabilities to simpler judgmental operations, resulting in systematic errors.",
            "authors": ["Amos Tversky", "Daniel Kahneman"],
            "discipline": "Cognitive Science",
            "methodology": "randomized_controlled_trial",
            "quality": 0.99,
            "source": "Crossref"
        },
        {
            "title": "The Case for Motivated Reasoning",
            "doi": "10.1037/0033-2909.108.3.480",
            "canonical_url": "https://doi.org/10.1037/0033-2909.108.3.480",
            "abstract": "Ziva Kunda reviews extensive literature to show that motivation affects reasoning through reliance on a biased set of cognitive processes—strategies for accessing, constructing, and evaluating beliefs—constrained only by the ability to construct seemingly reasonable justifications.",
            "authors": ["Ziva Kunda"],
            "discipline": "Social Psychology",
            "methodology": "meta_analysis",
            "quality": 0.96,
            "source": "Crossref"
        },
        {
            "title": "The Logic of Scientific Discovery",
            "doi": "10.4324/9780203994627",
            "canonical_url": "https://doi.org/10.4324/9780203994627",
            "abstract": "Karl Popper proposes that scientific theories can never be verified by induction, but can only be falsified by empirical test. The demarcation criterion of empirical science is falsifiability.",
            "authors": ["Karl Popper"],
            "discipline": "Scientific Reasoning",
            "methodology": "conceptual_philosophical",
            "quality": 0.98,
            "source": "Stanford Encyclopedia of Philosophy"
        },
        {
            "title": "Would I be helped? Cross-national CCTV analysis of bystander intervention",
            "doi": "10.1037/amp0000469",
            "canonical_url": "https://doi.org/10.1037/amp0000469",
            "abstract": "Richard Philpot and colleagues analyze real-world CCTV recordings of public violent emergencies across the UK, Netherlands, and South Africa, discovering that bystanders intervene to assist victims in over 90% of violent conflicts, overturning laboratory assumptions.",
            "authors": ["Richard Philpot", "Lieke S. J. Verhees", "Mark Levine"],
            "discipline": "Social Psychology",
            "methodology": "observational",
            "quality": 0.94,
            "source": "OpenAlex"
        }
    ]

    res_objs = []
    for r_data in resources_data:
        src = source_objs.get(r_data["source"]) or list(source_objs.values())[0]
        res_db = DiscoveredResource(
            source_id=src.id,
            doi=r_data["doi"],
            canonical_url=r_data["canonical_url"],
            title=r_data["title"],
            abstract=r_data["abstract"],
            content_fingerprint=hashlib.sha256(r_data["title"].encode("utf-8")).hexdigest()[:32],
            primary_discipline=r_data["discipline"],
            format_type="peer_reviewed_paper",
            methodology_type=r_data["methodology"],
            overall_quality_score=r_data["quality"],
            authority_score=r_data["quality"],
            evidence_rigor_score=r_data["quality"],
            relevance_score=0.98,
            originality_score=0.95,
            traceability_score=0.95,
            quality_justification=f"Evaluated with high methodological rigor ({r_data['methodology']}) in {r_data['discipline']}.",
            is_processed=True
        )
        db.add(res_db)
        await db.flush()
        res_objs.append(res_db)

        for a_name in r_data["authors"]:
            db.add(ResourceAuthor(resource_id=res_db.id, author_name=a_name))

    # 6. Seed Complete Synthesized Articles (All 20 Sections + Claim Citations)
    articles_data = [
        {
            "slug": "cognitive-dissonance-and-belief-perseverance",
            "title": "Cognitive Dissonance and the Architecture of Self-Justification",
            "subtitle": "How the human brain resolves conflicting evidence to preserve psychological coherence.",
            "summary": "An evidence-based synthesis of Festinger's cognitive dissonance paradigm, modern neuroimaging correlates, and the subtle mechanics of belief preservation.",
            "discipline": "Psychology",
            "difficulty": "intermediate",
            "reading_time": 12,
            "resource_idx": 0,
            "concept_slug": "cognitive-dissonance"
        },
        {
            "slug": "heuristics-biases-and-bounded-rationality",
            "title": "Heuristics, Biases, and Bounded Rationality: The Science of Decision Under Uncertainty",
            "subtitle": "Examining Kahneman and Tversky's dual-process foundations and normative probabilistic departures.",
            "summary": "A deep dive into cognitive shortcuts, anchoring, availability, and how evolutionary computational constraints produce systematic deviations from formal probability.",
            "discipline": "Cognitive Science",
            "difficulty": "intermediate",
            "reading_time": 14,
            "resource_idx": 1,
            "concept_slug": "confirmation-bias"
        },
        {
            "slug": "motivated-reasoning-and-identity-protective-cognition",
            "title": "Motivated Reasoning: How Affect and Identity Dictate Evidence Evaluation",
            "subtitle": "Distinguishing pure cognitive heuristics from affective identity-protective cognition.",
            "summary": "Synthesizing Kunda's motivated reasoning framework with contemporary political and epistemic polarization research.",
            "discipline": "Social Psychology",
            "difficulty": "advanced",
            "reading_time": 15,
            "resource_idx": 2,
            "concept_slug": "motivated-reasoning"
        },
        {
            "slug": "popperian-falsificationism-and-scientific-demarcation",
            "title": "Popperian Falsificationism and the Demarcation Problem in Modern Epistemology",
            "subtitle": "Why empirical verification is logically asymmetrical to empirical falsification.",
            "summary": "A rigorous philosophical investigation into Karl Popper's critique of inductivism and how falsificationism guides modern scientific replication.",
            "discipline": "Scientific Reasoning",
            "difficulty": "advanced",
            "reading_time": 13,
            "resource_idx": 3,
            "concept_slug": "falsificationism"
        },
        {
            "slug": "the-bystander-effect-re-examined",
            "title": "The Bystander Effect Re-Examined: Laboratory Artifacts vs Real-World Violent Emergencies",
            "subtitle": "How CCTV analyses and ecological validity revolutionized social psychology's most famous paradigm.",
            "summary": "Comparing classic laboratory smoke-room experiments with modern naturalistic CCTV data showing 90%+ citizen intervention rates in violent conflict.",
            "discipline": "Social Psychology",
            "difficulty": "intermediate",
            "reading_time": 11,
            "resource_idx": 4,
            "concept_slug": "bystander-effect"
        }
    ]

    for a_meta in articles_data:
        r_ref = res_objs[a_meta["resource_idx"]]
        c_ref = concept_objs[a_meta["concept_slug"]]

        art = Article(
            slug=a_meta["slug"],
            title=a_meta["title"],
            subtitle=a_meta["subtitle"],
            summary=a_meta["summary"],
            article_type="deep_dive_synthesis",
            primary_discipline=a_meta["discipline"],
            subdisciplines=[a_meta["discipline"], "Epistemology", "Behavioral Science"],
            reading_time_mins=a_meta["reading_time"],
            difficulty_level=a_meta["difficulty"],
            status="published",
            current_version=1,
            published_at=datetime.utcnow(),
            last_reviewed_at=datetime.utcnow(),
            why_it_matters=(
                f"Understanding {a_meta['title']} provides the indispensable bedrock for evaluating how humans process conflicting evidence. "
                f"Without recognizing these underlying cognitive mechanisms, researchers, analysts, and everyday thinkers systematically mistake "
                f"rationalized self-justification for objective truth."
            ),
            learning_objectives=[
                f"Master the core operational mechanisms of {c_ref.name}.",
                "Dissect the empirical evidence and experimental paradigms validating the phenomenon.",
                "Differentiate genuine cognitive bias from ecological heuristics and rhetorical strategy.",
                "Implement structured debiasing protocols and active reflection mechanisms."
            ],
            prerequisite_concepts=["Epistemic Rationality", "Hypothesis Testing", "Empirical Asymmetry"],
            beginner_explanation=(
                f"At its core, {c_ref.name} explains how our minds resolve tension when our expectations clash with reality. "
                "Rather than calmly updating our beliefs like a computer, we experience an uncomfortable internal friction that drives us "
                "to rationalize our choices, overlook flaws in our arguments, and seek out people who agree with us."
            ),
            detailed_explanation=(
                f"From an advanced perspective in {a_meta['discipline']}, the phenomenon is grounded in cognitive dissonance theory and neural predictive coding. "
                f"When prediction errors (surprisal) occur, the central nervous system must either update internal generative priors or discount sensory evidence. "
                f"Because modifying core identity-linked models incurs massive metabolic and psychological re-weighting costs, the cognitive agent actively discounts contradictory data."
            ),
            historical_background=(
                f"The historical roots of this inquiry emerged from mid-20th century debates between strict behaviorists and the emerging cognitive revolution. "
                f"Pioneering experiments systematically demonstrated that internal cognitive states could not be explained away as mere stimulus-response reflexes."
            ),
            major_theories_and_thinkers=[
                {"thinker": "Leon Festinger", "contribution": "Formulated dissonance theory and the magnitude of cognitive discomfort.", "school_of_thought": "Cognitive Psychology"},
                {"thinker": "Amos Tversky & Daniel Kahneman", "contribution": "Integrated bounded rationality into decision theory and prospect mechanics.", "school_of_thought": "Behavioral Economics"}
            ],
            concrete_examples=[
                "A medical doctor dismisses anomalous patient symptoms because the initial diagnosis felt completely certain.",
                "An investor doubles down on a collapsing asset to avoid acknowledging an initial analytical miscalculation.",
                "A political partisan interprets identical legislative proposals differently depending on which party proposed them."
            ],
            case_studies_and_experiments=[
                {
                    "title": "Classic $1 vs $20 Induced Compliance Experiment",
                    "year": 1959,
                    "methodology": "Randomized Controlled Experiment",
                    "finding": "Subjects paid $1 to lie experienced higher dissonance and genuine attitude change compared to subjects paid $20 who possessed sufficient external justification.",
                    "citation_key": "sec_festinger_1959"
                }
            ],
            common_misconceptions=[
                {
                    "misconception": "Only uneducated or dogmatic individuals fall victim to this effect.",
                    "clarification": "Extensive empirical research shows domain experts and individuals with higher numeracy often display greater rationalization capacity."
                },
                {
                    "misconception": "Simple awareness is enough to prevent the bias.",
                    "clarification": "Awareness alone yields negligible debiasing; external systemic checklists and blind evaluations are mandatory."
                }
            ],
            counterarguments_and_alternatives=[
                {
                    "objection": "The Ecological Rationality Critique (Gerd Gigerenzer)",
                    "counterargument": "What laboratory psychologists classify as an error often serves as a computationally optimal, fast-and-frugal heuristic in naturalistic environments.",
                    "response": "While ecologically viable in low-stakes ancestral conditions, modern institutions (law, medicine, finance) strictly require normative Bayesian calibration."
                }
            ],
            practical_applications=[
                "Implement structured 'Red Teaming' and institutional devil's advocacy during strategic reviews.",
                "Pre-register analytical criteria before observing project or experimental results.",
                "Separate evidentiary evaluation from personal reputation and identity stakes."
            ],
            limitations_and_unresolved_questions=[
                "Replication variability across cross-cultural and non-WEIRD demographics.",
                "Determining the exact neural activation threshold at which implicit dissonance becomes conscious discomfort."
            ],
            key_takeaways=[
                f"{c_ref.name} is an active, systemic process rather than a passive error.",
                "Self-justification increases in magnitude the more an individual has invested in their prior position.",
                "Institutional scaffolds (blind review, adversarial collaboration) outperform individual willpower in debiasing."
            ],
            review_questions=[
                {
                    "question": f"What is the primary psychological driver underlying {c_ref.name}?",
                    "answer_guide": "The psychological discomfort of holding conflicting cognitions, motivating belief alteration to restore internal equilibrium."
                },
                {
                    "question": "Why does high intelligence fail to protect against motivated rationalization?",
                    "answer_guide": "Because higher intelligence provides greater computational power to invent plausible post-hoc justifications for intuitively preferred beliefs."
                }
            ],
            flashcards=[
                {"front": f"What is the definition of {c_ref.name}?", "back": c_ref.short_definition},
                {"front": "What was the key finding of the $1 vs $20 experiment?", "back": "Insufficient external justification forces internal attitude change."}
            ],
            further_reading=[
                {"title": r_ref.title, "author": "Primary Scholarly Source", "year": 2018, "difficulty": "Foundational"},
                {"title": "Mistakes Were Made (But Not by Me)", "author": "Carol Tavris & Elliot Aronson", "year": 2007, "difficulty": "Accessible"}
            ]
        )
        db.add(art)
        await db.flush()

        # Link Article to Concept & Source
        db.add(ArticleConcept(article_id=art.id, concept_id=c_ref.id, is_primary=True))
        db.add(ArticleSourceLink(article_id=art.id, resource_id=r_ref.id, citation_type="primary_evidence"))

        # Claim-level citations
        db.add(ClaimCitation(
            article_id=art.id,
            passage_reference="sec_detailed_explanation_claim_1",
            claim_text=f"Empirical experiments confirm the structural mechanics of {c_ref.name} in controlled paradigms.",
            supporting_quote_or_finding=r_ref.abstract[:250],
            source_title=r_ref.title,
            source_author="Lead Investigator",
            source_year=2020,
            doi=r_ref.doi,
            canonical_url=r_ref.canonical_url,
            page_or_section="Chapter 3, p. 84",
            verification_status="verified",
            confidence_score=0.98
        ))

        # Add to user's saved items & default note
        db.add(SavedItem(
            user_id=user.id,
            item_type="article",
            target_id=art.id,
            status="reading",
            reading_progress_percent=45
        ))

    # 7. Seed 12-Week Study Plan
    study_plan = StudyPlan(
        user_id=user.id,
        title="MindAtlas Interdisciplinary Foundations: Critical Thinking to Epistemic Mastery",
        description="A structured 12-week comprehensive journey bridging epistemology, formal fallacies, cognitive heuristics, decision science, and moral philosophy.",
        discipline_or_goal="Interdisciplinary Cognitive Science & Philosophy",
        total_weeks=12,
        daily_time_minutes=30,
        current_week=1,
        status="active"
    )
    db.add(study_plan)
    await db.flush()

    curriculum = study_planner_service.build_12_week_curriculum(daily_time_minutes=30)
    for w_data in curriculum:
        week = StudyPlanWeek(
            study_plan_id=study_plan.id,
            week_number=w_data["week_number"],
            title=w_data["title"],
            theme_objective=w_data["theme_objective"],
            prerequisites_met=True
        )
        db.add(week)
        await db.flush()

        for s_data in w_data["sessions"]:
            db.add(StudySession(
                week_id=week.id,
                day_number=s_data["day_number"],
                session_title=s_data["session_title"],
                objective=s_data["objective"],
                estimated_duration_mins=s_data["estimated_duration_mins"],
                core_concepts=s_data["core_concepts"],
                article_slug="cognitive-dissonance-and-belief-perseverance",
                guided_questions=s_data["guided_questions"],
                practical_exercises=s_data["practical_exercises"],
                reflection_prompt=s_data["reflection_prompt"],
                flashcards=s_data["flashcards"],
                completion_checklist=s_data["completion_checklist"],
                is_completed=(w_data["week_number"] == 1 and s_data["day_number"] <= 2),
                comprehension_rating=5 if (w_data["week_number"] == 1 and s_data["day_number"] <= 2) else None
            ))

    # 8. Seed Quizzes
    quiz = Quiz(
        title="Epistemic Foundations and Cognitive Biases Mastery Test",
        topic="Epistemology & Cognitive Science",
        difficulty="intermediate"
    )
    db.add(quiz)
    await db.flush()

    questions_data = [
        {
            "text": "Why did subjects in Festinger & Carlsmith's experiment who received $1 exhibit greater attitude change than those who received $20?",
            "options": [
                "They were greedier and wanted more compensation.",
                "They lacked sufficient external justification for lying, creating cognitive dissonance that forced attitude alignment.",
                "The $20 group experienced more peer pressure from the experimenter.",
                "The $1 group misunderstood the task instructions."
            ],
            "correct_idx": 1,
            "explanation": "Because $1 was insufficient external justification for stating a boring task was enjoyable, the mind reduced dissonance by convincing itself the task was genuinely interesting."
        },
        {
            "text": "What distinguishes confirmation bias from motivated reasoning?",
            "options": [
                "Confirmation bias is intentional deception, whereas motivated reasoning is subconscious.",
                "Confirmation bias is a cognitive information-gathering heuristic; motivated reasoning is affectively driven by identity or goal protection.",
                "Confirmation bias occurs only in science, while motivated reasoning occurs only in politics.",
                "There is no empirical or conceptual distinction between the two."
            ],
            "correct_idx": 1,
            "explanation": "Confirmation bias operates as an unmotivated associative heuristic, while motivated reasoning involves directional affect to defend self-worth or social belonging."
        },
        {
            "text": "According to Karl Popper, what is the core demarcation criterion between science and non-science?",
            "options": [
                "The ability to gather endless verifying observations.",
                "Consensus amongst peer-reviewed university faculties.",
                "Falsifiability: the theoretical formulation must expose itself to potential empirical refutation.",
                "Mathematical elegance and symmetry."
            ],
            "correct_idx": 2,
            "explanation": "Popper established that no number of white swans can logically prove all swans are white, but a single black swan refutes the universal claim. Falsifiability is the demarcation boundary."
        }
    ]

    for q_d in questions_data:
        db.add(QuizQuestion(
            quiz_id=quiz.id,
            question_text=q_d["text"],
            options=q_d["options"],
            correct_option_index=q_d["correct_idx"],
            explanation=q_d["explanation"]
        ))

    # 9. Seed Personal Note
    db.add(Note(
        user_id=user.id,
        title="Reflections on Epistemic Asymmetry & Falsification",
        content_markdown="It is essential to remember that proof in empirical science is always tentative. We can refute theories with single decisive anomalies, but verification remains asymptotically open.",
        tags=["Epistemology", "Popper", "Methodology"]
    ))

    await db.commit()
