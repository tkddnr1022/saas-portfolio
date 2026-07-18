import careerData from "./career.json";

export type Achievement = {
  text: string;
  metric?: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  achievements: Achievement[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: number;
  credentialUrl: string;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
};

export type Language = {
  id: string;
  name: string;
  level: string;
  score?: string;
  context: string;
};

export type CareerData = {
  experiences: Experience[];
  certifications: Certification[];
  education: Education[];
  languages: Language[];
};

const data = careerData as CareerData;

export const EXPERIENCES: Experience[] = [...data.experiences].sort(
  (a, b) => b.startDate.localeCompare(a.startDate),
);

export const CERTIFICATIONS: Certification[] = data.certifications;

export const EDUCATION: Education[] = data.education;

export const LANGUAGES: Language[] = data.languages;

export function formatExperiencePeriod(
  startDate: string,
  endDate: string | null,
): string {
  const format = (date: string) => {
    const [year, month] = date.split("-");
    return `${year}.${month}`;
  };

  const end = endDate ? format(endDate) : "Present";
  return `${format(startDate)} – ${end}`;
}
