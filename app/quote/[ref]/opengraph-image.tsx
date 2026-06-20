import { ImageResponse } from "next/og";
import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { quotePreviewCopy } from "@/lib/quote-preview-meta";
import { siteUrl } from "@/lib/site-config";

export const runtime = "nodejs";
export const alt = "Specialist Movers moving quote";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const purple = "#9739b0";
const yellow = "#f3d02a";

function quoteOgImage(opts: {
  logo: string;
  client: string;
  total: string;
  route: string;
}) {
  const { logo, client, total, route } = opts;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(145deg, ${purple} 0%, #7a2d8f 55%, #5c2270 100%)`,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "56px 64px",
        }}
      >
        <img src={logo} alt="" height={52} width={260} />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Your moving quote
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#fff",
              maxWidth: 980,
            }}
          >
            {client}
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: yellow }}>{total}</div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "rgba(255,255,255,0.92)" }}>
            {route}
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: yellow }}>
          specialistmovers.co.nz
        </div>
      </div>
    ),
    size,
  );
}

function fallbackOgImage(logo: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: purple,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          padding: "56px 64px",
        }}
      >
        <img src={logo} alt="" height={52} width={260} />
        <div style={{ fontSize: 48, fontWeight: 700, color: yellow }}>
          Specialist Movers quote
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.9)" }}>
          specialistmovers.co.nz
        </div>
      </div>
    ),
    size,
  );
}

export default async function Image({ params }: { params: { ref: string } }) {
  const logo = `${siteUrl}/brand/logos/primary-logo-yellow-2x.png`;
  const stored = await getQuote(tokenFromRef(params.ref));

  if (!stored) {
    return fallbackOgImage(logo);
  }

  const { client, total, route } = quotePreviewCopy(stored, params.ref);

  return quoteOgImage({ logo, client, total, route });
}
