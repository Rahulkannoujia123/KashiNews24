'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SendNews() {
	const [sent, setSent] = useState(false);
	if (sent) return <main><div className="shell form-page"><div className="kicker">खबर प्राप्त हुई</div><h1>धन्यवाद, आपकी खबर मिल गई।</h1><p className="article-lead">हमारी संपादकीय टीम जानकारी की पुष्टि करेगी। User submissions अपने-आप प्रकाशित नहीं होतीं।</p><Link className="primary" href="/">होमपेज पर जाएं</Link></div></main>;
	return <><div className="masthead"><div className="shell masthead-row"><Link href="/" className="brand"><div className="brand-mark">क</div><div className="brand-name">Kashi Live 24<span>कम्युनिटी न्यूज़ डेस्क</span></div></Link></div></div><main><div className="shell form-page"><div className="kicker">कम्युनिटी डेस्क</div><h1>हमें खबर भेजें</h1><p className="article-lead">आपके क्षेत्र में कुछ हुआ है? जानकारी भेजें, हम पुष्टि करके प्रकाशित करेंगे।</p><form className="form-grid" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label className="field">नाम<input required placeholder="आपका नाम" /></label><label className="field">मोबाइल / ईमेल<input required placeholder="संपर्क विवरण" /></label><label className="field">खबर का शीर्षक<input required placeholder="खबर का छोटा शीर्षक" /></label><label className="field">विवरण<textarea required placeholder="क्या हुआ? कब और कहां?" /></label><label className="field">स्थान<input required placeholder="क्षेत्र, वाराणसी" /></label><label className="field">फोटो / वीडियो<input type="file" accept="image/*,video/*" /></label><label><input type="checkbox" required /> मैं पुष्टि करता/करती हूं कि यह जानकारी सही है और Kashi Live 24 इसे सत्यापित कर सकता है।</label><button className="primary">जांच के लिए भेजें</button></form></div></main></>;
}
