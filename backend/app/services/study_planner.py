from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import math

class StudyPlannerService:
    """Personalized curriculum construction, active recall, and spaced repetition scheduler."""

    INTERDISCIPLINARY_12_WEEKS = [
        {
            "week": 1,
            "title": "Introduction to Critical Thinking and Epistemology",
            "objective": "Understand belief formation, knowledge criteria, and epistemic justification.",
            "topics": ["Epistemology", "Justified True Belief", "Skepticism", "Foundationalism vs Coherentism"],
            "article_slug": "critical-thinking-and-epistemic-foundations"
        },
        {
            "week": 2,
            "title": "Deductive Reasoning, Inductive Reasoning, and Argument Structure",
            "objective": "Master premise-conclusion validity, soundness, cogency, and syllogistic logic.",
            "topics": ["Deductive Logic", "Inductive Generalization", "Soundness vs Validity", "Modus Ponens/Tollens"],
            "article_slug": "argument-structure-and-deductive-validity"
        },
        {
            "week": 3,
            "title": "Formal and Informal Logical Fallacies",
            "objective": "Diagnose structural defects in arguments and identify deceptive rhetorical moves.",
            "topics": ["Ad Hominem", "Straw Man", "Affirming the Consequent", "False Dilemma", "Equivocation"],
            "article_slug": "taxonomy-of-logical-fallacies"
        },
        {
            "week": 4,
            "title": "Cognitive Biases and Heuristics",
            "objective": "Explore dual-process cognition, system 1 vs system 2, and systematic perceptual distortions.",
            "topics": ["Confirmation Bias", "Availability Heuristic", "Anchoring Effect", "Cognitive Dissonance"],
            "article_slug": "cognitive-biases-and-heuristics"
        },
        {
            "week": 5,
            "title": "Scientific Method, Evidence, and Research Literacy",
            "objective": "Critically analyze research designs, statistical significance, p-hacking, and replication.",
            "topics": ["Falsificationism (Popper)", "Replication Crisis", "Randomized Controlled Trials", "Bayesian Updating"],
            "article_slug": "scientific-reasoning-and-empirical-literacy"
        },
        {
            "week": 6,
            "title": "Psychology of Belief, Perception, and Memory",
            "objective": "Investigate reconstructive memory, perceptual illusions, and motivated reasoning.",
            "topics": ["Reconstructive Memory (Loftus)", "Motivated Reasoning", "Perceptual Set", "Belief Perseverance"],
            "article_slug": "psychology-of-belief-and-memory"
        },
        {
            "week": 7,
            "title": "Decision-Making and Behavioural Economics",
            "objective": "Examine prospect theory, loss aversion, choice architecture, and game theory.",
            "topics": ["Prospect Theory (Kahneman & Tversky)", "Loss Aversion", "Nash Equilibrium", "Nudge Theory"],
            "article_slug": "behavioral-economics-and-decision-architecture"
        },
        {
            "week": 8,
            "title": "Ethics and Moral Philosophy",
            "objective": "Compare normative frameworks: deontology, consequentialism, and virtue ethics.",
            "topics": ["Utilitarianism (Mill)", "Categorical Imperative (Kant)", "Virtue Ethics (Aristotle)", "Trolley Problems"],
            "article_slug": "normative-ethics-and-moral-reasoning"
        },
        {
            "week": 9,
            "title": "Existentialism and Theories of Meaning",
            "objective": "Analyze existential dread, authenticity, absurdity, and the construction of meaning.",
            "topics": ["Existence Precedes Essence (Sartre)", "The Absurd (Camus)", "Will to Meaning (Frankl)", "Bad Faith"],
            "article_slug": "existentialism-and-the-search-for-meaning"
        },
        {
            "week": 10,
            "title": "Social Psychology, Persuasion, and Group Behaviour",
            "objective": "Understand conformity, social identity, in-group favoritism, and obedience.",
            "topics": ["Conformity (Asch)", "Obedience (Milgram)", "Bystander Effect", "Groupthink"],
            "article_slug": "social-psychology-and-group-dynamics"
        },
        {
            "week": 11,
            "title": "Comparative Theories, Objections, and Interdisciplinary Connections",
            "objective": "Synthesize epistemic, cognitive, and ethical insights to resolve complex dialectics.",
            "topics": ["Ecological Rationality", "Philosophy of Mind", "Evolutionary Psychology", "Epistemic Humility"],
            "article_slug": "interdisciplinary-synthesis-and-dialectics"
        },
        {
            "week": 12,
            "title": "Synthesis Project, Assessment, and Personalized Revision",
            "objective": "Conduct capstone active recall assessment and assemble lifelong intellectual mental models.",
            "topics": ["Mental Models Integration", "Cognitive Debiasing Toolkit", "Lifelong Epistemic Vigilance"],
            "article_slug": "mindatlas-capstone-synthesis"
        }
    ]

    def build_12_week_curriculum(
        self,
        daily_time_minutes: int = 30,
        preferred_depth: str = "comprehensive"
    ) -> List[Dict[str, Any]]:
        """Construct the 12-week interdisciplinary study plan."""
        curriculum = []
        for w_data in self.INTERDISCIPLINARY_12_WEEKS:
            week_num = w_data["week"]
            sessions = []
            # 5 sessions per week + 1 revision + 1 self-assessment
            for day in range(1, 6):
                topic = w_data["topics"][(day - 1) % len(w_data["topics"])]
                sessions.append({
                    "day_number": day,
                    "session_title": f"Day {day}: Deep Investigation into {topic}",
                    "objective": f"Dissect the foundational principles, empirical evidence, and edge cases of {topic}.",
                    "estimated_duration_mins": daily_time_minutes,
                    "core_concepts": [topic, w_data["topics"][0]],
                    "article_slug": w_data["article_slug"],
                    "guided_questions": [
                        f"What are the necessary premises required for {topic}?",
                        f"How does an adversarial critic object to standard interpretations of {topic}?",
                        "In what daily decision or evaluation did you recently observe this dynamic?"
                    ],
                    "practical_exercises": [
                        f"Identify one instance of {topic} in a recent editorial or public debate.",
                        "Write a 100-word synthesis reframing the concept for a high school student."
                    ],
                    "reflection_prompt": f"How does a rigorous understanding of {topic} alter your personal epistemic standards?",
                    "flashcards": [
                        {"front": f"Core Definition of {topic}", "back": f"Essential mechanism or argument underlying {topic}."},
                        {"front": f"Primary pitfall when analyzing {topic}", "back": "Confusing superficial rhetoric with structural validity."}
                    ],
                    "completion_checklist": [
                        {"task": "Read primary and secondary synthesized passages", "done": False},
                        {"task": "Complete flashcard active recall", "done": False},
                        {"task": "Draft personal reflection note", "done": False}
                    ],
                    "is_completed": False
                })

            curriculum.append({
                "week_number": week_num,
                "title": f"Week {week_num}: {w_data['title']}",
                "theme_objective": w_data["objective"],
                "sessions": sessions
            })
        return curriculum

    def calculate_sm2_interval(
        self,
        repetition_count: int,
        ease_factor: float,
        quality_rating: int  # 0 to 5 (0: complete blackout, 5: perfect instant recall)
    ) -> Dict[str, Any]:
        """
        SuperMemo SM-2 spaced repetition calculation.
        quality_rating: 0-5
        """
        # Constrain ease factor
        new_ef = ease_factor + (0.1 - (5 - quality_rating) * (0.08 + (5 - quality_rating) * 0.02))
        new_ef = max(1.3, new_ef)

        if quality_rating < 3:
            # Failed recall, reset interval
            new_repetitions = 0
            interval_days = 1
        else:
            new_repetitions = repetition_count + 1
            if new_repetitions == 1:
                interval_days = 1
            elif new_repetitions == 2:
                interval_days = 6
            else:
                interval_days = math.ceil((interval_days if 'interval_days' in locals() else 6) * new_ef)

        next_date = datetime.utcnow() + timedelta(days=interval_days)

        return {
            "interval_days": interval_days,
            "repetition_count": new_repetitions,
            "ease_factor": round(new_ef, 2),
            "next_review_due": next_date
        }

study_planner_service = StudyPlannerService()
