import { insetCoast, mainCoast } from "./coastline";

export const zoneColors: Record<number, string> = {
  1: "#9739b0",
  2: "#e09a12",
  3: "#1f9e89",
  4: "#3a6fd8",
  5: "#d1495b",
};

type Coast = typeof mainCoast | typeof insetCoast;

type Place = {
  name: string;
  zone: number;
  lat: number;
  lon: number;
  /** Label placement; omit to draw the dot without a label. */
  label?: { dx: number; dy: number; anchor: "start" | "end"; text?: string };
};

const BASE = { lat: -37.745, lon: 175.235 };

/** Close-up: Zones 1 and 2 around the workshop. */
const waikato: Place[] = [
  { name: "Hamilton", zone: 1, lat: -37.787, lon: 175.279, label: { dx: 10, dy: 16, anchor: "start" } },
  { name: "Cambridge", zone: 1, lat: -37.885, lon: 175.47, label: { dx: 10, dy: 5, anchor: "start" } },
  { name: "Taupiri", zone: 1, lat: -37.617, lon: 175.19, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Ngāruawāhia", zone: 1, lat: -37.667, lon: 175.15, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Gordonton", zone: 1, lat: -37.667, lon: 175.3, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Whatawhata", zone: 1, lat: -37.8, lon: 175.15, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Tamahere", zone: 1, lat: -37.833, lon: 175.35, label: { dx: 10, dy: 5, anchor: "start" } },
  { name: "Newstead", zone: 1, lat: -37.783, lon: 175.383, label: { dx: 10, dy: -4, anchor: "start" } },
  { name: "Rukuhia", zone: 1, lat: -37.85, lon: 175.3, label: { dx: -10, dy: 8, anchor: "end" } },
  { name: "Raglan", zone: 2, lat: -37.8, lon: 174.873, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Huntly", zone: 2, lat: -37.558, lon: 175.16, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Te Kauwhata", zone: 2, lat: -37.4, lon: 175.15, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Rangiriri", zone: 2, lat: -37.433, lon: 175.133, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Morrinsville", zone: 2, lat: -37.657, lon: 175.528, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Matamata", zone: 2, lat: -37.81, lon: 175.773, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Te Awamutu", zone: 2, lat: -38.008, lon: 175.325, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Putāruru", zone: 2, lat: -38.05, lon: 175.783, label: { dx: -10, dy: 4, anchor: "end" } },
];

/** Whole card: Zones 1 and 2 drawn without labels (they're in the close-up). */
const northIsland: Place[] = [
  ...waikato.map(({ label: _label, ...p }) => p),
  { name: "Auckland", zone: 3, lat: -36.848, lon: 174.763, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Thames", zone: 3, lat: -37.138, lon: 175.54, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Waihi", zone: 3, lat: -37.391, lon: 175.84 },
  { name: "Waihi Beach", zone: 3, lat: -37.405, lon: 175.938, label: { dx: 10, dy: 4, anchor: "start", text: "Waihi & Waihi Beach" } },
  { name: "Katikati", zone: 3, lat: -37.553, lon: 175.917, label: { dx: 10, dy: 6, anchor: "start" } },
  { name: "Mt Maunganui", zone: 3, lat: -37.637, lon: 176.183 },
  { name: "Tauranga", zone: 3, lat: -37.687, lon: 176.165, label: { dx: 10, dy: 8, anchor: "start", text: "Tauranga & Mt Maunganui" } },
  { name: "Rotorua", zone: 3, lat: -38.137, lon: 176.25, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Tokoroa", zone: 3, lat: -38.217, lon: 175.867, label: { dx: -10, dy: 8, anchor: "end" } },
  { name: "Coromandel", zone: 4, lat: -36.76, lon: 175.497, label: { dx: -10, dy: 6, anchor: "end" } },
  { name: "Whitianga", zone: 4, lat: -36.833, lon: 175.7 },
  { name: "Hahei", zone: 4, lat: -36.87, lon: 175.8, label: { dx: 10, dy: 2, anchor: "start", text: "Whitianga & Hahei" } },
  { name: "Tairua", zone: 4, lat: -37.0, lon: 175.85 },
  { name: "Pauanui", zone: 4, lat: -37.022, lon: 175.867, label: { dx: 10, dy: 6, anchor: "start", text: "Tairua & Pauanui" } },
  { name: "Taupō", zone: 4, lat: -38.686, lon: 176.07, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Whakatāne", zone: 4, lat: -37.953, lon: 176.99, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Port Jackson", zone: 5, lat: -36.483, lon: 175.35, label: { dx: -10, dy: 4, anchor: "end", text: "Deep Coromandel" } },
  { name: "Port Charles", zone: 5, lat: -36.517, lon: 175.467 },
  { name: "Colville", zone: 5, lat: -36.633, lon: 175.467 },
  { name: "Kennedy Bay", zone: 5, lat: -36.667, lon: 175.55 },
  { name: "New Plymouth", zone: 5, lat: -39.057, lon: 174.075, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Whanganui", zone: 5, lat: -39.93, lon: 175.05, label: { dx: -10, dy: 4, anchor: "end" } },
  { name: "Napier", zone: 5, lat: -39.493, lon: 176.912, label: { dx: 10, dy: 4, anchor: "start" } },
  { name: "Feilding", zone: 5, lat: -40.226, lon: 175.565, label: { dx: 10, dy: 2, anchor: "start" } },
  { name: "Palmerston North", zone: 5, lat: -40.356, lon: 175.611, label: { dx: 10, dy: 8, anchor: "start" } },
];

function project(coast: Coast, lat: number, lon: number) {
  return { x: (lon - coast.lon0) * coast.cos * coast.k, y: (coast.lat0 - lat) * coast.k };
}

function MapSvg({
  coast,
  places,
  title,
  dot,
  font,
  children,
}: {
  coast: Coast;
  places: Place[];
  title: string;
  dot: number;
  font: number;
  children?: React.ReactNode;
}) {
  const base = project(coast, BASE.lat, BASE.lon);
  return (
    <svg
      viewBox={`0 0 ${coast.width} ${coast.height}`}
      role="img"
      aria-label={title}
      className="block h-auto w-full"
    >
      <rect width={coast.width} height={coast.height} fill="#eaf3f8" />
      <path d={coast.d} fill="#fbf9fd" stroke="#c9b9d6" strokeWidth={1} />
      {children}
      {places.map((p) => {
        const { x, y } = project(coast, p.lat, p.lon);
        return (
          <g key={p.name}>
            <circle cx={x} cy={y} r={dot} fill={zoneColors[p.zone]} stroke="#fff" strokeWidth={1.5} />
            <text
              x={x}
              y={y + dot * 0.38}
              textAnchor="middle"
              fontSize={dot * 1.1}
              fontWeight={700}
              fill="#fff"
            >
              {p.zone}
            </text>
            {p.label && (
              <text
                x={x + p.label.dx}
                y={y + p.label.dy}
                textAnchor={p.label.anchor}
                fontSize={font}
                fill="#4b2457"
                stroke="#fbf9fd"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {p.label.text ?? p.name}
              </text>
            )}
          </g>
        );
      })}
      <g>
        <rect x={base.x - 7} y={base.y - 7} width={14} height={14} rx={2} fill="#2b1233" stroke="#fff" strokeWidth={1.5} />
        <text
          x={base.x - 12}
          y={base.y - 12}
          textAnchor="end"
          fontSize={font}
          fontWeight={700}
          fill="#2b1233"
          stroke="#fbf9fd"
          strokeWidth={3}
          paintOrder="stroke"
        >
          Hostess workshop
        </text>
      </g>
    </svg>
  );
}

export function ZoneMap() {
  const waikatoBox = (() => {
    const a = project(mainCoast, insetCoast.lat0, insetCoast.lon0);
    const b = project(
      mainCoast,
      insetCoast.lat0 - insetCoast.height / insetCoast.k,
      insetCoast.lon0 + insetCoast.width / (insetCoast.cos * insetCoast.k),
    );
    return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y };
  })();

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      <figure className="overflow-hidden rounded-2xl border border-brand-purple/15 bg-white">
        <MapSvg
          coast={mainCoast}
          places={northIsland}
          title="Map of the North Island showing delivery zones 1 to 5 from the Hostess workshop in Te Rapa Park"
          dot={7}
          font={13}
        >
          <rect
            x={waikatoBox.x}
            y={waikatoBox.y}
            width={waikatoBox.w}
            height={waikatoBox.h}
            fill="none"
            stroke="#9739b0"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
        </MapSvg>
        <figcaption className="border-t border-brand-purple/10 px-4 py-2 text-xs text-brand-purple/70">
          All zones. The dashed box is the Waikato close-up.
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-brand-purple/15 bg-white lg:self-start">
        <MapSvg
          coast={insetCoast}
          places={waikato}
          title="Close-up map of Zones 1 and 2 around Hamilton"
          dot={9}
          font={14}
        />
        <figcaption className="border-t border-brand-purple/10 px-4 py-2 text-xs text-brand-purple/70">
          Waikato close-up: Zones 1 and 2.
        </figcaption>
      </figure>
    </div>
  );
}

export function ZoneLegend() {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-brand-purple/80">
      {Object.entries(zoneColors).map(([zone, color]) => (
        <li key={zone} className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ background: color }} aria-hidden />
          Zone {zone}
        </li>
      ))}
    </ul>
  );
}
