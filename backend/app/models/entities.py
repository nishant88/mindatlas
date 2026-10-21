from datetime import datetime
from typing import Optional, List, Dict, Any
from sqlalchemy import (
    String, Integer, Float, Text, Boolean, DateTime, ForeignKey, JSON, Index, func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

# 1. User & Preferences
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50), default="reader")  # reader, editor, admin
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    preferences: Mapped[Optional["UserPreference"]] = relationship(back_populates="user", uselist=False)
    collections: Mapped[List["Collection"]] = relationship(back_populates="user")
    saved_items: Mapped[List["SavedItem"]] = relationship(back_populates="user")
    notes: Mapped[List["Note"]] = relationship(back_populates="user")
    highlights: Mapped[List["Highlight"]] = relationship(back_populates="user")
    study_plans: Mapped[List["StudyPlan"]] = relationship(back_populates="user")
    learning_progress: Mapped[List["LearningProgress"]] = relationship(back_populates="user")
    quiz_attempts: Mapped[List["QuizAttempt"]] = relationship(back_populates="user")


class UserPreference(Base):
    __tablename__ = "user_preferences"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    theme: Mapped[str] = mapped_column(String(20), default="editorial-light")  # editorial-light, obsidian-dark
    font_family: Mapped[str] = mapped_column(String(50), default="merriweather")
    font_size: Mapped[str] = mapped_column(String(20), default="medium")
    daily_time_budget_mins: Mapped[int] = mapped_column(Integer, default=30)
    preferred_depth: Mapped[str] = mapped_column(String(50), default="comprehensive")  # introductory, comprehensive, advanced
    topics_of_interest: Mapped[List[str]] = mapped_column(JSON, default=list)
    digest_frequency: Mapped[str] = mapped_column(String(20), default="weekly")  # daily, weekly, never

    user: Mapped["User"] = relationship(back_populates="preferences")


# 2. Sources & Sync Runs
class Source(Base):
    __tablename__ = "sources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    canonical_url: Mapped[str] = mapped_column(String(512))
    category: Mapped[str] = mapped_column(String(100))  # academic, books, educational_philosophy, institutional
    subject_coverage: Mapped[List[str]] = mapped_column(JSON, default=list)
    publisher_institution: Mapped[str] = mapped_column(String(255))
    ingestion_method: Mapped[str] = mapped_column(String(50))  # api, rss, sitemap, open_access
    access_licensing: Mapped[str] = mapped_column(String(100))  # public_domain, cc_by, cc_by_nc, open_access
    robots_rules: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict)
    rate_limit_per_minute: Mapped[int] = mapped_column(Integer, default=30)
    reliability_score: Mapped[float] = mapped_column(Float, default=0.90)  # 0.0 to 1.0
    authority_score: Mapped[float] = mapped_column(Float, default=0.95)
    operational_status: Mapped[str] = mapped_column(String(50), default="active")  # active, paused, failing
    last_successful_sync: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    last_discovered_pub: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    error_history: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    permissions: Mapped[List["SourcePermission"]] = relationship(back_populates="source")
    sync_runs: Mapped[List["SourceSyncRun"]] = relationship(back_populates="source")
    discovered_resources: Mapped[List["DiscoveredResource"]] = relationship(back_populates="source")


class SourcePermission(Base):
    __tablename__ = "source_permissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_id: Mapped[int] = mapped_column(Integer, ForeignKey("sources.id", ondelete="CASCADE"))
    allows_abstract_ingestion: Mapped[bool] = mapped_column(Boolean, default=True)
    allows_fulltext_indexing: Mapped[bool] = mapped_column(Boolean, default=True)
    attribution_requirements: Mapped[str] = mapped_column(Text, default="Standard academic attribution")
    license_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    source: Mapped["Source"] = relationship(back_populates="permissions")


class SourceSyncRun(Base):
    __tablename__ = "source_sync_runs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_id: Mapped[int] = mapped_column(Integer, ForeignKey("sources.id", ondelete="CASCADE"))
    started_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    status: Mapped[str] = mapped_column(String(50), default="running")  # running, success, failed, partial
    items_discovered: Mapped[int] = mapped_column(Integer, default=0)
    items_ingested: Mapped[int] = mapped_column(Integer, default=0)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    execution_log: Mapped[List[str]] = mapped_column(JSON, default=list)

    source: Mapped["Source"] = relationship(back_populates="sync_runs")


