export interface MentalModel {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  discipline: string; // psychology, cognitive-science, philosophy, logic, behavioral-economics, neuroscience, scientific-reasoning, social-psychology, epistemology
  disciplineLabel: string;
  conceptType: "Cognitive Bias" | "Mental Model" | "Logical Fallacy" | "Scientific Law" | "Philosophical Paradox" | "Heuristic" | "Decision Framework";
  empiricalReplicationPercentage: number;
  replicationPunchline: string;
  illustration: string; // key for Illustrations.tsx
  difficultyLevel: "Foundational" | "Intermediate" | "Advanced";
  readingTimeMins: number;
  tags: string[];
  whyItMatters: string;
  coreMechanism: string;
  everydayExamples: string[];
  commonMisconceptions: {
    misconception: string;
    reality: string;
  }[];
  practicalApplications: string[];
  scientificCitation: {
    title: string;
    author: string;
    year: number;
    journalOrBook: string;
    doi?: string;
  };
}

export const DISCIPLINES = [
  { id: "psychology", label: "Psychology", count: 142, color: "#d5bcfe", strong: "#7057a1", dot: "#654b99", textDark: "#1f1438" },
  { id: "cognitive-science", label: "Cognitive Science", count: 98, color: "#98dcfa", strong: "#007098", dot: "#006886", textDark: "#04222e" },
  { id: "philosophy", label: "Philosophy", count: 116, color: "#e0da7a", strong: "#6f6b04", dot: "#626400", textDark: "#232402" },
  { id: "logic", label: "Critical Thinking & Logic", count: 84, color: "#8dbd39", strong: "#303f17", dot: "#315500", textDark: "#182405" },
  { id: "behavioral-economics", label: "Behavioral Economics", count: 76, color: "#ee9976", strong: "#621a00", dot: "#893106", textDark: "#330d00" },
  { id: "neuroscience", label: "Neuroscience", count: 65, color: "#97b5f6", strong: "#002e70", dot: "#004d96", textDark: "#051838" },
  { id: "scientific-reasoning", label: "Scientific Reasoning", count: 52, color: "#7cd0c5", strong: "#006059", dot: "#006256", textDark: "#032623" },
  { id: "social-psychology", label: "Social Psychology", count: 89, color: "#f095d2", strong: "#8c0267", dot: "#8b1d6f", textDark: "#300323" },
  { id: "epistemology", label: "Epistemology & Ethics", count: 63, color: "#e6b677", strong: "#8c5207", dot: "#764c00", textDark: "#331c02" },
];

export const CONCEPT_TYPES = [
  { id: "cognitive-bias", label: "Cognitive Bias", count: 128 },
  { id: "mental-model", label: "Mental Model", count: 94 },
  { id: "logical-fallacy", label: "Logical Fallacy", count: 62 },
  { id: "scientific-law", label: "Scientific Law", count: 45 },
  { id: "philosophical-paradox", label: "Philosophical Paradox", count: 38 },
  { id: "heuristic", label: "Heuristic", count: 55 },
  { id: "decision-framework", label: "Decision Framework", count: 41 },
];

