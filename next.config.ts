import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Le sac du hero est déjà un WebP de qualité ; le repasser à 75 lui ajoute
    // une seconde perte, visible en bandes sur les grands aplats sombres de la
    // coque. 90 est réservé à cette image-là (voir `quality` dans Hero.tsx).
    qualities: [75, 90],
  },
};

export default nextConfig;
