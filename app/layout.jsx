import './globals.css';

export const metadata = {
  metadataBase: new URL('https://kashilive24.in'),
  title: { default: 'Kashi Live 24 | Varanasi ki har khabar, sabse pehle', template: '%s | Kashi Live 24' },
  description: 'Varanasi aur Purvanchal ki trusted local news, updates, traffic, jobs aur city stories.',
  openGraph: { title: 'Kashi Live 24', description: 'Varanasi ki har khabar, sabse pehle', type: 'website', locale: 'hi_IN' },
  twitter: { card: 'summary_large_image', title: 'Kashi Live 24' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <meta name="google-adsense-account" content="ca-pub-3384811402018637" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3384811402018637"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
