// Central site configuration. No fake contact details, addresses or phone numbers.
export const SITE = {
  name: 'Kashi Live News 24',
  shortName: 'Kashi Live 24',
  tagline: 'VARANASI KI HAR KHABAR, SABSE PEHLE',
  locationLine: 'VARANASI · KASHI · BANARAS',
  url: 'https://kashilive24.in',
  description:
    'Kashi Live News 24 - Varanasi, Kashi aur Purvanchal ki trusted local Hindi news, breaking updates, politics, crime, education aur city stories.',
  locale: 'hi_IN',
  language: 'hi',
  // Only add real, verified contact handles here. Left empty on purpose.
  email: '',
  social: {
    // Fill with real, verified profiles before launch.
    facebook: '',
    x: '',
    youtube: '',
    instagram: '',
  },
}

// Public taxonomy. The order also drives the primary navigation.
export const CATEGORIES = [
  'Varanasi',
  'Kashi',
  'Politics',
  'Crime',
  'Education',
  'Business',
  'Sports',
  'Weather',
  'Health',
  'Jobs',
  'Entertainment',
  'Uttar Pradesh',
  'India',
  'Technology',
]

// Sections shown on the homepage, in editorial priority order (local first).
export const HOME_SECTIONS = [
  'Varanasi',
  'Kashi',
  'Politics',
  'Crime',
  'Education',
  'Business',
  'Sports',
  'Weather',
]

export const categoryHref = (category) =>
  category ? `/?category=${encodeURIComponent(category)}` : '/'

// Trust / legal pages used across the footer and page routes.
export const LEGAL_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/correction-policy', label: 'Corrections Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/advertise', label: 'Advertise' },
  { href: '/contact', label: 'Contact' },
]
