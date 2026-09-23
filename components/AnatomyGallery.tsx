"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { useLang } from "@/components/LangProvider";
import Hotspots, { type Hotspot } from "@/components/ui/Hotspots";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * Points interactifs des visuels — à ajuster ici, le rendu suit.
 *
 * `x` / `y` : position du point en % du cadre du visuel (x depuis la gauche,
 * y depuis le haut). Sur le visuel « sac », le cadre englobe les deux vues
 * côte à côte : de 0 à 49 % le sac de dos, de 51 à 100 % le sac de face.
 * `zone` : bande (en % du cadre) que la bulle ne doit pas quitter.
 */

/** Chaque bulle reste sur son sac : celles du sac de dos ne débordent jamais
    sur le sac de face (et inversement). */
const SAC_GAUCHE = { left: 0, right: 53.5 };
const SAC_DROIT = { left: 46.5, right: 100 };

const HOTSPOTS: {
  shot: "capuche" | "sac";
  id: string;
  x: number;
  y: number;
  zone?: { left: number; right: number };
  fr: { title: string; text: string };
  en: { title: string; text: string };
}[] = [
  // ——— Visuel 1 : capuche déployée sous la pluie ———
  {
    shot: "capuche",
    id: "capuche-integree", // 1
    x: 40,
    y: 28,
    fr: {
      title: "Capuche intégrée",
      text: "Elle se déploie en un geste et laisse les mains libres. Plus besoin d’accessoires pour se protéger.",
    },
    en: {
      title: "Integrated hood",
      text: "Deploys in a single move and leaves your hands free. No more accessories needed to stay covered.",
    },
  },
  {
    shot: "capuche",
    id: "protection-nuque", // 2
    x: 42,
    y: 56,
    fr: {
      title: "Protection nuque",
      text: "La capuche descend sur la nuque : la pluie ne passe pas par le col.",
    },
    en: {
      title: "Neck protection",
      text: "The hood comes down over the back of your neck: rain can’t get in at the collar.",
    },
  },

  // ——— Visuel 2, sac de gauche (vu de dos) ———
  {
    shot: "sac",
    id: "sangles-capuche", // 3
    x: 20,
    y: 10,
    zone: SAC_GAUCHE,
    fr: {
      title: "Sangles de sortie de capuche",
      text: "Deux sangles pour déployer la capuche d’un seul geste.",
    },
    en: {
      title: "Hood deployment straps",
      text: "Two straps to deploy the hood in a single move.",
    },
  },
  {
    shot: "sac",
    id: "aimants-sangles", // 4
    x: 19,
    y: 21,
    zone: SAC_GAUCHE,
    fr: {
      title: "Aimants de fixation des sangles",
      text: "Deux attaches magnétiques placent les sangles à portée de main.",
    },
    en: {
      title: "Magnetic strap fasteners",
      text: "Two magnetic fasteners keep the straps within easy reach.",
    },
  },
  {
    shot: "sac",
    id: "poche-rfid", // 5
    x: 16,
    y: 35,
    zone: SAC_GAUCHE,
    fr: {
      title: "Poche à carte anti-RFID",
      text: "Une doublure isolée des ondes : tes cartes bancaires restent à l’abri du sans-contact frauduleux.",
    },
    en: {
      title: "RFID-blocking card pocket",
      text: "A signal-blocking lining keeps your bank cards safe from contactless fraud.",
    },
  },
  {
    shot: "sac",
    id: "dos-aere", // 6
    x: 23,
    y: 45,
    zone: SAC_GAUCHE,
    fr: {
      title: "Dos technique aéré",
      text: "Mousse haute densité et canaux de ventilation pour un dos toujours bien aéré.",
    },
    en: {
      title: "Breathable technical back panel",
      text: "High-density foam and ventilation channels for a back that always stays well aired.",
    },
  },
  {
    shot: "sac",
    id: "boucles-reglage", // 7
    x: 19,
    y: 77,
    zone: SAC_GAUCHE,
    fr: {
      title: "Boucles métalliques de réglage rapide",
      text: "Pour un ajustement facile et une tenue à toute épreuve.",
    },
    en: {
      title: "Quick-adjust metal buckles",
      text: "For effortless adjustment and a hold that never gives way.",
    },
  },

  // ——— Visuel 2, sac de droite (vu de face) ———
  {
    shot: "sac",
    id: "rangement-capuche", // 8
    x: 68,
    y: 13.8, // sur la bande noire de la poche capuche
    zone: SAC_DROIT,
    fr: {
      title: "Rangement de la capuche",
      text: "Repliée, elle disparaît entièrement dans une poche qui protège le sac des intempéries.",
    },
    en: {
      title: "Hood storage",
      text: "Folded away, it disappears completely into a pocket that shields the bag from the weather.",
    },
  },
  {
    shot: "sac",
    id: "textile-etanche", // 9
    x: 68,
    y: 64,
    zone: SAC_DROIT,
    fr: {
      title: "Textile étanche",
      text: "Tissu étanche, enduit sur ses deux faces.",
    },
    en: {
      title: "Waterproof fabric",
      text: "Waterproof fabric, coated on both sides.",
    },
  },
  {
    shot: "sac",
    id: "poche-frontale", // 10
    x: 66,
    y: 45.2,
    zone: SAC_DROIT,
    fr: {
      title: "Accès poche frontale",
      text: "Un zip étanche et un accès rapide à ce qui doit rester sous la main.",
    },
    en: {
      title: "Front pocket access",
      text: "A waterproof zip and quick access to everything you need close at hand.",
    },
  },
  {
    shot: "sac",
    id: "poche-laterale", // 12
    x: 94.4,
    y: 64,
    zone: SAC_DROIT,
    fr: {
      title: "Poche latérale",
      text: "Deux poches latérales dont une avec une poche secrète.",
    },
    en: {
      title: "Side pocket",
      text: "Two side pockets, one of them with a hidden pocket.",
    },
  },
];