# 3. Discovered Resources & Metadata
class DiscoveredResource(Base):
    __tablename__ = "discovered_resources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_id: Mapped[int] = mapped_column(Integer, ForeignKey("sources.id"))
    external_id: Mapped[Optional[str]] = mapped_column(String(255), index=True, nullable=True)
    doi: Mapped[Optional[str]] = mapped_column(String(255), index=True, nullable=True)
    canonical_url: Mapped[str] = mapped_column(String(512), index=True)
    title: Mapped[str] = mapped_column(String(512), index=True)
    abstract: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    content_fingerprint: Mapped[str] = mapped_column(String(128), index=True)
    published_date: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    primary_discipline: Mapped[str] = mapped_column(String(100), index=True)  # Psychology, Philosophy, etc.
    subtopics: Mapped[List[str]] = mapped_column(JSON, default=list)
    format_type: Mapped[str] = mapped_column(String(50))  # peer_reviewed_paper, book, encyclopedia_entry, preprint
    target_audience: Mapped[str] = mapped_column(String(50), default="scholarly")
    methodology_type: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # meta_analysis, rct, conceptual_philosophical, observational
    
    # Transparent Quality Assessment Breakdown (Section 5)
    overall_quality_score: Mapped[float] = mapped_column(Float, default=0.85)
    authority_score: Mapped[float] = mapped_column(Float, default=0.85)
    evidence_rigor_score: Mapped[float] = mapped_column(Float, default=0.85)
    relevance_score: Mapped[float] = mapped_column(Float, default=0.90)
    originality_score: Mapped[float] = mapped_column(Float, default=0.80)
    traceability_score: Mapped[float] = mapped_column(Float, default=0.90)
    quality_justification: Mapped[str] = mapped_column(Text, default="Evaluated via peer-review status and citation pedigree.")
    
    is_processed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    source: Mapped["Source"] = relationship(back_populates="discovered_resources")
    authors: Mapped[List["ResourceAuthor"]] = relationship(back_populates="resource")
    topics: Mapped[List["ResourceTopic"]] = relationship(back_populates="resource")
    article_links: Mapped[List["ArticleSourceLink"]] = relationship(back_populates="resource")


class ResourceAuthor(Base):
    __tablename__ = "resource_authors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    resource_id: Mapped[int] = mapped_column(Integer, ForeignKey("discovered_resources.id", ondelete="CASCADE"))
    author_name: Mapped[str] = mapped_column(String(255))
    affiliation: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    orcid: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    resource: Mapped["DiscoveredResource"] = relationship(back_populates="authors")


class ResourceTopic(Base):
    __tablename__ = "resource_topics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    resource_id: Mapped[int] = mapped_column(Integer, ForeignKey("discovered_resources.id", ondelete="CASCADE"))
    topic_name: Mapped[str] = mapped_column(String(100), index=True)
    relevance_weight: Mapped[float] = mapped_column(Float, default=1.0)

    resource: Mapped["DiscoveredResource"] = relationship(back_populates="topics")


