"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Role } from "@/data/experience";
import { EASE_OUT, cn } from "@/lib/utils";

export function ExperienceTimeline({
  roles,
  opensNewTab,
  showRole = true,
}: {
  roles: Role[];
  opensNewTab: string;
  showRole?: boolean;
}) {
  return (
    <>
      <ol className="mt-12 md:mt-16">
        {roles.map((role, i) => (
          <li key={role.company} className="group relative" tabIndex={role.href ? undefined : 0}>
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px origin-left bg-border-strong rtl:origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.2, ease: EASE_OUT, delay: i * 0.05 }}
            />
            <div className="grid grid-cols-1 gap-y-3 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-x-[var(--gutter)] md:py-10">
              <p className="label pt-2 tabular-nums text-muted md:col-span-2">{role.period}</p>

              <div className="md:col-span-4">
                {role.href ? (
                  <a
                    href={role.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-baseline gap-2 text-h3 font-medium"
                  >
                    <span className="transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-1.5">
                      {role.company}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-5 opacity-0 transition-[translate,opacity] duration-500 group-hover:nudge-1 group-hover:opacity-100 rtl:-scale-x-100"
                    />
                    <span className="sr-only">{opensNewTab}</span>
                  </a>
                ) : (
                  <h3 className="text-h3 font-medium transition-[translate] duration-700 ease-[var(--ease-out)] group-hover:nudge-1.5">
                    {role.company}
                  </h3>
                )}
              </div>

              <p className="text-body md:col-span-3 md:pt-1">
                {showRole ? role.role : null}
                <span className={showRole ? "block text-small text-muted" : "text-small text-muted"}>{role.location}</span>
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
                <div className="min-h-0 overflow-hidden md:pt-3">
                  <p className="text-body text-muted">{role.detail}</p>
                  {role.highlights.length > 0 ? (
                    <ul className="mt-[var(--space-4)] flex flex-col gap-[var(--space-2)] text-small text-muted">
                      {role.highlights.map((item) => (
                        <li key={item.value}>
                          <span className="font-medium text-foreground tabular-nums">{item.value}</span> {item.label}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div aria-hidden className="h-px bg-border-strong" />
    </>
  );
}
