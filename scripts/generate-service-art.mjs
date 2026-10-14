// Renders the two service images that have no photography yet — the laser-cut business-card
// hero (desktop + mobile) and the custom-cutting ("fason") banner (desktop + mobile) — as
// top-down product scenes built from SVG (grain, die-cut lattices, soft shadows) via sharp.
// Output: public/images/hero-kartvizit(.webp|-mobile.webp), banner-fason(.webp|-mobile.webp)
// Run: node scripts/generate-service-art.mjs
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

// ── shared defs ────────────────────────────────────────────────────────────────────────
const defs = (w, h) => `
  <filter id="deskGrain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.22" numOctaves="4" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0 0.02  0 0 0 -1.6 1.15" result="g"/>
    <feComposite in="g" in2="SourceGraphic" operator="in"/>
  </filter>
  <filter id="oakGrain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.006 0.16" numOctaves="4" seed="3" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.26  0 0 0 0 0.10  0 0 0 -1.7 1.2" result="g"/>
    <feComposite in="g" in2="SourceGraphic" operator="in"/>
  </filter>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
    <feGaussianBlur stdDeviation="${Math.round(w / 140)}"/>
  </filter>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="${Math.round(w / 520)}"/>
  </filter>
  <linearGradient id="desk" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#5a3519"/>
    <stop offset="0.55" stop-color="#3f2410"/>
    <stop offset="1" stop-color="#2a1709"/>
  </linearGradient>
  <linearGradient id="oak" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#e7bb82"/>
    <stop offset="1" stop-color="#cf9858"/>
  </linearGradient>
  <radialGradient id="sun" cx="0.78" cy="0.12" r="0.9">
    <stop offset="0" stop-color="#ffd9a0" stop-opacity="0.55"/>
    <stop offset="0.5" stop-color="#ffb867" stop-opacity="0.12"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.35"/>
  </radialGradient>`;

const desk = (w, h) => `
  <rect width="${w}" height="${h}" fill="url(#desk)"/>
  <rect width="${w}" height="${h}" fill="#000" filter="url(#deskGrain)" opacity="0.65"/>
  <rect width="${w}" height="${h}" fill="url(#sun)"/>`;

// Diamond lattice of through-holes, as a mask (white = card material, black = hole).
function latticeMask(id, cw, ch, cell) {
  let holes = '';
  const d = cell * 0.34;
  for (let r = 0, y = cell; y < ch - cell * 0.6; y += cell * 0.6, r++) {
    for (let x = cell + (r % 2 ? cell / 2 : 0); x < cw - cell * 0.6; x += cell) {
      holes += `<path d="M${x} ${y - d}L${x + d} ${y}L${x} ${y + d}L${x - d} ${y}Z" fill="#000"/>`;
    }
  }
  return `<mask id="${id}"><rect width="${cw}" height="${ch}" fill="#fff"/>${holes}</mask>`;
}

