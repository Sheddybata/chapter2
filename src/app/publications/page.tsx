import type { Metadata } from "next";
import Link from "next/link";

import { getSeriesArticleCount } from "@/components/series-article-list";
import {
  originPublications,
  potentialityArticles,
  publications,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Chapter II publications on origin, history, and potentiality for Achieving Chapter II - Adewole 2027.",
};

export default async function PublicationsPage() {
  const counts = {
    origin: await getSeriesArticleCount("origin", originPublications.length),
    history: await getSeriesArticleCount("history", 0),
    potentiality: await getSeriesArticleCount(
      "potentiality",
      potentialityArticles.length,
    ),
  };

  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            Publications
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.05em]">
            Research, history, and policy arguments for achieving Chapter II.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            Choose a publication series to explore articles, briefs, and
            constitutional commentary.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            Contributor login
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {publications.map((publication) => {
            const articleCount = counts[publication.id as keyof typeof counts];

            return (
              <Link
                key={publication.title}
                href={publication.href}
                className="group rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-lg"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  {publication.status}
                  {articleCount ? ` · ${articleCount} items` : ""}
                </p>
                <h2 className="mt-4 text-3xl font-black tracking-tight text-emerald-950">
                  {publication.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  {publication.description}
                </p>
                <p className="mt-6 text-sm font-black text-emerald-800 transition group-hover:text-emerald-950">
                  Open series
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
