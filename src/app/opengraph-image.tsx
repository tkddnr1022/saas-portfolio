import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/data/site";

export const alt = `${SITE_NAME} - Full-Stack Engineer as a Service`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(145deg, #f4f7fb 0%, #e8f4f4 55%, #d7ecec 100%)",
        color: "#1a2332",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#2a8f8f",
        }}
      >
        Full-Stack Engineer as a Service
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            maxWidth: 820,
            fontSize: 34,
            lineHeight: 1.35,
            color: "#3d4a5c",
          }}
        >
          Design systems to CI/CD — one full-stack engineer for the whole product.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          fontSize: 22,
          color: "#5a687a",
        }}
      >
        <span>FE · BE · DevOps · Design</span>
      </div>
    </div>,
    { ...size },
  );
}
