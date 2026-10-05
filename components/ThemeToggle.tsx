"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useI18n } from "./LanguageProvider";

type Theme = "light" | "dark";

export const themeScript = `(function(){try{var d=document.documentElement;if(/[?&]embed=mockup(?:&|$)/.test(location.search)){d.classList.remove('dark');d.setAttribute('data-theme','light');d.setAttribute('data-embed','mockup');d.style.colorScheme='light';return}var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.classList.toggle('dark',t==='dark');d.setAttribute('data-theme',t);d.style.colorScheme=t}catch(e){}})();`;

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.setAttribute("data-theme", next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      title={isDark ? t.theme.light : t.theme.dark}
      className={cn("group grid size-11 place-items-center rounded-full", className)}
    >
      <motion.svg
        viewBox="0 0 16 16"
        className="size-[15px]"
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        aria-hidden
      >
        <circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 1.25a6.75 6.75 0 0 1 0 13.5z" fill="currentColor" />
      </motion.svg>
    </button>
  );
}
