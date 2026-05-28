import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import {
  getAdjacentSections,
  getAllSections,
  getSectionBySlug,
} from "@/lib/sections";

type SectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllSections().map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) {
    return {};
  }

  return {
    title: `Section ${section.sectionNumber}: ${section.shortTitle}`,
    description: section.plainEnglish,
    keywords: section.keywords,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);

  if (!section) {
    notFound();
  }

  const { previous, next } = getAdjacentSections(slug);

  return (
    <article>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/sections"
            className="text-sm font-bold text-emerald-100 hover:text-white"
          >
            Back to all sections
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
                Section {section.sectionNumber}
              </p>
              <h1 className="mt-4 text-5xl font-black tracking-[-0.05em]">
                {section.title}
              </h1>
            </div>
            <p className="text-xl font-semibold leading-8 text-emerald-50/85">
              {section.plainEnglish}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-[2rem] border border-emerald-950/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
              Page guide
            </p>
            <nav className="mt-4 grid gap-2 text-sm font-bold text-stone-600">
              <a href="#text" className="hover:text-emerald-800">
                Constitutional text
              </a>
              <a href="#gap" className="hover:text-emerald-800">
                Reality gap
              </a>
              <a href="#commitment" className="hover:text-emerald-800">
                Adebayo&apos;s commitment
              </a>
              <a href="#action" className="hover:text-emerald-800">
                Take action
              </a>
            </nav>
          </div>
        </aside>

        <div className="grid gap-8">
          <section
            id="text"
            className="constitutional-quote rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
              Verbatim constitutional text
            </p>
            <blockquote className="mt-5 whitespace-pre-line text-xl font-bold leading-9 text-emerald-950">
              {section.constitutionText}
            </blockquote>
          </section>

          <section
            id="gap"
            className="grid gap-5 rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
                The Nigerian reality
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-emerald-950">
                {section.realityTitle}
              </h2>
            </div>
            <div className="rounded-[1.5rem] bg-stone-50 p-5">
              <p className="text-2xl font-black tracking-tight text-stone-900">
                {section.realityStat}
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
                Source note: {section.realitySource}
              </p>
            </div>
          </section>

          <section
            id="commitment"
            className="rounded-[2rem] border border-emerald-950/10 bg-emerald-800 p-6 text-white shadow-sm sm:p-8"
          >
            <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
              Prince Adewole Adebayo&apos;s commitment
            </p>
            <p className="mt-5 text-2xl font-black leading-tight tracking-tight">
              {section.commitment}
            </p>
          </section>

          <section className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="prose-chapter">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2>{children}</h2>,
                  p: ({ children }) => <p>{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  li: ({ children }) => <li>{children}</li>,
                }}
              >
                {section.content}
              </ReactMarkdown>
            </div>
          </section>

          <section
            id="action"
            className="rounded-[2rem] border border-emerald-950/10 bg-stone-100 p-6 sm:p-8"
          >
            <h2 className="text-3xl font-black tracking-tight text-emerald-950">
              {section.cta}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              This is where the live petition, WhatsApp share card, and adopt-a-
              section pledge will plug in after the platform is validated.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/action"
                className="rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white"
              >
                Sign the petition
              </Link>
              <Link
                href="/resources"
                className="rounded-full bg-white px-6 py-3 text-center text-sm font-black text-emerald-950"
              >
                Download resources
              </Link>
            </div>
          </section>

          <nav className="grid gap-3 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/sections/${previous.slug}`}
                className="rounded-[1.5rem] border border-emerald-950/10 bg-white p-5 font-bold text-stone-700 hover:text-emerald-800"
              >
                Previous: Section {previous.sectionNumber}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/sections/${next.slug}`}
                className="rounded-[1.5rem] border border-emerald-950/10 bg-white p-5 text-right font-bold text-stone-700 hover:text-emerald-800"
              >
                Next: Section {next.sectionNumber}
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </article>
  );
}
