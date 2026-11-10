import { insetCoast, mainCoast } from "./coastline";
import towns from "./towns.json";

/**
 * Zone shading (public/hostess2026/zones-*.png) is rendered offline from
 * towns.json: every bit of land takes the zone of its nearest town, which is
 * the card's own "nearest listed town" rule. Change a town's zone or add one
 * and rerun scripts/hostess-zone-map.py, or the shading and dots disagree.
 */
export const zoneColors: Record<number, string> = {
  1: "#9739b0",
  2: "#e09a12",
  3: "#1f9e89",
  4: "#3a6fd8",
  5: "#d1495b",
};

type Coast = typeof mainCoast | typeof insetCoast;

/** `city`: drawn as a name centred on the city with no dot (Hamilton), like a road map. */
type Town = { name: string; zone: number; lat: number; lon: number; card?: boolean; city?: boolean };

type Placed = { x: number; y: number; anchor: "start" | "middle" | "end"; text: string };

const BASE = { lat: -37.745, lon: 175.235 };

function project(coast: Coast, lat: number, lon: number) {
  return { x: (lon - coast.lon0) * coast.cos * coast.k, y: (coast.lat0 - lat) * coast.k };
}

type Box = { x0: number; y0: number; x1: number; y1: number };
const overlaps = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/**
 * Greedy label placement: cities are centred on their own point first, then
 * card towns, then the rest, each trying spots around its dot and skipping
 * the label if every spot collides. The dot always draws, so a skipped label
 * still shows its zone by colour.
 */
function placeLabels(
  coast: Coast,
  list: Town[],
  font: number,
  dot: number,
  reserved: Box[],
): Map<string, Placed> {
  const charW = font * 0.56;
  const taken: Box[] = [...reserved];
  const out = new Map<string, Placed>();
  for (const t of list.filter((c) => c.city)) {
    const { x, y } = project(coast, t.lat, t.lon);
    const w = t.name.length * charW * 1.15;
    taken.push({ x0: x - w / 2, y0: y - font, x1: x + w / 2, y1: y + font * 0.4 });
    out.set(t.name, { x, y: y + font * 0.35, anchor: "middle", text: t.name });
  }
  for (const t of list) {
    if (t.city) continue;
    const { x, y } = project(coast, t.lat, t.lon);
    taken.push({ x0: x - dot, y0: y - dot, x1: x + dot, y1: y + dot });
  }
  const ordered = list.filter((t) => !t.city).sort((a, b) => Number(Boolean(b.card)) - Number(Boolean(a.card)));
  const gap = dot + 3;
  for (const t of ordered) {
    const { x, y } = project(coast, t.lat, t.lon);
    const w = t.name.length * charW;
    const h = font;
    const spots: Array<[number, number, Placed["anchor"]]> = [
      [x + gap, y + h * 0.35, "start"],
      [x - gap, y + h * 0.35, "end"],
      [x, y - gap - 2, "middle"],
      [x, y + gap + h * 0.8, "middle"],
      [x + gap - 2, y - gap + 2, "start"],
      [x + gap - 2, y + gap + h * 0.6, "start"],
      [x - gap + 2, y - gap + 2, "end"],
      [x - gap + 2, y + gap + h * 0.6, "end"],
      // Second ring for crowded spots, still close enough to read as this dot's.
      [x, y - gap - h, "middle"],
      [x, y + gap + h * 1.8, "middle"],
      [x + gap, y + h * 1.4, "start"],
      [x - gap, y + h * 1.4, "end"],
      [x + gap, y - h * 0.7, "start"],
      [x - gap, y - h * 0.7, "end"],
    ];
    for (const [lx, ly, anchor] of spots) {
      const x0 = anchor === "start" ? lx : anchor === "end" ? lx - w : lx - w / 2;
      const box = { x0: x0 - 1, y0: ly - h * 0.85, x1: x0 + w + 1, y1: ly + h * 0.25 };
      if (box.x0 < 2 || box.x1 > coast.width - 2 || box.y0 < 2 || box.y1 > coast.height - 2) continue;
      if (taken.some((b) => overlaps(b, box))) continue;
      taken.push(box);
      out.set(t.name, { x: lx, y: ly, anchor, text: t.name });
      break;
    }
  }
  return out;
}

function inside(coast: Coast, t: Town) {
  const { x, y } = project(coast, t.lat, t.lon);
  return x > 4 && y > 4 && x < coast.width - 4 && y < coast.height - 4;
}

