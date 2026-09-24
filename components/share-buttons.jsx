'use client'
import { useState } from 'react'

export default function ShareButtons({ title, slug }) {
  const [copied, setCopied] = useState(false)

  const getUrl = () =>
    typeof window !== 'undefined'
      ? window.location.href
      : `https://kashilive24.in/news/${slug}`

  const shareTo = (network) => {
    const url = encodeURIComponent(getUrl())
    const text = encodeURIComponent(title)
    const targets = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    }
    window.open(targets[network], '_blank', 'noopener,noreferrer,width=600,height=520')
  }

  const nativeOrCopy = async () => {
    const url = getUrl()
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled; fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="share" role="group" aria-label="Share this article">
      <span className="share-label">Share:</span>
      <button onClick={() => shareTo('whatsapp')}>WhatsApp</button>
      <button onClick={() => shareTo('facebook')}>Facebook</button>
      <button onClick={() => shareTo('x')}>X</button>
      <button onClick={() => shareTo('telegram')}>Telegram</button>
      <button onClick={nativeOrCopy}>{copied ? 'Link copied!' : 'Copy link'}</button>
    </div>
  )
}
