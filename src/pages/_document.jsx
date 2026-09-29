import { Html, Head, Main, NextScript } from 'next/document';

// Fonts are loaded via next/font/google in _app.jsx (self-hosted, zero external request,
// automatically preloaded per-page) — no manual Google Fonts <link> needed here.
// One fixed dark-wood theme: no theme attribute, no pre-hydration theme script.
export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1E1611" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