export const MENTAL_MODELS: MentalModel[] = [
  {
    id: "cognitive-dissonance",
    slug: "cognitive-dissonance-and-belief-perseverance",
    title: "Cognitive Dissonance & Self-Justification",
    subtitle: "How the brain resolves conflicting evidence to preserve psychological coherence.",
    summary: "When reality contradicts deeply held identity beliefs, the human brain expends massive metabolic energy rationalizing evidence rather than updating internal priors.",
    discipline: "psychology",
    disciplineLabel: "Psychology",
    conceptType: "Cognitive Bias",
    empiricalReplicationPercentage: 85,
    replicationPunchline: "Replicated in over 85% of empirical attitude-updating paradigms since 1957.",
    illustration: "cognitive-dissonance",
    difficultyLevel: "Intermediate",
    readingTimeMins: 12,
    tags: ["biases-that-trick", "psychology", "belief-updating", "festinger", "rationalization"],
    whyItMatters: "Without recognizing cognitive dissonance, researchers, investors, and leaders systematically mistake post-hoc rationalizations for objective truth.",
    coreMechanism: "Prediction errors between personal action and internal values produce affective arousal in the anterior insula and anterior cingulate cortex. To dampen this discomfort, the brain modifies subjective valuations instead of admitting error.",
    everydayExamples: [
      "An investor doubles down on a collapsing asset to avoid acknowledging an analytical blunder.",
      "A doctor ignores anomalous symptoms because the initial diagnosis felt certain.",
      "A voter dismisses documented misconduct by their own party while condemning it in opponents."
    ],
    commonMisconceptions: [
      {
        misconception: "Smart people are immune to cognitive dissonance.",
        reality: "High intelligence provides more computational horsepower to construct plausible post-hoc rationalizations."
      },
      {
        misconception: "Simple awareness of dissonance eliminates it.",
        reality: "Awareness produces negligible debiasing; only external institutional scaffolds (blind reviews, pre-commitments) work."
      }
    ],
    practicalApplications: [
      "Conduct pre-mortems before executing major strategic decisions.",
      "Pre-register analytical criteria before looking at outcomes.",
      "Actively solicit structured adversarial critiques (Red Teaming)."
    ],
    scientificCitation: {
      title: "A Theory of Cognitive Dissonance",
      author: "Leon Festinger",
      year: 1957,
      journalOrBook: "Stanford University Press",
      doi: "10.1515/9781503620766"
    }
  },
  {
    id: "bounded-rationality",
    slug: "heuristics-biases-and-bounded-rationality",
    title: "Bounded Rationality & Satisficing",
    subtitle: "The science of optimal decision-making under computational and time constraints.",
    summary: "Human minds cannot calculate perfect economic equilibria. Instead, evolutionary selection produced fast-and-frugal heuristics that aim for 'good enough' outcomes.",
    discipline: "cognitive-science",
    disciplineLabel: "Cognitive Science",
    conceptType: "Mental Model",
    empiricalReplicationPercentage: 92,
    replicationPunchline: "Foundation of modern Nobel-winning behavioral economics & decision theory.",
    illustration: "bounded-rationality",
    difficultyLevel: "Foundational",
    readingTimeMins: 14,
    tags: ["models-you-can-apply", "cognitive-science", "simon", "decision-making", "heuristics"],
    whyItMatters: "Assuming humans possess infinite computational capacity leads to disastrous policies, failing product designs, and flawed financial models.",
    coreMechanism: "Herbert Simon's principle demonstrates that decision quality is bounded by cognitive limitations, incomplete information, and finite deliberation windows.",
    everydayExamples: [
      "Choosing a restaurant on vacation by looking for the one with the most locals rather than reviewing all 200 menus in town.",
      "Doctors using a 3-question decision tree in emergency triage rather than running 40 laboratory panels."
    ],
    commonMisconceptions: [
      {
        misconception: "Bounded rationality means humans are simply irrational.",
        reality: "Heuristics are often ecologically optimal adaptations for environments where computation has finite time limits."
      }
    ],
    practicalApplications: [
      "Design systems with forgiving default settings instead of requiring high-effort configuration.",
      "Limit options to 3-5 high-signal choices to prevent analysis paralysis."
    ],
    scientificCitation: {
      title: "Models of Bounded Rationality: Empirically Grounded Economic Reason",
      author: "Herbert A. Simon",
      year: 1982,
      journalOrBook: "MIT Press"
    }
  },
  {
    id: "motivated-reasoning",
    slug: "motivated-reasoning-and-identity-protective-cognition",
    title: "Motivated Reasoning & Identity Protection",
    subtitle: "How affect and tribal affiliation dictate evidence evaluation.",
    summary: "We evaluate evidence like lawyers defending a client, not neutral judges weighing facts. When a claim threatens our tribe, our brain deploys skepticism as a weapon.",
    discipline: "social-psychology",
    disciplineLabel: "Social Psychology",
    conceptType: "Cognitive Bias",
    empiricalReplicationPercentage: 88,
    replicationPunchline: "Replicated across dozens of studies on political polarization & science acceptance.",
    illustration: "motivated-reasoning",
    difficultyLevel: "Advanced",
    readingTimeMins: 15,
    tags: ["biases-that-trick", "social-psychology", "kahan", "polarization", "identity"],
    whyItMatters: "Presenting more raw facts to partisans often backfires by triggering identity defense mechanisms.",
    coreMechanism: "Dan Kahan's Identity-Protective Cognition framework shows that maintaining social belonging is prioritized over detached empirical accuracy.",
    everydayExamples: [
      "Both sports teams genuinely believe the referee's 50/50 penalty call was biased against them.",
      "Accepting a scientific study instantly when it aligns with political goals, but demanding impossible statistical rigor when it doesn't."
    ],
    commonMisconceptions: [
      {
        misconception: "Science literacy eliminates motivated skepticism.",
        reality: "Individuals with highest scientific numeracy are the most adept at rationalizing partisan stances."
      }
    ],
    practicalApplications: [
      "Decouple policy recommendations from cultural and tribal identity markers.",
      "Frame contradictory evidence in terms of the receiver's core values."
    ],
    scientificCitation: {
      title: "The Case for Motivated Reasoning",
      author: "Ziva Kunda",
      year: 1990,
      journalOrBook: "Psychological Bulletin, 108(3), 480-498."
    }
  },
  {
    id: "popperian-falsification",
    slug: "popperian-falsificationism-and-scientific-demarcation",
    title: "Popperian Falsification & The Black Swan",
    subtitle: "Why empirical verification is logically asymmetrical to empirical falsification.",
    summary: "No amount of observing white swans can definitively prove all swans are white, but a single black swan observation permanently refutes the hypothesis.",
    discipline: "scientific-reasoning",
    disciplineLabel: "Scientific Reasoning",
    conceptType: "Scientific Law",
    empiricalReplicationPercentage: 96,
    replicationPunchline: "The golden demarcation standard distinguishing genuine empirical science from pseudoscience.",
    illustration: "black-swan",
    difficultyLevel: "Advanced",
    readingTimeMins: 13,
    tags: ["models-you-can-apply", "scientific-reasoning", "popper", "philosophy-of-science", "epistemology"],
    whyItMatters: "Prevents confirmation bias by forcing investigators to design tests capable of breaking their own pet hypotheses.",
    coreMechanism: "Modus tollens logic: If hypothesis H implies prediction P, observing not-P logically refutes H, whereas observing P only fails to refute it.",
    everydayExamples: [
      "Albert Einstein stating that a thousand experiments cannot prove him right, but a single experiment can prove him wrong.",
      "Testing software by deliberately attempting to break edge cases rather than only executing happy paths."
    ],
    commonMisconceptions: [
      {
        misconception: "A theory that cannot be falsified is 'superior' because it can never be proven wrong.",
        reality: "An unfalsifiable theory explains nothing because it forbids no possible outcome."
      }
    ],
    practicalApplications: [
      "Ask: 'What specific observable evidence would convince me that my strategy is mistaken?'",
      "Reject business models that explain away every setback as part of the plan."
    ],
    scientificCitation: {
      title: "The Logic of Scientific Discovery",
      author: "Karl Popper",
      year: 1934,
      journalOrBook: "Routledge",
      doi: "10.4324/9780203010396"
    }
  },
  {
    id: "loss-aversion",
    slug: "loss-aversion-and-prospect-theory",
    title: "Loss Aversion & Prospect Theory",
    subtitle: "Why the pain of losing $100 stings twice as sharply as the joy of finding $100.",
    summary: "Human psychology processes potential gains and losses through an asymmetrical S-shaped value function. Losses are psychologically twice as potent as equivalent rewards.",
    discipline: "behavioral-economics",
    disciplineLabel: "Behavioral Economics",
    conceptType: "Heuristic",
    empiricalReplicationPercentage: 94,
    replicationPunchline: "Demonstrated across hundreds of experimental markets with an empirical loss ratio of ~2.1x.",
    illustration: "loss-aversion",
    difficultyLevel: "Foundational",
    readingTimeMins: 11,
    tags: ["biases-that-trick", "behavioral-economics", "kahneman", "tversky", "risk"],
    whyItMatters: "Drives sunk-cost fallacies, excessive status-quo preservation, and irrational risk aversion in career, investing, and negotiation.",
    coreMechanism: "The evolutionary asymmetry between survival threat (starvation/death) and modest surplus created asymmetric neural reward/threat responses.",
    everydayExamples: [
      "Refusing to sell a losing stock because executing the sale crystallizes the emotional pain of the loss.",
      "Homeowners refusing to sell below purchase price even when the entire market has declined 25%."
    ],
    commonMisconceptions: [
      {
        misconception: "Risk aversion is identical to loss aversion.",
        reality: "People are risk-averse in the domain of gains, but become aggressively risk-seeking in the domain of losses to avoid paying a sure cost."
      }
    ],
    practicalApplications: [
      "Reframe choices in terms of net present value rather than past purchase prices.",
      "Set automated trailing stop-losses to circumvent the emotional friction of manual liquidation."
    ],
    scientificCitation: {
      title: "Prospect Theory: An Analysis of Decision under Risk",
      author: "Daniel Kahneman & Amos Tversky",
      year: 1979,
      journalOrBook: "Econometrica, 47(2), 263-291.",
      doi: "10.2307/1914185"
    }
  },
  {
    id: "bystander-effect",
    slug: "the-bystander-effect-re-examined",
    title: "The Bystander Effect & Ecological Validity",
    subtitle: "Laboratory diffusion of responsibility vs naturalistic CCTV emergency interventions.",
    summary: "While classic lab experiments suggested people freeze in groups, modern surveillance data reveals citizens intervene in over 90% of violent public conflicts.",
    discipline: "social-psychology",
    disciplineLabel: "Social Psychology",
    conceptType: "Mental Model",
    empiricalReplicationPercentage: 91,
    replicationPunchline: "Modern CCTV analysis of 1,225 real-world crises overturned a 50-year textbook myth.",
    illustration: "bystander-effect",
    difficultyLevel: "Intermediate",
    readingTimeMins: 11,
    tags: ["models-you-can-apply", "social-psychology", "ecological-validity", "altruism", "emergencies"],
    whyItMatters: "Proves that laboratory artifacts can distort social science when ecological validity and naturalistic observation are neglected.",
    coreMechanism: "In ambiguous scenarios, social proof causes mutual paralysis. However, in clear, unambiguously violent emergencies, someone almost always steps up.",
    everydayExamples: [
      "In a medical emergency, pointing to a specific bystander and saying 'You in the blue coat, call 911' breaks pluralistic ignorance immediately.",
      "Anonymous work chatrooms where everyone assumes someone else is handling a customer outage."
    ],
    commonMisconceptions: [
      {
        misconception: "Human beings in modern cities have become callous and indifferent.",
        reality: "Real-world camera footage shows consistent, cross-cultural pro-social intervention across London, Amsterdam, and Cape Town."
      }
    ],
    practicalApplications: [
      "Assign single directly accountable individuals (DRI) to mission-critical operational incidents.",
      "Eliminate ambiguity in public emergencies by speaking directly to individual bystanders."
    ],
    scientificCitation: {
      title: "Would I Be Helped? Cross-National CCTV Analysis of Bystander Intervention",
      author: "Richard Philpot, et al.",
      year: 2020,
      journalOrBook: "American Psychologist, 75(1), 66-76.",
      doi: "10.1037/amp0000469"
    }
  },
  {
    id: "first-principles",
    slug: "first-principles-reasoning",
    title: "First-Principles Thinking",
    subtitle: "Boiling a system down to its most fundamental truths and reasoning up from there.",
    summary: "Rather than reasoning by analogy ('everyone else is doing it this way'), first principles deconstructs a problem to physics, economics, and irreducible truths.",
    discipline: "logic",
    disciplineLabel: "Critical Thinking & Logic",
    conceptType: "Mental Model",
    empiricalReplicationPercentage: 95,
    replicationPunchline: "The cognitive methodology behind Aristotle, Descartes, Feynman, and breakthrough innovation.",
    illustration: "first-principles",
    difficultyLevel: "Intermediate",
    readingTimeMins: 10,
    tags: ["models-you-can-apply", "logic", "aristotle", "feynman", "problem-solving"],
    whyItMatters: "Reasoning by analogy generates incremental iterations; reasoning from first principles generates 10x breakthrough innovations.",
    coreMechanism: "Socratic questioning systematically strips away cultural dogmas, legacy engineering constraints, and historical precedent to find axiomatic foundations.",
    everydayExamples: [
      "SpaceX calculating the raw material cost of aluminum, carbon fiber, and titanium rather than buying rockets from defense contractors at 10x markup.",
      "Chefs inventing modernist cuisine by studying molecular gastronomy and temperature chemistry instead of classic recipe books."
    ],
    commonMisconceptions: [
      {
        misconception: "First principles means starting from zero on every trivial decision.",
        reality: "Analogical thinking is fast and sufficient for everyday routines; first-principles is reserved for high-stakes optimization."
      }
    ],
    practicalApplications: [
      "Ask 'What are the basic physical constraints?' before accepting budget estimates.",
      "List all unspoken assumptions in a project and test each one's necessity."
    ],
    scientificCitation: {
      title: "Physics and Metaphysics: First Principles",
      author: "Aristotle",
      year: -350,
      journalOrBook: "Aristotelian Corpus"
    }
  },
  {
    id: "occams-razor",
    slug: "occams-razor-and-epistemic-parsimony",
    title: "Occam's Razor & Epistemic Parsimony",
    subtitle: "Why the simplest explanation with the fewest assumptions is probabilistically superior.",
    summary: "When competing hypotheses predict identical empirical outcomes, select the one that introduces the fewest unproven entities and auxiliary assumptions.",
    discipline: "philosophy",
    disciplineLabel: "Philosophy",
    conceptType: "Heuristic",
    empiricalReplicationPercentage: 90,
    replicationPunchline: "Formalized mathematically by Kolmogorov complexity and Bayesian model evidence.",
    illustration: "occams-razor",
    difficultyLevel: "Foundational",
    readingTimeMins: 9,
    tags: ["models-you-can-apply", "philosophy", "parsimony", "epistemology", "bayesian"],
    whyItMatters: "Protects against conspiracy theories that require hundreds of coordinated, silent accomplices when incompetence explains the outcome.",
    coreMechanism: "Bayesian probability penalizes models with extra parameters (the Occam factor) because complex models dilute their prior probability across parameter space.",
    everydayExamples: [
      "A medical student diagnosing a coughing patient with the common flu rather than rare Mongolian throat parasites.",
      "Debugging code by checking for typos before suspecting hardware-level CPU cosmic ray bitflips."
    ],
    commonMisconceptions: [
      {
        misconception: "Occam's razor guarantees the simplest explanation is always true.",
        reality: "It is a probabilistic heuristic for hypothesis prioritization, not an absolute metaphysical law."
      }
    ],
    practicalApplications: [
      "Hanlon's Razor: Never attribute to malice that which is adequately explained by stupidity.",
      "Prioritize simple, testable explanations during Root Cause Analysis (RCA)."
    ],
    scientificCitation: {
      title: "The Cambridge Companion to Ockham",
      author: "Paul Vincent Spade",
      year: 1999,
      journalOrBook: "Cambridge University Press"
    }
  },
  {
    id: "predictive-processing",
    slug: "predictive-processing-and-the-bayesian-brain",
    title: "The Predictive Brain & Free Energy Principle",
    subtitle: "Perception is not a camera; it is a top-down hallucination constrained by sensory evidence.",
    summary: "Your brain does not wait for photons and soundwaves to construct reality. It continually projects top-down predictions and only processes the error signal.",
    discipline: "neuroscience",
    disciplineLabel: "Neuroscience",
    conceptType: "Scientific Law",
    empiricalReplicationPercentage: 89,
    replicationPunchline: "The unifying grand theory of brain function proposed by Karl Friston and Andy Clark.",
    illustration: "predictive-brain",
    difficultyLevel: "Advanced",
    readingTimeMins: 15,
    tags: ["models-you-can-apply", "neuroscience", "friston", "consciousness", "perception"],
    whyItMatters: "Explains optical illusions, phantom limb pain, chronic anxiety, and how expectations actively shape conscious perception.",
    coreMechanism: "Hierarchical predictive coding: higher cortical tiers send generative predictions down to primary sensory cortices, minimizing thermodynamic free energy (prediction error).",
    everydayExamples: [
      "Hearing your phone vibrate in your pocket when it didn't (phantom vibration syndrome due to hyperactive auditory/tactile priors).",
      "Reading misspelled words effortlessly because top-down semantic expectations override raw letter shapes."
    ],
    commonMisconceptions: [
      {
        misconception: "Perception is passive data capture from the outside world.",
        reality: "Perception is an active generative simulation continuously corrected by sparse sensory feedback."
      }
    ],
    practicalApplications: [
      "Recognize that emotional reactions are predictions based on past bodily states rather than objective present truths.",
      "Alter sensory environments to help recalibrate hyper-reactive anxiety priors."
    ],
    scientificCitation: {
      title: "The Free-Energy Principle: A Unified Brain Theory?",
      author: "Karl Friston",
      year: 2010,
      journalOrBook: "Nature Reviews Neuroscience, 11(2), 127-138.",
      doi: "10.1038/nrn2787"
    }
  }
];
