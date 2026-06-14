import type { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="my-8 space-y-8 border-l border-white/10 pl-8">
      {children}
    </ol>
  );
}

export function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="relative">
      <span className="absolute -left-[37px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-gold/40 bg-navy font-mono text-[11px] font-bold text-gold" />
      <h3 className="mb-3 font-display text-lg font-semibold text-white">
        {title}
      </h3>
      <div className="text-[15px] leading-relaxed text-navy-50/80">{children}</div>
    </li>
  );
}
