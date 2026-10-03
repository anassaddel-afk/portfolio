"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { site, socialLinks, type NavId } from "@/data/site";
import { lockScroll, scrollToTarget } from "@/lib/scroll";
import { EASE_IN_OUT, EASE_OUT, cn, pad } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useNavExtension } from "./NavExtension";
import { ThemeToggle } from "./ThemeToggle";

function routeSection(pathname: string): NavId | null {
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/experience")) return "experience";
  return null;
}

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<NavId | null>(null);
  const [open, setOpen] = useState(false);
  const extension = useNavExtension();
  const compact = scrolled || extension.active;

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
          if (entry.isIntersecting) setActive(entry.target.id as NavId);
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
    const item = site.nav.find((n) => n.id === id);
    if (!item?.href.includes("#")) return;
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
    <header id="site-header" data-safe className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "container-x transition-[padding] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
          compact ? "pt-3" : "pt-0",
        )}
      >
        <div
          className={cn(
            "border transition-[background-color,border-color,border-radius] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
            compact ? "rounded-[var(--radius-md)] border-border bg-background/75 backdrop-blur-xl" : "border-transparent",
          )}
        >
          <nav
            aria-label={t.nav.label}
            className={cn(
              "flex items-center justify-between transition-[height,padding] duration-[var(--duration-slow)] ease-[var(--ease-out)]",
              compact ? "h-14 px-3 md:px-5" : "h-[var(--nav-h)] px-0",
            )}
          >
            <Link href="/" onClick={onHome} aria-label={t.nav.home} className="label flex h-11 items-center font-medium text-(length:--fs-nav)">
              {t.name}
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
                        "label relative flex h-11 items-center px-3 text-(length:--fs-nav) transition-colors duration-300",
                        isActive ? "text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      {t.nav.items[item.id]}
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
              <li className="ms-2 flex items-center gap-1 border-s border-border ps-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </li>
            </ul>

            <div className="flex items-center md:hidden">
              <LanguageSwitcher className="me-0.5" />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="label flex h-11 items-center gap-2 ps-2 pe-1 text-(length:--fs-nav)"
              >
                {t.nav.menu}
                <span aria-hidden className="flex flex-col gap-[3px]">
                  <span className="block h-px w-4 bg-current" />
                  <span className="block h-px w-4 bg-current" />
                </span>
              </button>
            </div>
          </nav>

          <div ref={extension.setSlot} className="md:hidden" />
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} onNav={onNav} onHome={onHome} />
    </header>
  );
}

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  active: NavId | null;
  onNav: (e: React.MouseEvent, id: string) => void;
  onHome: (e: React.MouseEvent) => void;
};

function MobileMenu({ open, onClose, active, onNav, onHome }: MobileMenuProps) {
  const { t } = useI18n();
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
          aria-label={t.nav.menu}
          className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          <div className="container-x flex h-[var(--nav-h)] items-center justify-between">
            <Link href="/" onClick={onHome} className="label flex h-11 items-center text-(length:--fs-nav) font-medium">
              {t.name}
            </Link>
            <button ref={closeRef} type="button" onClick={onClose} className="label flex h-11 items-center px-2 text-(length:--fs-nav)">
              {t.nav.close}
            </button>
          </div>

          <nav aria-label={t.nav.mobileLabel} className="container-x mt-10 flex-1">
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
                    <span className="text-h2 font-medium">{t.nav.items[item.id]}</span>
                    <span className={cn("label tabular-nums", active === item.id ? "text-accent" : "text-muted")}>{pad(i + 1)}</span>
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
            <a href={site.links.email} dir="ltr" className="text-lead self-start">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks(t).map((l) => (
                <li key={l.id}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="label flex h-11 items-center gap-1 text-muted">
                    {l.label}
                    <ArrowUpRight aria-hidden className="size-3 rtl:-scale-x-100" strokeWidth={1.5} />
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
