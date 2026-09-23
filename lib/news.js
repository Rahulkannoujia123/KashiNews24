const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85';

export const stories = [
  {
    slug: 'ganga-aarti-timings-extended-dev-deepawali',
    title: 'Dev Deepawali ki taiyari: Ganga aarti timings aur crowd plan jaari',
    excerpt: 'Dashashwamedh aur Rajendra Prasad Ghat par yatriyon ke liye naye traffic aur darshan arrangements.',
    category: 'Kashi',
    location: 'Ganga & Ghats',
    author: 'Kashi Live Desk',
    publishedAt: '23 Sep 2026 · 09:42 AM',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85',
    featured: true,
    views: 12480
  },
  {
    slug: 'varanasi-traffic-update-lanka-cantt',
    title: 'Lanka-Cantt route par badlaav, peak hours mein diversion',
    excerpt: 'BHU gate ke paas repair work ke chalte traffic police ne alternate route suggest kiya hai.',
    category: 'Traffic', location: 'Lanka', author: 'Aditi Singh', publishedAt: '23 Sep 2026 · 08:55 AM',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80', views: 6820
  },
  {
    slug: 'bhu-admission-helpdesk-2026',
    title: 'BHU mein naye session ke liye student helpdesk shuru',
    excerpt: 'Admission aur hostel se judi queries ke liye central helpdesk 30 September tak khula rahega.',
    category: 'Education', location: 'BHU', author: 'Kashi Live Desk', publishedAt: '22 Sep 2026 · 07:30 PM',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80', views: 5210
  },
  {
    slug: 'varanasi-police-cyber-fraud-alert',
    title: 'Cyber fraud ko lekar Varanasi Police ka naya alert',
    excerpt: 'Digital arrest aur fake courier calls se bachne ke liye police ne helpline numbers jaari kiye.',
    category: 'Crime', location: 'Sigra', author: 'Ravi Kumar', publishedAt: '22 Sep 2026 · 05:12 PM',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80', views: 9380
  },
  {
    slug: 'purvanchal-startup-meet-varanasi',
    title: 'Purvanchal Startup Meet mein local founders ne dikhayi nayi raah',
    excerpt: 'Rudraksh Convention Centre mein hue sammelan mein 40 se zyada founders ne ideas share kiye.',
    category: 'Business', location: 'Shivpur', author: 'Neha Verma', publishedAt: '22 Sep 2026 · 02:20 PM',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80', views: 3050
  },
  {
    slug: 'kashi-railway-station-facilities',
    title: 'Kashi railway station par passengers ke liye badhengi suvidhayein',
    excerpt: 'Naye waiting lounge aur digital information boards ka kaam aakhri charan mein.',
    category: 'Varanasi', location: 'Cantt', author: 'Kashi Live Desk', publishedAt: '21 Sep 2026 · 11:10 AM',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80', views: 4140
  },
  {
    slug: 'varanasi-weather-rain-forecast',
    title: 'वाराणसी मौसम: अगले 48 घंटों में हल्की बारिश का पूर्वानुमान',
    excerpt: 'मौसम विभाग के अनुसार दिन का तापमान 32 डिग्री के आसपास रह सकता है। लोगों को बारिश के दौरान सावधानी बरतने की सलाह दी गई है।',
    category: 'Weather', location: 'वाराणसी', author: 'काशी लाइव डेस्क', publishedAt: '21 सित॰ 2026 · 08:40 AM',
    image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80', views: 2180
  }
];

const fallbackImagePool = [
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505761671935-60a7d0d59f7b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80'
];

