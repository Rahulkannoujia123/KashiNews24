import Link from 'next/link';

const pages = {
  about: ['Kashi Live News 24 के बारे में', 'Kashi Live News 24 वाराणसी, काशी और बनारस की खबरों और जन-सूचनाओं को एक जगह प्रस्तुत करता है। बाहरी खबरों के साथ उनके मूल स्रोत की जानकारी दी जाती है।'],
  contact: ['संपर्क', 'खबर या सुझाव भेजने के लिए हमें खबर भेजें फॉर्म का उपयोग करें।'],
  'privacy-policy': ['गोपनीयता नीति', 'आपकी जानकारी का उपयोग आवश्यक सेवा, संपर्क, सुरक्षा, विश्लेषण और विज्ञापन उद्देश्यों के लिए किया जाता है।'],
  terms: ['उपयोग के नियम', 'यह सामग्री सामान्य जानकारी के लिए है। बाहरी रिपोर्ट अपने मूल प्रकाशक की संपत्ति हैं।'],
  disclaimer: ['अस्वीकरण', 'लाइव फीड में देरी या कमी हो सकती है। महत्वपूर्ण जानकारी के लिए आधिकारिक स्रोत से पुष्टि करें।'],
  'editorial-policy': ['संपादकीय नीति', 'मूल और बाहरी खबरों को अलग रखा जाता है, स्रोत बताए जाते हैं और महत्वपूर्ण गलती होने पर सुधार किया जाता है।'],
  'correction-policy': ['सुधार नीति', 'महत्वपूर्ण गलती मिलने पर प्रभावित जानकारी सुधारी जाएगी और संशोधन का समय बताया जाएगा।'],
  advertise: ['विज्ञापन', 'विज्ञापन के स्थान उपलब्ध हैं। विज्ञापन शुरू करने से पहले आवश्यक संपर्क और गोपनीयता जानकारी प्रकाशित करनी होगी।'],
};

export default function InfoPage({ slug }) {
  const page = pages[slug];
  if (!page) return null;
  const [title, text] = page;

  return (
    <>
      <header className="masthead">
        <div className="shell masthead-row">
          <Link href="/" className="brand" aria-label="Kashi Live News 24 होम">
            <span className="brand-mark">क</span>
            <span className="brand-name">KASHI LIVE NEWS 24<span>VARANASI | KASHI | BANARAS</span></span>
          </Link>
          <Link href="/" className="icon-btn" aria-label="होम">⌂</Link>
        </div>
      </header>
      <main className="shell">
        <article className="form-page">
          <h1>{title}</h1>
          <p className="article-lead">{text}</p>
          {slug === 'contact' && (
            <p>
              <Link className="primary" href="/send-news">हमें खबर भेजें</Link>
            </p>
          )}
        </article>
      </main>
    </>
  );
}
