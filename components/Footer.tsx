"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/ui/Logo";
import LangSwitch from "@/components/ui/LangSwitch";
import { scrollToAnchor } from "@/lib/scroll";

export default function Footer() {
  const { t } = useLang();

  const anchors = [
    { href: "#sac", label: t.nav.sac },
    { href: "#solution", label: t.nav.how },
    { href: "#anatomie", label: t.nav.anatomy },
    { href: "#equipe", label: t.nav.team },
    { href: "#salon", label: t.nav.salon },
  ];

  const socials = [
    { href: siteConfig.socials.linkedin, label: "LinkedIn" },
    { href: siteConfig.socials.instagram, label: "Instagram" },
  ].filter((s) => s.href);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToAnchor(hash);
    history.replaceState(null, "", hash);
  };

  return (
    <footer className="hairline-t bg-ink pb-10 pt-12 sm:pt-14">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          {/* Sur téléphone les blocs de liens s'apparient deux par deux ;
              seule la signature de marque prend toute la largeur. */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[32ch] text-[15px] text-mist/60">
              {t.footer.baseline}
            </p>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <p className="mono-label text-mist/60">{t.footer.navTitle}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {anchors.map((a) => (
                <li key={a.href}>
                  <a
                    href={a.href}
                    onClick={go(a.href)}
                    className="text-[15px] text-mist/70 transition-colors hover:text-mist"
                  >
                    {a.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mono-label text-mist/60">{t.footer.legalTitle}</p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-[15px] text-mist/70 transition-colors hover:text-mist"
                >
                  {t.footer.legal}
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-[15px] text-mist/70 transition-colors hover:text-mist"
                >
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mono-label text-mist/60">{t.footer.followTitle}</p>
            {socials.length > 0 ? (
              <ul className="mt-4 flex flex-col gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-mist/70 transition-colors hover:text-mist"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-[15px] text-mist/60">LinkedIn · Instagram</p>
            )}
            <div className="mt-6">
              <LangSwitch />
            </div>
          </div>
        </div>

        <p className="mono-label mt-10 border-t border-[rgba(242,245,251,0.08)] pt-6 text-mist/55 sm:mt-12">
          {t.footer.credits}
        </p>
      </div>
    </footer>
  );
}
