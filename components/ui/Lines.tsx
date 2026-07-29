"use client";

import { type CSSProperties } from "react";
import { useInView } from "./useInView";

type LinesProps = {
  lines: readonly string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Décalage entre lignes, ms. */
  stagger?: number;
  /** Délai initial, ms. */
  delay?: number;
  /**
   * Révélation par animation CSS pure, sans observer ni hydratation —
   * pour les titres visibles dès le chargement (le h1 du hero).
   */
  onLoad?: boolean;
};

/**
 * Révélation d'un titre ligne par ligne : chaque ligne monte de 110 %
 * derrière un masque overflow:hidden. Jamais lettre par lettre.
 */
export default function Lines({
  lines,
  className = "",
  as: Tag = "h2",
  stagger = 90,
  delay = 0,
  onLoad = false,
}: LinesProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>();

  const content = lines.map((line, i) => (
    <span key={i} className="line-mask">
      <span
        style={
          { "--line-delay": `${delay + i * stagger}ms` } as CSSProperties
        }
      >
        {line}
      </span>
    </span>
  ));

  if (onLoad) {
    return <Tag className={`enter-lines ${className}`}>{content}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={`${inView ? "is-in" : ""} ${className}`}>
      {content}
    </Tag>
  );
}
