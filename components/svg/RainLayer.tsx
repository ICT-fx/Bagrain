/**
 * Pluie de la séquence « Comment ça marche », dans le repère de BagFigure
 * (viewBox 640 × 780) : posée derrière les rendus, elle est masquée par la
 * silhouette et reste continue pendant les fondus entre étapes.
 * Animation 100 % CSS ; en mouvement réduit, les gouttes restent figées.
 */

const DROP_COUNT = 95;

/** Tirage pseudo-aléatoire déterministe : même rendu serveur et client. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

const rand = seeded(20260914);
const DROPS = Array.from({ length: DROP_COUNT }, () => ({
  x: Math.round(rand() * 720),
  // Départ juste au-dessus du cadre : la chute traverse toute la hauteur,
  // le délai négatif répartit les gouttes dans le temps.
  y: Math.round(-40 - rand() * 30),
  len: Math.round(21 + rand() * 25),
  duration: (0.56 + rand() * 0.4).toFixed(2),
  delay: (-rand() * 1).toFixed(2),
  opacity: (0.26 + rand() * 0.37).toFixed(2),
}));

export default function RainLayer({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 780" className={className} aria-hidden="true">
      <g stroke="#7fa5f5" strokeWidth="1.45" strokeLinecap="round">
        {DROPS.map((d, i) => (
          <line
            key={i}
            className="rain-drop"
            x1={d.x}
            y1={d.y}
            x2={d.x - d.len * 0.18}
            y2={d.y + d.len}
            strokeOpacity={d.opacity}
            style={{
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
