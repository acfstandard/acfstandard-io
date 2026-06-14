import type { ReactNode } from "react";

type Variant = "info" | "warning" | "danger" | "tip";

const styles: Record<Variant, { border: string; bg: string; label: string; icon: string }> =
  {
    info: {
      border: "border-blue-400/40",
      bg: "bg-blue-400/[0.05]",
      label: "text-blue-300",
      icon: "i",
    },
    warning: {
      border: "border-gold/40",
      bg: "bg-gold/[0.05]",
      label: "text-gold",
      icon: "!",
    },
    danger: {
      border: "border-red-400/40",
      bg: "bg-red-400/[0.05]",
      label: "text-red-300",
      icon: "×",
    },
    tip: {
      border: "border-emerald-400/40",
      bg: "bg-emerald-400/[0.05]",
      label: "text-emerald-300",
      icon: "→",
    },
  };

const titles: Record<Variant, { en: string; fr: string }> = {
  info: { en: "Note", fr: "Note" },
  warning: { en: "Warning", fr: "Attention" },
  danger: { en: "Danger", fr: "Danger" },
  tip: { en: "Tip", fr: "Astuce" },
};

export function Callout({
  variant = "info",
  title,
  locale = "en",
  children,
}: {
  variant?: Variant;
  title?: string;
  locale?: "en" | "fr";
  children: ReactNode;
}) {
  const s = styles[variant];
  const heading = title ?? titles[variant][locale];

  return (
    <div className={`my-6 rounded-lg border ${s.border} ${s.bg} p-5`}>
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border ${s.border} font-mono text-xs font-bold ${s.label}`}
        >
          {s.icon}
        </span>
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${s.label}`}
        >
          {heading}
        </span>
      </div>
      <div className="callout-body text-[15px] leading-relaxed text-navy-50/80">
        {children}
      </div>
    </div>
  );
}
