const GNEWS_API_URL = 'https://gnews.io/api/v4/search';
const GOOGLE_NEWS_RSS = 'https://news.google.com/rss/search?q=';
const hindiCategoryQueries = {
  crime: 'अपराध पुलिस',
  education: 'शिक्षा छात्र स्कूल कॉलेज',
  business: 'व्यापार कारोबारी बाजार',
  sports: 'खेल खिलाड़ी मैच',
  weather: 'मौसम बारिश तापमान',
  kashi: 'काशी गंगा घाट बनारस',
  politics: 'राजनीति चुनाव',
  jobs: 'नौकरी रोजगार भर्ती',
  health: 'स्वास्थ्य अस्पताल',
  entertainment: 'मनोरंजन फिल्म सिनेमा',
  technology: 'तकनीक डिजिटल',
  'uttar pradesh': 'उत्तर प्रदेश',
  india: 'भारत राष्ट्रीय समाचार',
  varanasi: 'वाराणसी समाचार'
};

export const CATEGORY_OPTIONS = ['Politics', 'Varanasi', 'Crime', 'Education', 'Business', 'Sports', 'Weather', 'Health', 'Jobs', 'Entertainment', 'Kashi', 'Uttar Pradesh', 'India', 'Technology'];
export const CATEGORY_LABELS = {
  Politics: 'राजनीति', Varanasi: 'वाराणसी', Crime: 'अपराध', Education: 'शिक्षा', Business: 'व्यापार',
  Sports: 'खेल', Weather: 'मौसम', Health: 'स्वास्थ्य', Jobs: 'रोजगार', Entertainment: 'मनोरंजन',
  Kashi: 'काशी', 'Uttar Pradesh': 'उत्तर प्रदेश', India: 'भारत', Technology: 'तकनीक'
};

export const categoryLabel = (category = '') => CATEGORY_LABELS[category] || category;

export function normalizeCategory(value = '') {
  const input = String(value || '').trim();
  if (!input) return '';
  const exact = CATEGORY_OPTIONS.find((category) => category.toLowerCase() === input.toLowerCase());
  if (exact) return exact;
  const normalizedKey = input.toLowerCase();
  return CATEGORY_OPTIONS.find((category) => category.toLowerCase().includes(normalizedKey) || normalizedKey.includes(category.toLowerCase())) || '';
}

export function categoryMatches(story = {}, category = '') {
  if (!story || !category) return true;
  const target = normalizeCategory(category);
  if (!target) return true;
  return normalizeCategory(story.category) === target;
}

export const toCategoryRoute = (category = '') => {
  const value = String(category || '').trim();
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'news';
  return `/category/${slug}`;
};

export function categoryFromSlug(slug = '') {
  const value = String(slug || '').trim().toLowerCase();
  if (!value || value === 'news') return '';

  const matchingCategory = CATEGORY_OPTIONS.find((category) => {
    const normalized = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return normalized === value;
  });

  return matchingCategory || '';
}

const slugify = (value = '') => {
  const base = String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'varanasi-news';
  const hash = [...String(value || '')].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7).toString(36);
  return `${base}-${hash}`;
};

const cleanText = (value = '') =>
  String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/<a[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const cleanHindiContent = (value = '') => cleanText(value)
  .replace(/^(varanasi|काशी|बनारस)\s*news\s*[:|-]\s*/i, '')
  .replace(/\s*,?\s*(varanasi hindi news|hindi news|latest news)\s*[-|].*$/i, '')
  .trim();

const parseDate = (value = '') => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return null;
  return date;
};

const formatDate = (date) => {
  if (!date || Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(date);
};

const indiaDateKey = (date = new Date()) => new Intl.DateTimeFormat('en-CA', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Kolkata'
}).format(date);

const todayInIndia = () => indiaDateKey(new Date());

const hasHindiContent = (story = {}) => /[\u0900-\u097F]/.test(`${story.title || ''} ${story.excerpt || ''}`);

