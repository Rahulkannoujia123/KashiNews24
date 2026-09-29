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

export async function fetchVaranasiSocialFeeds() {
  const [facebook, reels] = await Promise.all([
    fetchFacebookVaranasiPosts().catch(() => []),
    fetchInstagramVaranasiReels().catch(() => [])
  ]);
  return [...facebook, ...reels]
    .sort((a, b) => new Date(b.publishedAtISO || 0) - new Date(a.publishedAtISO || 0))
    .slice(0, 40);
}

export const socialConfigured = () =>
  Boolean(process.env.META_ACCESS_TOKEN && (process.env.META_FACEBOOK_PAGE_ID || process.env.META_INSTAGRAM_BUSINESS_ID));
