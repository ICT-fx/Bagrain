import { ImageResponse } from "next/og";

export const alt = "BAGRAIN — Le sac à dos à capuche intégrée";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image Open Graph placeholder générée au build (fond nuit, logo, baseline).
 * À remplacer par un rendu produit 1200×630 dès qu'il est disponible :
 * déposer public/og.jpg et déclarer openGraph.images dans app/layout.tsx.
 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070e2a",
          gap: 48,
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            background: "#1544d6",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 36,
          }}
        >
          <div
            style={{
              width: 150,
              height: 75,
              background: "#f2f5fb",
              borderRadius: "150px 150px 0 0",
            }}
          />
          <div
            style={{
              width: 150,
              height: 10,
              background: "#f2f5fb",
              marginTop: 10,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            color: "#f2f5fb",
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          BAGRAIN®
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#7fa5f5" }}>
          Keep your hands free and your head dry
        </div>
      </div>
    ),
    { ...size },
  );
}
