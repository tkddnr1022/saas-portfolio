import { cn } from "@/lib/utils";

type KakaoIconProps = {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function KakaoIcon({ className, ...props }: KakaoIconProps) {
  return (
    <span
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: "url(/kakao.svg)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/kakao.svg)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
      {...props}
    />
  );
}
