import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { PrevNext } from "./PrevNext";

type Props = {
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
};

export function DocsPage({ title, description, badge, children }: Props) {
  return (
    <article className="prose-doc">
      <Breadcrumbs />
      <header className="mb-10">
        {badge && (
          <span className="mb-4 inline-block rounded border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-gold">
            {badge}
          </span>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-navy-50/75">
            {description}
          </p>
        )}
      </header>
      <div className="docs-content">{children}</div>
      <PrevNext />
    </article>
  );
}
