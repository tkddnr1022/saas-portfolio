import careerData from "./career.json";

export type Achievement = {
  text: string;
  metric?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  tenureLabel: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  employmentType: string;
  stack: string[];
  responsibilities: string[];
  achievements: Achievement[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: number;
  date: string;
  credentialUrl: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

export type Language = {
  id: string;
  name: string;
  level: string;
  score?: string;
  date?: string;
  context: string;
};

export type ResumeStack = {
  id: string;
  label: string;
  items: string[];
};

export type CareerData = {
  summary: string;
  stacks: ResumeStack[];
  experiences: Experience[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
};

const data = careerData as CareerData;

export const RESUME_SUMMARY = data.summary;

export const RESUME_STACKS: ResumeStack[] = data.stacks;

export const EXPERIENCES: Experience[] = [...data.experiences].sort((a, b) =>
  b.startDate.localeCompare(a.startDate),
);

export const CERTIFICATIONS: Certification[] = data.certifications;

export const EDUCATION: Education[] = data.education;

export const LANGUAGES: Language[] = data.languages;

function formatYearMonth(date: string): string {
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}

export function formatExperiencePeriod(startDate: string, endDate: string | null): string {
  const end = endDate ? formatYearMonth(endDate) : "Present";
  return `${formatYearMonth(startDate)} – ${end}`;
}

export function formatEducationPeriod(startDate: string, endDate: string): string {
  return `${formatYearMonth(startDate)} ~ ${formatYearMonth(endDate)}`;
}

export function formatEducationYears(startDate: string, endDate: string): string {
  return `${startDate.slice(0, 4)} – ${endDate.slice(0, 4)}`;
}

export function formatResumeDate(date: string): string {
  return formatYearMonth(date);
}
