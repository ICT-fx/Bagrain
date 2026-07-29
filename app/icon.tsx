import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon : carré bleu, dôme blanc. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1544d6",
          borderRadius: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 20,
            background: "#f2f5fb",
            borderRadius: "40px 40px 0 0",
          }}
        />
        <div
          style={{ width: 40, height: 4, background: "#f2f5fb", marginTop: 3 }}
        />
      </div>
    ),
    { ...size },
  );
}
