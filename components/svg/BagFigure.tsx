/**
 * Rendu placeholder « dessin technique » du sac BAGRAIN porté, vu de profil.
 * 4 étapes de déploiement de la capuche. À remplacer par la séquence
 * d'images réelle (voir README) — l'API du composant restera identique.
 */

const C = {
  body: "#0d1740",
  bodyStroke: "rgba(242,245,251,0.14)",
  bagTop: "#383d44",
  bagBottom: "#24282c",
  hood: "#1b2027",
  hoodStroke: "rgba(242,245,251,0.2)",
  lining: "#b9be86",
  piping: "rgba(127,165,245,0.55)",
  strap: "#20252c",
  metal: "#d8dce3",
  hairline: "rgba(242,245,251,0.16)",
};

export type Stage = 1 | 2 | 3 | 4;

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
        d="M360 312 C358 300 364 292 374 290 L492 290 C506 292 512 302 512 316 L512 610 C512 632 498 644 478 644 L392 644 C372 644 360 632 360 610 Z"
        fill={`url(#${uid}-bag)`}
        stroke={C.hairline}
        strokeWidth="1.5"
      />
      {/* Partie haute texturée */}
      <path
        d="M360 312 C358 300 364 292 374 290 L492 290 C506 292 512 302 512 316 L512 400 L360 400 Z"
        fill={`url(#${uid}-tex)`}
      />
      <line
        x1="360"
        y1="400"
        x2="512"
        y2="400"
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
      <rect x="360" y="468" width="152" height="30" fill="rgba(0,0,0,0.22)" />
      <line
        x1="360"
        y1="472"
        x2="512"
        y2="472"
        stroke={C.hairline}
        strokeWidth="1"
        strokeDasharray="4 5"
      />
      <line
        x1="360"
        y1="494"
        x2="512"
        y2="494"
        stroke={C.hairline}
        strokeWidth="1"
        strokeDasharray="4 5"
      />

      {/* Écusson logo */}
      <g>
        <rect x="466" y="556" width="28" height="28" rx="3" fill="#1544d6" />
        <path d="M471 573a9 9 0 0 1 18 0Z" fill="#f2f5fb" />
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
          {/* Capot légèrement entrouvert : trait de doublure */}
          <path
            d="M366 306 C390 282 484 282 506 310"
            fill="none"
            stroke={C.lining}
            strokeWidth="1.6"
            strokeOpacity="0.65"
          />
          {/* Les deux crochets à saisir */}
          <g
            fill="none"
            stroke="#7fa5f5"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M388 284 v-12 a7 7 0 0 1 14 0" />
            <path d="M462 280 v-12 a7 7 0 0 1 14 0" />
          </g>
        </g>
      )}

      {stage === 2 && (
        <g>
          {/* Capuche en cours de déploiement : bande qui arque vers la tête */}
          <path
            d="M505 302 C482 192 386 136 296 141 C263 144 240 161 228 186 L256 207 C266 190 284 180 306 179 C376 176 450 216 470 304 Z"
            fill={C.hood}
            stroke={C.hoodStroke}
            strokeWidth="1.5"
          />
          {/* Bord intérieur : la doublure affleure */}
          <path
            d="M256 207 C266 190 284 180 306 179 C376 176 450 216 470 304"
            fill="none"
            stroke={C.lining}
            strokeWidth="2"
            strokeOpacity="0.75"
          />
          {/* Mouvement circulaire des sangles */}
          <g fill="none" stroke="#7fa5f5" strokeWidth="1.5" opacity="0.8">
            <path d="M540 250 C525 150 420 92 315 98" strokeDasharray="4 7" />
            <path d="M315 98 l14 -8 m-14 8 l16 6" strokeDasharray="none" />
          </g>
        </g>
      )}

      {(stage === 3 || stage === 4) && (
        <g>
          {/* Dôme complet sur la tête */}
          <path
            fillRule="evenodd"
            d={
              stage === 3
                ? "M206 302 C198 192 224 96 300 82 C380 68 442 140 454 242 C458 268 460 288 460 302 L432 306 C400 300 380 300 360 306 L206 302 M245 143 C284 130 320 152 316 220 C313 272 288 296 254 292 C222 288 206 258 210 214 C213 180 224 150 245 143"
                : "M206 308 C196 196 222 96 300 82 C380 68 444 140 456 244 C460 270 462 292 462 306 L434 310 C402 304 382 304 362 310 L206 308 M258 176 C284 168 302 184 300 226 C298 258 282 274 260 271 C240 268 230 250 233 222 C235 200 243 182 258 176"
            }
            fill={C.hood}
            stroke={C.hoodStroke}
            strokeWidth="1.5"
          />
          {/* Doublure kaki : visible ouverte, discrète fermée */}
          <path
            d={
              stage === 3
                ? "M245 143 C284 130 320 152 316 220 C313 272 288 296 254 292 C222 288 206 258 210 214 C213 180 224 150 245 143"
                : "M258 176 C284 168 302 184 300 226 C298 258 282 274 260 271 C240 268 230 250 233 222 C235 200 243 182 258 176"
            }
            fill="none"
            stroke={C.lining}
            strokeWidth={stage === 3 ? 5 : 2.5}
            strokeOpacity={stage === 3 ? 0.9 : 0.5}
          />
          {/* Plaque PE : arête rigide autour du visage */}
          <path
            d="M232 118 C270 100 320 106 346 140"
            fill="none"
            stroke={C.hairline}
            strokeWidth="1.2"
          />

          {stage === 3 && (
            <g>
              {/* Sangles pendantes, prêtes à être tirées */}
              <path
                d="M252 296 C250 330 252 366 258 398"
                stroke={C.hood}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M296 300 C296 336 298 370 304 404"
                stroke={C.hood}
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="258" cy="402" r="5" fill="none" stroke={C.metal} strokeOpacity="0.55" strokeWidth="2" />
              <circle cx="304" cy="408" r="5" fill="none" stroke={C.metal} strokeOpacity="0.55" strokeWidth="2" />
            </g>
          )}

          {stage === 4 && (
            <g>
              {/* Fermeture avant : couture + aimants joints */}
              <path
                d="M262 282 C260 300 260 318 262 336"
                fill="none"
                stroke="rgba(242,245,251,0.28)"
                strokeWidth="1.4"
              />
              <circle cx="256" cy="310" r="4.5" fill={C.metal} />
              <circle cx="267" cy="310" r="4.5" fill={C.metal} />
              {/* Le « clic » */}
              <g stroke={C.lining} strokeWidth="2" strokeLinecap="round">
                <path d="M243 296 l-8 -7" />
                <path d="M243 324 l-8 7" />
                <path d="M281 296 l8 -7" />
                <path d="M281 324 l8 7" />
              </g>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
