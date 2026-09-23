import { stories } from '../lib/news';
export default function sitemap(){return [{url:'https://kashilive24.in',lastModified:new Date()},...stories.map((story)=>({url:`https://kashilive24.in/news/${story.slug}`,lastModified:new Date()}))]}
