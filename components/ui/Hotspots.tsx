"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Hotspot = {
  id: string;
  /** Position du point, en % du cadre (depuis la gauche). */
  x: number;
  /** Position du point, en % du cadre (depuis le haut). */
  y: number;
  title: string;
  text: string;
  /** Bande horizontale (en % du cadre) que la bulle ne doit pas quitter. */
  zone?: { left: number; right: number };
};

/** Marge minimale entre la bulle et le bord du cadre (ou de sa zone). */
const EDGE = 8;
/** Distance du centre du point au bord de la bulle : le point reste dégagé. */
const GAP = 16;
/** En dessous de cette largeur, une bulle posée à côté du point passe dessous. */
const SIDE_MIN = 200;

type Placement = { left: number; top: number; width: number };

/**
 * Cherche une place pour la bulle, dans l'ordre : à côté du point (du côté
 * qui a le plus de place), dessous, dessus. Chaque essai mesure la bulle à
 * la largeur envisagée, puisque sa hauteur en dépend.
 *
 * Si rien ne tient (cadre minuscule), la bulle est ramenée dans le cadre ;
 * le point actif passe alors au-dessus d'elle (z-index), il n'est jamais
 * masqué.
 */
function place(bubble: HTMLElement, W: number, H: number, p: Hotspot): Placement {
  const px = (p.x / 100) * W;
  const py = (p.y / 100) * H;
  const zl = ((p.zone?.left ?? 0) / 100) * W + EDGE;
  const zr = ((p.zone?.right ?? 100) / 100) * W - EDGE;
  const preferred = W >= 520 ? 272 : 244;

  const measure = (w: number) => {
    bubble.style.width = `${w}px`;
    return bubble.offsetHeight;
  };
  const clampTop = (top: number, h: number) =>
    Math.max(EDGE, Math.min(top, H - EDGE - h));

  // À côté du point : seulement si la place suffit à une bulle lisible.
  const roomRight = zr - (px + GAP);
  const roomLeft = px - GAP - zl;
  const sides = roomRight >= roomLeft ? ["right", "left"] : ["left", "right"];
  for (const side of sides) {
    const room = side === "right" ? roomRight : roomLeft;
    if (room < SIDE_MIN) continue;
    const width = Math.min(preferred, room);
    const h = measure(width);
    if (h > H - 2 * EDGE) continue;
    return {
      left: side === "right" ? px + GAP : px - GAP - width,
      top: clampTop(py - h / 2, h),
      width,
    };
  }

  // Dessous, sinon dessus : la bulle reste dans sa zone horizontale.
  const width = Math.max(0, Math.min(preferred, zr - zl));
  const h = measure(width);
  const left = Math.max(zl, Math.min(px - width / 2, zr - width));
  if (py + GAP + h <= H - EDGE) return { left, top: py + GAP, width };
  if (py - GAP - h >= EDGE) return { left, top: py - GAP - h, width };

  const below = H - py >= py;
  return { left, top: clampTop(below ? py + GAP : py - GAP - h, h), width };
}

type Props = {
  points: readonly Hotspot[];
  openId: string | null;
  setOpenId: Dispatch<SetStateAction<string | null>>;
};

/**
 * Couche de points interactifs posée sur un visuel (elle remplit son parent,
 * qui doit être positionné). Un seul point ouvert à la fois : l'état vit
 * chez le parent, partagé entre toutes les couches de la page.
 *
 * Souris : la bulle s'ouvre au survol. Tactile : au tap, et un tap hors de
 * la bulle la referme. Clavier : au focus, Échap la referme.
 */
export default function Hotspots({ points, openId, setOpenId }: Props) {
  const uid = useId();
  const layerRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastPointer = useRef<string>("mouse");
  // Une bulle ouverte au clavier se referme quand le focus part ; ouverte
  // au doigt ou à la souris, elle attend un tap ailleurs ou la sortie du curseur.
  const openedByKeyboard = useRef(false);

  const open = points.find((p) => p.id === openId) ?? null;

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const bubble = open ? bubbleRefs.current[open.id] : null;
    if (!layer || !open || !bubble) return;
    const layout = () => {
      const pos = place(bubble, layer.clientWidth, layer.clientHeight, open);
      bubble.style.width = `${pos.width}px`;
      bubble.style.left = `${pos.left}px`;
      bubble.style.top = `${pos.top}px`;
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(layer);
    return () => ro.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-hotspot-ui]")) setOpenId(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpenId]);

  return (
    <div ref={layerRef} className="@container absolute inset-0">
      {points.map((p) => {
        const isOpen = p.id === openId;
        const bubbleId = `${uid}-${p.id}`;
        return (
          <button
            key={p.id}
            type="button"
            data-hotspot-ui=""
            data-open={isOpen || undefined}
            aria-label={p.title}
            aria-describedby={bubbleId}
            /* 44 × 44 px de zone de tap autour d'une pastille de 14 px. */
            className={`hotspot absolute size-11 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              isOpen ? "z-30" : "z-10"
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onPointerDown={(e) => {
              lastPointer.current = e.pointerType;
            }}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              openedByKeyboard.current = false;
              setOpenId(p.id);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              setOpenId((v) => (v === p.id ? null : v));
            }}
            onClick={(e) => {
              // Souris : le survol a déjà ouvert la bulle, le clic la garde.
              // Tap ou Entrée : bascule.
              if (e.detail !== 0 && lastPointer.current === "mouse") {
                openedByKeyboard.current = false;
                setOpenId(p.id);
                return;
              }
              openedByKeyboard.current = e.detail === 0;
              setOpenId((v) => (v === p.id ? null : p.id));
            }}
            onFocus={(e) => {
              if (!e.currentTarget.matches(":focus-visible")) return;
              openedByKeyboard.current = true;
              setOpenId(p.id);
            }}
            onBlur={() => {
              if (!openedByKeyboard.current) return;
              setOpenId((v) => (v === p.id ? null : v));
            }}
          >
            <span aria-hidden="true" className="hotspot-dot" />
          </button>
        );
      })}

      {points.map((p) => (
        <div
          key={p.id}
          id={`${uid}-${p.id}`}
          ref={(el) => {
            bubbleRefs.current[p.id] = el;
          }}
          role="tooltip"
          data-hotspot-ui=""
          hidden={p.id !== openId}
          className="hotspot-bubble absolute z-20 rounded-[10px] border border-[rgba(242,245,251,0.12)] bg-ink/95 px-3 py-2.5 text-left shadow-[0_18px_40px_-12px_rgba(7,14,42,0.6)] @min-[520px]:px-3.5 @min-[520px]:py-3"
        >
          {/* Le titre est déjà le nom du bouton : la description n'en
              reprend que le texte. */}
          <p
            aria-hidden="true"
            className="font-mono text-[10.5px] uppercase leading-[1.35] tracking-[0.16em] text-haze @min-[520px]:text-[11px]"
          >
            {p.title}
          </p>
          <p className="mt-1 text-[12.5px] leading-[1.4] text-mist/85 @min-[520px]:text-[13.5px] @min-[520px]:leading-[1.45]">
            {p.text}
          </p>
        </div>
      ))}
    </div>
  );
}