# 4. Articles & Claim Citations (Section 6)
class Article(Base):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(512), index=True)
    subtitle: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)
    summary: Mapped[str] = mapped_column(Text)
    article_type: Mapped[str] = mapped_column(String(50))  # beginner_explainer, deep_dive_synthesis, concept_comparison, thinker_profile, theory_breakdown, fallacy_breakdown, myth_vs_evidence, mental_model_guide, reading_guide
    primary_discipline: Mapped[str] = mapped_column(String(100), index=True)
    subdisciplines: Mapped[List[str]] = mapped_column(JSON, default=list)
    reading_time_mins: Mapped[int] = mapped_column(Integer, default=10)
    difficulty_level: Mapped[str] = mapped_column(String(50), default="intermediate")  # beginner, intermediate, advanced

    # 20 Mandatory Core Sections
    why_it_matters: Mapped[str] = mapped_column(Text)
    learning_objectives: Mapped[List[str]] = mapped_column(JSON, default=list)
    prerequisite_concepts: Mapped[List[str]] = mapped_column(JSON, default=list)
    beginner_explanation: Mapped[str] = mapped_column(Text)
    detailed_explanation: Mapped[str] = mapped_column(Text)
    historical_background: Mapped[str] = mapped_column(Text)
    major_theories_and_thinkers: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    concrete_examples: Mapped[List[str]] = mapped_column(JSON, default=list)
    case_studies_and_experiments: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    common_misconceptions: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    counterarguments_and_alternatives: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    practical_applications: Mapped[List[str]] = mapped_column(JSON, default=list)
    limitations_and_unresolved_questions: Mapped[List[str]] = mapped_column(JSON, default=list)
    key_takeaways: Mapped[List[str]] = mapped_column(JSON, default=list)
    review_questions: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    flashcards: Mapped[List[Dict[str, str]]] = mapped_column(JSON, default=list)
    further_reading: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)

    # Status & Versioning
    status: Mapped[str] = mapped_column(String(50), default="published")  # draft, pending_review, published, archived
    current_version: Mapped[int] = mapped_column(Integer, default=1)
    published_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    last_reviewed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    versions: Mapped[List["ArticleVersion"]] = relationship(back_populates="article")
    source_links: Mapped[List["ArticleSourceLink"]] = relationship(back_populates="article")
    claim_citations: Mapped[List["ClaimCitation"]] = relationship(back_populates="article")
    concepts: Mapped[List["ArticleConcept"]] = relationship(back_populates="article")
    editorial_reviews: Mapped[List["EditorialReview"]] = relationship(back_populates="article")


class ArticleVersion(Base):
    __tablename__ = "article_versions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    version_number: Mapped[int] = mapped_column(Integer)
    change_summary: Mapped[str] = mapped_column(Text)
    full_content_snapshot: Mapped[Dict[str, Any]] = mapped_column(JSON)
    created_by: Mapped[str] = mapped_column(String(100), default="ai_synthesizer")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    article: Mapped["Article"] = relationship(back_populates="versions")


class ArticleSourceLink(Base):
    __tablename__ = "article_source_links"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    resource_id: Mapped[int] = mapped_column(Integer, ForeignKey("discovered_resources.id", ondelete="CASCADE"))
    citation_type: Mapped[str] = mapped_column(String(50), default="primary_evidence")  # primary_evidence, theoretical_foundation, counter_argument, background

    article: Mapped["Article"] = relationship(back_populates="source_links")
    resource: Mapped["DiscoveredResource"] = relationship(back_populates="article_links")


class ClaimCitation(Base):
    __tablename__ = "claim_citations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    passage_reference: Mapped[str] = mapped_column(String(100))  # e.g., sec_explanation_para_2
    claim_text: Mapped[str] = mapped_column(Text)
    supporting_quote_or_finding: Mapped[str] = mapped_column(Text)
    source_title: Mapped[str] = mapped_column(String(512))
    source_author: Mapped[str] = mapped_column(String(255))
    source_year: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    doi: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    canonical_url: Mapped[str] = mapped_column(String(512))
    page_or_section: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    verification_status: Mapped[str] = mapped_column(String(50), default="verified")  # verified, unverified, contested
    confidence_score: Mapped[float] = mapped_column(Float, default=0.95)

    article: Mapped["Article"] = relationship(back_populates="claim_citations")


# 5. Knowledge Graph (Section 7)
class Concept(Base):
    __tablename__ = "concepts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255), index=True)
    category: Mapped[str] = mapped_column(String(100))  # concept, theory, researcher_thinker, experiment, fallacy, bias, school_of_thought
    discipline: Mapped[str] = mapped_column(String(100), index=True)
    short_definition: Mapped[str] = mapped_column(Text)
    detailed_overview: Mapped[str] = mapped_column(Text)
    importance_rank: Mapped[int] = mapped_column(Integer, default=50)

    # Relationships
    relationships_out: Mapped[List["ConceptRelationship"]] = relationship(
        "ConceptRelationship",
        foreign_keys="ConceptRelationship.source_concept_id",
        back_populates="source_concept"
    )
    relationships_in: Mapped[List["ConceptRelationship"]] = relationship(
        "ConceptRelationship",
        foreign_keys="ConceptRelationship.target_concept_id",
        back_populates="target_concept"
    )
    articles: Mapped[List["ArticleConcept"]] = relationship(back_populates="concept")


