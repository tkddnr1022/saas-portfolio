import { cn } from "@/lib/utils";

type NotionIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function NotionIcon({ className, ...props }: NotionIconProps) {
  return (
    <span
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: "url(/notion.svg)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/notion.svg)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
      {...props}
    />
  );
}
