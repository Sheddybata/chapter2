import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAllPublicationDocumentSlugs, getPublicationDocument } from "@/lib/publication-documents";

type PublicationReadPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPublicationDocumentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PublicationReadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getPublicationDocument(slug);

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.subtitle,
  };
}

export default async function PublicationReadPage({ params }: PublicationReadPageProps) {
  const { slug } = await params;
  const document = getPublicationDocument(slug);

  if (!document) {
    notFound();
  }

  const [leadParagraph, ...bodyParagraphs] = document.paragraphs;

  return (
    <>
      <section className="border-b border-emerald-950/10 bg-emerald-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href={document.seriesHref}
            className="text-sm font-bold text-emerald-100 hover:text-white"
          >
            Back to {document.seriesLabel}
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            {document.source}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            {document.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-emerald-50/85">
            {document.subtitle}
          </p>
          <p className="mt-3 text-sm font-bold text-emerald-100">{document.author}</p>

          <div className="mt-8">
            <a
              href={encodeURI(document.downloadUrl)}
              download
              className="inline-flex rounded-full bg-white px-6 py-3 text-center text-sm font-black text-emerald-950"
            >
              Download document
            </a>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {leadParagraph ? (
          <p className="text-xl font-black leading-8 text-emerald-950">{leadParagraph}</p>
        ) : null}

        <div className="prose-speech mt-10 space-y-6">
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-9 text-stone-700">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
