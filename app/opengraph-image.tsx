import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Specialist Movers NZ — Auckland & Hamilton house and piano movers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3B1E5C",
          color: "#FFFFFF",
          padding: "72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            fontWeight: 700,
            color: "#F5C518",
          }}
        >
          Specialist Movers NZ
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Auckland &amp; Hamilton movers
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.88)",
              maxWidth: "820px",
            }}
          >
            House, piano, commercial &amp; packing moves across the North Island
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#F5C518" }}>specialistmovers.co.nz</div>
      </div>
    ),
    size,
  );
}
