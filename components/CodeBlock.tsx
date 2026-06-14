"use client";

import { useState } from "react";

export function CodeBlock({
  code,
  language,
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — fall back to no-op
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/10 bg-black/40">
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <div className="flex items-center gap-3">
            {filename && (
              <span className="font-mono text-xs text-navy-50/70">{filename}</span>
            )}
            {language && (
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold/70">
                {language}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-navy-50/70 transition hover:border-gold/40 hover:text-gold"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13.5px] leading-relaxed text-navy-50/90">
        <code>{code}</code>
      </pre>
      {!filename && !language && (
        <button
          type="button"
          onClick={onCopy}
          className="absolute right-3 top-3 rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-navy-50/70 transition hover:border-gold/40 hover:text-gold"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}
