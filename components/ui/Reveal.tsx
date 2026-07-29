"use client";

import { type CSSProperties, type ReactNode } from "react";
import { useInView } from "./useInView";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai en millisecondes avant la transition. */
  delay?: number;
  as?: "div" | "section" | "li" | "figure" | "article";
  /**
   * Marge de déclenchement de l'IntersectionObserver.
   * Par défaut −25 % : l'élément se révèle au passage à 75 % du viewport.
   */
  rootMargin?: string;
  /**
   * Révélation par animation CSS pure, sans observer ni hydratation.
   * À utiliser pour ce qui est visible dès le chargement (le hero) :
   * le contenu est peint sans attendre l'exécution du JavaScript.
   */
  onLoad?: boolean;
};

/** Opacité 0→1 + translateY(32px→0), une seule fois, jamais rejoué. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  rootMargin,
  onLoad = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>(rootMargin);

  if (onLoad) {
    return (
      <Tag
        className={`enter ${className}`}
        style={{ "--enter-delay": `${delay}ms` } as CSSProperties}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={
        delay ? ({ transitionDelay: `${delay}ms` } as CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
