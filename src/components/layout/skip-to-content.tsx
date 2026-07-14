export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="bg-primary text-primary-foreground focus-visible:ring-ring/50 fixed left-4 top-4 z-[100] -translate-y-[200%] rounded-lg px-4 py-2 text-sm font-medium shadow-md transition-transform focus-visible:translate-y-0 focus-visible:ring-3 focus-visible:outline-none"
    >
      본문으로 건너뛰기
    </a>
  );
}
