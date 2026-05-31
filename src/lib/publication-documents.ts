import awolowoMyThoughts from "../../content/publication-awolowo-my-thoughts.json";
import section21Document from "../../content/publication-section-21.json";

export type PublicationDocument = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  source: string;
  seriesLabel: string;
  seriesHref: string;
  downloadUrl: string;
  paragraphs: string[];
};

const documents: Record<string, PublicationDocument> = {
  "section-21-key": {
    slug: "section-21-key",
    title: "Section 21: Key to Achieving Chapter II of the Nigerian Constitution",
    subtitle:
      "A research document on Section 21 and its role in making Chapter II operational.",
    author: "Olusegun R. Babalola",
    source: "Platform document",
    seriesLabel: "Potentiality of Chapter II",
    seriesHref: "/publications/potentiality-of-chapter-2",
    downloadUrl:
      "/Section 21; Key to Achieving Chapter 2 of the Nigerian Constitution-1.docx",
    paragraphs: section21Document.paragraphs,
  },
  "awolowo-my-thoughts": {
    slug: "awolowo-my-thoughts",
    title: "My Thoughts",
    subtitle:
      "Chief Obafemi Awolowo on social objectives and Chapter II of the Nigerian Constitution.",
    author: "Chief O. Awolowo",
    source: "Historical publication",
    seriesLabel: "Origin of Chapter II",
    seriesHref: "/publications/origin-of-chapter-2",
    downloadUrl: "/Chief O. Awolowo, MY THOUGHTS.docx",
    paragraphs: awolowoMyThoughts.paragraphs,
  },
};

export function getPublicationDocument(slug: string) {
  return documents[slug] ?? null;
}

export function getAllPublicationDocumentSlugs() {
  return Object.keys(documents);
}
