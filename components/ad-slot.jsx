// Reusable ad slot. Renders a real AdSense unit when configured, otherwise a
// clearly-labelled placeholder. Slots never overlap content or auto-expand.
export default function AdSlot({ slot, label = 'Advertisement', className = '' }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT
  if (client && slot) {
    return (
      <div className={`ad-wrap ${className}`} aria-label={label} role="complementary">
        <span className="ad-tag">{label}</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    )
  }
  return (
    <div className={`ad-slot ${className}`} role="complementary" aria-label={label}>
      <span>{label}</span>
      <small>विज्ञापन स्थान · Advertise with Kashi Live News 24</small>
    </div>
  )
}
