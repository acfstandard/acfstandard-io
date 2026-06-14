import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ACF® Developer Documentation";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "#0d1f3c",
          color: "#f4f6fa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              border: "2px solid #c9a84c",
              background: "rgba(201, 168, 76, 0.1)",
              color: "#c9a84c",
              fontSize: "26px",
              fontWeight: 700,
            }}
          >
            ACF
          </div>
          <span style={{ fontSize: "30px", fontWeight: 600 }}>acfstandard.io</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "18px",
              color: "#c9a84c",
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: 0,
              marginBottom: "20px",
            }}
          >
            Official developer documentation
          </p>
          <h1
            style={{
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Build agentic systems
            <br />
            your auditor can verify.
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: "20px",
            color: "rgba(244,246,250,0.6)",
          }}
        >
          <span>acf-mcp@1.1.0 · 8 REASON tools · Ed25519-signed</span>
          <span style={{ color: "#c9a84c" }}>MIT licence</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