const detectCategory = (value = '') => {
  const text = String(value || '').toLowerCase();
  if (/traffic|road|jam|accident|travel|transport|ट्रैफिक|सड़क|जाम|यात्रा|परिवहन/.test(text)) return 'Varanasi';
  if (/crime|murder|police|arrest|theft|fraud|अपराध|हत्या|पुलिस|गिरफ्तार|चोरी|फ्रॉड/.test(text)) return 'Crime';
  if (/school|college|university|bhu|student|exam|education|स्कूल|कॉलेज|शिक्षा|छात्र|परीक्षा/.test(text)) return 'Education';
  if (/business|gst|market|व्यापार|कारोबार|बाज़ार|निवेश/.test(text)) return 'Business';
  if (/cricket|football|sport|खेल|कुश्ती|मैच|फुटबॉल/.test(text)) return 'Sports';
  if (/weather|rain|बारिश|मौसम|तापमान/.test(text)) return 'Weather';
  if (/election|politics|bjp|congress|चुनाव|राजनीति|भाजपा|कांग्रेस/.test(text)) return 'Politics';
  if (/job|career|रोजगार|नौकरी|भर्ती/.test(text)) return 'Jobs';
  if (/health|hospital|doctor|medical|स्वास्थ्य|अस्पताल|डॉक्टर|मेडिकल/.test(text)) return 'Health';
  if (/entertainment|film|cinema|actor|मनोरंजन|फिल्म|सिनेमा|अभिनेता/.test(text)) return 'Entertainment';
  if (/technology|tech|digital|तकनीक|डिजिटल/.test(text)) return 'Technology';
  if (/uttar pradesh|उत्तर प्रदेश|lucknow|लखनऊ/.test(text)) return 'Uttar Pradesh';
  if (/india|national|भारत|राष्ट्रीय/.test(text)) return 'India';
  if (/kashi|banaras|ganga|ghat|काशी|बनारस|गंगा|घाट|विश्वनाथ/.test(text)) return 'Kashi';
  if (/varanasi|bhu|वाराणसी/.test(text)) return 'Varanasi';
  return 'Other';
};

function safeHttpUrl(value) {
  try {
    const normalized = String(value || '').trim().replace(/^\/\//, 'https://');
    const url = new URL(normalized);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : '';
  } catch {
    return '';
  }
}

function extractImageUrl(value = '') {
  const imageMatch = String(value).match(/<img[^>]+src=["']([^"']+)["']/i);
  return safeHttpUrl(imageMatch?.[1] || '');
}

const normalizeStory = (article, requestedCategory = '') => {
  const title = cleanText(article.title || '').replace(/^(varanasi|काशी|बनारस|वाराणसी)\s*news\s*[:|-]\s*/i, '').replace(/\s*[-|]\s*(hindi news|latest news|varanasi news)$/i, '').trim();
  if (!title) return null;

  const publishedDate = parseDate(article.publishedAt || article.pubDate || article.date || article.isoDate);
  const publishedAtISO = publishedDate ? publishedDate.toISOString() : '';
  const sourceName = article.source?.name || article.source || 'External source';
  const sourceUrl = safeHttpUrl(article.articleUrl || article.url || article.link) || '';
  const detectedCategory = requestedCategory || detectCategory(`${title} ${article.description || ''}`);
  const excerpt = cleanHindiContent(article.description || article.summary || title);
  const image = safeHttpUrl(article.image || article.thumbnail || '') || '';
  const isBreaking = /breaking|live|urgent|alert|emergency|तत्काल|सीधा|ब्रेकिंग|अलर्ट/i.test(`${title} ${excerpt}`);

  return {
    slug: slugify(title),
    title,
    excerpt: excerpt || title,
    category: detectedCategory,
    location: 'Varanasi',
    author: sourceName,
    authorName: sourceName,
    authorPhoto: '',
    source: sourceName,
    sourceUrl,
    image,
    imageAlt: title,
    tags: [String(sourceName || 'varanasi'), 'वाराणसी'],
    isOriginal: false,
    isFeatured: isBreaking,
    isBreaking,
    seoTitle: title,
    seoDescription: excerpt.slice(0, 160),
    ...(publishedAtISO ? {
      publishedAt: formatDate(publishedDate),
      publishedAtISO,
      updatedAt: formatDate(publishedDate),
      updatedAtISO: publishedAtISO
    } : {}),
    content: excerpt || title
  };
};

const parseGNewsStories = (articles, requestedCategory = '') => articles
  .map((article) => normalizeStory({
    title: article.title,
    description: article.description,
    url: article.url,
    publishedAt: article.publishedAt,
    image: article.image,
    source: article.source?.name || article.source,
    summary: article.description
  }, requestedCategory))
  .filter(Boolean)
  .filter((story) => story.category !== 'Other');

const parseGoogleRssStories = (xmlText, requestedCategory = '') => {
  const items = [...xmlText.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
    const readTag = (tag) => item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1] || '';
    const sourceMatch = item.match(/<source[^>]*?(?:url=["']([^"']+)["'])?[^>]*>([\s\S]*?)<\/source>/i);
    const imageMatch = item.match(/<(?:media:content|media:thumbnail|enclosure)[^>]+url=["']([^"']+)["']/i)
      || item.match(/<image>[\s\S]*?<url>([\s\S]*?)<\/url>[\s\S]*?<\/image>/i);
    const description = readTag('description');
    return {
      title: readTag('title'),
      link: readTag('link'),
      pubDate: readTag('pubDate'),
      description,
      image: imageMatch ? cleanText(imageMatch[1]) : extractImageUrl(description),
      source: sourceMatch ? cleanText(sourceMatch[2]) : 'Google News',
      sourceUrl: sourceMatch ? cleanText(sourceMatch[1] || '') : ''
    };
  });

  return items
    .map(({ title, link, pubDate, description, image, source, sourceUrl }) => normalizeStory({
      title: cleanText(title).replace(/\s*\[.*?\]\s*$/g, ''),
      description: cleanText(description),
      url: cleanText(link),
      image: cleanText(image),
      sourceHomepage: cleanText(sourceUrl),
      publishedAt: cleanText(pubDate),
      source,
      summary: cleanText(description)
    }, requestedCategory))
    .filter(Boolean)
    .filter((story) => story.category !== 'Other');
};

