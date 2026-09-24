import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Privacy Policy - ${SITE.name}`,
  description: `${SITE.name} ki privacy policy - hum aapka data kaise collect aur use karte hain.`,
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="September 2026">
      <p>
        Yeh Privacy Policy batati hai ki {SITE.name} ("hum") aapki jaankari kaise
        collect, use aur protect karta hai jab aap hamari website ka upyog karte
        hain.
      </p>
      <h2>Jo jaankari hum collect karte hain</h2>
      <ul>
        <li>
          <strong>Aapke dwara di gayi jaankari:</strong> Jab aap news submit karte
          hain ya contact karte hain, to naam aur contact details.
        </li>
        <li>
          <strong>Automatic data:</strong> Browser type, device, aur pages jo aap
          dekhte hain (analytics ke liye).
        </li>
      </ul>
      <h2>Cookies aur analytics</h2>
      <p>
        Hum apni website ko behtar banane ke liye analytics cookies (jaise Google
        Analytics) ka upyog karte hain. Advertising partners (jaise Google
        AdSense) relevant ads dikhane ke liye cookies use kar sakte hain. Aap apne
        browser se cookies control kar sakte hain.
      </p>
      <h2>Third-party advertising</h2>
      <p>
        Google jaise third-party vendors interest-based ads dikhane ke liye
        cookies ka upyog karte hain. Aap Google Ads Settings ke through
        personalised advertising se opt-out kar sakte hain.
      </p>
      <h2>Aapke data ka istemaal</h2>
      <p>
        Hum aapka data sirf khabar verify karne, aapse sampark karne aur website
        improve karne ke liye use karte hain. Hum aapki personal jaankari bechte
        nahi hain.
      </p>
      <h2>Bachchon ki privacy</h2>
      <p>Yeh website 13 saal se kam umar ke bachchon ke liye nahi hai.</p>
      <h2>Badlav</h2>
      <p>
        Is policy ko samay-samay par update kiya ja sakta hai. Naya version isi
        page par publish hoga.
      </p>
    </StaticPage>
  )
}
