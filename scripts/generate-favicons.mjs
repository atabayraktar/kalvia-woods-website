// Re-runnable step that writes favicon.ico + apple-touch-icon.png from the real Kalvia
// Woods mark. Sources live in .claude/assets/ (gitignored raw brand-asset drops — see
// .gitignore's note on that folder); only the generated public/ output is committed, so
// this script only needs to run again if the source mark changes.
//
//   node scripts/generate-favicons.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Palette mirror of src/styles/_tokens.scss --wood — the apple-touch-icon must be OPAQUE
// (no alpha): iOS composites its own rounded mask and renders transparent pixels as black
// on the home screen otherwise.
const WOOD = '#1E1611';

function fmtKB(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

async function main() {
  // favicon.ico: a pre-crafted multi-resolution icon (16/32/48/64px, PNG-compressed frames)
  // already fine-tuned for legibility at tiny sizes — copied as-is rather than re-derived,
  // since naively downscaling the photoreal mark to 16px loses definition a proper favicon
  // tool preserves.
  const icoSource = path.join(ROOT, '.claude', 'assets', 'favicon.ico');
  const icoDest = path.join(ROOT, 'public', 'favicon.ico');
  fs.copyFileSync(icoSource, icoDest);
  console.log(`favicon.ico: ${fmtKB(fs.statSync(icoDest).size)} (copied from .claude/assets)`);

  // apple-touch-icon.png: the icon-only mark, trimmed, padded and flattened onto the wood
  // background at 180x180.
  const markSource = path.join(ROOT, '.claude', 'assets', 'logo-without-text.png');
  const trimmedBuf = await sharp(markSource).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();

  const CANVAS = 180;
  const INNER = 132; // ~73% of canvas, leaves safe padding
  const resizedBuf = await sharp(trimmedBuf).resize({ width: INNER, height: INNER, fit: 'inside' }).toBuffer();
  const resizedMeta = await sharp(resizedBuf).metadata();

  const padX = Math.round((CANVAS - resizedMeta.width) / 2);
  const padY = Math.round((CANVAS - resizedMeta.height) / 2);

  const applePath = path.join(ROOT, 'public', 'apple-touch-icon.png');
  await sharp(resizedBuf)
    .extend({
      top: padY,
      bottom: CANVAS - resizedMeta.height - padY,
      left: padX,
      right: CANVAS - resizedMeta.width - padX,
      background: WOOD,
    })
    .flatten({ background: WOOD })
    .png({ compressionLevel: 9 })
    .toFile(applePath);
  console.log(`apple-touch-icon.png: ${fmtKB(fs.statSync(applePath).size)} (from ${trimmedMeta.width}x${trimmedMeta.height} trimmed mark)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
