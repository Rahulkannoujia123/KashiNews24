import Link from 'next/link'
import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Contact - ${SITE.name}`,
  description: `${SITE.name} se sampark karein - news tips, feedback, corrections aur advertising ke liye.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        {SITE.name} tak apni baat pahunchane ke liye neeche diye options ka
        istemaal karein. Hum har genuine message ko padhte hain.
      </p>
      <h2>News tip ya khabar bhejein</h2>
      <p>
        Aapke area mein kuch hua hai? Photo, video ya details ke saath humein{' '}
        <Link href="/send-news">Send Us News</Link> form ke through bhejein. Hamari
        team verify karke publish karti hai.
      </p>
      <h2>Corrections</h2>
      <p>
        Kisi khabar mein galti dikhe to humein bataayein — dekhein hamari{' '}
        <Link href="/correction-policy">Corrections Policy</Link>.
      </p>
      <h2>Advertising</h2>
      <p>
        Apna vigyapan dene ke liye <Link href="/advertise">Advertise</Link> page
        dekhein.
      </p>
      <p className="meta">
        Note: Verified email aur phone details launch se pehle yahan add ki
        jaayengi. Tab tak news submissions ke liye kripya Send Us News form ka
        upyog karein.
      </p>
    </StaticPage>
  )
}
