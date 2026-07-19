"use client";

import { Download, Mail } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF, RESUME_HREF } from "@/data/links";
import { cn } from "@/lib/utils";

type LinksCtaProps = {
  className?: string;
};

export function LinksCta({ className }: LinksCtaProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      <Button
        nativeButton={false}
        render={<a href={CONTACT_HREF} />}
        size="lg"
      >
        <Mail aria-hidden="true" />
        <span>지금 연락하기</span>
      </Button>
      <Button
        nativeButton={false}
        render={<a href={RESUME_HREF} download />}
        variant="outline"
        size="lg"
      >
        <Download aria-hidden="true" />
        <span>이력서 다운로드</span>
      </Button>
    </Reveal>
  );
}
