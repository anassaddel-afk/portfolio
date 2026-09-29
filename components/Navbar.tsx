"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site, socialLinks } from "@/data/site";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { EASE_IN_OUT, EASE_OUT, cn, pad } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

type SectionId = (typeof site.nav)[number]["id"];

function routeSection(pathname: string): SectionId | null {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/experience")) return "experience";
  return null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 32);
    if (isHome && v < window.innerHeight * 0.5) setActive(null);
  });

  useEffect(() => {
    if (!isHome) {
      setActive(routeSection(pathname));
      return;
    }
    const els = site.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  useEffect(() => setOpen(false), [pathname]);

  const onNav = (e: React.MouseEvent, id: string) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    scrollToTarget(`#${id}`);
    history.replaceState(null, "", `#${id}`);
  };

  const onHome = (e: React.MouseEvent) => {
    setOpen(false);
    if (!isHome) return;
    e.preventDefault();
    scrollToTarget(0);
    history.replaceState(null, "", "/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "container-x transition-[padding] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
          scrolled ? "pt-3" : "pt-0",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between border transition-[height,padding,background-color,border-color,border-radius] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
            scrolled
              ? "h-14 rounded-[var(--radius-md)] border-border bg-background/75 px-3 backdrop-blur-xl md:px-5"
              : "h-[var(--nav-h)] border-transparent px-0",
          )}
        >
          <Link href="/" onClick={onHome} className="label flex h-11 items-center gap-2 text-[0.75rem]">
            <span className="font-medium">Anas Adel</span>
            <span
              className={cn(
                "hidden text-muted transition-opacity duration-500 lg:inline",
                scrolled && "lg:opacity-0",
              )}
            >
              — {site.role}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={(e) => onNav(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "label relative flex h-11 items-center px-3 text-[0.72rem] transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2 border-l border-border pl-2">
              <ThemeToggle />
            </li>
          </ul>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="label flex h-11 items-center gap-2 px-2 text-[0.75rem]"
            >
              Menu
              <span aria-hidden className="flex flex-col gap-[3px]">
                <span className="block h-px w-4 bg-current" />
                <span className="block h-px w-4 bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} onNav={onNav} onHome={onHome} />
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: SectionId | null;
  onNav: (e: React.MouseEvent, id: string) => void;
  onHome: (e: React.MouseEvent) => void;
};

function MobileMenu({ open, onClose, active, onNav, onHome }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
            <Link href="/" onClick={onHome} className="label flex h-11 items-center text-[0.75rem] font-medium">
              Anas Adel
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="label flex h-11 items-center px-2 text-[0.75rem]"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x mt-10 flex-1">
            <ul className="flex flex-col">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-t border-border"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 + i * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => onNav(e, item.id)}
                    className="flex min-h-[4.5rem] items-baseline justify-between py-4"
                  >
                    <span className="text-h2 font-medium">{item.label}</span>
                    <span className={cn("label", active === item.id ? "text-accent" : "text-muted")}>{pad(i + 1)}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex flex-col gap-4 pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a href={site.links.email} className="text-lead">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks().map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="label flex h-11 items-center gap-1 text-muted"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
