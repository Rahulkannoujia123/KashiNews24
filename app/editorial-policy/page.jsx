import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Editorial Policy - ${SITE.name}`,
  description: `${SITE.name} ki editorial policy aur journalism standards.`,
  alternates: { canonical: '/editorial-policy' },
}

export default function EditorialPolicyPage() {
  return (
    <StaticPage title="Editorial Policy" updated="September 2026">
      <p>
        {SITE.name} accuracy, fairness aur transparency ke principles par kaam
        karta hai. Yeh policy hamare journalism standards ko define karti hai.
      </p>
      <h2>Accuracy aur verification</h2>
      <p>
        Har khabar ko publish karne se pehle verify kiya jaata hai. Jahan possible
        ho, hum multiple sources se confirm karte hain.
      </p>
      <h2>Sourcing aur attribution</h2>
      <p>
        Original reporting {SITE.name} ke naam se publish hoti hai. Jo khabar kisi
        agency ya doosre publication se li gayi hai, use hum source ke saath
        credit karte hain.
      </p>
      <h2>Independence</h2>
      <p>
        Hamari editorial team advertisers ya political dabav se mukt hai.
        Sponsored content ko clearly label kiya jaata hai.
      </p>
      <h2>Fairness</h2>
      <p>
        Vivadit maamlon mein hum sabhi paksh ko rakhne ki koshish karte hain aur
        bina proof kisi par aarop nahi lagaate.
      </p>
      <h2>User-generated content</h2>
      <p>
        Public dwara bheji gayi khabar aur photos verify hone ke baad hi publish
        hoti hain.
      </p>
    </StaticPage>
  )
}