/**
 * Les visuels du sac, empilés : la section reste fixée le temps que le scroll
 * passe du premier au dernier. En mouvement réduit, ils se suivent
 * simplement les uns sous les autres.
 *
 * Les sources sont des JPEG pleine définition : next/image sert un WebP
 * (qualité 90) aux navigateurs qui l'acceptent et le JPEG aux autres, avec
 * un srcset 1x/2x. Aucun filtre, flou ni mise à l'échelle n'est appliqué
 * aux images elles-mêmes — le fondu porte sur le conteneur de l'étape.
 */
const SHOTS = [
  {
    id: "capuche",
    images: [{ src: "/img/anatomie-capuche.jpg", width: 1720, height: 1150, alt: 0 }],
  },
  {
    // Le dos et la face sur le même cadre : deux vues studio, côte à côte.
    id: "sac",
    // Même gabarit pour les deux vues : le sac occupe la même hauteur.
    images: [
      { src: "/img/anatomie-dos-v10.jpg", width: 1104, height: 1489, alt: 2 },
      { src: "/img/anatomie-face-v6.jpg", width: 1033, height: 1312, alt: 1 },
    ],
  },
] as const;

type Shot = (typeof SHOTS)[number];

/** Largeur d'affichage réelle : la colonne de 860 px, moins la gouttière. */
const SIZES_SINGLE = "(min-width: 900px) 860px, calc(100vw - 48px)";
/** Sur téléphone, la paire de vues prend toute la largeur de l'écran. */
const SIZES_PAIR = "(min-width: 900px) 422px, 50vw";

/** Écart entre les deux vues, en part de la largeur d'une vue (16 px sur 422). */
const PAIR_GAP = 0.038;

/**
 * Cadre d'un visuel : un rectangle aux proportions fixes, dans lequel chaque
 * image a sa place en %. Les points, eux aussi en %, suivent donc l'image à
 * toutes les tailles d'écran. Deux vues : même largeur, la moins haute est
 * centrée verticalement.
 */
function frameOf(shot: Shot) {
  const heights = shot.images.map((img) => img.height / img.width);
  const H = Math.max(...heights);
  const W = shot.images.length + PAIR_GAP * (shot.images.length - 1);
  return {
    ratio: W / H,
    boxes: heights.map((h, i) => ({
      left: `${((i * (1 + PAIR_GAP)) / W) * 100}%`,
      top: `${((H - h) / 2 / H) * 100}%`,
      width: `${(1 / W) * 100}%`,
      height: `${(h / H) * 100}%`,
    })),
  };
}

