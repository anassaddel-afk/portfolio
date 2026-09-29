import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

type PageIntroProps = { label: string; title: string[]; children?: ReactNode };

export function PageIntro({ label, title, children }: PageIntroProps) {
  return (
    <header className="container-x pb-[clamp(3rem,7vw,6rem)] pt-[calc(var(--nav-h)+clamp(3rem,8vw,7rem))]">
      <p className="label text-muted">{label}</p>
      <TextReveal as="h1" trigger="mount" delay={0.1} lines={title} className="mt-8 text-display font-medium" />
      {children ? (
        <Reveal className="mt-10 max-w-[48ch] text-lead text-muted md:mt-14" delay={0.35}>
          {children}
        </Reveal>
      ) : null}
    </header>
  );
}
