import { ImageResponse } from "next/og";
import { brandAssets } from "@/lib/brand-assets";
import { regions } from "@/lib/regions";
import { siteUrl } from "@/lib/site-config";

export const runtime = "edge";

export const alt = "Specialist Movers Auckland and Hamilton — home and piano movers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const purple = "#9739b0";
const yellow = "#f3d02a";

/** Lightweight share card — logo only, no hero photo (keeps Slack/iMessage previews fast). */
export default async function Image() {
  const logo = `${siteUrl}${brandAssets.primaryLogoYellow2xPng}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(145deg, ${purple} 0%, #7a2d8f 48%, #5c2270 100%)`,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "56px 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(243, 208, 42, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 120,
            bottom: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.06)",
          }}
        />

        <img src={logo} alt="" height={56} width={300} />

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 920 }}>
          <div
            style={{
              alignSelf: "flex-start",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.1)",
              padding: "10px 18px",
              fontSize: 22,
              fontWeight: 700,
              color: yellow,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {regions.heroEyebrow}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              color: yellow,
              letterSpacing: "-0.02em",
            }}
          >
            Specialist Movers
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.3, color: "rgba(255,255,255,0.94)" }}>
            {regions.heroH1Sub}
          </div>
        </div>

        <div style={{ fontSize: 26, fontWeight: 700, color: yellow }}>
          specialistmovers.co.nz
        </div>
      </div>
    ),
    size,
  );
}
