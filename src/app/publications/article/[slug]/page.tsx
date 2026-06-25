import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import {
  getPublishedArticleBySlug,
  getPublishedArticleSlugs,
} from "@/lib/articles";
import { site } from "@/lib/site";
import { getSeriesLabel } from "@/types/articles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author_name }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `${site.url}/publications/article/${article.slug}`,
      images: [
        {
          url: article.cover_image_url,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.cover_image_url],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      <section className="border-b border-emerald-950/10 bg-emerald-950 text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href={
              article.series === "origin"
                ? "/publications/origin-of-chapter-2"
                : article.series === "history"
                  ? "/publications/chapter-2-in-history"
                  : "/publications/potentiality-of-chapter-2"
            }
            className="text-sm font-bold text-emerald-100 hover:text-white"
          >
            Back to {getSeriesLabel(article.series)}
          </Link>
          <p className="mt-8 text-sm font-black uppercase tracking-[0.22em] text-emerald-200">
            {getSeriesLabel(article.series)}
            {publishedDate ? ` · ${publishedDate}` : ""}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-lg font-bold text-emerald-100">
            By {article.author_name}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-emerald-950/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_image_url}
            alt={article.title}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="prose-chapter mt-10">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      </article>
    </>
  );
}
