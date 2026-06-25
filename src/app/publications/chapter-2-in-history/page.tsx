import type { Metadata } from "next";
import Link from "next/link";

import {
  getSeriesArticleCount,
  SeriesArticleList,
} from "@/components/series-article-list";

export const metadata: Metadata = {
  title: "Chapter II in History",
  description:
    "Publications on the historical role of Chapter II in Nigerian governance.",
};

export default async function HistoryPublicationsPage() {
  const articleCount = await getSeriesArticleCount("history", 0);

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
            Chapter II in History
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">
            A historical guide to how Chapter II has shaped governance debates,
            constitutional reform, and citizen expectations.
          </p>
          <p className="mt-4 text-sm font-bold text-emerald-100">
            {articleCount} publications
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {articleCount === 0 ? (
          <p className="rounded-[2rem] border border-emerald-950/10 bg-white p-6 text-sm leading-6 text-stone-600">
            Articles for this series will appear here as contributors publish
            them.
          </p>
        ) : (
          <SeriesArticleList series="history" staticItems={[]} />
        )}
      </section>
    </>
  );
}
