import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import { siteConfig } from "@/lib/site-config";
import { dictionaries } from "@/lib/i18n";
import "./globals.css";

/* Polices auto-hébergées via next/font — jamais de <link> bloquant. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
  display: "swap",
});

const fr = dictionaries.fr;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: fr.meta.title,
  description: fr.meta.description,
  /*
   * Pas d'alternates hreflang : la langue est résolue côté client, il
   * n'existe donc pas d'URL servant réellement une version EN rendue au
   * serveur. Déclarer /?lang=en enverrait un signal mensonger aux
   * moteurs. Pour indexer l'anglais, il faudra de vraies routes /en
   * avec generateMetadata et un <html lang> dynamique.
   */
  alternates: { canonical: "/" },
  openGraph: {
    title: fr.meta.title,
    description: fr.meta.description,
    url: "/",
    siteName: "BAGRAIN",
    locale: "fr_FR",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: fr.meta.title,
    description: fr.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#070e2a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "BAGRAIN",
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon`,
      foundingDate: "2025-02",
      foundingLocation: { "@type": "Place", name: "Nantes, France" },
      legalName: "BAGRAIN SAS",
      vatID: "FR63940333925",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1 rue du Fondeur",
        postalCode: "44800",
        addressLocality: "Saint-Herblain",
        addressCountry: "FR",
      },
      email: siteConfig.contactEmail,
      slogan: "Keep your hands free and your head dry",
    },
    {
      "@type": "Product",
      name: "BAGRAIN",
      brand: { "@type": "Brand", name: "BAGRAIN" },
      description: fr.meta.description,
      category: "Backpack",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth motion-reduce:scroll-auto">
      <head>
        {/*
         * Marque le document comme « JS actif » avant le premier paint :
         * les états cachés des révélations au scroll sont scopés sous
         * .js, donc sans JavaScript le contenu reste entièrement lisible.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "try{var s=sessionStorage;if(s.getItem('bagrain:intro'))" +
              "document.documentElement.classList.add('intro-done');" +
              "else s.setItem('bagrain:intro','1')}catch(e){}",
          }}
        />
      </head>
      <body
        className={`${archivo.variable} ${interTight.variable} ${plexMono.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
