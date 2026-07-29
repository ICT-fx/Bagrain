/**
 * Bord de section en forme de dôme : la transition sombre → clair
 * reprend la forme de l'abri, signature du logo.
 */
export default function DomeEdge({
  fill = "var(--color-mist)",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`dome-divider ${flip ? "-mt-px rotate-180" : "-mb-px"} ${className}`}
    >
      <path
        d="M0 120 L0 102 C420 102 540 8 720 8 C900 8 1020 102 1440 102 L1440 120 Z"
        fill={fill}
      />
    </svg>
  );
}
