import type { Metadata } from "next";
import Link from "next/link";

import { PublicationArticleCard } from "@/components/publication-article-card";
import { potentialityArticles } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Potentiality of Chapter II",
  description:
    "Articles and commentary on the constitutional potential of Chapter II, welfare economics, and national development.",
};

export default function PotentialityPublicationsPage() {
  return (
    <>
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/publications"
            className="text-sm font-bold text-emerald-100 hover:text-white"
          >
            Back to publications
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            Publication series
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black tracking-[-0.05em]">
            Potentiality of Chapter II
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            Policy analysis and public commentary on how Chapter II can shape
            welfare economics, governance, and national development.
          </p>
          <p className="mt-4 text-sm font-bold text-emerald-100">
            {potentialityArticles.length} articles
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {potentialityArticles.map((article) => (
            <PublicationArticleCard key={article.url} {...article} />
          ))}
        </div>
      </section>
    </>
  );
}
