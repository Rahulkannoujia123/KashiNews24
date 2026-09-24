// Formats an ISO date into a readable Hindi (India) date + time string.
export function formatDateTime(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('hi-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  }).format(date)
}

// Short relative time (e.g. "2 ghante pehle") for cards and tickers.
export function relativeTime(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  const diff = Date.now() - date.getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'abhi'
  if (mins < 60) return `${mins} min pehle`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} ghante pehle`
  const days = Math.round(hours / 24)
  if (days < 7) return `${days} din pehle`
  return formatDateTime(iso)
}
