"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { roles } from "@/data/experience";
import { EASE_OUT, cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

type ExperienceSectionProps = { index?: string; showLink?: boolean; id?: string };

export function ExperienceSection({ index = "05", showLink = true, id = "experience" }: ExperienceSectionProps) {
  return (
    <section id={id} className="section-y border-t border-border">
      <div className="container-x">
        <SectionHeader
          index={index}
          label="Experience"
          title={["Where I've worked"]}
          aside={
            <Reveal>
              <p className="text-lead text-muted">
                I&apos;ve spent my career turning complex product problems into simple, useful experiences across
                loyalty, payments and growth — for consumer and B2B products.
              </p>
            </Reveal>
          }
        />

        <ol className="mt-[clamp(4rem,8vw,7rem)]">
          {roles.map((role, i) => (
            <li key={role.company} className="group relative" tabIndex={role.href ? undefined : 0}>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-border-strong"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.2, ease: EASE_OUT, delay: i * 0.05 }}
              />
              <div className="grid grid-cols-1 gap-y-3 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-x-[var(--gutter)] md:py-10">
                <p className="label pt-2 text-muted md:col-span-2">{role.period}</p>

                <div className="md:col-span-4">
                  {role.href ? (
                    <a
                      href={role.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-baseline gap-2 text-h3 font-medium"
                    >
                      <span className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-1.5">
                        {role.company}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        strokeWidth={1.5}
                        className="size-5 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <h3 className="text-h3 font-medium transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-1.5">
                      {role.company}
                    </h3>
                  )}
                </div>

                <p className="text-body md:col-span-3 md:pt-1">
                  {role.role}
                  <span className="block text-small text-muted">{role.location}</span>
                </p>

                <ul className="label hidden flex-wrap justify-end gap-x-3 gap-y-1 pt-2 text-muted md:col-span-3 md:flex">
                  {role.focus.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-[600ms] ease-[var(--ease-out)] md:col-span-7 md:col-start-3",
                    "md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100",
                    "[@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100",
                  )}
                >
                  <p className="min-h-0 overflow-hidden text-body text-muted md:pt-3">{role.summary}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div aria-hidden className="h-px bg-border-strong" />

        {showLink ? (
          <div className="mt-12 flex justify-end">
            <MagneticButton href="/experience" variant="text">
              Full experience &amp; products
            </MagneticButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
