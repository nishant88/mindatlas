from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.entities import StudyPlan, StudyPlanWeek, StudySession, Quiz, QuizQuestion, QuizAttempt
from app.services.study_planner import study_planner_service

router = APIRouter(prefix="/study", tags=["study"])

@router.get("/plans")
async def get_study_plans(db: AsyncSession = Depends(get_db)):
    stmt = (
        select(StudyPlan)
        .options(
            selectinload(StudyPlan.weeks).selectinload(StudyPlanWeek.sessions)
        )
    )
    res = await db.execute(stmt)
    plans = res.scalars().all()
    
    result = []
    for p in plans:
        total_sessions = sum(len(w.sessions) for w in p.weeks)
        completed_sessions = sum(sum(1 for s in w.sessions if s.is_completed) for w in p.weeks)
        progress_pct = int((completed_sessions / total_sessions * 100)) if total_sessions > 0 else 0
        
        result.append({
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "discipline_or_goal": p.discipline_or_goal,
            "total_weeks": p.total_weeks,
            "current_week": p.current_week,
            "status": p.status,
            "total_sessions": total_sessions,
            "completed_sessions": completed_sessions,
            "progress_percentage": progress_pct,
            "weeks": [
                {
                    "id": w.id,
                    "week_number": w.week_number,
                    "title": w.title,
                    "theme_objective": w.theme_objective,
                    "sessions": [
                        {
                            "id": s.id,
                            "day_number": s.day_number,
                            "session_title": s.session_title,
                            "objective": s.objective,
                            "estimated_duration_mins": s.estimated_duration_mins,
                            "core_concepts": s.core_concepts,
                            "article_slug": s.article_slug,
                            "guided_questions": s.guided_questions,
                            "practical_exercises": s.practical_exercises,
                            "reflection_prompt": s.reflection_prompt,
                            "flashcards": s.flashcards,
                            "completion_checklist": s.completion_checklist,
                            "is_completed": s.is_completed,
                            "comprehension_rating": s.comprehension_rating
                        }
                        for s in w.sessions
                    ]
                }
                for w in p.weeks
            ]
        })
    return result

@router.post("/sessions/{session_id}/complete")
async def mark_session_completed(
    session_id: int,
    payload: Dict[str, Any] = Body(...),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(StudySession).where(StudySession.id == session_id)
    session = (await db.execute(stmt)).scalar_one_or_none()
    if not session:
        raise HTTPException(status_code=404, detail="Study session not found")

    session.is_completed = payload.get("is_completed", True)
    session.comprehension_rating = payload.get("comprehension_rating", 4)
    await db.commit()

    return {
        "status": "success",
        "session_id": session.id,
        "is_completed": session.is_completed,
        "comprehension_rating": session.comprehension_rating
    }

@router.post("/spaced-repetition/review")
async def record_spaced_repetition(payload: Dict[str, Any] = Body(...)):
    repetition = payload.get("repetition_count", 0)
    ease = payload.get("ease_factor", 2.5)
    quality = payload.get("quality_rating", 4)
    result = study_planner_service.calculate_sm2_interval(repetition, ease, quality)
    return result

@router.get("/quizzes")
async def get_active_recall_quizzes(db: AsyncSession = Depends(get_db)):
    stmt = select(Quiz).options(selectinload(Quiz.questions))
    quizzes = (await db.execute(stmt)).scalars().all()
    return [
        {
            "id": q.id,
            "title": q.title,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "questions": [
                {
                    "id": qu.id,
                    "question_text": qu.question_text,
                    "options": qu.options,
                    "correct_option_index": qu.correct_option_index,
                    "explanation": qu.explanation,
                    "concept_reference": qu.concept_reference
                }
                for qu in q.questions
            ]
        }
        for q in quizzes
    ]
