// Re-runnable generator for every placeholder asset the site references until real
// Kalvia Woods photography/video is supplied. Everything is produced locally: palette-matched
// WebP art via sharp (flat base colour + subtle wood grain / laser-cut pattern), looping MP4
// clips via ffmpeg (skipped with a warning if ffmpeg isn't on PATH). No network access.
//
//   node scripts/generate-placeholders.mjs
//
// Base colours come from the "Atölye Defteri" palette (src/styles/_tokens.scss): bottle
// green, oak and walnut. The pattern is deterministic, so re-runs are byte-identical.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGES = path.join(ROOT, 'public', 'images');
const VIDEOS = path.join(ROOT, 'public', 'videos');

fs.mkdirSync(IMAGES, { recursive: true });
fs.mkdirSync(VIDEOS, { recursive: true });

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

// Deterministic PRNG.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Wavy plank grain: long, slightly drifting horizontal lines in a lighter + darker tint.
function grainLayer(width, height, rand, light, dark) {
  const lines = [];
  const rows = Math.round(height / 9);
  for (let i = 0; i < rows; i++) {
    const y = (i / rows) * height + rand() * 6;
    const amp = 2 + rand() * 7;
    const wave = width / (1.2 + rand() * 2.4);
    const phase = rand() * 6.28;
    let d = `M0 ${y.toFixed(1)}`;
    for (let x = 0; x <= width + 40; x += 40) {
      d += ` L${x} ${(y + Math.sin(x / wave + phase) * amp).toFixed(1)}`;
    }
    const stroke = rand() > 0.45 ? light : dark;
    const op = (0.05 + rand() * 0.11).toFixed(3);
    lines.push(
      `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${(0.8 + rand() * 2.2).toFixed(1)}" stroke-opacity="${op}"/>`
    );
  }
  // a couple of knots
  for (let k = 0; k < 2; k++) {
    const cx = width * (0.2 + rand() * 0.6);
    const cy = height * (0.2 + rand() * 0.6);
    for (let r = 1; r < 5; r++) {
      lines.push(
        `<ellipse cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${r * 14}" ry="${r * 6}" fill="none" stroke="${dark}" stroke-opacity="0.08" stroke-width="1.5"/>`
      );
    }
  }
  return lines.join('');
}

// Laser-cut lattice: a field of diamond cut-outs (darker, with a thin lit edge).
function latticeLayer(x0, y0, w, h, cell, dark, light) {
  const out = [];
  for (let y = y0; y < y0 + h; y += cell) {
    for (let x = x0; x < x0 + w; x += cell) {
      const cx = x + cell / 2;
      const cy = y + cell / 2;
      const r = cell * 0.34;
      out.push(
        `<path d="M${cx} ${cy - r}L${cx + r} ${cy}L${cx} ${cy + r}L${cx - r} ${cy}Z" fill="${dark}" fill-opacity="0.55" stroke="${light}" stroke-opacity="0.22" stroke-width="1"/>`
      );
      out.push(`<circle cx="${cx}" cy="${cy}" r="${cell * 0.07}" fill="${light}" fill-opacity="0.18"/>`);
    }
  }
  return out.join('');
}

// Concentric laser-cut rosette.
function rosetteLayer(cx, cy, radius, dark, light) {
  const out = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * 360;
    out.push(
      `<ellipse cx="${cx}" cy="${cy - radius * 0.55}" rx="${radius * 0.13}" ry="${radius * 0.38}" transform="rotate(${a} ${cx} ${cy})" fill="${dark}" fill-opacity="0.5" stroke="${light}" stroke-opacity="0.25"/>`
    );
  }
  out.push(`<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${light}" stroke-opacity="0.28" stroke-width="2"/>`);
  out.push(`<circle cx="${cx}" cy="${cy}" r="${radius * 0.16}" fill="${dark}" fill-opacity="0.6"/>`);
  return out.join('');
}

// kind: grain | lattice | rosette | sign (PVC board with cut-out lettering).
function artSvg(width, height, hex, kind, seed) {
  const rand = rng(seed);
  const light = '#F3EAD7';
  const dark = '#0E2018';
  let body = grainLayer(width, height, rand, light, dark);
  const m = Math.min(width, height);
  if (kind === 'lattice') {
    const cell = Math.max(28, Math.round(m / 12));
    body += latticeLayer(width * 0.1, height * 0.1, width * 0.8, height * 0.8, cell, dark, '#D9A15B');
  } else if (kind === 'rosette') {
    body += rosetteLayer(width * 0.62, height * 0.5, m * 0.3, dark, '#D9A15B');
  } else if (kind === 'sign') {
    body += `<rect x="${width * 0.12}" y="${height * 0.3}" width="${width * 0.76}" height="${height * 0.4}" rx="6" fill="${dark}" fill-opacity="0.18" stroke="#D9A15B" stroke-opacity="0.35" stroke-width="2"/>`;
    for (let i = 0; i < 5; i++) {
      body += `<rect x="${width * (0.18 + i * 0.13)}" y="${height * 0.4}" width="${width * 0.07}" height="${height * 0.2}" fill="${dark}" fill-opacity="0.5"/>`;
    }
  }
  // thin honey rule, like the ledger lines used across the site
  body += `<rect x="${width * 0.08}" y="${height * 0.5 - 1}" width="${width * 0.84}" height="1" fill="#D9A15B" fill-opacity="0.22"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${hex}"/>${body}</svg>`;
}

