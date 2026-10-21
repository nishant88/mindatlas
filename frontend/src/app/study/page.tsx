"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  RotateCcw,
  Award,
  ChevronRight,
  Brain,
  HelpCircle,
  Check
} from "lucide-react";
import RainbowStrip from "@/components/RainbowStrip";

interface StudySession {
  id: number;
  title: string;
  discipline: string;
  mins: number;
  slug: string;
  desc: string;
}

interface WeekCurriculum {
  week: number;
  theme: string;
  focus: string;
  sessions: StudySession[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const WEEKLY_CURRICULUM: WeekCurriculum[] = [
  {
    week: 1,
    theme: "Foundations of Heuristics & Bounded Rationality",
    focus: "Mastering the dual-process foundations of human decision-making, systematic deviations from formal probability, and self-justifying cognitive dissonance.",
    sessions: [
      {
        id: 101,
        title: "Session 1: The Dual-Process Mind & Fast Heuristics",
        discipline: "Cognitive Science",
        mins: 45,
        slug: "heuristics-biases-and-bounded-rationality",
        desc: "Analyze System 1 and System 2 cognitive processing architecture and bounded optimization under time pressure."
      },
      {
        id: 102,
        title: "Session 2: Cognitive Dissonance & Self-Justification",
        discipline: "Psychology",
        mins: 50,
        slug: "cognitive-dissonance-and-belief-perseverance",
        desc: "Festinger's induced compliance paradigm, anterior cingulate cortex activation, and structured debiasing protocols."
      },
      {
        id: 103,
        title: "Session 3: Identity-Protective Motivated Reasoning",
        discipline: "Social Psychology",
        mins: 40,
        slug: "motivated-reasoning-and-identity-protective-cognition",
        desc: "Cultural cognition theory, political polarization mechanics, and value-affirming evidence framing."
      }
    ],
    quiz: {
      question: "Which cognitive mechanism explains why highly educated domain experts are often more effective at defending partisan falsehoods?",
      options: [
        "They possess lower emotional awareness.",
        "Higher cognitive numeracy provides more computational ability to construct plausible post-hoc justifications.",
        "They do not experience cognitive dissonance.",
        "They rely exclusively on fast-and-frugal heuristics."
      ],
      correctIndex: 1,
      explanation: "Higher cognitive numeracy and scientific literacy provide greater computational horsepower to invent post-hoc rationalizations that defend tribal identities."
    }
  },
  {
    week: 2,
    theme: "Epistemic Demarcation & Scientific Parsimony",
    focus: "Distinguishing genuine empirical discovery from unfalsifiable dogma using Popperian asymmetry and Occam's razor.",
    sessions: [
      {
        id: 201,
        title: "Session 1: Popperian Falsification & The Black Swan",
        discipline: "Scientific Reasoning",
        mins: 45,
        slug: "popperian-falsificationism-and-scientific-demarcation",
        desc: "Why observing a billion white swans cannot logically prove all swans are white, while a single black swan refutes it."
      },
      {
        id: 202,
        title: "Session 2: Occam's Razor & Epistemic Parsimony",
        discipline: "Philosophy",
        mins: 35,
        slug: "occams-razor-and-epistemic-parsimony",
        desc: "Bayesian model evidence and Kolmogorov complexity penalizing gratuitous explanatory entities."
      },
      {
        id: 203,
        title: "Session 3: First-Principles Thinking & Axiomatic Logic",
        discipline: "Critical Thinking & Logic",
        mins: 40,
        slug: "first-principles-reasoning",
        desc: "Stripping away analogies and legacy constraints to reason upward from irreducible physical truths."
      }
    ],
    quiz: {
      question: "Why is empirical verification considered logically asymmetrical to empirical falsification?",
      options: [
        "Because laboratory equipment is prone to measurement noise.",
        "Because Modus Tollens allows a single counter-instance to decisively refute a universal hypothesis, whereas no finite number of confirmations can prove it.",
        "Because Karl Popper proved that truth does not exist.",
        "Because inductive reasoning is faster than deductive reasoning."
      ],
      correctIndex: 1,
      explanation: "Modus Tollens provides absolute deductive refutation: If H implies P, and not-P is observed, H is conclusively false. Affirming P merely fails to refute H."
    }
  },
  {
    week: 3,
    theme: "Decision Under Risk & Prospect Mechanics",
    focus: "Analyzing non-linear decision weighting, loss aversion, and ecological validity in human cooperation.",
    sessions: [
      {
        id: 301,
        title: "Session 1: Loss Aversion & Prospect Theory",
        discipline: "Behavioral Economics",
        mins: 40,
        slug: "loss-aversion-and-prospect-theory",
        desc: "The asymmetric S-shaped value function explaining why losses are psychologically ~2.1x more potent than equivalent gains."
      },
      {
        id: 302,
        title: "Session 2: Bounded Rationality & Satisficing",
        discipline: "Cognitive Science",
        mins: 35,
        slug: "heuristics-biases-and-bounded-rationality",
        desc: "Herbert Simon's Nobel-winning proof that organisms optimize within computational and time constraints."
      },
      {
        id: 303,
        title: "Session 3: The Bystander Effect Re-Examined",
        discipline: "Social Psychology",
        mins: 35,
        slug: "the-bystander-effect-re-examined",
        desc: "Comparing laboratory smoke-room experiments with modern CCTV video showing 90%+ citizen emergency intervention."
      }
    ],
    quiz: {
      question: "According to Kahneman and Tversky's Prospect Theory, how does risk preference shift between gains and losses?",
      options: [
        "People are uniformly risk-seeking across all outcomes.",
        "People are risk-averse when evaluating potential gains, but become aggressively risk-seeking when faced with certain losses.",
        "People are risk-neutral when expected monetary value is equal.",
        "Risk preferences depend entirely on an individual's astrological sign."
      ],
      correctIndex: 1,
      explanation: "The S-shaped value function is concave in the domain of gains (risk aversion) and convex in the domain of losses (risk seeking to avoid paying a sure loss)."
    }
  },
  {
    week: 4,
    theme: "The Bayesian Brain & Generative Perception",
    focus: "Conscious perception as a top-down hierarchical simulation minimizing thermodynamic free energy.",
    sessions: [
      {
        id: 401,
        title: "Session 1: The Predictive Brain & Free Energy",
        discipline: "Neuroscience",
        mins: 55,
        slug: "predictive-processing-and-the-bayesian-brain",
        desc: "How cortical tiers project generative priors downward and pass only prediction error signals upward."
      },
      {
        id: 402,
        title: "Session 2: Active Inference vs Perceptual Updating",
        discipline: "Cognitive Science",
        mins: 40,
        slug: "predictive-processing-and-the-bayesian-brain",
        desc: "Resolving prediction errors by modifying internal beliefs vs acting on the physical world."
      },
      {
        id: 403,
        title: "Session 3: Cognitive Dissonance as High-Precision Prior Defense",
        discipline: "Psychology",
        mins: 45,
        slug: "cognitive-dissonance-and-belief-perseverance",
        desc: "Re-interpreting Festinger's cognitive discomfort through the lens of Bayesian precision-weighting costs."
      }
    ],
    quiz: {
      question: "What is the primary role of ascending sensory signals in hierarchical predictive coding architectures?",
      options: [
        "They convey complete raw sensory photographs to the visual cortex.",
        "They transmit only the unpredicted error signal (difference between top-down prediction and sensory input).",
        "They store memories directly in the hippocampus.",
        "They bypass cortical processing to trigger immediate motor reflexes."
      ],
      correctIndex: 1,
      explanation: "To conserve metabolic bandwidth, the brain does not transmit raw sensory data upward; it sends top-down predictions down and only transmits residual prediction errors up."
    }
  },
  {
    week: 5,
    theme: "Social Dynamics, Polarization & Altruism",
    focus: "Unraveling tribal allegiance, pluralistic ignorance, and institutional design for collective intelligence.",
    sessions: [
      {
        id: 501,
        title: "Session 1: Cultural Cognition & Social Polarization",
        discipline: "Social Psychology",
        mins: 45,
        slug: "motivated-reasoning-and-identity-protective-cognition",
        desc: "Dan Kahan's framework demonstrating that social belonging takes cognitive precedence over empirical accuracy."
      },
      {
        id: 502,
        title: "Session 2: Overcoming Pluralistic Ignorance in Emergencies",
        discipline: "Social Psychology",
        mins: 35,
        slug: "the-bystander-effect-re-examined",
        desc: "How assigning directly accountable individuals (DRI) pierces ambiguity and unlocks pro-social intervention."
      },
      {
        id: 503,
        title: "Session 3: Status-Quo Bias & Sunk-Cost Traps",
        discipline: "Behavioral Economics",
        mins: 40,
        slug: "loss-aversion-and-prospect-theory",
        desc: "Why leadership teams cling to doomed initiatives to avoid acknowledging past misallocations."
      }
    ],
    quiz: {
      question: "What did the cross-national CCTV analysis by Philpot et al. (2020) prove regarding real-world bystander intervention?",
      options: [
        "In modern cities, people almost never assist victims of violent crime.",
        "In over 90% of real-world violent crises, at least one bystander actively intervened to assist the victim.",
        "Bystanders only help if they are paid financial rewards.",
        "Bystanders only intervene in rural communities, never in major metropolitan areas."
      ],
      correctIndex: 1,
      explanation: "Analyzing 1,225 real CCTV violent emergencies across London, Amsterdam, and Cape Town revealed that citizens intervened in 90.7% of public crises, disproving classic laboratory pessimism."
    }
  },
  {
    week: 6,
    theme: "Parsimony, Induction & Formal Reduction",
    focus: "Formalizing Occam's razor with Kolmogorov complexity and Bayesian model evidence.",
    sessions: [
      {
        id: 601,
        title: "Session 1: Epistemic Parsimony & The Occam Factor",
        discipline: "Philosophy",
        mins: 45,
        slug: "occams-razor-and-epistemic-parsimony",
        desc: "Why models with unnecessary free parameters suffer mathematical penalties in Bayesian posterior updating."
      },
      {
        id: 602,
        title: "Session 2: Demarcation in Pseudoscience & Conspiracy Theories",
        discipline: "Scientific Reasoning",
        mins: 40,
        slug: "popperian-falsificationism-and-scientific-demarcation",
        desc: "Analyzing why theories that invoke hundreds of conspirators collapse under parsimony scrutiny."
      },
      {
        id: 603,
        title: "Session 3: Axiomatic Thinking in Engineering Innovation",
        discipline: "Critical Thinking & Logic",
        mins: 40,
        slug: "first-principles-reasoning",
        desc: "Using Descartes' method of hyperbolic doubt to identify unshakeable premises."
      }
    ],
    quiz: {
      question: "Why does Bayesian probability naturally penalize overly complex models (the Occam Factor)?",
      options: [
        "Because complex models require more electricity to compute.",
        "Because a model with many free parameters must spread its prior probability mass thinly across a vast parameter space, lowering its evidence for any specific outcome.",
        "Because Bayesian mathematics assumes nature is always simple.",
        "Because complex models violate Newton's laws of motion."
      ],
      correctIndex: 1,
      explanation: "Complex models dilute their prior predictions over an enormous space of possibilities; when a specific dataset is observed, the simpler model that concentrated its prior probability achieves higher evidence."
    }
  },
  {
    week: 7,
    theme: "First-Principles Thinking & Axiomatic Decomposition",
    focus: "Deconstructing systems to fundamental physics and economics rather than copying industry conventions.",
    sessions: [
      {
        id: 701,
        title: "Session 1: First-Principles Deconstruction",
        discipline: "Critical Thinking & Logic",
        mins: 45,
        slug: "first-principles-reasoning",
        desc: "Deconstruct problems into raw material costs, thermal limits, and axiomatic mathematical constraints."
      },
      {
        id: 702,
        title: "Session 2: Satisficing vs Global Optimization",
        discipline: "Cognitive Science",
        mins: 40,
        slug: "heuristics-biases-and-bounded-rationality",
        desc: "When to use heuristic fast decisions vs when to apply exhaustive first-principles optimization."
      },
      {
        id: 703,
        title: "Session 3: Hanlon's Razor & Root Cause Diagnostics",
        discipline: "Philosophy",
        mins: 35,
        slug: "occams-razor-and-epistemic-parsimony",
        desc: "Never attribute to malice that which is adequately explained by ignorance or system architecture."
      }
    ],
    quiz: {
      question: "What is the primary difference between reasoning by analogy and reasoning from first principles?",
      options: [
        "Reasoning by analogy is based on mathematics; first principles is based on historical tradition.",
        "Reasoning by analogy copies existing practices with minor tweaks; first principles boils a problem down to fundamental truths and builds up from there.",
        "First principles thinking is only applicable to astrophysics, never business or software.",
        "Reasoning by analogy is always superior because it requires zero deliberation."
      ],
      correctIndex: 1,
      explanation: "Analogy iterates incrementally on existing solutions ('how everyone else does it'), while first principles identifies physics and economic axioms to find 10x breakthrough answers."
    }
  },
  {
    week: 8,
    theme: "Advanced Behavioral Economics & Risk Asymmetry",
    focus: "Strategic negotiations, portfolio risk management, and debiasing organizational decision funnels.",
    sessions: [
      {
        id: 801,
        title: "Session 1: The Asymmetry of Risk & Status-Quo Traps",
        discipline: "Behavioral Economics",
        mins: 45,
        slug: "loss-aversion-and-prospect-theory",
        desc: "How framing choices as potential foregone gains vs direct losses alters organizational willingness to pivot."
      },
      {
        id: 802,
        title: "Session 2: Sunk Costs & Induced Dissonance",
        discipline: "Psychology",
        mins: 40,
        slug: "cognitive-dissonance-and-belief-perseverance",
        desc: "Overcoming the psychological urge to justify past expenditures with further capital allocation."
      },
      {
        id: 803,
        title: "Session 3: Structured Institutional Debiasing (Pre-Mortems)",
        discipline: "Cognitive Science",
        mins: 40,
        slug: "heuristics-biases-and-bounded-rationality",
        desc: "Implementing Gary Klein's pre-mortem protocol to break optimistic groupthink before project kickoff."
      }
    ],
    quiz: {
      question: "Why do financial investors systematically hold losing positions too long while selling winning positions prematurely (the Disposition Effect)?",
      options: [
        "Because transaction fees are higher for profitable trades.",
        "Because selling a loser crystallizes the psychological agony of loss, whereas holding preserves the hope of break-even; selling a winner locks in a pleasant gain.",
        "Because financial markets reward investors who never sell.",
        "Because losing assets have higher dividend yields."
      ],
      correctIndex: 1,
      explanation: "Due to loss aversion, investors are risk-seeking in the loss domain (holding losers in hopes of break-even) and risk-averse in the gain domain (selling winners too early)."
    }
  },
  {
    week: 9,
    theme: "Active Inference & Computational Neurobiology",
    focus: "Understanding Karl Friston's Free Energy Principle and interoceptive selfhood.",
    sessions: [
      {
        id: 901,
        title: "Session 1: The Predictive Brain & Controlled Hallucination",
        discipline: "Neuroscience",
        mins: 50,
        slug: "predictive-processing-and-the-bayesian-brain",
        desc: "How conscious visual and auditory experience is generated by descending cortical generative models."
      },
      {
        id: 902,
        title: "Session 2: Falsificationism in Computational Neuroscience",
        discipline: "Scientific Reasoning",
        mins: 40,
        slug: "popperian-falsificationism-and-scientific-demarcation",
        desc: "Designing empirical fMRI and MEG paradigms capable of testing top-down error propagation hypotheses."
      },
      {
        id: 903,
        title: "Session 3: Ecological Validity in Neural Behavioral Paradigms",
        discipline: "Social Psychology",
        mins: 35,
        slug: "the-bystander-effect-re-examined",
        desc: "Why measuring neural activity in artificial laboratory scanners must be corroborated by real-world behavioral telemetry."
      }
    ],
    quiz: {
      question: "According to Andy Clark and Karl Friston, what is conscious perception?",
      options: [
        "A passive photographic recording of external physical reality.",
        "A controlled hallucination: an internally generated simulation continuously reined in by sensory prediction error.",
        "An instantaneous telepathic transmission from external photons.",
        "A random sequence of electrical impulses in the spinal cord."
      ],
      correctIndex: 1,
      explanation: "Perception is a top-down generative projection (controlled hallucination) constantly constrained and updated by ascending sensory prediction error signals."
    }
  },
  {
    week: 10,
    theme: "Tribal Epistemology & Scientific Polarization",
    focus: "De-escalating tribal hostility and communicating empirical evidence across ideological divides.",
    sessions: [
      {
        id: 1001,
        title: "Session 1: Motivated Reasoning & Value Affirmation",
        discipline: "Social Psychology",
        mins: 45,
        slug: "motivated-reasoning-and-identity-protective-cognition",
        desc: "Why presenting facts without identity affirmation triggers defensive cognitive entrenchment."
      },
      {
        id: 1002,
        title: "Session 2: Cognitive Dissonance in Polarized Communities",
        discipline: "Psychology",
        mins: 40,
        slug: "cognitive-dissonance-and-belief-perseverance",
        desc: "How social echo chambers provide ready-made rationalizations to protect members from dissonance."
      },
      {
        id: 1003,
        title: "Session 3: Adversarial Collaboration in Academic Research",
        discipline: "Scientific Reasoning",
        mins: 40,
        slug: "popperian-falsificationism-and-scientific-demarcation",
        desc: "Kahneman's protocol for rival researchers to pre-register joint experiments designed to test competing claims."
      }
    ],
    quiz: {
      question: "What is the most effective protocol for presenting counter-attitudinal scientific evidence to a skeptical group?",
      options: [
        "Publicly ridiculing their intelligence and educational background.",
        "Decoupling the scientific findings from cultural identity markers and framing the recommendations within the group's core moral values.",
        "Showing 100 additional charts with complex statistical regressions.",
        "Threatening legal sanctions against dissenters."
      ],
      correctIndex: 1,
      explanation: "Affirming the audience's core identity and decoupling the empirical claim from cultural tribalism eliminates identity threat, allowing objective Bayesian belief updating."
    }
  },
  {
    week: 11,
    theme: "The Replication Crisis & Empirical Rigor",
    focus: "Investigating p-hacking, publication bias, and ecological validity across modern social science.",
    sessions: [
      {
        id: 1101,
        title: "Session 1: Popperian Demarcation vs P-Hacking",
        discipline: "Scientific Reasoning",
        mins: 45,
        slug: "popperian-falsificationism-and-scientific-demarcation",
        desc: "How HARKing (Hypothesizing After Results are Known) turns empirical research into unfalsifiable storytelling."
      },
      {
        id: 1102,
        title: "Session 2: The Bystander Effect & Laboratory Artifacts",
        discipline: "Social Psychology",
        mins: 40,
        slug: "the-bystander-effect-re-examined",
        desc: "A case study in how 50 years of textbook consensus was corrected by naturalistic surveillance video."
      },
      {
        id: 1103,
        title: "Session 3: Parsimonious Models vs Statistical Overfitting",
        discipline: "Philosophy",
        mins: 40,
        slug: "occams-razor-and-epistemic-parsimony",
        desc: "Using Occam's razor to choose robust models that generalize out-of-sample rather than overfitting noise."
      }
    ],
    quiz: {
      question: "Why is pre-registration of experimental hypotheses and analytical protocols critical for scientific demarcation?",
      options: [
        "It prevents scientists from publishing their papers in English.",
        "It prevents post-hoc HARKing (Hypothesizing After Results are Known) and forces hypotheses to expose themselves to genuine risk of falsification.",
        "It eliminates the need for peer review entirely.",
        "It guarantees that every experiment will succeed."
      ],
      correctIndex: 1,
      explanation: "Pre-registration commits researchers to exact hypotheses and statistical plans before seeing the data, ensuring the test is truly falsifiable rather than rationalized post-hoc."
    }
  },
  {
    week: 12,
    theme: "Capstone Epistemic Synthesis & Lifelong Mastery",
    focus: "Unifying first-principles logic, Bayesian updating, and debiasing habits for lifetime cognitive mastery.",
    sessions: [
      {
        id: 1201,
        title: "Session 1: First-Principles Thinking in Complex Systems",
        discipline: "Critical Thinking & Logic",
        mins: 50,
        slug: "first-principles-reasoning",
        desc: "Combining axiomatic deconstruction with Bayesian calibration to solve high-uncertainty problems."
      },
      {
        id: 1202,
        title: "Session 2: The Unified Cognitive Architecture",
        discipline: "Cognitive Science",
        mins: 45,
        slug: "predictive-processing-and-the-bayesian-brain",
        desc: "Integrating predictive processing, bounded rationality, and prospect theory into a unified mental model of mind."
      },
      {
        id: 1203,
        title: "Session 3: The Architecture of Epistemic Humility",
        discipline: "Psychology",
        mins: 45,
        slug: "cognitive-dissonance-and-belief-perseverance",
        desc: "Transforming the emotional friction of cognitive dissonance into an excited signal of personal learning."
      }
    ],
    quiz: {
      question: "What is the ultimate hallmark of a calibrated, epistemic thinker?",
      options: [
        "Always winning every debate in front of an audience.",
        "Actively seeking out evidence capable of falsifying their own cherished beliefs and treating cognitive dissonance as a signal to update priors.",
        "Memorizing dictionary definitions of every logical fallacy.",
        "Never expressing uncertainty about any subject."
      ],
      correctIndex: 1,
      explanation: "Calibrated epistemic thinkers decouple their ego from their hypotheses; they celebrate finding disconfirming evidence because it moves them closer to objective truth."
    }
  }
];

function StudyPlannerContent() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [completedSessions, setCompletedSessions] = useState<{ [key: number]: boolean }>({ 101: true, 102: true });
  const [quizAnswers, setQuizAnswers] = useState<{ [weekNum: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [weekNum: number]: boolean }>({});

  const currentCurriculum = WEEKLY_CURRICULUM.find((w) => w.week === selectedWeek) || WEEKLY_CURRICULUM[0];

  const handleMarkComplete = (sessionId: number) => {
    setCompletedSessions((prev) => ({
      ...prev,
      [sessionId]: !prev[sessionId]
    }));
  };

  const handleAnswerSelect = (weekNum: number, optionIndex: number) => {
    if (quizSubmitted[weekNum]) return;
    setQuizAnswers((prev) => ({ ...prev, [weekNum]: optionIndex }));
  };

  const handleSubmitQuiz = (weekNum: number) => {
    if (quizAnswers[weekNum] === undefined) return;
    setQuizSubmitted((prev) => ({ ...prev, [weekNum]: true }));
  };

  const selectedAnswer = quizAnswers[selectedWeek];
  const isSubmitted = quizSubmitted[selectedWeek];
  const isAnswerCorrect = selectedAnswer === currentCurriculum.quiz.correctIndex;

  return (
    <div className="min-h-screen bg-[#1e1a17] text-[#f2ebe2]">
      {/* Top Banner */}
      <div className="bg-dot-matrix py-12 border-b border-[#3d3532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-black uppercase tracking-widest text-[#d5cf66] mb-2">
            Structured Cognitive Curriculum
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#f2ebe2] tracking-tight mb-3">
            12-Week Epistemic Mastery Path
          </h1>
          <p className="text-base sm:text-lg text-[#b8ada2] max-w-2xl leading-relaxed">
            Spaced repetition schedules, active recall self-tests, and progressive mastery from foundational heuristics to advanced formal epistemology.
          </p>

          {/* Week Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {WEEKLY_CURRICULUM.map((w) => {
              const isSelected = selectedWeek === w.week;
              const hasCompletedAll = w.sessions.every((s) => completedSessions[s.id]);
              return (
                <button
                  key={w.week}
                  onClick={() => setSelectedWeek(w.week)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#d5cf66] text-[#232402] scale-105 shadow-md"
                      : "bg-[#272220] border border-[#3d3532] text-[#b8ada2] hover:text-[#f2ebe2]"
                  }`}
                >
                  {hasCompletedAll && <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />}
                  <span>Week {w.week}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <RainbowStrip />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Weekly Focus & Prescribed Reading Sessions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Week Overview Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                  Week {currentCurriculum.week} Curriculum
                </span>
                <span className="text-xs font-bold text-[#b8ada2]">
                  {currentCurriculum.sessions.length} Core Syntheses
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-[#f2ebe2]">
                {currentCurriculum.theme}
              </h2>
              <p className="text-sm sm:text-base text-[#b8ada2] leading-relaxed">
                {currentCurriculum.focus}
              </p>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-black text-[#f2ebe2]">
                  Prescribed Reading Sessions
                </h3>
                <span className="text-xs text-[#82756a]">
                  Click to open full academic treatise
                </span>
              </div>

              <div className="space-y-4">
                {currentCurriculum.sessions.map((session) => {
                  const isDone = completedSessions[session.id];
                  return (
                    <div
                      key={session.id}
                      className="p-6 rounded-3xl bg-[#272220] border border-[#3d3532] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-[#574d48]"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d5bcfe] text-[#1f1438]">
                            {session.discipline}
                          </span>
                          <span className="text-xs text-[#82756a] flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {session.mins} mins
                          </span>
                          {isDone && (
                            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-lg font-black text-[#f2ebe2] hover:text-[#d5cf66] transition-colors">
                          <Link href={`/articles/${session.slug}`}>
                            {session.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-[#b8ada2] leading-relaxed">{session.desc}</p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <Link
                          href={`/articles/${session.slug}`}
                          className="px-4 py-2 rounded-full bg-[#1e1a17] hover:bg-[#3d3532] border border-[#3d3532] text-xs font-bold text-[#d5cf66] hover:border-[#d5cf66]/60 transition-all"
                        >
                          Read Treatise &rarr;
                        </Link>
                        <button
                          onClick={() => handleMarkComplete(session.id)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                            isDone
                              ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                              : "bg-[#d5cf66] text-[#232402] hover:bg-[#ded871]"
                          }`}
                        >
                          {isDone ? "✓ Done" : "Mark Complete"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Active Recall Quiz Panel */}
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#272220] border border-[#3d3532] shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[#d5cf66]">
                  Active Recall Self-Test
                </span>
                <HelpCircle className="w-4 h-4 text-[#d5cf66]" />
              </div>

              <div>
                <h3 className="font-heading text-xl font-black text-[#f2ebe2] mb-1">
                  Week {currentCurriculum.week} Knowledge Check
                </h3>
                <p className="text-xs text-[#b8ada2]">
                  Empirically proven to double 30-day concept retention compared to passive reading.
                </p>
              </div>

              {/* Dynamic Quiz Question */}
              <div className="p-5 rounded-2xl bg-[#1e1a17] border border-[#3d3532] space-y-4">
                <p className="text-xs sm:text-sm font-bold text-[#f2ebe2] leading-snug">
                  {currentCurriculum.quiz.question}
                </p>

                <div className="space-y-2.5">
                  {currentCurriculum.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswer === oIdx;
                    const isCorrect = oIdx === currentCurriculum.quiz.correctIndex;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerSelect(currentCurriculum.week, oIdx)}
                        className={`w-full p-3 rounded-xl text-xs text-left transition-all cursor-pointer ${
                          isSelected
                            ? isSubmitted
                              ? isCorrect
                                ? "bg-emerald-900/50 border border-emerald-500 text-emerald-200"
                                : "bg-rose-900/50 border border-rose-500 text-rose-200"
                              : "bg-[#d5cf66] text-[#232402] font-bold"
                            : isSubmitted && isCorrect
                            ? "bg-emerald-950/60 border border-emerald-500/70 text-emerald-300 font-semibold"
                            : "bg-[#272220] border border-[#3d3532] text-[#b8ada2] hover:text-[#f2ebe2]"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-[10px] opacity-70 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {!isSubmitted ? (
                  <button
                    onClick={() => handleSubmitQuiz(currentCurriculum.week)}
                    disabled={selectedAnswer === undefined}
                    className="w-full mt-3 py-2.5 rounded-full bg-[#d5cf66] text-[#232402] font-black text-xs hover:bg-[#ded871] transition-all cursor-pointer disabled:opacity-40 shadow-md"
                  >
                    Submit Self-Evaluation
                  </button>
                ) : (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                      isAnswerCorrect
                        ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                        : "bg-rose-950/80 border-rose-500/40 text-rose-200"
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {isAnswerCorrect ? "✓ Mastered!" : "✕ Epistemic Misstep"}
                    </div>
                    <p className="opacity-90">{currentCurriculum.quiz.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudyPlannerPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-[#b8ada2]">Loading study planner...</div>}>
      <StudyPlannerContent />
    </Suspense>
  );
}
