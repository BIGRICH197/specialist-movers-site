import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/site-config";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const purple = "#9739b0";
const yellow = "#f3d02a";

export default async function Image() {
  const logo = `${siteUrl}/brand/logos/primary-logo-yellow-2x.png`;
  const photo = `${siteUrl}/photos/source/batch-p126-p127/P1260739.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: purple,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "56px 48px 56px 64px",
            maxWidth: 720,
          }}
        >
          <img src={logo} alt="Specialist Movers" height={56} width={280} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                alignSelf: "flex-start",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.1)",
                padding: "10px 18px",
                fontSize: 20,
                fontWeight: 700,
                color: yellow,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Trusted house and piano movers. Auckland and Hamilton.
            </div>
            <div
              style={{
                fontSize: 58,
                fontWeight: 700,
                lineHeight: 1.08,
                color: yellow,
                textTransform: "uppercase",
              }}
            >
              Specialist Movers.
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.9)" }}>
              Auckland and Hamilton moving specialists.
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: yellow }}>
            specialistmovers.co.nz
          </div>
        </div>
        <div style={{ display: "flex", width: 460, position: "relative" }}>
          <img
            src={photo}
            alt=""
            width={460}
            height={630}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, #9739b0 0%, rgba(151,57,176,0.55) 28%, transparent 62%)",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
