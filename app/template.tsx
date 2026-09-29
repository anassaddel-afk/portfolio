"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/utils";

let hasMounted = false;

/** Fades each route in after client-side navigation. The first load renders immediately. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animateIn] = useState(() => hasMounted);

  useEffect(() => {
    hasMounted = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
