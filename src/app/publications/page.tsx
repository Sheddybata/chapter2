import type { Metadata } from "next";
import Link from "next/link";

import { potentialityArticles, publications } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Chapter 2 publications on origin, history, and potentiality for Achieving Chapter 2 Adebayo 2027.",
};

export default function PublicationsPage() {
  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            Publications
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.05em]">
            Research, history, and policy arguments for achieving Chapter 2.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            Choose a publication series to explore articles, briefs, and
            constitutional commentary.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {publications.map((publication) => {
            const articleCount =
              publication.id === "potentiality"
                ? potentialityArticles.length
                : null;

            return (
              <Link
                key={publication.title}
                href={publication.href}
                className="group rounded-[2rem] border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-700/40 hover:shadow-lg"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
                  {publication.status}
                  {articleCount ? ` · ${articleCount} articles` : ""}
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
