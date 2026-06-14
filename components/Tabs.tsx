"use client";

import { useState, type ReactNode } from "react";

export function Tabs({
  tabs,
  defaultIndex = 0,
}: {
  tabs: { label: string; content: ReactNode }[];
  defaultIndex?: number;
}) {
  const [active, setActive] = useState(defaultIndex);
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-white/10">
      <div className="flex border-b border-white/10 bg-white/[0.02]">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition ${
              active === i
                ? "border-b-2 border-gold text-gold"
                : "text-navy-50/60 hover:text-navy-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-1">{tabs[active]?.content}</div>
    </div>
  );
}
