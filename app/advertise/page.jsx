import Link from 'next/link'
import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Advertise - ${SITE.name}`,
  description: `${SITE.name} par advertise karein aur Varanasi ke local audience tak pahunchein.`,
  alternates: { canonical: '/advertise' },
}

export default function AdvertisePage() {
  return (
    <StaticPage title="Advertise With Us">
      <p>
        {SITE.name} Varanasi aur Purvanchal ke engaged local readers tak pahunchne
        ka behtareen zariya hai. Agar aap apne business, event ya brand ko local
        audience tak le jaana chahte hain, to hum aapki madad kar sakte hain.
      </p>
      <h2>Advertising options</h2>
      <ul>
        <li>Homepage aur article page display ads</li>
        <li>Category-specific placements (Business, Education, Sports, etc.)</li>
        <li>Clearly-labelled sponsored stories</li>
      </ul>
      <h2>Hamari values</h2>
      <p>
        Advertisement aur editorial content hamesha alag rakhe jaate hain.
        Sponsored content ko clearly "Sponsored" label diya jaata hai taaki reader
        ko koi confusion na ho.
      </p>
      <p>
        Advertising ke liye hamare <Link href="/contact">Contact</Link> page ke
        through sampark karein.
      </p>
    </StaticPage>
  )
}
