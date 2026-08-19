export const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#chat", label: "Chat" },
  { href: "/#skills", label: "Skills" },
  { href: "/#career", label: "Career" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#links", label: "Links" },
] as const;

export type NavLink = (typeof navLinks)[number];
