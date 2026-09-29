const META_GRAPH_VERSION = process.env.META_GRAPH_VERSION || 'v23.0';
const META_GRAPH = `https://graph.facebook.com/${META_GRAPH_VERSION}`;

const safeUrl = (value = '') => {
  try {
    const url = new URL(String(value || '').trim());
    return /^https?:$/.test(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
};

const clean = (value = '') => String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const matchesVaranasi = (value = '') => /varanasi|वाराणसी|banaras|बनारस|kashi|काशी|bhu|sarnath|सारनाथ|ramnagar|रामनगर|shivpur|शिवपुर|sigra|सिगरा|lanka|लंका|roh­ania|रोहनिया|pindra|पिंडरा|sewapuri|सेवापुरी/i.test(String(value || ''));

const classifySocial = (text = '') => {
  const value = String(text).toLowerCase();
  if (/crime|murder|police|arrest|अपराध|हत्या|पुलिस|गिरफ्तार/.test(value)) return 'Crime';
  if (/school|college|bhu|education|student|स्कूल|कॉलेज|शिक्षा|छात्र/.test(value)) return 'Education';
  if (/hospital|doctor|health|medical|अस्पताल|डॉक्टर|स्वास्थ्य/.test(value)) return 'Health';
  if (/cricket|football|sport|खेल|मैच/.test(value)) return 'Sports';
  if (/rain|weather|बारिश|मौसम/.test(value)) return 'Weather';
  if (/job|recruitment|नौकरी|भर्ती|रोजगार/.test(value)) return 'Jobs';
  if (/ganga|ghat|temple|kashi|गंगा|घाट|मंदिर|काशी|विश्वनाथ/.test(value)) return 'Kashi';
  if (/traffic|road|accident|ट्रैफिक|सड़क|दुर्घटना/.test(value)) return 'Varanasi';
  return 'Varanasi';
};

async function graphGet(path, params) {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) return null;
  const url = new URL(`${META_GRAPH}/${path.replace(/^\//, '')}`);
  Object.entries({ ...params, access_token: token }).forEach(([key, value]) => url.searchParams.set(key, value));
  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) return null;
  return response.json();
}

function normalizeFacebookPost(post) {
  const message = clean(post.message || post.story || '');
  if (!message || !matchesVaranasi(message)) return null;
  const date = post.created_time ? new Date(post.created_time) : new Date();
  return {
    id: `facebook-${post.id}`,
    platform: 'facebook',
    type: 'post',
    title: message.split(/[.!?।]/)[0].slice(0, 150) || 'Varanasi Facebook Update',
    excerpt: message.slice(0, 240),
    content: message,
    category: classifySocial(message),
    location: 'Varanasi',
    source: post.from?.name || 'Facebook',
    sourceUrl: safeUrl(post.permalink_url),
    image: safeUrl(post.full_picture),
    publishedAtISO: Number.isNaN(date.getTime()) ? '' : date.toISOString(),
    publishedAt: Number.isNaN(date.getTime()) ? 'आज' : new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(date)
  };
}

function normalizeInstagramMedia(media) {
  const caption = clean(media.caption || '');
  if (!caption || !matchesVaranasi(caption)) return null;
  const date = media.timestamp ? new Date(media.timestamp) : new Date();
  const isReel = media.media_type === 'VIDEO' || media.media_product_type === 'REELS';
  return {
    id: `instagram-${media.id}`,
    platform: 'instagram',
    type: isReel ? 'reel' : 'post',
    title: caption.split(/[.!?।]/)[0].slice(0, 150) || 'Varanasi Instagram Update',
    excerpt: caption.slice(0, 240),
    content: caption,
    category: classifySocial(caption),
    location: 'Varanasi',
    source: 'Instagram',
    sourceUrl: safeUrl(media.permalink),
    image: safeUrl(media.thumbnail_url || media.media_url),
    videoUrl: isReel ? safeUrl(media.media_url) : '',
    publishedAtISO: Number.isNaN(date.getTime()) ? '' : date.toISOString(),
    publishedAt: Number.isNaN(date.getTime()) ? 'आज' : new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' }).format(date),
    likes: Number(media.like_count || 0),
    comments: Number(media.comments_count || 0)
  };
}

