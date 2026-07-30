import type {
  Challenge,
  Criterion,
  ExperienceOption,
  NavLink,
  ProcessStep,
  Project,
  Track,
} from "@/types";

export const SITE_NAME = "The Developer Games";

export const NAV_LINKS: NavLink[] = [
  { label: "The Games", href: "#about", sectionId: "about" },
  { label: "Tracks", href: "#tracks", sectionId: "tracks" },
  { label: "Process", href: "#process", sectionId: "process" },
  { label: "Challenges", href: "#challenges", sectionId: "challenges" },
  { label: "Apply", href: "#apply", sectionId: "apply" },
];

/** Labels for the six orbiting nodes of the Skill Core. */
export const ORBIT_TRACKS = [
  "Frontend",
  "Backend",
  "Full-stack",
  "AI & Data",
  "DevOps",
  "Mobile",
] as const;

export const MARQUEE_ITEMS = [
  "FRONTEND",
  "BACKEND",
  "FULL-STACK",
  "AI & DATA",
  "DEVOPS",
  "MOBILE",
] as const;

export const TRACKS: Track[] = [
  {
    id: "frontend",
    index: "T.01",
    code: "TRK-01 / UI",
    title: "Frontend Engineering",
    tags: ["React", "Next.js", "TypeScript", "UI Engineering", "Performance"],
    description:
      "Build polished interfaces, translate design into systems, and create fast, accessible product experiences.",
    nodeIndex: 0,
  },
  {
    id: "backend",
    index: "T.02",
    code: "TRK-02 / SYS",
    title: "Backend Engineering",
    tags: ["APIs", "Node.js", "Databases", "Architecture", "Reliability"],
    description:
      "Design resilient services, model data clearly, and solve problems that continue working beyond the happy path.",
    nodeIndex: 1,
  },
  {
    id: "fullstack",
    index: "T.03",
    code: "TRK-03 / E2E",
    title: "Full-stack Engineering",
    tags: ["Product Thinking", "Frontend", "Backend", "Integrations"],
    description:
      "Own complete features from interface to infrastructure while making pragmatic technical decisions.",
    nodeIndex: 2,
  },
  {
    id: "ai-data",
    index: "T.04",
    code: "TRK-04 / ML",
    title: "AI and Data",
    tags: ["Python", "Machine Learning", "LLM Systems", "Data Pipelines"],
    description:
      "Turn data and intelligent systems into useful, measurable product capabilities.",
    nodeIndex: 3,
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "enter",
    number: "01",
    title: "Enter",
    description:
      "Submit your details and select the engineering track that best represents your strengths.",
  },
  {
    id: "qualify",
    number: "02",
    title: "Qualify",
    description:
      "Receive a practical challenge designed around real development work rather than abstract trivia.",
  },
  {
    id: "build",
    number: "03",
    title: "Build",
    description:
      "Solve the challenge, document your decisions, and demonstrate how you approach quality and trade-offs.",
  },
  {
    id: "meet",
    number: "04",
    title: "Meet the team",
    description:
      "Strong submissions move directly into a focused conversation with our engineering team.",
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "interface-reconstruction",
    title: "Interface Reconstruction",
    meta: ["FRONTEND", "60 MIN", "PRACTICAL"],
    description:
      "Recreate a responsive product interface from a visual reference while maintaining accessibility and performance.",
    variant: "interface",
  },
  {
    id: "api-under-pressure",
    title: "API Under Pressure",
    meta: ["BACKEND", "75 MIN", "SYSTEMS"],
    description:
      "Investigate an unstable endpoint, identify its failure modes, and improve its behaviour under realistic load.",
    variant: "systems",
  },
  {
    id: "system-design-sprint",
    title: "System Design Sprint",
    meta: ["FULL-STACK", "90 MIN", "ARCHITECTURE"],
    description:
      "Design a practical technical approach for a product feature with real constraints, trade-offs, and future growth.",
    variant: "architecture",
  },
];

/**
 * Projects — titles, stack and goal only, drawn from the internal
 * requirement documents; full scope is deliberately withheld.
 */
export const PROJECTS: Project[] = [
  {
    id: "insurance-crm",
    index: "P.01",
    domain: "INSURTECH / CRM",
    title: "Insurance Telemarketing CRM",
    goal: "Centralise the full life-insurance lead lifecycle — from call-centre submission through qualification pipelines to daily carrier updates — for a multi-role sales organisation.",
    stack: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Supabase Realtime",
      "Edge Functions",
      "Slack API",
      "USPS API",
      "Vercel",
    ],
  },
  {
    id: "realworldx",
    index: "P.02",
    domain: "EDTECH / COMMUNITY",
    title: "RealWorldX",
    goal: "A subscription learning and community platform with tiered course access, synced Discord roles, and a built-in affiliate programme with commission payouts.",
    stack: [
      "Next.js",
      "Supabase",
      "Stripe",
      "Stripe Connect",
      "Discord API",
    ],
  },
  {
    id: "salestrack-academy",
    index: "P.03",
    domain: "LMS / INTERNAL TOOLS",
    title: "SalesTrack Academy",
    goal: "Centralise sales-training content — video, audio and documents — with quiz gates and real-time visibility into every agent's progress and proficiency.",
    stack: [
      "Next.js",
      "Supabase",
      "AWS S3",
      "YouTube/Vimeo Embeds",
      "HTML5 Media",
      "In-app PDF Viewer",
      "RBAC Auth",
    ],
  },
];

export const CRITERIA: Criterion[] = [
  {
    code: "C-01",
    title: "Correctness",
    question: "Does the solution solve the actual problem reliably?",
  },
  {
    code: "C-02",
    title: "Code quality",
    question:
      "Is the implementation understandable, maintainable, and appropriately structured?",
  },
  {
    code: "C-03",
    title: "Decision-making",
    question: "Are trade-offs identified and explained clearly?",
  },
  {
    code: "C-04",
    title: "Product thinking",
    question:
      "Does the solution consider usability, performance, and the person using it?",
  },
];

export const SKILL_SUGGESTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "DevOps",
  "Machine Learning",
] as const;

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { value: "less-than-1", label: "Less than 1 year" },
  { value: "1-2", label: "1–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-8", label: "6–8 years" },
  { value: "9-plus", label: "9+ years" },
];
