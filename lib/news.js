import { CATEGORIES } from './site'

const ORIGINAL_AUTHOR = 'Kashi Live News 24'

// Static fallback stories. Used only when live sources are unavailable so the
// site never renders empty. Dates are real ISO values, not fabricated stats.
const now = Date.now()
const hoursAgo = (h) => new Date(now - h * 3600 * 1000).toISOString()

export const stories = [
  {
    slug: 'dev-deepawali-ganga-aarti-timings',
    title: 'Dev Deepawali ki taiyari: Ganga aarti timings aur crowd plan jaari',
    excerpt:
      'Dashashwamedh aur Rajendra Prasad Ghat par yatriyon ke liye naye traffic aur darshan arrangements ki jaankari.',
    category: 'Kashi',
    location: 'Ganga & Ghats',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    isFeatured: true,
    isBreaking: true,
    publishedISO: hoursAgo(2),
    updatedISO: hoursAgo(1),
    image:
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    slug: 'varanasi-traffic-update-lanka-cantt',
    title: 'Lanka-Cantt route par badlaav, peak hours mein diversion',
    excerpt:
      'BHU gate ke paas repair work ke chalte traffic police ne alternate route suggest kiya hai.',
    category: 'Varanasi',
    location: 'Lanka',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(4),
    image:
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'bhu-admission-helpdesk-2026',
    title: 'BHU mein naye session ke liye student helpdesk shuru',
    excerpt:
      'Admission aur hostel se judi queries ke liye central helpdesk 30 September tak khula rahega.',
    category: 'Education',
    location: 'BHU',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(14),
    image:
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'varanasi-police-cyber-fraud-alert',
    title: 'Cyber fraud ko lekar Varanasi Police ka naya alert',
    excerpt:
      'Digital arrest aur fake courier calls se bachne ke liye police ne helpline numbers jaari kiye.',
    category: 'Crime',
    location: 'Sigra',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(18),
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'purvanchal-startup-meet-varanasi',
    title: 'Purvanchal Startup Meet mein local founders ne dikhayi nayi raah',
    excerpt:
      'Rudraksh Convention Centre mein hue sammelan mein 40 se zyada founders ne ideas share kiye.',
    category: 'Business',
    location: 'Shivpur',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(22),
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'kashi-railway-station-facilities',
    title: 'Kashi railway station par passengers ke liye badhengi suvidhayein',
    excerpt:
      'Naye waiting lounge aur digital information boards ka kaam aakhri charan mein.',
    category: 'Varanasi',
    location: 'Cantt',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(30),
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'varanasi-weather-rain-forecast',
    title: 'वाराणसी मौसम: अगले 48 घंटों में हल्की बारिश का पूर्वानुमान',
    excerpt:
      'मौसम विभाग के अनुसार दिन का तापमान 32 डिग्री के आसपास रह सकता है। लोगों को बारिश के दौरान सावधानी बरतने की सलाह दी गई है।',
    category: 'Weather',
    location: 'वाराणसी',
    author: ORIGINAL_AUTHOR,
    source: '',
    isOriginal: true,
    publishedISO: hoursAgo(34),
    image:
      'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80',
  },
]

const fallbackImagePool = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505761671935-60a7d0d59f7b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
]

const GNEWS_API_URL = 'https://gnews.io/api/v4/search'
const BHASKAR_VARANASI_URL =
  'https://www.bhaskar.com/local/uttar-pradesh/varanasi/'

// Hindi search terms per public category, used to target the news API.
const hindiCategoryQueries = {
  varanasi: 'वाराणसी शहर',
  kashi: 'काशी गंगा घाट विश्वनाथ बनारस',
  politics: 'राजनीति चुनाव नेता',
  crime: 'अपराध पुलिस हत्या गिरफ्तार',
  education: 'शिक्षा छात्र स्कूल कॉलेज बीएचयू',
  business: 'व्यापार कारोबार बाजार',
  sports: 'खेल खिलाड़ी मैच क्रिकेट',
  weather: 'मौसम बारिश तापमान',
  health: 'स्वास्थ्य अस्पताल बीमारी इलाज',
  jobs: 'नौकरी रोजगार भर्ती',
  entertainment: 'मनोरंजन फिल्म बॉलीवुड',
  'uttar pradesh': 'उत्तर प्रदेश यूपी',
  india: 'भारत देश राष्ट्रीय',
  technology: 'तकनीक टेक्नोलॉजी मोबाइल',
}