export async function fetchFacebookVaranasiPosts() {
  const pageId = process.env.META_FACEBOOK_PAGE_ID;
  if (!pageId || !process.env.META_ACCESS_TOKEN) return [];
  const data = await graphGet(`${pageId}/feed`, {
    fields: 'id,message,story,created_time,permalink_url,full_picture,from{id,name}',
    limit: process.env.META_SOCIAL_LIMIT || '30'
  });
  return (data?.data || []).map(normalizeFacebookPost).filter(Boolean);
}

export async function fetchInstagramVaranasiReels() {
  const instagramId = process.env.META_INSTAGRAM_BUSINESS_ID;
  if (!instagramId || !process.env.META_ACCESS_TOKEN) return [];
  const data = await graphGet(`${instagramId}/media`, {
    fields: 'id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
    limit: process.env.META_SOCIAL_LIMIT || '30'
  });
  return (data?.data || []).map(normalizeInstagramMedia).filter((item) => item?.type === 'reel');
}


function decodeXml(value = '') {
  return String(value || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

async function fetchGoogleNewsSocialSearch(query, platform) {
  if (process.env.SOCIAL_DISCOVERY_ENABLED === 'false') return [];
  const url = new URL('https://news.google.com/rss/search');
  url.searchParams.set('q', query);
  url.searchParams.set('hl', 'en-IN');
  url.searchParams.set('gl', 'IN');
  url.searchParams.set('ceid', 'IN:en');

  try {
    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) return [];
    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
    return items.map((item) => {
      const title = decodeXml(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '');
      const link = decodeXml(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || '');
      const pubDate = decodeXml(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || '');
      const source = decodeXml(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] || platform);
      if (!title || !link || !matchesVaranasi(title)) return null;
      const date = new Date(pubDate);
      return {
        id: `discovery-${platform}-${Buffer.from(link).toString('base64url').slice(0, 32)}`,
        platform: platform.toLowerCase(),
        type: platform === 'Instagram' && /reel/i.test(title) ? 'reel' : 'post',
        title: title.replace(/ - [^-]+$/, '').slice(0, 150),
        excerpt: `सार्वजनिक रूप से खोजा गया ${platform} लिंक — मूल पोस्ट देखें।`,
        content: title,
        category: classifySocial(title),
        location: 'Varanasi',
        source,
        sourceUrl: safeUrl(link),
        image: '',
        videoUrl: '',
        publishedAtISO: Number.isNaN(date.getTime()) ? '' : date.toISOString(),
        publishedAt: Number.isNaN(date.getTime()) ? 'हाल में' : new Intl.DateTimeFormat('hi-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(date)
      };
    }).filter(Boolean);
  } catch {
    return [];
  }
}

export async function fetchPublicVaranasiSocialDiscovery() {
  const [instagram, facebook] = await Promise.all([
    fetchGoogleNewsSocialSearch('site:instagram.com/reel (Varanasi OR Banaras OR Kashi OR वाराणसी OR बनारस OR काशी)', 'Instagram'),
    fetchGoogleNewsSocialSearch('site:facebook.com (Varanasi OR Banaras OR Kashi OR वाराणसी OR बनारस OR काशी)', 'Facebook')
  ]);
  return [...instagram, ...facebook];
}

export async function fetchVaranasiSocialFeeds() {
  const [facebook, reels, discovered] = await Promise.all([
    fetchFacebookVaranasiPosts().catch(() => []),
    fetchInstagramVaranasiReels().catch(() => []),
    fetchPublicVaranasiSocialDiscovery().catch(() => [])
  ]);
  const unique = new Map([...facebook, ...reels, ...discovered].filter((item) => item?.sourceUrl).map((item) => [item.sourceUrl, item]));
  return [...unique.values()]
    .sort((a, b) => new Date(b.publishedAtISO || 0) - new Date(a.publishedAtISO || 0))
    .slice(0, 40);
}

export const socialConfigured = () =>
  Boolean(process.env.META_ACCESS_TOKEN && (process.env.META_FACEBOOK_PAGE_ID || process.env.META_INSTAGRAM_BUSINESS_ID));
