/**
 * Rendu placeholder « dessin technique » du sac BAGRAIN porté, vu de profil.
 * 3 étapes de déploiement de la capuche, calquées sur le texte : saisir
 * les tirettes, tirer vers le bas, fermer les aimants sur l'avant.
 * À remplacer par la séquence d'images réelle (voir README) — l'API du
 * composant restera identique.
 */

const C = {
  body: "#0d1740",
  bodyStroke: "rgba(242,245,251,0.14)",
  bagTop: "#383d44",
  bagBottom: "#24282c",
  hood: "#1b2027",
  hoodStroke: "rgba(242,245,251,0.2)",
  lining: "#1544d6",
  piping: "rgba(127,165,245,0.55)",
  strap: "#20252c",
  metal: "#d8dce3",
  hairline: "rgba(242,245,251,0.16)",
  /** Ce que la main manipule : tirettes, aimants, flèches de geste. */
  accent: "#7fa5f5",
  arm: "#1c2a66",
  armEdge: "rgba(242,245,251,0.3)",
  hand: "#2b3b80",
};

/** Bras vu de profil : trait épais arrondi, liseré clair pour le détacher
 *  de la silhouette. */
function Arm({ d }: { d: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={C.armEdge} strokeWidth="31" />
      <path d={d} stroke={C.arm} strokeWidth="28" />
    </g>
  );
}

function Hand({ cx, cy }: { cx: number; cy: number }) {
  return (
    <circle cx={cx} cy={cy} r="15" fill={C.hand} stroke={C.armEdge} strokeWidth="1.5" />
  );
}

