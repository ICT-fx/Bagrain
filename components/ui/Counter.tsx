"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutExpo, prefersReducedMotion, DURATION } from "@/lib/animations";
import { useInView } from "./useInView";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Chiffre qui s'incrémente sur 1,2 s à l'entrée dans le viewport, une seule fois. */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>("0px 0px -10% 0px");
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const total = DURATION.counter * 1000;
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setDisplay(Math.round(easeOutExpo(p) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
