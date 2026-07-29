"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import { useInView } from "@/components/ui/useInView";

const FILM = {
  src: "/video/capuche-film.mp4",
  poster: "/img/capuche-film-poster.webp",
  width: 864,
  height: 1080,
};

/**
 * Séquence bouclée du sac, posée à droite du titre du problème.
 *
 * La source est un rendu de 443 images en 30 fps ; le raccord de boucle est
 * un fondu enchaîné de 9 images entre la fin et le début, donc la reprise ne
 * se voit pas et il n'y a ni écran noir ni coupe franche.
 *
 * Rien n'est téléchargé tant que la section n'est pas entrée à l'écran
 * (`preload="none"`, lecture déclenchée par l'observer) : un visiteur qui ne
 * descend jamais jusqu'ici ne paie pas les 1,3 Mo du fichier. Le décodage
 * s'arrête dès que la vidéo sort du champ, et elle repart de sa première
 * image quand on revient dessus — jamais attrapée en cours de route.
 */
export default function ProblemFilm() {
  const { t } = useLang();
  const { ref: figRef, inView } = useInView<HTMLElement>();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intention de lecture, pas état réel : l'observer met en pause hors champ
  // sans que le bouton change de libellé.
  //
  // `null` tant que la préférence de mouvement n'est pas lue : sans cet état
  // d'attente, le premier rendu lançait la lecture — donc le téléchargement
  // du fichier — avant d'être annulé une frame plus tard.
  const [wanted, setWanted] = useState<boolean | null>(null);

  // La séquence a-t-elle quitté l'écran depuis la dernière lecture ? Sert à
  // décider entre « repartir du début » et « reprendre où on en était ».
  const wasOut = useRef(true);

  // Mouvement réduit : la séquence reste sur son image fixe jusqu'à ce que le
  // visiteur la lance lui-même. Lu après le montage, jamais pendant le rendu
  // serveur.
  useEffect(() => {
    setWanted(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || wanted === null) return;

    if (!wanted) {
      el.pause();
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      void el.play().catch(() => {});
      return;
    }

    // Deux seuils plutôt qu'un, pour éviter de relancer sans arrêt quand on
    // oscille sur le bord : la lecture démarre quand 40 % du cadre est à
    // l'écran, et ne s'arrête que lorsqu'il en est quasiment sorti.
    //
    // Aucune marge d'avance non plus : sur une fenêtre de 900px de haut, la
    // vidéo n'est qu'à 141px sous le pli, et la moindre marge déclenchait le
    // téléchargement dès l'arrivée sur la page. Le poster est exactement la
    // première image du fichier, donc démarrer une demi-seconde après
    // l'entrée à l'écran ne se voit pas — le cadre ne saute pas.
    const io = new IntersectionObserver(
      (entries) => {
        const ratio = entries[entries.length - 1].intersectionRatio;

        if (ratio >= 0.4) {
          if (!el.paused) return;
          // Reprise au premier plan uniquement si on revient de l'extérieur :
          // la séquence raconte quelque chose dans l'ordre (gros plans → rue
          // sous la pluie → capuche qui se déploie), l'attraper au milieu ne
          // veut rien dire. En revanche, relancer après une pause volontaire
          // sans avoir quitté la section reprend là où on s'était arrêté.
          if (wasOut.current) el.currentTime = 0;
          wasOut.current = false;
          void el.play().catch(() => {});
        } else if (ratio <= 0.02) {
          wasOut.current = true;
          el.pause();
        }
      },
      { threshold: [0, 0.02, 0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wanted]);

  return (
    <figure
      ref={figRef}
      aria-label={t.problem.film.alt}
      className="relative overflow-hidden rounded-[14px] border border-[rgba(242,245,251,0.08)] bg-ink-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]"
    >
      <video
        ref={videoRef}
        className={`desat ${inView ? "is-in" : ""} block aspect-[4/5] w-full object-cover`}
        src={FILM.src}
        poster={FILM.poster}
        width={FILM.width}
        height={FILM.height}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
      />

      {/* La vidéo se coupe net sur le bord : un filet interne la raccroche à
          la nuit de la section, comme le cadre des autres visuels. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[14px] ring-1 ring-inset ring-[rgba(242,245,251,0.06)]"
      />

      {/* WCAG 2.2.2 : une animation qui tourne plus de 5 secondes doit pouvoir
          être arrêtée. Discret sur le coin sombre, plein contraste au survol
          et au focus clavier. */}
      <button
        type="button"
        onClick={() => setWanted((w) => w === false)}
        aria-label={wanted === false ? t.problem.film.play : t.problem.film.pause}
        className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-full border border-[rgba(242,245,251,0.16)] bg-ink/50 text-mist/70 opacity-60 backdrop-blur-sm transition duration-300 hover:bg-ink/80 hover:text-mist hover:opacity-100 focus-visible:opacity-100"
      >
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
          {wanted !== false ? (
            <g fill="currentColor">
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
            </g>
          ) : (
            <path fill="currentColor" d="M4.5 2.6 13 8l-8.5 5.4Z" />
          )}
        </svg>
      </button>
    </figure>
  );
}
