import { cn } from "@/lib/utils";

type GithubIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function GithubIcon({ className, ...props }: GithubIconProps) {
  return (
    <span
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: "url(/github.svg)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/github.svg)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
      {...props}
    />
  );
}
