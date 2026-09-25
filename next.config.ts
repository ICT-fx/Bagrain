import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * L'adresse Vercel d'origine reste techniquement active : elle renvoie
   * désormais sur le domaine définitif, pour qu'aucun visiteur ni moteur de
   * recherche ne s'arrête dessus. Les déploiements de test, eux, gardent
   * leur propre URL et ne sont pas concernés.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bagrain-mj39.vercel.app" }],
        destination: "https://bagrain.fr/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Le sac du hero est déjà un WebP de qualité ; le repasser à 75 lui ajoute
    // une seconde perte, visible en bandes sur les grands aplats sombres de la
    // coque. 90 est réservé à cette image-là (voir `quality` dans Hero.tsx).
    qualities: [75, 90],
  },
};

export default nextConfig;
