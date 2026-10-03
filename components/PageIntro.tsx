import type { ReactNode } from "react";
import { TextReveal } from "./TextReveal";

type PageIntroProps = { label: string; title: string[]; children?: ReactNode };

export function PageIntro({ label, title, children }: PageIntroProps) {
  return (
    <header className="container-x pb-[var(--space-8)] pt-[calc(var(--nav-h)+var(--space-8))] md:pb-[var(--space-10)] md:pt-[calc(var(--nav-h)+var(--space-10))]">
      <p className="label text-muted">{label}</p>
      <TextReveal as="h1" trigger="mount" delay={0.1} lines={title} className="mt-4 text-display font-medium" />
      {children ? (
        <div className="mt-6 max-w-[42rem] text-lead text-muted md:mt-8">{children}</div>
      ) : null}
    </header>
  );
}
