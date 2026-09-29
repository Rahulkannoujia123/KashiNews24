import { JsonLd, createWebPageSchema } from '../../components/JsonLd';
export const metadata = {
  title: 'गोपनीयता नीति',
  description: 'Kashi Live News 24 की गोपनीयता और कुकी नीति।'
};

export default function PrivacyPolicyPage() {
  const pageSchema = createWebPageSchema({ url: 'https://kashi-livenews24.vercel.app/privacy-policy', name: 'गोपनीयता नीति | Kashi Live News 24', description: 'Kashi Live News 24 की गोपनीयता और कुकी नीति।' });
  return <><JsonLd data={pageSchema} id="page-jsonld"/><main className="page-shell"><div className="shell form-page">
    <div className="kicker">Privacy</div>
    <h1>गोपनीयता नीति</h1>
    <p className="article-lead">यह नीति बताती है कि Kashi Live News 24 वेबसाइट पर आने वाले उपयोगकर्ताओं की जानकारी के संबंध में हमारी सामान्य प्रक्रिया क्या है।</p>
    <h2>हम कौन-सी जानकारी प्राप्त कर सकते हैं?</h2>
    <p>यदि आप हमें खबर भेजते हैं, तो आपके द्वारा दिए गए नाम, संपर्क विवरण, खबर का विवरण, स्थान और आपके द्वारा साझा किए गए लिंक जैसी जानकारी submission को संसाधित करने के लिए उपयोग की जा सकती है।</p>
    <h2>कुकी और विज्ञापन</h2>
    <p>वेबसाइट के संचालन, मापन और विज्ञापन सेवाओं के लिए कुकी या समान तकनीकों का उपयोग हो सकता है। Google AdSense जैसे विज्ञापन प्रदाता विज्ञापन दिखाने और मापन के लिए कुकी का उपयोग कर सकते हैं।</p>
    <h2>जानकारी का उपयोग</h2>
    <p>प्राप्त जानकारी का उपयोग खबर की समीक्षा, वेबसाइट संचालन, सुरक्षा, सुधार और उपयोगकर्ता अनुभव बेहतर करने के लिए किया जा सकता है। हम किसी submission को बिना संपादकीय समीक्षा के स्वतः प्रकाशित करने का वादा नहीं करते।</p>
    <h2>बाहरी वेबसाइटें</h2>
    <p>हमारी खबरों में बाहरी स्रोतों के लिंक हो सकते हैं। उन वेबसाइटों की अपनी privacy policies हो सकती हैं और उनके व्यवहार के लिए संबंधित वेबसाइट जिम्मेदार है।</p>
    <h2>नीति में बदलाव</h2>
    <p>वेबसाइट या कानूनी आवश्यकताओं में बदलाव होने पर इस नीति को अपडेट किया जा सकता है।</p>
  </div></main>;
}
