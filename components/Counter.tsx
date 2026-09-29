"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = { value: number; suffix?: string; pad?: boolean; className?: string };

export function Counter({ value, suffix = "", pad = false, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const primed = useRef(false);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top > window.innerHeight) {
      primed.current = true;
      setN(0);
    }
  }, [reduce]);

  useEffect(() => {
    if (!inView || !primed.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  const text = pad ? String(n).padStart(2, "0") : String(n);

  return (
    <span ref={ref} className={className} aria-label={`${pad ? String(value).padStart(2, "0") : value}${suffix}`}>
      <span aria-hidden className="tabular-nums">
        {text}
        {suffix}
      </span>
    </span>
  );
}
