// Re-runnable catalog import (same approach as vision-detail-website/scripts/build-products.mjs,
// adapted to this repo's product shape): reads the owner's Excel sheet and writes
// src/data/products.js — PRODUCT_CATEGORIES, PRODUCT_SUBCATEGORIES and products — plus
// scripts/product-images.todo.md (which Drive folder each product's photos live in and the
// exact filenames to drop into public/images/products/<id>/).
//
//   node scripts/import-products.mjs ["C:\path\to\MadeCut Wrks.xlsx"]
//
// Sheet "Sayfa1" columns (header row 2): A ANA KATEGORİLER (a standalone list of the main
// categories, NOT per-row), C ÜRÜN ADI, D ÜRÜN GÖRSELİ (Google Drive FOLDER url), E ÜRÜN
// BOYUTU, F ÜRÜN AÇIKLAMASI, G ÜRÜN ÖZELLİKLERİ (comma / bullet / newline separated),
// H ÜRÜN KATEGORİSİ, I ÜRÜN ALT KATEGORİSİ, J RENK SEÇENEKLERİ ("-" = none).
//
// Output is deterministic for a given sheet + public/images/products/ tree, so the generated
// file is committed. Images: when public/images/products/<id>/1.webp… exists those files are
// used (thumbs: <n>-thumb.webp, posters: poster-<n>.webp); otherwise the two solid-colour
// placeholder sets are cycled per main category. Colour options become sibling products
// (same name.tr + category, each with `color`) — the shape /urunler/[id].jsx + VariantPicker
// already understand. en/de copy mirrors tr for free text (the site is Turkish-only); labels,
// taglines and colour names are translated.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import xlsx from 'xlsx';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DEFAULT_XLSX = 'C:\\Users\\ataba\\OneDrive\\Masaüstü\\MadeCut Wrks.xlsx';
const XLSX_PATH = process.argv[2] || DEFAULT_XLSX;
const SHEET = 'Sayfa1';
const OUT_DATA = path.join(ROOT, 'src', 'data', 'products.js');
const OUT_TODO = path.join(ROOT, 'scripts', 'product-images.todo.md');
const PRODUCT_IMG_ROOT = path.join(ROOT, 'public', 'images', 'products');

// Column indexes (0-based) in the sheet.
const COL = { mainCategory: 0, name: 2, drive: 3, size: 4, description: 5, features: 6, category: 7, subcategory: 8, colors: 9 };

// ---------- translations (tr label from the sheet → en/de). Unknown labels fall back to tr. ----------
const CATEGORY_I18N = {
  'Organizer & Workstation': { en: 'Organizers & Workstations', de: 'Organizer & Workstations' },
  'Duvar Dekoru': { en: 'Wall Décor', de: 'Wanddekor' },
  'Masaüstü Dekor': { en: 'Desk Décor', de: 'Schreibtischdekor' },
  'Çocuk Odası / Eğitici Ürünler': { en: 'Kids Room / Educational', de: 'Kinderzimmer / Lernprodukte' },
  'Tabela & İsimlik': { en: 'Signs & Nameplates', de: 'Schilder & Namensschilder' },
  'Aydınlatma': { en: 'Lighting', de: 'Beleuchtung' },
  'Hediyelik / Kişiselleştirilebilir Ürünler': { en: 'Gifts / Personalised', de: 'Geschenke / Personalisierbar' },
  'Hobi & Oyun': { en: 'Hobby & Games', de: 'Hobby & Spiele' },
  'İşletme / Ofis Ürünleri': { en: 'Business / Office', de: 'Gewerbe / Büro' },
  'Diğer': { en: 'Other', de: 'Sonstiges' },
};

