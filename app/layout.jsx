import './globals.css';
import Script from 'next/script';
import AutoRefresh from '../components/AutoRefresh';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashi-livenews24.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Kashi Live News 24 | Varanasi, Kashi, Banaras', template: '%s | Kashi Live News 24' },
  description: 'वाराणसी, काशी और बनारस की हिंदी खबरें और स्थानीय अपडेट।',
  openGraph: {
    title: 'Kashi Live News 24',
    description: 'वाराणसी, काशी और बनारस की हिंदी खबरें और स्थानीय अपडेट।',
    type: 'website',
    locale: 'hi_IN',
    siteName: 'Kashi Live News 24'
  },
  twitter: { card: 'summary_large_image', title: 'Kashi Live News 24', description: 'वाराणसी, काशी और बनारस की हिंदी खबरें और स्थानीय अपडेट।' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-3384811402018637';
  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kashi Live News 24',
    url: siteUrl,
    publisher: { '@type': 'Organization', name: 'Kashi Live News 24' },
    inLanguage: 'hi',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="hi">
      <head>
        <meta name="google-adsense-account" content={adsenseClient} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema).replace(/</g, '\u003c') }} />
        <AutoRefresh />
        {children}
        <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" />
      </body>
    </html>
  );
}
