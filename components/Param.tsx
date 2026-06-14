import type { ReactNode } from "react";

export function ParamGroup({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 divide-y divide-white/10 rounded-lg border border-white/10 bg-white/[0.02]">
      {children}
    </div>
  );
}

export function Param({
  name,
  type,
  required,
  defaultValue,
  children,
}: {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <div className="p-5">
      <div className="flex flex-wrap items-baseline gap-3">
        <code className="font-mono text-sm font-semibold text-gold">{name}</code>
        <span className="font-mono text-xs text-navy-50/60">{type}</span>
        {required && (
          <span className="rounded border border-red-400/40 bg-red-400/[0.08] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-300">
            required
          </span>
        )}
        {!required && defaultValue && (
          <span className="font-mono text-[11px] text-navy-50/50">
            default: <code className="text-gold/80">{defaultValue}</code>
          </span>
        )}
      </div>
      <div className="mt-2 text-[14px] leading-relaxed text-navy-50/75">
        {children}
      </div>
    </div>
  );
}
