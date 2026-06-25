import Link from "next/link";

import type { Article } from "@/types/articles";
import { getSeriesLabel } from "@/types/articles";

type ContributorArticleCardProps = {
  article: Article;
};

export function ContributorArticleCard({ article }: ContributorArticleCardProps) {
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-sm transition hover:border-emerald-700/40">
      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        <div
          className="min-h-[180px] bg-cover bg-center lg:min-h-full"
          style={{ backgroundImage: `url(${article.cover_image_url})` }}
        />
        <div className="flex flex-col justify-between gap-4 p-6 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
              {getSeriesLabel(article.series)}
              {publishedDate ? ` · ${publishedDate}` : ""}
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-emerald-950">
              {article.title}
            </h3>
            <p className="mt-2 text-sm font-bold text-stone-500">
              By {article.author_name}
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">{article.excerpt}</p>
          </div>
          <Link
            href={`/publications/article/${article.slug}`}
            className="inline-flex shrink-0 rounded-full bg-emerald-800 px-6 py-3 text-center text-sm font-black text-white transition hover:bg-emerald-900"
          >
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}
