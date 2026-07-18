export const navLinks = [
  { href: "/#hero", label: "Home" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#skills", label: "Skills" },
  { href: "/#chat", label: "Chat" },
  { href: "/#projects", label: "Projects" },
  { href: "/#career", label: "Career" },
  { href: "/#links", label: "Links" },
] as const;

export type NavLink = (typeof navLinks)[number];
