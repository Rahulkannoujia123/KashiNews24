import StaticPage from '../../components/static-page'
import { SITE } from '../../lib/site'

export const metadata = {
  title: `Terms of Use - ${SITE.name}`,
  description: `${SITE.name} ki terms of use aur website upyog ki shartein.`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Use" updated="September 2026">
      <p>
        {SITE.name} ki website ka upyog karke aap in sharton se sehmat hote hain.
        Agar aap sehmat nahi hain, to kripya website ka upyog na karein.
      </p>
      <h2>Content ka upyog</h2>
      <p>
        Is website ka saara original content {SITE.name} ki property hai. Aap
        personal, non-commercial upyog ke liye content padh aur share kar sakte
        hain, lekin bina permission reproduce ya republish nahi kar sakte.
      </p>
      <h2>User submissions</h2>
      <p>
        News submit karte samay aap confirm karte hain ki jaankari sahi hai aur
        aapke paas usse share karne ka adhikaar hai. Hum kisi bhi submission ko
        verify, edit ya reject karne ka adhikaar rakhte hain.
      </p>
      <h2>Third-party links</h2>
      <p>
        Hamari khabrein external sources ko link kar sakti hain. Un websites ke
        content ke liye hum zimmedaar nahi hain.
      </p>
      <h2>Zimmedari ki seema</h2>
      <p>
        Hum khabar ki accuracy ke liye poori koshish karte hain, lekin website
        "as is" provide ki jaati hai. Kisi bhi nuksaan ke liye {SITE.name}
        zimmedaar nahi hoga.
      </p>
    </StaticPage>
  )
}
