import Link from 'next/link';

export const metadata = {
  title: 'संपर्क करें',
  description: 'Kashi Live News 24 से संपर्क करने और स्थानीय खबर भेजने की जानकारी।'
};

export default function ContactPage() {
  return <main className="page-shell"><div className="shell form-page">
    <div className="kicker">Contact</div>
    <h1>संपर्क करें</h1>
    <p className="article-lead">खबर, सुधार, सुझाव या स्थानीय सूचना साझा करने के लिए हमारा ऑनलाइन submission form इस्तेमाल करें।</p>
    <h2>खबर या सूचना भेजें</h2>
    <p>अपना नाम, संपर्क विवरण, खबर का विवरण, स्थान और उपलब्ध स्रोत/मीडिया लिंक के साथ जानकारी भेजें। प्रकाशन से पहले संपादकीय समीक्षा की जाती है।</p>
    <p><Link className="primary" href="/send-news">हमें खबर भेजें →</Link></p>
    <h2>सुधार संबंधी सूचना</h2>
    <p>किसी प्रकाशित खबर में तथ्यात्मक गलती मिले तो खबर का लिंक और सही जानकारी भेजें। हमारी टीम समीक्षा के बाद आवश्यक सुधार कर सकती है।</p>
    <p><Link href="/correction-policy">सुधार नीति पढ़ें →</Link></p>
    <p><Link href="/">होमपेज पर वापस जाएं</Link></p>
  </div></main>;
}
