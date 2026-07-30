export interface NavLink {
  label: string;
  href: string;
  /** id of the section the link targets, without the leading "#". */
  sectionId: string;
}

export interface Track {
  id: string;
  /** Technical index label, e.g. "T.01". */
  index: string;
  /** System code shown as card metadata, e.g. "TRK-01 / UI". */
  code: string;
  title: string;
  tags: string[];
  description: string;
  /** Which orbiting node in the Skill Core this track maps to (0-based). */
  nodeIndex: number;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export type ChallengeVariant = "interface" | "systems" | "architecture";

export interface Challenge {
  id: string;
  title: string;
  /** e.g. ["FRONTEND", "60 MIN", "PRACTICAL"] */
  meta: [string, string, string];
  description: string;
  variant: ChallengeVariant;
}

export interface Project {
  id: string;
  /** Technical index label, e.g. "P.01". */
  index: string;
  /** Domain tag, e.g. "INSURTECH / CRM". */
  domain: string;
  title: string;
  /** One-sentence goal — deliberately scoped, no project details. */
  goal: string;
  /** Technology / capability tags. */
  stack: string[];
}

export interface Criterion {
  code: string;
  title: string;
  question: string;
}

export interface ExperienceOption {
  value: string;
  label: string;
}
