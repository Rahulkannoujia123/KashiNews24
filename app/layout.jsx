import './globals.css';
import Script from 'next/script';

export const metadata = {
  metadataBase: new URL('https://kashilive24.in'),
  title: { default: 'Kashi Live 24 | Varanasi ki har khabar, sabse pehle', template: '%s | Kashi Live 24' },
  description: 'Varanasi aur Purvanchal ki trusted local news, updates, traffic, jobs aur city stories.',
  openGraph: { title: 'Kashi Live 24', description: 'Varanasi ki har khabar, sabse pehle', type: 'website', locale: 'hi_IN' },
  twitter: { card: 'summary_large_image', title: 'Kashi Live 24' }
};

export default function RootLayout({ children }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return <html lang="hi"><body>{children}{adsenseClient && <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`} crossOrigin="anonymous" />}</body></html>;
}
