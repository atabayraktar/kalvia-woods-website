// Kalvia Works emblem, redrawn as SVG from the supplied raster mark (553x400): a fan of
// tapered vertical blades rising to a peak, flanked by slanted slivers that close into a "V".
// Drawn in currentColor so it takes whatever ink it sits on, and stays crisp at any size.

const W = 553;
const BASE = 392;

const pt = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
const wedge = (tip, base, width) =>
  `M${pt(...tip)}L${pt(base[0] - width / 2, base[1])}L${pt(base[0] + width / 2, base[1])}Z`;
const mirror = ([x, y]) => [W - x, y];

// Vertical blades: centre one runs the full height, each pair outward starts lower.
const BLADE_TOPS = [0, 25, 48, 72, 96, 120];
const BLADE_PITCH = 26.4;

const bladePaths = () => {
  const out = [];
  BLADE_TOPS.forEach((top, k) => {
    const bottom = k === 0 ? 396 : 372;
    const xs = k === 0 ? [W / 2] : [W / 2 - k * BLADE_PITCH, W / 2 + k * BLADE_PITCH];
    xs.forEach((x) => {
      out.push(`M${pt(x - 5, top)}L${pt(x + 5, top)}L${pt(x + 1.2, bottom)}L${pt(x - 1.2, bottom)}Z`);
    });
  });
  return out;
};

// Outer fan: slivers whose tips climb and lean inward, bases spread along the bottom edge.
const fanPaths = () => {
  const out = [];
  for (let i = 0; i < 5; i += 1) {
    const tip = [5 + i * 24, 175 + i * 13];
    const base = [6 + i * 45, BASE];
    out.push(wedge(tip, base, 11));
    out.push(wedge(mirror(tip), mirror(base), 11));
  }
  return out;
};

// The two arms that meet at the bottom centre to form the "V".
const armPaths = () => {
  const out = [];
  [
    { tip: [112, 232], base: [271, 396], w: 9 },
    { tip: [138, 252], base: [274, 396], w: 6 },
  ].forEach(({ tip, base, w }) => {
    out.push(wedge(tip, base, w));
    out.push(wedge(mirror(tip), mirror(base), w));
  });
  return out;
};

const PATH = [...fanPaths(), ...armPaths(), ...bladePaths()].join('');

export default function KalviaEmblem({ className }) {
  return (
    <svg className={className} viewBox={`0 0 ${W} 400`} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={PATH} />
    </svg>
  );
}
