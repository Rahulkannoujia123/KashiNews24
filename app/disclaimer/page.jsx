import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Disclaimer - ${SITE.name}`,
  description: `${SITE.name} ka disclaimer.`,
  alternates: { canonical: '/disclaimer' },
}

export default function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer" updated="September 2026">
      <p>
        {SITE.name} par di gayi jaankari sirf general information ke liye hai. Hum
        khabar ko accurate aur updated rakhne ki poori koshish karte hain.
      </p>
      <h2>External aur agency content</h2>
      <p>
        Kuch khabrein third-party news sources aur agencies par aadhaarit hoti
        hain, jinhe hum source ke saath clearly mention karte hain. Un khabron ki
        original accuracy ke liye respective source zimmedaar hai.
      </p>
      <h2>Koi professional salah nahi</h2>
      <p>
        Website par di gayi jaankari ko legal, medical ya financial salah na
        samjhein. Kisi bhi nirnay se pehle expert se salah lein.
      </p>
      <h2>Galti sudhaar</h2>
      <p>
        Agar kisi khabar mein galti ho to hum use jald se jald sudhaarte hain.
        Detail ke liye hamari Corrections Policy dekhein.
      </p>
    </StaticPage>
  )
}