const SHOT_OF: Record<string, string> = Object.fromEntries(
  HOTSPOTS.map((h) => [h.id, h.shot]),
);

export default function AnatomyGallery() {
  const { t, lang } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState<boolean | null>(null);
  // Un seul point ouvert sur toute la galerie.
  const [openId, setOpenId] = useState<string | null>(null);

  const points = useMemo(() => {
    const byShot: Record<string, Hotspot[]> = {};
    for (const h of HOTSPOTS) {
      (byShot[h.shot] ??= []).push({
        id: h.id,
        x: h.x,
        y: h.y,
        zone: h.zone,
        title: h[lang].title,
        text: h[lang].text,
      });
    }
    return byShot;
  }, [lang]);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let current = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const run = wrap.offsetHeight - window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, -rect.top / run));
      // Chaque visuel occupe sa part de course ; bornée, la position
      // garde le premier et le dernier pleins à l'entrée et à la sortie.
      const u = Math.min(SHOTS.length - 0.5, Math.max(0.5, p * SHOTS.length));
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = u - (i + 0.5);
        const o = Math.max(0, Math.min(1, 1 - Math.max(0, Math.abs(d) - 0.28) / 0.32));
        el.style.opacity = String(o);
        el.style.transform = `translateY(${d * -28}px)`;
      });
      const step = Math.min(SHOTS.length - 1, Math.floor(p * SHOTS.length));
      if (step !== current) {
        current = step;
        setActive(step);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Le visuel change au scroll : une bulle restée ouverte sur l'autre se ferme.
  useEffect(() => {
    if (reduced !== false) return;
    setOpenId((v) => (v && SHOT_OF[v] !== SHOTS[active].id ? null : v));
  }, [active, reduced]);

  /**
   * Au clavier, un point du visuel masqué reçoit le focus : on fait défiler
   * jusqu'à la position où son visuel est affiché.
   */
  const reveal = (i: number) => {
    const wrap = wrapRef.current;
    if (reduced !== false || i === active || !wrap) return;
    const run = wrap.offsetHeight - window.innerHeight;
    const top =
      window.scrollY +
      wrap.getBoundingClientRect().top +
      run * ((i + 0.5) / SHOTS.length);
    if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true });
    else window.scrollTo({ top, behavior: "auto" });
  };

  const alts = t.anatomy.shotAlt as readonly string[];

  const frame = (shot: Shot) => {
    const pair = shot.images.length > 1;
    const { ratio, boxes } = frameOf(shot);
    return (
      <div
        /* Aucun cadre : le fond de la section est déjà clair, les visuels
           studio posent directement dessus. */
        className={`anatomy-frame ${pair ? "anatomy-frame--bleed" : ""}`}
        style={{ "--ar": ratio } as CSSProperties}
      >
        {shot.images.map((img, j) => (
          <div
            key={img.src}
            className="absolute overflow-hidden rounded-[14px]"
            style={boxes[j]}
          >
            <Image
              src={img.src}
              alt={alts[img.alt] ?? ""}
              fill
              sizes={pair ? SIZES_PAIR : SIZES_SINGLE}
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
        <Hotspots
          points={points[shot.id] ?? []}
          openId={openId}
          setOpenId={setOpenId}
        />
      </div>
    );
  };

  /* ——— Mouvement réduit : les visuels à la suite ——— */
  if (reduced === true) {
    return (
      <div className="mt-8 grid gap-6 sm:mt-10">
        {SHOTS.map((shot) => (
          <div key={shot.id}>{frame(shot)}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="relative mt-8 h-[175vh] sm:mt-10">
      <div className="sticky top-[calc(var(--nav-h)+16px)] flex h-[calc(100dvh-var(--nav-h)-32px)] items-center">
        <div className="relative w-full">
          {SHOTS.map((shot, i) => (
            <div
              key={shot.id}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              /* Seul le visuel affiché reçoit le survol et les taps ; les
                 points de l'autre restent atteignables au clavier. */
              className={`${
                i === 0 ? "" : "absolute inset-0 flex flex-col justify-center"
              } ${active === i ? "" : "pointer-events-none"}`}
              style={{ opacity: i === 0 ? 1 : 0 }}
              onFocus={() => reveal(i)}
            >
              {frame(shot)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