const SUBCATEGORY_I18N = {
  'Hobi / Boya İstasyonu': {
    en: 'Hobby / Paint Stations', de: 'Hobby / Farbstationen',
    tagline: { tr: 'Hobi ve minyatür boyama için organizer', en: 'Organizer for hobby and miniature painting', de: 'Organizer für Hobby- und Miniaturmalerei' },
  },
  'Makeup Organizer': {
    en: 'Makeup Organizers', de: 'Make-up-Organizer',
    tagline: { tr: 'Masaüstü makyaj düzenleyici', en: 'Desktop makeup organizer', de: 'Make-up-Organizer für den Schreibtisch' },
  },
  'Aynalar': {
    en: 'Mirrors', de: 'Spiegel',
    tagline: { tr: 'Katmanlı dekoratif ayna', en: 'Layered decorative mirror', de: 'Mehrschichtiger Dekospiegel' },
  },
  'Duvar Saati': {
    en: 'Wall Clocks', de: 'Wanduhren',
    tagline: { tr: 'Dekoratif duvar saati', en: 'Decorative wall clock', de: 'Dekorative Wanduhr' },
  },
  'Tablolar': {
    en: 'Wall Art', de: 'Wandbilder',
    tagline: { tr: 'Katmanlı 3D duvar tablosu', en: 'Layered 3D wall art', de: 'Mehrschichtiges 3D-Wandbild' },
  },
};

const COLOR_I18N = {
  'Antik Ceviz': { en: 'Antique Walnut', de: 'Antik-Nussbaum' },
  'Doğal Meşe': { en: 'Natural Oak', de: 'Natureiche' },
  'Siyah & Ceviz': { en: 'Black & Walnut', de: 'Schwarz & Nussbaum' },
  'Eskitme Kahve': { en: 'Distressed Coffee', de: 'Kaffeebraun antik' },
  'Antrasit & Doğal Ahşap': { en: 'Anthracite & Natural Wood', de: 'Anthrazit & Naturholz' },
};

// Placeholder sets from scripts/generate-placeholders.mjs (set 1 = oak lattice, set 2 = green
// sign board), cycled per main category until real photos land in public/images/products/.
const PLACEHOLDER_SETS = [1, 2].map((n) => ({
  image: `/images/placeholder-product-${n}.webp`,
  gallery: [`/images/placeholder-product-${n}.webp`, `/images/placeholder-product-${n}-2.webp`],
  galleryThumbs: [`/images/placeholder-product-${n}-thumb.webp`, `/images/placeholder-product-${n}-2-thumb.webp`],
  posterImages: [`/images/placeholder-product-${n}-poster-1.webp`, `/images/placeholder-product-${n}-poster-2.webp`],
}));

// ---------- helpers ----------
const TR_MAP = { ş: 's', Ş: 's', ğ: 'g', Ğ: 'g', ı: 'i', I: 'i', İ: 'i', ö: 'o', Ö: 'o', ü: 'u', Ü: 'u', ç: 'c', Ç: 'c', â: 'a', î: 'i', û: 'u' };
function slugify(text) {
  return String(text)
    .replace(/[şŞğĞıIİöÖüÜçÇâîû]/g, (ch) => TR_MAP[ch])
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const clean = (v) => String(v ?? '').replace(/\u00a0/g, ' ').replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim();
// "-" / "—" / empty → null.
const nullable = (v) => {
  const s = clean(v);
  return s === '' || /^[-–—]+$/.test(s) ? null : s;
};
const capitalizeTr = (s) => (s ? s.charAt(0).toLocaleUpperCase('tr') + s.slice(1) : s);
const i18n = (tr) => ({ tr, en: tr, de: tr });
const labelOf = (tr, table) => ({ tr, en: table[tr]?.en ?? tr, de: table[tr]?.de ?? tr });
// Category code for ids: initials of the slug words ("organizer-workstation" → "ow").
const abbrev = (slug) => slug.split('-').map((w) => w[0]).join('');

// Description → "\n\n"-separated paragraphs (ProductInfo splits on \n\n); stray " ;" tidied.
function normalizeDescription(raw) {
  const s = nullable(raw);
  if (!s) return null;
  return s
    .split(/\n+/)
    .map((p) => p.trim().replace(/\s+;/g, ';').replace(/\s+,/g, ','))
    .filter(Boolean)
    .join('\n\n');
}

// ÜRÜN ÖZELLİKLERİ comes in four flavours across the sheet: newline lists, " • " bullet lists,
// comma lists and plain prose with sentences. Strategy: split on newlines, then bullets, then
// sentence boundaries (". " + capital/digit), and finally on commas — but only for list-like
// lines (3+ commas, no "Label:" prefix), never on decimal commas ("29,2") or inside parens.
function splitFeatures(raw) {
  const s = nullable(raw);
  if (!s) return [];
  const out = [];
  for (const line of s.split(/\n+/)) {
    const bullets = line.split(/\s*•\s*/).map((x) => x.trim()).filter(Boolean);
    for (const chunk of bullets) {
      const sentences = chunk.split(/\.\s+(?=[A-ZÇĞİÖŞÜ0-9])/).map((x) => x.trim()).filter(Boolean);
      for (const sentence of sentences) {
        const commaCount = (sentence.match(/,(?![0-9])/g) || []).length;
        const listLike = commaCount >= 3 && !/^[^,]{1,40}:/.test(sentence);
        const items = listLike ? splitTopLevelCommas(sentence) : [sentence];
        for (const item of items) {
          const text = capitalizeTr(item.trim().replace(/[.\s]+$/g, ''));
          if (text) out.push(text);
        }
      }
    }
  }
  return out;
}

// Comma split that ignores commas between digits (Turkish decimals) and inside parentheses.
function splitTopLevelCommas(text) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === '(') depth += 1;
    if (ch === ')') depth = Math.max(0, depth - 1);
    const decimal = ch === ',' && /\d/.test(text[i - 1] ?? '') && /\d/.test(text[i + 1] ?? '');
    if (ch === ',' && depth === 0 && !decimal) {
      parts.push(cur);
      cur = '';
    } else cur += ch;
  }
  parts.push(cur);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function splitColors(raw) {
  const s = nullable(raw);
  if (!s) return [];
  return splitTopLevelCommas(s.replace(/\n+/g, ', ')).map((c) => c.replace(/[.\s]+$/g, '')).filter(Boolean);
}

