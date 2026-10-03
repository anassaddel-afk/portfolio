"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Sparse canvas guides behind the Hero. No tool branding.
 * Lines drift a few pixels over tens of seconds and pause once the Hero leaves view.
 */
export function CanvasGuides() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible((entry?.intersectionRatio ?? 0) > 0.18),
      { threshold: [0, 0.18, 0.45] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="canvas-guides" data-paused={reduce || !visible ? "true" : undefined} aria-hidden>
      <span className="guide guide-v" style={{ left: "6.5%", animationDuration: "38s" }} />
      <span className="guide guide-v" style={{ left: "15%", animationDuration: "46s", animationDelay: "-12s" }} />
      <span className="guide guide-v" style={{ right: "9%", animationDuration: "34s", animationDelay: "-6s" }} />

      <span className="guide guide-h" style={{ top: "12%", animationDuration: "44s" }} />
      <span className="guide guide-h" style={{ top: "21%", animationDuration: "32s", animationDelay: "-9s" }} />
      <span className="guide guide-h" style={{ bottom: "16%", animationDuration: "40s", animationDelay: "-16s" }} />

      <span className="guide-ticks" style={{ top: "12%", left: "6.5%", animationDuration: "30s" }} />
      <span className="guide-ticks guide-ticks-v" style={{ top: "21%", right: "9%", animationDuration: "36s", animationDelay: "-8s" }} />
      <span className="guide-ticks" style={{ bottom: "16%", left: "15%", animationDuration: "42s", animationDelay: "-14s" }} />

      <span className="guide-cross" style={{ top: "21%", left: "15%" }} />
    </div>
  );
}
