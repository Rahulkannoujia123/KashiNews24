'use client';

export default function ShareButtons({ title, url }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); }
    catch { window.prompt('Copy this link', url); }
  }
  return <div className="share" aria-label="यह खबर साझा करें">
    <a href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer">WhatsApp पर साझा करें</a>
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">Facebook पर साझा करें</a>
    <a href={`https://x.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">X</a>
    <button type="button" onClick={copyLink}>लिंक कॉपी करें</button>
  </div>;
}
