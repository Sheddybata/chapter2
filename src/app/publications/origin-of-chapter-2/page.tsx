import type { Metadata } from "next";
import Link from "next/link";

import { PublicationArticleCard } from "@/components/publication-article-card";
import { originPublications } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Origin of Chapter II",
  description:
    "Publications on the origin of Chapter II of the Nigerian Constitution.",
};

export default function OriginPublicationsPage() {
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
            Origin of Chapter II
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            Foundational texts and historical publications explaining why the
            Fundamental Objectives and Directive Principles were placed in the
            Constitution.
          </p>
          <p className="mt-4 text-sm font-bold text-emerald-100">
            {originPublications.length} publications
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5">
          {originPublications.map((publication) => (
            <PublicationArticleCard
              key={publication.url}
              {...publication}
            />
          ))}
        </div>
      </section>
    </>
  );
}