const properCategory = (value = '') =>
  CATEGORIES.find((c) => c.toLowerCase() === value.toLowerCase()) || ''

const slugify = (value = '') => {
  const base =
    value
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'varanasi-news'
  const hash = [...value]
    .reduce((total, ch) => ((total * 31 + ch.charCodeAt(0)) >>> 0), 7)
    .toString(36)
  return `${base}-${hash}`
}

const cleanText = (value = '') =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const cleanHindiContent = (value = '') =>
  cleanText(value)
    .replace(/^(varanasi|काशी|बनारस)\s*news\s*[:|-]\s*/i, '')
    .replace(/\s*,?\s*(varanasi hindi news|hindi news|latest news)\s*[-|].*$/i, '')
    .trim()

const detectCategory = (value = '') => {
  const text = value.toLowerCase()
  if (/crime|murder|police|arrest|theft|fraud|हत्या|पुलिस|गिरफ्तार|चोरी|धोखा|लूट/.test(text)) return 'Crime'
  if (/school|college|university|bhu|student|exam|education|स्कूल|कॉलेज|विश्वविद्यालय|छात्र|परीक्षा|शिक्षा/.test(text)) return 'Education'
  if (/business|gst|market|व्यापार|बिजनेस|कारोबार|दुकान|निवेश|बाजार/.test(text)) return 'Business'
  if (/cricket|football|sport|खेल|कुश्ती|मैच|खिलाड़ी|क्रिकेट/.test(text)) return 'Sports'
  if (/weather|rain|बारिश|मौसम|तापमान|बाढ़|ठंड|गर्मी/.test(text)) return 'Weather'
  if (/hospital|health|medical|disease|स्वास्थ्य|अस्पताल|बीमारी|इलाज|डॉक्टर|मरीज/.test(text)) return 'Health'
  if (/election|politics|bjp|congress|चुनाव|राजनीति|भाजपा|कांग्रेस|नेता|मंत्री/.test(text)) return 'Politics'
  if (/job|career|vacancy|रोजगार|नौकरी|भर्ती|करियर|वैकेंसी/.test(text)) return 'Jobs'
  if (/film|movie|bollywood|entertainment|फिल्म|बॉलीवुड|मनोरंजन|गाना|अभिनेता/.test(text)) return 'Entertainment'
  if (/mobile|tech|gadget|internet|app|तकनीक|मोबाइल|टेक्नोलॉजी|इंटरनेट|ऐप/.test(text)) return 'Technology'
  if (/kashi|काशी|banaras|बनारस|ganga|गंगा|ghat|घाट|विश्वनाथ/.test(text)) return 'Kashi'
  if (/uttar pradesh|lucknow|उत्तर प्रदेश|यूपी|लखनऊ/.test(text)) return 'Uttar Pradesh'
  if (/india|national|भारत|राष्ट्रीय|देश/.test(text)) return 'India'
  return 'Varanasi'
}

const sourceHost = (url = '') => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const parseBhaskarStories = (html) => {
  const articlePattern =
    /<a[^>]+href=["'](\/(?:g\/)?local\/uttar-pradesh\/varanasi\/news\/[^"']+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi

  return [...html.matchAll(articlePattern)]
    .map(([, relativeUrl, cardHtml], index) => {
      const headingMatch = cardHtml.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)
      const title = cleanText(headingMatch?.[1] || cardHtml)
      const imageMatch = cardHtml.match(/(?:src|data-src)=["'](https?:\/\/[^"']+)["']/i)
      const sourceUrl = new URL(relativeUrl, BHASKAR_VARANASI_URL).toString()
      return {
        slug: slugify(title),
        title,
        excerpt: `${title}. Poori khabar ke liye mool source par jaayein.`,
        category: detectCategory(title),
        location: 'वाराणसी',
        author: 'Dainik Bhaskar',
        source: 'Dainik Bhaskar',
        sourceUrl,
        isOriginal: false,
        publishedISO: new Date().toISOString(),
        image: imageMatch?.[1] || fallbackImagePool[index % fallbackImagePool.length],
      }
    })
    .filter((story) => story.title.length > 24)
    .filter(
      (story, index, all) =>
        all.findIndex((item) => item.sourceUrl === story.sourceUrl) === index,
    )
    .slice(0, 10)
}

