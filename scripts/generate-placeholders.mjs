// Re-runnable generator for every placeholder asset the site references until real
// Kalvia Woods photography/video is supplied. Everything is produced locally: solid-colour
// WebP images via sharp, solid-colour looping MP4 clips via ffmpeg (skipped with a warning
// if ffmpeg isn't on PATH). No network access, no source drops.
//
//   node scripts/generate-placeholders.mjs
//
// Colours are pulled from the dark-wood palette (src/styles/_tokens.scss) with slight
// variance per asset so neighbouring slides/cards are visually distinguishable.
import fs from 'node:fs';
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

// Solid fill + a faint centred "grain" line so the frame isn't a dead flat rectangle —
// still unmistakably a placeholder.
async function solidWebp(name, width, height, hex, quality = 80) {
  const out = path.join(IMAGES, name);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${hex}"/>
  <rect x="${width * 0.08}" y="${height * 0.5 - 1}" width="${width * 0.84}" height="2" fill="#B07A45" fill-opacity="0.35"/>
</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality }).toFile(out);
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

// Muted, 4s, solid-colour H.264 loop with faststart — same encode flags a real hero clip
// would ship with, so swapping in real footage later is a pure file replacement.
function solidMp4(name, width, height, hex) {
  const out = path.join(VIDEOS, name);
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-f', 'lavfi',
      '-i', `color=c=0x${hex.replace('#', '')}:s=${width}x${height}:r=24:d=4`,
      '-an',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-crf', '30',
      '-preset', 'fast',
      '-movflags', '+faststart',
      out,
    ],
    { stdio: 'ignore' }
  );
  console.log(`${name}: ${width}x${height} ${fmtKB(fs.statSync(out).size)}`);
}

async function main() {
  // Hero slides (desktop 16:9 + a portrait mobile crop, mirroring the art-direction split
  // HeroSlider.jsx already handles). Slides 1-2 are video, slide 3 is a still.
  const heroColours = ['#3B2A1E', '#4A3527', '#2E2119'];
  const ffmpeg = hasFfmpeg();
  if (!ffmpeg) {
    console.warn('ffmpeg not found on PATH — hero slides will be image-only (no video placeholders written).');
  }
  for (const [i, hex] of heroColours.entries()) {
    const n = i + 1;
    await solidWebp(`placeholder-hero-${n}.webp`, 1920, 1080, hex, 78);
    await solidWebp(`placeholder-hero-${n}-mobile.webp`, 1080, 1920, hex, 78);
    if (ffmpeg && n <= 2) {
      solidMp4(`placeholder-hero-${n}.mp4`, 1920, 1080, hex);
      solidMp4(`placeholder-hero-${n}-mobile.mp4`, 1080, 1920, hex);
    }
  }

  // Category cards (3:4, ~300px CSS wide -> 640px covers 2x).
  const categoryColours = ['#4A3527', '#3B2A1E', '#5A4230', '#2E2119'];
  for (const [i, hex] of categoryColours.entries()) {
    await solidWebp(`placeholder-category-${i + 1}.webp`, 640, 853, hex);
  }

  // About section image (4:3).
  await solidWebp('placeholder-about.webp', 1000, 750, '#4A3527');

  // Custom-order banner: wide desktop frame + tall mobile crop (same ratios the banner
  // frame uses in CustomOrderBanner.scss).
  await solidWebp('placeholder-banner.webp', 1920, 731, '#3B2A1E');
  await solidWebp('placeholder-banner-mobile.webp', 851, 1452, '#3B2A1E');

  // Products: square packshot + thumb, one extra gallery shot, two poster photos each.
  const productColours = ['#5A4230', '#3B2A1E'];
  for (const [i, hex] of productColours.entries()) {
    const n = i + 1;
    await solidWebp(`placeholder-product-${n}.webp`, 1200, 1200, hex);
    await solidWebp(`placeholder-product-${n}-thumb.webp`, 160, 160, hex);
    await solidWebp(`placeholder-product-${n}-2.webp`, 1200, 1200, hex);
    await solidWebp(`placeholder-product-${n}-2-thumb.webp`, 160, 160, hex);
    await solidWebp(`placeholder-product-${n}-poster-1.webp`, 1600, 1200, hex);
    await solidWebp(`placeholder-product-${n}-poster-2.webp`, 1600, 1200, hex);
  }

  // Open Graph / Twitter share image.
  await solidPng('placeholder-og.png', 1200, 630, '#1E1611');

  console.log('\nPlaceholder assets written to public/images and public/videos.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