/** Petite éclaboussure animée (voir .rain-splash dans globals.css). */
function Splash({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className="rain-splash"
        style={{ animationDelay: `${delay}s` }}
        fill="none"
        stroke={C.accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M-3 0 C-6 -5 -9 -8 -12 -8" />
        <path d="M3 0 C6 -5 9 -8 12 -8" />
        <path d="M0 -2 V-11" />
      </g>
    </g>
  );
}

export type Stage = 1 | 2 | 3;

/** Points d'impact de la pluie, par étape : tête et sac, puis capuche. */
const SPLASHES: Record<Stage, { x: number; y: number; delay: number }[]> = {
  1: [
    { x: 272, y: 148, delay: 0.4 },
    { x: 310, y: 170, delay: 0.1 },
    { x: 400, y: 280, delay: 0.65 },
    { x: 470, y: 280, delay: 0.25 },
    { x: 252, y: 150, delay: 0 },
    { x: 292, y: 158, delay: 0.55 },
    { x: 344, y: 198, delay: 0.3 },
    { x: 440, y: 276, delay: 0.85 },
    { x: 494, y: 290, delay: 0.15 },
  ],
  2: [
    { x: 240, y: 110, delay: 0.35 },
    { x: 300, y: 80, delay: 0.15 },
    { x: 372, y: 100, delay: 0.7 },
    { x: 436, y: 180, delay: 0.05 },
    { x: 270, y: 88, delay: 0 },
    { x: 334, y: 84, delay: 0.6 },
    { x: 410, y: 140, delay: 0.3 },
    { x: 452, y: 228, delay: 0.9 },
    { x: 494, y: 292, delay: 0.45 },
  ],
  3: [
    { x: 236, y: 116, delay: 0.55 },
    { x: 296, y: 82, delay: 0.3 },
    { x: 368, y: 98, delay: 0.1 },
    { x: 438, y: 176, delay: 0.65 },
    { x: 262, y: 94, delay: 0.2 },
    { x: 330, y: 84, delay: 0.75 },
    { x: 404, y: 132, delay: 0 },
    { x: 454, y: 226, delay: 0.5 },
    { x: 494, y: 292, delay: 1 },
  ],
};

type BagFigureProps = {
  stage: Stage;
  className?: string;
  /** Description pour lecteurs d'écran ; vide = décoratif. */
  label?: string;
};

export default function BagFigure({
  stage,
  className = "",
  label,
}: BagFigureProps) {
  const uid = `bf${stage}`;
  return (
    <svg
      viewBox="0 0 640 780"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${uid}-bag`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.bagTop} />
          <stop offset="1" stopColor={C.bagBottom} />
        </linearGradient>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.55" stopColor={C.body} stopOpacity="1" />
          <stop offset="1" stopColor={C.body} stopOpacity="0" />
        </linearGradient>
        <pattern
          id={`${uid}-tex`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1" fill="rgba(242,245,251,0.07)" />
          <circle cx="10" cy="10" r="1" fill="rgba(242,245,251,0.05)" />
        </pattern>
      </defs>

      {/* Ombre portée */}
      <ellipse cx="360" cy="758" rx="190" ry="10" fill="rgba(0,0,0,0.35)" />

      {/* Silhouette : tête, cou, buste (fondu vers le bas) */}
      <g stroke={C.bodyStroke} strokeWidth="1.5">
        <path
          d="M245 292 C222 306 210 342 208 396 C206 452 212 520 220 700 L220 760 L356 760 L354 700 C358 520 364 400 350 332 C344 302 322 292 305 292 Z"
          fill={`url(#${uid}-fade)`}
        />
        <path
          d="M250 256 L302 256 L307 296 L244 296 Z"
          fill={C.body}
          stroke="none"
        />
        <ellipse cx="268" cy="204" rx="50" ry="56" fill={C.body} />
      </g>

      {/* Sac : corps */}
      <path
        d="M360 312 C358 300 364 292 374 290 L492 290 C506 292 512 302 512 316 L512 506 C512 528 498 540 478 540 L392 540 C372 540 360 528 360 506 Z"
        fill={`url(#${uid}-bag)`}
        stroke={C.hairline}
        strokeWidth="1.5"
      />
      {/* Partie haute texturée */}
      <path
        d="M360 312 C358 300 364 292 374 290 L492 290 C506 292 512 302 512 316 L512 380 L360 380 Z"
        fill={`url(#${uid}-tex)`}
      />
      <line
        x1="360"
        y1="380"
        x2="512"
        y2="380"
        stroke={C.hairline}
        strokeWidth="1"
      />

      {/* Capot — poche capuche, avec liseré réfléchissant */}
      <path
        d="M358 304 C382 270 494 270 512 308 L512 318 C488 288 384 288 358 316 Z"
        fill={C.hood}
        stroke={C.hairline}
        strokeWidth="1"
      />
      <path
        d="M358 304 C382 270 494 270 512 308"
        fill="none"
        stroke={C.piping}
        strokeWidth="1.6"
      />

      {/* Sangle valise + surpiqûres */}
      <rect x="360" y="420" width="152" height="28" fill="rgba(0,0,0,0.22)" />
      <line
        x1="360"
        y1="424"
        x2="512"
        y2="424"
        stroke={C.hairline}
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      <line
        x1="360"
        y1="444"
        x2="512"
        y2="444"
        stroke={C.hairline}
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      {/* Écusson logo */}
      <g>
        <rect x="466" y="480" width="28" height="28" rx="3" fill="#1544d6" />
        <path d="M471 497a9 9 0 0 1 18 0Z" fill="#f2f5fb" />
      </g>

      {/* Bretelle visible */}
      <path
        d="M372 298 C338 268 298 258 282 268 C258 281 241 320 237 370 C234 406 236 442 242 472"
        fill="none"
        stroke={C.strap}
        strokeWidth="25"
        strokeLinecap="round"
      />
      <path
        d="M372 298 C338 268 298 258 282 268 C258 281 241 320 237 370 C234 406 236 442 242 472"
        fill="none"
        stroke={C.hairline}
        strokeWidth="1"
        strokeDasharray="3 6"
      />
      {/* Boucle de bretelle */}
      <rect
        x="230"
        y="452"
        width="22"
        height="14"
        rx="2"
        fill="none"
        stroke={C.metal}
        strokeOpacity="0.5"
        strokeWidth="2"
      />

      {/* ——— Étapes ——— */}

      {stage === 1 && (
        <g>
          {/* Capuche encore rangée : trait de doublure sous le capot */}
          <path
            d="M366 306 C390 282 484 282 506 310"
            fill="none"
            stroke={C.lining}
            strokeWidth="1.6"
            strokeOpacity="0.65"
          />
          {/* Les deux tirettes qui dépassent en haut du sac */}
          <g fill={C.accent}>
            <rect x="392" y="254" width="13" height="26" rx="3" />
            <rect x="462" y="252" width="13" height="26" rx="3" />
          </g>
          {/* Trajet de la capuche : du sac, par-dessus la tête */}
          <g fill="none" stroke={C.accent} strokeWidth="1.5" opacity="0.8">
            <path d="M430 236 C412 112 270 80 196 164" strokeDasharray="4 7" />
            <path d="M196 164 l3 -16 m-3 16 l15 -5" />
          </g>
          {/* Le bras passe par-dessus l'épaule, la main saisit la tirette */}
          <Arm d="M298 336 C314 292 332 244 344 212 C362 230 382 250 398 268" />
          <Hand cx={399} cy={268} />
        </g>
      )}

      {(stage === 2 || stage === 3) && (
        <g>
          {/* Dôme sur la tête : ouvert à l'étape 2, fermé à l'étape 3 */}
          <path
            fillRule="evenodd"
            d={
              stage === 2
                ? "M206 302 C198 192 224 96 300 82 C380 68 442 140 454 242 C458 268 460 288 460 302 L432 306 C400 300 380 300 360 306 L206 302 M245 143 C284 130 320 152 316 220 C313 272 288 296 254 292 C222 288 206 258 210 214 C213 180 224 150 245 143"
                : "M206 308 C196 196 222 96 300 82 C380 68 444 140 456 244 C460 270 462 292 462 306 L434 310 C402 304 382 304 362 310 L206 308 M258 176 C284 168 302 184 300 226 C298 258 282 274 260 271 C240 268 230 250 233 222 C235 200 243 182 258 176"
            }
            fill={C.hood}
            stroke={C.hoodStroke}
            strokeWidth="1.5"
          />
          {/* Doublure : visible ouverte, discrète fermée */}
          <path
            d={
              stage === 2
                ? "M245 143 C284 130 320 152 316 220 C313 272 288 296 254 292 C222 288 206 258 210 214 C213 180 224 150 245 143"
                : "M258 176 C284 168 302 184 300 226 C298 258 282 274 260 271 C240 268 230 250 233 222 C235 200 243 182 258 176"
            }
            fill="none"
            stroke={C.lining}
            strokeWidth={stage === 2 ? 5 : 2.5}
            strokeOpacity={stage === 2 ? 0.9 : 0.5}
          />
          {/* Plaque PE : arête rigide autour du visage */}
          <path
            d="M232 118 C270 100 320 106 346 140"
            fill="none"
            stroke={C.hairline}
            strokeWidth="1.2"
          />

          {stage === 2 && (
            <g>
              {/* La sangle part du bord de la capuche jusqu'à la main */}
              <g fill="none" strokeLinecap="round">
                <path d="M210 300 C207 336 210 368 218 396" stroke={C.accent} strokeWidth="9" strokeOpacity="0.55" />
                <path d="M210 300 C207 336 210 368 218 396" stroke={C.strap} strokeWidth="6" />
              </g>
              {/* Aimant libéré de sa position de rangement */}
              <circle cx="209" cy="318" r="11" fill="none" stroke={C.accent} strokeWidth="1.5" />
              <circle cx="209" cy="318" r="5" fill={C.metal} />
              {/* Geste : tirer vers le haut, comme le dit l'étape 1 —
                  la capuche vient alors se déposer au-dessus de la tête. */}
              <g fill="none" stroke={C.accent} strokeWidth="2" strokeLinecap="round">
                <path d="M160 416 V326" strokeDasharray="4 7" />
                <path d="M160 324 l-8 11 m8 -11 l8 11" />
              </g>
              <Arm d="M298 336 C296 380 294 420 292 452 C268 440 244 424 222 404" />
              <Hand cx={220} cy={402} />
            </g>
          )}

          {stage === 3 && (
            <g>
              {/* La main remonte sous le menton et réunit les aimants */}
              <Arm d="M298 336 C296 380 294 420 292 452 C284 412 276 372 268 346" />
              <Hand cx={266} cy={342} />
              <path
                d="M262 282 C260 300 260 318 262 336"
                fill="none"
                stroke="rgba(242,245,251,0.28)"
                strokeWidth="1.4"
              />
              <circle cx="256" cy="310" r="4.5" fill={C.metal} />
              <circle cx="267" cy="310" r="4.5" fill={C.metal} />
              {/* Le « clic » */}
              <g stroke={C.accent} strokeWidth="2" strokeLinecap="round">
                <path d="M243 296 l-8 -7" />
                <path d="M243 324 l-8 7" />
                <path d="M281 296 l8 -7" />
                <path d="M281 324 l8 7" />
              </g>
            </g>
          )}
        </g>
      )}

      {/* La pluie qui tombe sur la silhouette */}
      {SPLASHES[stage].map((sp, i) => (
        <Splash key={i} {...sp} />
      ))}
    </svg>
  );
}
