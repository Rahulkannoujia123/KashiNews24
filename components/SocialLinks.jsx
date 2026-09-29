export default function SocialLinks() {
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61576493290727';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/kashilivenews24/';

  return (
    <section className="social-follow" aria-label="Kashi News 24 social media">
      <div>
        <div className="kicker">हमसे जुड़ें</div>
        <h3>सोशल मीडिया पर Kashi News 24 को Follow करें</h3>
        <p>वाराणसी की ताज़ा खबरों और अपडेट के लिए हमारे Facebook और Instagram से जुड़े रहें।</p>
      </div>
      <div className="social-follow-actions">
        <a className="social-follow-btn facebook" href={facebookUrl} target="_blank" rel="noopener noreferrer">📘 Facebook</a>
        <a className="social-follow-btn instagram" href={instagramUrl} target="_blank" rel="noopener noreferrer">📸 Instagram</a>
      </div>
    </section>
  );
}
