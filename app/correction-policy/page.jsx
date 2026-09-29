export const metadata = {
  title: 'सुधार नीति',
  description: 'Kashi Live News 24 पर तथ्यात्मक त्रुटियों के सुधार की नीति।'
};

export default function CorrectionPolicyPage() {
  return <main className="page-shell"><div className="shell form-page">
    <div className="kicker">Corrections</div>
    <h1>सुधार नीति</h1>
    <p className="article-lead">हम तथ्यात्मक गलतियों की सूचना मिलने पर उन्हें जांचने और आवश्यक सुधार करने का प्रयास करते हैं।</p>
    <h2>सुधार कैसे भेजें?</h2>
    <p>संबंधित खबर का लिंक, गलत जानकारी और सही जानकारी का स्रोत साझा करें।</p>
    <p><a className="primary" href="/send-news">सुधार/सूचना भेजें →</a></p>
    <h2>समीक्षा</h2>
    <p>प्राप्त जानकारी की संपादकीय समीक्षा की जाएगी। पर्याप्त पुष्टि होने पर खबर को अपडेट किया जा सकता है। हर अनुरोध में बदलाव करना आवश्यक नहीं है।</p>
  </div></main>;
}