const GNEWS_API_URL = 'https://gnews.io/api/v4/search';
const BHASKAR_VARANASI_URL = 'https://www.bhaskar.com/local/uttar-pradesh/varanasi/';
const hindiCategoryQueries = {
  crime: 'अपराध पुलिस',
  traffic: 'ट्रैफिक यातायात सड़क',
  education: 'शिक्षा छात्र स्कूल कॉलेज बीएचयू',
  business: 'व्यापार कारोबार बाजार',
  sports: 'खेल खिलाड़ी मैच',
  weather: 'मौसम बारिश तापमान',
  kashi: 'काशी गंगा घाट विश्वनाथ बनारस',
  politics: 'राजनीति चुनाव',
  jobs: 'नौकरी रोजगार भर्ती',
  events: 'कार्यक्रम समारोह आयोजन'
};

const slugify = (value = '') => {
  const base = value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'varanasi-news';
  const hash = [...value].reduce((total, character) => ((total * 31) + character.charCodeAt(0)) >>> 0, 7).toString(36);
  return `${base}-${hash}`;
};

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
    .trim();

const cleanHindiContent = (value = '') => cleanText(value)
  .replace(/^(varanasi|काशी|बनारस)\s*news\s*[:|-]\s*/i, '')
  .replace(/\s*,?\s*(varanasi hindi news|hindi news|latest news)\s*[-|].*$/i, '')
  .trim();

const detectCategory = (value = '') => {
  const text = value.toLowerCase();
  if (/crime|murder|police|arrest|theft|fraud|हत्या|पुलिस|गिरफ्तार|चोरी|धोखा/.test(text)) return 'Crime';
  if (/traffic|road|route|diversion|सड़क|ट्रैफिक|यातायात|मार्ग/.test(text)) return 'Traffic';
  if (/school|college|university|bhu|student|exam|education|स्कूल|कॉलेज|विश्वविद्यालय|छात्र|परीक्षा|शिक्षा/.test(text)) return 'Education';
  if (/business|gst|market|व्यापार|बिजनेस|कारोबार|दुकान|निवेश/.test(text)) return 'Business';
  if (/cricket|football|sport|खेल|कुश्ती|मैच|खिलाड़ी/.test(text)) return 'Sports';
  if (/weather|rain|बारिश|मौसम|तापमान|बाढ़/.test(text)) return 'Weather';
  if (/election|politics|bjp|congress|चुनाव|राजनीति|भाजपा|कांग्रेस/.test(text)) return 'Politics';
  if (/job|career|रोजगार|नौकरी|भर्ती|करियर/.test(text)) return 'Jobs';
  if (/event|festival|समारोह|महोत्सव|कार्यक्रम|उत्सव/.test(text)) return 'Events';
  if (/kashi|काशी|banaras|बनारस|ganga|गंगा|ghat|घाट|विश्वनाथ/.test(text)) return 'Kashi';
  return 'Varanasi';
};

const parseBhaskarStories = (html) => {
  const articlePattern = /<a[^>]+href=["'](\/(?:g\/)?local\/uttar-pradesh\/varanasi\/news\/[^"']+\.html)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const publishedAt = new Intl.DateTimeFormat('hi-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date());

  return [...html.matchAll(articlePattern)]
    .map(([, relativeUrl, cardHtml], index) => {
      const headingMatch = cardHtml.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i);
      const title = cleanText(headingMatch?.[1] || cardHtml);
      const imageMatch = cardHtml.match(/(?:src|data-src)=["'](https?:\/\/[^"']+)["']/i);
      const sourceUrl = new URL(relativeUrl, BHASKAR_VARANASI_URL).toString();

      return {
        slug: slugify(title),
        title,
        excerpt: `${title}। दैनिक भास्कर के वाराणसी सेक्शन से ताज़ा खबर।`,
        category: detectCategory(title),
        location: 'वाराणसी',
        author: 'दैनिक भास्कर',
        publishedAt,
        image: imageMatch?.[1] || fallbackImagePool[index % fallbackImagePool.length],
        sourceUrl,
        featured: index === 0,
        views: 0
      };
    })
    .filter((story) => story.title.length > 24)
    .filter((story, index, allStories) => allStories.findIndex((item) => item.sourceUrl === story.sourceUrl) === index)
    .slice(0, 7);
};

