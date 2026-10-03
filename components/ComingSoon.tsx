"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "./LanguageProvider";

const ComingSoonContext = createContext<() => void>(() => {});

export const useComingSoon = () => useContext(ComingSoonContext);

/** One quiet note for projects whose case study is not published yet. */
export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const show = useCallback(() => {
    setOpen(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 2800);
  }, []);

  return (
    <ComingSoonContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open ? (
          <motion.p
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.35 }}
            className="label pointer-events-none fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-[70] rounded-full border border-border bg-background px-5 py-3 text-foreground shadow-[0_12px_40px_-24px_rgb(0_0_0/0.45)]"
          >
            {t.work.comingSoonNote}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </ComingSoonContext.Provider>
  );
}
