export const publications = [
  {
    id: "origin",
    title: "Origin of Chapter II",
    description:
      "A plain-English publication explaining why the Fundamental Objectives and Directive Principles were placed in the Constitution.",
    status: "Draft publication",
    href: "/publications/origin-of-chapter-2",
  },
  {
    id: "history",
    title: "Chapter II in History",
    description:
      "A historical guide to how Chapter II has shaped governance debates, constitutional reform, and citizen expectations.",
    status: "Research outline",
    href: "/publications/chapter-2-in-history",
  },
  {
    id: "potentiality",
    title: "Potentiality of Chapter II",
    description:
      "Policy analysis and public commentary on how Chapter II can shape welfare economics, governance, and national development.",
    status: "Featured articles",
    href: "/publications/potentiality-of-chapter-2",
  },
];

export type PublicationItem = {
  title: string;
  source: string;
  author: string;
  url: string;
  excerpt: string;
  date?: string;
  reporter?: string;
  kind?: "article" | "document";
  readHref?: string;
};

export const potentialityArticles: PublicationItem[] = [
  {
    title:
      "Section 21: Key to Achieving Chapter II of the Nigerian Constitution",
    source: "Platform document",
    author: "Campaign research",
    url: "/Section 21; Key to Achieving Chapter 2 of the Nigerian Constitution-1.docx",
    excerpt:
      "A research document on Section 21 and its role in making Chapter II operational through foreign policy, African unity, and international cooperation.",
    kind: "document",
    readHref: "/publications/read/section-21-key",
  },
  {
    title:
      "Faloye berates Nigerian politicians over 'Chapter II' Constitution sideline",
    source: "The Guardian Nigeria",
    author: "Prince Justice Faloye",
    reporter: "Azeez Kareem",
    date: "16 May 2026",
    url: "https://guardian.ng/news/faloye-berates-nigerian-politicians-over-chapter-ii-constitution-sideline/",
    excerpt:
      "Afenifere National Publicity Secretary Prince Justice Faloye condemns Nigeria's political class for ignoring Chapter II since 1999, arguing that leaders promoted ethnic and personality politics while abandoning the constitutional blueprint for security, welfare, education, and a self-reliant economy. He welcomes SDP's alignment with Chapter II and Prince Adewole Adebayo's War Against Poverty.",
  },
  {
    title:
      "We Must Fight War Against Poverty To Fulfill Chapter II Of Constitution — Faloye",
    source: "Independent Nigeria",
    author: "Prince Justice Faloye",
    date: "2026",
    url: "https://independent.ng/we-must-fight-war-against-poverty-to-fulfill-chapter-ii-of-constitution-faloye/",
    excerpt:
      "Faloye argues that Section 16 is essential to making Chapter II work, and that Nigeria needs an economic war — the Big Push — rather than neoliberal reforms that deepen poverty. He links Adebayo's SDP platform to housing, railways, Modern Monetary Theory, and public works led by institutions such as the Nigerian Defence Industries Corporation.",
  },
  {
    title:
      "Why Nigeria Will Develop More If Leaders Understand, Obey Chapter Two Of Constitution — Faloye",
    source: "Independent Nigeria",
    author: "Prince Justice Faloye",
    date: "2026",
    url: "https://independent.ng/why-nigeria-will-develop-more-if-leaders-understand-obey-chapter-two-of-constitution-faloye/",
    excerpt:
      "In a serial breakdown of Chapter II, Faloye explains how Sections 14, 15, 17, 19, and 21 connect sovereignty, national integration, social justice, culture, and African unity. He credits Adebayo for placing constitutional implementation at the centre of political discourse and outlines civilizational, electoral, and institutional reforms.",
  },
];

export const originPublications: PublicationItem[] = [
  {
    title: "My Thoughts",
    source: "Historical publication",
    author: "Chief O. Awolowo",
    url: "/Chief O. Awolowo, MY THOUGHTS.docx",
    excerpt:
      "Chief Obafemi Awolowo on constitutional purpose, public welfare, and the philosophical foundations that shaped Nigeria's Fundamental Objectives and Directive Principles.",
    kind: "document",
    readHref: "/publications/read/awolowo-my-thoughts",
  },
];

export const leadership = [
  {
    name: "Prince Adewole Adebayo",
    role: "Campaign Principal",
    focus:
      "Constitutional leadership, national policy direction, and public argument for making Chapter II operational.",
    image: "/princewole.jpg",
  },
  {
    name: "National Chapter II Desk",
    role: "Platform Coordination",
    focus:
      "Content approval, civic education partnerships, volunteer routing, and publication planning.",
  },
  {
    name: "Legal and Policy Advisory Team",
    role: "Research and Review",
    focus:
      "Constitutional text verification, justiciability research, and policy mapping across all sections.",
  },
];

export const zonalLeadership = [
  "North Central",
  "North East",
  "North West",
  "South East",
  "South South",
  "South West",
].map((zone) => ({
  zone,
  coordinator: "Zonal Coordinator",
  focus:
    "Student outreach, civic education events, community briefings, and local volunteer activation.",
}));
