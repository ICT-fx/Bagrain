import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône Apple touch : carré bleu, dôme blanc. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1544d6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 38,
        }}
      >
        <div
          style={{
            width: 110,
            height: 55,
            background: "#f2f5fb",
            borderRadius: "110px 110px 0 0",
          }}
        />
        <div
          style={{
            width: 110,
            height: 10,
            background: "#f2f5fb",
            marginTop: 8,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
