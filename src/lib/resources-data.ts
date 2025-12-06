import type { Resource, TemplateDocument, PhilippineRegion } from "@shared/schema";

export const resources: Resource[] = [
  {
    id: "nbi-cybercrime",
    name: "NBI Cybercrime Division",
    category: "emergency",
    type: "hotline",
    phone: "(02) 8523-8231",
    email: "cybercrime@nbi.gov.ph",
    website: "https://www.nbi.gov.ph",
    description: "The National Bureau of Investigation's specialized unit for cybercrime investigations. Report serious online crimes including hacking, online fraud, and cyberstalking.",
    hours: "24/7 for emergencies",
    languages: ["Filipino", "English"]
  },
  {
    id: "pnp-acg",
    name: "PNP Anti-Cybercrime Group",
    category: "emergency",
    type: "hotline",
    phone: "(02) 8723-0401",
    email: "acg@pnp.gov.ph",
    website: "https://acg.pnp.gov.ph",
    description: "Philippine National Police unit handling cybercrime cases. File reports for online harassment, scams, and digital threats.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  },
  {
    id: "deped-child-protection",
    name: "DepEd Child Protection Unit",
    category: "government",
    type: "hotline",
    phone: "(02) 8637-4347",
    email: "childprotection@deped.gov.ph",
    website: "https://www.deped.gov.ph",
    description: "Department of Education's hotline for reporting child protection concerns in schools including cyberbullying among students.",
    hours: "Monday-Friday 8AM-5PM",
    languages: ["Filipino", "English"]
  },
  {
    id: "dswd-bantay-bata",
    name: "DSWD Bantay Bata 163",
    category: "emergency",
    type: "hotline",
    phone: "163",
    website: "https://bantaybata163.dswd.gov.ph",
    description: "24/7 hotline for child abuse cases including online exploitation and cyberbullying of minors.",
    hours: "24/7",
    languages: ["Filipino", "English", "Cebuano"]
  },
  {
    id: "hopeline",
    name: "Hopeline Philippines",
    category: "mental_health",
    type: "hotline",
    phone: "(02) 8804-4673",
    description: "Crisis support line for those experiencing emotional distress, including victims of cyberbullying and online harassment.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  },
  {
    id: "natl-mental-health",
    name: "National Center for Mental Health",
    category: "mental_health",
    type: "hotline",
    phone: "1553",
    description: "Government mental health crisis line providing free counseling support.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  },
  {
    id: "flag",
    name: "Free Legal Assistance Group (FLAG)",
    category: "legal_aid",
    type: "organization",
    phone: "(02) 8920-4402",
    email: "flag@flag.org.ph",
    website: "https://flag.org.ph",
    description: "Volunteer lawyers providing free legal aid for human rights cases including digital rights violations.",
    regions: ["NCR", "Region III", "Region IV-A", "Region VII"],
    hours: "Monday-Friday 9AM-5PM",
    languages: ["Filipino", "English"]
  },
  {
    id: "saligan",
    name: "SALIGAN (Sentro ng Alternatibong Lingap Panlegal)",
    category: "legal_aid",
    type: "organization",
    phone: "(02) 8426-4706",
    email: "info@saligan.org",
    website: "https://saligan.org",
    description: "Legal aid organization providing free legal services to marginalized communities.",
    regions: ["NCR", "Region IV-A"],
    hours: "Monday-Friday 8AM-5PM",
    languages: ["Filipino", "English"]
  },
  {
    id: "foundation-media-alternatives",
    name: "Foundation for Media Alternatives",
    category: "legal_aid",
    type: "organization",
    email: "info@fma.ph",
    website: "https://fma.ph",
    description: "Digital rights advocacy organization providing resources and support for online rights violations.",
    hours: "Monday-Friday 9AM-6PM",
    languages: ["Filipino", "English"]
  },
  {
    id: "facebook-help",
    name: "Facebook/Meta Help Center",
    category: "platform_help",
    type: "website",
    website: "https://www.facebook.com/help/",
    description: "Report abuse, harassment, fake accounts, and other violations on Facebook and Messenger."
  },
  {
    id: "instagram-help",
    name: "Instagram Help Center",
    category: "platform_help",
    type: "website",
    website: "https://help.instagram.com/",
    description: "Report harassment, impersonation, and privacy violations on Instagram."
  },
  {
    id: "tiktok-help",
    name: "TikTok Safety Center",
    category: "platform_help",
    type: "website",
    website: "https://www.tiktok.com/safety/",
    description: "Report inappropriate content, harassment, and safety concerns on TikTok."
  },
  {
    id: "twitter-help",
    name: "X (Twitter) Help Center",
    category: "platform_help",
    type: "website",
    website: "https://help.twitter.com/",
    description: "Report abuse, harassment, and safety issues on X/Twitter."
  },
  {
    id: "discord-help",
    name: "Discord Trust & Safety",
    category: "platform_help",
    type: "website",
    website: "https://discord.com/safety",
    description: "Report harassment, raids, and other safety issues on Discord servers."
  },
  {
    id: "youtube-help",
    name: "YouTube Help Center",
    category: "platform_help",
    type: "website",
    website: "https://support.google.com/youtube/",
    description: "Report harassment, privacy violations, and inappropriate content on YouTube."
  }
];

export const templateDocuments: TemplateDocument[] = [
  {
    id: "school-complaint",
    title: "Formal Complaint to School",
    description: "Template for reporting cyberbullying incidents to school administrators",
    category: "complaint",
    template: `[Your Name]
[Your Student ID/Grade Level]
[Date]

To: [School Principal/Guidance Counselor Name]
[School Name]
[School Address]

Subject: Formal Complaint Regarding Cyberbullying Incident

Dear [Principal/Counselor Name],

I am writing to formally report a cyberbullying incident that has affected me. The details are as follows:

Date of Incident(s): [Date(s)]
Platform/Location: [Where it happened - Facebook, Instagram, group chat, etc.]

Description of Incident:
[Describe what happened in detail]

Person(s) Involved:
[Names or usernames of those involved]

Evidence:
[List any screenshots, messages, or other evidence you have]

Impact on Me:
[Describe how this has affected you - emotionally, academically, etc.]

I request that the school investigate this matter and take appropriate action in accordance with the school's anti-bullying policy and DepEd Order No. 40, s. 2012 (Child Protection Policy).

I am available to meet and provide additional information as needed.

Respectfully,
[Your Name]
[Contact Number]
[Email Address]`
  },
  {
    id: "data-deletion",
    title: "Data Deletion Request",
    description: "Template for requesting platforms to delete your personal data under the Data Privacy Act",
    category: "data_deletion",
    template: `[Your Name]
[Your Email Address]
[Date]

To: [Platform Name] Data Protection Officer
[Platform Address/Email]

Subject: Request for Erasure of Personal Data (Data Privacy Act of 2012)

Dear Data Protection Officer,

Pursuant to the Data Privacy Act of 2012 (Republic Act No. 10173) and its Implementing Rules and Regulations, I am requesting the erasure/deletion of my personal data from your platform.

Account Details:
- Username/Handle: [Your username]
- Email associated: [Your email]
- Account created: [Approximate date]

I request the deletion of:
[ ] My entire account and all associated data
[ ] Specific content (described below):
[Describe specific content to be deleted]

Reason for Request:
[Explain why you want the data deleted]

Under the Data Privacy Act, you are required to respond to this request within fifteen (15) days. Please confirm receipt of this request and inform me when the deletion has been completed.

If you require any additional information to verify my identity or process this request, please contact me at the email address above.

Sincerely,
[Your Name]`
  },
  {
    id: "cease-desist",
    title: "Cease and Desist Letter",
    description: "Template demanding someone stop harassing you online",
    category: "cease_desist",
    template: `[Your Name]
[Date]

To: [Harasser's Name/Username]
[Known Address/Platform]

CEASE AND DESIST NOTICE

This letter serves as formal notice that your actions constitute harassment under Philippine law, specifically:
- Cybercrime Prevention Act of 2012 (Republic Act No. 10175)
- Anti-Bullying Act of 2013 (Republic Act No. 10627)
- Safe Spaces Act (Republic Act No. 11313)

Specifically, you have:
[List the harassing behaviors - messages, posts, threats, etc.]

These actions occurred on: [Dates]
On the following platforms: [Platforms]

I DEMAND THAT YOU IMMEDIATELY:
1. Stop all communication with me
2. Stop posting about me or sharing content related to me
3. Remove all existing posts, comments, or content about me
4. Stop contacting my friends, family, or associates about me

This is my only warning. If the harassment continues, I will:
1. File a formal complaint with the NBI Cybercrime Division
2. File a formal complaint with the PNP Anti-Cybercrime Group
3. Pursue legal action including criminal charges

I have preserved evidence of all your actions and will use them in any legal proceedings.

[Your Name]`,
    templateFil: `[Iyong Pangalan]
[Iyong Address]
[Petsa]

PARA KAY: [Pangalan ng Nangha-harass]
[Address ng Nangha-harass kung alam]

PAUNAWA NG PAGTIGIL (CEASE AND DESIST NOTICE)

Ang liham na ito ay nagsisilbing pormal na paunawa na ang iyong mga aksyon ay itinuturing na harassment sa ilalim ng batas ng Pilipinas, partikular ang:
- Cybercrime Prevention Act of 2012 (Republic Act No. 10175)
- Anti-Bullying Act of 2013 (Republic Act No. 10627)
- Safe Spaces Act (Republic Act No. 11313)

Partikular, ginawa mo ang mga sumusunod:
[Ilista ang mga mapang-abusong pag-uugali - mga mensahe, post, pagbabanta, atbp.]

Nangyari ang mga aksyong ito noong: [Mga Petsa]
Sa mga sumusunod na platform: [Mga Platform]

HINIHILING KO NA AGAD MONG:
1. Itigil ang lahat ng pakikipag-ugnayan sa akin
2. Itigil ang pag-post tungkol sa akin o pagbabahagi ng nilalaman na may kaugnayan sa akin
3. Tanggalin ang lahat ng umiiral na post, komento, o nilalaman tungkol sa akin
4. Itigil ang pakikipag-ugnayan sa aking mga kaibigan, pamilya, o kasamahan tungkol sa akin

Ito na ang aking huling babala. Kung magpapatuloy ang harassment, ako ay:
1. Maghahain ng pormal na reklamo sa NBI Cybercrime Division
2. Maghahain ng pormal na reklamo sa PNP Anti-Cybercrime Group
3. Magsasagawa ng legal na aksyon kabilang ang mga kasong kriminal

Naitago ko ang ebidensya ng lahat ng iyong mga aksyon at gagamitin ko ang mga ito sa anumang legal na paglilitis.

[Iyong Pangalan]`
  },
  {
    id: "foi-request",
    title: "Freedom of Information Request",
    description: "Template for requesting government information about data breaches or privacy policies",
    category: "foi",
    template: `[Your Name]
[Your Address]
[Your Email]
[Date]

To: [Government Agency Name]
[Agency Address]

Subject: Request for Information under Executive Order No. 2, s. 2016 (Freedom of Information)

Dear Sir/Madam,

Pursuant to Executive Order No. 2, series of 2016, which mandates full public disclosure of government information, I am requesting the following information:

[Describe the information you are requesting, e.g.:
- Records of data breaches affecting citizens
- Privacy policies and data handling procedures
- Complaints filed regarding data privacy violations]

Purpose of Request:
[Explain why you need this information]

Preferred Format:
[ ] Electronic copy via email
[ ] Physical copy (I will shoulder reproduction costs)

Under EO 2, you are required to respond to this request within fifteen (15) working days. If the information cannot be provided, please cite the specific exemption that applies.

Thank you for your attention to this matter.

Respectfully,
[Your Name]
[Contact Number]`,
    templateFil: `[Iyong Pangalan]
[Iyong Address]
[Iyong Email]
[Petsa]

Para sa: [Pangalan ng Ahensya ng Gobyerno]
[Address ng Ahensya]

Paksa: Kahilingan para sa Impormasyon sa ilalim ng Executive Order No. 2, s. 2016 (Freedom of Information)

Mahal na Ginoo/Ginang,

Alinsunod sa Executive Order No. 2, serye ng 2016, na nag-uutos ng buong pagsisiwalat sa publiko ng impormasyon ng gobyerno, hinihiling ko ang sumusunod na impormasyon:

[Ilarawan ang impormasyong hinihiling mo, hal.:
- Mga rekord ng data breaches na nakaapekto sa mga mamamayan
- Mga patakaran sa privacy at pamamaraan ng paghawak ng data
- Mga reklamong inihain tungkol sa mga paglabag sa data privacy]

Layunin ng Kahilingan:
[Ipaliwanag kung bakit mo kailangan ang impormasyong ito]

Gustong Format:
[ ] Electronic copy sa pamamagitan ng email
[ ] Pisikal na kopya (Sasagutin ko ang gastos sa pagpaparami)

Sa ilalim ng EO 2, kinakailangan ninyong tumugon sa kahilingang ito sa loob ng labinlimang (15) araw ng trabaho. Kung hindi maibibigay ang impormasyon, pakibanggit ang partikular na exemption na naaangkop.

Salamat sa inyong atensyon sa bagay na ito.

Gumagalang,
[Iyong Pangalan]
[Numero ng Telepono]`
  },
  {
    id: "npc-complaint",
    title: "NPC Data Privacy Complaint",
    description: "Formal complaint letter to the National Privacy Commission regarding data privacy violations",
    category: "complaint",
    template: `[Your Name]
[Your Address]
[Your Email]
[Date]

National Privacy Commission
5th Floor, Delegation Building, PICC Complex
Pasay City, Metro Manila 1307

Subject: Formal Complaint for Violation of Data Privacy Act of 2012

Dear Sir/Madam,

I am writing to file a formal complaint against [Name of Company/Individual] for violation of my rights under the Data Privacy Act of 2012 (Republic Act No. 10173).

Details of the Respondent:
Name: [Name of Company/Individual]
Address: [Address if known]
Contact Info: [Email/Phone if known]

Nature of Violation:
[Describe what happened, e.g., unauthorized processing, data breach, improper disposal of data]

Timeline of Events:
- [Date]: [Event 1]
- [Date]: [Event 2]

I have attached the following evidence:
1. [Description of Evidence 1]
2. [Description of Evidence 2]

I request the Commission to investigate this matter and take appropriate action to protect my data privacy rights.

Respectfully,
[Your Name]
[Contact Number]`,
    templateFil: `[Iyong Pangalan]
[Iyong Address]
[Iyong Email]
[Petsa]

National Privacy Commission
5th Floor, Delegation Building, PICC Complex
Pasay City, Metro Manila 1307

Paksa: Pormal na Reklamo sa Paglabag sa Data Privacy Act of 2012

Mahal na Ginoo/Ginang,

Sumusulat ako upang maghain ng pormal na reklamo laban kay [Pangalan ng Kumpanya/Indibidwal] dahil sa paglabag sa aking mga karapatan sa ilalim ng Data Privacy Act of 2012 (Republic Act No. 10173).

Detalye ng Inirereklamo:
Pangalan: [Pangalan ng Kumpanya/Indibidwal]
Address: [Address kung alam]
Impormasyon sa Pakikipag-ugnayan: [Email/Telepono kung alam]

Uri ng Paglabag:
[Ilarawan ang nangyari, hal., hindi awtorisadong pagproseso, data breach, maling pagtatapon ng data]

Pagkakasunod-sunod ng mga Pangyayari:
- [Petsa]: [Pangyayari 1]
- [Petsa]: [Pangyayari 2]

Kalakip ko ang mga sumusunod na ebidensya:
1. [Paglalarawan ng Ebidensya 1]
2. [Paglalarawan ng Ebidensya 2]

Hinihiling ko sa Komisyon na imbestigahan ang bagay na ito at gumawa ng kaukulang aksyon upang protektahan ang aking mga karapatan sa data privacy.

Gumagalang,
[Iyong Pangalan]
[Numero ng Telepono]`
  },
  {
    id: "school-bullying-report",
    title: "School Bullying Report",
    description: "Formal report to school administration regarding bullying incidents",
    category: "complaint",
    template: `[Your Name]
[Your Grade/Section]
[Date]

To: [Principal/Guidance Counselor Name]
[School Name]

Subject: Report of Bullying Incident

Dear Sir/Madam,

I am writing to formally report incidents of bullying that I have experienced/witnessed, in accordance with the Anti-Bullying Act of 2013 (RA 10627).

Details of the Incident(s):
Date/Time: [Date and Time]
Location: [Where it happened]
Person(s) Involved: [Names of bullies]

Description of Incident:
[Describe exactly what happened. Be specific about words used or actions taken.]

Witnesses:
[Names of any witnesses]

Impact:
[Describe how this has affected you/the victim, e.g., fear of going to school, emotional distress]

I request that the school administration investigate this matter immediately and take appropriate action to ensure my safety/the safety of the victim.

Respectfully,
[Your Name]
[Parent/Guardian Name and Signature]`,
    templateFil: `[Iyong Pangalan]
[Iyong Baitang/Seksyon]
[Petsa]

Para kay: [Pangalan ng Principal/Guidance Counselor]
[Pangalan ng Paaralan]

Paksa: Ulat ng Insidente ng Bullying

Mahal na Ginoo/Ginang,

Sumusulat ako upang pormal na iulat ang mga insidente ng bullying na aking naranasan/nasaksihan, alinsunod sa Anti-Bullying Act of 2013 (RA 10627).

Detalye ng (mga) Insidente:
Petsa/Oras: [Petsa at Oras]
Lugar: [Kung saan nangyari]
(Mga) Taong Sangkot: [Pangalan ng mga nambu-bully]

Paglalarawan ng Insidente:
[Ilarawan nang eksakto ang nangyari. Maging tiyak sa mga salitang ginamit o aksyong ginawa.]

Mga Saksi:
[Pangalan ng mga saksi]

Epekto:
[Ilarawan kung paano ito nakaapekto sa iyo/sa biktima, hal., takot pumasok sa paaralan, emosyonal na pagkabalisa]

Hinihiling ko na imbestigahan ng administrasyon ng paaralan ang bagay na ito kaagad at gumawa ng kaukulang aksyon upang matiyak ang aking kaligtasan/ang kaligtasan ng biktima.

Gumagalang,
[Iyong Pangalan]
[Pangalan at Lagda ng Magulang/Tagapag-alaga]`
  },
  {
    id: "platform-takedown",
    title: "Content Takedown Request",
    description: "Request to social media platforms to remove non-consensual or harmful content",
    category: "data_deletion",
    template: `[Your Name]
[Your Email]
[Date]

To: [Platform Name] Trust and Safety Team

Subject: Request for Content Removal - Violation of Terms of Service/Privacy

Dear Support Team,

I am writing to request the immediate removal of content that violates your Community Standards and my privacy rights.

Content URL(s):
1. [Link to post/image]
2. [Link to post/image]

Reason for Removal:
[Check one or more]
[ ] Non-consensual sharing of intimate images (Revenge Porn)
[ ] Harassment/Cyberbullying
[ ] Hate Speech
[ ] Unauthorized sharing of personal information (Doxxing)
[ ] Impersonation

Description:
[Provide more details about why this content violates their policies and how it harms you.]

This content was posted without my consent and is causing me significant distress. Please remove it immediately.

Sincerely,
[Your Name]`,
    templateFil: `[Iyong Pangalan]
[Iyong Email]
[Petsa]

Para sa: [Pangalan ng Platform] Trust and Safety Team

Paksa: Kahilingan para sa Pagtanggal ng Nilalaman - Paglabag sa Terms of Service/Privacy

Mahal na Support Team,

Sumusulat ako upang hilingin ang agarang pagtanggal ng nilalaman na lumalabag sa inyong Community Standards at sa aking mga karapatan sa privacy.

URL ng Nilalaman:
1. [Link sa post/image]
2. [Link sa post/image]

Dahilan ng Pagtanggal:
[Pumili ng isa o higit pa]
[ ] Hindi awtorisadong pagbabahagi ng maseselang larawan (Revenge Porn)
[ ] Harassment/Cyberbullying
[ ] Hate Speech
[ ] Hindi awtorisadong pagbabahagi ng personal na impormasyon (Doxxing)
[ ] Pagpapanggap (Impersonation)

Paglalarawan:
[Magbigay ng karagdagang detalye kung bakit lumalabag ang nilalamang ito sa kanilang mga patakaran at paano ito nakakasama sa iyo.]

Ang nilalamang ito ay nai-post nang walang pahintulot ko at nagdudulot sa akin ng matinding pagkabalisa. Pakiusap na tanggalin ito kaagad.

Sumasainyo,
[Iyong Pangalan]`
  }
];

export function getResourcesByCategory(category: Resource["category"]): Resource[] {
  return resources.filter(r => r.category === category);
}

export function getResourcesByRegion(region: PhilippineRegion): Resource[] {
  return resources.filter(r => !r.regions || r.regions.includes(region));
}

export function searchResources(query: string): Resource[] {
  const lowerQuery = query.toLowerCase();
  return resources.filter(r => 
    r.name.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.category.toLowerCase().includes(lowerQuery)
  );
}
