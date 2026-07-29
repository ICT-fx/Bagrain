"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/components/LangProvider";
import Logo from "@/components/ui/Logo";
import LangSwitch from "@/components/ui/LangSwitch";
import { scrollToAnchor } from "@/lib/scroll";

const SECTION_IDS = ["sac", "solution", "anatomie", "equipe", "salon"];

/** Barre fixe translucide, panneau plein écran sur mobile. */
export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const burgerRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "#sac", label: t.nav.sac },
    { href: "#solution", label: t.nav.how },
    { href: "#anatomie", label: t.nav.anatomy },
    { href: "#equipe", label: t.nav.team },
    { href: "#salon", label: t.nav.salon },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy : le lien de la section visible est souligné.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  /*
   * Menu mobile : verrou de scroll, contenu d'arrière-plan rendu inerte
   * (sans quoi la tabulation continue derrière le panneau opaque) et
   * retour du focus sur le bouton à la fermeture par Escape.
   */
  useEffect(() => {
    const lenis = window.__lenis;
    const background = [
      document.getElementById("contenu"),
      document.querySelector("footer"),
    ];

    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      background.forEach((el) => el?.setAttribute("inert", ""));
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      background.forEach((el) => el?.removeAttribute("inert"));
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      background.forEach((el) => el?.removeAttribute("inert"));
      window.__lenis?.start();
    };
  }, [open]);

  const go = useCallback(
    (hash: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      // Laisser le panneau se fermer avant de défiler.
      requestAnimationFrame(() => {
        scrollToAnchor(hash);
        history.replaceState(null, "", hash);
      });
    },
    [],
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[rgba(242,245,251,0.08)] bg-ink/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ height: "var(--nav-h)" }}
    >
      <div className="container-site flex h-full items-center justify-between gap-6">
        <a
          href="#hero"
          onClick={go("#hero")}
          aria-label={t.a11y.home}
          className="relative z-50 text-mist"
        >
          <Logo />
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label={t.a11y.mainNav}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              aria-current={active === l.href ? "true" : undefined}
              className="nav-link text-[15px] text-mist/75 transition-colors hover:text-mist"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitch />
          <a
            href="#contact"
            onClick={go("#contact")}
            className="rounded-[4px] bg-bagrain px-4 py-2 text-[14px] font-medium text-mist transition-colors hover:bg-[#1a4ff0]"
          >
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          <LangSwitch />
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
            className="relative z-50 flex h-10 w-10 items-center justify-center"
          >
            <span className="relative block h-[14px] w-6">
              <span
                className={`absolute left-0 top-0 block h-[1.5px] w-full bg-mist transition-transform duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-[1.5px] w-full bg-mist transition-transform duration-300 ${
                  open ? "-translate-y-[6.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Panneau mobile plein écran */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink/[0.98] px-6 pb-10 pt-[calc(var(--nav-h)+24px)] backdrop-blur-lg transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label={t.a11y.mobileNav}>
          <ul className="flex flex-col gap-2">
            {links.map((l, i) => (
              <li
                key={l.href}
                style={{
                  transition: `opacity .5s cubic-bezier(0.16,1,0.3,1) ${80 + i * 70}ms, transform .5s cubic-bezier(0.16,1,0.3,1) ${80 + i * 70}ms`,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(24px)",
                }}
              >
                <a
                  href={l.href}
                  onClick={go(l.href)}
                  tabIndex={open ? 0 : -1}
                  className="display-l block py-2 text-mist"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contact"
          onClick={go("#contact")}
          tabIndex={open ? 0 : -1}
          className="inline-flex items-center justify-center rounded-[4px] bg-bagrain px-6 py-4 text-center font-medium text-mist"
          style={{
            transition:
              "opacity .5s cubic-bezier(0.16,1,0.3,1) 450ms, transform .5s cubic-bezier(0.16,1,0.3,1) 450ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(24px)",
          }}
        >
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
}
