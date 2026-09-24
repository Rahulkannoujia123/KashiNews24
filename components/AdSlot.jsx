'use client';

import { useEffect } from 'react';

export default function AdSlot({ label = 'Advertisement' }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slots = {
    'Top banner': process.env.NEXT_PUBLIC_ADSENSE_HOME_SLOT,
    'In-article': process.env.NEXT_PUBLIC_ADSENSE_MIDDLE_SLOT,
    Sidebar: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT
  };
  const displayLabel = { 'Top banner': 'ऊपरी विज्ञापन', 'In-article': 'खबर के बीच विज्ञापन', Sidebar: 'साइडबार विज्ञापन', Advertisement: 'विज्ञापन' }[label] || label;
  const slot = slots[label];

  useEffect(() => {
    if (!client || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
    }
  }, [client, slot]);

  if (client && slot) {
    return (
      <div className="ad-slot-wrap" aria-label={label}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '90px' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className="ad-slot" aria-label={label}>
      <span>विज्ञापन</span>
      <strong>{displayLabel}</strong>
    </div>
  );
}
