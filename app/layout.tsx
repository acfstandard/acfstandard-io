import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ACF® Developer Documentation — acfstandard.io",
  description:
    "Official developer documentation for the Agentic Commerce Framework® (ACF®) — the European standard for agentic governance. MCP server, REASON tools, doctrine signatures, integration guides.",
  metadataBase: new URL("https://acfstandard.io"),
  openGraph: {
    title: "ACF® Developer Documentation",
    description:
      "MCP server, REASON tools, doctrine signatures, integration guides for the Agentic Commerce Framework®.",
    url: "https://acfstandard.io",
    siteName: "acfstandard.io",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
