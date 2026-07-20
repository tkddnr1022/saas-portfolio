"use client";

import { Reveal } from "@/components/motion/reveal";
import { SkillProficiencyBar } from "@/components/sections/skills/skill-proficiency-bar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_SKILL_CATEGORY_ID, SKILL_CATEGORIES } from "@/data/skills";

export function SkillsContent() {
  return (
    <Reveal>
      <Tabs defaultValue={DEFAULT_SKILL_CATEGORY_ID} className="w-full gap-8">
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <TabsList variant="line" className="w-max min-w-full justify-start">
            {SKILL_CATEGORIES.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {SKILL_CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <ul className="grid gap-6 sm:grid-cols-2">
              {category.skills.map((skill) => (
                <li key={`${category.id}-${skill.name}`}>
                  <SkillProficiencyBar skill={skill} />
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </Reveal>
  );
}
