"use client";

import dynamic from "next/dynamic";
import { useLang } from "@/components/LangProvider";
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import ProductIntro from "@/components/ProductIntro";

/*
 * Les sections sous le pli (et GSAP/Lenis avec elles) sont différées :
 * le HTML reste rendu côté serveur, mais leur JS sort du chemin critique
 * du hero — important pour les visiteurs 4G qui scannent le QR code.
 */
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), {
  ssr: false,
});
const HoodSequence = dynamic(() => import("@/components/HoodSequence"));
const Anatomy = dynamic(() => import("@/components/Anatomy"));
const UseCases = dynamic(() => import("@/components/UseCases"));
const Why = dynamic(() => import("@/components/Why"));
const Team = dynamic(() => import("@/components/Team"));
const Trade = dynamic(() => import("@/components/Trade"));
const Signup = dynamic(() => import("@/components/Signup"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const { t } = useLang();

  return (
    <>
      <a
        href="#contenu"
        className="fixed left-4 top-4 z-[70] -translate-y-20 rounded-[4px] bg-bagrain px-4 py-2 text-sm text-mist transition-transform focus:translate-y-0"
      >
        {t.a11y.skip}
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <Nav />
      <main id="contenu">
        <Hero />
        <Problem />
        <ProductIntro />
        <HoodSequence />
        <Anatomy />
        <UseCases />
        <Why />
        <Team />
        <Trade />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