async function art(name, width, height, hex, quality = 74, kind = 'grain', seed = 7) {
  const out = path.join(IMAGES, name);
  await sharp(Buffer.from(artSvg(width, height, hex, kind, seed))).webp({ quality }).toFile(out);
  console.log(`${name}: ${width}x${height} ${fmtKB(fs.statSync(out).size)}`);
}

async function solidPng(name, width, height, hex) {
  const out = path.join(IMAGES, name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="${hex}"/></svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(out);
  console.log(`${name}: ${width}x${height} ${fmtKB(fs.statSync(out).size)}`);
}

function hasFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  return !probe.error && probe.status === 0;
}

// Muted 4s H.264 loop of the matching art (so clip and poster agree), with faststart — the
// same encode flags a real hero clip would ship with.
async function artMp4(name, width, height, hex, seed) {
  const out = path.join(VIDEOS, name);
  const tmp = path.join(os.tmpdir(), `kw-${name}.png`);
  await sharp(Buffer.from(artSvg(width, height, hex, 'grain', seed))).png().toFile(tmp);
  execFileSync(
    'ffmpeg',
    [
      '-y', '-loop', '1', '-framerate', '24', '-i', tmp, '-t', '4', '-an',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '30', '-preset', 'fast',
      '-movflags', '+faststart', out,
    ],
    { stdio: 'ignore' }
  );
  fs.rmSync(tmp, { force: true });
  console.log(`${name}: ${width}x${height} ${fmtKB(fs.statSync(out).size)}`);
}

async function main() {
  // Hero slides (desktop 16:9 + a portrait mobile crop). Slides 1-2 are video, 3 is a still.
  const heroColours = ['#173A2F', '#1C4436', '#13302A'];
  const heroKinds = ['grain', 'lattice', 'rosette'];
  const ffmpeg = hasFfmpeg();
  if (!ffmpeg) {
    console.warn('ffmpeg not found on PATH — hero slides will be image-only (no video placeholders written).');
  }
  for (const [i, hex] of heroColours.entries()) {
    const n = i + 1;
    await art(`placeholder-hero-${n}.webp`, 1920, 1080, hex, 70, heroKinds[i], 10 + n);
    await art(`placeholder-hero-${n}-mobile.webp`, 1080, 1920, hex, 70, heroKinds[i], 20 + n);
    if (ffmpeg && n <= 2) {
      await artMp4(`placeholder-hero-${n}.mp4`, 1280, 720, hex, 10 + n);
      await artMp4(`placeholder-hero-${n}-mobile.mp4`, 720, 1280, hex, 20 + n);
    }
  }

  // Category cards (3:4): oak lattice panel, green PVC sign board, honey plank, walnut rosette.
  const categories = [
    ['#9A6A3C', 'lattice'],
    ['#2C4A3E', 'sign'],
    ['#B98A4F', 'grain'],
    ['#6B4A2E', 'rosette'],
  ];
  for (const [i, [hex, kind]] of categories.entries()) {
    await art(`placeholder-category-${i + 1}.webp`, 640, 853, hex, 74, kind, 30 + i);
  }

  // About section image (4:3).
  await art('placeholder-about.webp', 1000, 750, '#8A5E36', 74, 'rosette', 41);

  // Custom-order banner: wide desktop frame + tall mobile crop.
  await art('placeholder-banner.webp', 1920, 731, '#173A2F', 70, 'lattice', 51);
  await art('placeholder-banner-mobile.webp', 851, 1452, '#173A2F', 70, 'lattice', 52);

  // Products: square packshot + thumb, one extra gallery shot, two poster photos each.
  const productColours = ['#A9784A', '#2C4A3E'];
  const productKinds = ['lattice', 'sign'];
  for (const [i, hex] of productColours.entries()) {
    const n = i + 1;
    const k = productKinds[i];
    await art(`placeholder-product-${n}.webp`, 1200, 1200, hex, 74, k, 60 + n);
    await art(`placeholder-product-${n}-thumb.webp`, 160, 160, hex, 74, k, 60 + n);
    await art(`placeholder-product-${n}-2.webp`, 1200, 1200, hex, 74, 'grain', 70 + n);
    await art(`placeholder-product-${n}-2-thumb.webp`, 160, 160, hex, 74, 'grain', 70 + n);
    await art(`placeholder-product-${n}-poster-1.webp`, 1600, 1200, hex, 74, k, 80 + n);
    await art(`placeholder-product-${n}-poster-2.webp`, 1600, 1200, hex, 74, 'grain', 90 + n);
  }

  // Open Graph / Twitter share image.
  await solidPng('placeholder-og.png', 1200, 630, '#14342A');

  console.log('\nPlaceholder assets written to public/images and public/videos.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
