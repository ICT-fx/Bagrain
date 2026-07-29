"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Détection d'entrée dans le viewport, une seule fois.
 * Déclenchement au passage à 75 % du viewport (rootMargin -25 % en bas).
 */
export function useInView<T extends HTMLElement>(
  rootMargin: string = "0px 0px -25% 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
