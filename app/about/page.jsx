import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `About Us - ${SITE.name}`,
  description: `Jaaniye ${SITE.name} ke baare mein - Varanasi aur Kashi ki trusted local Hindi news website.`,
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <StaticPage title="About Us">
      <p>
        <strong>{SITE.name}</strong> ek independent digital news platform hai jo
        Varanasi, Kashi aur Purvanchal ke logon tak sahi, tez aur verified khabar
        pahunchane ke liye bana hai. Hamara focus local reporting par hai — city
        ki chhoti-badi khabrein, civic issues, education, business aur culture.
      </p>
      <h2>Hamara mission</h2>
      <p>
        Local journalism ko digital-first banaana, taaki har Banarasi ko apne
        shehar ki khabar sabse pehle aur bina kisi milawat ke mile. Hum sensational
        ya bina verify ki khabrein publish nahi karte.
      </p>
      <h2>Hum kaam kaise karte hain</h2>
      <ul>
        <li>Original local reporting hamari team ke naam se publish hoti hai.</li>
        <li>
          National aur agency news ko hum uske <em>source ke saath</em> clearly
          mention karke dikhaate hain.
        </li>
        <li>User submissions kabhi bhi automatically publish nahi hoti — pehle verify hoti hain.</li>
      </ul>
      <h2>Editorial independence</h2>
      <p>
        Hamari news coverage kisi bhi advertiser ya political interest se
        prabhaavit nahi hoti. Advertisement aur editorial content hamesha alag
        rakhe jaate hain.
      </p>
      <p>
        Kisi bhi sujhaav, sudhaar ya khabar ke liye hamare{' '}
        <a href="/contact">Contact</a> page par jaayein.
      </p>
    </StaticPage>
  )
}