// One card: oak face with grain, bevel hairline; `kind` picks the cut/engrave treatment.
function card({ id, cw, ch, x, y, rot, kind }) {
  const r = Math.round(cw * 0.025);
  const face = `
    <rect width="${cw}" height="${ch}" rx="${r}" fill="url(#oak)"/>
    <rect width="${cw}" height="${ch}" rx="${r}" fill="#000" filter="url(#oakGrain)" opacity="0.55"/>
    <rect x="1.5" y="1.5" width="${cw - 3}" height="${ch - 3}" rx="${r}" fill="none" stroke="#fff3da" stroke-opacity="0.45" stroke-width="2"/>`;
  let art = '';
  let mask = '';
  if (kind === 'lattice') {
    mask = latticeMask(`${id}-m`, cw, ch, cw / 12);
    art = '';
  }
  if (kind === 'logo') {
    const s = cw / 520;
    art = `
      <g transform="translate(${cw * 0.12} ${ch * 0.09})" fill="none" stroke="#5b3517" stroke-opacity="0.85" stroke-width="${3.2 * s}" stroke-linecap="round" stroke-linejoin="round">
        <rect width="${cw * 0.2}" height="${cw * 0.2}" rx="${10 * s}"/>
        <path d="M${cw * 0.045} ${cw * 0.045}v${cw * 0.11}M${cw * 0.045} ${cw * 0.1}l${cw * 0.05} ${-cw * 0.055}M${cw * 0.06} ${cw * 0.09}l${cw * 0.05} ${cw * 0.065}"/>
      </g>
      <g fill="#5b3517" fill-opacity="0.85" font-family="'Courier New', monospace" font-weight="700">
        <text x="${cw * 0.12}" y="${ch * 0.6}" font-size="${34 * s}" letter-spacing="${3 * s}">KALVIA WOODS</text>
        <text x="${cw * 0.12}" y="${ch * 0.6 + 32 * s}" font-size="${19 * s}" letter-spacing="${2 * s}" fill-opacity="0.65">LAZER KESİM ATÖLYESİ</text>
      </g>
      <path d="M${cw * 0.12} ${ch * 0.85}h${cw * 0.76}" stroke="#5b3517" stroke-opacity="0.45" stroke-width="${2 * s}"/>`;
  }
  if (kind === 'name') {
    const s = cw / 520;
    art = `
      <g fill="#5b3517" fill-opacity="0.88" font-family="'Courier New', monospace" font-weight="700">
        <text x="${cw * 0.1}" y="${ch * 0.42}" font-size="${44 * s}" letter-spacing="${1 * s}">AYŞE YILMAZ</text>
        <text x="${cw * 0.1}" y="${ch * 0.42 + 36 * s}" font-size="${20 * s}" letter-spacing="${2.5 * s}" fill-opacity="0.65">MİMAR</text>
        <text x="${cw * 0.1}" y="${ch * 0.82}" font-size="${19 * s}" fill-opacity="0.75">0552 000 00 00</text>
      </g>`;
  }
  const faceGroup = mask ? `<g mask="url(#${id}-m)">${face}</g>` : `<g>${face}${art}</g>`;
  return `
    <g transform="translate(${x} ${y}) rotate(${rot} ${cw / 2} ${ch / 2})">
      <defs>${mask}</defs>
      <g filter="url(#shadow)" opacity="0.55" transform="translate(${cw * 0.03} ${cw * 0.05})">
        <rect width="${cw}" height="${ch}" rx="${r}" fill="#000"/>
      </g>
      ${faceGroup}
      ${kind === 'lattice' ? `<rect x="1.5" y="1.5" width="${cw - 3}" height="${ch - 3}" rx="${r}" fill="none" stroke="#fff3da" stroke-opacity="0.4" stroke-width="2"/>` : ''}
    </g>`;
}

