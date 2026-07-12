import skillsData from "./skills.json";

export type SkillCategoryId =
  | "frontend"
  | "backend"
  | "devops"
  | "design";

export type Skill = {
  name: string;
  level: number;
  years: number;
  context: string;
  projectUrl?: string;
  certLabel?: string;
  thumbnailUrl?: string;
};

export type SkillCategory = {
  id: SkillCategoryId;
  label: string;
  skills: Skill[];
};

export type SkillsData = {
  categories: SkillCategory[];
};

export const SKILL_CATEGORIES: SkillCategory[] = (
  skillsData as SkillsData
).categories;

export const DEFAULT_SKILL_CATEGORY_ID: SkillCategoryId = "frontend";
