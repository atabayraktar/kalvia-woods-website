// Prebuild step (see package.json "build" script): writes robots.txt, llms.txt and
// sitemap.xml into public/ from the same page/product source Next.js builds from.
// Static-export friendly — no runtime route involved.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
// Placeholder domain — replace with the real one before launch (also in the three page
// files under src/pages).
const SITE_URL = 'https://kalviawoods.example';

// products.js is plain JS (not JSON) — a dynamic import works fine from an .mjs script.
// pathToFileURL is required on Windows: a raw absolute path like "C:\..." isn't a valid
// ESM import specifier/URL on its own.
const productsModuleUrl = pathToFileURL(path.join(__dirname, '..', 'src', 'data', 'products.js'));
const { products } = await import(productsModuleUrl);
const contentModuleUrl = pathToFileURL(path.join(__dirname, '..', 'src', 'data', 'homepageContent.js'));
const { contactSection } = await import(contentModuleUrl);

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/urunler', priority: '0.9', changefreq: 'weekly' },
  ...products.map((p) => ({ path: `/urunler/${p.id}`, priority: '0.7', changefreq: 'monthly' })),
];

function writeRobotsTxt() {
  const content = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), content);
}

function writeLlmsTxt() {
  const content = `# Kalvia Woods

> Kalvia Woods is a Turkish manufacturing workshop that produces custom laser-cut products:
> hobby and paint stations, makeup organizers, decorative mirrors, wall art and
> made-to-order pieces. Every piece is designed and cut in-house on a laser-cutting machine.

## Key facts

- Entity: Kalvia Woods is the manufacturer of its own products (not a distributor or reseller).
- Customisation: size, colour and lettering can be tailored on request.
- Sales channel: WhatsApp (${contactSection.phone}) — there is no online cart/checkout on this site.
- Contact: Instagram ${contactSection.instagramHandle}, WhatsApp ${contactSection.whatsappHref}
- Note: contact details and product data on this site are placeholders pending real content.

## Pages

- [Homepage](${SITE_URL}/): hero, product categories, about Kalvia Woods, contact.
- [Products](${SITE_URL}/urunler): laser-cut product catalog, filterable by category.

## Sitemap

${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), content);
}

function writeSitemap() {
  const urls = STATIC_PAGES.map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('\n');

  const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), content);
}

writeRobotsTxt();
writeLlmsTxt();
writeSitemap();
console.log('SEO files written: robots.txt, llms.txt, sitemap.xml');