function cardsScene(w, h, layout) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>${defs(w, h)}</defs>
    ${desk(w, h)}
    ${layout.map(card).join('')}
    <rect width="${w}" height="${h}" fill="url(#sun)" opacity="0.35"/>
  </svg>`;
}

// ── fason / custom cutting banner ─────────────────────────────────────────────────────
function fasonScene(w, h, portrait) {
  const pw = portrait ? w * 0.74 : w * 0.34;
  const ph = portrait ? pw * 1.02 : h * 0.78;
  const px = portrait ? w * 0.13 : w * 0.56;
  const py = portrait ? h * 0.08 : h * 0.11;
  const cell = pw / 9;
  // Panel with a lattice that is only partly cut: the cut region ends at the laser line.
  const cutX = px + pw * 0.6;
  let holes = '';
  const d = cell * 0.34;
  for (let r = 0, y = cell; y < ph - cell * 0.6; y += cell * 0.6, r++) {
    for (let x = cell + (r % 2 ? cell / 2 : 0); x < pw - cell * 0.6; x += cell) {
      if (px + x < cutX) holes += `<path d="M${x} ${y - d}L${x + d} ${y}L${x} ${y + d}L${x - d} ${y}Z" fill="#000"/>`;
    }
  }
  const lineX = cutX - px;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>${defs(w, h)}
      <mask id="cut"><rect width="${pw}" height="${ph}" fill="#fff"/>${holes}</mask>
      <radialGradient id="spark"><stop offset="0" stop-color="#fff6e0"/><stop offset="0.25" stop-color="#ff7a3a"/><stop offset="1" stop-color="#ff3a1a" stop-opacity="0"/></radialGradient>
      <linearGradient id="beam" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ff5030" stop-opacity="0"/><stop offset="1" stop-color="#ff6a40" stop-opacity="0.9"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#17110c"/>
    <rect width="${w}" height="${h}" fill="#000" filter="url(#deskGrain)" opacity="0.25"/>
    <!-- cutting-bed slats -->
    ${Array.from({ length: Math.ceil(w / 38) + 1 }, (_, i) => `<rect x="${i * 38}" y="0" width="12" height="${h}" fill="#2a2018" opacity="0.8"/>`).join('')}
    <rect width="${w}" height="${h}" fill="url(#sun)" opacity="0.5"/>
    <g transform="translate(${px} ${py})">
      <g filter="url(#shadow)" opacity="0.7" transform="translate(${pw * 0.03} ${pw * 0.05})"><rect width="${pw}" height="${ph}" rx="6" fill="#000"/></g>
      <g mask="url(#cut)">
        <rect width="${pw}" height="${ph}" rx="6" fill="url(#oak)"/>
        <rect width="${pw}" height="${ph}" rx="6" fill="#000" filter="url(#oakGrain)" opacity="0.55"/>
      </g>
      <rect x="1.5" y="1.5" width="${pw - 3}" height="${ph - 3}" rx="6" fill="none" stroke="#fff3da" stroke-opacity="0.35" stroke-width="2"/>
      <!-- laser line + glow -->
      <rect x="${lineX - 3}" y="-${py}" width="6" height="${py + ph * 0.5}" fill="url(#beam)" filter="url(#soft)"/>
      <circle cx="${lineX}" cy="${ph * 0.5}" r="${pw * 0.09}" fill="url(#spark)"/>
      <circle cx="${lineX}" cy="${ph * 0.5}" r="${pw * 0.02}" fill="#fffbe9"/>
    </g>
    <rect width="${w}" height="${h}" fill="url(#sun)" opacity="0.2"/>
  </svg>`;
}

const render = (svg, file, w, h, q = 82) =>
  sharp(Buffer.from(svg)).resize(w, h).webp({ quality: q }).toFile(path.join(OUT, file));

// ── business-card hero ─────────────────────────────────────────────────────────────────
// Desktop 1774x887: copy sits bottom-left, so the cards cluster right of centre.
await render(
  cardsScene(1774, 887, [
    { id: 'c1', cw: 470, ch: 287, x: 1130, y: 100, rot: 8, kind: 'lattice' },
    { id: 'c2', cw: 470, ch: 287, x: 930, y: 300, rot: -9, kind: 'logo' },
    { id: 'c3', cw: 470, ch: 287, x: 1170, y: 460, rot: 4, kind: 'name' },
  ]),
  'hero-kartvizit.webp', 1774, 887
);
// Mobile 836x1881: cards in the upper-middle, bottom third left dark for the copy.
await render(
  cardsScene(836, 1881, [
    { id: 'm1', cw: 500, ch: 305, x: 170, y: 40, rot: -7, kind: 'lattice' },
    { id: 'm2', cw: 500, ch: 305, x: 100, y: 370, rot: 6, kind: 'logo' },
    { id: 'm3', cw: 500, ch: 305, x: 210, y: 670, rot: -4, kind: 'name' },
  ]),
  'hero-kartvizit-mobile.webp', 836, 1881
);

// ── fason banner ───────────────────────────────────────────────────────────────────────
await render(fasonScene(1920, 720, false), 'banner-fason.webp', 1920, 720);
await render(fasonScene(851, 1452, true), 'banner-fason-mobile.webp', 851, 1452);
console.log('service art written to', OUT);