const dedupeStories = (stories = []) => {
  const map = new Map();
  for (const story of stories) {
    const keys = [story.slug, story.sourceUrl].filter(Boolean);
    if (!keys.length) continue;
    const current = keys.map((key) => map.get(key)).find(Boolean);
    if (!current || (story.publishedAtISO && (!current.publishedAtISO || new Date(story.publishedAtISO).getTime() > new Date(current.publishedAtISO).getTime()))) {
      keys.forEach((key) => map.set(key, story));
    }
  }

  return [...new Set(map.values())].sort((a, b) => {
    const dateA = a.publishedAtISO ? new Date(a.publishedAtISO).getTime() : 0;
    const dateB = b.publishedAtISO ? new Date(b.publishedAtISO).getTime() : 0;
    return dateB - dateA;
  });
};

async function fetchGoogleNewsFallback(category = '') {
  const normalizedCategory = normalizeCategory(category);
  const topic = normalizedCategory ? hindiCategoryQueries[normalizedCategory.toLowerCase()] || normalizedCategory : 'Varanasi Kashi news';
  const topics = normalizedCategory ? [topic] : ['वाराणसी समाचार', 'काशी समाचार', 'बनारस समाचार'];
  const responses = await Promise.all(topics.map(async (topicName) => {
    const query = encodeURIComponent(topicName);
    const response = await fetch(`${GOOGLE_NEWS_RSS}${query}&hl=hi-IN&gl=IN&ceid=IN:hi`, { cache: 'no-store' });
    if (!response.ok) return [];
    return parseGoogleRssStories(await response.text(), normalizedCategory || '');
  }));
  return dedupeStories(responses.flat());
}

export async function fetchFreshStories(category = '') {
  const normalizedCategory = normalizeCategory(category);
  if (category && !normalizedCategory) return [];

  const requests = [];
  if (process.env.GNEWS_API_KEY && process.env.USE_GNEWS !== 'false') {
    requests.push(async () => {
      const topicQuery = normalizedCategory ? hindiCategoryQueries[normalizedCategory.toLowerCase()] || normalizedCategory : 'वाराणसी समाचार';
      const params = new URLSearchParams({
        q: normalizedCategory === 'Kashi' ? 'काशी वाराणसी' : topicQuery,
        lang: 'hi',
        country: 'in',
        max: '10',
        sortby: 'publishedAt',
        from: `${todayInIndia()}T00:00:00+05:30`,
        to: new Date().toISOString(),
        apikey: process.env.GNEWS_API_KEY
      });
      const response = await fetch(GNEWS_API_URL + '?' + params, { cache: 'no-store' });
      if (!response.ok) return [];
      const data = await response.json();
      return parseGNewsStories(data.articles || [], normalizedCategory || '');
    });
  }

  requests.push(async () => fetchGoogleNewsFallback(normalizedCategory || ''));

  const snapshots = await Promise.all(requests.map((request) => request().catch(() => [])));
  const merged = dedupeStories(snapshots.flat());
  const todaysStories = merged.filter((story) => story.publishedAtISO
    && indiaDateKey(new Date(story.publishedAtISO)) === todayInIndia()
    && hasHindiContent(story));
  const filtered = normalizedCategory
    ? todaysStories.filter((story) => categoryMatches(story, normalizedCategory))
    : todaysStories;
  return filtered.slice(0, 20);
}

export const areas = ['Cantt', 'Lanka', 'BHU', 'Sigra', 'Bhelupur', 'Shivpur', 'Rohania', 'Sarnath', 'Ramnagar', 'Pindra', 'Sevapuri', 'Cholapur', 'Harhua'];
export const navItems = ['Home', 'Varanasi', 'Kashi', 'Crime', 'Politics', 'Education', 'Business', 'Sports', 'Weather', 'Jobs', 'Entertainment', 'Uttar Pradesh', 'India', 'Technology', 'Health'];
export const getStory = (slug, storyList = []) => storyList.find((story) => story.slug === slug);