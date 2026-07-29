"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/animations";

type Drop = {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  drift: number;
};

type Splash = { x: number; y: number; vx: number; vy: number; life: number };

type RainCanvasProps = {
  /** Élément abri : c'est sa silhouette qui intercepte les gouttes. */
  shelterRef: RefObject<HTMLElement | null>;
  /**
   * Ligne de crête de l'abri, en fraction de sa hauteur, échantillonnée de
   * gauche à droite. `1` = colonne à découvert.
   */
  profile: readonly number[];
  /**
   * Décalage courant de l'abri, en pixels — la parallaxe souris déplace le
   * produit sans que le layout bouge. On lit la valeur partagée plutôt que
   * de re-mesurer l'élément à chaque frame, ce qui forcerait un recalcul de
   * style en plein rAF.
   */
  offsetRef?: RefObject<{ x: number; y: number }>;
  className?: string;
};

const MAX_SPLASHES = 120;

/**
 * Pluie animée plein cadre, arrêtée par la silhouette du produit.
 * Chaque goutte qui atteint la crête du sac est interceptée et rebondit :
 * l'abri se dessine par l'absence de pluie, sans qu'aucun dôme ne soit
 * tracé. En mouvement réduit : image fixe (SVG), aucun canvas.
 */
export default function RainCanvas({
  shelterRef,
  profile,
  offsetRef,
  className = "",
}: RainCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (reduced !== false) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let drops: Drop[] = [];
    const splashes: Splash[] = [];
    let raf = 0;
    let running = true;
    let visible = true;

    // Boîte de l'abri dans le repère du canvas.
    let shelter: { x: number; y: number; w: number; h: number } | null = null;
    const n = profile.length;

    const measureShelter = () => {
      const el = shelterRef.current;
      if (!el) {
        shelter = null;
        return;
      }
      const r = el.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      shelter = {
        x: r.left - c.left,
        y: r.top - c.top,
        w: r.width,
        h: r.height,
      };
    };

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const prevW = w;
      const prevH = h;
      const nextW = rect.width;
      const nextH = rect.height;
      // Sur mobile, l'apparition de la barre d'URL déclenche un resize à
      // chaque scroll : sans ce garde-fou la pluie se réinitialise.
      if (nextW === prevW && nextH === prevH) {
        measureShelter();
        return;
      }

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = nextW;
      h = nextH;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 768 ? 100 : 260;
      if (drops.length === count && prevW > 0 && prevH > 0) {
        // Redimensionnement : on garde les gouttes en place plutôt que
        // de faire réapparaître toute la pluie d'un coup.
        const sx = w / prevW;
        const sy = h / prevH;
        for (const d of drops) {
          d.x *= sx;
          d.y *= sy;
        }
      } else {
        drops = Array.from({ length: count }, () => spawn(true));
      }
      measureShelter();
    };

    // Le resize arrive en rafale : on ne recalcule qu'à la fin du geste.
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 150);
    };

    const spawn = (anywhere = false): Drop => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : -24 - Math.random() * 40,
      len: 8 + Math.random() * 14,
      speed: 7 + Math.random() * 9,
      opacity: 0.15 + Math.random() * 0.3,
      drift: 0.4 + Math.random() * 0.8,
    });

    /** Ordonnée de la crête sous une abscisse donnée, ou null à découvert. */
    const crestAt = (x: number) => {
      if (!shelter) return null;
      const off = offsetRef?.current;
      const u = (x - shelter.x - (off?.x ?? 0)) / shelter.w;
      if (u < 0 || u >= 1) return null;
      const t = profile[Math.min(n - 1, (u * n) | 0)];
      if (t >= 1) return null;
      return shelter.y + (off?.y ?? 0) + t * shelter.h;
    };

    const frame = () => {
      if (!running || !visible) return;
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      for (const d of drops) {
        d.y += d.speed;
        d.x += d.drift;
        if (d.y - d.len > h || d.x > w + 20) {
          Object.assign(d, spawn());
          continue;
        }
        const crest = crestAt(d.x);
        if (crest !== null && d.y >= crest) {
          // La goutte percute le sac : elle éclabousse et repart d'en haut.
          if (splashes.length < MAX_SPLASHES && Math.random() < 0.5) {
            splashes.push({
              x: d.x,
              y: crest,
              vx: (Math.random() - 0.5) * 2.4,
              vy: -1 - Math.random() * 1.6,
              life: 1,
            });
          }
          Object.assign(d, spawn());
          continue;
        }
        ctx.strokeStyle = `rgba(191, 209, 244, ${d.opacity})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.drift * 1.6, d.y - d.len);
        ctx.stroke();
      }

      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.16;
        s.life -= 0.045;
        if (s.life <= 0) {
          splashes.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(191, 209, 244, ${s.life * 0.5})`;
        ctx.fillRect(s.x, s.y, 1.4, 1.4);
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf) cancelAnimationFrame(raf);
      if (running && visible) raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      start();
    };

    resize();
    // Le produit apparaît avec un léger délai d'entrée : re-mesurer ensuite.
    const remeasure = window.setTimeout(measureShelter, 1200);
    start();

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      start();
    });
    io.observe(canvas);

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(remeasure);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced, shelterRef, profile, offsetRef]);

  // Image fixe pour prefers-reduced-motion : traits de pluie déterministes.
  if (reduced === true) {
    return (
      <svg
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full ${className}`}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        {Array.from({ length: 70 }, (_, i) => {
          const x = (i * 61.8) % 100;
          const y = (i * 37.3) % 100;
          const len = 1.2 + (i % 5) * 0.5;
          const o = 0.12 + (i % 4) * 0.07;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x - 0.3}
              y2={y - len}
              stroke={`rgba(191,209,244,${o})`}
              strokeWidth="0.12"
            />
          );
        })}
      </svg>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
        reduced === false ? "opacity-70" : "opacity-0"
      } ${className}`}
    />
  );
}
