import { notFound } from 'next/navigation';
import InfoPage from '../info-page';

const pages = {
  about: ['About Kashi Live News 24', 'Kashi Live News 24 covers news and public information related to Varanasi, Kashi and Banaras. Stories shown on this site may come from external publishers; each external item should be read with its source attribution. Editorial ownership and staff details have not been provided in this project.'],
  contact: ['Contact', 'For a news tip, use the Send Us News form. A working newsroom email, phone number and social account were not configured in this project, so none are listed here.'],
  'privacy-policy': ['Privacy Policy', 'This project does not document a production analytics, advertising, or contact form data policy. Before collecting personal information or enabling analytics and advertising, the site operator should publish the applicable data practices, retention period and contact details.'],
  terms: ['Terms of Use', 'Content is provided for general information. External reporting remains the property of its respective publisher and is linked to its source when available. Do not republish third party material without permission.'],
  disclaimer: ['Disclaimer', 'News feeds and summaries may be supplied by third party services and can be delayed or incomplete. Verify time-sensitive public safety, travel, weather and official information with the responsible authority.'],
  'editorial-policy': ['Editorial Policy', 'The site should distinguish original reporting from external material, identify sources, verify claims before publication, and correct material errors transparently. User submissions require editorial review and should not be published automatically.'],
  'correction-policy': ['Corrections Policy', 'When a published story contains a material error, correct the affected information and show when the story was updated. A public correction contact must be configured by the site operator before this policy can accept requests.'],
  advertise: ['Advertise', 'Advertising placements are reserved in the layout. No advertising contact, rates or advertiser relationship has been configured. Ad code should be added only after the operator has published accurate privacy and advertising disclosures.']
};

export function generateStaticParams() { return Object.keys(pages).map((page) => ({ page })); }

export async function generateMetadata({ params }) {
  const { page } = await params;
  const titles = { about: 'हमारे बारे में', contact: 'संपर्क', 'privacy-policy': 'गोपनीयता नीति', terms: 'उपयोग के नियम', disclaimer: 'अस्वीकरण', 'editorial-policy': 'संपादकीय नीति', 'correction-policy': 'सुधार नीति', advertise: 'विज्ञापन' };
  return pages[page] ? { title: titles[page] || 'जानकारी', description: 'Kashi Live News 24 की हिंदी जानकारी और नीतियां।' } : {};
}

export default async function InformationPage({ params }) {
  const { page } = await params;
  if (!pages[page]) notFound();
  return <InfoPage slug={page} />;
}
