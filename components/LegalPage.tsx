"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import Logo from "@/components/ui/Logo";
import LangSwitch from "@/components/ui/LangSwitch";

/** Gabarit commun des pages légales, bilingue. */
export default function LegalPage({
  kind,
}: {
  kind: "mentions" | "privacy";
}) {
  const { t } = useLang();
  const page = kind === "mentions" ? t.legal.mentions : t.legal.privacy;

  return (
    <main className="min-h-screen bg-ink">
      <header className="container-site flex items-center justify-between py-6">
        <Link href="/" aria-label={t.a11y.home} className="text-mist">
          <Logo />
        </Link>
        <LangSwitch />
      </header>

      <div className="container-site pb-32 pt-12">
        <h1 className="heading-2 max-w-[24ch] text-mist">{page.title}</h1>
        <div className="mt-12 max-w-[68ch]">
          {page.blocks.map((b, i) => (
            <section key={i} className="hairline-t py-8">
              <h2 className="mono-label text-haze">{b.h}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-mist/75">
                {b.p}
              </p>
            </section>
          ))}
        </div>
        <Link
          href="/"
          className="mono-label mt-8 inline-block text-haze underline-offset-4 hover:underline"
        >
          ← {t.legal.backHome}
        </Link>
      </div>
    </main>
  );
}