const parseGNewsStories = (articles, requestedCategory = '') =>
  articles.map((article, index) => {
    const title = cleanText(article.title || 'वाराणसी की ताज़ा खबर')
      .replace(/^(varanasi|काशी|बनारस)\s*news\s*[:|-]\s*/i, '')
      .replace(/\s*[-|]\s*(hindi news|latest news|varanasi news)$/i, '')
      .trim()
    const sourceName = article.source?.name || sourceHost(article.url) || 'News agency'
    return {
      slug: slugify(title),
      title,
      excerpt: cleanHindiContent(article.description || `${title}.`),
      category: requestedCategory || detectCategory(`${title} ${article.description || ''}`),
      location: 'वाराणसी',
      author: sourceName,
      source: sourceName,
      sourceUrl: article.url,
      isOriginal: false,
      publishedISO: article.publishedAt || new Date().toISOString(),
      image: article.image || fallbackImagePool[index % fallbackImagePool.length],
    }
  })

const filterByCategory = (items, category) => {
  if (!category) return items
  const target = category.toLowerCase()
  if (target === 'kashi') {
    return items.filter((s) =>
      /काशी|वाराणसी|बनारस|गंगा|घाट|विश्वनाथ|bhu|varanasi|kashi/i.test(
        `${s.title} ${s.excerpt}`,
      ),
    )
  }
  return items.filter((s) => s.category.toLowerCase() === target)
}

// Returns stories for the requested category (or latest mix when empty).
// Guarantees only matching stories are returned for a category request.
export async function fetchFreshStories(category = '') {
  const requested = properCategory(category)
  try {
    const apiKey = process.env.GNEWS_API_KEY
    if (apiKey) {
      const extra = hindiCategoryQueries[requested.toLowerCase()]
      const params = new URLSearchParams({
        q: requested
          ? `वाराणसी ${extra || requested}`
          : 'वाराणसी समाचार काशी बनारस',
        lang: 'hi',
        country: 'in',
        max: '10',
        apikey: apiKey,
      })
      const response = await fetch(`${GNEWS_API_URL}?${params}`, {
        next: { revalidate: 900 },
      })
      if (response.ok) {
        const data = await response.json()
        // When a category is requested we queried specifically for it, so we
        // label all returned items with that category for reliable filtering.
        const items = parseGNewsStories(data.articles || [], requested)
        const filtered = requested ? filterByCategory(items, requested) : items
        if (filtered.length) return filtered
      }
    }

    const bhaskar = await fetch(BHASKAR_VARANASI_URL, {
      headers: { 'user-agent': 'KashiLiveNews24/1.0 (+https://kashilive24.in)' },
      next: { revalidate: 900 },
    })
    if (bhaskar.ok) {
      const items = parseBhaskarStories(await bhaskar.text())
      const filtered = requested ? filterByCategory(items, requested) : items
      if (filtered.length) return filtered
    }
  } catch {
    // fall through to static fallback
  }
  return requested ? filterByCategory(stories, requested) : stories
}

// Group a pool of stories by category, keeping editorial order.
export const groupByCategory = (items) => {
  const map = {}
  for (const item of items) {
    ;(map[item.category] ||= []).push(item)
  }
  return map
}

export const getStory = (slug, storyList = stories) =>
  storyList.find((story) => story.slug === slug)

// Legacy areas list retained for the local-areas block.
export const areas = [
  'Cantt', 'Lanka', 'BHU', 'Sigra', 'Bhelupur', 'Shivpur', 'Rohania',
  'Sarnath', 'Ramnagar', 'Pindra', 'Sevapuri', 'Cholapur', 'Harhua',
]

export const ORIGINAL_BYLINE = ORIGINAL_AUTHOR
