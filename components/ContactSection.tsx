import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { CopyEmail } from "./CopyEmail";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";

export function ContactSection() {
  return (
    <section id="contact" className="section-y border-t border-border">
      <div className="container-x">
        <p className="label flex gap-3 text-muted">
          <span className="text-accent">(06)</span>
          <span>Contact</span>
        </p>

        <div className="mt-8 grid gap-y-12 md:grid-cols-12 md:items-end md:gap-x-[var(--gutter)]">
          <TextReveal
            as="h2"
            lines={["Have a product", "problem to solve?"]}
            className="text-display font-medium md:col-span-9"
          />
          <Reveal className="flex md:col-span-3 md:justify-end">
            <Magnetic strength={0.35} max={8}>
              <a
                href={site.links.email}
                className="group grid size-36 place-items-center rounded-full bg-accent text-accent-foreground transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-[1.04] md:size-44"
              >
                <span className="flex flex-col items-center gap-2">
                  <span className="label text-[0.78rem]">Let&apos;s talk</span>
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-2"
                  />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid gap-y-10 border-t border-border pt-8 md:mt-24 md:grid-cols-12 md:gap-x-[var(--gutter)]">
          <div className="md:col-span-7">
            <p className="label mb-4 text-muted">Email</p>
            <CopyEmail />
          </div>
          <div className="md:col-span-5">
            <p className="label mb-4 text-muted">Elsewhere</p>
            <ul className="flex flex-col">
              <li className="border-b border-border">
                <a
                  href={site.links.call}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-12 items-center justify-between py-3"
                >
                  <span className="text-body">Book a 30-min call</span>
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </a>
              </li>
              {socialLinks().map((l) => (
                <li key={l.label} className="border-b border-border">
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-12 items-center justify-between py-3"
                  >
                    <span className="text-body">{l.label}</span>
                    <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