class ConceptRelationship(Base):
    __tablename__ = "concept_relationships"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_concept_id: Mapped[int] = mapped_column(Integer, ForeignKey("concepts.id", ondelete="CASCADE"), index=True)
    target_concept_id: Mapped[int] = mapped_column(Integer, ForeignKey("concepts.id", ondelete="CASCADE"), index=True)
    relationship_type: Mapped[str] = mapped_column(String(50), index=True)
    # prerequisite_of, related_to, contradicts, supports, extends, critiques, influenced_by, developed_by, evidence_for, example_of, historically_succeeded_by, commonly_confused_with, applies_to
    rationale: Mapped[str] = mapped_column(Text)
    evidence_citation: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    source_concept: Mapped["Concept"] = relationship("Concept", foreign_keys=[source_concept_id], back_populates="relationships_out")
    target_concept: Mapped["Concept"] = relationship("Concept", foreign_keys=[target_concept_id], back_populates="relationships_in")


class ArticleConcept(Base):
    __tablename__ = "article_concepts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    concept_id: Mapped[int] = mapped_column(Integer, ForeignKey("concepts.id", ondelete="CASCADE"))
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

    article: Mapped["Article"] = relationship(back_populates="concepts")
    concept: Mapped["Concept"] = relationship(back_populates="articles")


# 6. Personal Knowledge Library (Section 8)
class Collection(Base):
    __tablename__ = "collections"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_private: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="collections")
    saved_items: Mapped[List["SavedItem"]] = relationship(back_populates="collection")


class SavedItem(Base):
    __tablename__ = "saved_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    collection_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("collections.id", ondelete="SET NULL"), nullable=True)
    item_type: Mapped[str] = mapped_column(String(50))  # article, resource, concept
    target_id: Mapped[int] = mapped_column(Integer)
    status: Mapped[str] = mapped_column(String(50), default="saved")  # saved, reading, completed, revisiting
    reading_progress_percent: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="saved_items")
    collection: Mapped[Optional["Collection"]] = relationship(back_populates="saved_items")


class Note(Base):
    __tablename__ = "notes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    article_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("articles.id", ondelete="SET NULL"), nullable=True)
    concept_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("concepts.id", ondelete="SET NULL"), nullable=True)
    title: Mapped[str] = mapped_column(String(255))
    content_markdown: Mapped[str] = mapped_column(Text)
    tags: Mapped[List[str]] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="notes")


class Highlight(Base):
    __tablename__ = "highlights"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    passage_text: Mapped[str] = mapped_column(Text)
    annotation: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    color: Mapped[str] = mapped_column(String(20), default="amber")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="highlights")


# 7. Personalized Study Planner (Section 9)
class StudyPlan(Base):
    __tablename__ = "study_plans"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    discipline_or_goal: Mapped[str] = mapped_column(String(100))
    total_weeks: Mapped[int] = mapped_column(Integer, default=12)
    daily_time_minutes: Mapped[int] = mapped_column(Integer, default=30)
    current_week: Mapped[int] = mapped_column(Integer, default=1)
    status: Mapped[str] = mapped_column(String(50), default="active")  # active, paused, completed
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="study_plans")
    weeks: Mapped[List["StudyPlanWeek"]] = relationship(back_populates="study_plan")


class StudyPlanWeek(Base):
    __tablename__ = "study_plan_weeks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    study_plan_id: Mapped[int] = mapped_column(Integer, ForeignKey("study_plans.id", ondelete="CASCADE"))
    week_number: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(255))
    theme_objective: Mapped[str] = mapped_column(Text)
    prerequisites_met: Mapped[bool] = mapped_column(Boolean, default=True)

    study_plan: Mapped["StudyPlan"] = relationship(back_populates="weeks")
    sessions: Mapped[List["StudySession"]] = relationship(back_populates="week")


