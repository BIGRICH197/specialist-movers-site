import { coverageMapBounds, depots, projectCoveragePoint } from "@/lib/depots";

/**
 * Stylised North Island outline (decorative, not survey-accurate).
 * Coast points are lat/lng → projected into the SVG viewBox.
 */
const COAST_LAT_LNG: readonly [number, number][] = [
  [-34.43, 172.68],
  [-35.05, 173.05],
  [-35.72, 174.32],
  [-36.55, 174.42],
  [-36.88, 174.48],
  [-37.05, 175.1],
  [-37.65, 176.15],
  [-37.55, 177.4],
  [-37.35, 178.25],
  [-38.2, 178.1],
  [-39.2, 177.2],
  [-40.2, 176.0],
  [-41.28, 174.78],
  [-40.9, 174.35],
  [-39.5, 174.05],
  [-38.5, 173.75],
  [-37.2, 173.55],
  [-35.8, 173.0],
];

function coastPath(): string {
  const pts = COAST_LAT_LNG.map(([lat, lng]) => projectCoveragePoint(lat, lng));
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
  }
  return `${d} Z`;
}

const WIDER_COVERAGE_LAT_LNG: readonly [number, number][] = [
  [-34.43, 172.68],
  [-36.2, 174.0],
  [-38.7, 176.1],
  [-40.5, 175.5],
  [-41.0, 174.5],
];

function widerCoveragePath(): string {
  const pts = WIDER_COVERAGE_LAT_LNG.map(([lat, lng]) => projectCoveragePoint(lat, lng));
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
  }
  return d;
}

const { width, height } = coverageMapBounds;
const islandD = coastPath();
const coverageD = widerCoveragePath();
const taupo = projectCoveragePoint(-38.685, 176.07);
const capeReinga = projectCoveragePoint(-34.43, 172.68);

export function CoverageMap() {
  return (
    <figure
      className="mt-8 overflow-hidden rounded-2xl border border-brand-purple/15 bg-gradient-to-br from-brand-surface to-brand-purple/[0.06]"
      aria-label="Map showing Specialist Movers bases in Auckland and Hamilton, with daily Auckland and Waikato coverage and wider North Island service from Taupo to Cape Reinga"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full text-brand-purple"
        role="img"
        aria-hidden
      >
        <defs>
          <linearGradient id="coverage-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3d02a" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#be76ef" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9739b0" stopOpacity="0.12" />
          </linearGradient>
          <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#9739b0" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Wider North Island service band */}
        <path
          d={coverageD}
          fill="none"
          stroke="#9739b0"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
        />
        <path
          d={coverageD}
          fill="none"
          stroke="url(#coverage-fill)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />

        {/* Island */}
        <path
          d={islandD}
          fill="#faf7fc"
          stroke="#9739b0"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Region labels */}
        <text
          x={capeReinga.x}
          y={capeReinga.y - 10}
          textAnchor="middle"
          className="fill-brand-purple/50 text-[9px] font-sans"
          style={{ fontSize: 9 }}
        >
          Cape Reinga
        </text>
        <text
          x={taupo.x + 8}
          y={taupo.y}
          textAnchor="start"
          className="fill-brand-purple/50 text-[9px] font-sans"
          style={{ fontSize: 9 }}
        >
          Taupo
        </text>

        {/* Daily service highlight (Auckland + Waikato) */}
        <ellipse
          cx={projectCoveragePoint(-37.05, 175.0).x}
          cy={projectCoveragePoint(-37.3, 175.0).y}
          rx="72"
          ry="48"
          fill="#f3d02a"
          opacity="0.22"
        />

        {/* Depot pins */}
        {depots.map((depot) => {
          const { x, y } = projectCoveragePoint(depot.lat, depot.lng);
          const isAuckland = depot.id === "auckland";
          return (
            <g key={depot.id} filter="url(#pin-shadow)">
              <circle
                cx={x}
                cy={y}
                r={isAuckland ? 11 : 9}
                fill={isAuckland ? "#9739b0" : "#f3d02a"}
                stroke="#fff"
                strokeWidth="2.5"
              />
              <circle cx={x} cy={y - 1} r={3} fill="#fff" opacity="0.9" />
              <text
                x={x + (isAuckland ? -14 : 14)}
                y={y + (isAuckland ? -18 : 22)}
                textAnchor={isAuckland ? "end" : "start"}
                className="font-heading fill-brand-purple"
                style={{ fontSize: 13, fontWeight: 700 }}
              >
                {depot.label}
              </text>
              <text
                x={x + (isAuckland ? -14 : 14)}
                y={y + (isAuckland ? -4 : 36)}
                textAnchor={isAuckland ? "end" : "start"}
                className="fill-brand-purple/65 font-sans"
                style={{ fontSize: 10 }}
              >
                {depot.sublabel}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-brand-purple/10 bg-white/60 px-4 py-3 text-xs text-brand-purple/75">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brand-purple ring-2 ring-white" aria-hidden />
          Auckland base
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-brand-yellow ring-2 ring-white" aria-hidden />
          Hamilton base
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-brand-yellow/60" aria-hidden />
          Daily Auckland &amp; Waikato
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-1 w-8 rounded-full bg-brand-purple/30" aria-hidden />
          Wider North Island on request
        </span>
      </figcaption>
    </figure>
  );
}
