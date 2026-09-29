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
  const [form, setForm] = useState({ name:'', contact:'', title:'', description:'', location:'', mediaUrl:'', sourceUrl:'', consent:false });
  const [state, setState] = useState({ loading:false, error:'', success:false });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  async function submit(e) {
    e.preventDefault();
    setState({ loading:true, error:'', success:false });
    try {
      const response = await fetch('/api/submissions', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:JSON.stringify(form)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'खबर भेजने में समस्या हुई।');
      setState({ loading:false, error:'', success:true });
    } catch (error) {
      setState({ loading:false, error:error.message || 'कुछ गलत हुआ।', success:false });
    }
  }

  if (state.success) {
    return <><JsonLd data={pageSchema} id="send-news-jsonld"/><JsonLd data={pageSchema} id="send-news-jsonld"/><main><div className="shell form-page">
      <div className="kicker">खबर प्राप्त हुई</div>
      <h1>धन्यवाद, आपकी खबर मिल गई।</h1>
      <p className="article-lead">आपकी जानकारी अभी प्रकाशित नहीं होगी। पहले हमारी संपादकीय टीम तथ्य और स्रोत की जांच करेगी।</p>
      <Link className="primary" href="/">होमपेज पर जाएं</Link>
    </div></main>;
  }

  return <>
    <div className="masthead"><div className="shell masthead-row">
      <Link href="/" className="brand"><div className="brand-mark">क</div><div className="brand-name">Kashi Live 24<span>कम्युनिटी न्यूज़ डेस्क</span></div></Link>
    </div></div>
    <main><div className="shell form-page">
      <div className="kicker">कम्युनिटी डेस्क</div>
      <h1>हमें खबर भेजें</h1>
      <p className="article-lead">वाराणसी में हुई खबर, फोटो, वीडियो या स्थानीय सूचना भेजें। हर submission पहले editorial review से गुजरेगा।</p>

      {state.error && <div role="alert" className="source-note" style={{marginBottom:16}}>{state.error}</div>}

      <form className="form-grid" onSubmit={submit}>
        <label className="field">नाम<input value={form.name} onChange={e=>update('name',e.target.value)} required maxLength={80} placeholder="आपका नाम" /></label>
        <label className="field">मोबाइल / ईमेल<input value={form.contact} onChange={e=>update('contact',e.target.value)} required maxLength={120} placeholder="संपर्क विवरण" /></label>
        <label className="field">खबर का शीर्षक<input value={form.title} onChange={e=>update('title',e.target.value)} required maxLength={180} placeholder="खबर का छोटा शीर्षक" /></label>
        <label className="field">विवरण<textarea value={form.description} onChange={e=>update('description',e.target.value)} required maxLength={5000} rows={7} placeholder="क्या हुआ? कब, कहां और किससे संबंधित है?" /></label>
        <label className="field">स्थान<input value={form.location} onChange={e=>update('location',e.target.value)} required maxLength={120} placeholder="जैसे: लंका, सिगरा, सारनाथ" /></label>
        <label className="field">फोटो / वीडियो लिंक<input type="url" value={form.mediaUrl} onChange={e=>update('mediaUrl',e.target.value)} placeholder="https://..." /><small>अभी direct file upload नहीं है; Google Drive/Cloudinary आदि का public link दे सकते हैं।</small></label>
        <label className="field">मूल स्रोत / सोशल पोस्ट लिंक<input type="url" value={form.sourceUrl} onChange={e=>update('sourceUrl',e.target.value)} placeholder="https://..." /></label>
        <label><input type="checkbox" checked={form.consent} onChange={e=>update('consent',e.target.checked)} required /> मैं पुष्टि करता/करती हूं कि यह जानकारी सही है और Kashi Live 24 इसे सत्यापित/संपादित कर सकता है।</label>
        <button className="primary" disabled={state.loading}>{state.loading ? 'भेजा जा रहा है…' : 'जांच के लिए भेजें'}</button>
      </form>
    </div></main>
  </>;
}
