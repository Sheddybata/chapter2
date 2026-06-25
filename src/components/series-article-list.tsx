import { ContributorArticleCard } from "@/components/contributor-article-card";
import { PublicationArticleCard } from "@/components/publication-article-card";
import { getPublishedArticlesBySeries } from "@/lib/articles";
import type { PublicationItem } from "@/lib/platform";
import type { ArticleSeries } from "@/types/articles";

type SeriesArticleListProps = {
  series: ArticleSeries;
  staticItems: PublicationItem[];
};

export async function SeriesArticleList({
  series,
  staticItems,
}: SeriesArticleListProps) {
  const contributorArticles = await getPublishedArticlesBySeries(series);

  return (
    <div className="grid gap-5">
      {contributorArticles.map((article) => (
        <ContributorArticleCard key={article.id} article={article} />
      ))}
      {staticItems.map((item) => (
        <PublicationArticleCard key={item.url} {...item} />
      ))}
    </div>
  );
}

export async function getSeriesArticleCount(
  series: ArticleSeries,
  staticCount: number,
) {
  const contributorCount = (await getPublishedArticlesBySeries(series)).length;
  return contributorCount + staticCount;
}
