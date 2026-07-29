"use client";

import {
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { prefersReducedMotion } from "@/lib/animations";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[4px] px-6 py-3 text-[15px] font-medium transition-colors duration-200 select-none";

const VARIANTS: Record<string, string> = {
  primary:
    "bg-bagrain text-mist hover:bg-[#1a4ff0] active:bg-[#123bb8] disabled:opacity-50",
  ghost:
    "border border-[rgba(242,245,251,0.18)] text-mist hover:border-haze disabled:opacity-50",
};

/** Rayon d'attraction autour du bouton, en pixels. */
const MAGNET_RADIUS = 60;

/**
 * Bouton magnétique : sur desktop (pointeur fin), il glisse doucement vers
 * le curseur dès que celui-ci entre dans un rayon de 60px — comme le sac,
 * il se ferme aux aimants.
 *
 * L'écoute se fait au niveau du document plutôt que sur un conteneur
 * agrandi : un wrapper de 60px intercepterait les survols voisins.
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const innerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    let raf = 0;
    let engaged = false;

    const onMove = (e: globalThis.MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        // Distance du curseur au rectangle du bouton (0 s'il est dessus).
        const dxEdge = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
        const dyEdge = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
        const distance = Math.hypot(dxEdge, dyEdge);

        if (distance > MAGNET_RADIUS) {
          if (engaged) {
            engaged = false;
            el.style.transition =
              "transform .5s cubic-bezier(0.34, 1.56, 0.64, 1)";
            el.style.transform = "translate(0, 0)";
          }
          return;
        }

        engaged = true;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // L'attraction s'estompe à mesure qu'on approche du bord du rayon.
        const pull = 1 - distance / MAGNET_RADIUS;
        el.style.transition = "transform .15s ease-out";
        el.style.transform = `translate(${(e.clientX - cx) * 0.18 * pull}px, ${
          (e.clientY - cy) * 0.28 * pull
        }px)`;
      });
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  return (
    <span className="inline-block">
      {href ? (
        <a
          ref={innerRef as never}
          href={href}
          onClick={onClick}
          className={cls}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      ) : (
        <button
          ref={innerRef as never}
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={cls}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </span>
  );
}