class StudySession(Base):
    __tablename__ = "study_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    week_id: Mapped[int] = mapped_column(Integer, ForeignKey("study_plan_weeks.id", ondelete="CASCADE"))
    day_number: Mapped[int] = mapped_column(Integer)  # 1 to 7
    session_title: Mapped[str] = mapped_column(String(255))
    objective: Mapped[str] = mapped_column(Text)
    estimated_duration_mins: Mapped[int] = mapped_column(Integer, default=30)
    core_concepts: Mapped[List[str]] = mapped_column(JSON, default=list)
    article_slug: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    guided_questions: Mapped[List[str]] = mapped_column(JSON, default=list)
    practical_exercises: Mapped[List[str]] = mapped_column(JSON, default=list)
    reflection_prompt: Mapped[str] = mapped_column(Text)
    flashcards: Mapped[List[Dict[str, str]]] = mapped_column(JSON, default=list)
    completion_checklist: Mapped[List[Dict[str, Any]]] = mapped_column(JSON, default=list)
    suggested_review_date: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    comprehension_rating: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # 1-5 scale

    week: Mapped["StudyPlanWeek"] = relationship(back_populates="sessions")


class LearningProgress(Base):
    __tablename__ = "learning_progress"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    concept_id: Mapped[int] = mapped_column(Integer, ForeignKey("concepts.id", ondelete="CASCADE"))
    mastery_level: Mapped[float] = mapped_column(Float, default=0.0)  # 0.0 to 1.0
    times_reviewed: Mapped[int] = mapped_column(Integer, default=0)
    next_review_due: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    ease_factor: Mapped[float] = mapped_column(Float, default=2.5)  # SM-2 ease factor

    user: Mapped["User"] = relationship(back_populates="learning_progress")


# 8. Quizzes & Active Recall
class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    topic: Mapped[str] = mapped_column(String(100))
    difficulty: Mapped[str] = mapped_column(String(50), default="intermediate")

    questions: Mapped[List["QuizQuestion"]] = relationship(back_populates="quiz")
    attempts: Mapped[List["QuizAttempt"]] = relationship(back_populates="quiz")


class QuizQuestion(Base):
    __tablename__ = "quiz_questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    quiz_id: Mapped[int] = mapped_column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE"))
    question_text: Mapped[str] = mapped_column(Text)
    options: Mapped[List[str]] = mapped_column(JSON)
    correct_option_index: Mapped[int] = mapped_column(Integer)
    explanation: Mapped[str] = mapped_column(Text)
    concept_reference: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    quiz: Mapped["Quiz"] = relationship(back_populates="questions")


class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    quiz_id: Mapped[int] = mapped_column(Integer, ForeignKey("quizzes.id", ondelete="CASCADE"))
    score_percentage: Mapped[float] = mapped_column(Float)
    answers_submitted: Mapped[Dict[str, Any]] = mapped_column(JSON)
    attempted_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["User"] = relationship(back_populates="quiz_attempts")
    quiz: Mapped["Quiz"] = relationship(back_populates="attempts")


class ReviewSchedule(Base):
    __tablename__ = "review_schedule"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    item_type: Mapped[str] = mapped_column(String(50))  # flashcard, concept, article
    target_id: Mapped[int] = mapped_column(Integer)
    interval_days: Mapped[int] = mapped_column(Integer, default=1)
    repetition_count: Mapped[int] = mapped_column(Integer, default=0)
    scheduled_for: Mapped[datetime] = mapped_column(DateTime, index=True)


# 9. Admin, Editorial Review & Processing Jobs (Sections 14-15)
class EditorialReview(Base):
    __tablename__ = "editorial_reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    article_id: Mapped[int] = mapped_column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    reviewer_name: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(50))  # approved, needs_revision, rejected
    review_notes: Mapped[str] = mapped_column(Text)
    citation_fidelity_score: Mapped[float] = mapped_column(Float, default=0.95)
    reviewed_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    article: Mapped["Article"] = relationship(back_populates="editorial_reviews")


class ProcessingJob(Base):
    __tablename__ = "processing_jobs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    job_type: Mapped[str] = mapped_column(String(100), index=True)  # daily_research_crawl, ai_synthesis, citation_verification, graph_update
    status: Mapped[str] = mapped_column(String(50), default="pending", index=True)  # pending, running, completed, failed, dead_letter
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
    items_processed: Mapped[int] = mapped_column(Integer, default=0)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    job_metadata: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict)


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    actor: Mapped[str] = mapped_column(String(100), default="system")
    action_type: Mapped[str] = mapped_column(String(100), index=True)  # source_crawled, article_published, version_rollback, citation_flagged
    target_entity: Mapped[str] = mapped_column(String(100))
    target_id: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    details: Mapped[Dict[str, Any]] = mapped_column(JSON, default=dict)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
