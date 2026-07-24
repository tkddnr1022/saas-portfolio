export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="resume-root min-h-full bg-neutral-100 print:bg-white">{children}</div>;
}
