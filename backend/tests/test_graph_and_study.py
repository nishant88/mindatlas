import pytest
from app.services.study_planner import study_planner_service

def test_12_week_curriculum_structure():
    curriculum = study_planner_service.build_12_week_curriculum(daily_time_minutes=30)
    assert len(curriculum) == 12
    assert "Critical Thinking" in curriculum[0]["title"]
    assert "Synthesis Project" in curriculum[11]["title"]
    
    week_1_sessions = curriculum[0]["sessions"]
    assert len(week_1_sessions) == 5
    s1 = week_1_sessions[0]
    assert "guided_questions" in s1
    assert "flashcards" in s1
    assert "completion_checklist" in s1

def test_sm2_spaced_repetition_calculation():
    # Perfect recall (rating 5)
    r1 = study_planner_service.calculate_sm2_interval(repetition_count=0, ease_factor=2.5, quality_rating=5)
    assert r1["interval_days"] == 1
    assert r1["repetition_count"] == 1
    assert r1["ease_factor"] >= 2.5

    # Second successful recall
    r2 = study_planner_service.calculate_sm2_interval(repetition_count=1, ease_factor=2.5, quality_rating=5)
    assert r2["interval_days"] == 6
    assert r2["repetition_count"] == 2

    # Blackout / failed recall (rating 1)
    r_fail = study_planner_service.calculate_sm2_interval(repetition_count=3, ease_factor=2.5, quality_rating=1)
    assert r_fail["interval_days"] == 1
    assert r_fail["repetition_count"] == 0
    assert r_fail["ease_factor"] < 2.5
