// Comprehensive 12-Week Cognitive & Epistemic Curriculum for MindAtlas
// Detailed Day-by-Day learning plans with daily objectives, guided questions,
// practical debiasing exercises, reflection prompts, and active recall tests.

export interface DailySession {
  day: number;
  dayLabel: string;
  sessionTitle: string;
  discipline: string;
  disciplineColor: string;
  disciplineTextColor: string;
  durationMins: number;
  articleSlug: string;
  articleTitle: string;
  objective: string;
  guidedQuestions: string[];
  practicalExercise: string;
  reflectionPrompt: string;
  checklistTasks: string[];
}

export interface WeekPlan {
  week: number;
  title: string;
  subtitle: string;
  primaryDiscipline: string;
  weeklyObjective: string;
  prerequisites: string[];
  days: DailySession[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const TWELVE_WEEK_PLANS: WeekPlan[] = [
  {
    week: 1,
    title: "Dual-Process Cognition & Self-Justification",
    subtitle: "System 1 vs System 2, Bounded Optimization, and Cognitive Dissonance",
    primaryDiscipline: "Cognitive Science & Psychology",
    weeklyObjective: "Deconstruct the dual-process cognitive architecture of the human mind, examine evolutionary constraints on computation, and master Festinger's induced compliance mechanics.",
    prerequisites: ["None — Foundational Entry Point"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "The Dual-Process Mind: Fast Intuition vs Slow Deliberation",
        discipline: "Cognitive Science",
        disciplineColor: "#98dcfa",
        disciplineTextColor: "#04222e",
        durationMins: 35,
        articleSlug: "heuristics-biases-and-bounded-rationality",
        articleTitle: "Bounded Rationality, Heuristics & Decision Under Uncertainty",
        objective: "Analyze System 1 (associative, autonomous, high-speed) and System 2 (analytic, rule-governed, metabolically expensive) cognitive processing.",
        guidedQuestions: [
          "In what evolutionary contexts did System 1 heuristics outperform formal probability?",
          "Why is cognitive effort experienced as physiologically and subjectively costly?",
          "How does associative substitution trick the brain into answering an easier question than the one asked?"
        ],
        practicalExercise: "Log 3 rapid judgments you make during the day. Identify which heuristic shortcut (availability, representativeness, or anchoring) System 1 deployed.",
        reflectionPrompt: "When was the last time you substituted an easy intuitive answer for a difficult analytical calculation?",
        checklistTasks: [
          "Read primary treatise on Dual-Process Foundations",
          "Complete active recall flashcards for System 1 & 2",
          "Log one daily intuitive substitution in your notes"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Experimental Rigor",
        sessionTitle: "Cognitive Dissonance & Festinger's Induced Compliance",
        discipline: "Psychology",
        disciplineColor: "#d5bcfe",
        disciplineTextColor: "#1f1438",
        durationMins: 40,
        articleSlug: "cognitive-dissonance-and-belief-perseverance",
        articleTitle: "Cognitive Dissonance & the Architecture of Self-Justification",
        objective: "Dissect the 1959 $1 vs $20 experiment and understand why insufficient external justification forces internal attitude change.",
        guidedQuestions: [
          "Why did subjects paid $1 report genuine enjoyment of a boring spool-turning task while subjects paid $20 remained honest?",
          "How does the anterior insula and anterior cingulate cortex respond to internal cognitive conflict?",
          "Why does high intelligence amplify rather than prevent post-hoc self-justification?"
        ],
        practicalExercise: "Identify an area of your life where your personal actions contradict your stated ideals (e.g. screen time, diet, exercise). Observe how your brain rationalizes the inconsistency.",
        reflectionPrompt: "What past belief did you defend intensely, not because it was true, but because abandoning it would have caused emotional embarrassment?",
        checklistTasks: [
          "Read classic $1 vs $20 experiment case analysis",
          "Review neuroanatomical correlates of dissonance",
          "Draft personal reflection note on self-justification"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Social Mechanics",
        sessionTitle: "Identity-Protective Motivated Reasoning & Tribal Affiliation",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Examine Dan Kahan's Cultural Cognition framework and understand why factual accuracy is subordinated to social belonging.",
        guidedQuestions: [
          "Why does higher scientific numeracy correlate with greater ideological polarization rather than convergence?",
          "What distinguishes unmotivated heuristic errors from motivated directional skepticism?",
          "How can evidence be communicated so that it affirms rather than threatens personal identity?"
        ],
        practicalExercise: "Find an editorial written by an opposing political camp. Write out the strongest possible steelman version of their argument without using derogatory adjectives.",
        reflectionPrompt: "How much of your current worldview is shaped by the social expectations of your peer group?",
        checklistTasks: [
          "Read Kahan's Cultural Cognition analysis",
          "Steelman an ideological opponent's argument in notes",
          "Complete active recall questions"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Institutional Application",
        sessionTitle: "Debiasing Scaffolds: Pre-Mortems & Red Teaming",
        discipline: "Cognitive Science",
        disciplineColor: "#98dcfa",
        disciplineTextColor: "#04222e",
        durationMins: 30,
        articleSlug: "heuristics-biases-and-bounded-rationality",
        articleTitle: "Bounded Rationality, Heuristics & Decision Under Uncertainty",
        objective: "Implement structured institutional safeguards that outperform personal willpower in detecting cognitive blindspots.",
        guidedQuestions: [
          "Why does individual awareness produce negligible debiasing effects?",
          "How does Gary Klein's prospective hindsight protocol (Pre-Mortem) break social conformity?",
          "What makes institutional Red Teams effective at discovering catastrophic flaws before execution?"
        ],
        practicalExercise: "Conduct a 15-minute Pre-Mortem on your most important current project: assume it is 12 months from now and it failed completely. Write out the post-mortem explanation.",
        reflectionPrompt: "What silent assumptions in your current career or projects have you avoided questioning because questioning them feels risky?",
        checklistTasks: [
          "Write a 1-page Pre-Mortem for your top initiative",
          "Review Red Teaming guidelines in the library",
          "Share reflection in research notes"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Unified Cognitive Map of Week 1",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 40,
        articleSlug: "cognitive-dissonance-and-belief-perseverance",
        articleTitle: "Cognitive Dissonance & the Architecture of Self-Justification",
        objective: "Synthesize the interaction between System 1 heuristics, dissonance avoidance, and identity preservation into a personal decision checklist.",
        guidedQuestions: [
          "How do System 1 intuition, cognitive dissonance, and motivated reasoning interact in high-stakes negotiations?",
          "What are the boundary conditions where fast-and-frugal heuristics outperform complex analytical models?",
          "How can an intellectual thinker develop an emotional appetite for being proven wrong?"
        ],
        practicalExercise: "Formulate a 3-step personal protocol to pause and reflect whenever you feel the defensive, visceral sting of cognitive dissonance.",
        reflectionPrompt: "Can you reframe finding an error in your thinking as an exciting discovery rather than a personal defeat?",
        checklistTasks: [
          "Complete Week 1 Knowledge Check Self-Test",
          "Review all Week 1 flashcard active recalls",
          "Mark Week 1 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "Why did subjects in Festinger & Carlsmith's classic 1959 experiment who were paid $1 exhibit substantially greater attitude change than those paid $20?",
      options: [
        "The $1 subjects were more cooperative and eager to please the experimenters.",
        "The $1 subjects lacked sufficient external justification for stating the task was enjoyable, generating cognitive dissonance that compelled them to internalize the belief.",
        "The $20 subjects misunderstood the experimental instructions.",
        "The $1 subjects experienced lower physiological arousal in the anterior insula."
      ],
      correctIndex: 1,
      explanation: "Because $1 was insufficient external justification for lying, subjects experienced internal tension (cognitive dissonance) and resolved it by convincing themselves that the task was genuinely interesting."
    }
  },
  {
    week: 2,
    title: "Epistemic Demarcation & Scientific Parsimony",
    subtitle: "Karl Popper's Asymmetry, Occam's Razor, and First-Principles Reasoning",
    primaryDiscipline: "Scientific Reasoning & Philosophy",
    weeklyObjective: "Investigate why empirical confirmation is logically asymmetrical to empirical falsification, formalize Occam's razor with Bayesian model evidence, and master axiomatic deconstruction.",
    prerequisites: ["Week 1: Dual-Process Foundations"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Popperian Falsificationism & The Demarcation Problem",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 40,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Understand why inductive verification is logically vulnerable, and how Modus Tollens refutation demarcates empirical science from dogma.",
        guidedQuestions: [
          "Why can observing a billion white swans never prove all swans are white, while a single black swan permanently refutes the hypothesis?",
          "How did Karl Popper distinguish Albert Einstein's relativity from astrology and dogmatic psychoanalysis?",
          "Why is an unfalsifiable hypothesis that explains everything fundamentally incapable of explaining anything?"
        ],
        practicalExercise: "Choose a belief or claim you hold with 90%+ confidence. Write down the precise, observable empirical event that would decisively convince you that you are mistaken.",
        reflectionPrompt: "Do you actively test your own theories by attempting to break them, or do you only seek out confirming evidence?",
        checklistTasks: [
          "Read Popperian Demarcation foundational treatise",
          "Formulate a decisive falsification criterion for a core belief",
          "Complete flashcards on Modus Tollens & Demarcation"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Mathematical Parsimony",
        sessionTitle: "Occam's Razor & The Principle of Epistemic Parsimony",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Explore how Bayesian model evidence and Kolmogorov algorithmic complexity formalize the philosophical mandate of parsimony.",
        guidedQuestions: [
          "Why does Bayesian probability naturally penalize models with unnecessary free parameters (the Occam factor)?",
          "What is the mathematical difference between ontological parsimony and syntactic parsimony?",
          "How does Occam's razor decisively dismantle complex conspiracy theories?"
        ],
        practicalExercise: "Apply Hanlon's Razor ('Never attribute to malice that which is adequately explained by stupidity or system error') to a frustrating event that occurred this week.",
        reflectionPrompt: "How often do you invent elaborate psychological motivations for others when simple human fatigue or misunderstanding is the true cause?",
        checklistTasks: [
          "Read Bayesian Occam Factor mathematical derivation",
          "Complete active recall questions on Kolmogorov complexity",
          "Draft notes on Hanlon's Razor application"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Axiomatic Inquiry",
        sessionTitle: "First-Principles Thinking: Stripping Away Analogy",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 40,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Master René Descartes' method of hyperbolic doubt and Aristotle's search for irreducible foundational premises.",
        guidedQuestions: [
          "Why does reasoning by analogy produce incremental 10% improvements while first principles produces 10x breakthrough innovations?",
          "How did Elon Musk apply raw commodity pricing (aluminum, titanium, carbon fiber) to disrupt aerospace contracting?",
          "What are the 3 foundational questions of Socratic questioning for uncovering implicit assumptions?"
        ],
        practicalExercise: "Pick a high-cost expense or bottleneck in your work. Break it down to its irreducible physical or economic components and question each assumption.",
        reflectionPrompt: "Where in your career are you blindly copying industry conventions without knowing the historical reasons behind them?",
        checklistTasks: [
          "Read First-Principles aerospace & cuisine case studies",
          "Deconstruct a project budget down to raw materials",
          "Save notes on Socratic questioning protocols"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Methodological Traps",
        sessionTitle: "P-Hacking, HARKing & The Replication Crisis",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 35,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Investigate why Hypothesizing After Results are Known (HARKing) turns empirical investigation into post-hoc storytelling.",
        guidedQuestions: [
          "How does searching through 20 different outcome variables virtually guarantee a statistically significant p < 0.05 finding by chance?",
          "Why does mandatory pre-registration of analytical protocols restore Popperian falsification to academic science?",
          "What role does publication bias (the file drawer problem) play in creating textbook scientific myths?"
        ],
        practicalExercise: "Examine a recent sensational health or psychology headline. Inspect the sample size and check whether the authors pre-registered their hypothesis.",
        reflectionPrompt: "When reviewing metrics in your projects, do you decide what success looks like in advance, or do you find a metric that went up and declare victory post-hoc?",
        checklistTasks: [
          "Read Replication Crisis meta-analysis breakdown",
          "Review Open Science Framework pre-registration standards",
          "Complete diagnostic check on statistical significance"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Epistemic Calibrator: Parsimony + Demarcation",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Integrate Popperian asymmetric falsification, Bayesian Occam factors, and axiomatic deconstruction into an impenetrable epistemic filter.",
        guidedQuestions: [
          "How does a thinker balance parsimony (avoiding needless complexity) with avoiding premature reductionism (Einstein: 'make things as simple as possible, but no simpler')?",
          "In what domains is first-principles thinking inefficient compared to heuristic heuristics?",
          "What makes an epistemic claim robust against both confirmation bias and cynical hyper-skepticism?"
        ],
        practicalExercise: "Draft a 1-page Epistemic Charter specifying the conditions under which you will adopt, test, and abandon beliefs in your professional life.",
        reflectionPrompt: "Are you comfortable saying 'I do not know' when current evidence is insufficient to settle competing hypotheses?",
        checklistTasks: [
          "Complete Week 2 Knowledge Check Self-Test",
          "Review all Week 2 active recall flashcards",
          "Mark Week 2 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "According to Karl Popper's demarcation standard, what logically distinguishes an empirical scientific theory from pseudoscience or dogma?",
      options: [
        "The scientific theory has accumulated thousands of verifying observations.",
        "The scientific theory is accepted by an overwhelming majority of tenured academics.",
        "The scientific theory makes risky, specific empirical predictions that expose it to the logical possibility of decisive empirical falsification.",
        "The scientific theory is expressed in complex differential calculus."
      ],
      correctIndex: 2,
      explanation: "Popper established that no amount of confirming instances can prove a universal claim, but a single counter-instance can refute it. A genuine scientific theory must forbid observable outcomes."
    }
  },
  {
    week: 3,
    title: "Decision Under Risk & Prospect Mechanics",
    subtitle: "Loss Aversion, S-Shaped Utility Functions, and Real-World Cooperation",
    primaryDiscipline: "Behavioral Economics & Social Psychology",
    weeklyObjective: "Analyze Daniel Kahneman and Amos Tversky's Prospect Theory, master the mathematics of loss aversion, and examine real-world CCTV emergency intervention.",
    prerequisites: ["Week 1: Dual-Process Foundations"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Prospect Theory & The Asymmetrical Value Function",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 40,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Examine Kahneman and Tversky's 1979 breakthrough demonstrating why humans process gains and losses through reference-dependent subjective valuations.",
        guidedQuestions: [
          "Why is the subjective pain of losing $100 approximately 2.1 times sharper than the joy of winning $100?",
          "How does the S-shaped value function explain risk aversion in the domain of gains and risk seeking in the domain of losses?",
          "What is reference point framing, and how can the exact same objective outcome be experienced as either a triumph or a disaster?"
        ],
        practicalExercise: "Frame a strategic decision you face in two ways: first as a potential gain from current baseline, then as a potential loss from an aspirational target. Notice how your risk tolerance shifts.",
        reflectionPrompt: "Have you ever clung to a failing investment, toxic relationship, or doomed project simply to avoid acknowledging the emotional pain of a crystallized loss?",
        checklistTasks: [
          "Read Prospect Theory mathematical formulation",
          "Graph the S-shaped value function in your notes",
          "Complete flashcards on Reference Dependence & Loss Aversion"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Market Dynamics",
        sessionTitle: "The Sunk Cost Fallacy & The Disposition Effect",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Understand why investors hold losing assets too long and sell winning assets prematurely, and how sunk costs paralyze organizational strategy.",
        guidedQuestions: [
          "Why is unrecovered capital from the past completely irrelevant to forward-looking net present value calculations?",
          "How does ego-defense interact with loss aversion to produce catastrophic double-down escalation in military and corporate ventures?",
          "What systemic guardrails (such as automated stop-loss orders and independent audit committees) neutralize the sunk-cost trap?"
        ],
        practicalExercise: "Audit your current commitments. Identify one ongoing activity where you are spending time or money solely because you have already invested heavily in the past.",
        reflectionPrompt: "If you walked into your current life or role today as an objective outsider with zero past baggage, which initiatives would you cancel immediately?",
        checklistTasks: [
          "Read Concorde Fallacy and financial market case studies",
          "Identify and write out a personal sunk-cost audit",
          "Complete active recall questions"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Social Reality",
        sessionTitle: "The Bystander Effect Re-Examined: CCTV vs Laboratory",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 40,
        articleSlug: "the-bystander-effect-re-examined",
        articleTitle: "The Bystander Effect Re-Examined: Lab Artifacts vs Real CCTV",
        objective: "Discover how modern surveillance camera analysis overturned 50 years of textbook pessimism regarding human emergency intervention.",
        guidedQuestions: [
          "Why did classic laboratory experiments with artificial smoke and audio recordings produce bystander paralysis while real-world CCTV shows 90%+ intervention?",
          "What is ecological validity, and why must laboratory social psychology be checked against naturalistic observational data?",
          "What is pluralistic ignorance, and how does ambiguity in non-violent situations differ from clear, violent emergencies?"
        ],
        practicalExercise: "Learn and memorize the single directly accountable individual (DRI) command for public emergencies: 'You in the red jacket, call 911 immediately.'",
        reflectionPrompt: "When in a group chat or team meeting, do you ever hold back from speaking up because everyone else's silence makes you assume they have things under control?",
        checklistTasks: [
          "Read Philpot et al. (2020) cross-national CCTV study",
          "Complete flashcards on Ecological Validity & Pluralistic Ignorance",
          "Draft notes on eliminating ambiguity in team operations"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Ecological Rationality",
        sessionTitle: "Fast-and-Frugal Heuristics in High-Stakes Triage",
        discipline: "Cognitive Science",
        disciplineColor: "#98dcfa",
        disciplineTextColor: "#04222e",
        durationMins: 35,
        articleSlug: "heuristics-biases-and-bounded-rationality",
        articleTitle: "Bounded Rationality, Heuristics & Decision Under Uncertainty",
        objective: "Explore Gerd Gigerenzer's critique of normative rationality and analyze how fast-and-frugal decision trees outperform complex regression in emergency rooms.",
        guidedQuestions: [
          "Why do complex statistical models with many parameters often suffer from variance overfitting in uncertain environments?",
          "How does a 3-question emergency room triage heuristic save more heart attack patients than a 20-variable statistical regression?",
          "What is the difference between risk (where probability distributions are known) and uncertainty (where probability distributions are unknown)?"
        ],
        practicalExercise: "Design a fast-and-frugal 3-question decision tree for an operational process you manage to replace a cumbersome multi-page checklist.",
        reflectionPrompt: "Are you overcomplicating decisions by collecting low-signal data that delays action without reducing fundamental uncertainty?",
        checklistTasks: [
          "Read Gigerenzer's Ecological Rationality critique",
          "Sketch a 3-step decision tree in your notes",
          "Complete active recall questions"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "Strategic Decision Architecture",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Combine reference-point framing, loss aversion mitigation, and ecological decision trees into an executive decision framework.",
        guidedQuestions: [
          "How can leaders frame high-stakes organizational transformations to avoid triggering threat-defense loss aversion in their teams?",
          "When should a team use formal normative Bayesian analysis vs fast-and-frugal ecological heuristics?",
          "How does clear direct accountability prevent collective bystander paralysis in operational incidents?"
        ],
        practicalExercise: "Review a major upcoming proposal. Re-evaluate every line item by asking: 'If we didn't already own/do this, how much would we pay today to acquire/start it?'",
        reflectionPrompt: "How can you cultivate the emotional discipline to accept small, sure losses today to prevent catastrophic existential losses tomorrow?",
        checklistTasks: [
          "Complete Week 3 Knowledge Check Self-Test",
          "Review all Week 3 active recall flashcards",
          "Mark Week 3 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "According to Kahneman and Tversky's Prospect Theory, what explains why people frequently gamble recklessly when faced with a guaranteed loss?",
      options: [
        "People have zero mathematical understanding of negative numbers.",
        "The subjective value function is convex in the domain of losses, causing individuals to become risk-seeking in order to avoid paying a certain, crystallized loss.",
        "Losses release dopamine that impairs prefrontal cortex executive function.",
        "Human evolution occurred in an environment of infinite material abundance."
      ],
      correctIndex: 1,
      explanation: "The value function is S-shaped: concave for gains (risk aversion) and convex for losses (risk seeking). People will accept a substantial probability of an even worse loss if it offers any chance of avoiding a sure loss."
    }
  },
  {
    week: 4,
    title: "The Bayesian Brain & Generative Perception",
    subtitle: "Hierarchical Predictive Coding, Controlled Hallucination, and Free Energy",
    primaryDiscipline: "Neuroscience & Philosophy of Mind",
    weeklyObjective: "Master Karl Friston's Free Energy Principle, hierarchical predictive processing, and understand conscious perception as a top-down simulation constrained by error signals.",
    prerequisites: ["Week 1: Dual-Process Foundations"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Perception as Controlled Hallucination",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 45,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Understand why the human brain does not passively record the world like a video camera, but continuously projects top-down generative predictions.",
        guidedQuestions: [
          "Why is conscious perception described by neuroscientists as a 'controlled hallucination'?",
          "How does the brain conserve massive metabolic energy by only passing upward the unpredicted sensory error signal?",
          "Why do optical illusions persist even after you intellectually know how the illusion works?"
        ],
        practicalExercise: "Observe an ambiguous optical illusion (e.g. Necker cube or vase/faces). Notice how your conscious perception flips instantaneously as top-down generative models compete.",
        reflectionPrompt: "How much of what you 'see' and 'hear' during a heated conversation is actual incoming data vs your brain projecting its pre-existing expectations?",
        checklistTasks: [
          "Read Andy Clark & Karl Friston predictive brain treatise",
          "Complete flashcards on Generative Priors & Prediction Error",
          "Save notes on cortical hierarchy transmission"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Mathematical Principles",
        sessionTitle: "Karl Friston's Free Energy Principle & Active Inference",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 40,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Examine how biological organisms resist thermodynamic entropy and minimize surprises through perceptual updating and active inference.",
        guidedQuestions: [
          "What is thermodynamic free energy in information theory, and why does an organism die if it fails to minimize prediction errors?",
          "What are the two complementary methods for resolving prediction error: perceptual updating vs active inference?",
          "How does moving your eyes, speaking words, and physically altering your environment serve as active inference?"
        ],
        practicalExercise: "Identify a repetitive habit (e.g. checking your phone when waiting). Analyze it as an active inference strategy designed to eliminate sensory uncertainty and relieve metabolic prediction tension.",
        reflectionPrompt: "Do you tend to update your internal beliefs to match reality (perceptual updating), or do you force the world and people around you to match your beliefs (active inference)?",
        checklistTasks: [
          "Review Free Energy mathematical equation in treatise",
          "Complete active recall questions on Active Inference",
          "Draft personal reflection note"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Affective Correlates",
        sessionTitle: "Interoception & The Construction of Emotion",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 35,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Understand Lisa Feldman Barrett's Theory of Constructed Emotion through the lens of internal bodily predictive regulation (allostasis).",
        guidedQuestions: [
          "How does the brain interpret internal visceral signals (heart rate, cortisol, gut motility) using top-down conceptual predictions?",
          "Why is an emotional feeling like anxiety fundamentally an internal prediction rather than an unmediated reaction to the outside world?",
          "How can altering sleep, glucose, and bodily postures recalibrate hyper-reactive affective priors?"
        ],
        practicalExercise: "Next time you feel sudden anxiety or irritation, pause and check your bodily allostatic budget: Are you dehydrated, sleep-deprived, or hungry? Re-label the feeling as bodily fatigue before assigning psychological blame.",
        reflectionPrompt: "How often have you created an elaborate intellectual conflict with someone simply because your body was exhausted and your brain invented an emotional narrative to explain it?",
        checklistTasks: [
          "Read Constructed Emotion & Interoception synthesis",
          "Implement the 60-second allostatic check protocol",
          "Complete flashcards on Allostasis & Interoception"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Epistemic Convergence",
        sessionTitle: "Cognitive Dissonance as High-Precision Prior Defense",
        discipline: "Psychology",
        disciplineColor: "#d5bcfe",
        disciplineTextColor: "#1f1438",
        durationMins: 35,
        articleSlug: "cognitive-dissonance-and-belief-perseverance",
        articleTitle: "Cognitive Dissonance & the Architecture of Self-Justification",
        objective: "Bridge Festinger's 1957 psychological paradigm with 21st-century computational neuroscience precision-weighting models.",
        guidedQuestions: [
          "Why does modifying core identity priors incur massive computational re-weighting costs across the entire cortical hierarchy?",
          "How does the brain discount sensory evidence by dialing down the precision weight of contradictory observations?",
          "Why does ideological dogmatism feel subjectively comfortable while epistemic openness requires deliberate metabolic effort?"
        ],
        practicalExercise: "Examine a core belief you hold dear. What would it cost your mental web of beliefs if you discovered it was completely false? Notice the cognitive resistance.",
        reflectionPrompt: "Can you appreciate the brain's metabolic conservation strategies while choosing to endure the discomfort of updating core priors when evidence demands it?",
        checklistTasks: [
          "Read precision-weighting explanation of dissonance",
          "Map the cascading dependencies of one core belief",
          "Complete active recall questions"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Master Bayesian Architecture",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 40,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Unify predictive coding, allostasis, and belief revision into an integrated operational model of human consciousness.",
        guidedQuestions: [
          "How does knowing that perception is a generative simulation liberate a thinker from dogmatic certainty?",
          "What practical routines allow an analyst to deliberately increase the precision weight assigned to surprising disconfirming evidence?",
          "How does cultivating epistemic wonder alter prediction error processing in the brain?"
        ],
        practicalExercise: "Spend 10 minutes observing a familiar room as if you are an alien perceiving physical matter for the very first time, deliberately suspending top-down semantic labels.",
        reflectionPrompt: "If your conscious experience is a controlled hallucination, how can you curate the information environment that feeds your brain's generative priors?",
        checklistTasks: [
          "Complete Week 4 Knowledge Check Self-Test",
          "Review all Week 4 active recall flashcards",
          "Mark Week 4 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "According to hierarchical predictive coding in computational neuroscience, what information is transmitted UPWARD through the ascending sensory neural pathways?",
      options: [
        "A complete, high-resolution photographic rendering of the visual field.",
        "Direct commands to the motor neurons in the spinal cord.",
        "Only the residual prediction error: the difference between top-down generative predictions and raw sensory signals.",
        "Unfiltered electrical noise that is discarded by the thalamus."
      ],
      correctIndex: 2,
      explanation: "To preserve scarce metabolic energy and bandwidth, the cortex projects generative predictions downward and transmits only the unpredicted error signal upward to recalibrate internal models."
    }
  },
  {
    week: 5,
    title: "Social Psychology, Persuasion & Group Dynamics",
    subtitle: "Conformity, Pluralistic Ignorance, and The Architecture of Influence",
    primaryDiscipline: "Social Psychology",
    weeklyObjective: "Dissect the social dynamics of belief: Asch conformity experiments, pluralistic ignorance in crises, and modern value-affirming rhetoric.",
    prerequisites: ["Week 1: Dual-Process Foundations"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "The Asch Conformity Experiments & Social Proof",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 35,
        articleSlug: "the-bystander-effect-re-examined",
        articleTitle: "The Bystander Effect Re-Examined: Lab Artifacts vs Real CCTV",
        objective: "Understand how group consensus alters individual judgment and creates false social consensus.",
        guidedQuestions: [
          "Why did 75% of subjects in Solomon Asch's experiments conform to an obviously incorrect line-length judgment at least once?",
          "What is the difference between normative social influence (craving belonging) and informational social influence (doubting your own senses)?",
          "Why does having a single dissenter in the room reduce group conformity by over 80%?"
        ],
        practicalExercise: "In a meeting or conversation this week, notice if everyone nods in agreement with an ambiguous statement. Politely ask a clarifying question that breaks the false consensus.",
        reflectionPrompt: "When have you withheld a valid objection in a meeting or social circle simply because you didn't want to be perceived as difficult?",
        checklistTasks: [
          "Read Asch conformity paradigms analysis",
          "Review the power of a single dissenting voice",
          "Complete flashcards on Social Proof & Conformity"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Tribal Cleavages",
        sessionTitle: "Identity-Protective Cognition & Ideological Echo Chambers",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 40,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Analyze why online communication algorithms and tribal echo chambers radicalize belief and polarize societies.",
        guidedQuestions: [
          "How do social media recommendation algorithms exploit negative emotional arousal to drive engagement?",
          "Why do communities punish moderate, nuanced thinkers more harshly than extreme partisans?",
          "What makes in-group loyalty a stronger motivator than abstract empirical truth?"
        ],
        practicalExercise: "Intentionally subscribe to 2 high-quality thinkers from an ideological perspective that frustrates you. Read their work with genuine curiosity for 15 minutes.",
        reflectionPrompt: "Which of your beliefs would cause your closest friends to ostracize you if you were to change your mind?",
        checklistTasks: [
          "Read echo chamber epistemic dynamics treatise",
          "Complete active recall questions on Tribal Epistemology",
          "Draft reflection on social belonging costs"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Emergency Interventions",
        sessionTitle: "Overcoming Collective Paralysis in Operational Crises",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 35,
        articleSlug: "the-bystander-effect-re-examined",
        articleTitle: "The Bystander Effect Re-Examined: Lab Artifacts vs Real CCTV",
        objective: "Apply insights from naturalistic CCTV bystander studies to organizational emergency response and incident command.",
        guidedQuestions: [
          "Why do incidents stall in large organization Slack channels where 50 engineers are watching but nobody takes action?",
          "How does designating a single Directly Responsible Individual (DRI) cut through ambiguity and dissolve pluralistic ignorance?",
          "What communication scripts immediately clarify crisis ownership?"
        ],
        practicalExercise: "Review your team's on-call or incident response protocols. Verify that every critical failure scenario has an explicitly designated single DRI.",
        reflectionPrompt: "Have you ever observed an escalating problem at work and assumed 'someone else is surely handling this'?",
        checklistTasks: [
          "Read DRI protocol design notes",
          "Audit a team incident response workflow",
          "Complete flashcards on DRI & Diffusion of Responsibility"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Persuasion & Rhetoric",
        sessionTitle: "Value-Affirming Evidence Framing",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Master the art of communicating counter-attitudinal empirical findings without triggering defensive identity backfires.",
        guidedQuestions: [
          "Why does presenting raw statistical evidence to an entrenched ideological opponent often harden their stance (the backfire effect)?",
          "How can environmental or scientific policies be framed in terms of conservative values (national security, market efficiency, stewardship)?",
          "What is moral reframing, and why does it succeed where factual debate fails?"
        ],
        practicalExercise: "Take a controversial policy recommendation you support. Reframe the argument entirely using the core moral vocabulary of someone who opposes it.",
        reflectionPrompt: "When you argue with people, is your goal to persuade them of the truth, or is your goal to demonstrate your own intellectual and moral superiority?",
        checklistTasks: [
          "Read moral reframing experimental literature",
          "Draft a value-affirming message in your notes",
          "Complete diagnostic check on persuasive framing"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Architecture of Civil Discourse",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Integrate conformity mitigation, DRI incident response, and value-affirming rhetoric into an actionable personal communications guide.",
        guidedQuestions: [
          "How can a thinker remain socially connected to their community while maintaining fiercely independent epistemic standards?",
          "What institutional habits encourage fruitful disagreement rather than performative consensus?",
          "How does epistemic humility disarm defensiveness in high-stakes negotiations?"
        ],
        practicalExercise: "In your next disagreement, state: 'Before I respond, let me make sure I understand your position accurately,' and summarize their view until they confirm: 'Yes, that is exactly what I mean.'",
        reflectionPrompt: "Can you cultivate the habit of listening to understand rather than listening to construct your rebuttal?",
        checklistTasks: [
          "Complete Week 5 Knowledge Check Self-Test",
          "Review all Week 5 active recall flashcards",
          "Mark Week 5 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "What is the most effective rhetorical strategy for communicating disconfirming scientific evidence to an audience that views the finding as ideologically threatening?",
      options: [
        "Publicly mocking their educational deficiencies and lack of scientific credentials.",
        "Presenting 50 additional charts with statistical p-values under p < 0.001.",
        "Decoupling the scientific recommendation from cultural tribal markers and reframing the insight within the audience's foundational moral values.",
        "Threatening legal regulatory penalties if they fail to accept the consensus."
      ],
      correctIndex: 2,
      explanation: "Dan Kahan and Matthew Feinberg demonstrated that moral reframing eliminates identity threat, allowing individuals to evaluate empirical evidence without triggering identity-protective defense mechanisms."
    }
  },
  {
    week: 6,
    title: "Formal Logic, Fallacy Detection & Argument Mapping",
    subtitle: "Deductive Validity, Structural Defects, and Dialectical Hygiene",
    primaryDiscipline: "Critical Thinking & Logic",
    weeklyObjective: "Master formal syllogistic validity, diagnose informal deceptive fallacies, and build modular argument maps to inspect complex claims.",
    prerequisites: ["Week 2: Epistemic Demarcation"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Deductive Validity vs Inductive Cogency",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 40,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Understand the strict structural difference between validity (if premises are true, conclusion MUST be true) and soundness (valid + true premises).",
        guidedQuestions: [
          "Why can an argument be 100% logically valid even if every single premise in it is completely false?",
          "What is the difference between Modus Ponens (affirming the antecedent) and the formal fallacy of Affirming the Consequent?",
          "Why does inductive reasoning always carry a degree of probabilistic uncertainty?"
        ],
        practicalExercise: "Write out a valid deductive syllogism with false premises, and an invalid syllogism with true premises and a true conclusion. Notice the distinction.",
        reflectionPrompt: "Do you ever accept an argument merely because you like the final conclusion, even when the reasoning leading up to it is defective?",
        checklistTasks: [
          "Read deductive validity & soundness formal definitions",
          "Complete syllogistic logic diagram exercises",
          "Save notes on formal fallacies"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Informal Fallacies",
        sessionTitle: "Taxonomy of Deceptive Informal Fallacies",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Diagnose Ad Hominem, Straw Man, False Dilemma, Begging the Question, and Equivocation in modern media discourse.",
        guidedQuestions: [
          "Why does attacking an opponent's motives (Circumstantial Ad Hominem) fail to refute the logical validity of their premise?",
          "How does a Straw Man distort a complex thesis into an absurd, easily defeated caricature?",
          "Why is a False Dilemma ('Either you support our exact bill or you hate our country') the most common weapon in populist rhetoric?"
        ],
        practicalExercise: "Pick a debate transcript or televised news segment. Identify at least 3 informal fallacies deployed by the speakers within 10 minutes.",
        reflectionPrompt: "Which logical fallacy are you personally most guilty of using when you are angry during an interpersonal argument?",
        checklistTasks: [
          "Review Fallacy Taxonomy cheatsheet in library",
          "Log 3 real-world fallacy examples in your notes",
          "Complete active recall flashcards"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Argument Mapping",
        sessionTitle: "Visual Argument Decomposition & Toulmin Models",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 40,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Diagram arguments into Claims, Grounds, Warrants, Backing, Qualifiers, and Rebuttals using Stephen Toulmin's framework.",
        guidedQuestions: [
          "What is an unstated warrant in an argument, and why is the warrant usually where the fatal flaw hides?",
          "How does visual argument mapping force ambiguous rhetoric into crisp, testable propositional nodes?",
          "What is the difference between a co-premise (both needed together) and an independent reason?"
        ],
        practicalExercise: "Take a 500-word opinion piece. Map it into a diagram: highlight the Main Claim, identify the 3 supporting grounds, and unearth the unspoken warrant.",
        reflectionPrompt: "When analyzing complex proposals, do you read the text linearly, or do you reconstruct its underlying structural skeleton?",
        checklistTasks: [
          "Read Toulmin model tutorial in library",
          "Diagram a 500-word editorial into an argument map",
          "Save map image or outline in research notes"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Epistemic Parsimony",
        sessionTitle: "Ad-Hoc Hypotheses & Explanatory Dilution",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Examine how unfalsifiable models invent endless auxiliary epicycles to save failing theories from refutation.",
        guidedQuestions: [
          "How did Ptolemaic astronomers invent epicycles to defend geocentrism against anomalous planetary motions?",
          "Why does adding ad-hoc auxiliary assumptions dilute the Bayesian posterior probability of a model?",
          "What is the difference between a legitimate theoretical refinement and an ad-hoc excuse?"
        ],
        practicalExercise: "Identify an excuse you made recently when something didn't go as planned. Did you invoke an ad-hoc auxiliary assumption rather than admitting your original plan was flawed?",
        reflectionPrompt: "How can you tell the difference between holding an opinion with conviction vs stubbornly refusing to acknowledge decisive counter-evidence?",
        checklistTasks: [
          "Read Ptolemaic epicycles case study",
          "Complete active recall questions on Ad-Hoc Hypotheses",
          "Save notes on Bayesian model penalty"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "Dialectical Hygiene & Intellectual Steelmanning",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Master Daniel Dennett's 4 Rules for Critical Commentary to achieve highest-grade intellectual integrity.",
        guidedQuestions: [
          "What are Daniel Dennett's 4 steps: re-express position clearly, list points of agreement, mention what you learned, before offering rebuttal?",
          "Why does steelmanning your opponent make your own thinking sharper and more resilient?",
          "How does an intellectual thinker separate the truth of a claim from the unpleasant personality of the person stating it?"
        ],
        practicalExercise: "Practice Dennett's 4 rules in a discussion with a friend or colleague on a contentious topic. Observe their surprise when you accurately summarize their view.",
        reflectionPrompt: "Are you willing to learn a profound truth even if it is spoken by someone you deeply dislike?",
        checklistTasks: [
          "Complete Week 6 Knowledge Check Self-Test",
          "Review all Week 6 active recall flashcards",
          "Mark Week 6 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "Which of the following describes the formal logical fallacy of 'Affirming the Consequent'?",
      options: [
        "If P then Q; Not P; Therefore not Q.",
        "If P then Q; Q; Therefore P.",
        "If P then Q; P; Therefore Q.",
        "P is true because an authority figure claimed P is true."
      ],
      correctIndex: 1,
      explanation: "Affirming the Consequent assumes that because the outcome Q occurred, the specific antecedent P must have caused it (e.g. 'If it rains, the street is wet. The street is wet, therefore it rained' — ignoring street cleaners or broken hydrants)."
    }
  },
  {
    week: 7,
    title: "Axiomatic Reasoning & Problem Deconstruction",
    subtitle: "Descartes' Method, Elon Musk's First-Principles, and Root Cause Analysis",
    primaryDiscipline: "Critical Thinking & Logic",
    weeklyObjective: "Deconstruct complex business, engineering, and philosophical problems to irreducible axioms, eliminating legacy conventions and unlocking 10x innovations.",
    prerequisites: ["Week 6: Formal Logic & Argument Mapping"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Descartes' Hyperbolic Doubt & The Search for Axioms",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 40,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Understand René Descartes' 1641 Meditations and how stripping away all dubitable beliefs leaves foundational bedrock axioms.",
        guidedQuestions: [
          "Why did Descartes resolve to demolish all his prior beliefs and build upward from 'Cogito, ergo sum'?",
          "What is an axiom in mathematics and philosophy, and why cannot an axiom be derived from anything simpler?",
          "How do legacy engineering habits function as unquestioned dogmas in modern industries?"
        ],
        practicalExercise: "Take a stubborn bottleneck in your life. Write down every single assumption you have about why that bottleneck exists. Ask: 'Is this physically impossible to change, or is it merely conventional?'",
        reflectionPrompt: "What assumptions in your field are people accepting simply because 'that is the way we have always done things'?",
        checklistTasks: [
          "Read Cartesian doubt & Aristotelian first principles treatise",
          "Complete list of 5 unspoken project assumptions",
          "Save notes in personal knowledge library"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Industrial Breakthroughs",
        sessionTitle: "SpaceX, Tesla & Raw Material Decomposition",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Analyze how Elon Musk reduced rocket manufacturing costs by 90% by evaluating raw material commodity costs rather than buying finished aerospace modules.",
        guidedQuestions: [
          "How did calculating the price of carbon fiber, aerospace-grade aluminum, copper, and titanium reveal that rockets cost only 2% of aerospace contractor bids?",
          "Why does reasoning by analogy create incremental 10% cost reductions while first principles unlocks 90% cost reductions?",
          "What are the psychological obstacles that make managers default to analogy?"
        ],
        practicalExercise: "Pick a product, software feature, or service you pay for. Calculate the raw underlying compute, hosting, or material costs vs the retail price. Where is the spread?",
        reflectionPrompt: "Where in your work are you accepting vendor markups or legacy timelines without verifying the physical limits?",
        checklistTasks: [
          "Read SpaceX & Tesla raw materials case study",
          "Perform a Bill-of-Materials cost decomposition",
          "Complete active recall questions"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Socratic Deconstruction",
        sessionTitle: "The Socratic Method of Systematic Questioning",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Master the 6 categories of Socratic questioning: conceptual clarification, assumption probing, rationale inspection, viewpoint exploration, consequence analysis, and meta-questioning.",
        guidedQuestions: [
          "How does Socrates force his interlocutors to discover the contradictions in their own definitions?",
          "What is the power of asking: 'What would happen if the exact opposite of this assumption were true?'",
          "How does Socratic questioning prevent premature closure during strategy sessions?"
        ],
        practicalExercise: "Select a colleague or friend. Use Socratic questioning for 10 minutes to help them examine an assumption without ever asserting your own opinion.",
        reflectionPrompt: "Do you have the patience to ask probing questions rather than rushing to provide immediate answers?",
        checklistTasks: [
          "Review 6 categories of Socratic questions cheatsheet",
          "Conduct a 10-minute Socratic dialogue",
          "Save dialogue notes in personal library"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Operational Diagnostics",
        sessionTitle: "Root Cause Analysis (RCA) & The 5 Whys",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Connect Taiichi Ohno's Toyota Production System '5 Whys' protocol with philosophical root cause diagnostics.",
        guidedQuestions: [
          "Why do surface-level RCA investigations mistakenly blame human error instead of systemic architecture?",
          "How does asking 'Why' 5 times peel away symptoms to reach irreducible operational causes?",
          "How does Occam's razor protect RCA from becoming paralyzed by irrelevant coincidences?"
        ],
        practicalExercise: "Take a recent mistake or failure in your organization. Conduct a structured 5-Whys analysis until you reach an architectural or structural failure.",
        reflectionPrompt: "When an error occurs, do you look for someone to blame, or do you look for the flaw in the system that made the error inevitable?",
        checklistTasks: [
          "Read Toyota 5-Whys case studies in library",
          "Conduct a 5-Whys RCA on a real operational incident",
          "Complete diagnostic check"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The First-Principles Execution Engine",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Unify Cartesian doubt, raw material decomposition, and 5-Whys diagnostics into a personal engineering playbook.",
        guidedQuestions: [
          "When should an executive use analogical thinking (fast routines) vs first-principles thinking (high-stakes architecture)?",
          "How do you maintain team morale when systematically questioning cherished legacy processes?",
          "What are the metrics for determining when you have reached a true irreducible axiom?"
        ],
        practicalExercise: "Draft a 1-page First-Principles Strategy brief for your top business or personal goal for the upcoming quarter.",
        reflectionPrompt: "What breakthrough would become possible in your life if you stopped accepting other people's limitations as your own?",
        checklistTasks: [
          "Complete Week 7 Knowledge Check Self-Test",
          "Review all Week 7 active recall flashcards",
          "Mark Week 7 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "In first-principles reasoning, what is the primary operational flaw of reasoning by analogy?",
      options: [
        "It requires expensive mathematical software to execute.",
        "It builds upon inherited historical conventions and legacy constraints that may no longer be physically or economically necessary, limiting solutions to incremental iterations.",
        "It is rejected by modern corporate executives.",
        "It is always slower than reasoning from axioms."
      ],
      correctIndex: 1,
      explanation: "Reasoning by analogy copies existing practices with minor tweaks ('how everyone else does it'). First principles strips away legacy conventions to identify physical truths, enabling 10x breakthrough innovations."
    }
  },
  {
    week: 8,
    title: "Advanced Behavioral Economics & Risk Domains",
    subtitle: "Endowment Effects, Status-Quo Traps, and Choice Architecture",
    primaryDiscipline: "Behavioral Economics",
    weeklyObjective: "Examine Richard Thaler's Endowment Effect, status-quo preservation, and Nudge theory choice architecture for institutional debiasing.",
    prerequisites: ["Week 3: Prospect Theory & Risk Asymmetry"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "The Endowment Effect & Mug Experiments",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Understand Richard Thaler's Cornell coffee mug experiments proving that simply owning an object roughly doubles its perceived valuation.",
        guidedQuestions: [
          "Why did students randomly assigned a university mug demand $7.12 to sell it, while students without a mug were only willing to pay $2.87 to buy it?",
          "How does ownership fuse an object or idea with personal identity, triggering loss aversion upon relinquishment?",
          "How does the endowment effect distort home sales, asset pricing, and intellectual debate?"
        ],
        practicalExercise: "Identify 3 physical objects or software tools you own that you would not purchase today at their current market price, but refuse to sell or discard.",
        reflectionPrompt: "Do you overvalue your own ideas simply because you were the person who thought of them?",
        checklistTasks: [
          "Read Thaler's Endowment Effect experiments treatise",
          "Complete flashcards on Willingness to Accept vs Willingness to Pay",
          "Save notes on ownership attachment"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Status Quo Inertia",
        sessionTitle: "Status-Quo Bias & Default Option Architecture",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Investigate why organ donation rates differ by 70%+ between countries based solely on whether the policy is opt-in or opt-out.",
        guidedQuestions: [
          "Why do people view any departure from the current status quo as a potential loss rather than an opportunity for gain?",
          "How do software companies exploit default settings to manipulate user privacy and retention?",
          "What makes setting the default option the single most consequential design decision in product and public policy?"
        ],
        practicalExercise: "Audit the default settings on your phone, laptop, and key software apps. Change at least 3 defaults to protect your focus and time.",
        reflectionPrompt: "Which of your daily routines are you continuing simply because they are the default path of least resistance?",
        checklistTasks: [
          "Read European organ donation default analysis",
          "Audit and reconfigure personal device defaults",
          "Complete active recall questions"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Choice Architecture",
        sessionTitle: "Nudge Theory & Libertarian Paternalism",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 40,
        articleSlug: "heuristics-biases-and-bounded-rationality",
        articleTitle: "Bounded Rationality, Heuristics & Decision Under Uncertainty",
        objective: "Examine Thaler and Sunstein's Nudge framework: designing choice environments that make beneficial decisions effortless without forbidding any option.",
        guidedQuestions: [
          "What is choice architecture, and why is it impossible to present options in a completely neutral manner?",
          "How did 'Save More Tomorrow' automated escalation increase retirement savings rates by 300%?",
          "What ethical standards distinguish a pro-social nudge from predatory dark patterns?"
        ],
        practicalExercise: "Redesign an interface, form, or physical space in your home/office to nudge a desirable behavior (e.g. putting fruit on the counter, water bottle on desk).",
        reflectionPrompt: "How can you design your physical and digital environment so that the productive choice is the default choice?",
        checklistTasks: [
          "Read Save More Tomorrow case study",
          "Implement one physical environment nudge",
          "Save notes on dark patterns vs nudges"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Sunk Costs in Leadership",
        sessionTitle: "Escalation of Commitment in Corporate Governance",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Analyze why leadership teams continue funding doomed mega-projects to avoid acknowledging initial analytical blunders.",
        guidedQuestions: [
          "Why is a CEO who launched a failed project psychologically incapable of cancelling it, requiring a new CEO to take the write-down?",
          "How do board governance committees use 'fresh eyes' reviews to separate capital allocation from personal reputation?",
          "What is the mathematical threshold where incremental investment produces zero marginal expected return?"
        ],
        practicalExercise: "Write a 1-page Memo to your future self recommending the exact milestone metrics that would trigger cancelling your current top project.",
        reflectionPrompt: "What project are you continuing to fund with your precious time solely because quitting would feel like admitting defeat?",
        checklistTasks: [
          "Read corporate mega-project escalation case studies",
          "Draft milestone-based cancellation criteria",
          "Complete diagnostic check"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Master Behavioral Strategist",
        discipline: "Behavioral Economics",
        disciplineColor: "#ee9976",
        disciplineTextColor: "#330d00",
        durationMins: 35,
        articleSlug: "loss-aversion-and-prospect-theory",
        articleTitle: "Loss Aversion & Prospect Theory: The Asymmetry of Risk",
        objective: "Combine endowment effect awareness, default option mastery, and sunk-cost pre-commitments into a behavioral decision playbook.",
        guidedQuestions: [
          "How can an executive design institutional processes that neutralize loss aversion during corporate reorganizations?",
          "How do you separate analytical merit from identity endowment when evaluating team proposals?",
          "What makes automated rules superior to discretionary willpower in volatile markets?"
        ],
        practicalExercise: "Set an automated rule (e.g. trailing stop loss, automatic budget review trigger) to govern a recurring high-stakes decision.",
        reflectionPrompt: "Can you embrace the wisdom that abandoning a bad idea quickly is a sign of superior intelligence, not failure?",
        checklistTasks: [
          "Complete Week 8 Knowledge Check Self-Test",
          "Review all Week 8 active recall flashcards",
          "Mark Week 8 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "What is the core psychological mechanism behind Richard Thaler's Endowment Effect?",
      options: [
        "People believe that all manufactured goods appreciate in value over time.",
        "Merely owning an object causes individuals to incorporate it into their reference point, making selling it feel like an emotional loss that requires ~2x higher compensation to bear.",
        "People have irrational emotional attachments to ceramic coffee mugs.",
        "The endowment effect only occurs in laboratory settings with undergraduate psychology students."
      ],
      correctIndex: 1,
      explanation: "Due to loss aversion and reference-dependence, relinquishing something already possessed is coded as a loss, while acquiring it is coded as a gain. Because losses loom larger than gains, sellers demand roughly double the price buyers are willing to pay."
    }
  },
  {
    week: 9,
    title: "Consciousness, Active Inference & Interoception",
    subtitle: "Karl Friston's Math, Anil Seth's Selfhood, and The Boundaries of Mind",
    primaryDiscipline: "Neuroscience & Philosophy of Mind",
    weeklyObjective: "Deepen understanding of the computational brain: Markov blankets, interoceptive predictive inference, and the evolutionary origins of conscious selfhood.",
    prerequisites: ["Week 4: The Bayesian Brain"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Markov Blankets & The Boundaries of Organisms",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 40,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Explore Karl Friston's mathematical concept of Markov blankets: statistical partitions separating an agent's internal states from the external world.",
        guidedQuestions: [
          "How does a cell membrane, an animal skin, and a cognitive mind function as a Markov blanket?",
          "Why can an internal state only infer the external world through sensory states and action states?",
          "How does the Free Energy Principle apply to both a single-celled paramecium and an artificial neural network?"
        ],
        practicalExercise: "Draw a diagram of your personal cognitive Markov blanket: identify your sensory inputs, your internal models, and your active motor outputs.",
        reflectionPrompt: "How clearly do you distinguish between what is happening in the external physical world vs your internal statistical model of it?",
        checklistTasks: [
          "Read Markov blanket mathematical definition",
          "Complete diagram of internal/external states",
          "Save notes on statistical inference boundary"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Embodied Selfhood",
        sessionTitle: "The Beast Machine: Interoception & Conscious Being",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 35,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Examine Anil Seth's thesis: conscious selfhood is not an immutable ethereal soul, but a generative prediction regulating physiological survival.",
        guidedQuestions: [
          "Why did René Descartes view the body as a beast machine, and how does modern neuroscience integrate the mind into that machine?",
          "How does interoceptive inference explain phantom limb pain, chronic pain syndromes, and panic attacks?",
          "What is the rubber hand illusion, and what does it prove about how plastic the brain's body schema is?"
        ],
        practicalExercise: "Perform a 5-minute focused interoceptive meditation: count your heartbeats without taking your pulse, tuning into internal visceral sensations.",
        reflectionPrompt: "Do you treat your body as an inconvenient vehicle carrying your brain, or do you recognize your thoughts as bodily predictive outputs?",
        checklistTasks: [
          "Read Anil Seth 'Being You' summary in library",
          "Complete 5-minute interoceptive focus drill",
          "Complete flashcards on Body Schema & Allostasis"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Computational Psychiatry",
        sessionTitle: "Psychopathology as Precision-Weighting Disorders",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 40,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Understand how autism, schizophrenia, and depression are modeled in computational neuroscience as imbalances in prior precision weights.",
        guidedQuestions: [
          "How does assigning hyper-precision to top-down priors create hallucinations that resist contradictory sensory evidence?",
          "Why does assigning hypo-precision to top-down priors flood an autistic individual with overwhelming, uncompressed sensory detail?",
          "How does chronic depression reflect a locked, hyper-precise prior that 'nothing I do will alleviate metabolic exhaustion'?"
        ],
        practicalExercise: "Notice when you get stuck in a mental loop. Analyze it as an overly precise prior that is refusing to accept updating feedback.",
        reflectionPrompt: "What recurring negative belief about yourself has become a hyper-precise prior that discounts all positive evidence?",
        checklistTasks: [
          "Read computational psychiatry case analyses",
          "Complete active recall questions on Precision Weighting",
          "Save notes on clinical applications"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Extended Mind",
        sessionTitle: "Andy Clark's Extended Mind & Cognitive Scaffolding",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Analyze Andy Clark and David Chalmers' Extended Mind Thesis: notebooks, smartphones, and institutional tools are literal physical components of the human mind.",
        guidedQuestions: [
          "Why is Otto's notebook (which he uses to remember directions) computationally identical to Inga's biological hippocampus?",
          "What criteria determine whether an external tool is part of your extended cognitive system (constant availability, automatic endorsement)?",
          "How does offloading memory and computation to external artifacts free biological cortex for higher-order synthesis?"
        ],
        practicalExercise: "Audit your personal knowledge management setup (MindAtlas, notes, calendars). Treat it not as an external chore, but as an extension of your cerebral cortex.",
        reflectionPrompt: "How can you better design your external tools so they scaffold your focus rather than fragmenting your attention?",
        checklistTasks: [
          "Read Clark & Chalmers (1998) 'The Extended Mind'",
          "Organize personal knowledge library folders",
          "Complete diagnostic check"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Integrated Epistemic Organism",
        discipline: "Neuroscience",
        disciplineColor: "#97b5f6",
        disciplineTextColor: "#051838",
        durationMins: 35,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Synthesize Markov blankets, interoceptive allostasis, and extended cognition into a complete philosophy of embodied human flourishing.",
        guidedQuestions: [
          "How does understanding the extended mind change personal responsibility for information diet and digital environments?",
          "How can an intellectual thinker systematically recalibrate their precision weights to remain curious and open to surprise?",
          "What is the ultimate relationship between biological entropy reduction and the pursuit of objective truth?"
        ],
        practicalExercise: "Establish an evening digital curfew: disconnect your biological cortex from algorithmic dopamine loops 60 minutes before sleep.",
        reflectionPrompt: "If your mind extends into the tools and people you interact with, who and what are you choosing to become part of your mind?",
        checklistTasks: [
          "Complete Week 9 Knowledge Check Self-Test",
          "Review all Week 9 active recall flashcards",
          "Mark Week 9 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "In Karl Friston's Free Energy Principle, what is a 'Markov Blanket'?",
      options: [
        "A heavy sensory deprivation quilt used to treat anxiety.",
        "A statistical boundary that separates the internal states of an organism from external environmental states, mediated exclusively through sensory inputs and active motor outputs.",
        "A mathematical algorithm used solely in quantum computing.",
        "A neurological condition affecting the visual cortex."
      ],
      correctIndex: 1,
      explanation: "A Markov blanket defines the statistical boundary of an agent. It segregates internal states from external states such that internal states can only infer and influence the external world via sensory receptors and active inference actions."
    }
  },
  {
    week: 10,
    title: "Tribal Epistemology, Polarization & Ideology",
    subtitle: "Dan Kahan's Cultural Cognition, Moral Foundations, and Adversarial Collaboration",
    primaryDiscipline: "Social Psychology & Epistemology",
    weeklyObjective: "Dissect cultural cognition, political polarization mechanics, Jonathan Haidt's Moral Foundations Theory, and Kahneman's protocol for adversarial collaboration.",
    prerequisites: ["Week 5: Social Psychology & Group Dynamics"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Kahan's Cultural Cognition & The Tragedy of The Commons",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 40,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Analyze why individuals act as rational agents by protecting their standing in cultural tribes, even when it produces collective epistemic catastrophe.",
        guidedQuestions: [
          "Why is an individual voter or consumer insulated from the costs of holding a false factual belief, while facing immediate ostracism for holding an unpopular truth?",
          "How does cultural cognition divide people into Hierarchical vs Egalitarian and Individualist vs Communitarian worldviews?",
          "Why does teaching more mathematics and science fail to bridge political divides on climate change, gun control, or public health?"
        ],
        practicalExercise: "Take the Cultural Cognition Worldview questionnaire. Identify whether you lean Hierarchical/Egalitarian or Individualist/Communitarian.",
        reflectionPrompt: "When has holding an accurate fact made you feel uncomfortable in your social circle?",
        checklistTasks: [
          "Read Kahan's Tragedy of the Epistemic Commons treatise",
          "Complete Cultural Cognition diagnostic",
          "Save notes on rational ignorance vs identity protection"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Moral Intuitions",
        sessionTitle: "Jonathan Haidt's Moral Foundations Theory",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Understand the 6 moral taste buds: Care/Harm, Fairness/Cheating, Loyalty/Betrayal, Authority/Subversion, Sanctity/Degradation, and Liberty/Oppression.",
        guidedQuestions: [
          "Why do progressives rely predominantly on Care and Fairness, while conservatives distribute moral evaluations across all 6 foundations?",
          "How do differing moral taste buds cause political rivals to view each other not just as mistaken, but as fundamentally evil?",
          "How can understanding all 6 foundations enable respectful, effective communication across divides?"
        ],
        practicalExercise: "Take an issue you care about. Write out how it triggers Sanctity/Degradation or Loyalty/Betrayal in those who take the opposite position.",
        reflectionPrompt: "Do you automatically assume that people with different moral priorities are acting in bad faith?",
        checklistTasks: [
          "Read Haidt's 'The Righteous Mind' summary in library",
          "Map the 6 moral foundations to a current debate",
          "Complete flashcards on Moral Foundations Theory"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Scientific Verification",
        sessionTitle: "Adversarial Collaboration: Kahneman's Gold Standard",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 40,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Master Daniel Kahneman's protocol for intellectual rivals to jointly design and pre-register empirical experiments to test competing hypotheses.",
        guidedQuestions: [
          "Why does standard academic debate resemble trench warfare where neither side ever concedes error?",
          "What are the ground rules of adversarial collaboration: agreed experimental design, joint pre-registration, neutral adjudicator, shared co-authorship?",
          "How did Kahneman and Gary Klein collaborate to investigate when expert intuition can be trusted vs when it is illusory?"
        ],
        practicalExercise: "Identify a disagreement with a co-worker or friend. Agree on a specific real-world test or observation that you both agree will settle the issue.",
        reflectionPrompt: "Are you willing to engage in a formal adversarial collaboration where you risk having your pet hypothesis refuted in public?",
        checklistTasks: [
          "Read Kahneman & Klein adversarial collaboration paper",
          "Formulate an adversarial protocol for a contentious topic",
          "Save notes on institutional debiasing"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Polarization Architecture",
        sessionTitle: "Epistemic Bubbles vs Echo Chambers",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Explore C. Thi Nguyen's crucial distinction: an epistemic bubble is a network where opposing voices are omitted; an echo chamber is a community where outside voices are actively discredited.",
        guidedQuestions: [
          "Why does exposing an echo chamber member to outside facts backfire, because the echo chamber pre-programmed them to view outside facts as proof of a conspiracy?",
          "How do cults and extremist political movements cultivate epistemic isolation through trust manipulation?",
          "What is required to rescue an individual from an echo chamber: social trust rebuild vs aggressive factual confrontation?"
        ],
        practicalExercise: "Audit your news sources. Are you in a simple epistemic bubble (which can be fixed by following new voices) or an echo chamber (which has taught you to distrust outsiders)?",
        reflectionPrompt: "Have you ever discredited an accurate factual report simply because it came from a news outlet you dislike?",
        checklistTasks: [
          "Read C. Thi Nguyen's 'Echo Chambers and Epistemic Bubbles'",
          "Audit personal trust networks in your notes",
          "Complete diagnostic check"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Post-Partisan Epistemologist",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "motivated-reasoning-and-identity-protective-cognition",
        articleTitle: "Motivated Reasoning & Identity-Protective Cognition",
        objective: "Integrate cultural cognition awareness, moral foundation reframing, and adversarial collaboration into a lifetime epistemic practice.",
        guidedQuestions: [
          "How does an intellectual thinker maintain personal warmth and friendship with people across the entire political spectrum?",
          "What are the indicators that a public issue has become hyper-sacralized and resistant to empirical evidence?",
          "How does cultivating high epistemic standards create genuine independence from tribal orthodoxies?"
        ],
        practicalExercise: "Commit to publicizing one instance where you changed your mind on an important subject during the past 2 years.",
        reflectionPrompt: "What belief are you currently holding that you know you would abandon if you were not terrified of the social consequences?",
        checklistTasks: [
          "Complete Week 10 Knowledge Check Self-Test",
          "Review all Week 10 active recall flashcards",
          "Mark Week 10 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "According to philosopher C. Thi Nguyen, what is the critical difference between an 'Epistemic Bubble' and an 'Echo Chamber'?",
      options: [
        "Epistemic bubbles occur only online; echo chambers occur only offline.",
        "In an epistemic bubble, other voices are merely left out by omission (easily popped by exposure to new data); in an echo chamber, outside voices are systematically discredited in advance, such that hearing outside criticism reinforces the insider doctrine.",
        "There is no conceptual difference between the two terms.",
        "Echo chambers are always religious, while epistemic bubbles are political."
      ],
      correctIndex: 1,
      explanation: "Nguyen showed that in an echo chamber, trust is manipulated such that outsiders are classified as malicious or compromised. Consequently, encountering outside contradiction actually reinforces insider belief ('they are trying to deceive us!')."
    }
  },
  {
    week: 11,
    title: "Scientific Replication & Meta-Science",
    subtitle: "Open Science, Pre-Registration, and Epistemic Calibration",
    primaryDiscipline: "Scientific Reasoning & Methodology",
    weeklyObjective: "Inspect the systemic causes of the scientific replication crisis, evaluate statistical power, p-curves, and master the tools of modern meta-science.",
    prerequisites: ["Week 2: Epistemic Demarcation"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "Why Most Published Research Findings Are False",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 40,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Deconstruct John Ioannidis' seminal 2005 paper proving mathematically that small sample sizes, small effect sizes, and researcher flexibility guarantee high false-positive rates.",
        guidedQuestions: [
          "Why does an experiment with statistical power of 0.20 and a p < 0.05 threshold yield more false discoveries than true discoveries in fields with low prior probability?",
          "How does financial conflict of interest and university tenure competition distort scientific literature?",
          "What is the difference between statistical significance (p < 0.05) and practical real-world effect size (Cohen's d)?"
        ],
        practicalExercise: "Examine a published research paper in psychology or medicine. Calculate its statistical power based on sample size and expected effect size.",
        reflectionPrompt: "Do you accept a scientific headline simply because the article uses the phrase 'scientists prove', without checking sample size and replication history?",
        checklistTasks: [
          "Read Ioannidis 2005 seminal PLOS Medicine paper",
          "Complete statistical power calculation exercises",
          "Save notes on effect sizes vs p-values"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Methodological Reforms",
        sessionTitle: "Registered Reports & Results-Blind Peer Review",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 35,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Analyze the revolution of Registered Reports: peer review and journal acceptance BEFORE data collection occurs.",
        guidedQuestions: [
          "How does results-blind peer review eliminate publication bias and file-drawer suppression of null results?",
          "Why do Registered Reports yield null results ~60% of the time, compared to standard journals where null results appear only ~10% of the time?",
          "How does open raw data and open code allow third-party researchers to detect calculation errors and anomalies?"
        ],
        practicalExercise: "Visit the Center for Open Science (cos.io) and inspect an active Registered Report protocol in your field of interest.",
        reflectionPrompt: "In your work, do you evaluate the quality of a decision based on the soundness of the process, or do you commit the outcome bias of judging it purely on whether it succeeded?",
        checklistTasks: [
          "Review Registered Reports format guidelines",
          "Compare null result frequencies across journal types",
          "Complete active recall questions"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Social Science Re-Evaluations",
        sessionTitle: "Re-Examining The Classics: Smoke Rooms & Power Posing",
        discipline: "Social Psychology",
        disciplineColor: "#f095d2",
        disciplineTextColor: "#300323",
        durationMins: 40,
        articleSlug: "the-bystander-effect-re-examined",
        articleTitle: "The Bystander Effect Re-Examined: Lab Artifacts vs Real CCTV",
        objective: "Case studies in scientific self-correction: from power posing and ego depletion to the bystander effect and priming.",
        guidedQuestions: [
          "Why did classic social priming experiments (e.g. reading words related to the elderly making people walk slower) completely fail to replicate?",
          "How did Amy Cuddy's power posing claims unravel under independent high-power replication attempts?",
          "What is the difference between a minor measurement artifact and a fatal conceptual failure in an experimental paradigm?"
        ],
        practicalExercise: "Look up a famous psychological phenomenon you learned in school. Search 'Replication Project [phenomenon]' to check whether it replicated in recent multi-lab studies.",
        reflectionPrompt: "How do you feel when a famous, beloved scientific idea you found inspiring is decisively disproven by rigorous replication?",
        checklistTasks: [
          "Read Open Science Collaboration (2015) replication summary",
          "Audit 2 classic textbook studies for replication status",
          "Save notes in personal knowledge library"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Epistemic Parsimony in AI",
        sessionTitle: "Occam's Razor vs Deep Learning Overfitting",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 35,
        articleSlug: "occams-razor-and-epistemic-parsimony",
        articleTitle: "Occam's Razor & The Principle of Parsimony",
        objective: "Explore the modern frontier of epistemic parsimony: regularization, double descent, and generalization in machine learning architectures.",
        guidedQuestions: [
          "How does an artificial neural network with a billion parameters risk memorizing training noise rather than discovering true underlying laws?",
          "What is L1/L2 regularization and dropout, and how do they function as computational Occam razors?",
          "What is the deep learning paradox of 'double descent' where over-parameterized models unexpectedly generalize well?"
        ],
        practicalExercise: "Examine a predictive model or dashboard you use. Identify whether it is capturing high-signal structural patterns or over-fitting historical noise.",
        reflectionPrompt: "In your thinking, are you memorizing complex edge cases (overfitting), or are you mastering foundational principles that generalize?",
        checklistTasks: [
          "Read Regularization & Occam's Razor technical note",
          "Complete active recall questions on Overfitting",
          "Save notes on AI model validation"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Synthesis & Dialectic",
        sessionTitle: "The Epistemic Immune System",
        discipline: "Scientific Reasoning",
        disciplineColor: "#7cd0c5",
        disciplineTextColor: "#032623",
        durationMins: 35,
        articleSlug: "popperian-falsificationism-and-scientific-demarcation",
        articleTitle: "Popperian Falsificationism & The Demarcation Problem",
        objective: "Synthesize statistical power, pre-registration, and replication literacy into a personal epistemic immune system against misinformation and hype.",
        guidedQuestions: [
          "What are the 5 red flags in an academic press release that indicate unreliable science?",
          "Why is meta-analysis and systematic review of pre-registered trials the gold standard for medical and policy guidance?",
          "How does an educated thinker balance skepticism of bad science with trust in well-replicated institutional consensus?"
        ],
        practicalExercise: "Draft a 10-point checklist for evaluating scientific claims before sharing them or acting upon them in your professional life.",
        reflectionPrompt: "How can you be a passionate champion of empirical science while holding the scientific establishment to the highest methodological standards?",
        checklistTasks: [
          "Complete Week 11 Knowledge Check Self-Test",
          "Review all Week 11 active recall flashcards",
          "Mark Week 11 Capstone Complete"
        ]
      }
    ],
    quiz: {
      question: "In meta-science and scientific reform, why do Registered Reports eliminate publication bias (the file-drawer problem)?",
      options: [
        "Because all Registered Reports are written in open-source Markdown format.",
        "Because the study design, hypotheses, and analytical plan are peer-reviewed and accepted for guaranteed publication BEFORE the data is collected, ensuring null results are published alongside positive results.",
        "Because Registered Reports prohibit the use of statistical hypothesis testing.",
        "Because journals only accept Registered Reports from Nobel Prize laureates."
      ],
      correctIndex: 1,
      explanation: "In Registered Reports, journals commit to publishing the paper regardless of whether the hypothesis is supported or refuted, as long as the pre-registered methodology was followed rigorously, eliminating the incentive to hide null results."
    }
  },
  {
    week: 12,
    title: "Capstone Epistemic Synthesis & Lifelong Mastery",
    subtitle: "Axiomatic Thinking, Bayesian Updating, and The Ever-Growing Library",
    primaryDiscipline: "Interdisciplinary Cognitive Science & Philosophy",
    weeklyObjective: "Unify dual-process heuristics, Popperian falsification, Bayesian predictive processing, loss aversion, and first-principles thinking into a lifetime intellectual operating system.",
    prerequisites: ["Weeks 1–11: Full Foundations Completed"],
    days: [
      {
        day: 1,
        dayLabel: "Day 1: Foundations",
        sessionTitle: "The Grand Cognitive Architecture of Rationality",
        discipline: "Cognitive Science",
        disciplineColor: "#98dcfa",
        disciplineTextColor: "#04222e",
        durationMins: 45,
        articleSlug: "heuristics-biases-and-bounded-rationality",
        articleTitle: "Bounded Rationality, Heuristics & Decision Under Uncertainty",
        objective: "Integrate Keith Stanovich's tri-process theory of mind: autonomous mind (System 1), algorithmic mind (fluid intelligence), and reflective mind (rationality).",
        guidedQuestions: [
          "Why can someone possess an IQ of 150 (high algorithmic capacity) while simultaneously exhibiting extreme irrationality (dysrationalia)?",
          "How does the reflective mind monitor and override erroneous intuitive substitutions?",
          "What mindware (critical mental models) must be acquired to protect against epistemic traps?"
        ],
        practicalExercise: "Review your personal MindAtlas library. Identify the 5 mental models that have created the most significant improvement in your decision quality.",
        reflectionPrompt: "Do you value being perceived as smart (high IQ), or do you value being rational (calibrated beliefs and sound decisions)?",
        checklistTasks: [
          "Read Stanovich's 'What Intelligence Tests Miss' treatise",
          "List your top 5 mental models in your notes",
          "Complete flashcards on Dysrationalia & Mindware"
        ]
      },
      {
        day: 2,
        dayLabel: "Day 2: Epistemic Calibration",
        sessionTitle: "Superforecasting & Probabilistic Updating",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 40,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Master Philip Tetlock's Superforecasting principles: Brier scores, base rate anchoring, and incremental belief updating.",
        guidedQuestions: [
          "Why do elite superforecasters consistently outperform intelligence agency analysts with access to classified data?",
          "What is the difference between a Hedgehog (who views the world through a single big idea) and a Fox (who uses many small perspectives)?",
          "How does tracking Brier scores calibrate subjective confidence to objective probability?"
        ],
        practicalExercise: "Make 3 specific probabilistic predictions about events occurring in the next 30 days (e.g. 'There is a 75% probability that X occurs'). Log your Brier score when outcomes are known.",
        reflectionPrompt: "Are you comfortable assigning numerical probabilities (e.g. 65%) to your beliefs rather than speaking in black-and-white certainties?",
        checklistTasks: [
          "Read Tetlock's Superforecasting methodology summary",
          "Log 3 calibrated predictions in your notes",
          "Complete active recall questions"
        ]
      },
      {
        day: 3,
        dayLabel: "Day 3: Axiomatic Synthesis",
        sessionTitle: "First Principles & Epistemic Humility",
        discipline: "Philosophy",
        disciplineColor: "#e0da7a",
        disciplineTextColor: "#232402",
        durationMins: 40,
        articleSlug: "first-principles-reasoning",
        articleTitle: "First-Principles Thinking & Axiomatic Decomposition",
        objective: "Combine Cartesian foundational reduction with Socratic awareness of one's own limitations to achieve lifelong epistemic humility.",
        guidedQuestions: [
          "Why is true epistemic humility not meekness, but the confident discipline of acknowledging what you do not know?",
          "How does first-principles deconstruction protect against intellectual arrogance?",
          "What makes an intellectual thinker eager to discover anomalies that challenge their worldview?"
        ],
        practicalExercise: "Identify a topic where you held strong opinions without ever having read the foundational literature. Write: 'I do not have a qualified opinion on this topic yet.'",
        reflectionPrompt: "Can you feel genuine pride in updating your beliefs in the face of superior evidence?",
        checklistTasks: [
          "Read Richard Feynman on the virtue of doubt",
          "Draft personal Epistemic Humility pledge",
          "Complete flashcards on Epistemic Calibration"
        ]
      },
      {
        day: 4,
        dayLabel: "Day 4: Personal Knowledge Systems",
        sessionTitle: "The Ever-Growing Human Knowledge Library",
        discipline: "Critical Thinking & Logic",
        disciplineColor: "#8dbd39",
        disciplineTextColor: "#182405",
        durationMins: 35,
        articleSlug: "cognitive-dissonance-and-belief-perseverance",
        articleTitle: "Cognitive Dissonance & the Architecture of Self-Justification",
        objective: "Design a permanent personal architecture for ongoing active recall, spaced repetition, and continuous knowledge synthesis.",
        guidedQuestions: [
          "How does spaced repetition (SM-2 algorithms) permanently imprint foundational concepts into long-term semantic memory?",
          "How does writing synthesized essays and teaching concepts to others cement mastery?",
          "What routines will you establish to continuously explore the MindAtlas library throughout your life?"
        ],
        practicalExercise: "Export your complete MindAtlas personal library notes and reading queue (BibTeX & Markdown) for your permanent personal archive.",
        reflectionPrompt: "How has your perception of human behavior, society, and your own mind transformed over these 12 weeks?",
        checklistTasks: [
          "Export library notes to Markdown & BibTeX",
          "Set recurring weekly spaced repetition review time",
          "Complete diagnostic check"
        ]
      },
      {
        day: 5,
        dayLabel: "Day 5: Capstone Celebration",
        sessionTitle: "The Calibrated Epistemic Master",
        discipline: "Interdisciplinary",
        disciplineColor: "#d5cf66",
        disciplineTextColor: "#232402",
        durationMins: 45,
        articleSlug: "predictive-processing-and-the-bayesian-brain",
        articleTitle: "Predictive Processing & The Free Energy Principle",
        objective: "Complete the Capstone Epistemic Mastery self-assessment and celebrate the permanent graduation of your intellectual faculties.",
        guidedQuestions: [
          "What are the hallmarks of a thinker who has mastered the architecture of human knowledge?",
          "How will you deploy these mental models to improve your decisions, lead teams, and contribute to human flourishing?",
          "What is your next horizon of curiosity and inquiry?"
        ],
        practicalExercise: "Write a 300-word Capstone Synthesis essay reflecting on the intellectual journey from foundational heuristics to epistemic mastery.",
        reflectionPrompt: "How will you use this knowledge to bring more clarity, kindness, and truth to the world?",
        checklistTasks: [
          "Complete Final 12-Week Capstone Self-Test",
          "Review all 12 weeks of active recall flashcards",
          "Mark 12-Week Curriculum 100% Completed!"
        ]
      }
    ],
    quiz: {
      question: "What is the ultimate hallmark of a calibrated, epistemic thinker?",
      options: [
        "Possessing an encyclopedic memory and winning every debate in public.",
        "Never experiencing cognitive dissonance or making heuristic errors.",
        "Actively decoupling personal ego from hypotheses, seeking out disconfirming evidence to falsify pet theories, and celebrating error detection as an exciting update toward objective truth.",
        "Refusing to make any decisions until 100% certainty is achieved."
      ],
      correctIndex: 2,
      explanation: "A calibrated epistemic thinker recognizes that the human brain naturally defaults to self-justification and tribal conformity. By embracing falsification, parsimony, and probabilistic updating, they treat being proven wrong as a triumphant step toward reality."
    }
  }
];
