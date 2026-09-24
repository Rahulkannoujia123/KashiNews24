import Link from 'next/link'
import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Corrections Policy - ${SITE.name}`,
  description: `${SITE.name} ki corrections policy - galtiyon ko kaise sudhaara jaata hai.`,
  alternates: { canonical: '/correction-policy' },
}

export default function CorrectionPolicyPage() {
  return (
    <StaticPage title="Corrections Policy" updated="September 2026">
      <p>
        {SITE.name} apni galtiyon ko maanne aur jald sudhaarne mein vishwaas karta
        hai. Yeh transparency hamare readers ke bharose ke liye zaroori hai.
      </p>
      <h2>Galti report kaise karein</h2>
      <p>
        Agar aapko kisi khabar mein factual galti dikhe, to hamare{' '}
        <Link href="/contact">Contact</Link> page ke through humein bataayein.
        Kripya story ka link aur galti ki detail zaroor dein.
      </p>
      <h2>Hum kaise sudhaarte hain</h2>
      <ul>
        <li>Report milte hi hamari team usse verify karti hai.</li>
        <li>Confirm hone par story ko turant update kiya jaata hai.</li>
        <li>
          Badi galti hone par story mein clearly likha jaata hai ki correction kab
          aur kyun kiya gaya.
        </li>
      </ul>
      <p>
        Hamara maqsad hai ki har khabar accurate rahe aur reader ko sahi jaankari
        mile.
      </p>
    </StaticPage>
  )
}