function MapSvg({
  coast,
  shading,
  list,
  title,
  dot,
  font,
  numbers,
  baseLabel,
  children,
}: {
  coast: Coast;
  shading: string;
  list: Town[];
  title: string;
  dot: number;
  font: number;
  numbers: boolean;
  baseLabel: boolean;
  children?: React.ReactNode;
}) {
  const base = project(coast, BASE.lat, BASE.lon);
  const baseText = { x: base.x - 12, y: base.y - 12, w: 16 * font * 0.6 };
  const reserved: Box[] = [{ x0: base.x - 8, y0: base.y - 8, x1: base.x + 8, y1: base.y + 8 }];
  if (baseLabel) {
    reserved.push({ x0: baseText.x - baseText.w, y0: baseText.y - font, x1: baseText.x, y1: baseText.y + 3 });
  }
  const labels = placeLabels(coast, list, font, dot, reserved);
  return (
    <svg viewBox={`0 0 ${coast.width} ${coast.height}`} role="img" aria-label={title} className="block h-auto w-full">
      <rect width={coast.width} height={coast.height} fill="#d6e8f3" />
      <path d={coast.d} fill="#ffffff" />
      <image href={shading} x={0} y={0} width={coast.width} height={coast.height} preserveAspectRatio="none" />
      <path d={coast.d} fill="none" stroke="#a993bd" strokeWidth={1.2} />
      {children}
      {list.map((t) => {
        if (t.city) return null;
        const { x, y } = project(coast, t.lat, t.lon);
        const r = t.card ? dot : dot * 0.75;
        return (
          <g key={t.name}>
            <circle cx={x} cy={y} r={r} fill={zoneColors[t.zone]} stroke="#fff" strokeWidth={1.5} />
            {numbers && (
              <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * 1.1} fontWeight={700} fill="#fff">
                {t.zone}
              </text>
            )}
          </g>
        );
      })}
      {list.map((t) => {
        const l = labels.get(t.name);
        if (!l) return null;
        return (
          <text
            key={`l-${t.name}`}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            fontSize={t.city ? font * 1.15 : font}
            fontWeight={t.city ? 800 : t.card ? 600 : 400}
            fill="#3b1a46"
            stroke="#ffffff"
            strokeWidth={3}
            strokeOpacity={0.85}
            paintOrder="stroke"
          >
            {l.text}
          </text>
        );
      })}
      <rect x={base.x - 7} y={base.y - 7} width={14} height={14} rx={2} fill="#2b1233" stroke="#fff" strokeWidth={1.5} />
      {baseLabel && (
        <text
          x={baseText.x}
          y={baseText.y}
          textAnchor="end"
          fontSize={font}
          fontWeight={700}
          fill="#2b1233"
          stroke="#ffffff"
          strokeWidth={3}
          paintOrder="stroke"
        >
          Hostess workshop
        </text>
      )}
    </svg>
  );
}

export function ZoneMap() {
  const all = towns as Town[];
  const waikatoBox = (() => {
    const a = project(mainCoast, insetCoast.lat0, insetCoast.lon0);
    const b = project(
      mainCoast,
      insetCoast.lat0 - insetCoast.height / insetCoast.k,
      insetCoast.lon0 + insetCoast.width / (insetCoast.cos * insetCoast.k),
    );
    return { x: a.x, y: a.y, w: b.x - a.x, h: b.y - a.y };
  })();
  const inBox = (t: Town) => {
    const { x, y } = project(mainCoast, t.lat, t.lon);
    return x > waikatoBox.x && x < waikatoBox.x + waikatoBox.w && y > waikatoBox.y && y < waikatoBox.y + waikatoBox.h;
  };

  return (
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      <figure className="overflow-hidden rounded-2xl border border-brand-purple/15 bg-white">
        <MapSvg
          coast={mainCoast}
          shading="/hostess2026/zones-main.png"
          // The close-up covers everything inside the dashed box; label it there, not here.
          list={all.filter((t) => inside(mainCoast, t) && !inBox(t))}
          title="Map of the North Island shaded by delivery zone, 1 to 5, from the Hostess workshop in Te Rapa Park"
          dot={6}
          font={12}
          numbers={false}
          baseLabel={false}
        >
          <rect
            x={waikatoBox.x}
            y={waikatoBox.y}
            width={waikatoBox.w}
            height={waikatoBox.h}
            fill="none"
            stroke="#3b1a46"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
        </MapSvg>
        <figcaption className="border-t border-brand-purple/10 px-4 py-2 text-xs text-brand-purple/70">
          All zones. The dark square is the Hostess workshop; the dashed box is the Waikato close-up.
        </figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-brand-purple/15 bg-white lg:self-start">
        <MapSvg
          coast={insetCoast}
          shading="/hostess2026/zones-inset.png"
          list={all.filter((t) => inside(insetCoast, t))}
          title="Close-up map of the Waikato shaded by delivery zone"
          dot={8}
          font={12}
          numbers
          baseLabel
        />
        <figcaption className="border-t border-brand-purple/10 px-4 py-2 text-xs text-brand-purple/70">
          Waikato close-up. Bigger dots are the towns named on the card.
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
