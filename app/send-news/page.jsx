'use client';

import { useState } from 'react';
import Link from 'next/link';
import { JsonLd, createWebPageSchema } from '../../components/JsonLd';

export default function SendNews() {
  const pageSchema = createWebPageSchema({
    url: 'https://kashi-livenews24.vercel.app/send-news',
    name: 'हमें खबर भेजें | Kashi Live News 24',
    description: 'वाराणसी की खबर, फोटो, वीडियो या स्थानीय सूचना संपादकीय समीक्षा के लिए भेजें।',
    type: 'ContactPage'
  });

  const [form, setForm] = useState({
    name: '', contact: '', title: '', description: '', location: '', mediaUrl: '', sourceUrl: '', consent: false
  });
  const [state, setState] = useState({ loading: false, error: '', success: false });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    setState({ loading: true, error: '', success: false });
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'खबर भेजने में समस्या हुई।');
      setState({ loading: false, error: '', success: true });
    } catch (error) {
      setState({ loading: false, error: error.message || 'कुछ गलत हुआ। कृपया दोबारा कोशिश करें।', success: false });
    }
  }

  if (state.success) {
    return (
      <>
        <JsonLd data={pageSchema} id="send-news-success-jsonld" />
        <div className="send-news-page">
          <header className="send-news-header">
            <div className="shell send-news-header-inner">
              <Link href="/" className="send-news-brand" aria-label="Kashi Live News 24 होम">
                <span className="brand-mark">क</span>
                <span><strong>KASHI LIVE NEWS 24</strong><small>VARANASI | KASHI | BANARAS</small></span>
              </Link>
              <Link href="/" className="send-news-back">← होम</Link>
            </div>
          </header>
          <main className="shell send-news-shell">
            <section className="send-news-success" aria-live="polite">
              <div className="success-icon" aria-hidden="true">✓</div>
              <div className="kicker">खबर प्राप्त हुई</div>
              <h1>धन्यवाद, आपकी खबर मिल गई।</h1>
              <p>आपकी जानकारी अभी प्रकाशित नहीं होगी। पहले हमारी संपादकीय टीम तथ्य और स्रोत की जांच करेगी।</p>
              <div className="success-actions">
                <Link className="primary send-news-btn" href="/">होमपेज पर जाएं</Link>
                <button type="button" className="send-news-secondary-btn" onClick={() => setState({ loading: false, error: '', success: false })}>दूसरी खबर भेजें</button>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <JsonLd data={pageSchema} id="send-news-jsonld" />
      <div className="send-news-page">
        <header className="send-news-header">
          <div className="shell send-news-header-inner">
            <Link href="/" className="send-news-brand" aria-label="Kashi Live News 24 होम">
              <span className="brand-mark">क</span>
              <span><strong>KASHI LIVE NEWS 24</strong><small>VARANASI | KASHI | BANARAS</small></span>
            </Link>
            <Link href="/" className="send-news-back">← होमपेज</Link>
          </div>
        </header>

        <main className="shell send-news-shell">
          <section className="send-news-hero">
            <div>
              <div className="send-news-eyebrow">कम्युनिटी न्यूज़ डेस्क</div>
              <h1>हमें खबर भेजें</h1>
              <p>वाराणसी में हुई खबर, फोटो, वीडियो या स्थानीय सूचना हमारे साथ साझा करें। हर submission पहले editorial review से गुजरेगा।</p>
            </div>
            <div className="send-news-steps" aria-label="खबर भेजने की प्रक्रिया">
              <div className="send-news-step"><strong>01</strong><span>जानकारी भरें</span></div>
              <div className="send-news-step"><strong>02</strong><span>स्रोत जोड़ें</span></div>
              <div className="send-news-step"><strong>03</strong><span>समीक्षा होगी</span></div>
            </div>
          </section>

          <div className="send-news-layout">
            <section className="send-news-card">
              <div className="send-news-card-head">
                <div><div className="kicker">News Tip</div><h2>खबर की जानकारी</h2></div>
                <span className="required-note">* जरूरी जानकारी</span>
              </div>

              {state.error && (
                <div role="alert" className="send-news-alert">
                  <strong>खबर भेजी नहीं जा सकी</strong><span>{state.error}</span>
                </div>
              )}

              <form className="send-news-form" onSubmit={submit}>
                <fieldset className="send-news-section">
                  <legend>आपकी जानकारी</legend>
                  <div className="send-news-grid two">
                    <label className="send-field">
                      <span>नाम <b>*</b></span>
                      <input className="send-input" value={form.name} onChange={(e) => update('name', e.target.value)} required maxLength={80} autoComplete="name" placeholder="आपका नाम" />
                    </label>
                    <label className="send-field">
                      <span>मोबाइल / ईमेल <b>*</b></span>
                      <input className="send-input" value={form.contact} onChange={(e) => update('contact', e.target.value)} required maxLength={120} autoComplete="email" placeholder="98xxxxxx10 या email@example.com" />
                    </label>
                  </div>
                </fieldset>

                <fieldset className="send-news-section">
                  <legend>खबर की जानकारी</legend>
                  <div className="send-news-grid two">
                    <label className="send-field full">
                      <span>खबर का शीर्षक <b>*</b></span>
                      <input className="send-input" value={form.title} onChange={(e) => update('title', e.target.value)} required maxLength={180} placeholder="उदाहरण: सिगरा में ट्रैफिक जाम, पुलिस मौके पर" />
                    </label>
                    <label className="send-field full">
                      <span>स्थान <b>*</b></span>
                      <input className="send-input" value={form.location} onChange={(e) => update('location', e.target.value)} required maxLength={120} placeholder="जैसे: लंका, सिगरा, सारनाथ, BHU" />
                    </label>
                    <label className="send-field full">
                      <span>विवरण <b>*</b></span>
                      <textarea className="send-input send-textarea" value={form.description} onChange={(e) => update('description', e.target.value)} required maxLength={5000} rows={8} placeholder="क्या हुआ? कब हुआ? कहां हुआ? कौन-सी जानकारी या स्रोत उपलब्ध है?" />
                      <small>{form.description.length}/5000 characters</small>
                    </label>
                  </div>
                </fieldset>

                <fieldset className="send-news-section">
                  <legend>फोटो, वीडियो और स्रोत</legend>
                  <div className="send-news-grid two">
                    <label className="send-field">
                      <span>फोटो / वीडियो लिंक</span>
                      <input className="send-input" type="url" value={form.mediaUrl} onChange={(e) => update('mediaUrl', e.target.value)} placeholder="https://..." />
                      <small>अभी direct file upload नहीं है। Public Google Drive/Cloudinary link दे सकते हैं।</small>
                    </label>
                    <label className="send-field">
                      <span>मूल स्रोत / सोशल पोस्ट लिंक</span>
                      <input className="send-input" type="url" value={form.sourceUrl} onChange={(e) => update('sourceUrl', e.target.value)} placeholder="https://..." />
                      <small>Original post, official notice या source link उपलब्ध हो तो जरूर जोड़ें।</small>
                    </label>
                  </div>
                </fieldset>

                <label className="send-consent">
                  <input type="checkbox" checked={form.consent} onChange={(e) => update('consent', e.target.checked)} required />
                  <span>मैं पुष्टि करता/करती हूं कि दी गई जानकारी मेरी जानकारी के अनुसार सही है और Kashi Live News 24 इसे सत्यापित, संपादित या प्रकाशित कर सकता है।</span>
                </label>

                <button className="primary send-news-submit" type="submit" disabled={state.loading}>
                  {state.loading ? 'भेजा जा रहा है…' : 'जांच के लिए खबर भेजें →'}
                </button>
              </form>
            </section>

            <aside className="send-news-sidebar">
              <div className="send-news-info-card">
                <div className="send-news-info-icon">✓</div>
                <h3>क्या भेज सकते हैं?</h3>
                <p>स्थानीय घटना, ट्रैफिक अपडेट, नागरिक समस्या, फोटो, वीडियो, रोजगार या अन्य उपयोगी स्थानीय सूचना।</p>
              </div>
              <div className="send-news-info-card">
                <div className="send-news-info-icon">!</div>
                <h3>ध्यान रखें</h3>
                <ul>
                  <li>संभव हो तो तारीख, समय और सही स्थान लिखें।</li>
                  <li>Original source या official link जोड़ें।</li>
                  <li>गलत या भ्रामक जानकारी भेजने से बचें।</li>
                  <li>Submission भेजना publication की guarantee नहीं है।</li>
                </ul>
              </div>
              <div className="send-news-contact-card">
                <span>लोकल खबर?</span>
                <strong>कच्ची जानकारी नहीं, सही context भेजें.</strong>
                <p>जितनी स्पष्ट जानकारी होगी, उतनी आसानी से हमारी टीम उसकी समीक्षा कर पाएगी।</p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
