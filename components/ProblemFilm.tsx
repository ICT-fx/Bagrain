"use client";

import { useLang } from "@/components/LangProvider";
import LoopFilm from "@/components/ui/LoopFilm";

/**
 * Séquence bouclée du sac, posée à droite du titre du problème (retirée de la
 * page pour l'instant — voir Problem).
 *
 * La source est un rendu de 443 images en 30 fps ; le raccord de boucle est
 * un fondu enchaîné de 9 images entre la fin et le début, donc la reprise ne
 * se voit pas et il n'y a ni écran noir ni coupe franche.
 */
export default function ProblemFilm() {
  const { t } = useLang();
  return (
    <LoopFilm
      src="/video/capuche-film.mp4"
      poster="/img/capuche-film-poster.webp"
      width={864}
      height={1080}
      alt={t.problem.film.alt}
      playLabel={t.problem.film.play}
      pauseLabel={t.problem.film.pause}
      className="aspect-[4/5] w-full"
    />
  );
}