const parseGNewsStories = (articles, requestedCategory = '') => articles.map((article, index) => {
  const title = cleanText(article.title || 'वाराणसी की ताज़ा खबर')
    .replace(/^(varanasi|काशी|बनारस)\s*news\s*[:|-]\s*/i, '')
    .replace(/\s*[-|]\s*(hindi news|latest news|varanasi news)$/i, '')
    .trim();
  const publishedAt = article.publishedAt || new Date().toISOString();

  return {
    slug: slugify(title),
    title,
    excerpt: cleanHindiContent(article.description || `${title}। वाराणसी की ताज़ा हिंदी खबर।`),
    category: requestedCategory || detectCategory(`${title} ${article.description || ''}`),
    location: 'वाराणसी',
    author: article.source?.name || 'GNews',
    publishedAt: new Intl.DateTimeFormat('hi-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(publishedAt)),
    image: article.image || fallbackImagePool[index % fallbackImagePool.length],
    sourceUrl: article.url,
    featured: index === 0,
    views: 0
  };
});

export async function fetchFreshStories(category = '') {
  try {
    const apiKey = process.env.GNEWS_API_KEY;
    if (apiKey) {
      const params = new URLSearchParams({
        q: category.toLowerCase() === 'kashi'
          ? 'काशी वाराणसी'
          : `वाराणसी समाचार${hindiCategoryQueries[category.toLowerCase()] ? ` ${hindiCategoryQueries[category.toLowerCase()]}` : ''}`,
        lang: 'hi',
        country: 'in',
        max: '10',
        apikey: apiKey
      });
      const response = await fetch(`${GNEWS_API_URL}?${params}`, { next: { revalidate: 1800 } });
      if (!response.ok) {
        throw new Error('GNews API request failed');
      }

      const data = await response.json();
      const requestedGNewsCategory = category.toLowerCase() === 'kashi' ? 'Kashi' : '';
      const items = parseGNewsStories(data.articles || [], requestedGNewsCategory);
      const filteredItems = category.toLowerCase() === 'kashi'
        ? items.filter((story) => /काशी|वाराणसी|बनारस|गंगा|घाट|विश्वनाथ|bhu|varanasi|kashi/i.test(`${story.title} ${story.excerpt}`))
        : category
          ? items.filter((story) => story.category.toLowerCase() === category.toLowerCase())
          : items;
      if (filteredItems.length) return filteredItems;
    }

    const bhaskarResponse = await fetch(BHASKAR_VARANASI_URL, {
      headers: { 'user-agent': 'KashiNews24/1.0 (+https://www.bhaskar.com/local/uttar-pradesh/varanasi/)' },
      next: { revalidate: 1800 }
    });
    if (bhaskarResponse.ok) {
      const items = parseBhaskarStories(await bhaskarResponse.text());
      if (items.length) {
        const filteredItems = category
          ? items.filter((story) => story.category.toLowerCase() === category.toLowerCase())
          : items;
        if (filteredItems.length) return filteredItems;
      }
    }

    return category ? stories.filter((story) => story.category.toLowerCase() === category.toLowerCase()) : stories;
  } catch (error) {
    return category ? stories.filter((story) => story.category.toLowerCase() === category.toLowerCase()) : stories;
  }
}

export const areas = ['Cantt', 'Lanka', 'BHU', 'Sigra', 'Bhelupur', 'Shivpur', 'Rohania', 'Sarnath', 'Ramnagar', 'Pindra', 'Sevapuri', 'Cholapur', 'Harhua'];
export const navItems = ['Home', 'Varanasi', 'Crime', 'Politics', 'Traffic', 'Education', 'Jobs', 'Business', 'Sports', 'Weather', 'Events', 'Videos'];
export const getStory = (slug, storyList = stories) => storyList.find((story) => story.slug === slug);
