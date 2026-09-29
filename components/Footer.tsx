"use client";

import { ArrowUp } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { scrollToTarget } from "@/lib/scroll";

export function Footer() {
  const links = [...socialLinks().filter((l) => l.label !== "CV"), { label: "Email", href: site.links.email }];

  return (
    <footer className="container-x">
      <div className="label grid gap-y-8 border-t border-border py-10 md:grid-cols-12 md:items-center md:gap-x-[var(--gutter)] md:py-12">
        <p className="md:col-span-4">
          {site.name}
          <span className="block text-muted">{site.role}</span>
        </p>

        <ul className="flex flex-wrap gap-x-6 md:col-span-5">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="link-draw inline-flex h-11 items-center"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-8 md:col-span-3 md:justify-end">
          <span className="text-muted">© {new Date().getFullYear()}</span>
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="group inline-flex h-11 items-center gap-2 uppercase"
          >
            Back to top
            <ArrowUp
              aria-hidden
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