// Real photos dropped into public/images/products/<id>/: 1.webp, 2.webp… (gallery, first =
// card image), optional <n>-thumb.webp, optional poster-1.webp… Returns null when absent.
function localImages(folder) {
  const dir = path.join(PRODUCT_IMG_ROOT, folder);
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  const byNum = (re) =>
    files
      .filter((f) => re.test(f))
      .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
  const gallery = byNum(/^\d+\.(webp|jpe?g|png)$/i);
  if (gallery.length === 0) return null;
  const web = (f) => `/images/products/${folder}/${f}`;
  const thumbFor = (f) => {
    const t = f.replace(/(\.\w+)$/, '-thumb$1');
    return files.includes(t) ? t : f;
  };
  return {
    image: web(gallery[0]),
    gallery: gallery.map(web),
    galleryThumbs: gallery.map((f) => web(thumbFor(f))),
    posterImages: byNum(/^poster-\d+\.(webp|jpe?g|png)$/i).map(web),
  };
}

// Single-quoted, 2-space JS serializer (keeps the committed data file readable and diffable).
function toJs(value, indent = 0) {
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  if (typeof value !== 'object') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const simple = value.every((v) => typeof v !== 'object' || v === null);
    if (simple && value.join(', ').length < 90) return `[${value.map((v) => toJs(v, indent + 1)).join(', ')}]`;
    return `[\n${value.map((v) => `${padIn}${toJs(v, indent + 1)},`).join('\n')}\n${pad}]`;
  }
  const entries = Object.entries(value);
  if (entries.length === 0) return '{}';
  const inline = entries.every(([, v]) => typeof v !== 'object' || v === null);
  const render = ([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : toJs(k)}: ${toJs(v, indent + 1)}`;
  if (inline && entries.map(render).join(', ').length < 100) return `{ ${entries.map(render).join(', ')} }`;
  return `{\n${entries.map((e) => `${padIn}${render(e)},`).join('\n')}\n${pad}}`;
}

// ---------- convert raw photo folders ----------
// Drop one folder per product NAME (exactly as in the sheet, e.g. "ArcStation Hobi Boya
// İstasyonu") into product-images/, with the photos inside (any name/format; sorted naturally,
// first = card image). They are converted to public/images/products/<name-slug>/N.webp (+
// N-thumb.webp). For colour variants add a sub-folder named after the colour.
const SRC_ROOT = process.argv[3] ? path.resolve(process.argv[3]) : path.join(ROOT, 'product-images');
const IMG_RE = /.(jpe?g|png|webp|avif|heic|tiff?)$/i;
async function convertDir(srcDir, outDir) {
  const files = fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isFile() && IMG_RE.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, 'tr', { numeric: true }));
  if (files.length) fs.mkdirSync(outDir, { recursive: true });
  for (const [i, f] of files.entries()) {
    const img = sharp(path.join(srcDir, f), { failOn: 'none' }).rotate();
    await img.clone().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(outDir, `${i + 1}.webp`));
    await img.clone().resize({ width: 240, height: 240, fit: 'cover' }).webp({ quality: 75 }).toFile(path.join(outDir, `${i + 1}-thumb.webp`));
  }
  return files.length;
}
if (fs.existsSync(SRC_ROOT)) {
  for (const e of fs.readdirSync(SRC_ROOT, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const slug = slugify(e.name);
    const src = path.join(SRC_ROOT, e.name);
    let n = await convertDir(src, path.join(PRODUCT_IMG_ROOT, slug));
    for (const sub of fs.readdirSync(src, { withFileTypes: true }).filter((x) => x.isDirectory())) {
      n += await convertDir(path.join(src, sub.name), path.join(PRODUCT_IMG_ROOT, slug, slugify(sub.name)));
    }
    console.log(`images: ${e.name} -> ${slug} (${n})`);
  }
}

// ---------- read the sheet ----------
if (!fs.existsSync(XLSX_PATH)) {
  console.error(`Sheet not found: ${XLSX_PATH}`);
  process.exit(1);
}
const workbook = xlsx.readFile(XLSX_PATH);
const sheet = workbook.Sheets[SHEET];
if (!sheet) {
  console.error(`Sheet "${SHEET}" missing; found: ${workbook.SheetNames.join(', ')}`);
  process.exit(1);
}
const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
const headerIdx = rows.findIndex((r) => clean(r[COL.name]).toUpperCase() === 'ÜRÜN ADI');
if (headerIdx === -1) {
  console.error('Header row with "ÜRÜN ADI" not found.');
  process.exit(1);
}
const dataRows = rows.slice(headerIdx + 1);
const warnings = [];

// Main categories: column A is its own list (one per row, independent of the product rows).
const categories = [];
const catBySlug = new Map();
const addCategory = (tr) => {
  const slug = slugify(tr);
  if (catBySlug.has(slug)) return catBySlug.get(slug);
  const cat = { slug, label: labelOf(tr, CATEGORY_I18N) };
  categories.push(cat);
  catBySlug.set(slug, cat);
  return cat;
};
for (const row of dataRows) {
  const tr = nullable(row[COL.mainCategory]);
  if (tr) addCategory(tr);
}

// Subcategories: canonical label = first spelling seen (case-insensitive), parent = product's category.
const subcategories = [];
const subBySlug = new Map();
const addSubcategory = (trRaw, parentSlug) => {
  const slug = slugify(trRaw);
  if (subBySlug.has(slug)) {
    const existing = subBySlug.get(slug);
    if (existing.label.tr !== trRaw) warnings.push(`Subcategory spelled "${trRaw}" vs "${existing.label.tr}" — merged.`);
    if (existing.category !== parentSlug) warnings.push(`Subcategory "${trRaw}" appears under two main categories (${existing.category}, ${parentSlug}).`);
    return existing;
  }
  // Prefer the dictionary's spelling when the sheet only differs by case ("tablolar").
  const canonical = Object.keys(SUBCATEGORY_I18N).find((k) => slugify(k) === slug) ?? capitalizeTr(trRaw);
  const sub = { slug, category: parentSlug, label: labelOf(canonical, SUBCATEGORY_I18N) };
  subcategories.push(sub);
  subBySlug.set(slug, sub);
  return sub;
};

// ---------- products ----------
const products = [];
const counters = new Map();
const nameSeen = new Map();
const todo = [];

for (const [i, row] of dataRows.entries()) {
  const rowNo = headerIdx + i + 2; // 1-based Excel row number
  const name = nullable(row[COL.name]);
  if (!name) continue;
  if (clean(row[COL.name]) !== String(row[COL.name] ?? '')) warnings.push(`Row ${rowNo}: "${name}" had stray whitespace in ÜRÜN ADI.`);

  const categoryTr = nullable(row[COL.category]);
  if (!categoryTr) {
    warnings.push(`Row ${rowNo}: "${name}" has no ÜRÜN KATEGORİSİ — skipped.`);
    continue;
  }
  const catSlug = slugify(categoryTr);
  if (!catBySlug.has(catSlug)) {
    warnings.push(`Row ${rowNo}: category "${categoryTr}" is not in ANA KATEGORİLER — added.`);
    addCategory(categoryTr);
  }
  const category = catBySlug.get(catSlug);

  const subTr = nullable(row[COL.subcategory]);
  const sub = subTr ? addSubcategory(subTr, catSlug) : null;
  if (!sub) warnings.push(`Row ${rowNo}: "${name}" has no ÜRÜN ALT KATEGORİSİ.`);

  const description = normalizeDescription(row[COL.description]);
  if (!description) warnings.push(`Row ${rowNo}: "${name}" has no description.`);
  else if (!/[.!?»")]$/.test(description)) warnings.push(`Row ${rowNo}: "${name}" description seems cut off (no terminal punctuation).`);
  if (description && /dijital (dosya|indirme) olarak|fiziksel ürün (değil|gönderimi yapılmaz)/i.test(description)) warnings.push(`Row ${rowNo}: "${name}" description says it is a DIGITAL FILE, not a physical product.`);

  const features = splitFeatures(row[COL.features]);
  if (features.length < 2) warnings.push(`Row ${rowNo}: "${name}" has only ${features.length} feature(s).`);
  const dimensions = nullable(row[COL.size]);
  if (!dimensions) warnings.push(`Row ${rowNo}: "${name}" has no ÜRÜN BOYUTU.`);
  const driveFolder = nullable(row[COL.drive]);
  if (!driveFolder) warnings.push(`Row ${rowNo}: "${name}" has no Drive folder.`);

  const nameKey = slugify(name);
  if (nameSeen.has(nameKey)) warnings.push(`Row ${rowNo}: duplicate product name "${name}" (also row ${nameSeen.get(nameKey)}).`);
  nameSeen.set(nameKey, rowNo);
  const firstWord = nameKey.split('-')[0];
  const twin = [...nameSeen.keys()].find((k) => k !== nameKey && k.split('-')[0] === firstWord);
  if (twin) warnings.push(`Row ${rowNo}: "${name}" shares its leading name "${firstWord}" with "${twin}".`);

  const code = abbrev(catSlug);
  const n = (counters.get(code) ?? 0) + 1;
  counters.set(code, n);
  const baseId = `kw-${code}-${String(n).padStart(3, '0')}`;

  const colors = splitColors(row[COL.colors]);
  const variants = colors.length ? colors.map((c) => ({ id: `${baseId}-${slugify(c)}`, color: labelOf(c, COLOR_I18N) })) : [{ id: baseId, color: null }];
  for (const c of colors) if (!COLOR_I18N[c]) warnings.push(`Row ${rowNo}: colour "${c}" has no en/de translation (tr reused).`);

  const catIndex = categories.indexOf(category);
  const placeholder = PLACEHOLDER_SETS[catIndex % PLACEHOLDER_SETS.length];
  const tagline = sub ? SUBCATEGORY_I18N[sub.label.tr]?.tagline ?? i18n(sub.label.tr) : category.label;

  for (const variant of variants) {
    const nameSlug = slugify(name);
    const images =
      (variant.color ? localImages(`${nameSlug}/${slugify(colors[variants.indexOf(variant)])}`) : null) ??
      localImages(nameSlug) ??
      placeholder;
    products.push({
      id: variant.id,
      name: i18n(name),
      category: catSlug,
      subcategory: sub?.slug ?? null,
      tagline,
      description: i18n(description ?? ''),
      features: features.map(i18n),
      dimensions,
      color: variant.color,
      size: null,
      isNew: false,
      inStock: true,
      driveFolder,
      image: images.image,
      gallery: images.gallery,
      galleryThumbs: images.galleryThumbs,
      posterImages: images.posterImages,
      posterDescription: null,
      video: null,
    });
    todo.push({ id: variant.id, name: variant.color ? `${name} — ${variant.color.tr}` : name, driveFolder, real: images !== placeholder });
  }
}

// Unique ids / ambiguous category codes guard.
const ids = new Set();
for (const p of products) {
  if (ids.has(p.id)) {
    console.error(`Duplicate id ${p.id} — category code collision; adjust abbrev().`);
    process.exit(1);
  }
  ids.add(p.id);
}
const emptyCats = categories.filter((c) => !products.some((p) => p.category === c.slug));
if (emptyCats.length) warnings.push(`Main categories with no products (kept in PRODUCT_CATEGORIES, hidden from filters): ${emptyCats.map((c) => c.label.tr).join(', ')}.`);

// ---------- write src/data/products.js ----------
const header = `// Kalvia Woods product data — GENERATED by scripts/import-products.mjs from the owner's
// Excel sheet ("${path.basename(XLSX_PATH)}", sheet ${SHEET}). Do not hand-edit; re-run the script.
// Shape per product:
//   id, name{tr,en,de}, category (slug from PRODUCT_CATEGORIES), subcategory (slug from
//   PRODUCT_SUBCATEGORIES or null), tagline, description, features[], dimensions (free-text
//   size line(s) or null), color/size (only for sibling variants), isNew, inStock,
//   driveFolder (Google Drive folder holding the real photos — see scripts/product-images.todo.md),
//   image, gallery[], galleryThumbs[], posterImages[], posterDescription,
//   video ({ mp4, webm?, poster? } or null).
// Products sharing the same name.tr + category are colour/size siblings surfaced through
// VariantPicker on /urunler/[id].jsx. Image paths are placeholders until real photos exist in
// product-images/<ürün adı>/ (any photo names; converted to public/images/products/<name-slug>/) — the import
// script picks those up automatically. en/de copy mirrors tr (the site is Turkish-only).

`;
const fileContent = `${header}export const PRODUCT_CATEGORIES = ${toJs(categories)};

// slug, parent main-category slug, label.
export const PRODUCT_SUBCATEGORIES = ${toJs(subcategories)};

export const products = ${toJs(products)};
`;
fs.writeFileSync(OUT_DATA, fileContent, 'utf8');

// ---------- write scripts/product-images.todo.md ----------
const todoLines = [
  '# Product images TODO',
  '',
  'Generated by `scripts/import-products.mjs`. The Google Drive folders below hold the real product',
  'photos. For each product, export the photos as WebP and drop them into',
  '`public/images/products/<id>/` using the target filenames, then re-run',
  '`node scripts/import-products.mjs` — the script switches that product from the placeholder',
  'images to the real files automatically. Colour variants share the base product\'s folder',
  'unless they get their own `<variant-id>/` folder.',
  '',
  '- `1.webp` — card + first gallery image (square, ≤1200px)',
  '- `2.webp`, `3.webp`, … — further gallery images',
  '- `1-thumb.webp`, `2-thumb.webp`, … — 160px thumbnails (optional; the full image is used if missing)',
  '- `poster-1.webp`, `poster-2.webp`, `poster-3.webp` — "Detaylı Bilgi" poster photos (optional, 1600×1200)',
  '',
  '| Status | id | Product | Drive folder | Target files |',
  '| --- | --- | --- | --- | --- |',
  ...todo.map((t) => `| ${t.real ? 'done' : 'todo'} | \`${t.id}\` | ${t.name} | ${t.driveFolder ? `[folder](${t.driveFolder})` : '—'} | \`public/images/products/${t.id}/1.webp\`, \`2.webp\`, \`1-thumb.webp\`, \`2-thumb.webp\`, \`poster-1.webp\` |`),
  '',
];
fs.writeFileSync(OUT_TODO, todoLines.join('\n'), 'utf8');

// ---------- report ----------
console.log(`Wrote ${path.relative(ROOT, OUT_DATA)}: ${products.length} products from ${nameSeen.size} sheet rows (colour variants expanded), ${categories.length} main categories, ${subcategories.length} subcategories.`);
const perCat = {};
for (const p of products) perCat[p.category] = (perCat[p.category] ?? 0) + 1;
console.log('Products per category:', perCat);
const perSub = {};
for (const p of products) perSub[p.subcategory] = (perSub[p.subcategory] ?? 0) + 1;
console.log('Products per subcategory:', perSub);
console.log(`Real photo folders found: ${todo.filter((t) => t.real).length} / ${todo.length}`);
if (warnings.length) {
  console.log(`\nSheet warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log(` - ${w}`));
}
